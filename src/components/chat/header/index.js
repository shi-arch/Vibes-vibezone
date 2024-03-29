import { useState } from "react";
import { Input } from "../../commonComponents/commonComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { Notification, Search, Plus } from "../../svgComponents/index.js";
import Image from "next/image";
import { recentUsers } from '../propsData';
import { postApi } from "@/response/api.js";
import { setSearchUserData } from "@/Context/features/chatSlice.js";

const notification = true;

const Header = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const token = useSelector(state => state.loginSlice.token)
  const searchUser = async () => {
   console.log(token)   
    let col = "email"
    if(isNaN()) { 
      col = "Contact"
    }
    const result = await postApi('/search',{[col]: searchInput}, token)
    if(result){
      dispatch(setSearchUserData(result.data))
    }
  }

  return (
    <div className="header-container">
      <div className="recent-user-con">
        {recentUsers.map((eachUser) => (
          <div key={eachUser.id} className="recent-user">
            <Image
              src={eachUser.profileIcon}
              alt="recent-user-icon"
              className="user-icon"
            />
            {eachUser.onlineStatus ? <span className="green-dot"></span> : null}
          </div>
        ))}
      </div>
      <div className="search-container">
        <Input
          type="search"
          css="search-input"
          onChange={setSearchInput}
          placeholder="Search user by email or contact"
          value={searchInput}
        />
        <div onClick={searchUser}><Search/></div>        
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
  );
};

export default Header;
