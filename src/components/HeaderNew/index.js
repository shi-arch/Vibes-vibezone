import React, { memo, useEffect, useState } from "react";
import _ from 'lodash'
import { LogoSvg } from "../svgComponents";
import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { setCallState, setDisableButton, setKeyWords, setTimer, setDisable, setChatBot, setBotTimer, setKeyConnection } from "../../redux/features/callSlice";
import { setMessages, setSessionId, setUserName } from "../../redux/features/chatSlice";
import { getActiveUser, updateName } from "../../app/utils/wssConnection/wssConnection";
import ActiveUsers from "../ActiveUsers";
import ReactGA from "react-ga4"
import { disableColor, enableColor, initialColor } from "../../app/utils/constant";
import MultipleSelect from "../commonComponents/multi-ui-dropdown";
import { Loader } from "../commonComponents/commonComponents";
import { postApi } from "../../response/api";

const HeaderNew = (props) => {
  const dispatch = useDispatch();
  const {keyWords, isLoading} = useSelector((state) => state.chatSlice)
  const { callState, buttonLabel, isActive, disableButton, userToCall, displayConnect, chatBot } = useSelector((state) => state.callSlice);
  const skipCall = async () => {
    props?.currentCall?.close()
    // if (chatBot) {
    //   dispatch(setSessionId(""))
    //   dispatch(setMessages([]))
    //   dispatch(setTimer(true))
    //   dispatch(setChatBot(''))
    //   dispatch(setDisableButton(true))
    //   dispatch(setCallState('CALL_AVAILABLE'))
    //   await getActiveUser()
    // } else {
    //   props?.currentCall?.close()
    //   dispatch(setBotTimer(true))
    // }
  }

  const startRandomCall = async () => {
    if(keyWords.length){
      dispatch(setKeyConnection(true))
    }
    dispatch(setTimer(true))
    //dispatch(setBotTimer(true))
    dispatch(setDisableButton(true))
    dispatch(setCallState('CALL_AVAILABLE'))
    await getActiveUser()
  }

  return (
    <div className="header-new-bg-container" style={{marginBottom: '14px'}}>
      <div className="logo-lg-visible">
        <LogoSvg />
      </div>
      {isActive ? (
        <span className="green-dots"></span>
      ) : (
        <span className="red-dots"></span>
      )}
      <ChildComponent />
      <MultipleSelect />
      {
        isLoading ? <Loader style={{position: 'absolute', right: '41%'}} /> : ""
      }
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
              userToCall ? skipCall() : startRandomCall()
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
  const { ipAddress } = useSelector(state => state.callSlice)
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
      postApi('/earlyAccess', {ipAddress, userName})
      //updateName(userName)
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
