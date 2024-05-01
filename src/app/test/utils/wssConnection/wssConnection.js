import socketClient from 'socket.io-client';
import store from '../../../../redux/store';
import { setActiveUsers } from '../../../../redux/features/dashboardSlice';
import * as webRTCHandler from '../webRTC/webRTCHandler';
import { setActiveUserData, setMySocketId, setUserName, setUpdateMessage, setSocketConnected } from '../../../../redux/features/chatSlice';
import { getApi } from '../../../../response/api';
const token = store.getState().loginSlice.token || ""

const SERVER = 'http://localhost:8080';

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
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
    if(socket.id){
      dispatch(setSocketConnected(true))
      console.log(socket.id)
    }
  });

  socket.on('broadcast', (data) => {
    handleBroadcastEvents(data);
  });

  // listeners related with direct call
  socket.on('pre-offer', (data) => {    
    webRTCHandler.handlePreOffer(data);
  });

  socket.on('pre-offer-answer', (data) => {
    
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on('webRTC-offer', (data) => {
    
    webRTCHandler.handleOffer(data);
  });

  socket.on('webRTC-answer', (data) => {
    
    webRTCHandler.handleAnswer(data);
  });

  socket.on('webRTC-candidate', (data) => {
    webRTCHandler.handleCandidate(data);
  });

  socket.on('user-hanged-up', () => {
    webRTCHandler.handleUserHangedUp();
  });
  socket.on("typing", (name) => {
    dispatch(setUserName(name))
  });
  socket.on("stop typing", () => {
    dispatch(setUserName(""))
  });
  socket.on("sendMessage", (msg) => {
    setUpdateMessage(msg)
    //setUpdateMessage(msg)
  });
  socket.emit("setup", store.getState().loginSlice.loginDetails._id);
  socket.on("me", (id) => {
    dispatch(setMySocketId(id))
  })
  
};

export const registerNewUser = (username) => {
  socket.emit('register-new-user', {
    username: username,
    socketId: socket.id
  });
};

// emitting events to server related with direct call

export const sendPreOffer = (data) => {  
  socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
  
  socket.emit('pre-offer-answer', data);
};

export const sendWebRTCOffer = (data) => {
  
  socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data) => {
  
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
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers = data.activeUsers.filter(activeUser => activeUser.socketId && (activeUser.socketId !== socket.id));
      store.dispatch(setActiveUsers(activeUsers));
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
