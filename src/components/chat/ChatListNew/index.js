import { useDispatch, useSelector } from "react-redux";
import { MsgSeen } from "../../svgComponents";
import "./index.css";
import { useEffect, useRef, useState } from "react";

const ChatsListNew = (props) => {
  const dispatch = useDispatch();
  const [chatBotName, setChatBotName] = useState("")
  const { messagesArr } = useSelector(state => state.chatSlice)
  const { userToCall, chatBot } = useSelector(state => state.callSlice)
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesArr]);

  useEffect(() => {
    if(chatBot){
      setChatBotName("Guest + " + Math.random().toString().substr(2, 8))
    }
  }, [chatBot]);

  return (
    <div className="chat-list-new-bg-container">
      <div className="guest-container">
        <h1 className="guest-head">{
        chatBot && chatBotName ? chatBotName :  
        props.remoteStream && userToCall && userToCall.username ? userToCall.username : "Guest"
        }</h1>
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
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatsListNew;
