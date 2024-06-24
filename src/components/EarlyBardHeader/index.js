import { Button, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import EarlyBardAccessModal from "../Modals/EarlyAccessBardModal";
import { useDispatch } from "react-redux";
import { setEarlyAccessBardModal } from "../../redux/features/modalSlice";

import ReactGA from "react-ga4"

const EarlybardHeader = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState('reload');

  const handleOpenModal = () => {
    ReactGA.event({
      category: "Early Bird Access Button Modal",
      action: "Button",
      label: "Early Bird Access Button Modal"
    });
    dispatch(setEarlyAccessBardModal());
  };

  useEffect(() => {
    setTimeout(() => {
      if(timer == 'true'){
        setTimer('reload');
      } else {
        setTimer('true');
      }      
    }, 10000)
  }, [timer]);

  return (
    <Box>
      {
        timer == 'reload' ?
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
                marginBottom: "15px!important",
                height: "50px!important"
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
              onClick={handleOpenModal}
            >
              Early Bird Access
            </Button>
          </Box> : <Box
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
                marginBottom: "15px!important",
                height: "50px!important"
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
              Please reload when feel technical issues...
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
          </Box>
      }


      {/* <Box
        style={{
          marginTop: "-15px",
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
            marginBottom:"32px!important",
            height: "50px!important"
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
          Please reload when feel technical issues...
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
      </Box> */}
      <EarlyBardAccessModal />
    </Box>
  );
};

export default EarlybardHeader;

{/*  */ }
