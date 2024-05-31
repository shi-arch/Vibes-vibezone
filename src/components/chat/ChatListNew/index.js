// import Image from "next/image";
import { useSelector } from "react-redux";
import { MsgSeen } from "../../svgComponents";
// import url1 from "../../../assets/images/profile1.svg";
// import url2 from "../../../assets/images/profile2.svg";
import { chatList } from "../propsData";

import "./index.css";
import { useEffect } from "react";

const ChatsListNew = (props) => {
  const { calleeUserName } = useSelector(state => state.chatSlice)
  const { messagesArr } = useSelector(state => state.chatSlice)
  const { userToCall } = useSelector(state => state.callSlice)

  useEffect(() => {
    if(messagesArr.length){
      debugger 
    }
  }, [messagesArr]);

  return (
    <div className="chat-list-new-bg-container">
      <div className="guest-container">
        <h1 className="guest-head">{props.remoteStream && userToCall && userToCall.username ? userToCall.username : "Guest"}</h1>
      </div>
      <div className="chatListNew-scroll-container">
        {messagesArr.map((chat, index) => {
          return (
            <div key={chat.id}>             
              <div className={`msg-con margin1`}>
                <div className={`${chat.sender ? "sender" : "receiver"}`}>
                <div
                      className={`msg-con-seen ${
                        chat.sender ? "message-1" : "message-2"
                      }`}
                    >
                      <p className="message">{chat.message}</p>
                      {chat.sender && (
                        <div className="msg-seen-icon-con">
                          <MsgSeen />
                        </div>
                      )}
                    </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatsListNew;


// return (
//   <div key={chat.id}>
//     {isNewDate && (
//       <p className="chat-date">
//         {isToday
//           ? "Today"
//           : isYesterday
//           ? "Yesterday"
//           : formattedDate}
//       </p>
//     )}
//     <div className={`msg-con ${isLastChat ? "margin2" : "margin1"}`}>
//       <div className={`${chat.sender === 2 ? "sender" : "receiver"}`}>
//         {isImage ? (
//           <img
//             className={`chat-img ${
//               chat.sender === 2 ? "message-1" : "message-2"
//             }`}
//             src={chat.message}
//             alt="chat-img"
//           />
//         ) : (
//           <div
//             className={`msg-con-seen ${
//               chat.sender === 2 ? "message-1" : "message-2"
//             }`}
//           >
//             <p className="message">{chat.message}</p>
//             {chat.sender === 2 && (
//               <div className="msg-seen-icon-con">
//                 <MsgSeen />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       {!isLastChat && (                  
//           <p
//             className={`chat-time ${
//               chat.sender === 1 ? "profile-name-receiver" : ""
//             }`}
//           >
//             {chat.date.split(";")[1]}
//           </p>
//       )}
//     </div>
//   </div>
// );
