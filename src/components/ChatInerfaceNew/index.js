import React, { useEffect, useState } from "react";


import { Attachment, Send } from "../svgComponents";
import { Input } from "../commonComponents/commonComponents";
import ChatsListNew from "../chat/ChatListNew";
import _, { cloneDeep } from 'lodash'
import "./index.css";
import { sendMessage, stopTypingMethod, typingMethod } from "../../app/test/utils/wssConnection/wssConnection";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/features/chatSlice";
import Swal from "sweetalert2";



const ChatInterfaceNew = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const { callState } = useSelector(state => state.callSlice)
  const { calleeUserName, isTyping, messagesArr } = useSelector(state => state.chatSlice)

  var input = document.getElementById("msg");
  const sendMsgFun = (val) => {    
    setMessage(val)
    typingMethod()
  }

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
    if(message.trim() && callState == "CALL_IN_PROGRESS") {
      stopTypingMethod()
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
    } else {
      Swal.fire({
        title: "sorry...",
        text: "You can't send message without calling or message should not be empty!",
        icon: "error",
      })
    }    
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
              onChange={sendMsgFun}
            />
          </div>
          <button style={{border: 'none', background: 'transparent'}} onClick={() => sendMsg()}><Send /></button>
          {/* {
            isTyping ? <span>{calleeUserName ? calleeUserName + " Typing..." : " Typing..."}</span> : ""
          }           */}
        </div>
      </div>
    </div>
  );
};

export default ChatInterfaceNew;
