import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/chatSlice";
import modalSlice from "./features/modalSlice";
import loginSlice from "./features/loginSlice";

const store = configureStore({
  reducer: {
    chatSlice,
    modalSlice,loginSlice
  },
});

export default store
