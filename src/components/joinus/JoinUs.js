import React from "react";
import { Box, Button, Typography } from "@mui/material";

const JoinUs = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#373737",
        justifyContent: "space-between",
        marginBottom: "30px",
        "@media (max-width:426px)": {
          flexDirection: "column",
          padding:"24px"
        },
      }}
    >
      <Box
        sx={{
          width: "30%",
          padding: "80px",
          "@media (max-width:426px)": {
            width: "100%",
            padding: "0px",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "20px",
          }}
        >
          Join Us?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "12px",
            color: "#ffffff",
            marginBottom: "20px",
            "@media (max-width:426px)": {
              // width: "80%",
            },
          }}
        >
          At VibeZone, we're pioneering the next generation of social
          connectivity. Our platform is more than just an app it's a movement
          towards
        </Typography>
        <Button
          sx={{
            textTransform: "none",
            backgroundColor: "#8f47ff",
            color: "#ffffff",
            padding: "10px",
            fontSize: "10px",
            width: "100px",
            "&:hover": { backgroundColor: "#8f47ff", color: "#ffffff" },
          }}
        >
          Sign Up
        </Button>
      </Box>
      <Box
        width="40%"
        sx={{
          "@media (max-width:426px)": {
            width:"100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            marginTop:"34px"
          },
        }}
      >
        <Box
          component="img"
          src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710850787/dpt2s7xl3vmkn2xby7ap.png"
          sx={{ width: "70%" }}
        />
      </Box>
    </Box>
  );
};

export default JoinUs;
