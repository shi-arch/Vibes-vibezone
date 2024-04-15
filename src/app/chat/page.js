
import Chat from '../../components/chat'
import PreferenceModal from "../../components/Modals/PreferenceModal";
import ProfileModal from "../../components/Modals/ProfileModal";
import BadgesModal from "../../components/Modals/BadgesModal";
import { useDispatch } from "react-redux";
import PrivacyPolicyModal from "../../components/Modals/PrivacyPolicyModal";
import NotificationModal from "../../components/Modals/NotificationModal";
import BillingModal from "../../components/Modals/BillingModal";
import React, { useEffect } from 'react'
import { setLoginDetails, setToken, setUserProfile, setAllPreferences } from "../../redux/features/loginSlice";
import { getApi } from '../../response/api';

const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let userData = localStorage.getItem("userData")
    if (userData) {
      const { user, token } = JSON.parse(userData)
      dispatch(setLoginDetails(user));
      dispatch(setToken(token));
      getApi("/profile", token).then(res => {
        if (res) {
          dispatch(setUserProfile(res.data));
        }
      })
      getApi("/config?type=preference", token)
      .then((response) => {
        if(response.data){
          dispatch(setAllPreferences(response.data));
        }
      })
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

