
import React, { useEffect } from 'react'
import {Box} from '@mui/material'
import NavBar from '../Navbar/navbar'
import EarlyAccess from '../earlyaccess/EarlyAccess'
import About from '../about/About'
import TodayTask from '../todaytask/TodayTask'
import Partners from '../partnerscontainer/Partners';
import WhyChooseUs from '../whychooseus/WhyChooseUs';
import Features from '../features/Features';
import JoinUs from '../joinus/JoinUs';
import Footer from '../footer/Footer';
import Review from '../review/Review';
import FreqAskQuestion from '../freqaskquestion/FreqAskQuestion';
import { useNavigate } from "react-router-dom";
import { setLoginDetails, setToken } from "../../redux/features/loginSlice";
import { useDispatch } from "react-redux";
import AnimatedSection from '../AnimatedSection'

const HomeComponent = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
  let userData = localStorage.getItem("userData")
  if(userData){
    const parsedData = JSON.parse(userData)
    dispatch(setLoginDetails(parsedData.user));
    dispatch(setToken(parsedData.token));
    // router("/chat")
  }  
  }, []);






  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItem: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <EarlyAccess />
        <AnimatedSection>
          <About />
        </AnimatedSection>
        <AnimatedSection>
          <TodayTask />
        </AnimatedSection>

        <AnimatedSection>
          <Partners />
        </AnimatedSection>

        <AnimatedSection>
          <WhyChooseUs />
        </AnimatedSection>

        <AnimatedSection>
          <Features />
        </AnimatedSection>

        <AnimatedSection>
          <Review />
        </AnimatedSection>

        <JoinUs />
        <FreqAskQuestion />
        <Footer />
      </Box>
    </Box>
  );
}

export default HomeComponent