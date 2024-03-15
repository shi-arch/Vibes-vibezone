"use client";

import SideBar from "../../components/SideBar/sideBar";
import PreferenceModal from "../../components/Modals/PreferenceModal";
import ProfileModal from "../../components/Modals/ProfileModal";
import { useSelector } from "react-redux";

const Test = () => {
  const modalSelector = useSelector((state) => state.modalSlice);
  const { preferenceModal, profileModal } = modalSelector;

  return (
    <>
      <SideBar />
      {preferenceModal && <PreferenceModal />}
      {profileModal && <ProfileModal />}
    </>
  );
};

export default Test;
