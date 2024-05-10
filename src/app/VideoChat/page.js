import React, { useEffect } from "react";

import SideBarNew from "../../components/SideBarNew";

import "./videochat.css";
import HeaderNew from "../../components/HeaderNew";
import CallInterface from "../../components/chat/callInterface";
import VideoCallInterFace from "../../components/VideoCallInterFace";
import ChatInterfaceNew from "../../components/ChatInerfaceNew";
import {
  CreatePeerConnection,
  getLocalStream,
} from "../test/utils/webRTC/webRTCHandler";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setLocalCameraEnabled } from "../../redux/features/callSlice";
import { userCamOff } from "../test/utils/wssConnection/wssConnection";
import EarlyBoardAccessModal from "../../components/Modals/EarlyAccessBardModal";
import EarlybardHeader from "../../components/EarlyBardHeader";

const VideoChat = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.chatSlice);
  const {
    localStream,
    callState,
    remoteStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    hangUps,
  } = useSelector((state) => state.callSlice);
  useEffect(async () => {
    const streamObj = await getLocalStream();
    await CreatePeerConnection();
    Swal.fire({
      title: "Want to enable the camera?",
      text: "Enabling camera will better help you to communicate with strangers!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, enable it!",
    }).then(function (res) {
      const cameraEnabled = localCameraEnabled;
      if (res && res.dismiss == "cancel") {
        streamObj.getVideoTracks()[0].enabled = false;
        dispatch(setLocalCameraEnabled(!cameraEnabled));
        userCamOff(userName);
      } else {
        userCamOff();
      }
    });
  }, []);
  return (
    <div className="video-chat-bg-container">
      <EarlybardHeader />
      <EarlyBoardAccessModal />
      <SideBarNew />
      <div className="video-right-container">
        <HeaderNew />
        <div className="video-chat-new-container">
          <VideoCallInterFace />
          <ChatInterfaceNew />
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
