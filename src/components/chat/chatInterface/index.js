
import url7 from "../../../assets/images/chatProfile.svg";
import Badges from "../badges/index.js";
import ChatsList from "../chatsList/index.js";
import _ from 'lodash'
import Swal from 'sweetalert2'
import { useState, useEffect, useRef } from "react";
import {
  ChatAudio,
  ChatVideo,
  ThreeDots,
  Attachment,
  ArrowLeft,
  Send,
} from "../../svgComponents/index.js";
import { Input, Button } from "../../commonComponents/commonComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { setRightOpen } from "../../../redux/features/modalSlice.js";
import { postApi } from "../../../response/api.js";
import { setOnEventChange, setChatData, setMessages } from "../../../redux/features/chatSlice.js";
import io from "socket.io-client";
import { CreatePeerConnection, callToOtherUser, getLocalStream, hangUp } from "../../../app/test/utils/webRTC/webRTCHandler.js";
import { setAvailableUsers } from "../../../redux/features/dashboardSlice.js";
import { setHangUp, setStartCall } from "../../../redux/features/callSlice.js";
const socket = io.connect(process.env.REACT_APP_BASEURL);


const ChatInterface = () => {
  const { chatData, selectedUserData, messagesArr, userName } = useSelector(state => state.chatSlice);
  const { activeUsers, availableUsers } = useSelector(state => state.dashboardSlice)
  const { callState } = useSelector((state) => state.callSlice);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useSelector(state => state.loginSlice);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const chatContainerRef = useRef(null);
  const scrollbarTimeoutRef = useRef(null);
  const { _id } = useSelector(state => state.loginSlice.loginDetails);
  const dispatch = useDispatch();

  const toggleArrowSize = () => {
    dispatch(setRightOpen());
  };

  const handleShowScrollbar = () => {
    if (scrollbarTimeoutRef.current) {
      clearTimeout(scrollbarTimeoutRef.current);
    }
    setShowScrollbar(true);
    scrollbarTimeoutRef.current = setTimeout(() => {
      setShowScrollbar(false);
    }, 800);
  };

  useEffect(() => {
    //socket.on("stop typing", () => setIsTyping(false));
    dispatch(setAvailableUsers(activeUsers))
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    const chatContainer = chatContainerRef.current;

    handleShowScrollbar();

    chatContainer.addEventListener("scroll", handleShowScrollbar);

    return () => {
      chatContainer.removeEventListener("scroll", handleShowScrollbar);
      if (scrollbarTimeoutRef.current) {
        clearTimeout(scrollbarTimeoutRef.current);
      }
    };
  }, []);

  const sendMessage = async () => {
    socket.emit("stop typing", selectedUserData.Contact)
    const o = {
      "senderId": _id,
      "content": message,
      "chatId": chatData._id
    }

    const obj = {
      "Users": [selectedUserData._id, _id],
      "lastMessage": message
    }
    const result = await postApi('/createMessage', o, token)
    const response = await postApi('/createChat', obj, token)
    if (result && response) {
      const cloneArr = [...messagesArr]
      cloneArr.push(o)
      dispatch(setMessages(cloneArr))
      socket.emit("sendMessage", {
        id: selectedUserData.Contact,
        msg: o
      })
      setMessage("")
    }
  }

  const getMessage = (value) => {
    setMessage(value)
    socket.emit("typing", { id: selectedUserData.Contact, name: selectedUserData.name || selectedUserData.Contact || selectedUserData.email })
  }

  const startRandomCall = async () => {
    const activeUserData = _.cloneDeep(activeUsers) 
    if(activeUserData.length){
      activeUserData.filter(user => user.isActive === true)
      dispatch(setStartCall(true))
      callToOtherUser(activeUserData[Math.floor(Math.random() * (activeUserData.length - 1))])
      await getLocalStream()
      await CreatePeerConnection();
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
    <div className="chat-container">
      <div className="chat-header">
        <div className="icon-username">
          <img src={url7} alt="chat-profile-icon" className="chat-icon" />
          <div className="user-time">
            <p className="chat-username">{selectedUserData.name || selectedUserData.Contact || selectedUserData.email || "Test"}</p>
            <Badges />
            <p className="minutes">Minutes Ago</p>
          </div>
        </div>
        <div className="accept-reject">
          <button type="button" onClick={startRandomCall} className="accept">
            Start random call
          </button>
          <button type="button" onClick={endCall} className="reject">
            End random call
          </button>
        </div>
        <div className="chat-controllers">
          <ChatAudio />
          <ChatVideo />
          <div className="three-dots">
            <ThreeDots />
          </div>
        </div>
      </div>
      <div className="arrow-container" onClick={toggleArrowSize}>
        <ArrowLeft />
      </div>
      <div className={`chat-container-2 ${showScrollbar ? 'show-scrollbar' : ''}`} ref={chatContainerRef}>
        <ChatsList />
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
              onChange={(e) => getMessage(e)}
            />
          </div>
          <div onClick={(e) => sendMessage(e)}><Send /></div>
          <span>{userName ? userName + " Typing..." : ""}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
