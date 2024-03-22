import { Box, Typography } from "@mui/material";

const TodayTask = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding:'30px'}}>
      <Typography variant="h6" sx={{color:'#2b2b2b', fontSize:'30px', fontWeight:'bold', fonrFamily:'Poppins, Arial'}}>What do I want today?</Typography>
      <Box sx={{ display: "flex", fontFamily:'Poppins, Arial', justifyContent:'space-between', alignItems:'center'}}>
        <Box sx={{ display: "flex", flexDirection: "column" , padding:'30px',width:'30%'}}>
          <Typography
            p={2}
            color="#8f47ff"
            sx={{
              backgroundColor: "#F3F2FF",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              marginBottom:'10px'
            }}
          >
            Spend relaxing evening
          </Typography>
          <Typography
            p={2}
            color="#8f47ff"
            sx={{
              backgroundColor: "#F3F2FF",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              marginBottom:'10px'
            }}
          >
            Enhance my skills
          </Typography>
          <Typography
            p={2}
            color="#8f47ff"
            sx={{
              backgroundColor: "#F3F2FF",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              marginBottom:'10px'
            }}
          >
            Grow my network
          </Typography>
        </Box>
        <Box >
          <Box component="img" src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710910136/xoetpelag0vjevuj9djt.jpg"/>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", padding:'30px', fontFamily:'Poppins, Arial', width:'30%'}}>
          <Typography
            p={2}
            color="#8f47ff"
            sx={{
              backgroundColor: "#F3F2FF",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              marginBottom:'10px'
            }}
          >
            Talk to starngers
          </Typography>
          <Typography
            p={2}
            color="#8f47ff"
            sx={{
              backgroundColor: "#F3F2FF",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              marginBottom:'10px'
            }}
          >
            Meet someone new
          </Typography>
          <Typography
            p={2}
            color="#8f47ff"
            sx={{
              backgroundColor: "#F3F2FF",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              marginBottom:'10px'
            }}
          >
            Audio and HD video calling
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TodayTask;
