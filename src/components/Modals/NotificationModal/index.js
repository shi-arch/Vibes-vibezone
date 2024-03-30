import React, { useState } from "react";
import { CrossSvg } from "../../svgComponents/svgComponents";
import "./index.css";
import { setNotificationModal } from "../../../redux/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";

const Index = () => {
  const [notification, setNotification] = useState(false);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);
  const dispatch = useDispatch();

  const modalSelector = useSelector((state) => state.modalSlice);
  const { notificationModal } = modalSelector;

  const handleClose = () => {
    dispatch(setNotificationModal());
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "30%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={notificationModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style} className="Notifications-main-container">
        <button className="cross-button" onClick={handleClose}>
          <CrossSvg />
        </button>
        <h1 className="notifications-heading ">Notifications</h1>
        <p className="notification-content-start">
          A bettor typically considered "SHARP" if they win at a 55% average
        </p>
        <hr className="noti-line" />
        <div className="scroll-bar">
          <div className="scroll-inner-container">
            <div className="msg-container">
              <h1 className="new-msg-heading">New Messages</h1>
              <p className="notification-content">
                A bettor is typically considered "SHARP" if they win at a 55%
                average
              </p>
            </div>
            <div className="right-option">
              <div className="option">
                <input
                  type="checkbox"
                  checked={notification}
                  onChange={() => setNotification(!notification)}
                  id="push"
                  className="toggle-input"
                />
                <label
                  className={`toggle-label ${notification && "enabled"}`}
                  htmlFor="push"
                ></label>
                <span className="toggle-text"> Push</span>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  checked={email}
                  onChange={() => setEmail(!email)}
                  id="email"
                  className="toggle-input"
                />
                <label
                  htmlFor="email"
                  className={`toggle-label ${email && "enabled"}`}
                ></label>
                <span className="toggle-text">Email</span>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  checked={sms}
                  onChange={() => setSms(!sms)}
                  id="sms"
                  className="toggle-input"
                />
                <label
                  htmlFor="sms"
                  className={`toggle-label ${sms && "enabled"}`}
                ></label>
                <span className="toggle-text">SMS</span>
              </div>
            </div>
          </div>
          <hr className="noti-line" />
          <div className="scroll-inner-container">
            <div>
              <h1 className="new-msg-heading">New Messages</h1>
              <p className="notification-content">
                A bettor is typically considered "SHARP" if they win at a 55%
                average
              </p>
            </div>
            <div className="right-option">
              <div className="option">
                <input
                  type="checkbox"
                  checked={notification}
                  onChange={() => setNotification(!notification)}
                  id="push"
                  className="toggle-input"
                />
                <label
                  className={`toggle-label ${notification && "enabled"}`}
                  htmlFor="push"
                ></label>
                <span className="toggle-text">Push</span>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  checked={email}
                  onChange={() => setEmail(!email)}
                  id="email"
                  className="toggle-input"
                />
                <label
                  htmlFor="email"
                  className={`toggle-label ${email && "enabled"}`}
                ></label>
                <span className="toggle-text">Email</span>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  checked={sms}
                  onChange={() => setSms(!sms)}
                  id="sms"
                  className="toggle-input"
                />
                <label
                  htmlFor="sms"
                  className={`toggle-label ${sms && "enabled"}`}
                ></label>
                <span className="toggle-text">SMS</span>
              </div>
            </div>
          </div>
          <hr className="noti-line" />
          <div className="scroll-inner-container">
            <div>
              <h1 className="new-msg-heading">New Messages</h1>
              <p className="notification-content">
                A bettor is typically considered "SHARP" if they win at a 55%
                average
              </p>
            </div>
            <div className="right-option">
              <div className="option">
                <input
                  type="checkbox"
                  checked={notification}
                  onChange={() => setNotification(!notification)}
                  id="push"
                  className="toggle-input"
                />
                <label
                  className={`toggle-label ${notification && "enabled"}`}
                  htmlFor="push"
                ></label>
                <span className="toggle-text">Push</span>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  checked={email}
                  onChange={() => setEmail(!email)}
                  id="email"
                  className="toggle-input"
                />
                <label
                  htmlFor="email"
                  className={`toggle-label ${email && "enabled"}`}
                ></label>
                <span className="toggle-text">Email</span>
              </div>

              <div className="option">
                <input
                  type="checkbox"
                  checked={sms}
                  onChange={() => setSms(!sms)}
                  id="sms"
                  className="toggle-input"
                />
                <label
                  htmlFor="sms"
                  className={`toggle-label ${sms && "enabled"}`}
                ></label>
                <span className="toggle-text">SMS</span>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Index;
