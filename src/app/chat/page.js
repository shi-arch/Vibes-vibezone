
import Chat from '../../components/chat'
import PreferenceModal from "../../components/Modals/PreferenceModal";
import ProfileModal from "../../components/Modals/ProfileModal";
import BadgesModal from "../../components/Modals/BadgesModal";
import CallModal from "../../components/Modals/CallModal";
import RejectModal from "../../components/Modals/RejectModal";
import { useDispatch, useSelector } from "react-redux";
import PrivacyPolicyModal from "../../components/Modals/PrivacyPolicyModal";
import NotificationModal from "../../components/Modals/NotificationModal";
import BillingModal from "../../components/Modals/BillingModal";
import React, { useEffect } from 'react'
import loginSlice, { setLoginDetails, setToken, setUserProfile, setAllPreferences } from "../../redux/features/loginSlice";
import { getApi } from '../../response/api';
import { connectWithWebSocket, registerNewUser } from '../test/utils/wssConnection/wssConnection';
import IncomingCallModal from '../../components/Modals/IncomingCallModal';
import store from '../../redux/store';
import { setCallState } from '../../redux/features/callSlice';

const Page = () => {
  const dispatch = useDispatch();
  const {loginDetails} = useSelector(state => state.loginSlice);
  const {socketConnected} = useSelector(state => state.chatSlice);

  useEffect(async () => {
    let userData = localStorage.getItem("userData")
    if (userData) {
      const { user, token } = JSON.parse(userData)
      dispatch(setLoginDetails(user));
      await connectWithWebSocket() 
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

  useEffect(() => {
    if (socketConnected) {
      registerNewUser(loginDetails.Name || "Guest")
      console.log("socket connected")
    }
    store.dispatch(setCallState('CALL_AVAILABLE'));
  }, [socketConnected])
  return (
    <div>
      <CallModal />
      <RejectModal />
      <IncomingCallModal />
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

