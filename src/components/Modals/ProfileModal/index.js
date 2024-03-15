"use client";

import React, { useEffect, useRef, useState } from "react";

import "./index.css";
import {
  CrossSvg,
  CameraSvg,
  DownArrowSvg,
} from "../../svgComponents/svgComponents";
import { useDispatch } from "react-redux";
import { setProfileModal } from "../../../Context/features/modalSlice";
import Image from "next/image";
import { Button } from "../../commonComponents/commonComponents";

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
  const [selectedGender, setSelectedGender] = useState("");
  const [dropDownSelected, setDropDownSelected] = useState(false);
  const [DOB, setDOB] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [userName, setUserName] = useState("");
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const profileModalRef = useRef();

  const handleClose = () => {
    dispatch(setProfileModal());
  };

  const handleGenderSelection = (gender) => {
    console.log(gender);
    setSelectedGender(gender.sex);
  };

  const handleDropDownClose = () => {
    setDropDownSelected(!dropDownSelected);
  };

  const handleSubmit = (e) => {
    console.log("hello");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        profileModalRef.current &&
        !profileModalRef.current.contains(e.target)
      ) {
        dispatch(setProfileModal());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form className="profile-modal-bg-container" ref={profileModalRef}>
      <button className="cross-button" onClick={handleClose}>
        <CrossSvg />
      </button>
      <div className="profile-inner-bg-container">
        <div className="left-side-container">
          <div className="profile-details-dp-container">
            <div className="profile-img-container">
              <Image
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile"
                width={104}
                height={104}
                className="image-profile"
              />
              <div className="camera-icon-container">
                <CameraSvg />
              </div>
            </div>
            <div>
              <span className="Savanah-Nguyen">Savanah Nguyen</span>
              <span className="Product-Designer">Product Designer</span>
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
    </form>
  );
};

export default ProfileModal;
