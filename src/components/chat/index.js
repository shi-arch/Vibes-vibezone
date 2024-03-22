import { Input } from "../commonComponents/commonComponents";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import url1 from "../../assets/images/profile1.svg";
import url2 from "../../assets/images/profile2.svg";
import url3 from "../../assets/images/profile3.svg";
import url4 from "../../assets/images/recentUser1.svg";
import url5 from "../../assets/images/recentUser2.svg";
import url6 from "../../assets/images/recentUser3.svg";
import url7 from "../../assets/images/chatProfile.svg";
import {
  Badge1,
  Badge2,
  Badge3,
  Badge4,
  Search,
  Plus,
  ChatAudio,
  ChatVideo,
  ThreeDots,
  Notification,
  Mute,
  Video,
  EndCall,
  MsgSeen,
  Attachment,
  ArrowLeft,
  ArrowDown,
  Send,
} from "../svgComponents/index.js";
import "./index.css";
import SideBar from "../SideBar/sideBar";

const recentUsers = [
  {
    id: 1,
    profileIcon: url4,
    onlineStatus: true,
  },
  {
    id: 2,
    profileIcon: url5,
    onlineStatus: false,
  },
  {
    id: 3,
    profileIcon: url6,
    onlineStatus: true,
  },
];

const notification = true;

let chatList = [
  {
    id: 1,
    message:
      "Hi there , nice to meet you, My name is Jenny Wilson, and I’m from Jakrta",
    date: new Date(),
    sender: 2,
    receiver: 1,
    name: "Jenny Wilson",
  },
  {
    id: 2,
    message:
      "Hi there , nice to meet you, My name is Jenny Wilson, and I’m from Jakrta",
    date: new Date(),
    sender: 2,
    receiver: 1,
    name: "Jenny Wilson",
  },
  {
    id: 3,
    message:
      "Hi there , nice to meet you, My name is Jenny Wilson, and I’m from Jakrta",
    date: new Date(),
    sender: 1,
    receiver: 2,
    name: "You",
  },
  {
    id: 4,
    message:
      "https://res.cloudinary.com/dysnxt2oz/image/upload/v1710821805/Rectangle_38_wcgnpi.png",
    date: new Date(),
    sender: 2,
    receiver: 1,
    name: "Jenny Wilson",
  },
  {
    id: 5,
    message:
      "https://res.cloudinary.com/dysnxt2oz/image/upload/v1710821971/Rectangle_39_vy2nfe.png",
    date: new Date(),
    sender: 1,
    receiver: 2,
    name: "You",
  },
  {
    id: 6,
    message:
      "Hi there , nice to meet you, My name is Jenny Wilson, and I’m from Jakrta",
    date: new Date(),
    sender: 2,
    receiver: 1,
    name: "Jenny Wilson",
  },
  {
    id: 7,
    message:
      "Hi there , nice to meet you, My name is Jenny Wilson, and I’m from Jakrta",
    date: new Date(),
    sender: 1,
    receiver: 2,
    name: "You",
  },
];

const chats = [
  {
    id: 1,
    img: { url3 },
    name: "Jane Cooper",
    description: "Hello, don’t forget..",
    lastTime: "11:15 AM",
    selected: false,
  },
  {
    id: 2,
    img: { url3 },
    name: "Jane Cooper",
    description: "Hello, don’t forget..",
    lastTime: "11:15 AM",
    selected: false,
  },
  {
    id: 3,
    img: { url3 },
    name: "Jane Cooper",
    description: "Hello, don’t forget..",
    lastTime: "11:15 AM",
    selected: true,
  },
  {
    id: 4,
    img: { url3 },
    name: "Jane Cooper",
    description: "Hello, don’t forget..",
    lastTime: "11:15 AM",
    selected: false,
  },
  {
    id: 5,
    img: { url3 },
    name: "Jane Cooper",
    description: "Hello, don’t forget..",
    lastTime: "11:15 AM",
    selected: false,
  },
  {
    id: 6,
    img: { url3 },
    name: "Jane Cooper",
    description: "Hello, don’t forget..",
    lastTime: "11:15 AM",
    selected: false,
  },
  {
    id: 7,
    img: { url3 },
    name: "Jane Cooper",
    description: "Hello, don’t forget..",
    lastTime: "11:15 AM",
    selected: false,
  },
  {
    id: 8,
    img: { url3 },
    name: "Jane Cooper",
    description: "Hello, don’t forget..",
    lastTime: "11:15 AM",
    selected: false,
  },
];

