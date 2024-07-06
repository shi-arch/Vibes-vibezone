import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/home/page'
import { closeTab } from './app/utils/wssConnection/wssConnection';
import VideoChat from './app/VideoChat/page';
import ErrorBoundary from './error';

window.onbeforeunload = (event) => {
  window.location.href = window.location.origin
  closeTab() 
};

// window.onerror = function (message, source, lineno, colno, error) {
//   console.error('Global error caught: ', message, source, lineno, colno, error);
//   alert('Please reload the page')
// };

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
      <Router>
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/dev/video-chat" element={<VideoChat />} />
        </Routes>
      </Router>
      </ErrorBoundary>
    </React.StrictMode>

  );
}

export default App;