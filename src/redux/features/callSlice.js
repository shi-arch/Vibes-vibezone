import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localStream: null, //
  callState: 'CALL_UNAVAILABLE', //
  callingDialogVisible: false,
  callerUsername: '',
  callRejected: {
    rejected: false,
    reason: ''
  },
  remoteStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
  groupCallActive: false,
  groupCallStreams: [],
  hangUps: true,
  message: {
    received: false,
    content: ''
  },
  startCall: false
};

const callSlice = createSlice({
  name: "callSlice",
  initialState: initialState,
  reducers: {
    setLocalStream: (state, actions) => {
      state.localStream = actions.payload;
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
    setHangUp: (state, actions) => {
      state.hangUps = actions.payload;;
    },
    setStartCall: (state, actions) => {
      state.startCall = actions.payload;
    }
  }  
});

export const { setLocalStream,setCallRejected,setCallState,setCallerUsername,setCallingDialogVisible,setRemoteStream,setLocalCameraEnabled,setLocalMicrophoneEnabled,setScreenSharingActive,setGroupCallActive,setGroupCallStreams,setMessage, setHangUp, setStartCall } = callSlice.actions;

export default callSlice.reducer;
