import { Box, Typography, Button } from "@mui/material";
import "./EarlyAccess.css";

const EarlyAccess = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          fontFamily: "Poppins, Arial",
          marginTop: "30px",
          marginBottom: "20px",
          justifyContent: "space-between",
          width:'100%'
        }}
      >
        <Box sx={{ width: "50%", padding: "50px" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "30px", marginBottom: "20px"}}
          >
            The <span className="hash-one">#1 </span>Live Video Chat with Random
            Stranger
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", color: "rgba(43, 43, 43, 0.6)", fontSize:"14px" }}
          >
            The leading social platform that brings the world to your screen.
            Connect with new friends from every corner of the globe in live,
            random video chats.
          </Typography>
          <Button
            sx={{
              backgroundColor: "#8f47ff",
              color: "#ffffff",
              border: "1px solid",
              "&:hover": { backgroundColor: "#8f47ff", color: "#ffffff" },
              padding:'10px',
              fontSize:'12px',
              textTransform:'none',
              width:'150px',
              borderRadius:'5px'
            }}
          >
            Get Early Access
          </Button>
        </Box>
        <Box sx={{ padding: "50px", width:'50%', display:'flex', justifyContent:'flex-end', alignItems:'flex-start'}}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710906981/vn9fkut0mrqbvmiqtrrl.png"
            alt="video call"
            sx={{ width: "80%", margin: "0 auto", objectFit:'contain', height:'100%'}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EarlyAccess;
