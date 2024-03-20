"use client";

import SideBar from "../../components/SideBar/sideBar";
import PreferenceModal from "../../components/Modals/PreferenceModal";
import ProfileModal from "../../components/Modals/ProfileModal";
import BadgesModal from "../../components/Modals/BadgesModal";
import PricingPlansModal from "../../components/Modals/PricingPlansModal";
import { useSelector } from "react-redux";

import "./index.css";

const Test = () => {
  const modalSelector = useSelector((state) => state.modalSlice);
  const { preferenceModal, profileModal } = modalSelector;

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

      <BadgesModal />

      {preferenceModal && <PreferenceModal />}
      {profileModal && <ProfileModal />}
    </div>
  );
};

export default Test;
