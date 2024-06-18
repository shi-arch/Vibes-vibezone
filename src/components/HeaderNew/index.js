import React, { memo, useEffect, useState } from "react";
import _ from 'lodash'
import { LogoSvg } from "../svgComponents";
import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { setCallState, setDisableButton, setKeyWords, setTimer, setDisable, setChatBot, setBotTimer } from "../../redux/features/callSlice";
import { setMessages, setSessionId, setUserName } from "../../redux/features/chatSlice";
import { getActiveUser, updateName } from "../../app/utils/wssConnection/wssConnection";
import ActiveUsers from "../ActiveUsers";
import ReactGA from "react-ga4"
import { disableColor, enableColor, initialColor } from "../../app/utils/constant";

const HeaderNew = (props) => {
  const dispatch = useDispatch();
  const { callState, buttonLabel, isActive, keyWords, disableButton, userToCall, displayConnect, chatBot } = useSelector((state) => state.callSlice);
  const skipCall = async () => {
    if (chatBot) {
      dispatch(setSessionId(""))
      dispatch(setMessages([]))
      dispatch(setTimer(true))
      dispatch(setChatBot(''))
      dispatch(setDisableButton(true))
      dispatch(setCallState('CALL_AVAILABLE'))
      await getActiveUser()
    } else {
      props?.currentCall?.close()
      dispatch(setBotTimer(true))
    }
  }

  const startRandomCall = async () => {
    dispatch(setTimer(true))
    dispatch(setBotTimer(true))
    dispatch(setDisableButton(true))
    dispatch(setCallState('CALL_AVAILABLE'))
    await getActiveUser()
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
      <ChildComponent />
      <input
        type="text"
        className="head-input key-words-input"
        placeholder="Key Words"
        onChange={(e) => dispatch(setKeyWords(e.target.value))}
        value={keyWords}
      />

      {
        displayConnect ?
          <button
            disabled={disableButton}
            style={callState == 'CALL_UNAVAILABLE' ? { backgroundColor: initialColor } :
              disableButton ? { backgroundColor: disableColor, cursor: 'not-allowed' } : { backgroundColor: enableColor }}
            className="call-buttons call-button-css"
            onClick={() => {
              ReactGA.event({
                category: "Connect",
                action: "connect button",
                label: "Connect",
              });
              userToCall || chatBot ? skipCall() : startRandomCall()
            }}
          >
            {buttonLabel}
          </button> : null
      }

      <div className="header-active-users">
        <ActiveUsers />
      </div>
    </div>
  );
};

const ChildComponent = memo(() => {
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.chatSlice)
  const [name, setName] = useState("")
  const [updateFlag, setUpdateFlag] = useState(false)
  useEffect(() => {
    if (userName) {
      setName(userName)
    }
  }, [userName])
  useEffect(() => {
    if (updateFlag) {
      setUpdateFlag(false)
      updateName(userName)
    }
  }, [updateFlag, userName])
  return <input
    type="text"
    className="head-input"
    placeholder="Enter Name"
    onChange={(e) => setName(e.target.value)}
    onBlur={() => {
      setUpdateFlag(true)
      dispatch(setUserName(name))
    }}
    value={name}
  />;
});

export default HeaderNew;
