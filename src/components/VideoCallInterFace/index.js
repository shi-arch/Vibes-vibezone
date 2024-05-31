import React from "react";
import Swal from "sweetalert2";
import { Loader } from '../../components/commonComponents/commonComponents'
import VibeZoneLogo from "../../assets/images/VibeZoneLogo.svg"
import "./videocallInterface.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import CallIcons from "../CallIcons/index.js";

const VideoCallInterFace = (props) => {
  const { localStream, remoteStream } = props
  const dispatch = useDispatch();
  const [mute, setMute] = useState(false);
  const { callState } = useSelector((state) => state.callSlice);
  return (
    <div className="video-call-interface-bg-container">
      <div className="video-img-container">
        {callState == 'CALL_CONNECTED' && (
          <video
            id="userVideo"
            style={{ width: "100%", height: "229px", objectFit: "cover", transform: 'scale(-1,1)' }}
            ref={(video) => {
              if (video) video.srcObject = remoteStream;
            }}
            autoPlay
            playsInline
          //muted
          />
        )}
        {callState == 'CALL_AVAILABLE' ? (
          <div
            style={{
              width: "100%",
              height: "229px",
              border: "1px solid #f1f1f1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f1f1f1",
            }}
          >
            <Loader />
          </div>
        ) : null}

        {callState == 'CALL_UNAVAILABLE' ? (
          <>
            <div style={{
              width: "100%",
              height: "229px",
              border: "1px solid #f1f1f1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f1f1f1",
            }} >

            </div>
          </>
        ) : (
          ""
        )}
        <div className="logo-float">
          <img src={VibeZoneLogo} alt="logo" className="vibe-logo-float" />
        </div>
      </div>

      <div className="video-img-container">
        {
          <video
            id="myVideo"
            style={
              localStream
                ? { width: "100%", height: "229px", objectFit: "cover", transform: 'scale(-1,1)' }
                : { width: 0, height: 0, visibility: "hidden" }
            }
            ref={(video) => {
              if (video) video.srcObject = localStream;
            }}
            autoPlay
            playsInline
            muted
          />
        }
        {!localStream && (
          <div style={{
            width: "100%",
            height: "229px",
            border: "1px solid #f1f1f1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f1f1f1",
          }} >
          </div>
        )}
        <div className="logo-float">
          <img src={VibeZoneLogo} alt="logo" className="vibe-logo-float" />
        </div>
      </div>

      <div className="sm-lg-icon-video-call-container">
        <CallIcons />
      </div>
    </div>
  );
};

export default VideoCallInterFace;
