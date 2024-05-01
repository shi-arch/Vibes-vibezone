import React from 'react';
import ActiveUsersListItem from './ActiveUsersListItem';
import './ActiveUsersList.css';
import { useSelector } from 'react-redux';

const ActiveUsersList = () => {
  const {activeUsers} = useSelector(state => state.dashboardSlice);
  return (
    <div className='active_user_list_container'>
      {activeUsers.map((activeUser) =>
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={'CALL_AVAILABLE'}
        />)}
    </div>
  );
};

export default ActiveUsersList;
