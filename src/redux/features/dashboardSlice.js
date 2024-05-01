import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  activeUsers: [],
  groupCallRooms: [],
  availableUsers: []
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
    setGroupCallRooms: (state, actions) => {      
      state.groupCallRooms = actions.payload;
    },
    setAvailableUsers: (state, actions) => {      
      state.availableUsers = actions.payload;
    },
    
  },
});

export const {setActiveUsers, setGroupCallRooms, setUserName, setAvailableUsers} = dashboardSlice.actions;

export default dashboardSlice.reducer;
