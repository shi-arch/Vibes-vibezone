import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginDetails: "",
  verifyOtp: false,
  token: "",
  userProfile: "",
  allUsers: "",
  allPreferences: [],
  userSelectedTopics: [],
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
    setUserProfile: (state, actions) => {
      state.userProfile = actions.payload;
    },
    setAllUsers: (state, actions) => {
      state.allUsers = actions.payload;
    },
    setAllPreferences: (state, actions) => {
      state.allPreferences = actions.payload;
    },
    setUserSelectedTopics: (state, actions) => {
      state.userSelectedTopics = actions.payload;
    },
  },
});

export const { setLoginDetails, setVerifyOtp, setToken, setUserProfile, setAllUsers,  setAllPreferences, setUserSelectedTopics} = loginSlice.actions;

export default loginSlice.reducer;
