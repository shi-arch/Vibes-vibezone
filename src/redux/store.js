import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/chatSlice";
import modalSlice from "./features/modalSlice";
import loginSlice from "./features/loginSlice";
import callSlice from "./features/callSlice";
import dashboardSlice from "./features/dashboardSlice";

const store = configureStore({
  reducer: {
    chatSlice,
    modalSlice,loginSlice, callSlice, dashboardSlice
  },
});

export default store
