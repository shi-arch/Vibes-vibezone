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
import { skipCall, startRandomCall } from "../commonComponents/commonComponents";
import { disableColor, enableColor, initialColor } from "../../app/utils/constant";

const HeaderNew = (props) => {
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.chatSlice)
  const { callState, buttonLabel, isActive, keyWords } = useSelector((state) => state.callSlice);

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
        disabled={callState == 'CALL_AVAILABLE' ? true : false}
        style={ callState == 'CALL_UNAVAILABLE' ? {backgroundColor: initialColor, cursor: 'pointer'} : callState == 'CALL_AVAILABLE' ? { backgroundColor: disableColor, cursor: 'not-allowed' } : {backgroundColor: enableColor, cursor: 'pointer'}}        
        className="call-buttons call-button-css"        
        onClick={() => {
          ReactGA.event({
            category: "Connect",
            action: "connect button",
            label: "Connect",
          });
          buttonLabel == "Connect" ? startRandomCall() : skipCall(props.setRemoteStream);
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
