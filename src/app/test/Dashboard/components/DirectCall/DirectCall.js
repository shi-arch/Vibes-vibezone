import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CallingDialog/CallingDialog';
import {setCallRejected, setLocalCameraEnabled, setLocalMicrophoneEnabled, setMessage } from '../../../../../redux/features/callSlice';
import ConversationButtons from '../ConversationButtons/ConversationButtons';

const DirectCall = () => {
  const {
    remoteStream,
    callState,
    callingDialogVisible,
    callRejected
  } = useSelector(state => state.callSlice);
  useEffect(() => {
    if(remoteStream) {
      console.log(callState)
     
    }
  }, [callState])
  return (
    <>
      <LocalVideoView />
      {remoteStream && callState === 'CALL_IN_PROGRESS' && <RemoteVideoView />}
      {callRejected.rejected && <CallRejectedDialog />}
      {callState === 'CALL_REQUESTED' && <IncomingCallDialog />}
      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === 'CALL_IN_PROGRESS' && <ConversationButtons />}
      {/* {remoteStream && callState === 'CALL_IN_PROGRESS' && <Messenger message={message} setDirectCallMessage={setDirectCallMessage} />} */}
    </>
  );
};

export default DirectCall
