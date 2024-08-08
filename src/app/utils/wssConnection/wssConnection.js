import socketClient from 'socket.io-client';
import store from '../../../redux/store';
import { setUserName, setMessages, setIsTyping, setSessionId } from '../../../redux/features/chatSlice';
import { setTriggerCall, setUserToCall, setSocketId, setCallState, setButtonLabel, setTriggerEndCall, setDisableButton, setSkipTimer, setCurrentCall, setEnableDisableRemoteCam, setLocalMicrophoneEnabled, setEnableDisableRemoteMic, setChatBot, setTimer, setDisplayConnect } from '../../../redux/features/callSlice';
import { setTotalUsers } from '../../../redux/features/loginSlice';
import { postApi } from '../../../response/api';
import { getRandomTimeInMilliseconds } from '../constant';
const SERVER = process.env.REACT_APP_BASEURL;
let socket;

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

export const createPeerConnection = (stream) => {
  peerConnection = new RTCPeerConnection(configuration);
  const localStream = stream
  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }
  peerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(setRemoteStream(stream));
  };
  // incoming data channel messages
  peerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel;

    dataChannel.onopen = () => {
      console.log('peer connection is ready to receive data channel messages');
    };

    dataChannel.onmessage = (event) => {
      //store.dispatch(setMessage(true, event.data));
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

export const connectWithWebSocket = async () => {
  socket = socketClient(SERVER);
  socket.on('connection', () => {
    const socketId = socket.id
    if (socketId) {
      store.dispatch(setSocketId(socketId))
    }
  });
  socket.on("typing", (name) => {
    dispatch(setIsTyping(true))
    dispatch(setUserName(name))
  });
  socket.on("stop typing", () => {
    dispatch(setIsTyping(false))
    dispatch(setUserName(""))
  });
  socket.on("skip-timer", () => {
    store.dispatch(setTimer(true))
    store.dispatch(setDisableButton(true))
  });
  socket.on("send-message", (data) => {
    let arr = _.cloneDeep(store.getState().chatSlice.messagesArr)
    let o = { message: data.msgObj.message, sender: false }
    if (arr.length) {
      arr[arr.length] = o
    } else {
      arr.push(o)
    } 
    store.dispatch(setMessages(arr))
  })
  socket.on("get-active-user", (user) => {
    if (store.getState().callSlice.callState == "CALL_AVAILABLE") {
      console.log('user enters into get active user >>>>>>>>', user)
      const dispatch = store.dispatch
      dispatch(setCallState('CALL_IN_PROGRESS'))
      let userData = user
      if (user && user?.findActiveUser) {
        userData = user?.findActiveUser
      } else {
        dispatch(setTriggerCall(true))
      }
      dispatch(setUserToCall(userData))
    }
  });
  socket.on('broadcast', (data) => {
    if (data && data.totalUsers) {
      store.dispatch(setTotalUsers(data.totalUsers))
    }
  });
  socket.on('register-user', () => {
    store.dispatch(setDisplayConnect(true))
  });
  socket.on('handle-camera', (enable) => {
    store.dispatch(setEnableDisableRemoteCam(enable))
  })
  socket.on('enableDisableCam', (enable) => {
    store.dispatch(setEnableDisableRemoteCam(enable))
  })
  socket.on('enableDisableMic', (enable) => {
    store.dispatch(setEnableDisableRemoteMic(enable))
  })
  socket.on('call-answered', (data) => {
    if (data && data.answer) {
      debugger
      peerConnection.setRemoteDescription(data.answer);
    }
  })
  socket.on('initiate-call', async (data) => {
    debugger
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('call-answered', {
      answer: answer,
      callerSocketId: connectedUserSocketId
    });
  })
  socket.on('user-hanged-up', async () => {
    const dispatch = store.dispatch
    dispatch(setCallState('CALL_AVAILABLE'))
    dispatch(setUserToCall(""))
    dispatch(setMessages([]))
    await getActiveUser()
  });
};

export const registerNewUser = async (enableCam) => {
  await socket.emit('register-new-user', {
    username: store.getState().chatSlice.userName,
    socketId: store.getState().callSlice.socketId,
    peerId: store.getState().callSlice.peerId,
    enableCam: enableCam,
    isActive: false
  });
};

export const sendRequest = (user) => {
  socket.emit('send-request', {
    userData: user.userData,
    callerSocketId: user.callerSocketId
  });
};

export const initiateCall = async (user) => {
  debugger
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  debugger
  socket.emit('initiate-call', {
    offer: offer,
    callerSocketId: user.callerSocketId
  });
}

export const startCall = async (peer, localStream, userToCall, setRemoteStream, setCurrentCall) => {
  try {
    const { peerId } = userToCall
    if (peer && localStream && peerId) {
      const call = await peer.call(peerId, localStream)
      call.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream)
        if (store.getState().callSlice.buttonLabel !== 'Skip') {
          store.dispatch(setButtonLabel('Skip'))
        }
        console.log('user connected')
      });
      await setCurrentCall(call)
      call.on('close', async () => {
        setRemoteStream(null)
        store.dispatch(setTimer(true))
        store.dispatch(setDisableButton(true))
        store.dispatch(setMessages([]))
        await getActiveUser('skip')
        store.dispatch(setUserToCall(""))
        store.dispatch(setCallState('CALL_AVAILABLE'))
        console.log('Call ended');
      });
    }
  } catch (err) {
    console.log('start call error: ', err);
  }
};

