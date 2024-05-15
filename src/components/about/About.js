import { Slide } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



const About = () => {
    return (
      <Box
        id="about"
        sx={{
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginTop: "30px",
            marginBottom: "30px",
            fontFamily: "Poppins, Arial",
          }}
          spacing={2}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710908140/ryw9zfwbucnv6ac0m5y6.jpg"
              sx={{ width: "500px" }}
            />
          </Box>
          <Box sx={{ width: "50%", padding: "100px" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "30px",
                color: "#2b2b2b",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              About
            </Typography>
            <Typography
              variant="p"
              component="body1"
              sx={{ color: "rgba(43, 43, 43, 0.6)", fontSize: "12px" }}
            >
              At VibeZone, we're pioneering the next generation of social
              connectivity. Our platform is more than just an app—it's a
              movement towards more meaningful digital interaction. Founded by a
              team passionate about breaking down communication barriers,
              VibeZone is dedicated to providing a safe, dynamic, and engaging
              environment for individuals worldwide to connect, share, and grow.
              Join us on this journey of discovery and be a part of a community
              that values authentic connections.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
}

export default About;