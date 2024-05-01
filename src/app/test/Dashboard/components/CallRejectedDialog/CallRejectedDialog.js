import React, { useEffect } from 'react';

import './CallRejectedDialog.css';
import { setCallRejected } from '../../../../../redux/features/callSlice';
import { useDispatch, useSelector } from 'react-redux';
const CallRejectedDialog = () => {
  const dispatch = useDispatch()
  const {callRejected} = useSelector(state => state.callSlice);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setCallRejected({
        rejected: false,
        reason: ''
      }));
    }, [4000]);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='call_rejected_dialog background_secondary_color'>
      <span>
        {callRejected.reason}
      </span>
    </div>
  );
};

export default CallRejectedDialog;
