import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {
    addChat: (state, actions) => {
      state.push(actions.payload.chat);
    },
  },
});

export const { addChat } = chatSlice.actions;

export default chatSlice.reducer;
