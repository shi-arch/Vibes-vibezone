import socketClient from 'socket.io-client';
import store from '../../../redux/store';
import { setUserName, setMessages, setIsTyping } from '../../../redux/features/chatSlice';
import { setTriggerCall, setUserToCall, setSocketId, setCallState, setButtonLabel, setTriggerEndCall, setDisableButton, setSkipTimer, setCurrentCall } from '../../../redux/features/callSlice';
import { setTotalUsers } from '../../../redux/features/loginSlice';
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
  socket.on("skip-timer", () => {
    store.dispatch(setSkipTimer(true))
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
    dispatch(setMessages(arr))
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
    if(data && data.totalUsers){
      store.dispatch(setTotalUsers(data.totalUsers))
    }
  });
  socket.on('register-user', () => {
    setTimeout(() => {
      store.dispatch(setDisableButton(false))
    }, 4000)
  });
  
  socket.on('user-hanged-up', async () => {
    const dispatch = store.dispatch
    dispatch(setCallState('CALL_AVAILABLE'))
    dispatch(setUserToCall(""))
    dispatch(setMessages([]))
    await getActiveUser()
  });
};

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

export const startCall = async (peer, localStream, userToCall, setRemoteStream, setCurrentCall) => {
  try {
    const { peerId } = userToCall
    if (peer && localStream && peerId) {
      const call = await peer.call(peerId, localStream)
      call.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream)
        if(store.getState().callSlice.buttonLabel !== 'Skip'){
          store.dispatch(setButtonLabel('Skip'))
        } 
        console.log('user connected >>>>>>>>>>')
      });
      await setCurrentCall(call)
      call.on('close', async () => {
        store.dispatch(setSkipTimer(true))
        store.dispatch(setDisableButton(true))
        store.dispatch(setMessages([]))
        await getActiveUser('skip')
        store.dispatch(setUserToCall(""))
        store.dispatch(setCallState('CALL_AVAILABLE'))
        console.log('Call ended>>>>>>>>>>>>>>>>');
      });
    }
  } catch (err) {
    console.log('start call error: ', err);
  }
};

export const handleUserHangedUp = async () => {
  store.dispatch(setCallState('CALL_AVAILABLE'));
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

export const closeTab = () => {
  socket.emit('disconnect-current-user', { userSocketId: store.getState().callSlice.userToCall.socketId, mySocketId: store.getState().callSlice.socketId });
};
