import React from 'react';
import userAvatar from '../../../utils/resources/userAvatar.png';
import { callToOtherUser, getLocalStream, CreatePeerConnection } from '../../../utils/webRTC/webRTCHandler';

const ActiveUsersListItem = (props) => {
  const { activeUser, callState } = props;

  const handleListItemPressed = async () => {
    if (callState === 'CALL_AVAILABLE') {
      callToOtherUser(activeUser);      
      await getLocalStream()      
      await CreatePeerConnection();      
    }
  };

  return (
    <div className='active_user_list_item' onClick={handleListItemPressed}>
      <div className='active_user_list_image_container'>
        <img className='active_user_list_image' src={userAvatar} alt='userimage'/>
      </div>
      <span className='active_user_list_text'>{activeUser.username}</span>
    </div>
  );
};

export default ActiveUsersListItem;
