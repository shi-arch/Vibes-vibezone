"use client";

import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/chatSlice";
import modalSlice from "./features/modalSlice";

export const store = configureStore({
  reducer: {
    chatSlice: chatSlice,
    modalSlice,
  },
});
