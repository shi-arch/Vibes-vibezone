
import { MsgSeen } from "../../svgComponents";
import url1 from "../../../assets/images/profile1.svg";
import url2 from "../../../assets/images/profile2.svg";
import { chatList, updateChatList } from "../propsData";
import "../index.css";


const ChatsList = () => {
  let lastDisplayedDate = null;

  updateChatList(chatList);

  const getLastChat = (chatList, index) => {
    if (index < chatList.length - 1) {
      return chatList[index].sender === chatList[index + 1].sender;
    }
  };

  return (
    <>
      {chatList.map((chat, index) => {
        const isLastChat = getLastChat(chatList, index);
        const isImage = chat.message.startsWith("http");

        // Check if the current date is today
        const today = new Date();
        const isToday =
          today.toDateString() === new Date(chat.date).toDateString();

        // Check if the current date is yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday =
          yesterday.toDateString() === new Date(chat.date).toDateString();

        let chatDate = chat.date.split(";")[0];
        chatDate = chatDate.split(",");
        const formattedDate = `${chatDate[0]}, ${chatDate[1].split(" ")[2]} ${
          chatDate[1].split(" ")[1]
        } ${chatDate[2]}`;

        // Check if the current date is different from the last displayed date
        const isNewDate = lastDisplayedDate !== formattedDate;

        if (isNewDate) {
          lastDisplayedDate = formattedDate;
        }

        return (
          <div key={chat.id}>
            {isNewDate && (
              <p className="chat-date">
                {isToday ? "Today" : isYesterday ? "Yesterday" : formattedDate}
              </p>
            )}
            <div className={`msg-con ${isLastChat ? "margin2" : "margin1"}`}>
              <div className={`${chat.sender === 2 ? "sender" : "receiver"}`}>
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
                      <img className="profile" src={url1} alt="profile1" />
                    ) : (
                      <img className="profile" src={url2} alt="profile2" />
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
    </>
  );
};

export default ChatsList;
