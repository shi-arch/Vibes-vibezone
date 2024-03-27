import React from "react";
import "./index.css";
import { CrossSvg } from "../../svgComponents/svgComponents";
import { setPrivacyAndSecurityModal } from "../../../Context/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import { Box, Modal } from "@mui/material";

const PrivacyPolicyModal = () => {
  const dispatch = useDispatch();
  const modalSelector = useSelector((state) => state.modalSlice);
  const { privacyAndSecurityModal } = modalSelector;
  const handleClose = () => {
    dispatch(setPrivacyAndSecurityModal());
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={privacyAndSecurityModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style} className="privacy-policy-main-container">
        <button className="cross-button" onClick={handleClose}>
          <CrossSvg />
        </button>
        <h1 className="privacy-security">Privacy and Security</h1>

        <div className="policy-context scroll-bar">
          <h1 className="terms">1.Terms</h1>
          <p>
            A bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greate A bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greaterA bettor is typically considered “SHARP” if they win at a 55%
            average or greater. If you have a winning percentage of 55% or
            greate
          </p>
        </div>
      </Box>
    </Modal>
  );
};

export default PrivacyPolicyModal;
