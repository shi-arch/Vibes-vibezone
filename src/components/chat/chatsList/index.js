
import { MsgSeen } from "../../svgComponents";
import url1 from "../../../assets/images/profile1.svg";
import url2 from "../../../assets/images/profile2.svg";
import { chatList, updateChatList } from "../propsData";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


const ChatsList = () => {
  const dispatch = useDispatch();
  const {_id} = useSelector(state => state.loginSlice.loginDetails);
  const {token} = useSelector(state => state.loginSlice);  
  const {chatData, selectedUserData, messagesArr} = useSelector(state => state.chatSlice);

  useEffect(() => {
    if(chatData){
      console.log(selectedUserData)
    }    
  }, [chatData]);

  return (
    <>
      {messagesArr.map((chat, index) => {
        // Check if the current date is today
        const today = new Date();
        const isToday =
          today.toDateString() === new Date(chat.date).toDateString();

        // Check if the current date is yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday =
          yesterday.toDateString() === new Date(chat.date).toDateString();

        // let chatDate = chat.date ? chat.date.split(";")[0] : "";
        // chatDate = chatDate.split(",");
        // const formattedDate = `${chatDate[0]}, ${chatDate[1].split(" ")[2]} ${chatDate[1].split(" ")[1]
        //   } ${chatDate[2]}`;

        return (
          <div key={chat.chatId}>
            {/* <p className="chat-date">
              {isToday ? "Today" : isYesterday ? "Yesterday" : formattedDate}
            </p> */}
            <div className={`msg-con margin1}`}>
              <div className={`${chat.senderId === _id ? "sender" : "receiver"}`}>
                <div
                  className={`msg-con-seen ${chat.senderId === _id ? "message-1" : "message-2"
                    }`}
                >
                  <p className="message">{chat.content}</p>
                  {chat.senderId === _id && (
                    <div className="msg-seen-icon-con">
                      <MsgSeen />
                    </div>
                  )}
                </div>
              </div>
                  <div
                    className={`profile-name ${chat.senderId !== _id ? "profile-name-receiver" : ""
                      }`}
                  >
                    {chat.senderId === _id ? (
                      <img className="profile" src={url1} alt="profile1" />
                    ) : (
                      <img className="profile" src={url2} alt="profile2" />
                    )}
                    <p className="chat-name">{chat.senderId == _id ? "You" : "Friend"}</p>
                  </div>
                  <p
                    className={`chat-time ${chat.senderId !== _id ? "profile-name-receiver" : ""
                      }`}
                  >
                    {/* {chat.date.split(";")[1]} */}
                  </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatsList;
