import React from "react";
import Swal from "sweetalert2";
import { Loader } from '../../components/commonComponents/commonComponents'
import "./videocallInterface.css";
import {
  EndCall,
  LogoSvg,
  Mute,
  Video,
  Unmute,
  VideoOff,
} from "../svgComponents";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import {
  hangUp,
  hangUpAutomateCall,
  switchForScreenSharingStream,
} from "../../app/test/utils/webRTC/webRTCHandler.js";
import {
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
  setHangUp,
  setStartCall,
} from "../../redux/features/callSlice.js";
import {
  CreatePeerConnection,
  callToOtherUser,
  getLocalStream,
} from "../../app/test/utils/webRTC/webRTCHandler.js";
import { setCalleeUserName, setLoader, setSelectedUserData } from "../../redux/features/chatSlice.js";
import CallIcons from "../CallIcons/index.js";

const VideoCallInterFace = () => {
  const dispatch = useDispatch();
  const [mute, setMute] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const { userName, loader, userAvailable } = useSelector((state) => state.chatSlice);
  const { activeUsers } = useSelector((state) => state.dashboardSlice);
  const {
    localStream,
    callState,
    remoteStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    hangUps,
    buttonLabel,
  } = useSelector((state) => state.callSlice);

  useEffect(() => {
    if (localStream) {
      const localVideo = myVideo.current;
      localVideo.srcObject = localStream;
      localVideo.onloadedmetadata = () => {
        localVideo.play();
        dispatch(setHangUp(false));
      };
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = userVideo.current;
      remoteVideo.srcObject = remoteStream;
      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
        dispatch(setHangUp(false));
      };
    }
  }, [remoteStream]);
  return (
    <div className="video-call-interface-bg-container">
      <div className="video-img-container">
        {
          <video
            id="myVideo"
            style={
              localStream
                ? { width: "100%", height: "229px",objectFit:"cover" }
                : { width: 0, height: 0, visibility: "hidden" }

            }
            ref={myVideo}
            autoPlay
            playsInline
            muted
          />
        }
        {!localStream && (
          <>
            <img
              src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
              className="video"
              alt="person1"
            />
            <div className="logo-float">
              <LogoSvg width={60} height={20} />
            </div>
          </>
        )}
      </div>
      <div className="video-img-container">
        {remoteStream && callState === "CALL_IN_PROGRESS" && (
          <video
            id="userVideo"
            style={{ width: "100%", height: "229px" }}
            ref={userVideo}
            autoPlay
            playsInline
          //muted
          />
        )}
        {loader ? <Loader style={{ position: 'absolute', left: '125px', top: '104px' }} /> : null}
        {!remoteStream ? (
          <>
            <img
              src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
              className="video"
              alt="person2"
            />
            <div className="logo-float">
              <LogoSvg width={60} height={20} />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="sm-lg-icon-video-call-container">
        <CallIcons />
      </div>

      {/* <div className="call-icons-container">
        <div onClick={handleMicButtonPressed}>
          {mute ? <Mute /> : <Unmute />}
        </div>
        <div onClick={handleCameraButtonPressed}>
          {localCameraEnabled ? <Video /> : <VideoOff />}
        </div>
        <div onClick={handleHangUpButtonPressed}>
          <EndCall />
        </div>
      </div> */}
    </div>
  );
};

export default VideoCallInterFace;
