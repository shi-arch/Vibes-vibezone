import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./index.css";
import {
  CrossSvg,
  CameraSvg,
  DownArrowSvg,
} from "../../svgComponents/svgComponents";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { setProfileModal } from "../../../redux/features/modalSlice";
import { Button, LabelInput } from "../../commonComponents/commonComponents";
import { Box, Modal } from "@mui/material";
import { postApi } from "../../../response/api";
import { setUserProfile } from "../../../redux/features/loginSlice";
import moment from "moment/moment";
import { validation } from "../../../app/utils/constant";
const url =
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const genderData = [{ key: 'male', label: 'Male' }, { key: 'female', label: 'Female' }, { key: 'other', label: 'Other' }];

const ProfileModal = () => {
  const modalSelector = useSelector((state) => state.modalSlice);
  const { profileModal } = modalSelector;
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.loginSlice);
  const { gender, name, profileImage, status, userName, dob, contact } = userProfile
  const { token } = useSelector((state) => state.loginSlice);
  const [error, setError] = useState("")

  const handleClose = () => {
    dispatch(setUserProfile(""))
    dispatch(setProfileModal());
  };

  const handleDropDownClose = () => {
    setDropDownSelected(!dropDownSelected);
  };
  const handleSubmit = async (e) => {
    const error = await validation(['name', 'contact', 'userName', 'status', 'gender', 'dob'], { name, contact, userName, status, gender, dob });
    if (!error.isErr) {
      handleClose();
      const o = {
        profileImage: profileImage,
        name: name,
        contact: contact,
        userName: userName,
        status: status,
        gender: gender,
        dob: dob,
      };
      const res = await postApi("/profile", o, token);
      if (res) {
        dispatch(setUserProfile(o));
        setError("")
        Swal.fire({
          title: "Awesome!",
          text: "Your profile updated successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Oops...!",
          text: "Something went wrong!",
          icon: "error",
        });
      }
    } else {
      setError(error)
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    backgroundColor: "#fff",
    p: 4,
  };

  const onImageChange = async (e) => {
    const formData = new FormData();
    formData.append("profileImg", e.target.files[0]);
    const res = await postApi("/image-upload", formData, token);
    if (res) {
      const cloneData = _.cloneDeep(userProfile)
      cloneData["profileImage"] = res.data
      dispatch(setUserProfile(cloneData))
    }
  };

  const handleChange = (value, name) => {
    const cloneData = _.cloneDeep(userProfile)
    cloneData[name] = value
    dispatch(setUserProfile(cloneData))
  }

  return (
    <Modal
      open={profileModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <div className="profile-modal-bg-container">
          <button className="cross-button" type="button" onClick={handleClose}>
            <CrossSvg />
          </button>
          <div className="profile-inner-bg-container">
            <div className="left-side-container">
              <div className="profile-details-dp-container">
                <div className="profile-img-container">
                  <img
                    src={profileImage}
                    alt="profile"
                    width={104}
                    height={104}
                    className="image-profile"
                  />
                  <div className="camera-icon-container">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onImageChange}
                    />
                    <CameraSvg />
                  </div>
                </div>
                <div>
                  <span className="Savanah-Nguyen"></span>
                  <span className="Product-Designer">{status}</span>
                </div>
              </div>
              <div>
                <div>
                  <div className="drop-down-bg-container">
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={gender}
                          onChange={(e) => {
                            handleChange(e.target.value, "gender")
                          }}
                          autoWidth
                          label="Gender"
                        >
                          <MenuItem value="">
                          </MenuItem>
                          {
                            genderData.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.key}>{item.label}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                      <span style={{color: '#D90202'}}>{error.isErr && error.type === "gender" ? error.msg : ""}</span>
                    </div>
                  </div>
                </div>
                <LabelInput
                  type="date"
                  label="DOB"
                  onChange={handleChange}
                  placeholder=""
                  value={dob}
                  name="dob"
                />
                <span style={{color: '#D90202'}}>{error.isErr && error.type === "dob" ? error.msg : ""}</span>
              </div>
            </div>

            <div>
              <LabelInput
                type="text"
                label="Name"
                onChange={handleChange}
                placeholder=""
                value={name}
                name="name"
              />
              <span style={{color: '#D90202'}}>{error.isErr && error.type === "name" ? error.msg : ""}</span>
              <LabelInput
                type="tel"
                label="Number"
                onChange={handleChange}
                placeholder=""
                value={contact}
                name="contact"
              />
              <span style={{color: '#D90202'}}>{error.isErr && error.type === "contact" ? error.msg : ""}</span>
              <LabelInput
                type="text"
                label="User Name"
                onChange={handleChange}
                placeholder=""
                value={userName}
                name="userName"
              />
              <span style={{color: '#D90202'}}>{error.isErr && error.type === "userName" ? error.msg : ""}</span>
              <LabelInput
                type="text"
                label="Status"
                onChange={handleChange}
                placeholder=""
                value={status}
                name="status"
              />
              <span style={{color: '#D90202'}}>{error.isErr && error.type === "status" ? error.msg : ""}</span>
            </div>
          </div>
          <div className="save-btn">
            <Button label="Save" type="button" onClick={handleSubmit} />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
