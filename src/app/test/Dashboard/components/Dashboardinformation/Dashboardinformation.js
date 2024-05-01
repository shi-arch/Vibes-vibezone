import React from 'react';

import './Dashboardinformation.css';
import { useSelector } from 'react-redux';

const DashboardInformation = () => {
  const {username} = useSelector(state => state.dashboardSlice);
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        Hello {username} welcome in VideoChat.
      </span>
      <span className='dashboard_info_text_description'>
        You can start a call calling directy to a person from the list or
        you can create or join group call.
      </span>
    </div>
  );
};

export default DashboardInformation;
