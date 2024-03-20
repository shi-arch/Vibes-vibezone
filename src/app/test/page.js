"use client";

import SideBar from "../../components/SideBar/sideBar";
import PreferenceModal from "../../components/Modals/PreferenceModal";
import ProfileModal from "../../components/Modals/ProfileModal";
import BadgesModal from "../../components/Modals/BadgesModal";
import PricingPlansModal from "../../components/Modals/PricingPlansModal";
import { useSelector } from "react-redux";
import PrivacyPolicyModal from "../../components/Modals/PrivacyPolicyModal";
import NotificationModal from "../../components/Modals/NotificationModal";
import BillingModal from "../../components/Modals/BillingModal";

import "./index.css";

const Test = () => {
  const modalSelector = useSelector((state) => state.modalSlice);
  const { preferenceModal, profileModal, privacyAndSecurityModal, notificationModal, billingModal} = modalSelector;

  return (
    <div>
      <div
        className={`test-bg ${
          (preferenceModal || profileModal) && "test-bg-container"
        } `}
      >
        <SideBar />
        <div className="pricing-bg">
          {" "}
          <PricingPlansModal />{" "}
        </div>
      </div>
      {/* <BadgesModal /> */}
      {preferenceModal && <PreferenceModal />}
      {profileModal && <ProfileModal />}
      {billingModal && <BillingModal />}
      {privacyAndSecurityModal && <PrivacyPolicyModal />}
      {notificationModal && <NotificationModal />}
      {preferenceModal && <PreferenceModal />}
      {profileModal && <ProfileModal />}
    </div>
  );
};

export default Test;