const friends = chats;

const updateChatList = (chatList) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dayBeforeYesterday = new Date(yesterday);
  dayBeforeYesterday.setDate(yesterday.getDate() - 1);

  let currentDate;

  chatList.forEach((message, index) => {
    if (index < 2) {
      currentDate = dayBeforeYesterday;
    } else if (index < 4) {
      currentDate = yesterday;
    } else {
      currentDate = today;
    }

    currentDate.setHours(11);
    currentDate.setMinutes(0);

    const formattedDate = `${currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    })};${currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
    message.date = formattedDate;
  });

  return chatList;
};

chatList = updateChatList(chatList);

chatList.sort((a, b) => a.date - b.date);

let lastDisplayedDate = null;

const Chat = () => {
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");
  const [isRightOpen, setRightOpen] = useState(true);
  const [isLeftOpen, setLeftOpen] = useState(true);

  const onClickSideBar = () => {
    setLeftOpen((prevState) => !prevState);
  };

  const toggleArrowSize = () => {
    setRightOpen((prevState) => !prevState);
  };

  const getLastChat = (chatList, index) => {
    if (index < chatList.length - 1) {
      return chatList[index].sender === chatList[index + 1].sender;
    }
  };

  const getLastDate = (chatList, index, prevDate) => {
    if (index < chatList.length - 1) {
      const currentDate = chatList[index].date;
      const nextDate = chatList[index + 1].date;
      const isNewDate = currentDate !== nextDate;
      const isDifferentFromPrev = currentDate !== prevDate;

      // Update the previous date
      prevDate = currentDate;

      return isNewDate && isDifferentFromPrev;
    }

    return true; // Always show the date for the last chat
  };

  return (
    <div className="main-container">
      <SideBar isLeftOpen={isLeftOpen} handleSideBar={onClickSideBar} />

      {/* <div className="pricing-bg">
        <PricingPlansModal />
      </div> */}

      <div className={`right-side-con ${isLeftOpen ? "" : "right-con-sidebar-close expand-left"}`}>
        <div className="header-container">
          <div className="recent-user-con">
            {recentUsers.map((eachUser) => (
              <div key={eachUser.id} className="recent-user">
                <Image
                  src={eachUser.profileIcon}
                  alt="recent-user-icon"
                  className="user-icon"
                />
                {eachUser.onlineStatus ? (
                  <span className="green-dot"></span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="search-container">
            <Input
              type="search"
              css="search-input"
              onChange={setSearchInput}
              placeholder="Search"
              value={searchInput}
            />
            <Search />
          </div>
          <div className="new-chats-con">
            <p className="new-chat">New Chats</p>
            <Plus />
          </div>
          <div className="notification-icon-con">
            <Notification />
            {notification ? <span className="red-dot"></span> : null}
          </div>
        </div>
        <div className="bottom-con">
          <div className="call-container">
            <div className="images-con">
              <img
                src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
                className="image"
                alt="person1"
              />
              <img
                src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222352/Rectangle_29_zq40pr.png"
                className="image"
                alt="person2"
              />
            </div>
            <div className="call-controllers">
              <div className="calls">
                <Mute />
                <Video />
                <EndCall />
              </div>
            </div>
          </div>
          <div className="chat-container">
            <div className="chat-header">
              <div className="icon-username">
                <Image
                  src={url7}
                  alt="chat-profile-icon"
                  className="chat-icon"
                />
                <div className="user-time">
                  <p className="chat-username">Jenny Wilson</p>
                  <div className="badges-container">
                    <Tooltip
                      title="Badge1"
                      placement="bottom"
                      enterDelay={400}
                      leaveDelay={200}
                    >
                      <div>
                        <Badge1 />
                      </div>
                    </Tooltip>
                    <Tooltip
                      title="Badge2"
                      placement="bottom"
                      enterDelay={400}
                      leaveDelay={200}
                    >
                      <div>
                        <Badge2 />
                      </div>
                    </Tooltip>
                    <Tooltip
                      title="Badge3"
                      placement="bottom"
                      enterDelay={400}
                      leaveDelay={200}
                    >
                      <div>
                        <Badge3 />
                      </div>
                    </Tooltip>
                    <Tooltip
                      title="Vibe Master"
                      placement="bottom"
                      enterDelay={400}
                      leaveDelay={200}
                    >
                      <div>
                        <Badge4 />
                      </div>
                    </Tooltip>
                    <p className="five-plus">5+</p>
                  </div>
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
                <ThreeDots />
              </div>
            </div>
            <div className="arrow-container" onClick={toggleArrowSize}>
              <ArrowLeft className="arrow-left" />
            </div>
            <div className="chat-container-2">
              {chatList.map((chat, index) => {
                const prevDate = index > 0 ? chatList[index - 1].date : null;
                const isLastChat = getLastChat(chatList, index);
                const isLastDate = getLastDate(chatList, index, prevDate);
                const isImage = chat.message.startsWith("http");

                // Check if the current date is today
                const today = new Date();
                const isToday =
                  today.toDateString() === new Date(chat.date).toDateString();

                // Check if the current date is yesterday
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const isYesterday =
                  yesterday.toDateString() ===
                  new Date(chat.date).toDateString();

                let chatDate = chat.date.split(";")[0];
                chatDate = chatDate.split(",");
                const formattedDate = `${chatDate[0]}, ${
                  chatDate[1].split(" ")[2]
                } ${chatDate[1].split(" ")[1]} ${chatDate[2]}`;

                // Check if the current date is different from the last displayed date
                const isNewDate = lastDisplayedDate !== formattedDate;

                if (isNewDate) {
                  lastDisplayedDate = formattedDate;
                }

                return (
                  <div key={chat.id}>
                    {isNewDate && (
                      <p className="chat-date">
                        {isToday
                          ? "Today"
                          : isYesterday
                          ? "Yesterday"
                          : formattedDate}
                      </p>
                    )}
                    <div
                      className={`msg-con ${
                        isLastChat ? "margin2" : "margin1"
                      }`}
                    >
                      <div
                        className={`${
                          chat.sender === 2 ? "sender" : "receiver"
                        }`}
                      >
                        {isImage ? (
                          <img
                            className={`chat-img ${
                              chat.sender === 2 ? "message-1" : "message-2"
                            }`}
                            src={chat.message}
                            alt="chat-img"
                          />
                        ) : (
                          <div
                            className={`msg-con-seen ${
                              chat.sender === 2 ? "message-1" : "message-2"
                            }`}
                          >
                            <p className="message">{chat.message}</p>
                            {chat.sender === 2 && (
                              <div className="msg-seen-icon-con">
                                <MsgSeen />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {!isLastChat && (
                        <>
                          <div
                            className={`profile-name ${
                              chat.sender === 1 ? "profile-name-receiver" : ""
                            }`}
                          >
                            {chat.sender === 2 ? (
                              <Image
                                className="profile"
                                src={url1}
                                alt="profile1"
                              />
                            ) : (
                              <Image
                                className="profile"
                                src={url2}
                                alt="profile2"
                              />
                            )}
                            <p className="chat-name">{chat.name}</p>
                          </div>
                          <p
                            className={`chat-time ${
                              chat.sender === 1 ? "profile-name-receiver" : ""
                            }`}
                          >
                            {chat.date.split(";")[1]}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
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
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Send />
              </div>
            </div>
          </div>
          <div className={`friends-container ${(!isLeftOpen && !isRightOpen) ? 'left-and-right-expand' : ''}  ${!isRightOpen ? 'expanded' : ''}`}>
            <div>
              <div className="chats-arrow">
                <p className="chat-text">Chats</p>
                <ArrowDown />
              </div>
              {chats.map((eachUser, index) => (
                <ul
                  key={index}
                  className={`profile-info ${
                    eachUser.selected ? "active-user" : ""
                  }`}
                >
                  <div className="profile">
                    <Image src={url3} width={50} alt="friend-profile" />
                    <div className="profile-name-desc">
                      <p className="profile-name">{eachUser.name}</p>
                      <p className="profile-description">
                        {eachUser.description}
                      </p>
                    </div>
                  </div>
                  <p className="profile-time">{eachUser.lastTime}</p>
                </ul>
              ))}
            </div>
            <div>
              <div className="chats-arrow">
                <p className="chat-text">Friends</p>
                <ArrowDown />
              </div>
              {friends.map((eachUser, index) => (
                <ul key={index} className="profile-info">
                  <div className="profile">
                    <Image src={url3} width={50} alt="friend-profile" />
                    <div className="profile-name-desc">
                      <p className="profile-name">{eachUser.name}</p>
                      <p className="profile-description">
                        {eachUser.description}
                      </p>
                    </div>
                  </div>
                  <p className="profile-time">{eachUser.lastTime}</p>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
