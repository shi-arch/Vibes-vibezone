import React from "react";
import { Box , Typography} from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'column', backgroundColor:'#212121', justifyContent:'center', aignItems:'center',}}>
      <Box sx={{display:'flex', justifyContent:'space-between', marginBottom:'30px'}}>
                <Box sx={{display:'flex', flexDirection:'column', fontFamily:'Poppins, Arial'}}>
                    <Typography variant="h6" sx={{fontSize:'25px', fontWeight:'bold', marginBottom:'20px', color:'#ffffff'}}>Business Chat</Typography>
                    <Typography variant="p" sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)'}}>
                        Whether you're looking to make new friends, learn a new language, or
                        network professionally
                    </Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', fontFamily:'Poppins, Arial'}}>
                    <Typography variant="h6" sx={{fontSize:'25px', fontWeight:'bold', marginBottom:'20px', color:'#ffffff'}}>About</Typography>
                    <Typography variant="p"  sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>About Us</Typography>
                    <Typography variant="p"  sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>Career</Typography>
                    <Typography variant="p"  sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>Our Story</Typography>
                    <Typography variant="p"  sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>How we started</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', fontFamily:'Poppins, Arial'}}>
                    <Typography variant="h6" sx={{fontSize:'25px', fontWeight:'bold', marginBottom:'20px', color:'#ffffff'}}>Resources</Typography>
                    <Typography variant="p" sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>Home</Typography>
                    <Typography variant="p"  sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>Online Shop</Typography>
                    <Typography variant="p" sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>News & Update</Typography>
                    <Typography variant="p" sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>Contact Us</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', fontFamily:'Poppins, Arial'}}>
                    <Typography variant="h6" sx={{fontSize:'25px', fontWeight:'bold', marginBottom:'20px', color:'#ffffff'}}>Resources</Typography>
                    <Typography variant="p" sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>Home</Typography>
                    <Typography variant="p" sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>Online Shop</Typography>
                    <Typography variant="p" sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>News & Update</Typography>
                    <Typography variant="p" sx={{ fontSize:'12px',color:'rgba(255, 255, 255, 0.77)', marginBottom:'10px'}}>Contact Us</Typography>
                </Box>
      </Box>
      <Typography variant="p" sx={{fontSize:'13px',color:'rgba(255, 255, 255, 0.77)', textAlign:'center', fontFamily:'Poppins, Arial'}}>@Copyright SuperbThemes - Made With Love</Typography>
    </Box>
  );
};

export default Footer;