export const handleUserHangedUp = async () => {
  store.dispatch(setCallState('CALL_AVAILABLE'));
};

export const handleCamera = async () => {
  socket.emit('handle-camera', { socketId: store.getState().callSlice.userToCall.socketId, enableOrDisable: store.getState().callSlice.localCameraEnabled })
};

export const handleSkipTimer = async () => {
  socket.emit('skip-timer', store.getState().callSlice.userToCall.socketId)
};

export const endCall = async () => {
  socket.emit('end-call', store.getState().callSlice.userToCall.socketId)
}

export const getActiveUser = async (flag) => {
  socket.emit('get-active-user', { prevUser: store.getState().callSlice.userToCall || '', mySocketId: store.getState().callSlice.socketId, flag: flag || '' });
};

export const updateName = (username) => {
  socket.emit('update-name', { name: username, socketId: socket.id });
};

export const updateUser = (username) => {
  socket.emit('update-user', store.getState().callSlice.socketId);
};

export const sendMessage = async (message) => {
  let o = {
    socketIds: {
      mySocketId: socket.id,
      userSocketId: store.getState().callSlice.userToCall.socketId
    },
    msgObj: {
      sender: true,
      message: message
    }
  }
  socket.emit('send-message', o);
};

export const sendBotMessage = async (arr, msg, setMessage) => {
  let message = msg
  setMessage("")
  const sessionId = store.getState().callSlice.sessionId
  const response = await postApi('/chat-bot', { message: message, sessionId })
  if (response) {
    if (!sessionId) {
      store.dispatch(setSessionId(response?.data?.sessionId))
    }
    let chatArr = _.cloneDeep(arr)
    chatArr.push({ message: response?.data?.response, sender: false })
    const randomTime = getRandomTimeInMilliseconds(3, 8);
    setTimeout(() => {
      store.dispatch(setMessages(chatArr))
    }, randomTime);
  }
};
export const typingMethod = () => {
  socket.emit('typing', {
    id: store.getState().chatSlice.selectedUserData.socketId
  });
};
export const stopTypingMethod = () => {
  socket.emit('stop typing', {
    id: store.getState().chatSlice.selectedUserData.socketId
  });
};

// emitting events to server related with direct call

export const enableDisableCam = (enable) => {
  socket.emit('enableDisableCam', { enableOrDisable: enable, socketId: store.getState().callSlice.socketId, userSocketId: store.getState().callSlice.userToCall.socketId });
};

export const enableDisableMic = (enable) => {
  socket.emit('enableDisableMic', { enableOrDisable: enable, userSocketId: store.getState().callSlice.userToCall.socketId });
};

export const closeTab = () => {
  socket.emit('disconnect-current-user', { userSocketId: store.getState().callSlice.userToCall.socketId, mySocketId: store.getState().callSlice.socketId });
};
