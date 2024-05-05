import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferenceModal: false,
  profileModal: false,
  notificationModal: false,
  privacyAndSecurityModal: false,
  billingModal: false,
  badgesModal: false,
  pricingAndPlans:false,
  leftOpen: true,
  rightOpen: true,
  css: false
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: initialState,
  reducers: {
    setPreferenceModal: (state) => {
      state.preferenceModal = !state.preferenceModal;
    },
    setProfileModal: (state) => {
      state.profileModal = !state.profileModal;
    },
    setNotificationModal: (state) => {
      state.notificationModal = !state.notificationModal;
    },
    setPrivacyAndSecurityModal: (state) => {
      state.privacyAndSecurityModal = !state.privacyAndSecurityModal;
    },
    setBillingModal: (state) => {
      state.billingModal = !state.billingModal;
    },
    setBadgesModal: (state) => {
      state.badgesModal = !state.badgesModal;
    },
    setPricingAndPlans:(state) => {
      state.pricingAndPlans = !state.pricingAndPlans;
    },
    setLeftOpen: (state, actions) => {
      state.leftOpen = actions.payload;
    },
    setRightOpen: (state, actions) => { 
      state.rightOpen = actions.payload;
    },
    setCss: (state, actions) => {
      state.css = actions.payload;
    }
  },
});

export const {
  setPreferenceModal,
  setProfileModal,
  setNotificationModal,
  setPrivacyAndSecurityModal,
  setBillingModal,
  setBadgesModal,
  setPricingAndPlans,
  setLeftOpen,
  setRightOpen,
  setCss
} = modalSlice.actions;

export default modalSlice.reducer;
