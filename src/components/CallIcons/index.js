import React, { useState } from 'react'
import { EndCall, Mute, Unmute, Video, VideoOff } from '../svgComponents';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled
} from "../../redux/features/callSlice.js";
import {
  hangUpAutomateCall
} from "../../app/test/utils/webRTC/webRTCHandler.js";

const CallIcons = () => {
  const dispatch = useDispatch();
  const [mute, setMute] = useState(false);
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
  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    dispatch(setLocalMicrophoneEnabled(!micEnabled));
    setMute(!mute);
  };

  const handleCameraButtonPressed = () => {
    localStream.getVideoTracks()[0].enabled = !localCameraEnabled;
    dispatch(setLocalCameraEnabled(!localCameraEnabled));
  };

  const handleHangUpButtonPressed = async () => {
    if (callState == `CALL_IN_PROGRESS`) {
      hangUpAutomateCall()
    }
  };
  return (
    <div className="call-icons-container">
      <div onClick={handleMicButtonPressed}>{mute ? <Mute /> : <Unmute />}</div>
      <div onClick={handleCameraButtonPressed}>
        {localCameraEnabled ? <Video /> : <VideoOff />}
      </div>
      {/* <div onClick={handleHangUpButtonPressed}>
        <EndCall />
      </div> */}
    </div>
  );
};

export default CallIcons