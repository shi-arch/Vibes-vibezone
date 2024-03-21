import { Input } from "../commonComponents/commonComponents";
import { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsMicMute } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";
import Image from "next/image";
import url1 from "../../assets/images/profile1.svg";
import url2 from "../../assets/images/profile2.svg";
import url3 from "../../assets/images/profile3.svg";
import { MsgSeen, ArrowLeft, ArrowDown } from "../svgComponents";
import "./index.css";

const recentUsers = [
  {
    id: 1,
    onlineStatus: true,
  },
  {
    id: 2,
    onlineStatus: false,
  },
  {
    id: 3,
    onlineStatus: true,
  },
];

const notification = true;

const chatList = [
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
      "Hi there , nice to meet you, My name is Jenny Wilson, and I’m from Jakrta",
    date: new Date(),
    sender: 1,
    receiver: 2,
    name: "You",
  },
  {
    id: 6,
    message:
      "https://res.cloudinary.com/dysnxt2oz/image/upload/v1710821971/Rectangle_39_vy2nfe.png",
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

const updateChatList = (chatList) => {
  const today = new Date("2024-03-15");
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let currentDate;

  chatList.forEach((message, index) => {
    if (index < 3) {
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

  chatList.sort((a, b) => a.date - b.date);

  return chatList;
};

const updatedChatList = updateChatList(chatList);

const Chat = () => {
  const [searchInput, setSearchInput] = useState("");

  const getLastChat = (chatList, index) => {
    if (index < chatList.length - 1) {
      if (chatList[index].sender === 1) {
        return chatList[index].sender === 1 && chatList[index + 1].sender === 1;
      } else {
        return chatList[index].sender === 2 && chatList[index + 1].sender === 2;
      }
    }
  };

  const getLastDate = (chatList, index) => {
    if (index < chatList.length - 1) {
      return chatList[index].date === chatList[index + 1].date;
    }
  };

  return (
    <div className="main-container">
      <div className="side-panel"></div>

      <div className="right-side-con">
        <div className="header-container">
          <div className="recent-user-con">
            {recentUsers.map((eachUser) => (
              <div key={eachUser.id} className="recent-user">
                <div className="user-icon">
                  {eachUser.onlineStatus ? (
                    <span className="green-dot"></span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div className="search-container">
            <Input
              type="search"
              className="search-input"
              onChange={setSearchInput}
              placeholder="Search"
              value={searchInput}
            />
            <MdOutlineSearch size={18} className="search-icon" />
          </div>
          <div className="new-chats-con">
            <p className="new-chat">New Chats</p>
            <GoPlus className="plus-icon" />
          </div>
          <div className="notification-icon-con">
            <IoIosNotificationsOutline
              className="notification-icon"
              size={22}
            />
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
                <BsMicMute className="mute-icon" size={18} />
                <IoVideocamOutline className="video-icon" size={18} />
                <IoCallOutline className="end-call" size={14} />
              </div>
            </div>
          </div>
          <div className="chat-container">
            <div className="chat-header">
              <div className="icon-username">
                <div className="chat-icon"></div>
                <div className="user-time">
                  <p className="chat-username">Jenny Wilson</p>
                  <p className="minutes">Minutes Ago</p>
                </div>
              </div>
              <div className="chat-controllers">
                <IoMdCall className="call-icon" size={20} />
                <IoVideocamOutline className="video-icon" size={20} />
                <PiDotsThreeVerticalBold className="three-dots" size={20} />
              </div>
            </div>
            <ArrowLeft className="arrow-left" />
            <div className="chat-container-2">
              {chatList.map((chat, index) => {
                const isLastChat = getLastChat(chatList, index);
                const isLastDate = getLastDate(chatList, index);
                const isImage = chat.message.startsWith("http");

                let chatDate = chat.date.split(";")[0];
                chatDate = chatDate.split(",");
                const formattedDate = `${chatDate[0]}, ${
                  chatDate[1].split(" ")[2]
                } ${chatDate[1].split(" ")[1]} ${chatDate[2]}`;

                return (
                  <div key={chat.id}>
                    {isLastDate && isLastChat && (
                      <p className="chat-date">{formattedDate}</p>
                    )}
                    <div
                      className={`msg-con ${
                        isLastDate && isLastChat ? "margin2" : "margin1"
                      }`}
                    >
                      <div
                        className={`msg-profile ${
                          chat.sender === 2
                            ? "sender sent"
                            : "receiver received"
                        }`}
                      >
                        {isImage ? (
                          <img
                            className="chat-img"
                            src={chat.message}
                            alt="chat-img"
                          />
                        ) : (
                          <p className="message">{chat.message}</p>
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
          </div>
          <div className="friends-container">
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
                    <Image src={url3} alt="friend-profile" />
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
