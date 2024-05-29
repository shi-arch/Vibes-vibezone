import React, { useEffect, useState } from "react";
import SideBarNew from "../../components/SideBarNew";
import "./videochat.css"
import HeaderNew from '../../components/HeaderNew';
import VideoCallInterFace from '../../components/VideoCallInterFace';
import ChatInterfaceNew from '../../components/ChatInerfaceNew';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setButtonLabel, setCallState, setDisableButton, setLocalCameraEnabled, setMessage, setPeer, setTimer, setTriggerCall, setTriggerEndCall, setSkipTimer } from '../../redux/features/callSlice';
import { connectWithWebSocket, registerNewUser, startCall } from '../utils/wssConnection/wssConnection';
import { LogoSvg } from '../../components/svgComponents';
import CallIcons from '../../components/CallIcons';
import ActiveUsers from '../../components/ActiveUsers';
import EarlyBoardAccessModal from "../../components/Modals/EarlyAccessBardModal";
import EarlybardHeader from "../../components/EarlyBardHeader";
import Peer from "peerjs";
import { setMessages } from "../../redux/features/chatSlice";

const VideoChat = () => {
  const dispatch = useDispatch()
  const [localStream, setLocalStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)
  const [peer, setPeer] = useState(null)
  const [localCameraEnabled, setLocalCameraEnabled] = useState(null)
  const [localMicrophoneEnabled, setLocalMicrophoneEnabled] = useState(null)
  const { userLoggedIn } = useSelector(state => state.chatSlice)
  const { peerId, userToCall, triggerCall, triggerEndCall, timer, disableButton, socketId, skipTimer } = useSelector(state => state.callSlice)
  const initiate = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream)
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
      call.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream)
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
      }, 2000)
    }
  }, [timer])
  
  useEffect(() => {
    if (skipTimer) {
      setTimeout(() => {
        dispatch(setSkipTimer(false))
        dispatch(setDisableButton(false))
      }, 5000)
    }
  }, [skipTimer])

  useEffect(() => {
    if (remoteStream) {
      dispatch(setCallState('CALL_CONNECTED'))
      dispatch(setButtonLabel('Skip'))
    }
  }, [remoteStream])

  useEffect(() => {
    connectWithWebSocket()
  }, [])
  useEffect(() => {
    if (socketId) {
      initiate()
    }
  }, [socketId])

  useEffect(() => {
    if (userToCall && triggerCall) {
      startCall(peer, localStream, userToCall, setRemoteStream)
      dispatch(setTriggerCall(false))
    }
    if (triggerEndCall) {
      setRemoteStream(null)
      setTriggerEndCall(false)
      dispatch(setCallState('CALL_AVAILABLE'))
      dispatch(setMessages([]))
    }
  }, [userToCall, triggerCall, triggerEndCall])

  useEffect(() => {
    if (localStream) {
      let enableCam = true
      registerNewUser(enableCam);
      localStream.getVideoTracks()[0].enabled = enableCam;
      setLocalCameraEnabled(enableCam)
      // Swal.fire({
      //   title: "Want to enable the camera?",
      //   text: "Enabling camera will better help you to communicate with strangers!",
      //   type: "warning",
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Yes, enable it!'
      // }).then(async (res) => {
      //   if (res && res.isDenied == false) {
      //     let enableCam = true
      //     if (res.dismiss == 'cancel') {
      //       enableCam = false
      //     }
      //     registerNewUser(enableCam);            
      //     localStream.getVideoTracks()[0].enabled = enableCam;
      //     setLocalCameraEnabled(enableCam)
      //   }
      // })
      // return () => {
      //   if (peer) {
      //     peer.disconnect();
      //     peer.destroy();
      //   }
      //   if (localStream) {
      //     localStream.getTracks().forEach((track) => track.stop());
      //   }
      // };
    }

  }, [localStream])

  useEffect(() => {
    if (!userLoggedIn) {
      window.location.href = window.location.origin
    }
  }, [userLoggedIn])
  return (
    <div className="video-chat-bg-container">
      <EarlybardHeader />
      {/* <h1 style={{marginLeft: "150px"}}>{peerId}</h1> */}
      <EarlyBoardAccessModal />
      <SideBarNew />
      <div className="video-right-container">
        <div className='logo-sm-lg-container'>
          <LogoSvg />
        </div>

        <HeaderNew setRemoteStream={setRemoteStream} />
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
              <CallIcons localStream={localStream} setLocalMicrophoneEnabled={setLocalMicrophoneEnabled} setLocalCameraEnabled={setLocalCameraEnabled} localCameraEnabled={localCameraEnabled} localMicrophoneEnabled={localMicrophoneEnabled} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
