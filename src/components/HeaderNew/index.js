import React, { useEffect, useState } from "react";
import _ from 'lodash'
import Swal from 'sweetalert2'
import { EyeOffline, LogoSvg, VideoIcon } from "../svgComponents";
import { Input, Loader } from "../commonComponents/commonComponents";
import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { setHangUp, setDisableButton, setStartCall, setButtonLabel, setIsActive, setCallState } from "../../redux/features/callSlice";
import { callToOtherUser, hangUp, hangUpAutomateCall } from "../../app/test/utils/webRTC/webRTCHandler";
import { setUserName, setCalleeUserName, setSelectedUserData, setLoader } from "../../redux/features/chatSlice";
import { getActiveUser, handleMeOnlineOffline, setMeActive, startCall, updateName } from "../../app/test/utils/wssConnection/wssConnection";
import ActiveUsers from "../ActiveUsers";

const HeaderNew = () => {
  const dispatch = useDispatch();
  const { userName, loader } = useSelector(state => state.chatSlice)
  const [keyWords, setKeyWords] = useState("")
  const { callState, buttonLabel, isActive, userToCall, triggerCall, disableButton } = useSelector((state) => state.callSlice);
  const { activeUsers, camOffUsers } = useSelector(state => state.dashboardSlice)
  useEffect(() => {
    if(userToCall && triggerCall) {      
      callToOtherUser(userToCall)
    }    
  }, [userToCall, triggerCall])

  useEffect(() => {
    if(buttonLabel == 'Skip' && callState == 'CALL_AVAILABLE') {      
      dispatch(setDisableButton(true))
      dispatch(setLoader(true))
    } 
    if(callState == "CALL_IN_PROGRESS") {      
      dispatch(setLoader(false))
    }
  }, [callState, buttonLabel])

  const startRandomCall = async () => {   
    getActiveUser() 
    dispatch(setDisableButton(true))   
    dispatch(setLoader(true))
  }
  const skipCall = async () => {
    if (callState == `CALL_IN_PROGRESS`) {
      hangUpAutomateCall()
    }
  }
  return (
    <div className="header-new-bg-container">
      <div className="logo-lg-visible">
        <LogoSvg />
      </div>
      {isActive ? <span className="green-dots"></span> : <span className="red-dots"></span>}
      <input
        type="text"
        className="head-input"
        placeholder="Enter Name"
        onChange={(e) => dispatch(setUserName(e.target.value))}
        onBlur={(e) => {
          const { value } = e.target;
          updateName(value);
        }}
        value={userName}
      />

      <input
        type="text"
        className="head-input key-words-input"
        placeholder="Key Words"
        onChange={(e) => setKeyWords(e.target.value)}
        value={keyWords}
      />

      <button disabled={disableButton} style={disableButton ? { backgroundColor: '#dc9c26' } : {}} className={buttonLabel == 'Connect' ? "connect-button call-buttons" : 'disConnect-button call-buttons'} onClick={() => {
        buttonLabel == 'Connect' ? startRandomCall() : skipCall()
      }}>
        {buttonLabel}
      </button>

      <div className="header-active-users">
        <ActiveUsers />
      </div>
    </div>
  );
};

export default HeaderNew;
