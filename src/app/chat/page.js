
import Chat from '../../components/chat'
import PreferenceModal from "../../components/Modals/PreferenceModal";
import ProfileModal from "../../components/Modals/ProfileModal";
import BadgesModal from "../../components/Modals/BadgesModal";
import { useDispatch } from "react-redux";
import PrivacyPolicyModal from "../../components/Modals/PrivacyPolicyModal";
import NotificationModal from "../../components/Modals/NotificationModal";
import BillingModal from "../../components/Modals/BillingModal";
import React, { useEffect } from 'react'
import { setLoginDetails, setToken } from "../../redux/features/loginSlice";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  let userData = localStorage.getItem("userData")
  if(userData){
    const parsedData = JSON.parse(userData)
    dispatch(setLoginDetails(parsedData.user));
    dispatch(setToken(parsedData.token));
  }  
  }, []);
    return (
      <div>
        <Chat />
        <BadgesModal />
        <ProfileModal />
        <BillingModal />
        <PrivacyPolicyModal />
        <NotificationModal />
        <PreferenceModal />
        <ProfileModal />
      </div>
    );
}

export default Page

