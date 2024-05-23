import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./index.css";
import {
  CrossSvg,
  CameraSvg,
  DownArrowSvg,
} from "../../svgComponents/svgComponents";
import { useDispatch, useSelector } from "react-redux";
import { setProfileModal } from "../../../redux/features/modalSlice";
import { Button } from "../../commonComponents/commonComponents";
import { Box, Modal } from "@mui/material";
import { postApi } from "../../../response/api";
import { setUserProfile } from "../../../redux/features/loginSlice";
import moment from "moment/moment";
const url =
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const genderData = [
  {
    sex: "Male",
    id: 1,
  },
  {
    sex: "Female",
    id: 2,
  },
  {
    sex: "Others",
    id: 3,
  },
];

const LabelInput = ({ type, label, onChange, placeholder, value }) => {
  return (
    <div className="label-input-container">
      <span class="Gender">
        {label}
        <span class="text-style-1">*</span>
      </span>
      <input
        type={type}
        name={label}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="input-container-pf"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

const ProfileModal = () => {
  const modalSelector = useSelector((state) => state.modalSlice);
  const { profileModal } = modalSelector;
  const dispatch = useDispatch();
  const { Gender, Name, ProfileImage, Status, username, dob, Contact } =
    useSelector((state) => state.loginSlice.userProfile);
  const userProfile = useSelector((state) => state.loginSlice.userProfile);
  const [selectedGender, setSelectedGender] = useState("");
  const [status, setStatus] = useState();
  const { token } = useSelector((state) => state.loginSlice);
  const [dropDownSelected, setDropDownSelected] = useState(false);
  const [DOB, setDOB] = useState();
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [userName, setUserName] = useState();
  const [state, setState] = useState();
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    if (userProfile) {
      setDOB(moment(dob).format("YYYY-MM-DD"));
      setName(Name);
      setProfileImage(ProfileImage ? ProfileImage : url);
      setState(Status ? Status : "");
      setUserName(username ? username : "");
      setNumber(Contact ? Contact : "");
      setSelectedGender(Gender ? Gender : "");
    }
  }, [userProfile]);

  const handleClose = () => {
    dispatch(setProfileModal());
  };

  const handleGenderSelection = (gender) => {
    console.log(gender);
    setDropDownSelected(false);
    setSelectedGender(gender.sex);
  };

  const handleDropDownClose = () => {
    setDropDownSelected(!dropDownSelected);
  };

  const handleSubmit = async (e) => {
    handleClose();
    const o = {
      ProfileImage: profileImage,
      Name: name,
      Contact: number,
      username: userName,
      Status: state,
      Gender: selectedGender,
      DOB: DOB,
    };
    const res = await postApi("/profile", o, token);
    if (res) {
      dispatch(setUserProfile(o));
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
      setProfileImage(res.data);
    }
  };

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
                  <span class="Gender">
                    Gender<span class="text-style-1">*</span>
                  </span>
                  <div className="drop-down-bg-container">
                    <div className="gender-drop-down">
                      {selectedGender}
                      <button
                        className="drop-down-button"
                        onClick={handleDropDownClose}
                      >
                        <DownArrowSvg />
                      </button>
                    </div>
                    {dropDownSelected && (
                      <div className={`gender-options-dropdown-container `}>
                        {genderData.map((gender) => (
                          <div
                            key={gender.id}
                            onClick={() => handleGenderSelection(gender)}
                            className="gender-item"
                          >
                            {gender.sex}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <LabelInput
                  type="date"
                  label="DOB"
                  onChange={setDOB}
                  placeholder=""
                  value={DOB}
                />
              </div>
            </div>

            <div>
              <LabelInput
                type="text"
                label="Name"
                onChange={setName}
                placeholder=""
                value={name}
              />
              <LabelInput
                type="tel"
                label="Number"
                onChange={setNumber}
                placeholder=""
                value={number}
              />
              <LabelInput
                type="text"
                label="User Name"
                onChange={setUserName}
                placeholder=""
                value={userName}
              />
              <LabelInput
                type="text"
                label="Statue"
                onChange={setState}
                placeholder=""
                value={state}
              />
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
