import React, { useEffect, useState } from "react";


import { Attachment, Send } from "../svgComponents";
import { Input } from "../commonComponents/commonComponents";
import ChatsListNew from "../chat/ChatListNew";
import _, { cloneDeep } from 'lodash'
import "./index.css";
import { sendBotMessage, sendMessage } from "../../app/utils/wssConnection/wssConnection";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setSessionId } from "../../redux/features/chatSlice";
import Swal from "sweetalert2";

import ReactGA from "react-ga4"
import { postApi } from "../../response/api";


const ChatInterfaceNew = (props) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const { callState } = useSelector(state => state.callSlice)
  const { calleeUserName, isTyping, messagesArr, sessionId } = useSelector(state => state.chatSlice)

  var input = document.getElementById("msg");
  const sendMsgFun = (val) => {
    setMessage(val)
  }


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMsg()
    }
  }

  const sendMsg = async () => {
    if (message.trim() && callState == "CALL_CONNECTED") {
      let arr = _.cloneDeep(messagesArr)
      let o = { message: message, sender: true }
      if (arr.length) {
        arr[arr.length] = o
      } else {
        arr.push(o)
      }
      dispatch(setMessages(arr))
      await sendMessage(message);
      setMessage("")
      ReactGA.event({
        category: 'send Message',
        action: 'send Message Button',
        label: 'send Message Button'
      })      
    }
  }
  return (
    <div className="chatInterFaceNew-bg-container">
      <div className="chat-list-new-container">
        <ChatsListNew remoteStream={props.remoteStream} />
      </div>
      <div className="send-msg-con-1">
        <div className="send-msg-con-2">
          <div className="attach-type-con">
            {/* <Attachment /> */}
            <Input
              type="text"
              css="input-send-message"
              placeholder="Type a message"
              value={message}
              onChange={sendMsgFun}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button id="sendMessage" style={{ border: 'none', background: 'transparent' }} onClick={() => sendMsg()}><Send /></button>
          {/* {
            isTyping ? <span>{calleeUserName ? calleeUserName + " Typing..." : " Typing..."}</span> : ""
          }           */}
        </div>
      </div>
    </div>
  );
};

export default ChatInterfaceNew;
