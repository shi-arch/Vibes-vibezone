
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
import { setLoginDetails, setToken, setUserProfile, setAllPreferences } from "../../redux/features/loginSlice";
import { getApi } from '../../response/api';
import { getAvailableUser, registerNewUser } from '../utils/wssConnection/wssConnection';
import IncomingCallModal from '../../components/Modals/IncomingCallModal';
import store from '../../redux/store';
import { setCallState, setLocalCameraEnabled } from '../../redux/features/callSlice';
import { CreatePeerConnection, getLocalStream } from '../utils/webRTC/webRTCHandler';
import Swal from 'sweetalert2';

const Page = () => {
  const dispatch = useDispatch();
  const {loginDetails} = useSelector(state => state.loginSlice);
  const {socketConnected} = useSelector(state => state.chatSlice);
  const { profileImage, name, contact, userName, status } = useSelector(state => state.loginSlice.userProfile);

  useEffect(async () => {
    const streamObj = await getLocalStream()
    await CreatePeerConnection();
    if (name) {
      Swal.fire({
        title: "Want to enable the camera?",
        text: "Enabling camera will better help you to communicate with strangers!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, enable it!'
      }).then(async (res) => {
        await getAvailableUser()
        let enableCam = true
        if (res.dismiss == 'cancel') {
          enableCam = false
        }
        registerNewUser(name, enableCam);
        streamObj.getVideoTracks()[0].enabled = enableCam;
        dispatch(setLocalCameraEnabled(enableCam))
      })
    }
  }, [])

  useEffect(async () => {
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

