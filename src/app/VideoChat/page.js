import React, { useEffect, useState } from "react";
import SideBarNew from "../../components/SideBarNew";
import "./videochat.css"
import HeaderNew from '../../components/HeaderNew';
import VideoCallInterFace from '../../components/VideoCallInterFace';
import ChatInterfaceNew from '../../components/ChatInerfaceNew';
import axios from "axios";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setButtonLabel, setCallState, setDisableButton, setLocalCameraEnabled, setDisplayConnect, setPeer, setTimer, setTriggerCall, setSkipTimer, setUserToCall, setDisable, setPeerId, setBotTimer, setChatBot } from '../../redux/features/callSlice';
import { connectWithWebSocket, createPeerConnection, handleCamera, initiateCall, registerNewUser, sendBotMessage, startCall, updateUser } from '../utils/wssConnection/wssConnection';
import { LogoSvg } from '../../components/svgComponents';
import CallIcons from '../../components/CallIcons';
import ActiveUsers from '../../components/ActiveUsers';
import EarlyBoardAccessModal from "../../components/Modals/EarlyAccessBardModal";
import EarlybardHeader from "../../components/EarlyBardHeader";
import Peer from "peerjs";
import { setMessages, setUserName } from "../../redux/features/chatSlice";
import { getApi, postApi } from "../../response/api";
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

  const initiate = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream)
      createPeerConnection(stream)
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
    const newPeer = new Peer(peerId);
    setPeer(newPeer)
    newPeer.on('open', () => {
      console.log('Peer ID:', newPeer.id);
    });
    newPeer.on('call', async (call) => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
      call.on('close', () => {
        setRemoteStream(null)
        dispatch(setTimer(true))
        dispatch(setDisableButton(true))
        dispatch(setMessages([]))
        dispatch(setUserToCall(""))
        dispatch(setCallState('CALL_AVAILABLE'))
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
        dispatch(setTimer(false))
        dispatch(setDisableButton(false))
        dispatch(setButtonLabel('Skip'))
      }, 5000)
    }
  }, [timer])

  useEffect(() => {
    if (botTimer) {
      setTimeout(() => {
        dispatch(setBotTimer(false))
        setLocalTime(true)
      }, 20000)
    }
  }, [botTimer])

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
      initiateCall(userToCall)
      //startCall(peer, localStream, userToCall, setRemoteStream, setCurrentCall)
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
