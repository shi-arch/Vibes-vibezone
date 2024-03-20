import { Box, Button, Typography } from "@mui/material";
import React from "react";

const index = ({ planName, price, black }) => {
  return (
    <Box
      sx={{
        border: "1px solid #8f47ff",
        padding: "44px 23px 30px 23px",
        borderRadius: "18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: black && "#272c34",
        // width: "15%",
      }}
    >
      <Typography
        variant="h2"
        component={"h2"}
        sx={{
          fontFamily: "Poppins,Arial",
          fontSize: "26px",
          fontWeight: 600,
          margin: "0px 0px 26px 0px",
          color: black && "#fff",
        }}
      >
        {planName}
      </Typography>
      <Typography
        variant="h5"
        sx={{ marginBottom: "28px", color: black && "#fff" }}
      >
        ₹{price} <span>/m</span>
      </Typography>
      <Typography
        variant="body"
        component={"p"}
        sx={{
          fontFamily: "Poppins,Arial",
          fontSize: "1.25rem",
          marginBottom: "21px",
          color: black && "#fff",
        }}
      >
        50 Calls/day
      </Typography>
      <Typography
        variant="body"
        component={"p"}
        sx={{
          fontFamily: "Poppins,Arial",
          fontSize: "1.25rem",
          marginBottom: "21px",
          color: black && "#fff",
        }}
      >
        1 Hour/day
      </Typography>
      <Typography
        variant="body"
        component={"p"}
        sx={{
          fontFamily: "Poppins,Arial",
          fontSize: "20px",
          marginBottom: "21px",
          color: black && "#fff",
        }}
      >
        10 Req/day
      </Typography>
      <Typography
        variant="body"
        component={"p"}
        sx={{
          fontFamily: "Poppins,Arial",
          fontSize: "20px",
          marginBottom: "21px",
          color: black && "#fff",
        }}
      >
        2 Fav/day
      </Typography>

      <Button
        sx={{
          backgroundColor: "#8f47ff",
          color: "#fff",
          height: "0px",
          padding: "20px",
          "&:hover": {
            backgroundColor: "red",
          },
          borderRadius: "5px",
          marginTop: "15px",
        }}
      >
        Buy Now
      </Button>
    </Box>
  );
};

export default index;
