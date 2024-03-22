import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CrossSvg } from "../../svgComponents/svgComponents";
import PricePlanComponent from "../../PricePlanComponent";

const data = [
  {
    name: "Day",
    id: 1,
  },
  {
    name: "Month",
    id: 2,
  },
  {
    name: "Year",
    id: 3,
  },
  {
    name: "Life Time",
    id: 4,
  },
];

const index = () => {
  const [selectedDuration, setSelectedDuration] = useState(data[0].name);

  const handlePlanSelection = (item) => {
    setSelectedDuration(item.name);
  };
  const modalSelector = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();

  const style = {
    height: "calc(100% - 2rem)",
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    
    padding: "2rem 2rem 0rem 2rem",
    border: "0px solid red",
  };

  const handleClose = () => {};
  return (
    // <Modal
    //   open={true}
    //   // onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    <Box sx={style}>
      <Typography
        variant="h1"
        component="h2"
        sx={{
          fontFamily: "Poppins,arial",
          fontSize: "2.5rem",
          // fontSize: "40px",
          fontWeight: 600,
          margin: 0,
          color: "#2b2b2b",
          marginBottom: "2.5rem",
          textAlign: "center",
        }}
      >
        Pricing Plans
      </Typography>

      <Box
        sx={{
          backgroundColor: "#eef4fd",
          alignSelf: "center",
          marginBottom: "40px",
        }}
      >
        {data.map((item) => (
          <Button
            key={item.id}
            sx={{
              color: "#2b2b2b",
              padding: "12px 18px",
              fontWeight: selectedDuration === item.name && "600",
            }}
            onClick={() => handlePlanSelection(item)}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "22px",
        }}
      >
        <PricePlanComponent price="0" planName="VibeZone Free" black={true} />
        <PricePlanComponent price="0" planName="VibeZone Pulse" />
        <PricePlanComponent price="0" planName="VibeZone Spark" />
        <PricePlanComponent price="0" planName="VibeZone Spark" />
      </Box>
    </Box>
    // </Modal>
  );
};

export default index;
