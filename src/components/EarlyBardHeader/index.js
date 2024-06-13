import { Button, Typography,Box } from "@mui/material";
import React, { useState } from "react";
import EarlyBardAccessModal from "../Modals/EarlyAccessBardModal";
import { useDispatch } from "react-redux";
import { setEarlyAccessBardModal } from "../../redux/features/modalSlice";

import ReactGA from "react-ga4"

const EarlybardHeader = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    ReactGA.event({
      category: "Early Bird Access Button Modal",
      action:"Button",
      label:"Early Bird Access Button Modal"
    });
    dispatch(setEarlyAccessBardModal());
  };

  return (
    <Box>
      <Box
        style={{
          marginTop: "-44px",
          backgroundColor: "#010101",
          height: "30px",
          width: "calc(100% - 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 24px 10px 24px",
          marginBottom: "15px"          
        }}
        sx={{
          "@media (max-width:426px)": {
            flexDirection: "column",
            padding:"2px 0px"
          },
        }}
      >
        <Typography
          style={{
            height: "12px",
            fontFamily: "Poppins,Arial",
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "center",
            color: "#fff",
            // paddingTop: "20px",
          }}
        >
          Early Bird access is 6 months free for first 100 users...
        </Typography>
        <Button
          style={{
            backgroundColor: "#ffa64d",
            borderRadius: "10px",
            color: "#000",
            fontSize: "10px",
            textAlign: "left",
            fontFamily: "Poppins,Arial",
            fontWeight: "bold",
            height: "26px",
            marginTop: "14px",
          }}
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </Button>
        <Button
          style={{
            backgroundColor: "#ffa64d",
            borderRadius: "10px",
            color: "#000",
            fontSize: "10px",
            textAlign: "left",
            fontFamily: "Poppins,Arial",
            fontWeight: "bold",
            height: "26px",
            marginTop: "14px",
          }}
          onClick={handleOpenModal}
        >
          Early Bird Access
        </Button>        
        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}></div> */}
      </Box>
      <EarlyBardAccessModal />
    </Box>
  );
};

export default EarlybardHeader;
