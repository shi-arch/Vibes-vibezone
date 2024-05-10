import React, { useState } from "react";
import _ from 'lodash'
import Swal from 'sweetalert2'
import { EyeOffline, LogoSvg, VideoIcon } from "../svgComponents";
import { Input } from "../commonComponents/commonComponents";
import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { setHangUp, setStartCall, setButtonLabel, setIsActive } from "../../redux/features/callSlice";
import { callToOtherUser, hangUp, hangUpAutomateCall } from "../../app/test/utils/webRTC/webRTCHandler";
import { setUserName, setCalleeUserName, setSelectedUserData, setLoader } from "../../redux/features/chatSlice";
import { handleMeOnlineOffline, updateName } from "../../app/test/utils/wssConnection/wssConnection";
import ActiveUsers from "../ActiveUsers";

const HeaderNew = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.chatSlice)
  const [keyWords, setKeyWords] = useState("")
  const { callState, buttonLabel, isActive } = useSelector((state) => state.callSlice);
  const { activeUsers, camOffUsers } = useSelector(state => state.dashboardSlice)

  const startRandomCall = async () => {
    const activeUserData = _.cloneDeep(activeUsers)
    if (activeUserData.length) {
      const filterData = activeUserData.filter(user => user.isActive === true)
      if (filterData.length) {
        dispatch(setStartCall(true))
        const calleeUserData = filterData[Math.floor(Math.random() * (filterData.length - 1))]
        dispatch(setCalleeUserName(calleeUserData.username))
        dispatch(setSelectedUserData(calleeUserData))
        callToOtherUser(calleeUserData)
        dispatch(setLoader(false))
      } else {
        Swal.fire({
          title: "sorry...",
          text: "No active users found!",
          icon: "error"
        }).then(() => {
          dispatch(setLoader(true))
        });
      }
    } else {      
      Swal.fire({
        title: "sorry...",
        text: "No active users found!",
        icon: "error"
      }).then(() => {
        dispatch(setLoader(true))
      })
    }
  }
  const skipCall = async () => {
    if (callState == `CALL_IN_PROGRESS`) {
      hangUpAutomateCall()
    }
    // if (callState == `CALL_IN_PROGRESS`) {
    //   dispatch(setIsActive(false))
    //   dispatch(setButtonLabel('Connect'))
    //   await hangUp();
    //   dispatch(setHangUp(true))
    //   handleMeOnlineOffline(false)
    // }
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

      <button className={buttonLabel == 'Connect' ? "connect-button call-buttons" : 'disConnect-button call-buttons'} onClick={() => {
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
