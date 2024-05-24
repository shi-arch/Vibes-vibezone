import { useEffect, useState } from "react";
import { Input, setUseEffectdata, skipCall, startRandomCall } from "../../commonComponents/commonComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { Notification, Search } from "../../svgComponents/index.js";
import { MultipleSelectChip } from '../../commonComponents/commonComponents.js'
import url4 from "../../../assets/images/recentUser1.svg";
import { postApi } from "../../../response/api.js";
import { setLoader, setSearchUserData } from "../../../redux/features/chatSlice.js";
import { CreatePeerConnection, callToOtherUser, getLocalStream } from "../../../app/utils/webRTC/webRTCHandler.js";
import { closeTab } from "../../../app/utils/wssConnection/wssConnection";
const notification = true;
window.onbeforeunload = (event) => {
  window.location.href = window.location.origin
  closeTab()
};

const Header = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { token } = useSelector(state => state.loginSlice)
  const { activeUsers } = useSelector(state => state.dashboardSlice)
  const { css } = useSelector((state) => state.modalSlice);
  const { callState, buttonLabel, userToCall, triggerCall, disableButton, timer, flag, bgColor, userObjectId } = useSelector((state) => state.callSlice);

  useEffect(() => {
    setUseEffectdata()
  }, [buttonLabel, bgColor, flag, callState, buttonLabel, userToCall, triggerCall, timer, userObjectId ])

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const searchUser = async () => {
    dispatch(setLoader(false))
    let col = "email"
    if (isNaN()) {
      col = "Contact"
    }
    const result = await postApi('/search', { [col]: searchInput }, token)
    if (result) {
      dispatch(setSearchUserData(result.data))
    }
    dispatch(setLoader(false))
  }
  const callUser = async (activeUser) => {
    callToOtherUser(activeUser);
    await getLocalStream()
    await CreatePeerConnection();
  }
  return (
    <>
      <div className="header-container">
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
        < MultipleSelectChip />
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
