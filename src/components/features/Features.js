import React from "react";
import { Box, Typography, Icon } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import SafetyCheckOutlinedIcon from "@mui/icons-material/SafetyCheckOutlined";
import "./Features.css";

const Features = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "40px",
      }}
    >
      <Box
        className="features-container"
        sx={{ padding: "30px", width: "90%", }}
      >
        <Box sx={{ padding: "20px" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins, Arial",
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Poppins, Arial",
              marginTop: "40px",
              "@media (max-width:426px)": {
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710949525/ft71s3wrbwuz8irjbo7d.png"
                sx={{
                  width: "50px",
                  marginBottom: "20px",
                  "@media (max-width:426px)": {
                    marginBottom: "12px",
                    width: "30px",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "18px",
                }}
              >
                Easy Chat
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710949571/otiguemeburj2ier7ivc.png"
                sx={{
                  width: "50px",
                  marginBottom: "20px",
                  "@media (max-width:426px)": {
                    marginBottom: "12px",
                    width: "30px",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "18px",
                }}
              >
                Match and Chat
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710949609/axei03blc5ma4heqibvo.png"
                sx={{
                  width: "50px",
                  marginBottom: "20px",
                  "@media (max-width:426px)": {
                    marginBottom: "12px",
                    width: "30px",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "18px",
                }}
              >
                New Friends are waiting
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710949707/fkjvi29ypnrbeadnwnsu.png"
                sx={{
                  width: "50px",
                  marginBottom: "20px",
                  "@media (max-width:426px)": {
                    marginBottom: "12px",
                    width: "30px",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "18px",
                }}
              >
                Chat Safety
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Features;
