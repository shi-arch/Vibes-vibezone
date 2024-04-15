import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUserData: [],
  selectedUserData: {},
  chatData: "",
  messagesArr: [],
  mySocketId: "",
  userName: "",
  activeUserData: []
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
  },
});

export const { addChat, setSearchUserData, setSelectedUserData, setChatData, setMySocketId, setMessages, setUserName, setActiveUserData } = chatSlice.actions;

export default chatSlice.reducer;
