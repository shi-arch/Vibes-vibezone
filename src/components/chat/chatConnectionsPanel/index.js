// import { ArrowDown, ThreeDots } from "../../svgComponents/index.js";
// 
// import url3 from "../../../assets/images/profile3.svg";
// import Badges from "../badges";
// import "./index.css";

// const Friends = (props) => {
//   const { isLeftOpen, isRightOpen, chats } = props;
//   const friends = chats;

//   return (
//     <div
//       className={`friends-container ${
//         !isLeftOpen && !isRightOpen ? "left-and-right-expand" : ""
//       }  ${!isRightOpen ? "expanded" : ""}`}
//     >
//       <div className={`requests-con ${isRightOpen ? '' : 'hide-scrollbar'}`}>
//         <div className="chats-arrow">
//           <p className="chat-text">Requests</p>
//           <ArrowDown />
//         </div>
//         {chats.map((eachUser, index) => (
//           <div
//             key={index}
//             className={`profile-info ${eachUser.selected ? "active-user" : ""}`}
//           >
//             <div className="profile">
//               <img src={url3} width={isRightOpen ? 45 : 55} alt="friend-profile" />
//               <div className="profile-name-desc">
//                 <p className="profile-name">{eachUser.name}</p>
//                 <Badges />
//               </div>
//             </div>
//             <div className="request-right-con">
//             <div className="profile-time-three-dots">
//               <p className="profile-time">{eachUser.lastTime}</p>
//               <div className="three-dots-sm">
//                 <ThreeDots />
//               </div>
//             </div>
//             <div className="accept-reject">
//               <button type="button" className="request">
//                 Request
//               </button>
//               <button type="button" className="ignore">
//                 Ignore
//               </button>
//             </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* <div className="frame"></div> */}

//       <div className={`user-friends-con ${isRightOpen ? '' : 'hide-scrollbar'}`}>
//         <div className="chats-arrow">
//           <p className="chat-text">Friends</p>
//           <ArrowDown />
//         </div>
//         {friends.map((eachUser, index) => (
//           <div key={index} className="profile-info">
//             <div className="profile">
//               <img src={url3} width={50} alt="friend-profile" />
//               <div className="profile-name-desc">
//                 <p className="profile-name">{eachUser.name}</p>
//                 <p className="profile-description">{eachUser.description}</p>
//               </div>
//             </div>
//             <p className="profile-time">{eachUser.lastTime}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Friends;






import React, { useEffect, useState } from "react";
import { ArrowDown, ThreeDots } from "../../svgComponents/index.js";

import url3 from "../../../assets/images/profile3.svg";
import Badges from "../badges/index.js";
import { useSelector, useDispatch } from "react-redux";
import { chats } from '../propsData';
import { setSelectedUserData, setChatData, setMessages } from "../../../redux/features/chatSlice.js";
import "./index.css";
import { postApi } from "../../../response/api.js";

const ChatConnectionsPanel = () => {
  const {_id} = useSelector(state => state.loginSlice.loginDetails);
  const {token} = useSelector(state => state.loginSlice);
  const dispatch = useDispatch();
  const [requestsOpen, setRequestsOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const modalSelector = useSelector(state => state.modalSlice);
  const searchUserData = useSelector(state => state.chatSlice.searchUserData);
  const { leftOpen, rightOpen } = modalSelector;

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
      debugger
      dispatch(setMessages(result.data.messages))
    }
  };

  return (
    <div
      className={`friends-container ${!leftOpen && !rightOpen ? "left-and-right-expand" : ""
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





// import React, { useRef, useEffect } from "react";
// import "./index.css";

// function Friends(props) {
//   const refBox = useRef(null);
//   const refTop = useRef(null);
//   const refBottom = useRef(null);

//   useEffect(() => {
//     const resizeableElement = refBox.current;
//     let height = resizeableElement.clientHeight;
//     let yCord = 0;

//     // TOP
//     const onMouseMoveTopResize = (event) => {
//       const dy = event.clientY - yCord;
//       height -= dy;
//       yCord = event.clientY;
//       resizeableElement.style.height = `${height}px`;
//     };

//     const onMouseUpTopResize = () => {
//       document.removeEventListener("mousemove", onMouseMoveTopResize);
//     };

//     const onMouseDownTopResize = (event) => {
//       yCord = event.clientY;
//       document.addEventListener("mousemove", onMouseMoveTopResize);
//       document.addEventListener("mouseup", onMouseUpTopResize);
//     };

//     // Bottom
//     const onMouseMoveBottomResize = (event) => {
//       const dy = event.clientY - yCord;
//       height += dy;
//       yCord = event.clientY;
//       resizeableElement.style.height = `${height}px`;
//     };

//     const onMouseUpBottomResize = () => {
//       document.removeEventListener("mousemove", onMouseMoveBottomResize);
//     };

//     const onMouseDownBottomResize = (event) => {
//       yCord = event.clientY;
//       document.addEventListener("mousemove", onMouseMoveBottomResize);
//       document.addEventListener("mouseup", onMouseUpBottomResize);
//     };

//     const resizerTop = refTop.current;
//     resizerTop.addEventListener("mousedown", onMouseDownTopResize);

//     const resizerBottom = refBottom.current;
//     resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);

//     return () => {
//       resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
//       resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
//     };
//   }, []);

//   const { isLeftOpen, isRightOpen, chats } = props;
//   const friends = chats;

//   return (
//     <div
//       className={`friends-container ${
//         !isLeftOpen && !isRightOpen ? "left-and-right-expand" : ""
//       }  ${!isRightOpen ? "expanded" : ""}`}
//       ref={refBox}
//     >
//       <div ref={refTop} className={`requests-con ${isRightOpen ? "" : "hide-scrollbar"}`}>
//         <div className="chats-arrow">
//           <p className="chat-text">Requests</p>
//           <ArrowDown />
//         </div>
//         {chats.map((eachUser, index) => (
//           <ul key={index} className={`profile-info ${eachUser.selected ? "active-user" : ""}`}>
//             <div className="profile">
//               <img src={url3} width={isRightOpen ? 45 : 55} alt="friend-profile" />
//               <div className="profile-name-desc">
//                 <p className="profile-name">{eachUser.name}</p>
//                 <Badges />
//               </div>
//             </div>
//             <div className="request-right-con">
//               <div className="profile-time-three-dots">
//                 <p className="profile-time">{eachUser.lastTime}</p>
//                 <div className="three-dots-sm">
//                   <ThreeDots />
//                 </div>
//               </div>
//               <div className="accept-reject">
//                 <button type="button" className="request">
//                   Request
//                 </button>
//                 <button type="button" className="ignore">
//                   Ignore
//                 </button>
//               </div>
//             </div>
//           </ul>
//         ))}
//       </div>

//       <div className="wrapper">
//         <div className="resizeable-box">
//           <div ref={refTop} className="resizer rt"></div>
//           <div ref={refBottom} className="resizer rb"></div>
//         </div>
//       </div>

//       <div className={`user-friends-con ${isRightOpen ? "" : "hide-scrollbar"}`}>
//         <div className="chats-arrow">
//           <p className="chat-text">Friends</p>
//           <ArrowDown />
//         </div>
//         {friends.map((eachUser, index) => (
//           <ul key={index} className="profile-info">
//             <div className="profile">
//               <img src={url3} width={50} alt="friend-profile" />
//               <div className="profile-name-desc">
//                 <p className="profile-name">{eachUser.name}</p>
//                 <p className="profile-description">{eachUser.description}</p>
//               </div>
//             </div>
//             <p className="profile-time">{eachUser.lastTime}</p>
//           </ul>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Friends;
