//import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import SideBarNew from "../../components/SideBarNew";
import "./videochat.css"
import HeaderNew from '../../components/HeaderNew';
import VideoCallInterFace from '../../components/VideoCallInterFace';
import ChatInterfaceNew from '../../components/ChatInerfaceNew';
import axios from "axios";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setButtonLabel, setCallState, setDisableButton, setLocalCameraEnabled, setDisplayConnect, setPeer, setTimer, setTriggerCall, setSkipTimer, setUserToCall, setDisable, setPeerId } from '../../redux/features/callSlice';
import { connectWithWebSocket, handleCamera, registerNewUser, sendBotMessage, startCall, updateUser } from '../utils/wssConnection/wssConnection';
import { LogoSvg } from '../../components/svgComponents';
import CallIcons from '../../components/CallIcons';
import ActiveUsers from '../../components/ActiveUsers';
import EarlyBoardAccessModal from "../../components/Modals/EarlyAccessBardModal";
import EarlybardHeader from "../../components/EarlyBardHeader";
import Peer from "peerjs";
import { setMessages, setUserName } from "../../redux/features/chatSlice";
import { getApi, postApi } from "../../response/api";
import { Button } from "@mui/material";
const VideoChat = () => {
  const dispatch = useDispatch()
  const [localStream, setLocalStream] = useState(null)
  const [msg, setMessage] = useState(null)  
  const [notificationPopup, setNotificationPopup] = useState(true)  
  const [remoteStream, setRemoteStream] = useState(null)
  const [localTime, setLocalTime] = useState(null)
  const [peer, setPeer] = useState(null)
  const [currentCall, setCurrentCall] = useState(null)
  const { peerId, userToCall, triggerCall, timer, socketId, skipTimer, buttonLabel, localCameraEnabled, enableDisableRemoteCam, enableDisableRemoteMic, callState, botTimer } = useSelector(state => state.callSlice)

  
  useEffect(() => {
    const checkUser = localStorage.getItem("user")
    if (checkUser && !peerId) {
      const newPeerId = (Math.random() + 1).toString(36).substring(7)
      localStorage.setItem("peerId", newPeerId)
      dispatch(setUserName(checkUser));
      dispatch(setPeerId(newPeerId))
    }
  }, [])
  const homepageData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "VibeZone",
    "url": "https://vibezone.in",
    "description": "Discover VibeZone, the leading Omegle alternative! Connect and talk to random people safely and enjoyably.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://vibezone.in/search?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const NetworkQuality = {
    POOR: 0,
    MODERATE: 1,
    GOOD: 2
  };
  
  function getNetworkQuality(networkSpeed) {
    if (networkSpeed < 100000 || networkSpeed < 100000) {
      return NetworkQuality.POOR;
    } else if (networkSpeed < 1000000 || networkSpeed < 1000000) {
      return NetworkQuality.MODERATE;
    } else {
      return NetworkQuality.GOOD;
    }
  }
  

  const status = async (call) => {
    try {
      const stats = await call?.peerConnection?.getStats(null);
      if (stats) {
        let speed = 0;
        stats.forEach(report => {
          if (report.type === 'candidate-pair' && report.state === 'succeeded' && report.bytesSent && report.bytesReceived) {
            console.log(report);
            const bytesSent = report.bytesSent;
            const bytesReceived = report.bytesReceived;
            const totalBytes = bytesSent + bytesReceived;
            
            // Calculate average bitrate in Mbps (assuming duration between last sent/received packets)
            const durationInSeconds = (report.lastPacketReceivedTimestamp - report.lastPacketSentTimestamp) / 1000;
            const bitrateMbps = (totalBytes / 8) / (durationInSeconds * 1000000); // Convert bytes to bits and divide by seconds
  
            console.log(`Estimated Bandwidth: ${bitrateMbps.toFixed(2)} Mbps`);
            speed = report.availableOutgoingBitrate;
          }
        });
        return speed;
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  function getUpdatedConstraints(networkQuality) {
    let constraints = {
      video: true,
      audio: true,
    };
  
    switch (networkQuality) {
      case NetworkQuality.POOR:
        constraints.video = {
          width: { max: 320 },
          height: { max: 240 },
          frameRate: { max: 15 },
        };
        break;
      case NetworkQuality.MODERATE:
        constraints.video = {
          width: { max: 640 },
          height: { max: 480 },
          frameRate: { max: 24 },
        };
        break;
      case NetworkQuality.GOOD:
        constraints.video = {
          width: { max: 1280 },
          height: { max: 720 },
          frameRate: { max: 24 },
        };
        break;
    }
  
    return constraints;
  }

  const updateStream = async (newPeer, updatedConstraints) => {
    try {
      const updatedStream = await navigator.mediaDevices.getUserMedia(updatedConstraints);
      const senders = currentCall.peerConnection.getSenders();
      senders.forEach((sender) => {
        if (sender.track.kind === 'video') {
          sender.replaceTrack(updatedStream.getVideoTracks()[0]);
        } else if (sender.track.kind === 'audio') {
          sender.replaceTrack(updatedStream.getAudioTracks()[0]);
        }
      });
      // Update local stream with new constraints
      setLocalStream(updatedStream);
    } catch (err) {
      console.error('Error updating stream:', err);
    }
  };
  

  const initiate = async () => {
    try {
      let localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(localStream);  
      const newPeer = new Peer(peerId);
      setPeer(newPeer);  
      let previousNetworkQuality = getNetworkQuality(Infinity); // Initial value  
      newPeer.on('open', () => {
        console.log('Peer ID:', newPeer.id);
      });  
      newPeer.on('call', async (call) => {
        if (!currentCall) {
          call.answer(localStream);
          call.on('stream', async (remoteStream) => {
            await handleCamera(localCameraEnabled);
            if (buttonLabel !== 'Skip') {
              dispatch(setButtonLabel('Skip'));
            }
            setRemoteStream(remoteStream);
            console.log(localCameraEnabled, 'user connected <<<<<<<<<<<<<<<<<<<<<<<<');
          });
          setCurrentCall(call);
  
          // Periodically check network speed and update stream quality
          const interval = setInterval(async () => {
            const networkSpeed = await status(call);
            const currentNetworkQuality = getNetworkQuality(networkSpeed);
            console.log('network speed', networkSpeed, currentNetworkQuality);
            if (currentNetworkQuality !== previousNetworkQuality) {
              const updatedConstraints = getUpdatedConstraints(currentNetworkQuality);
              console.log('Updated constraints:', updatedConstraints);
              updateStream(newPeer, updatedConstraints);
  
              // Update previous network quality
              previousNetworkQuality = currentNetworkQuality;
            }
          }, 5000); // Adjust every 5 seconds
  
          call.on('close', () => {
            setRemoteStream(null);
            dispatch(setTimer(true));
            dispatch(setDisableButton(true));
            dispatch(setMessages([]));
            dispatch(setUserToCall(''));
            dispatch(setCallState('CALL_AVAILABLE'));
            console.log('Call ended >>>>>>>>>>>>>>.');
            setCurrentCall(null);
            clearInterval(interval);
          });
        } else {
          call.close();
        }
      });
  
      newPeer.on('error', (error) => {
        console.error('PeerJS error:', error);
      });
  
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };
  
  

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        dispatch(setDisableButton(false))
        dispatch(setButtonLabel('Skip'))
      }, 5000)
    }
  }, [timer])

  // useEffect(() => {
  //   if (botTimer) {
  //     setTimeout(() => {
  //       dispatch(setBotTimer(false))
  //       setLocalTime(true)
  //     }, 20000)
  //   }
  // }, [botTimer])

  useEffect(() => {
    if (localTime) {
      dispatch(setBotTimer(false))
      setLocalTime(false)
      if (callState !== 'CALL_CONNECTED') {
        dispatch(setChatBot('chatBot'))
        dispatch(setCallState('CALL_CONNECTED'))
        updateUser()
        sendBotMessage([], "", setMessage)
      }
    }
  }, [localTime])

  useEffect(() => {
    connectWithWebSocket()
  }, [])
  useEffect(() => {
    if (socketId) {
      initiate()
    }
  }, [socketId])

  useEffect(() => {
    if (remoteStream) {
      remoteStream.getVideoTracks()[0].enabled = enableDisableRemoteCam
      dispatch(setCallState('CALL_CONNECTED'))
    }
  }, [remoteStream])

  useEffect(() => {
    if (remoteStream) {
      remoteStream.getVideoTracks()[0].enabled = enableDisableRemoteCam
    }
  }, [enableDisableRemoteCam])

  useEffect(() => {
    if (remoteStream) {
      remoteStream.getAudioTracks()[0].enabled = enableDisableRemoteMic
    }
  }, [enableDisableRemoteMic])

  useEffect(() => {
    if (userToCall && triggerCall) {
      startCall(peer, localStream, userToCall, setRemoteStream, setCurrentCall)
      dispatch(setTriggerCall(false))
    }
  }, [userToCall, triggerCall])

  useEffect(() => {
    if (localStream) {
      Swal.fire({
        title: "Want to enable the camera?",
        text: "Enabling camera will better help you to communicate with strangers!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, enable it!'
      }).then(async (res) => {
        if (res && res.isDenied == false) {
          let enableCam = true
          if (res.dismiss == 'cancel') {
            enableCam = false
          }
          await registerNewUser(enableCam);
          localStream.getVideoTracks()[0].enabled = enableCam;
          dispatch(setLocalCameraEnabled(enableCam))
        }
      })
    }

  }, [localStream])
  return (
    <div className="video-chat-bg-container">
      {/* <button className="skip-button" onClick={() => status(currentCall)}>status</button> */}
      <EarlybardHeader />
      <EarlyBoardAccessModal />
      <SideBarNew />
      <div className="video-right-container">
        <div className='logo-sm-lg-container'>
          <LogoSvg />
        </div>
        <HeaderNew currentCall={currentCall} />
        <div className="sm-lg-icons-container">
          <div className="video-chat-new-container">
            <VideoCallInterFace localStream={localStream} remoteStream={remoteStream} />
            <ChatInterfaceNew remoteStream={remoteStream} />
          </div>
          <div>
            <div className="active-sm-lg-container">
              <ActiveUsers />
            </div>
            <div className="call-icons-container-sm-lg">
              <CallIcons localStream={localStream} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;