import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CrossSvg } from "../../svgComponents/svgComponents";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setEarlyAccessBardModal } from "../../../redux/features/modalSlice";
import { setUserProfile } from "../../../redux/features/loginSlice";
import { set } from "lodash";
import { postApi } from "../../../response/api";
import { setUserName } from "../../../redux/features/chatSlice";
import Swal from "sweetalert2";
import { validateEmail } from "../../commonComponents/commonComponents";

import ReactGA from "react-ga4"

const input = ({ type, label, onChange, placeholder, value }) => {
  return (
    <div className="label-input-container">
      <span className="Gender">{label}</span>
      <input
        type={type}
        name={label}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

const EarlyBardAccessModal = (props) => {
  const contactPattern = /^\d{10}$/;
  const { Gender, Name, ProfileImage, Status, username, dob, Contact } = useSelector((state) => state.loginSlice.userProfile);
  const userProfile = useSelector((state) => state.loginSlice.userProfile);
  const { token } = useSelector((state) => state.loginSlice);
  const [DOB, setDOB] = useState("");
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();  
  const [gender, setGender] = useState();
  const [error, setError] = useState({type: "", message: ""});
  const [state, setState] = useState();
  const [profileImage, setProfileImage] = useState();
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.modalSlice.earlyBardAccessModal
  );
  const handleModalClose = () => {
    dispatch(setEarlyAccessBardModal());
  };

  const handleValidation = () => {
    let errorObj = {
      type: "",
      message: ""
    }
    if(!name){
      errorObj.type = "name"
      errorObj.message = "Name is required!"
    } else if(!DOB) {
      errorObj.type = "dob"
      errorObj.message = "DOB is required!"
    } else if(!number) {
      errorObj.type = "number"
      errorObj.message = "Number is required!"
    } else if(number && !contactPattern.test(number)) {
      errorObj.type = "number"
      errorObj.message = "Number is incorrect!"      
    } else if(!email) {
      errorObj.type = "email"
      errorObj.message = "Email is required!"
    } else if(email && validateEmail(email) == null) {
      errorObj.type = "email"
      errorObj.message = "Email is incorrect!"      
    } else if(!gender) {
      errorObj.type = "gender"
      errorObj.message = "Gender is required!"
    } else if(gender && (gender.toLowerCase() !== "male" && gender.toLowerCase() !== "female" && gender.toLowerCase() !== "others")) {
      errorObj.type = "gender"
      errorObj.message = "Gender is incorrect!"
    }
    setError(errorObj)
    return errorObj
  }

  const handleSubmit = async (e) => {
    if(handleValidation().type !== "") return ;
      ReactGA.event({
      category: "Early Bird Access Modal Submit Button",
      action: "Submit",
      label: "Early Bird Access Button Modal Submit Button",
    });
    handleModalClose();
    const o = {
      Name: name,
      Contact: number,
      Gender: gender,
      Email: email,
      DOB: DOB,
    };
    dispatch(setUserProfile(o));
    dispatch(setUserName(name))
    postApi("/saveUser", o);
    Swal.fire({
      title: "Congratulations!",
      text: "Your application submitted successfully!",
      icon: "success",
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "50%",
    minHeight: "78%",
    boxShadow: 24,
    backgroundColor: "#fff",
    borderRadius: "49px",
    p: 4,
  };
  const errorStyle = {
    color: "red",
    fontSize: "12px",
    display: "block"
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className="Early-modal-bg-container">
          <div className="top-header">
            <h6 className="Early-bard-access">Early bird access</h6>
            <h6 className="Early-bard-access">{props.totalUserCount}</h6>            
            <button
              className="cross-button"
              type="button"
              onClick={handleModalClose}
            >
              <CrossSvg />
            </button>
          </div>
          <div className="content-container">
            <div className="left-content">
              <Typography
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="heading-text"
              >
                Name
              </Typography>
              <input
                className="box-field"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                value={name}
              />
              <span style={errorStyle}>
                {error.type == "name" ? error.message : ""}
              </span>
              <Typography
                className="heading-text"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                DOB
              </Typography>
              <input
                className="box-field"
                onChange={(e) => setDOB(e.target.value)}
                type="date"
                placeholder="DD/MM/YYYY"
                value={DOB}
              />
              <span style={errorStyle}>
                {error.type == "dob" ? error.message : ""}
              </span>
              <Typography
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="heading-text"
              >
                Number
              </Typography>

              <input
                className="box-field"
                type="tel"
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter your number"
                value={number}
              />
              <span style={errorStyle}>
                {error.type == "number" ? error.message : ""}
              </span>
            </div>

            <div className="right-content">
              <Typography
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="heading-text"
              >
                Email
              </Typography>
              <input
                className="box-field"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                value={email}
              />
              <span style={errorStyle}>
                {error.type == "email" ? error.message : ""}
              </span>
              <Typography
                style={{ fontWeight: "bold", fontSize: "20px" }}
                className="heading-text"
              >
                Gender
              </Typography>
              <input
                className="box-field"
                onChange={(e) => setGender(e.target.value)}
                type="text"
                placeholder="Enter your gender. Eg. Male, Female"
                value={gender}
              />
              <span style={errorStyle}>
                {error.type == "gender" ? error.message : ""}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </button>
        </div>
      </Box>
    </Modal>
  );
};
export default EarlyBardAccessModal;
