import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/home/page'
import { closeTab } from './app/utils/wssConnection/wssConnection';
import VideoChat from './app/VideoChat/page';

window.onbeforeunload = (event) => {
  window.location.href = window.location.origin
  closeTab()
};

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/video-chat" element={<VideoChat />} />
        </Routes>
      </Router>
    </React.StrictMode>

  );
}

export default App;