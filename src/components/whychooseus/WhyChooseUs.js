import React from "react";
import { Box, Typography, IconButton, Card } from "@mui/material";

const WhyChooseUs = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%",}}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          boxShadow: "10px",
          fontFamily: "Poppins, Arial",
          boxShadow: "20px",
          marginBottom: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{marginRight:'20px'}}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710911014/zxhcte2czeuqw71v2atk.png"
            alt="Girl with Dog"
            width="300px"
          />
        </Box>
        <Box sx={{ width: "60%", width: "60%" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#2b2b2b",
            }}
          >
            Why Choose Us?
          </Typography>
          <Typography
            variant="p"
            component="body1"
            sx={{
              fontSize: "12px",
              color: "#2b2b2b",
              marginBottom: "20px",
              fontFamily: "Poppins, Arial",
              fontWeight: "400",
            }}
          >
            Elevate your experience with us: Where Excellence Meets Commitment,
            And alignment of programs with overarching business objectives and
            instills a structured framework for managing intricate initiatives.
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Box
                sx={{
                  backgroundColor: "#E4D4FD",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710911753/w4xumndpywylgzhe5jvn.jpg"
                  alt="Exam"
                  sx={{ width: "20px" }}
                />
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, Arial",
                    fontSize: "14px",
                  }}
                >
                  Smart Matching
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Poppins, Arial",
                    color: "rgba(37, 37, 37, 0.7)",
                  }}
                >
                  Our dedicated tutors are here to support you every step of the
                  way, ensuring you grasp each concept with confidence
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Box
                sx={{
                  backgroundColor: "#E4D4FD",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710911774/t7ylva41uub7x4yke1v3.jpg"
                  alt="Badge of Honor"
                  sx={{ width: "20px" }}
                />
                </Box>
              <Box sx={{ ml: 2 }}>
                <Typography
                  variant="p"
                  sx={{ fontWeight: "bold", fontFamily: "Poppins, Arial", fontSize:'14px'}}
                >
                  Badge of Honor
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Poppins, Arial",
                    color: "rgba(37, 37, 37, 0.7)",
                  }}
                >
                  Unlock your achievement and enhance your skills with our
                  certificate program, validating your expertise in MSP.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Box
                sx={{
                  backgroundColor: "#E4D4FD",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710911789/ju4xmtoaoggf9exzynfd.jpg"
                  alt="Exam"
                  sx={{ width: "20px" }}
                />
              </Box>
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "bold", fontFamily: "Poppins, Arial", fontSize:'14px'}}
                  >
                    Purposeful Connectivity
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Poppins, Arial",
                      color: "rgba(37, 37, 37, 0.7)",
                    }}
                  >
                    Enroll now and experience comprehensive learning with exams
                    included, paving the way for your success and mastery of the
                    subject.
                  </Typography>
                </Box>
              </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default WhyChooseUs;
