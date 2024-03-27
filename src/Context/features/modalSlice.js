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
    setLeftOpen: (state) => {
      state.leftOpen = !state.leftOpen;
    },
    setRightOpen: (state) => { 
      state.rightOpen = !state.rightOpen;
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
  setRightOpen
} = modalSlice.actions;

export default modalSlice.reducer;
