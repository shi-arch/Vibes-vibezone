import React from "react";
import Swal from "sweetalert2";
import { Loader } from '../../components/commonComponents/commonComponents'
import VibeZoneLogo from "../../assets/images/VibeZoneLogo.svg"
import "./videocallInterface.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import CallIcons from "../CallIcons/index.js";

const VideoCallInterFace = (props) => {
  const {localStream, remoteStream} = props
  const dispatch = useDispatch();
  const [mute, setMute] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const {callState} = useSelector((state) => state.callSlice);

  useEffect(() => {
    try {
      if (localStream) {
        const localVideo = myVideo.current;
        localVideo.srcObject = localStream;
        localVideo.onloadedmetadata = () => {
          localVideo.play();
        };
      }
    } catch (err) {
      console.log(err)
    }

  }, [localStream]);

  useEffect(() => {
    try {
      if (remoteStream) {
        const remoteVideo = userVideo.current; 
        remoteVideo.srcObject = remoteStream;
        remoteVideo.onloadedmetadata = () => {
          remoteVideo.play();
        };
      }
    } catch (err) {
      console.log(err)
    }

  }, [remoteStream]);
  return (
    <div className="video-call-interface-bg-container">
      <div className="video-img-container">
        {remoteStream && (
          <video
            id="userVideo"
            style={{ width: "100%", height: "229px", objectFit: "cover", transform: 'scale(-1,1)' }}
            ref={userVideo}
            autoPlay
            playsInline
          //muted
          />
        )}
        {(callState == 'CALL_AVAILABLE' || callState == 'CALL_IN_PROGRESS') && !remoteStream ? (
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
            <img
              src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
              className="video"
              alt="person2"
            />
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
          </>
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
