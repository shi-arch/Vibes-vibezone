import { useState } from "react";
import { Input } from "../../commonComponents/commonComponents.js";
import { Notification, Search, Plus } from "../../svgComponents/index.js";
import Image from "next/image";
import { recentUsers } from '../propsData';

const notification = true;

const Header = () => {
  const [searchInput, setSearchInput] = useState("");

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
  );
};

export default Header;
