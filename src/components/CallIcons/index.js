import React from 'react'
import { EndCall, Mute, Unmute, Video, VideoOff } from '../svgComponents';

const CallIcons = ({
  handleMicButtonPressed,
  handleCameraButtonPressed,
  mute,
  handleHangUpButtonPressed,
  localCameraEnabled,
}) => {
  return (
    <div className="call-icons-container">
      <div onClick={handleMicButtonPressed}>{mute ? <Mute /> : <Unmute />}</div>
      <div onClick={handleCameraButtonPressed}>
        {localCameraEnabled ? <Video /> : <VideoOff />}
      </div>
      <div onClick={handleHangUpButtonPressed}>
        <EndCall />
      </div>
    </div>
  );
};

export default CallIcons