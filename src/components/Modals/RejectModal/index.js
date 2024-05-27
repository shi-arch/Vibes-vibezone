import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../commonComponents/commonComponents";
import { Box, Modal, Typography } from "@mui/material";
import { setCallRejected } from "../../../redux/features/callSlice";
import store from "../../../redux/store";

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

const RejectModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const {rejected, reason} = useSelector(state => state.callSlice.callRejected) 
  const {startCall} = useSelector(state => state.callSlice) 
  return (
    <div>
      <Modal
        open={!startCall && rejected}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">{reason}</Typography>
          <div className="save-btn">
            <Button label="close" onClick={() => {
              const localStream = store.getState()?.callSlice?.localStream;
              localStream.getTracks().forEach(function(track) {
                track.stop();
              });
              dispatch(setCallRejected({rejected: false, reason: ''}));
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

export default RejectModal;
