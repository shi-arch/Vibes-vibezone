import React from 'react'
import {Box} from '@mui/material'
import NavBar from '../navbar/NavBar'
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

const HomeComponent = () => {
  return (
    <Box>
        <NavBar/>
        <Box sx={{display:'flex', flexDirection:'column', alignItem:'center', justifyContent:'center', width:'100%'}}  >
          <EarlyAccess/>
          <About/>
          <TodayTask/>
          <Partners/>
          <WhyChooseUs/>
          <Features/>
          <Review/>
          <JoinUs/>
          <FreqAskQuestion/>
          <Footer/>
        </Box>
    </Box>
  )
}

export default HomeComponent