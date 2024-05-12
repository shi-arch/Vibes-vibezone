import React, { useEffect, useState } from 'react'
import { EyeOffline, VideoIcon } from '../svgComponents';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const ActiveUsers = () => {
  const { totalUsers } = useSelector(state => state.loginSlice)
  const { enableCam, disableCam, totalUserCount, activeUsersCount } = totalUsers
  return (
    <div className="active-users-bg-container">
      <div className="active-status-container">
        <div className="active-icon"></div>
        <p className="active-para">{totalUserCount}</p>
      </div>
      <div className="active-status-container">
        <span className="sm-lg-icons-rotate">
          <VideoIcon />
        </span>
        <p className="active-para">
          {enableCam}
        </p>
      </div>
      <div className="active-status-container">
        <span className="sm-lg-icons-rotate">
          <EyeOffline />
        </span>
        <p className="active-para">{disableCam}</p>
      </div>
      <div className="active-status-container">
        <div style={{background: '#8f47ff'}} className="active-icon"></div>
        <p className="active-para">{activeUsersCount}</p>
      </div>
    </div>
  );
};

export default ActiveUsers