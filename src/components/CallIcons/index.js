import React, { useState } from 'react'
import { EndCall, Mute, Unmute, Video, VideoOff } from '../svgComponents';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from "react-ga4"
import { enableDisableCam, handleCamera } from '../../app/utils/wssConnection/wssConnection.js';
import { setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../redux/features/callSlice.js';

const CallIcons = (props) => {
  const dispatch = useDispatch();
  const [mute, setMute] = useState(false);
  const { userName } = useSelector((state) => state.chatSlice);
  const { localCameraEnabled, localMicrophoneEnabled } = useSelector((state) => state.callSlice);
  const { localStream } = props
  const handleMicButtonPressed = () => {
    ReactGA.event({
      category: "Mute Button",
      action: "Mute Button Pressed",
      label: `${userName} turned mic ${mute ? "ON" : "OFF"}`,
    });
    let micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    dispatch(setLocalMicrophoneEnabled(!micEnabled))    
  };

  const handleCameraButtonPressed = async () => {
    localStream.getVideoTracks()[0].enabled = !localCameraEnabled;
    dispatch(setLocalCameraEnabled(!localCameraEnabled))    
    enableDisableCam(!localCameraEnabled)
    ReactGA.event({
      category: "Camera Button",
      action: "Camera Button Pressed",
      label: `${userName} turned camera ${!localCameraEnabled ? "ON" : "OFF"}`,
    });
  };
  return (
    <div className="call-icons-container">
      <div onClick={handleMicButtonPressed}>{localMicrophoneEnabled ? <Unmute /> : <Mute />}</div>
      <div onClick={handleCameraButtonPressed}>
        {localCameraEnabled ? <Video /> : <VideoOff />}
      </div>
    </div>
  );
};

export default CallIcons