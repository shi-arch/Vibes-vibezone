import React, { useEffect, useState } from "react";
import { Button } from "../../commonComponents/commonComponents";
import { Box, Modal, Typography } from "@mui/material";
import { useSelector } from "react-redux";
const url = 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const IncomingCallModal = () => {
  const [open, setOpen] = React.useState(false);
  const {callState, callerUsername} = useSelector(state => state.callSlice) 
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={callState === 'CALL_REQUESTED' ? true : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">{callerUsername || 'Guest'}</Typography>
          <div style={{display: 'flex'}}>
          <div className="save-btn">        
            <Button label="Accept" onClick={acceptIncomingCallRequest}  type="button" />
          </div>
          <div className="save-btn">
            <Button label="Decline"  type="button" />
          </div>
          </div>          
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
};

export default IncomingCallModal;
