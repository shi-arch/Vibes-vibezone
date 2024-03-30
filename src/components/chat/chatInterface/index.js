
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
import { useDispatch } from "react-redux";
import { setRightOpen } from "../../../redux/features/modalSlice.js";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [showScrollbar, setShowScrollbar] = useState(false);
  const chatContainerRef = useRef(null);
  const scrollbarTimeoutRef = useRef(null);
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

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="icon-username">
          <img src={url7} alt="chat-profile-icon" className="chat-icon" />
          <div className="user-time">
            <p className="chat-username">Jenny Wilson</p>
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
              onChange={setMessage}
            />
          </div>
          <Send />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
