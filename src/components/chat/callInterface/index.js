import { Mute, Video, EndCall } from "../../svgComponents/index.js";
//import Peer from "simple-peer";
import Peer from 'peerjs';
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
//import dotenv from 'dotenv'
//dotenv.config()

let endpoint = 'http://localhost:8080'
var socket;

const CallInterface = () => {



  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [userPeerId, setUserPeerId] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  


  const selectedUserData = useSelector(state => state.chatSlice.selectedUserData);
  const [isTyping, setIsTyping] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [userSocketId, setUserSocketId] = useState("");
  const [userId, setUserId] = useState(0)
  const [mySocketId, setMySocketId] = useState(null)
  const [socketConnected, setSocketConnected] = useState(null)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState("")
  const [disconnect, setDisconnect] = useState(false)
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);


  const userVideo = useRef();
  const connectionRef = useRef();
  const myVideo = useRef(null);
  const { email, Contact } = useSelector(state => state.loginSlice.loginDetails);


  const call = async (remotePeerId) => {
    debugger
    navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
      const call = peerInstance.current.call(remotePeerId, mediaStream)
      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    });
  }

  useEffect(() => {
    const peer = new Peer();
    peer.on('open', (id) => {
      setPeerId(id)
    });
    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream)
        call.on('stream', function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    })

    peerInstance.current = peer;


    socket = io(endpoint);
    setUserId(email || Contact)
    localStorage.setItem("userId", email || Contact)
    socket.emit("setup", email || Contact);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.on("mySocketId", (id) => {
      setMySocketId(id);
      localStorage.setItem('socketId', id)
    });
    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setName(data.name)
      setCaller(data.from);
      setCallerSignal(data.signal);
    });


    socket.on("getUserSocketId", (myUserId) => {
      socket.emit('sendPeerId', {peerId: peerId, userId: myUserId})
    })

    socket.on("getPeerId", async (id) => {
      debugger
      setUserPeerId(id)
      await call(id)
    })
    
  }, [])

  useEffect(() => {
    if (videoCall) {
      debugger
      socket.emit("initVideoCall", {myUserId: userId, contactUserId: selectedUserData.Contact});
    }
  }, [videoCall]);


  useEffect(() => {
    if (disconnect) {
      socket.emit("disconnect", userId)
    }
  }, [disconnect])

  const callUser = async (id) => {
    console.log(mySocketId)
    const peer = new Peer({ initiator: true, trickle: false, stream: stream})
    peer.on("signal", (data) => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: mySocketId, name: "Shivram" })
    })
    //
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream
      userVideo.current.play();
    })
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
    connectionRef.current = peer
  }

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({ initiator: false, trickle: false, stream: stream })
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller })
    })
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream
    })
    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  return (
    <div className="call-container">
      <div className="images-con">
        {
          videoCall ? <video
            ref={currentUserVideoRef}
            style={{ width: '100%', height: 'auto' }}
            autoPlay
            playsInline
            muted
          /> : <img
            src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
            className="image"
            alt="person1"
          />
        }
        {
          callAccepted ? <video
            ref={remoteVideoRef}
            style={{ width: '100%', height: 'auto' }}
            autoPlay
            playsInline
            muted
          /> : <img
            src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222352/Rectangle_29_zq40pr.png"
            className="image"
            alt="person2"
          />
        }

      </div>
      <div className="call-controllers">
        <div className="calls">
          <div>
            <Mute />
          </div>
          <div onClick={() => setVideoCall(!videoCall)}>
            <Video />
          </div>
          <div onClick={() => setDisconnect(true)}>
            <EndCall />
          </div>

        </div>
      </div>
      {receivingCall && !callAccepted ?
        <div className="caller">
          <h4>{name} is calling...</h4><button type="button" onClick={answerCall} className="accept">Answer</button>          
        </div>
        : null}
    </div>
  )

};

export default CallInterface;
