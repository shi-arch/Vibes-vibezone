import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CrossSvg } from "../../svgComponents/svgComponents";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setReportModal } from "../../../Context/features/modalSlice";
import { Margin } from "@mui/icons-material";

const IssueDropdown = ({ selectedIssue }) => {
  const [customIssue, setCustomIssue] = useState("");
  const [showCustomField, setShowCustomField] = useState(false);
  const [customIssueError, setCustomIssueError] = useState("");

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setReportModal());
  };
  const modalSelector = useSelector((state) => state.modalSlice);
  const { reportModal } = modalSelector;

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    selectedIssue(selectedValue);
  };

  const [selectedItem, setSelectedItem] = useState(selectedIssue || "");

  const issues = [
    "Harassment",
    "Unwanted Contact",
    "Grooming",
    "Fake Id",
    "Other",
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "31px 27px 47.4px 57px",
    p: 4,
    borderRadius: "15px",
    backgroundColor: "fff",
  };

  return (
    <Modal
      open={reportModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style} className="report-container">
        <button className="cross-button" onClick={handleClose}>
          <CrossSvg />
        </button>
        <FormControl>
          <Typography
            sx={{
              marginBottom: "17px",
              fontFamily: "Poppins,Arial",
              fontSize: "24px",
              fontWeight: "normal",
            }}
            className="issue"
          >
            Issue
          </Typography>
          <Select
            id="issue-select"
            className="issues-label"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            sx={{ backgroundColor: "#f2f5fb", marginBottom: "30px" }}
          >
            {issues.map((issue) => (
              <MenuItem key={issue} value={issue}>
                {issue}
              </MenuItem>
            ))}
          </Select>
          <Typography
            sx={{
              marginBottom: "17px",
              fontFamily: "Poppins,Arial",
              fontSize: "24px",
              fontWeight: "normal",
            }}
            className="description-text"
          >
            Description
          </Typography>
          <TextField
            id="description"
            sx={{ height: "240px" }}
            className="description-information"
            multiline
            rows={9}
          />
          {showCustomField && (
            <TextField
              id="custom-issue"
              label="Custom Issue"
              // value={customIssue}
              error={Boolean(customIssueError)}
              helperText={customIssueError}
              fullWidth
            />
          )}
        </FormControl>
        <Button
          className="custom-button"
          variant="contained"
          sx={{
            fontFamily: "Poppins,Arial",
            textTransform: "none",
            width: "117px",
            height: "49.6px",
            boxShadow: "none",
            backgroundColor: "#8f47ff",
            fontSize: "20px",
            fontWeight: "500",
            "&:hover": {
              backgroundColor: "#8f47ff",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default IssueDropdown;
