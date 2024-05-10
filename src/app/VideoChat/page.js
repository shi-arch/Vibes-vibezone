import React, { useEffect } from 'react'

import SideBarNew from '../../components/SideBarNew';



import "./videochat.css"
import HeaderNew from '../../components/HeaderNew';
import CallInterface from '../../components/chat/callInterface';
import VideoCallInterFace from '../../components/VideoCallInterFace';
import ChatInterfaceNew from '../../components/ChatInerfaceNew';
import { CreatePeerConnection, getLocalStream } from '../test/utils/webRTC/webRTCHandler';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setLocalCameraEnabled } from '../../redux/features/callSlice';
import { userCamOff } from '../test/utils/wssConnection/wssConnection';
import { EndCall, LogoSvg, Mute, Video } from '../../components/svgComponents';
import CallIcons from '../../components/CallIcons';
import ActiveUsers from '../../components/ActiveUsers';

const VideoChat = () => {
  const dispatch = useDispatch()
  const { userName } = useSelector(state => state.chatSlice)
  const { localStream, callState, remoteStream, localCameraEnabled, localMicrophoneEnabled, hangUps } = useSelector((state) => state.callSlice);
  useEffect(async () => {
    const streamObj = await getLocalStream()
    await CreatePeerConnection();
    Swal.fire({
      title: 'Want to enable the camera?',
      text: "Enabling camera will better help you to communicate with strangers!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, enable it!'
    }).then(function (res) {
      let enableCam = true
      if(res.dismiss == 'cancel'){
        enableCam = false
      }
      streamObj.getVideoTracks()[0].enabled = enableCam;
      dispatch(setLocalCameraEnabled(enableCam))
      userCamOff(userName, enableCam)
    })
  }, [])
  return (
    <div className="video-chat-bg-container">
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
}

export default VideoChat