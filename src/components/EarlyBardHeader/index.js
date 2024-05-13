import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import EarlyBardAccessModal from "../Modals/EarlyAccessBardModal";
import { useDispatch } from "react-redux";
import { setEarlyAccessBardModal } from "../../redux/features/modalSlice";

const EarlybardHeader = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setEarlyAccessBardModal());
  };

  return (
    <>
      <div
        style={{
          marginTop: "-44px",
          // position: "fixed",
          top: 0,
          backgroundColor: "#010101",
          height: "56px",
          width: "100%",
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
            paddingTop: "20px",
          }}
        >
          Early Bard access is 6 months free for first 100 users...
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              width: "130px",
              height: "23px",
              backgroundColor: "#ffa64d",
              borderRadius: "10px",
              color: "#000",
              fontSize: "10px",
              textAlign: "left",
              fontFamily: "Poppins,Arial",
              fontWeight: "bold",
              marginRight: "40px",
              right: "15px",
              bottom: "15px",
            }}
            onClick={handleOpenModal}
          >
            Early Bard Access
          </Button>
        </div>
      </div>
      <EarlyBardAccessModal />
    </>
  );
};

export default EarlybardHeader;
