import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import HomeComponent from '../../components/HomeComponent'
import { useDispatch } from 'react-redux';
import { restoreLocalData, result } from '../../components/commonComponents/commonComponents';
import { Button } from "@mui/material";
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
import { setUserLoggedIn, setUserName } from '../../redux/features/chatSlice';
import { setPeerId } from '../../redux/features/callSlice';
const LandingPage = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   restoreLocalData()
  //   router('/chat')
  // }, [])
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
                  dispatch(setUserName(user));
                  dispatch(setUserLoggedIn(user));
                  dispatch(setPeerId((Math.random() + 1).toString(36).substring(7)))
                  ReactGA.event({
                    category: "Early Access",
                    action: "Early Access Button",
                    label: "Button"
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