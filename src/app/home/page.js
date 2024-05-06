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
                  let res = {
                    "user": {
                        "_id": "6610319768329cd6aeb44a59",
                        "UserType": "USER",
                        "Contact": "9898989898",
                        "CountryCode": "+91",
                        "email": "",
                        "isBlocked": false,
                        "isBlockedBy": [],
                        "otp": "1641",
                        "otpExpire": "2024-05-05T02:41:55.915Z",
                        "createdAt": "2024-04-05T17:15:03.366Z",
                        "updatedAt": "2024-05-05T02:31:55.918Z",
                        "__v": 0,
                        "DOB": "2024-04-23T00:00:00.000Z",
                        "Gender": "Male",
                        "Name": "Guest + " + Math.random().toString().substr(2, 8),
                        "ProfileImage": "http://localhost:3000/static/media/recentUser1.9b30cee02225456b0e93448c98a354fd.svg",
                        "Status": "guest",
                        "username": "gasjg_dd"
                    },
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTAzMTk3NjgzMjljZDZhZWI0NGE1OSIsImlhdCI6MTcxNDg3NjMzMX0.CjGaboLBOQLG9MQsuqWrQ2GSOYhfKMQ1luIR2wR0YSk",
                    "status": true
                }
                  localStorage.setItem("userData", JSON.stringify(res));
                  registerNewUser("Guest + " + Math.random().toString().substr(2, 8))
                  dispatch(setLoginDetails(res.user));
                  dispatch(setToken(res.token));
                  dispatch(setVerifyOtp(true))
                  router("/chat");
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