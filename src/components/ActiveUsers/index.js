import React, { useEffect, useState } from 'react'
import { EyeOffline, VideoIcon } from '../svgComponents';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const ActiveUsers = () => {
  const { totalUsers } = useSelector(state => state.loginSlice)
  const { enableCam, disableCam, totalUserCount, activeUsersCount } = totalUsers
  return (
    <div className="active-users-bg-container">
      <div className="active-status-container tooltip">
      <span class="tooltiptext">Total users count</span>
        <div style={{marginLeft: `2px`}} className="active-icon"></div>
        <p className="active-para" style={{marginLeft: `7px`}}>{totalUserCount}</p>
      </div>
      <div className="active-status-container tooltip">
      <span class="tooltiptext">Total camera turned on</span>
        <span className="sm-lg-icons-rotate">
          <VideoIcon />
        </span>
        <p className="active-para">
          {enableCam}
        </p>
      </div>
      <div className="active-status-container tooltip">
      <span class="tooltiptext">Total camera turned off</span>
        <span className="sm-lg-icons-rotate">
          <EyeOffline />
        </span>
        <p className="active-para" style={{marginLeft: `3px`}}>{disableCam}</p>
      </div>
      <div className="active-status-container tooltip" style={{marginLeft: `3px`}}>
      <span class="tooltiptext">Available users for call</span>
        <div style={{background: '#8f47ff'}} className="active-icon"></div>
        <p className="active-para" style={{marginLeft: `6px`}}>{activeUsersCount}</p>
      </div>
    </div>
  );
};

export default ActiveUsers