import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginDetails: "",
  verifyOtp: false,
  token: "",
  userProfile: "",
  allUsers: "",
  allPreferences: [],
  userSelectedTopics: [],
  totalUsers: {
    enableCam: 0,
    disableCam: 0,
    totalUserCount: 0,
    activeUsersCount: 0
  },
  redirectToHome: false
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
    setTotalUsers: (state, actions) => {
      state.totalUsers = actions.payload;
    },
    setRedirectToHome: (state, actions) => {
      state.redirectToHome = actions.payload;
    }
  },
});

export const { setLoginDetails, setRedirectToHome, setTotalUsers, setVerifyOtp, setToken, setUserProfile, setAllUsers, setAllPreferences, setUserSelectedTopics } = loginSlice.actions;

export default loginSlice.reducer;
