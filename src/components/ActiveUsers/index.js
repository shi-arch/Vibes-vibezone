import React from 'react'
import { EyeOffline, VideoIcon } from '../svgComponents';

const ActiveUsers = ({ activeUsers, camOffUsers }) => {
  return (
    <div className="active-users-bg-container">
      <div className="active-status-container">
        <div className="active-icon"></div>
        <p className="active-para">{activeUsers ? activeUsers.length : 1000}</p>
      </div>
      <div className="active-status-container">
        <span className="sm-lg-icons-rotate">
          <VideoIcon />
        </span>

        <p className="active-para">
          {activeUsers ? activeUsers.length - camOffUsers.length : 0}
        </p>
      </div>
      <div className="active-status-container">
        <span className="sm-lg-icons-rotate">
          <EyeOffline />
        </span>

        <p className="active-para">{camOffUsers ? camOffUsers.length : 0}</p>
      </div>
    </div>
  );
};

export default ActiveUsers