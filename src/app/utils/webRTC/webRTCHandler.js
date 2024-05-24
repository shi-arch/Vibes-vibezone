import store from '../../../redux/store';
import { setConnectedTime, setLocalStream, setCallState, setCallingDialogVisible, setCallerUsername, setCallRejected, setRemoteStream, setScreenSharingActive, setMessage, setHangUp, setStartCall, setButtonLabel, setUserToCall, setDisableButton } from '../../../redux/features/callSlice';
import * as wss from '../wssConnection/wssConnection';
import { useSelector } from 'react-redux';
import { setLoader } from '../../../redux/features/chatSlice';
import Swal from 'sweetalert2';

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
};

const defaultConstrains = {
  video: {
    width: 480,
    height: 360
  },
  audio: true
};

const configuration = {
  iceServers: [{
    urls: 'stun:stun.l.google.com:13902'
  }]
};

let connectedUserSocketId;
let peerConnection;
let dataChannel;

export const getLocalStream = async () => {
  const stream = await navigator.mediaDevices.getUserMedia(defaultConstrains)
  store.dispatch(setLocalStream(stream));
  store.dispatch(setCallState('CALL_AVAILABLE'));
  return stream
};

export const CreatePeerConnection = async () => {
  const localStream = store.getState().callSlice.localStream;
  peerConnection = new RTCPeerConnection(configuration);

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(setRemoteStream(stream));
    store.dispatch(setCallState('CALL_IN_PROGRESS'));
    store.dispatch(setButtonLabel('Skip'))
    store.dispatch(setDisableButton(true))
    store.dispatch(setConnectedTime(new Date().getTime()));
  };

  // incoming data channel messages
  peerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel;

    dataChannel.onopen = () => {
      console.log('peer connection is ready to receive data channel messages');
    };

    dataChannel.onmessage = (event) => {
      store.dispatch(setMessage(true, event.data));
    };
  };

  dataChannel = peerConnection.createDataChannel('chat');

  dataChannel.onopen = () => {
    console.log('chat data channel succesfully opened');
  };

  peerConnection.onicecandidate = (event) => {
    console.log('geeting candidates from stun server');
    if (event.candidate) {
      wss.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId
      });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === 'connected') {
      console.log('succesfully connected with other peer');
    }
  };

};

export const callToOtherUser = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId;
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().chatSlice.userName
    }
  });
};

export const handlePreOffer = async (data) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    await CreatePeerConnection();
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    wss.sendWebRTCOffer({
      calleeSocketId: connectedUserSocketId,
      offer: offer
    });
  }
};

export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogVisible(false));
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
  } else {
    let rejectionReason;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now';
    } else {
      rejectionReason = 'Call rejected by the callee';
    }
    store.dispatch(setCallRejected({
      rejected: true,
      reason: rejectionReason
    }));
    resetCallData();
  }
};

const sendOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer
  });
};

export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer
  });
};

export const handleAnswer = async (data) => {
  if (data && data.answer) {
    await establishPeerConnection(data)    
    wss.checkLastUsers();
  }
};

const establishPeerConnection = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
}

export const handleCandidate = async (data) => {
  try {
    console.log('adding ice candidates');
    await peerConnection.addIceCandidate(data.candidate);
  } catch (err) {
    console.error('error occured when trying to add received ice candidate', err);
  }
};
export const checkIfCallIsPossible = () => {
  if (store.getState().callSlice.callState !== 'CALL_AVAILABLE') {
    return false;
  } else {
    return true;
  }
};

let screenSharingStream;

export const switchForScreenSharingStream = async () => {
  if (!store.getState().callSlice.screenSharingActive) {
    try {
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      store.dispatch(setScreenSharingActive(true));
      const senders = peerConnection.getSenders();
      const sender = senders.find(sender => sender.track.kind === screenSharingStream.getVideoTracks()[0].kind);
      sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
    } catch (err) {
      console.error('error occured when trying to get screen sharing stream', err);
    }
  } else {
    const localStream = store.getState().callSlice.localStream;
    const senders = peerConnection.getSenders();
    const sender = senders.find(sender => sender.track.kind === localStream.getVideoTracks()[0].kind);
    sender.replaceTrack(localStream.getVideoTracks()[0]);
    store.dispatch(setScreenSharingActive(false));
    screenSharingStream.getTracks().forEach(track => track.stop());
  }
};

export const handleUserHangedUp = async () => {
  await resetCallDataAfterHangUp();
};

export const hangUpAutomateCall = async () => {
  const dispatch = store.dispatch
  await hangUp();
  dispatch(setHangUp(true));
  wss.getActiveUser('skip')
  dispatch(setLoader(true))
  dispatch(setUserToCall(""))
}

export const hangUp = async () => {
  wss.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId,
    _id: store.getState().loginSlice.loginDetails._id
  });
  resetCallDataAfterHangUp();
};

const resetCallDataAfterHangUp = async () => {
  peerConnection.close();
  peerConnection = null;
  CreatePeerConnection();
  resetCallData();
  store.dispatch(setHangUp(true));
};

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState('CALL_AVAILABLE'));
};

export const sendMessageUsingDataChannel = (message) => {
  dataChannel.send(message);
};
