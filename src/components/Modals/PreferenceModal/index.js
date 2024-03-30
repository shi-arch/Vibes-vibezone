import React, { useEffect, useState } from "react";
import "./index.css";
import { CrossSvg } from "../../svgComponents/svgComponents";
import { Button } from "../../commonComponents/commonComponents";
import { useDispatch, useSelector } from "react-redux";
import { setPreferenceModal } from "../../../redux/features/modalSlice";
import Modal from "@mui/material/Modal";
import { Box, Slider } from "@mui/material";
import { postApi } from "../../../response/api";

const topicsData = [
  {
    id: 1,
    name: "Rock",
    active: false,
  },
  {
    id: 2,
    name: "Pop",
    active: false,
  },
  {
    id: 4,
    name: "Jazz",
    active: false,
  },
  {
    id: 5,
    name: "Electronic",
    active: false,
  },
  {
    id: 6,
    name: "R&B",
    active: false,
  },
  {
    id: 7,
    name: "Reggae",
    active: false,
  },
  {
    id: 8,
    name: "Salsa",
    active: false,
  },
  {
    id: 9,
    name: "Ballet",
    active: false,
  },
  {
    id: 10,
    name: "Tap Dance",
    active: false,
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
const GenderSelection = ({ value, onChange }) => {
  return (
    <div className="gender-selection">
      <span className="Gender">
        Gender <span className="text-style-1">*</span>
      </span>
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={value === "male"}
            onChange={(e) => onChange(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={value === "female"}
            onChange={(e) => onChange(e.target.value)}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={value === "other"}
            onChange={(e) => onChange(e.target.value)}
          />
          Other
        </label>
      </div>
    </div>
  );
};

const PreferenceModal = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [gender, setGender] = useState();
  const [otherQuestions, setOtherQuestions] = useState();
  const [value, setValue] = useState([15, 20]);
  const dispatch = useDispatch();
  const modalSelector = useSelector((state) => state.modalSlice);
  const token = useSelector((state) => state.loginSlice.token);
  const { preferenceModal } = modalSelector;

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

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

    // localStorage.setItem("preferences", JSON.stringify(preferences));

    postApi("/preferences", preferences, token)
      .then((response) => {
        console.log("Preferences updated successfully:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Failed to update preferences:", error);
      });
  };

  const handleClose = () => {
    dispatch(setPreferenceModal());
  };

  const handleTopicClick = (topicId) => {
    setSelectedTopics((prevTopics) => {
      if (prevTopics.includes(topicId)) {
        return prevTopics.filter((id) => id !== topicId);
      } else {
        return [...prevTopics, topicId];
      }
    });
  };

  // useEffect(() => {
  //   console.log("Selected Topics:", selectedTopics);
  // }, [selectedTopics]);

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
          <GenderSelection value={gender} onChange={setGender} />
          {/* <h4 className="pref-head-text">Preferences</h4>
          <InputComponent
            label="Gender"
            onChange={setGender}
            value={gender}
            placeholder=""
          /> */}

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
                />
              </Box>
              <span className="-to-20">15 to 20</span>
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
            <Button type="submit" onClick={handleSave} label="Save" />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PreferenceModal;