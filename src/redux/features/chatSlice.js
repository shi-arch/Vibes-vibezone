import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUserData: [],
  selectedUserData: {},
  chatData: "",
  messagesArr: [],
  mySocketId: "",
  userName: "",
  calleeUserName: "",
  activeUserData: [],
  updateMessage: "",
  socketConnected: false,
  loader: false,
  calleeUserData: "",
  isTyping: false
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    addChat: (state, actions) => {
      state.push(actions.payload.chat);
    },
    setSearchUserData: (state, actions) => {
      state.searchUserData = actions.payload;
    },
    setSelectedUserData: (state, actions) => {      
      state.selectedUserData = actions.payload;
    },
    setChatData: (state, actions) => {      
      state.chatData = actions.payload;
    },
    setMessages: (state, actions) => {
      state.messagesArr = actions.payload;
    },
    setMySocketId: (state, actions) => {      
      state.mySocketId = actions.payload;
    },
    setUserName: (state, actions) => {      
      state.userName = actions.payload;
    },
    setActiveUserData: (state, actions) => {      
      state.activeUserData = actions.payload;
    },
    setUpdateMessage: (state, actions) => {      
      state.updateMessage = actions.payload;
    },
    setSocketConnected: (state, actions) => {      
      state.socketConnected = actions.payload;
    },
    setCalleeUserName: (state, actions) => {      
      state.calleeUserName = actions.payload;
    },
    setLoader: (state, actions) => {
      state.loader = actions.payload;
    },
    setCalleeUserData: (state, actions) => {
      state.calleeUserData = actions.payload;
    },
    setIsTyping: (state, actions) => {
      state.isTyping = actions.payload;
    }
  },
});

export const { addChat, setCalleeUserData, setLoader, setSearchUserData, setSelectedUserData, setChatData, setMySocketId, setMessages, setUserName, setCalleeUserName, setActiveUserData, setUpdateMessage, setSocketConnected, setIsTyping } = chatSlice.actions;

export default chatSlice.reducer;
