import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localStream: "", //
  callState: 'CALL_UNAVAILABLE' || "", //
  callingDialogVisible: false,
  callerUsername: '',
  callRejected: {
    rejected: false,
    reason: ''
  },
  buttonLabel: 'Connect',
  remoteStream: "",
  localCameraEnabled: true,
  localMicrophoneEnabled: false,
  screenSharingActive: false,
  groupCallActive: false,
  groupCallStreams: [],
  isActive: true,
  message: {
    received: false,
    content: ''
  },
  startCall: false,
  userToCall: "",
  triggerCall: false,
  disableButton: false,
  socketConnection: "",
  timer: false,
  flag: false,
  bgColor: '#8f47ff',
  keyWords: "",
  connectedTime: "",
  timeDiff: "",
  userObjectId: "",
  socketId: "",
  peerId: "",
  peer: "",
  triggerEndCall: false
};


const callSlice = createSlice({
  name: "callSlice",
  initialState: initialState,
  reducers: {
    setLocalStream: (state, actions) => {
      state.localStream = actions.payload;
    },
    setPeer: (state, actions) => {
      state.peer = actions.payload;
    },
    setCallState: (state, actions) => {
      state.callState = actions.payload;
    },
    setCallingDialogVisible: (state, actions) => {      
      state.callingDialogVisible = actions.payload;
    },
    setCallerUsername: (state, actions) => {
      state.callerUsername = actions.payload;
    },
    setCallRejected: (state, actions) => {
      state.callRejected = actions.payload;
    },
    setRemoteStream: (state, actions) => {
      state.remoteStream = actions.payload;
    },
    setLocalCameraEnabled: (state, actions) => {
      state.localCameraEnabled = actions.payload;
    },
    setLocalMicrophoneEnabled: (state, actions) => {
      state.localMicrophoneEnabled = actions.payload;
    },
    setScreenSharingActive: (state, actions) => {
      state.screenSharingActive = actions.payload;
    },
    setGroupCallActive: (state, actions) => {
      state.groupCallActive = actions.payload;
    },
    setGroupCallStreams: (state, actions) => {
      state.groupCallStreams = actions.payload;
    },
    setMessage: (state, actions) => {
      state.message = actions.payload;
    },
    setStartCall: (state, actions) => {
      state.startCall = actions.payload;
    },
    setButtonLabel: (state, actions) => {
      state.buttonLabel = actions.payload;
    },
    setIsActive: (state, actions) => {
      state.isActive = actions.payload;
    },
    setUserToCall: (state, actions) => {
      state.userToCall = actions.payload;
    },
    setTriggerCall: (state, actions) => {
      state.triggerCall = actions.payload;
    },
    setDisableButton: (state, actions) => {
      state.disableButton = actions.payload;
    },
    setSocketConnection: (state, actions) => {
      state.socketConnection = actions.payload;
    },
    setSocketId: (state, actions) => {
      state.socketId = actions.payload;
    },
    setBgColor: (state, actions) => {
      state.bgColor = actions.payload;
    },
    setFlag: (state, actions) => {
      state.flag = actions.payload;
    },
    setTimer: (state, actions) => {
      state.timer = actions.payload;
    },
    setKeyWords: (state, actions) => {
      state.keyWords = actions.payload;
    },
    setConnectedTime: (state, actions) => {
      state.connectedTime = actions.payload;
    },
    setTimeDiff: (state, actions) => {
      state.timeDiff = actions.payload;
    },
    setUserObjectId: (state, actions) => {
      state.userObjectId = actions.payload;
    },
    setPeerId: (state, actions) => {
      state.peerId = actions.payload;
    },
    setTriggerEndCall: (state, actions) => {
      state.triggerEndCall = actions.payload;
    }
  }  
});

export const { setTriggerEndCall, setPeer, setPeerId, setSocketId, setUserObjectId, setTimeDiff, setConnectedTime, setKeyWords, setBgColor, setFlag, setTimer, setSocketConnection, setUserToCall, setTriggerCall, setLocalStream,setCallRejected,setCallState,setCallerUsername,setCallingDialogVisible,setRemoteStream,setLocalCameraEnabled,setLocalMicrophoneEnabled,setScreenSharingActive,setGroupCallActive,setGroupCallStreams,setMessage, setDisableButton, setStartCall, setButtonLabel, setIsActive } = callSlice.actions;

export default callSlice.reducer;
