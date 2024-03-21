"use client";

import SideBar from "../../components/SideBar/sideBar";
import PreferenceModal from "../../components/Modals/PreferenceModal";
import ProfileModal from "../../components/Modals/ProfileModal";
import { useSelector } from "react-redux";
import PrivacyPolicyModal from "../../components/Modals/PrivacyPolicyModal";
import NotificationModal from "../../components/Modals/NotificationModal";
import BillingModal from "../../components/Modals/BillingModal";
import ReportModal from "../../components/Modals/ReportModal";
const test = () => {
  const modalSelector = useSelector((state) => state.modalSlice);
  const {
    preferenceModal,
    profileModal,
    privacyAndSecurityModal,
    notificationModal,
  } = modalSelector;

  return (
    <>
      <SideBar />
      <ReportModal />
      {/* <BillingModal /> */}
      {privacyAndSecurityModal && <PrivacyPolicyModal />}
      {notificationModal && <NotificationModal />}
      {preferenceModal && <PreferenceModal />}
      {profileModal && <ProfileModal />}
    </>
  );
};

export default test;
