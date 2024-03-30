import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBadgesModal } from "../../../redux/features/modalSlice";
import {
  CertifiedSharpBadge,
  ColdStreak,
  CrossSvg,
  HotStreak,
  LottoWinner,
} from "../../svgComponents/svgComponents";

const BadgeItem = ({ header, Badge, description }) => {
  return (
    <Box sx={{ marginBottom: "26px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {Badge}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontFamily: "Poppins,Arial",
            fontSize: "20px",
            color: "#2b2b2b",
            fontWeight: 500,
          }}
        >
          {header}
        </Typography>
      </Box>
      <Typography
        variant="body"
        component={"p"}
        sx={{
          fontFamily: "Poppins,Arial",
          margin: "11px 0 0",
          fontSize: "16px",
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.44,
          color: "rgba(43, 43, 43, 0.35)",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const data = [
  {
    name: "Certified Sharp",
    Element: <CertifiedSharpBadge />,
    description:
      "A bettor is typically considered “SHARP” if they win at a 55% average or greater. If you have a winning percentage of 55% or greater",
  },
  {
    name: "Hot Streak",
    Element: <HotStreak />,
    description:
      "Hit at least 5 bets in a row and earn a “Hot Streak” Badge. Once your winning streak ends, you lose this badge.",
  },
  {
    name: "Cold Streak",
    Element: <ColdStreak />,
    description:
      "Lose at least 5 bets in a row and you will earn a “Cold Streak” Badge. It happens to the best of us haha. This badge will be removed after you successfully win a bet.",
  },
  {
    name: "Lotto Winner",
    Element: <LottoWinner />,
    description:
      "Hit a bet at +5,000 or greater odds and earn this prestigious “Lotto Winner” badge. This badge is because we all chase lotto bets on occasion and we know how difficult they are to hit.",
  },
];

const Index = () => {
  const modalSelector = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();
  const { badgesModal } = modalSelector;
  const handleClose = () => {
    dispatch(setBadgesModal());
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: "80%",
    minWidth: "40%",
    bgcolor: "background.paper",
    border: "0px solid #000",
    backgroundColor:"#fff",
    border: "none",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
  };
  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={badgesModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            sx={{
              alignSelf: "flex-end",
              padding: "5px",
              borderRadius: "50%",
              margin: "0px",
              marginRight: "-20px",
              marginTop: "-20px",
              height: "25px",
              minWidth: "25px",
              backgroundColor: "#f2f5fb",
            }}
            onClick={handleClose}
          >
            <CrossSvg />
          </Button>
          <Typography
            id="modal-modal-title"
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
            Badges
          </Typography>
          <Box
            sx={{
              overflowY: "scroll",
              height: "50vh",
              "&::-webkit-scrollbar": {
                width: "0.4em",
                height: "10px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f2f2f2", // background color of the track
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#8f47ff", // color of the thumb
                borderRadius: "4px", // border radius of the thumb
              },
              paddingRight: "48px",
            }}
          >
            {data.map((item, i) => (
              <BadgeItem
                key={i}
                header={item.name}
                Badge={item.Element}
                description={item.description}
              />
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Index;
