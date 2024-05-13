import socketClient from 'socket.io-client';
import store from '../../../../redux/store';
import { setActiveUsers, setCamOffUsers, setInActiveUsers } from '../../../../redux/features/dashboardSlice';
import * as webRTCHandler from '../webRTC/webRTCHandler';
import { setActiveUserData, setMySocketId, setUserName, setUpdateMessage, setSocketConnected, setCalleeUserName, setMessages, setSelectedUserData, setIsTyping, setUserAvailable } from '../../../../redux/features/chatSlice';
import { getApi } from '../../../../response/api';
import { setButtonLabel, setDisableButton, setIsActive, setTriggerCall, setUserToCall } from '../../../../redux/features/callSlice';
import { setTotalUsers } from '../../../../redux/features/loginSlice';
const token = store.getState().loginSlice.token || ""

const SERVER = process.env.REACT_APP_BASEURL;
const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
  INACTIVE_USERS: 'INACTIVE_USERS',
  CAMERA_OFF: 'CAMERA_OFF'
};

let socket;

const getActiverUserData = async () => {
  getApi('/activeUsers', token).then(res => {
    if (res) {
      store.dispatch(setActiveUserData(res.data))
    }
  })
}

export const connectWithWebSocket = async () => {
  const dispatch = store.dispatch
  socket = socketClient(SERVER);

  socket.on('connection', () => {
    if (socket.id) {
      dispatch(setSocketConnected(true))
      console.log(socket.id)
    }
  });

  socket.on('broadcast', (data) => {
    handleBroadcastEvents(data);    
  });

  socket.on('new-caller-found', (calleeUserData) => {
    dispatch(setSelectedUserData(calleeUserData))
  })

  // listeners related with direct call
  socket.on('pre-offer', (data) => {
    dispatch(setButtonLabel('Skip'))
    dispatch(setSelectedUserData({socketId: data.callerSocketId}))
    dispatch(setCalleeUserName(data.callerUsername))
    webRTCHandler.handlePreOffer(data);
  });

  socket.on('pre-offer-answer', (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on('webRTC-offer', (data) => {
    
    webRTCHandler.handleOffer(data);
  });

  socket.on('get-active-users', (data) => {
    const obj = {
      event:broadcastEventTypes.ACTIVE_USERS,
      activeUsers: data
    }   
     
    handleBroadcastEvents(obj)   
  });

  socket.on('webRTC-answer', (data) => {
    
    webRTCHandler.handleAnswer(data);
  });

  socket.on('webRTC-candidate', (data) => {
    webRTCHandler.handleCandidate(data);
  });

  // socket.on('set-me-offline-and-online', (data) => {
  //   //webRTCHandler.handleMeOnlineOffline(data);
  // });

  socket.on('user-hanged-up', () => {
    dispatch(setUserToCall(""))
    dispatch(setMessages([]))
    webRTCHandler.handleUserHangedUp();
  });
  socket.on("typing", (name) => {
    dispatch(setIsTyping(true))
    dispatch(setUserName(name))
  });
  socket.on("get-active-user-test", (user) => {
    let userData = user
    if(user.findActiveUser){
      userData = user.findActiveUser
    } else {
      dispatch(setTriggerCall(true))
    } 
    dispatch(setUserToCall(userData))
  });  
  socket.on("stop typing", () => {
    dispatch(setIsTyping(false))
    dispatch(setUserName(""))
  });
  socket.on("sendMessage", (msg) => {
    setUpdateMessage(msg)
    //setUpdateMessage(msg)
  });
  socket.on("isUser-available", (data) => {
    dispatch(setUserAvailable(data))
  });  
  socket.emit("setup", store.getState().loginSlice.loginDetails._id);
  socket.on("me", (id) => {
    dispatch(setMySocketId(id))
  })
  socket.on("send-message", (data) => {
    let arr = _.cloneDeep(store.getState().chatSlice.messagesArr)
    let o = {message: data.msgObj.message, sender: false}
    if(arr.length){
      arr[arr.length] = o 
    } else {
      arr.push(o)
    }    
    dispatch(setMessages(arr))
  })
  socket.on("get-active-user", (user) => {
    dispatch(setUserToCall(user))
  })  
};

export const registerNewUser = (username, enableCam) => {
  
  socket.emit('register-new-user-test', {
    username: username,
    socketId: socket.id,
    enableCam: enableCam,
    isActive: false
  });
};

export const getActiverUser = () => {
  socket.emit('get-active-user');
};

export const startCall = () => {  
  const myObj = {
    username: store.getState().chatSlice.userName,
    calleeUserSocketId: store.getState().callSlice.userToCall.socketId,
  }
  
  socket.emit('start-random-call', myObj);
};

export const getAvailableUser = async () => {
  socket.emit('isUser-available');
};

export const getActiveUser = async (flag) => {
  socket.emit('get-active-user-test', {flag: flag, prevUser: store.getState().callSlice.userToCall});
};

export const handleMeOnlineOffline = async (isOnline) => {
  
  socket.emit('set-me-offline-and-online', {id: socket.id, isOnline: isOnline});
};

export const updateName = (username) => {
  socket.emit('update-name', {name: username, socketId: socket.id});
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

export const sendPreOffer = (data) => {  
  socket.emit('pre-offer', data);
};
export const turnConnectedCuserInActive = (data) => {  
  socket.emit('inactive-connected-users');
};

export const sendPreOfferAnswer = (data) => {
  socket.emit('pre-offer-answer', data);
};

export const closeTab = (data) => {
  socket.emit('disconnect-current-user', socket.id);
};

export const sendWebRTCOffer = (data) => {
  
  socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data) => {
  store.dispatch(setDisableButton(false))
  socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit('webRTC-candidate', data);
};

export const sendUserHangedUp = (data) => {
  socket.emit('user-hanged-up', data);
};

// emitting events related with group calls

export const registerGroupCall = (data) => {
  socket.emit('group-call-register', data);
};

export const userWantsToJoinGroupCall = (data) => {
  socket.emit('group-call-join-request', data);
};

export const userLeftGroupCall = (data) => {
  socket.emit('group-call-user-left', data);
};

export const groupCallClosedByHost = (data) => {
  socket.emit('group-call-closed-by-host', data);
};

const handleBroadcastEvents = (data) => {
  switch (data.event) {
    case 'REGISTER_NEW_USER':
      store.dispatch(setTotalUsers(data.totalUsers));
      break;
    // case broadcastEventTypes.GROUP_CALL_ROOMS:
    //   const groupCallRooms = data.groupCallRooms.filter(room => room.socketId !== socket.id);
    //   const activeGroupCallRoomId = webRTCGroupCallHandler.checkActiveGroupCall();

    //   if (activeGroupCallRoomId) {
    //     const room = groupCallRooms.find(room => room.roomId === activeGroupCallRoomId);
    //     if (!room) {
    //       webRTCGroupCallHandler.clearGroupData();
    //     }
    //   }
    //   //store.dispatch(dashboardActions.setGroupCalls(groupCallRooms));
    //   break;
    default:
      break;
  }
};
