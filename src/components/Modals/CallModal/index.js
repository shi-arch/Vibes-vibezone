import React from "react";
import "./index.css";
import {  useSelector } from "react-redux";
import { Button } from "../../commonComponents/commonComponents";
import { Box, Modal, Typography } from "@mui/material";
//import { hangUp } from "../../../app/utils/webRTC/webRTCHandler";
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

const CallModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const {callingDialogVisible} = useSelector(state => state.callSlice) 
  return (
    <div>
      <Modal
        open={callingDialogVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Calling...
          </Typography>
          <div className="save-btn">
            <Button label="decline" onClick={() => {
              //hangUp()
            }}  type="button" />
          </div>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
};

export default CallModal;
