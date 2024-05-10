import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CrossSvg } from "../../svgComponents/svgComponents";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setEarlyAccessBardModal } from "../../../redux/features/modalSlice";

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
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // Example API call to fetch user data
//       const data = await response.json();
//       // The response structure is { name, dob, number, email, gender }
//       setName(data.name);
//       setDOB(data.dob);
//       setNumber(data.number);
//       setEmail(data.email);
//       setGender(data.gender);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   fetchData();
// }, []);

const EarlyBardAccessModal = () => {
  const [DOB, setDOB] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.modalSlice.earlyBardAccessModal
  );

  // const modalSelector = useSelector((state) => state.modalSlice);

  // const { earlyAccessModal } = modalSelector;

  // const [open, setOpen] = useState(false);

  const handleModalClose = () => {
    dispatch(setEarlyAccessBardModal());
  };

  const handleSubmit = async (e) => {
    handleClose();
    const o = {
      Name: name,
      Contact: number,
      Gender: gender,
      DOB: DOB,
    };
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
            <h6 className="Early-bard-access">Early bard access</h6>
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
                placeholder="Enter your gender"
                value={gender}
              />
            </div>
          </div>

          <Button
            className="submit-button"
            style={{
              color: "#fff",
              backgroundColor: "#8f47ff",
              textTransform: "capitalize",
              borderRadius: "18px",
              fontSize: "24px",
              height: "60px",
              width: "164px",
            }}
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
export default EarlyBardAccessModal;
