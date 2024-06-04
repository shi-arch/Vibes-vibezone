import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#212121",
        padding: "30px",
        "@media (max-width:426px)": {
          marginLeft: "-24px",
          marginRight: "-24px",
          padding: "24px"
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          "@media (max-width:426px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            "@media (max-width:426px)": {
              display: "flex",
              flexDirection: "row",
              marginBottom: "24px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Poppins, Arial",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#ffffff",
                "@media (max-width:426px)": {
                  fontSize: "18px",
                },
              }}
            >
              About
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.77)",
                marginBottom: "10px",
              }}
            >
              <Link href="https://vibezone.org/about/" target="_blank" underline="hover">
                About Us
              </Link>

            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.77)",
                marginBottom: "10px",
              }}
            >
              <Link href="https://vibezone.org/blog/" target="_blank" underline="hover">
                Our Story
              </Link>
            </Typography>
            
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            "@media (max-width:426px)": {
              display: "flex",
              flexDirection: "row",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Poppins, Arial",
              "@media (max-width:426px)": {
                width: "50%",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#ffffff",
                "@media (max-width:426px)": {
                  fontSize: "18px",
                },
              }}
            >
              Resources
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.77)",
                marginBottom: "10px",
              }}
            >
              <Link href="#home" underline="hover">
                Home
              </Link>
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.77)",
                marginBottom: "10px",
              }}
            >
              <Link href="https://vibezone.org/news/" target="_blank" underline="hover">
                News & Update
              </Link>

            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.77)",
                marginBottom: "10px",
              }}
            >
              <Link href="https://vibezone.org/contact-us/" target="_blank" underline="hover">
                Contact us
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        variant="p"
        sx={{
          fontSize: "13px",
          color: "rgba(255, 255, 255, 0.77)",
          textAlign: "center",
          fontFamily: "Poppins, Arial",
        }}
      >
        @Copyright SuperbThemes - Made With Love
      </Typography>
    </Box>
  );
};

export default Footer;
