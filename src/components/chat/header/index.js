import { useEffect, useState } from "react";
import { Input } from "../../commonComponents/commonComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { Notification, Search, Plus } from "../../svgComponents/index.js";
import { Loader, MultipleSelectChip } from '../../commonComponents/commonComponents.js'
import { recentUsers } from '../propsData';
import url4 from "../../../assets/images/recentUser1.svg";
import { postApi } from "../../../response/api.js";
import { setSearchUserData } from "../../../redux/features/chatSlice.js";
import { setAllUsers } from "../../../redux/features/loginSlice.js";
import { CreatePeerConnection, callToOtherUser, getLocalStream, hangUpAutomateCall } from "../../../app/utils/webRTC/webRTCHandler.js";
import { setButtonLabel, setDisableButton, setTriggerCall } from "../../../redux/features/callSlice";
import { setUserName, setLoader, setMessages } from "../../../redux/features/chatSlice";
import { getActiveUser, updateName, closeTab } from "../../../app/utils/wssConnection/wssConnection";
const notification = true;
window.onbeforeunload = (event) => {
  window.location.href = window.location.origin
  closeTab()
};

const Header = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [Loader, setLoader] = useState(false);
  const { token, allUsers, userDisconnected, allConnections } = useSelector(state => state.loginSlice)
  const { activeUserData } = useSelector(state => state.chatSlice)
  const { activeUsers } = useSelector(state => state.dashboardSlice)
  const { css } = useSelector((state) => state.modalSlice);
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
  useEffect(() => {
    if (userDisconnected) {
      const findId = allConnections ? allConnections.find(o => {
        if (o.socketId === userDisconnected) {
          return o.id
        }
      }) : ""
      if (findId) {
        const arr = [...allUsers]
        arr.splice(findId.id, 1)
        dispatch(setAllUsers(arr))
      }
    }
  }, [userDisconnected])
  const searchUser = async () => {
    setLoader(true)
    let col = "email"
    if (isNaN()) {
      col = "Contact"
    }
    const result = await postApi('/search', { [col]: searchInput }, token)
    if (result) {
      dispatch(setSearchUserData(result.data))
    }
    setLoader(false)
  }
  const callUser = async (activeUser) => {
    callToOtherUser(activeUser);
    await getLocalStream()
    await CreatePeerConnection();
  }
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
    <>
      <div className="header-container">
        {/* {Loader ? <Loader /> : null} */}
        <div className={css ? "displayCss" : "recent-user-con"}>
          {activeUsers.length ? activeUsers.map((eachUser) => (
            <div key={eachUser._id} onClick={() => callUser(eachUser)} className="recent-user">
              <img
                src={eachUser.profileImage ? eachUser.profileImage : url4}
                alt="recent-user-icon"
                className="user-icon"
              />
              {eachUser.isActive ? <span className="green-dot"></span> : <span className="red-dot"></span>}
              <span>{eachUser.username}</span>
            </div>
          )) : ""}
        </div>
        <div className={css ? "displayCss" : "search-container"}>
          <Input
            type="search"
            css="search-input"
            onChange={setSearchInput}
            placeholder="Search user by email, contact or name"
            value={searchInput}
          />
          <div onClick={searchUser}><Search /></div>
        </div>
        <div className={css ? "displayCss" : "new-chats-con"}>
          <p className="new-chat">New Chats</p>
          <Plus />
        </div>
        {/* < MultipleSelectChip /> */}
        <button
          disabled={disableButton}
          style={disableButton ? { backgroundColor: bgColor, cursor: 'not-allowed' } : { backgroundColor: bgColor, cursor: 'pointer' }}
          className="call-buttons call-button-css"
          onClick={() => {
            buttonLabel == "Connect" ? startRandomCall() : skipCall();
          }}
        >
          {buttonLabel}
        </button>
        <div className="notification-icon-con">
          <Notification />
          {notification ? <span className="red-dot"></span> : null}
        </div>
        <button type="button" onClick={() => {
          localStorage.setItem("userData", "")
          window.location.href = '/signup';
        }} class="reject">Logout</button>
      </div>
      <div className={css ? "recent-user-con-mobile" : "displayCss"}>
        {activeUsers.length ? activeUsers.map((eachUser) => (
          <div key={eachUser._id} onClick={() => callUser(eachUser)} className="recent-user">
            <img
              src={eachUser.profileImage ? eachUser.profileImage : url4}
              alt="recent-user-icon"
              className="user-icon"
            />
            {eachUser.isActive ? <span className="green-dot"></span> : <span className="red-dot"></span>}
            <span>{eachUser.username}</span>
          </div>
        )) : ""}
      </div>
    </>

  );
};

export default Header;
