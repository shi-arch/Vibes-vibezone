import React from 'react'
import { Box } from '@mui/material'
import HomeComponent from '../../components/HomeComponent'
import { useDispatch, useSelector } from 'react-redux';
import { result } from '../../components/commonComponents/commonComponents';
import { Typography, Button } from "@mui/material";
import { registerNewUser } from '../test/utils/wssConnection/wssConnection';
import { setLoginDetails, setToken, setVerifyOtp } from '../../redux/features/loginSlice';
import { useNavigate } from 'react-router-dom';

//result
const LandingPage = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box>
      {
        result.matches ?
          <div style={{ margin: '30px' }}>
            <div>
              <div style={{ display: 'flex' }}>
                <h4 style={{ paddingRight: '45px' }}>The <span className="hash-one">#1 </span>Live Video Chat with Random Stranger</h4>
                <h5 style={{ color: "rgba(43, 43, 43, 0.6)" }}>The leading social platform that brings the world to your screen. Connect with new friends from every corner of the globe in live, random video chats.</h5>
              </div>

              <Button
                onClick={() => {                  
                  registerNewUser("Guest + " + Math.random().toString().substr(2, 8))
                  router("/video-chat");
                }}
                style={{ marginTop: '-36px', float: 'right' }}
                sx={{
                  backgroundColor: "#8f47ff",
                  color: "#ffffff",
                  border: "1px solid",
                  "&:hover": { backgroundColor: "#8f47ff", color: "#ffffff" },
                  padding: '10px',
                  fontSize: '12px',
                  textTransform: 'none',
                  width: '150px',
                  borderRadius: '5px'
                }}
              >
                Get Early Access
              </Button>
            </div>
            <img style={{ width: '100%', marginTop: '25px' }} src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710906981/vn9fkut0mrqbvmiqtrrl.png" />
            <img style={{ width: '100%', marginTop: '25px' }} src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710908140/ryw9zfwbucnv6ac0m5y6.jpg" />

          </div>

          :
          <HomeComponent />
      }
    </Box>
  )
}

export default LandingPage  