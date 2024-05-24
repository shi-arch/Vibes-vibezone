import store from '../../../redux/store';
import { setConnectedTime, setLocalStream, setCallState, setCallingDialogVisible, setCallerUsername, setCallRejected, setRemoteStream, setScreenSharingActive, setMessage, setStartCall, setButtonLabel, setUserToCall, setDisableButton } from '../../../redux/features/callSlice';
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
    if(offer){
      await peerConnection.setLocalDescription(offer);
      wss.sendWebRTCOffer({
        calleeSocketId: connectedUserSocketId,
        offer: offer
      });
    }    
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
  if(data && data.offer){
    console.log('handleOffer, setRemoteDescription >>>>>>>>>>>>>>>>>>>>.', peerConnection.setRemoteDescription)
    console.log('handleOffer, offer >>>>>>>>>>>>>>>>>>>>.', data.offer)
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    if(answer){
      console.log('handleOffer, answer >>>>>>>>>>>>>>>>>>>>.', answer)
      await peerConnection.setLocalDescription(answer);
      wss.sendWebRTCAnswer({
        callerSocketId: connectedUserSocketId,
        answer: answer
      });
    }    
  }  
};

export const handleAnswer = async (data) => {
  if (data && data.answer) {
    console.log('handleAnswer, setRemoteDescription >>>>>>>>>>>>>>>>>>>>.', peerConnection.setRemoteDescription)
    console.log('handleAnswer, answer >>>>>>>>>>>>>>>>>>>>.', data.answer)
    await peerConnection.setRemoteDescription(data.answer);
  }
};

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

export const handleUserHangedUp = async () => {
  //await resetCallDataAfterHangUp();
  peerConnection.close();
  peerConnection = null;
  await CreatePeerConnection();
  connectedUserSocketId = null;
  store.dispatch(setCallState('CALL_AVAILABLE'));
};

export const hangUpAutomateCall = async () => {
  const dispatch = store.dispatch
  await wss.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId,
    _id: store.getState().loginSlice.loginDetails._id
  });
  peerConnection.close();
  peerConnection = null;
  await CreatePeerConnection();
  connectedUserSocketId = null;
  store.dispatch(setCallState('CALL_AVAILABLE'));
  dispatch(setLoader(true))  
  setTimeout(() => {
    wss.getActiveUser('skip')
    dispatch(setUserToCall(""))
  }, [1000])  
  
}

// export const hangUp = async () => {
//   await wss.sendUserHangedUp({
//     connectedUserSocketId: connectedUserSocketId,
//     _id: store.getState().loginSlice.loginDetails._id
//   });
//   await resetCallDataAfterHangUp();
// };

const resetCallDataAfterHangUp = async () => {
  peerConnection.close();
  peerConnection = null;
  await CreatePeerConnection();
  await resetCallData();
};

// export const resetCallData = async () => {
//   connectedUserSocketId = null;
//   store.dispatch(setCallState('CALL_AVAILABLE'));
// };
