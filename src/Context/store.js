"use client";

import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/chatSlice";
import modalSlice from "./features/modalSlice";
import loginSlice from "./features/loginSlice";

export const store = configureStore({
  reducer: {
    chatSlice,
    modalSlice,loginSlice
  },
});
