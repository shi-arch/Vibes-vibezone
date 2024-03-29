import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUserData: [],
  selectedUserData: {}
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
      debugger
      state.selectedUserData = actions.payload;
    },
  },
});

export const { addChat, setSearchUserData, setSelectedUserData } = chatSlice.actions;

export default chatSlice.reducer;
