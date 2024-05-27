import React, { useEffect } from "react";
import SideBarNew from "../../components/SideBarNew";
import "./videochat.css"
import HeaderNew from '../../components/HeaderNew';
import VideoCallInterFace from '../../components/VideoCallInterFace';
import ChatInterfaceNew from '../../components/ChatInerfaceNew';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setLocalCameraEnabled } from '../../redux/features/callSlice';
import { connectWithWebSocket, initiate, registerNewUser } from '../utils/wssConnection/wssConnection';
import { LogoSvg } from '../../components/svgComponents';
import CallIcons from '../../components/CallIcons';
import ActiveUsers from '../../components/ActiveUsers';
import EarlyBoardAccessModal from "../../components/Modals/EarlyAccessBardModal";
import EarlybardHeader from "../../components/EarlyBardHeader";

const VideoChat = () => {
  const dispatch = useDispatch()
  const { userName, userLoggedIn } = useSelector(state => state.chatSlice)
  const { localStream, peer } = useSelector(state => state.callSlice)
  useEffect(() => {
    (async function () {
      connectWithWebSocket()
      await initiate()
    })();
  }, [])

  useEffect(() => {
    if (userName && localStream) {
      Swal.fire({
        title: "Want to enable the camera?",
        text: "Enabling camera will better help you to communicate with strangers!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, enable it!'
      }).then(async (res) => {
        if (res && res.isDenied == false) {
          let enableCam = true
          if (res.dismiss == 'cancel') {
            enableCam = false
          }
          registerNewUser(enableCam);            
          localStream.getVideoTracks()[0].enabled = enableCam;
          dispatch(setLocalCameraEnabled(enableCam))
        }
      })
    }
    return () => {
      if (peer) {
        peer.disconnect();
        peer.destroy();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [userName, localStream])

  useEffect(() => {
    if (!userLoggedIn) {
      window.location.href = window.location.origin
    }
  }, [userLoggedIn])
  return (
    <div className="video-chat-bg-container">
      <EarlybardHeader />
      <EarlyBoardAccessModal />
      <SideBarNew />
      <div className="video-right-container">
        <div className='logo-sm-lg-container'>
          <LogoSvg />
        </div>

        <HeaderNew />
        <div className="sm-lg-icons-container">
          <div className="video-chat-new-container">
            <VideoCallInterFace />
            <ChatInterfaceNew />
          </div>
          <div>
            <div className="active-sm-lg-container">
              <ActiveUsers />
            </div>

            <div className="call-icons-container-sm-lg">
              <CallIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
