import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
const styles = {
  videoContainer: {
    width: '100%',
    height: '100%'
  },
  videoElement: {
    width: '100%',
    height: '100%'
  }
};

const LocalVideoView = () => {
  const {remoteStream} = useSelector(state => state.callSlice);
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (remoteStream) {
      
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default LocalVideoView;
