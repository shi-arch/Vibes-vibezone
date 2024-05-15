import React from 'react'
import { Box } from '@mui/material'
import HomeComponent from '../../components/HomeComponent'
import { useDispatch, useSelector } from 'react-redux';
import { result } from '../../components/commonComponents/commonComponents';
import { Typography, Button } from "@mui/material";
import { registerNewUser } from '../test/utils/wssConnection/wssConnection';
import { setLoginDetails, setToken, setVerifyOtp } from '../../redux/features/loginSlice';
import { useNavigate } from 'react-router-dom';

import ReactGA from "react-ga4"

import WhatIWantToday from "../../assets/images/WhatIWantToday.svg"


import './index.css'
import Partners from '../../components/partnerscontainer/Partners';
import WhyChooseUs from '../../components/whychooseus/WhyChooseUs';
import Features from '../../components/features/Features';
import Review from '../../components/review/Review';
import JoinUs from '../../components/joinus/JoinUs';
import Footer from '../../components/footer/Footer';
import FreqAskQuestion from "../../components/freqaskquestion/FreqAskQuestion"
import Navbar from '../../components/Navbar/navbar';
import { setUserName } from '../../redux/features/chatSlice';
//result
const LandingPage = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box>
      {result.matches ? (
        <div>
          <Navbar />
          <div style={{ padding: "24px 24px 0px 24px" }}>
            <div>
              <div>
                <h1 style={{ paddingRight: "45px" }}>
                  The <span className="hash-one">#1 </span>Live Video Chat with
                  Random Stranger
                </h1>
                <h3 style={{ color: "rgba(43, 43, 43, 0.6)" }}>
                  The leading social platform that brings the world to your
                  screen. Connect with new friends from every corner of the
                  globe in live, random video chats.
                </h3>
              </div>

              <Button
                onClick={() => {
                  const user = "Guest + " + Math.random().toString().substr(2, 8);
                  registerNewUser(user);
                  dispatch(setUserName(user));
                  ReactGA.event({
                    category: "Early Access",
                    action: "Early Access Button",
                    label: "Button", // optional
                    // value: 99, // optional, must be a number
                    // nonInteraction: true, // optional, true/false
                    // transport: "xhr", // optional, beacon/xhr/image
                  });
                  router("/video-chat");
                }}
                sx={{
                  backgroundColor: "#8f47ff",
                  color: "#ffffff",
                  border: "1px solid",
                  "&:hover": { backgroundColor: "#8f47ff", color: "#ffffff" },
                  padding: "10px",
                  fontSize: "12px",
                  textTransform: "none",
                  width: "150px",
                  borderRadius: "5px",
                  marginTop: "15px",
                }}
              >
                Get Early Access
              </Button>
            </div>
            <img
              style={{ width: "100%", marginTop: "25px" }}
              src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710906981/vn9fkut0mrqbvmiqtrrl.png"
            />
            {/* <img style={{ width: '100%', marginTop: '25px' }} src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710908140/ryw9zfwbucnv6ac0m5y6.jpg" /> */}

            <div>
              <h2 className="what-do-i-want">What do i want today?</h2>

              <div className="what-container">
                <div class="Rectangle-166">
                  <span class="Spend-relaxing-evening">
                    Spend relaxing evening
                  </span>
                </div>
                <div class="Rectangle-166">
                  <span class="Spend-relaxing-evening">Enhance my skills</span>
                </div>
                <div class="Rectangle-166">
                  <span class="Spend-relaxing-evening">Grow my network</span>
                </div>

                <img src={WhatIWantToday} alt="logo" className="what-logo" />
                <div class="Rectangle-166">
                  <span class="Spend-relaxing-evening">Talk to strangers</span>
                </div>
                <div class="Rectangle-166">
                  <span class="Spend-relaxing-evening">Meet someone new</span>
                </div>
                <div class="Rectangle-166">
                  <span class="Spend-relaxing-evening">
                    Audio and HD video calling
                  </span>
                </div>
              </div>
            </div>

            <Partners />
            <WhyChooseUs />
            <Features />
            <Review />
            <JoinUs />
            <FreqAskQuestion />
            <Footer />
          </div>
        </div>
      ) : (
        <HomeComponent />
      )}
    </Box>
  );
}

export default LandingPage  