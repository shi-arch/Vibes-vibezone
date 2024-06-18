import React, { useEffect } from "react";
import { Loader } from '../../components/commonComponents/commonComponents'
import VibeZoneLogo from "../../assets/images/VibeZoneLogo.svg"
import "./videocallInterface.css";
import CallIcons from "../CallIcons/index.js";
import { useSelector } from "react-redux";

const VideoCallInterFace = (props) => {
  const {localStream, remoteStream} = props
  const { chatBot } = useSelector(state => state.callSlice)
  return (
    <div className="video-call-interface-bg-container">
      <div className="video-img-container">
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
        {
          remoteStream || chatBot ? 
          <video
            id="userVideo"
            style={chatBot ? {background: 'black', width: "100%", height: "229px", objectFit: "cover", transform: 'scale(-1,1)'} : { width: "100%", height: "229px", objectFit: "cover", transform: 'scale(-1,1)' }}
            ref={(video) => {
              if (video) video.srcObject = remoteStream;
            }}
            autoPlay
            playsInline
          /> : <Loader />
        } 
          </div>
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
        <CallIcons localStream={localStream} />
      </div>
    </div>
  );
};

export default VideoCallInterFace;
