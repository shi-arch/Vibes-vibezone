import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/home/page'
import SignUp from './app/signup/page'
import Chat from './app/chat/page'
import VerifyOtp from './app/verify-otp/page'
import Guest from './app/guest/page'
import { connectWithWebSocket } from './app/test/utils/wssConnection/wssConnection';

function App() {
  useEffect(() => {
    connectWithWebSocket()
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/guest" element={<Guest />} />
      </Routes>
    </Router>
  );
}

export default App;