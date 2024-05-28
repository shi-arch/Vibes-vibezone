import React, { useState } from 'react'
import { EndCall, Mute, Unmute, Video, VideoOff } from '../svgComponents';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from "react-ga4"
import { enableDisableCam } from '../../app/utils/wssConnection/wssConnection.js';

const CallIcons = (props) => {
  const dispatch = useDispatch();
  const [mute, setMute] = useState(false);
  const { userName } = useSelector((state) => state.chatSlice);
  const {localStream, localCameraEnabled, localMicrophoneEnabled, setLocalMicrophoneEnabled, setLocalCameraEnabled} = props
  const handleMicButtonPressed = () => {
      ReactGA.event({
      category: "Mute Button",
      action: "Mute Button Pressed",
      label: `${userName} turned mic ${mute ? "ON" : "OFF"}`,
        });
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setLocalMicrophoneEnabled(!micEnabled)
    setMute(!mute);
  };

  const handleCameraButtonPressed = () => {
    localStream.getVideoTracks()[0].enabled = !localCameraEnabled;
    setLocalCameraEnabled(!localCameraEnabled)
    enableDisableCam(!localCameraEnabled)
    ReactGA.event({
      category: "Camera Button",
      action: "Camera Button Pressed",
      label: `${userName} turned camera ${!localCameraEnabled ? "ON":"OFF"}`,
    });
  };
  return (
    <div className="call-icons-container">
      <div onClick={handleMicButtonPressed}>{mute ? <Mute /> : <Unmute />}</div>
      <div onClick={handleCameraButtonPressed}>
        {localCameraEnabled ? <Video /> : <VideoOff />}
      </div>
    </div>
  );
};

export default CallIcons