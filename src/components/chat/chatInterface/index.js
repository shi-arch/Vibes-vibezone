
import url7 from "../../../assets/images/chatProfile.svg";
import Badges from "../badges/index.js";
import ChatsList from "../chatsList/index.js";
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
const socket = io.connect(process.env.REACT_APP_BASEURL);


const ChatInterface = () => {
  const { chatData, selectedUserData, messagesArr, userName } = useSelector(state => state.chatSlice);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const {token} = useSelector(state => state.loginSlice);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const chatContainerRef = useRef(null);
  const scrollbarTimeoutRef = useRef(null);
  const {_id} = useSelector(state => state.loginSlice.loginDetails); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatData) {
      const data = chatData.users.find(ele => ele._id == selectedUserData._id)
      if (data) {

      }
    }
  }, [chatData])


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
    if(result && response){
      debugger
      const cloneArr = [...messagesArr]
      cloneArr.push(o)
      dispatch(setMessages(cloneArr))
      socket.emit("sendMessage", {
        id: selectedUserData.Contact,
        msg: o
      })
    }
  }

  const getMessage = (value) => {
    setMessage(value)
    socket.emit("typing", {id: selectedUserData.Contact, name: selectedUserData.name || selectedUserData.Contact || selectedUserData.email})
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
          <button type="button" className="accept">
            Accept
          </button>
          <button type="button" className="reject">
            Regret
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
