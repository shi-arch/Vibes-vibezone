import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CrossSvg } from "../../svgComponents/svgComponents";
import "./index.css";

const IssueDropdown = ({ selectedIssue, handleIssueChange }) => {
  const [customIssue, setCustomIssue] = useState("");
  const [showCustomField, setShowCustomField] = useState(false);
  const [customIssueError, setCustomIssueError] = useState("");

  const handleClose = () => {
    window.location.href = "about:blank";
  };

  const issues = [
    "Harassment",
    "Unwanted Contact",
    "Grooming",
    "Fake Id",
    "Other",
  ];

  return (
    <Container className="report-container">
      <button className="cross-button" onClick={handleClose}>
        <CrossSvg />
      </button>
      <FormControl>
        <Typography className="issue">Issue</Typography>
        <Select
          id="issue-select"
          className="issues-label"
          value={selectedIssue || ""}
          sx={{ backgroundColor: "#f2f5fb" }}
        >
          {issues.map((issue) => (
            <MenuItem key={issue} value={issue}>
              {issue}
            </MenuItem>
          ))}
        </Select>
        <Typography className="description-text">Description</Typography>
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
            value={customIssue}
            onChange={handleCustomIssueChange}
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
          textTransform: "none",
          width: "117px",
          height: "49.6px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#8f47ff",
          },
        }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default IssueDropdown;
