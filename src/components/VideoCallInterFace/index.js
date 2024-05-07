import React from "react";
import Swal from "sweetalert2";
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
import { setCalleeUserName } from "../../redux/features/chatSlice.js";
import { userCamOff } from "../../app/test/utils/wssConnection/wssConnection.js";
import CallIcons from "../CallIcons/index.js";

const VideoCallInterFace = () => {
  const dispatch = useDispatch();
  const [mute, setMute] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const { userName } = useSelector((state) => state.chatSlice);
  const { activeUsers } = useSelector((state) => state.dashboardSlice);
  const {
    localStream,
    callState,
    remoteStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    hangUps,
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

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    dispatch(setLocalMicrophoneEnabled(!micEnabled));
    setMute(!mute);
  };

  const handleCameraButtonPressed = () => {
    if (localCameraEnabled) {
      userCamOff(userName);
    }
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    dispatch(setLocalCameraEnabled(!cameraEnabled));
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = async () => {
    if (callState == `CALL_IN_PROGRESS`) {
      await hangUp();
      dispatch(setHangUp(true));
      const activeUserData = _.cloneDeep(activeUsers);
      if (activeUserData.length) {
        const filterData = activeUserData.filter(
          (user) => user.isActive === true
        );
        dispatch(setStartCall(true));
        if (filterData.length) {
          const calleeUserData =
            filterData[Math.floor(Math.random() * (filterData.length - 1))];
          dispatch(setCalleeUserName(calleeUserData.username));
          callToOtherUser(calleeUserData);
          await CreatePeerConnection();
        } else {
          Swal.fire({
            title: "sorry...",
            text: "No active users found!",
            icon: "error",
          });
        }
        //await getLocalStream()
      } else {
        Swal.fire({
          title: "sorry...",
          text: "No active users found!",
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="video-call-interface-bg-container">
      <div className="video-img-container">
        {
          <video
            id="myVideo"
            style={
              localStream
                ? { width: "100%", height: "auto" }
                : { width: 0, height: 0, visibility: "hidden" }
            }
            ref={myVideo}
            autoPlay
            playsInline
            muted
          />
        }
        {hangUps && (
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
            style={{ width: "100%", height: "auto" }}
            ref={userVideo}
            autoPlay
            playsInline
            //muted
          />
        )}
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
        <CallIcons
          handleMicButtonPressed={handleMicButtonPressed}
          handleCameraButtonPressed={handleCameraButtonPressed}
          mute={mute}
          handleHangUpButtonPressed={handleHangUpButtonPressed}
          localCameraEnabled={localCameraEnabled}
        />
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
