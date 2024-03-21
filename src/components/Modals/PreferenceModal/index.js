"use client";
import React, {useState } from "react";
import "./index.css";
import { CrossSvg } from "../../svgComponents/svgComponents";
import { Button } from "../../commonComponents/commonComponents";

import styles from "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setPreferenceModal } from "../../../Context/features/modalSlice";
import Modal from "@mui/material/Modal";
import { Box, Slider, Typography } from "@mui/material";

import rangeThumbSvg from "../../../assets/images/rangeThumb.svg"

// import rangeThumb  from "../../../assets/images/rangeThumb.svg"

const topicsData = [
  {
    id: 1,
    name: "Music",
  },
  {
    id: 2,
    name: "Music",
  },
  {
    id: 3,
    name: "Music",
  },
  {
    id: 4,
    name: "Music",
  },
  {
    id: 5,
    name: "Music",
  },
  {
    id: 6,
    name: "Music",
  },
  {
    id: 7,
    name: "Music",
  },
  {
    id: 8,
    name: "Music",
  },
  {
    id: 9,
    name: "Music",
  },
  {
    id: 10,
    name: "Music",
  },
];

const InputComponent = (props) => {
  const handleInputChange = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <div className="preference-inner-container">
      <span className="Gender">
        {props.label}
        <span className="text-style-1">*</span>
      </span>
      <input
        className="input-pref"
        onChange={handleInputChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
};


function valuetext(value) {
  return `${value}°C`;
}

const PreferenceModal = () => {
  const [open,setOpen] = useState(false)
  const modalSelector = useSelector((state) => state.modalSlice);
  const { preferenceModal } = modalSelector;
  const dispatch = useDispatch();

  const [gender, setGender] = useState();
  const [otherQuestions, setOtherQuestions] = useState();
  const [age, setAge] = useState(0);

  const handleSave = () => {
    console.log("hello world");
  };

  const handleClose = () => {
    dispatch(setPreferenceModal());
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    minWidth: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };


    const [value, setValue] = useState([20, 37]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <Modal
      open={preferenceModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <div className="preference-modal-bg-container">
          <button className="cross-button" onClick={handleClose}>
            <CrossSvg />
          </button>
          <h4 className="pref-head-text">Preferences</h4>
          <InputComponent
            label="Gender"
            onChange={setGender}
            value={gender}
            placeholder=""
          />

          <div className="preference-inner-container">
            <span className="Gender">
              Age
              <span className="text-style-1">*</span>
            </span>

            <div className="input-range-container">
              {/* <input
                type="range"
                min="0"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="slider"
              /> */}
              <Box sx={{ width: 300 }}>
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  // className="slider"
                />
              </Box>
              <span className="-to-20">15 to 20</span>
              {/* <p>{age}</p> */}
            </div>
          </div>

          <div className="preference-inner-container">
            <span className="Gender">Topics</span>
            <div className="topics-container">
              {topicsData.map((topic) => (
                <div key={topic.id} className="topic-item-container">
                  <span>{topic.name}</span>
                  <CrossSvg
                    width="15px"
                    height="15px"
                    color="rgba(43, 43, 43, 0.6)"
                  />
                </div>
              ))}
            </div>
          </div>
          <InputComponent
            label="Other Questions"
            onChange={setOtherQuestions}
            value={otherQuestions}
            placeholder=""
          />

          <div className="save-btn">
            <Button
              type="submit"
              onClick={handleSave}
              label="Save"
              css={styles.saveButton}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PreferenceModal;
