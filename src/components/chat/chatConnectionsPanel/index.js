import React, { useEffect, useState } from "react";
import { ArrowDown, ThreeDots } from "../../svgComponents/index.js";

import url3 from "../../../assets/images/profile3.svg";
import Badges from "../badges/index.js";
import { useSelector, useDispatch } from "react-redux";
import { chats } from '../propsData';
import { setSelectedUserData, setChatData, setMessages } from "../../../redux/features/chatSlice.js";
import "./index.css";
import { postApi, getApi } from "../../../response/api.js";

const ChatConnectionsPanel = () => {
  const {_id} = useSelector(state => state.loginSlice.loginDetails);
  const {token} = useSelector(state => state.loginSlice);
  const [requestList, setRequestList] = useState([]);
  const dispatch = useDispatch();
  const [requestsOpen, setRequestsOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const modalSelector = useSelector(state => state.modalSlice);
  const searchUserData = useSelector(state => state.chatSlice.searchUserData);
  const { leftOpen, rightOpen } = modalSelector;
  const {css} = useSelector((state) => state.modalSlice);

  const fetchRequests = async () => {
    try {
      const response = await getApi("/getRequests", token);
      // console.log("get requests..", response);
      setRequestList(response);
    } catch (error) {
      console.log("Failed to log get requests", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const toggleRequests = () => {
    setRequestsOpen(!requestsOpen);
  };

  const toggleFriends = () => {
    setFriendsOpen(!friendsOpen);
  };

  const getUser = async (o) => {
    dispatch(setSelectedUserData(o))
    const obj = {
      "isGroupChat": false,
      "Users": [o._id, _id],
      "chatName": "default"
    }
    const result = await postApi('/createChat', obj, token)
    if (result) {
      dispatch(setChatData(result.data))
      dispatch(setMessages(result.data.messages))
    }
  };
  return (
    <div
      className={`${css ? "friends-container-mobile" : "friends-container"} ${!leftOpen && !rightOpen ? "left-and-right-expand" : ""
        }  ${!rightOpen ? "expanded" : ""}`}
    >
      <div className={`requests-con ${friendsOpen ? '' : 'expand-requests'}`}>
        <div className="chats-arrow">
          <p className="chat-text">Requests</p>
          <div onClick={toggleRequests} className={`${requestsOpen ? "arrow-down" : "arrow-right"}`}><ArrowDown /></div>
        </div>
        <div className={`scroll-con ${rightOpen ? '' : 'hide-scrollbar'}`}>
          {requestsOpen && chats.map((eachUser, index) => (
            <div key={index} className={`profile-info ${rightOpen ? '' : 'profile-info-padding'} ${eachUser.selected ? "active-user" : ""}`}>
              <div className="profile-2">
                <img src={url3} width={rightOpen ? 45 : 55} alt="friend-profile" />
                <div className="profile-name-desc">
                  <p className="profile-name">{eachUser.name}</p>
                  <Badges />
                </div>
              </div>
              <div className="request-right-con">
                <div className="profile-time-three-dots">
                  <p className="profile-time">{eachUser.lastTime}</p>
                  <div className="three-dots-sm">
                    <ThreeDots />
                  </div>
                </div>
                <div className="accept-reject">
                  <button type="button" className="request">
                    Request
                  </button>
                  <button type="button" className="ignore">
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`user-friends-con ${requestsOpen ? '' : 'expand-friends'}`}>
        <div className="chats-arrow">
          <p className="chat-text">Friends</p>
          <div onClick={toggleFriends} className={`${friendsOpen ? "arrow-down" : "arrow-right"}`}><ArrowDown /></div>
        </div>
        <div className={`scroll-con ${rightOpen ? '' : 'hide-scrollbar'}`}>
          {friendsOpen && chats.map((eachUser, index) => (
            <div key={index} className={`profile-info ${rightOpen ? '' : 'profile-info-padding-2'}`}>
              <div className="profile-2">
                <img src={url3} width={rightOpen ? 45 : 55} alt="friend-profile" />
                <div className="profile-name-desc">
                  <p className="profile-name">{eachUser.name}</p>
                  <p className="profile-description">{eachUser.description}</p>
                </div>
              </div>
              <p className="profile-time">{eachUser.lastTime}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`user-friends-con ${requestsOpen ? '' : 'expand-friends'}`}>
        <div className="chats-arrow">
          <p className="chat-text">New User</p>
          <div onClick={() => setUsersOpen(!usersOpen)} className={`${usersOpen ? "arrow-down" : "arrow-right"}`}><ArrowDown /></div>
        </div>
        <div className={`scroll-con ${rightOpen ? '' : 'hide-scrollbar'}`}>
          {usersOpen && searchUserData.length && searchUserData.map((o, index) => (
            <div key={index} className={`profile-info ${rightOpen ? '' : 'profile-info-padding-2'}`}>
              <div onClick={() => getUser(o)} className="profile-2">
                <img src={url3} width={rightOpen ? 45 : 55} alt="friend-profile" />
                <div className="profile-name-desc">
                  <p className="profile-name">{o.name || o.Contact || o.email}</p>
                  <p className="profile-description">{o.userType}</p>
                </div>
              </div>
              <p className="profile-time">{o.updatedAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatConnectionsPanel;
