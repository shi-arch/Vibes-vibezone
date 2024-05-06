import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  activeUsers: [],
  groupCallRooms: [],
  availableUsers: [],
  inActiveUsers: [],
  camOffUsers: []
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: initialState,
  reducers: {
    setUserName: (state, actions) => {
      state.username = actions.payload;
    },
    setActiveUsers: (state, actions) => {
      state.activeUsers = actions.payload;
    },
    setCamOffUsers: (state, actions) => {
      state.camOffUsers = actions.payload;
    },
    setGroupCallRooms: (state, actions) => {      
      state.groupCallRooms = actions.payload;
    },
    setAvailableUsers: (state, actions) => {      
      state.availableUsers = actions.payload;
    },
    setInActiveUsers: (state, actions) => {
      state.inActiveUsers = actions.payload;
    },
  },
});

export const {setActiveUsers, setCamOffUsers, setInActiveUsers, setGroupCallRooms, setUserName, setAvailableUsers} = dashboardSlice.actions;

export default dashboardSlice.reducer;
