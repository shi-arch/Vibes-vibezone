import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferenceModal: false,
  profileModal: false,
  notificationModal: false,
  privacyAndSecurityModal: false,
  billingModal: false,
  badgesModal: false,
  reportModal: true,
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

    setReportModal: (state) => {
      state.reportModal = !state.reportModal;
    },
  },
});

export const {
  setPreferenceModal,

  setProfileModal,
  setNotificationModal,
  setPrivacyAndSecurityModal,
  setBillingModal,
  setBadgesModal,
  setReportModal,
} = modalSlice.actions;

export default modalSlice.reducer;
