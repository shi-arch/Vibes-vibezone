import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/home/page'
import SignUp from './app/signup/page'
import Chat from './app/chat/page'
import VerifyOtp from './app/verify-otp/page'
import Guest from './app/guest/page'
import { closeTab, connectWithWebSocket } from './app/utils/wssConnection/wssConnection';
import VideoChat from './app/VideoChat/page';

window.onbeforeunload = (event) => {
  window.location.href = window.location.origin
  closeTab()
};

function App() {
  useEffect(() => {
    connectWithWebSocket()
  }, [])
  return (
    <React.StrictMode>
      <Router>
        <Routes>  
          <Route path="/" element={<Home />} />
          {/* <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/chat" element={<Chat />} /> */}
          <Route path="/video-chat" element={<VideoChat />} />
          {/* <Route path="/guest" element={<Guest />} /> */}
        </Routes>
      </Router>
    </React.StrictMode>

  );
}

export default App;