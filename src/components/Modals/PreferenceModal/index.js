"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { CrossSvg } from "../../svgComponents/svgComponents";
import { Button } from "../../commonComponents/commonComponents";
import styles from "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setPreferenceModal } from "../../../Context/features/modalSlice";
import Modal from "@mui/material/Modal";
import { Box, Slider, Typography } from "@mui/material";
// import rangeThumbSvg from "../../../assets/images/rangeThumb.svg";
import axios from "axios";
const topicsData = [
  {
    id: 1,
    name: "Drawing",
  },
  {
    id: 2,
    name: "Music",
  },
  {
    id: 3,
    name: "Knitting",
  },
  {
    id: 4,
    name: "Jwellary Design",
  },
  {
    id: 5,
    name: "Painting",
  },
  {
    id: 6,
    name: "Writing",
  },
  {
    id: 7,
    name: "Learning",
  },
  {
    id: 8,
    name: "Handicraft",
  },
  {
    id: 9,
    name: "Digital Art",
  },
  {
    id: 10,
    name: "Sewing",
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
  const [open, setOpen] = useState(false);
  const modalSelector = useSelector((state) => state.modalSlice);
  const { preferenceModal } = modalSelector;
  const dispatch = useDispatch();
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTopics([...selectedTopics, value]);
    } else {
      setSelectedTopics(selectedTopics.filter((topic) => topic !== value));
    }
  };
  const [gender, setGender] = useState();
  const [otherQuestions, setOtherQuestions] = useState();
  const [age, setAge] = useState(0);

  const handleSave = () => {
    const preferences = {
      gender,
      ageRange: {
        start: value[0],
        end: value[1],
      },
      topics: selectedTopics,
      otherQuestions,
    };
    console.log("Updated Preferences:", preferences);

    axios
      .get("/api/preferences")
      .then((response) => {
        console.log("Preferences fetched successfully:", response.data);
        // Store the fetched preferences data in local storage
        localStorage.setItem("preferences", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Failed to fetch preferences:", error);
      });
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

  useEffect(() => {
    console.log("Selected Topics:", selectedTopics);
  }, [selectedTopics]);

  const handleTopicClick = (topicId) => {
    setSelectedTopics((prevTopics) => {
      if (prevTopics.includes(topicId)) {
        return prevTopics.filter((id) => id !== topicId);
      } else {
        return [...prevTopics, topicId];
      }
    });
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
                <div
                  key={topic.id}
                  className={`topic-item-container ${
                    selectedTopics.includes(topic.id) ? "selected" : ""
                  }`}
                  onClick={() => handleTopicClick(topic.id)}
                  style={{
                    backgroundColor: selectedTopics.includes(topic.id)
                      ? "#8f47ff"
                      : "",
                    color: selectedTopics.includes(topic.id)
                      ? "white"
                      : "black",
                  }}
                >
                  <span
                    className={`topic-item-container ${
                      selectedTopics.includes(topic.id) ? "selected" : ""
                    }`}
                  >
                    {topic.name}
                  </span>
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
