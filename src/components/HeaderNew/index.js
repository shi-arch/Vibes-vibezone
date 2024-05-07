import React, { useState } from "react";
import _ from 'lodash'
import Swal from 'sweetalert2'
import { EyeOffline, LogoSvg, VideoIcon } from "../svgComponents";
import { Input } from "../commonComponents/commonComponents";

import "./index.css"
import { useSelector, useDispatch } from "react-redux";
import { setHangUp, setStartCall } from "../../redux/features/callSlice";
import { callToOtherUser, hangUp } from "../../app/test/utils/webRTC/webRTCHandler";
import { setUserName, setCalleeUserName, setSelectedUserData } from "../../redux/features/chatSlice";
import { updateName } from "../../app/test/utils/wssConnection/wssConnection";
import ActiveUsers from "../ActiveUsers";

const HeaderNew = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.chatSlice)
  const [keyWords,setKeyWords] = useState("")
  const { callState } = useSelector((state) => state.callSlice);
  const { activeUsers, camOffUsers } = useSelector(state => state.dashboardSlice)
  const startRandomCall = async () => {
    const activeUserData = _.cloneDeep(activeUsers) 
    if(activeUserData.length){
      const filterData = activeUserData.filter(user => user.isActive === true)
      if(filterData.length){
        dispatch(setStartCall(true))
        const calleeUserData = filterData[Math.floor(Math.random() * (filterData.length - 1))]
        dispatch(setCalleeUserName(calleeUserData.username))
        dispatch(setSelectedUserData(calleeUserData))
        callToOtherUser(calleeUserData)
      } else {
        Swal.fire({
          title: "sorry...",
          text: "No active users found!",
          icon: "error"
        });
      }      
    } else {
      Swal.fire({
        title: "sorry...",
        text: "No active users found!",
        icon: "error"
      });
    }    
  }
  const endCall = async () => {
    if (callState == `CALL_IN_PROGRESS`) {
      await hangUp();
			dispatch(setHangUp(true))
		}
  }
  return (
    <div className="header-new-bg-container">
      <div className="logo-lg-visible">
        <LogoSvg />
      </div>

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

      <button className="connect-button call-buttons" onClick={startRandomCall}>
        Connect
      </button>
      <button className="disConnect-button call-buttons" onClick={endCall}>
        Disconnect
      </button>

      <div className="header-active-users">
        <ActiveUsers activeUsers={activeUsers} camOffUsers={camOffUsers} />
      </div>
      {/* <div className="active-users-bg-container">
        <div className="active-status-container">
          <div className="active-icon"></div>
          <p className="active-para">{activeUsers.length}</p>
        </div>
        <div className="active-status-container">
          <VideoIcon />
          <p className="active-para">
            {activeUsers.length - camOffUsers.length}
          </p>
        </div>
        <div className="active-status-container">
          <EyeOffline />
          <p className="active-para">{camOffUsers.length}</p>
        </div>
      </div> */}
    </div>
  );
};

export default HeaderNew;
