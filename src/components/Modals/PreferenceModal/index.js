"use client";
import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { CrossSvg } from "../../svgComponents/svgComponents";
import { Button } from "../../commonComponents/commonComponents";

import styles from "./index.css";
import { useDispatch } from "react-redux";
import { setPreferenceModal } from "../../../Context/features/modalSlice";

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

const PreferenceModal = () => {
  const preferenceModalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        preferenceModalRef.current &&
        !preferenceModalRef.current.contains(event.target)
      ) {
        dispatch(setPreferenceModal());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const [gender, setGender] = useState();
  const [otherQuestions, setOtherQuestions] = useState();
  const [age, setAge] = useState(0);

  const handleSave = () => {
    console.log("hello world");
  };

  const handleClose = () => {
    dispatch(setPreferenceModal());
  };
  return (
    <div className="preference-modal-bg-container" ref={preferenceModalRef}>
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
          <input
            type="range"
            min="0"
            max="100"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="slider"
          />
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

      {/* <button className="saveButton">Save</button> */}
    </div>
  );
};

export default PreferenceModal;
