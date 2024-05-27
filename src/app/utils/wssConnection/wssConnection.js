import socketClient from 'socket.io-client';
import store from '../../../redux/store';
import { setActiveUserData, setUserName, setUpdateMessage, setSocketConnected, setCalleeUserName, setMessages, setSelectedUserData, setIsTyping, setUserAvailable, setLoader } from '../../../redux/features/chatSlice';
import { getApi } from '../../../response/api';
import { setTriggerCall, setUserToCall, setUserObjectId, setSocketId, setLocalStream, setCallState, setPeer, setRemoteStream } from '../../../redux/features/callSlice';
import { setTotalUsers } from '../../../redux/features/loginSlice';
import { useSelector } from 'react-redux';
import Peer from 'peerjs';
const SERVER = process.env.REACT_APP_BASEURL;
let socket;

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
  socket.on("send-message", (data) => {
    let arr = _.cloneDeep(store.getState().chatSlice.messagesArr)
    let o = { message: data.msgObj.message, sender: false }
    if (arr.length) {
      arr[arr.length] = o
    } else {
      arr.push(o)
    }
    dispatch(setMessages(arr))
  })
  socket.on("get-active-user", (user) => {
    const dispatch = store.dispatch
    let userData = user
    if (user && user.findActiveUser) {
      userData = user.findActiveUser
    } else {
      dispatch(setTriggerCall(true))
    }
    dispatch(setUserToCall(userData))
  });
  socket.on('stop-loader', () => {
    store.dispatch(setLoader(false))
    store.dispatch(setCallState('CALL_IN_PROGRESS'))
  });
  socket.on('end-call', () => {
    const dispatch = store.dispatch
    dispatch(setRemoteStream(null))
    dispatch(setCallState('CALL_AVAILABLE'));
    dispatch(setUserToCall(""))
    dispatch(setMessages([]))
  });
  socket.on('broadcast', (data) => {
    store.dispatch(setTotalUsers(data.totalUsers));
  });
};
export const initiate = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    store.dispatch(setLocalStream(stream));
    store.dispatch(setCallState('CALL_AVAILABLE'));
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
  const newPeer = new Peer(store.getState().callSlice.peerId);
  store.dispatch(setPeer(newPeer));
  newPeer.on('open', () => {
    console.log('Peer ID:', newPeer.id);
  });
  newPeer.on('call', async (call) => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    call.answer(stream);
    call.on('stream', (remoteStream) => {
      store.dispatch(setRemoteStream(remoteStream));
    });
  });
  newPeer.on('error', (error) => {
    console.error('PeerJS error:', error);
  });
}

export const registerNewUser = (enableCam) => {
  socket.emit('register-new-user', {
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

export const startCall = () => {
  const { peer, localStream, userToCall } = store.getState().callSlice;
  const { peerId } = userToCall
  if (peer && localStream && peerId) {
    const call = peer.call(peerId, localStream);
    call.on('stream', (remoteStream) => {
      store.dispatch(setRemoteStream(remoteStream))
      store.dispatch(setLoader(false))
      store.dispatch(setCallState('CALL_IN_PROGRESS'))
      socket.emit('stop-loader', userToCall.socketId)
    });
  }
};

export const handleUserHangedUp = async () => {
  store.dispatch(setCallState('CALL_AVAILABLE'));
};

export const hangUpAutomateCall = async () => {
  const dispatch = store.dispatch  
  socket.emit('end-call', store.getState().callSlice.userToCall.socketId)
  store.dispatch(setCallState('CALL_AVAILABLE'));
  dispatch(setLoader(true))
  await getActiveUser('skip')
  dispatch(setUserToCall(""))
}

export const getActiveUser = async (flag) => {
  socket.emit('get-active-user', { flag: flag || '', prevUser: store.getState().callSlice.userToCall || '' });
};

export const updateName = (username) => {
  socket.emit('update-name', { name: username, socketId: socket.id });
};

export const sendMessage = (message) => {
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
  socket.emit('enableDisableCam', enable);
};

export const closeTab = (data) => {
  socket.emit('disconnect-current-user', { userSocketId: store.getState().callSlice.userToCall.socketId, mySocketId: socket.id });
};

export const sendUserHangedUp = async (data) => {
  socket.emit('user-hanged-up', data);
};
