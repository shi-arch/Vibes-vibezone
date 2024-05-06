import React, { useEffect, useState } from "react";


import { Attachment, Send } from "../svgComponents";
import { Input } from "../commonComponents/commonComponents";
import ChatsListNew from "../chat/ChatListNew";
import _, { cloneDeep } from 'lodash'
import "./index.css";
import { sendMessage } from "../../app/test/utils/wssConnection/wssConnection";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/features/chatSlice";



const ChatInterfaceNew = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const { messagesArr } = useSelector(state => state.chatSlice)

  var input = document.getElementById("msg");
  

  useEffect(() => {
    if(input){
      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          if(message){
            document.getElementById("sendButton").click();
          }          
        }
      });
    }
  }, [input])

  const sendMsg = () => {
    let arr = _.cloneDeep(messagesArr)
    let o = { message: message, sender: true }
    if (arr.length) {
      arr[arr.length] = o
    } else {
      arr.push(o)
    }
    dispatch(setMessages(arr))
    sendMessage(message);
    setMessage("")
  }
  return (
    <div className="chatInterFaceNew-bg-container">
      <div className="chat-list-new-container">
        <ChatsListNew />
      </div>
      <div className="send-msg-con-1">
        <div className="send-msg-con-2">
          <div className="attach-type-con">
            <Attachment />
            <Input
              type="text"
              css="input-send-message"
              placeholder="Type a message"
              value={message}
              onChange={setMessage}
            />
          </div>
          <div id="sendButton" onClick={() => sendMsg()}>
            <Send />
          </div>
          {/* <span>{userName ? userName + " Typing..." : ""}</span> */}
        </div>
      </div>
    </div>
  );
};

export default ChatInterfaceNew;
