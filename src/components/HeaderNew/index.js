import React, { useEffect, useState } from "react";
import _ from 'lodash'
import { LogoSvg } from "../svgComponents";
import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { setButtonLabel, setDisableButton, setTriggerCall } from "../../redux/features/callSlice";
import { callToOtherUser, hangUpAutomateCall } from "../../app/test/utils/webRTC/webRTCHandler";
import { setUserName, setLoader, setMessages } from "../../redux/features/chatSlice";
import { getActiveUser, updateName } from "../../app/test/utils/wssConnection/wssConnection";
import ActiveUsers from "../ActiveUsers";

import ReactGA from "react-ga4"

const HeaderNew = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.chatSlice)
  const [keyWords, setKeyWords] = useState("")
  const [timer, setTimer] = useState(false)
  const [bgColor, setBgColor] = useState("#8f47ff")
  const [flag, setFlag] = useState(false)
  const { callState, buttonLabel, isActive, userToCall, triggerCall, disableButton } = useSelector((state) => state.callSlice);

  useEffect(() => {
    if (timer) {
      setTimer(false)
      setTimeout(() => {
        dispatch(setButtonLabel("Skip")) 
        setBgColor("#ec4242")
        setTimer(true)
        setFlag(!flag)
      }, 10000)
    }
  }, [timer]);

  useEffect(() => {
    if(bgColor == '#ec4242' && buttonLabel == 'Skip'){
      dispatch(setDisableButton(false))     
    }
  }, [buttonLabel, bgColor, flag])

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (userToCall && triggerCall) {
      callToOtherUser(userToCall)
      dispatch(setTriggerCall(false))
    }
  }, [userToCall, triggerCall])

  useEffect(() => {
    if (buttonLabel == 'Skip' && callState == 'CALL_AVAILABLE') {
      dispatch(setDisableButton(true))
      dispatch(setLoader(true))
    }
    if (callState == "CALL_IN_PROGRESS") {
      dispatch(setLoader(false))
    }
  }, [callState, buttonLabel])

  const startRandomCall = async () => {
    setTimer(true)
    getActiveUser()
    dispatch(setDisableButton(true))
    setBgColor("#dc9c26")
    dispatch(setLoader(true))
  }
  const skipCall = async () => {
    dispatch(setMessages([]))
    hangUpAutomateCall()
    dispatch(setDisableButton(true))    
    setBgColor("#dc9c26")
  }
  return (
    <div className="header-new-bg-container">
      <div className="logo-lg-visible">
        <LogoSvg />
      </div>
      {isActive ? (
        <span className="green-dots"></span>
      ) : (
        <span className="red-dots"></span>
      )}
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

      <button
        disabled={disableButton}
        style={ disableButton ? { backgroundColor: bgColor, cursor: 'not-allowed' } : {backgroundColor: bgColor, cursor: 'pointer'}}
        //style={{backgroundColor: bgColor, cursor: 'pointer'}}

        className="call-buttons call-button-css"
        onClick={() => {
          ReactGA.event({
            category: "Connect",
            action: "connect button",
            label: "Connect",
          });
          buttonLabel == "Connect" ? startRandomCall() : skipCall();
        }}
      >
        {buttonLabel}
      </button>

      <div className="header-active-users">
        <ActiveUsers />
      </div>
    </div>
  );
};

export default HeaderNew;
