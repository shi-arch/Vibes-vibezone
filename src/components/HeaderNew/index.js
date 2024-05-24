import React, { useEffect } from "react";
import _ from 'lodash'
import { LogoSvg } from "../svgComponents";
import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { setKeyWords } from "../../redux/features/callSlice";
import { setUserName } from "../../redux/features/chatSlice";
import { updateName } from "../../app/utils/wssConnection/wssConnection";
import ActiveUsers from "../ActiveUsers";
import ReactGA from "react-ga4"
import { setUseEffectdata, skipCall, startRandomCall } from "../commonComponents/commonComponents";

const HeaderNew = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.chatSlice)
  const { callState, buttonLabel, isActive, userToCall, triggerCall, disableButton, timer, flag, bgColor, keyWords } = useSelector((state) => state.callSlice);

  useEffect(() => {
    setUseEffectdata()
  }, [buttonLabel, bgColor, flag, callState, buttonLabel, userToCall, triggerCall, timer]) 

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
        onChange={(e) => dispatch(setKeyWords(e.target.value))}
        value={keyWords}
      />

      <button
        disabled={disableButton}
        style={ disableButton ? { backgroundColor: bgColor, cursor: 'not-allowed' } : {backgroundColor: bgColor, cursor: 'pointer'}}        
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
