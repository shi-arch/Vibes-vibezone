import { Helmet } from "react-helmet";
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
// import { Button } from "@mui/material";
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

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VibeZone",
    "url": "https://vibezone.in",
    "logo": "https://vibezone-assets.s3.ap-south-1.amazonaws.com/vibezone_logo.png",
    "sameAs": [
      "https://www.facebook.com/vibezone",
      "https://www.instagram.com/vibezone",
      "https://www.linkedin.com/company/vibezone",
      "https://twitter.com/vibezone"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-5555",
      "contactType": "Customer Service"
    }
  };

  const productData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "VibeZone Premium Subscription",
    "image": [
      "https://vibezone-assets.s3.ap-south-1.amazonaws.com/vibezone_logo.png"
    ],
    "description": "Get access to premium features and connect with more people on VibeZone.",
    "sku": "VIP-001",
    "mpn": "VIP-001",
    "brand": {
      "@type": "Brand",
      "name": "VibeZone"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "320"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://vibezone.in/premium",
      "priceCurrency": "USD",
      "price": "19.99",
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "VibeZone"
      }
    }
  };

  const aboutPageData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://vibezone.in/about",
    "name": "About VibeZone",
    "description": "Learn more about VibeZone, the best Omegle alternative to connect with random people online safely and enjoyably."
  };

  const contactPageData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": "https://vibezone.in/contact",
    "name": "Contact VibeZone",
    "description": "Get in touch with VibeZone customer service for any inquiries or support."
  };
  
  
  

  // const status = async () => {
  //   try {
  //     const stats = await currentCall?.peerConnection?.getStats(null);
  //     if (stats) {
  //       stats.forEach(report => {
  //         if (report.type === 'candidate-pair' && report.state === 'succeeded' && report.bytesSent && report.bytesReceived) {
  //           console.log(report);
  //           const bytesSent = report.bytesSent;
  //           const bytesReceived = report.bytesReceived;
  //           const totalBytes = bytesSent + bytesReceived;
            
  //           // Calculate average bitrate in Mbps (assuming duration between last sent/received packets)
  //           const durationInSeconds = (report.lastPacketReceivedTimestamp - report.lastPacketSentTimestamp) / 1000;
  //           const bitrateMbps = (totalBytes / 8) / (durationInSeconds * 1000000); // Convert bytes to bits and divide by seconds
  
  //           console.log(`Estimated Bandwidth: ${bitrateMbps.toFixed(2)} Mbps`);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching stats:', error);
  //   }
  // };
  
  
  
  
  const initiate = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream)
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
    const newPeer = new Peer(peerId, { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }], 'sdpSemantics': 'unified-plan' });
    setPeer(newPeer)
    newPeer.on('open', () => {
      console.log('Peer ID:', newPeer.id);
    });
    newPeer.on('call', async (call) => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });  
      if(!currentCall) {
        call.answer(stream);
        call.on('stream', async (remoteStream) => {
          await handleCamera(localCameraEnabled)
          if (buttonLabel !== 'Skip') {
            dispatch(setButtonLabel('Skip'))
          }
          setRemoteStream(remoteStream)
          console.log(localCameraEnabled, 'user connected')
        });
        setCurrentCall(call)
      } else {
        call.close()
      }
     
      call.on('close', () => {
        setRemoteStream(null)
        dispatch(setTimer(true))
        dispatch(setDisableButton(true))
        dispatch(setMessages([]))
        dispatch(setUserToCall(""))
        dispatch(setCallState('CALL_AVAILABLE'))
        setCurrentCall(null)
        console.log('Call ended >>>>>>>>>>>>>>.');
      });  
    });
    newPeer.on('error', (error) => {
      console.error('PeerJS error:', error);
    });
  }

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        dispatch(setDisableButton(false))
        dispatch(setButtonLabel('Skip'))
      }, 5000)
    }
  }, [timer])

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
      {/* <button className="skip-button" onClick={() => status()}>status</button> */}
      <Helmet>
      <title>VibeZone - Best Omegle Alternative to Talk to Random People</title>
        <meta name="description" content="Discover VibeZone, the leading Omegle alternative! Connect and talk to random people safely and enjoyably." />
        <script type="application/ld+json">
          {JSON.stringify(homepageData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(aboutPageData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(contactPageData)}
        </script>
      </Helmet>
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
