import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginDetails: "",
  verifyOtp: false,
  token: ""
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    setLoginDetails: (state, actions) => {
      state.loginDetails = actions.payload;
    },
    setVerifyOtp: (state, actions) => {
      state.verifyOtp = actions.payload;
    },
    setToken: (state, actions) => {
      
      state.token = actions.payload;
    },
  },
});

export const {
    setLoginDetails, setVerifyOtp, setToken
} = loginSlice.actions;

export default loginSlice.reducer;
