import React, { useState } from "react";
import { CrossSvg } from "../../svgComponents/svgComponents";
import "./index.css";
import { setNotificationModal } from "../../../Context/features/modalSlice";
import { useDispatch } from "react-redux";

const index = () => {
  const [notification, setNotification] = useState(false);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setNotificationModal());
  };

  return (
    <div className="Notifications-main-container">
      <button className="cross-button" onClick={handleClose}>
        <CrossSvg />
      </button>
      <h1 className="notifications-heading ">Notifications</h1>
      <p className="notification-content-start">
        A bettor typically considered "SHARP" if they win at a 55% average
      </p>
      <hr className="line" />
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
        <hr className="line" />
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
        <hr className="line" />
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
    </div>
  );
};

export default index;
