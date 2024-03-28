import { Mute, Video, EndCall } from "../../svgComponents/index.js";
import Peer from "simple-peer";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import dotenv from 'dotenv'
dotenv.config()

let endpoint = process.env.NEXT_PUBLIC_SERVER_BASEURL
var socket;

const CallInterface = () => {
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


  useEffect(() => {
    socket = io(endpoint);
    setUserId(email || Contact)
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
    socket.on("getUserSocketId", () => {
      setUserSocketId(localStorage.getItem("socketId"));
      callUser(localStorage.getItem("socketId"))
    })
  }, [])

  useEffect(() => {
    if (videoCall) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        myVideo.current.srcObject = stream;
        myVideo.current.play();
        setStream(stream)               
      })
      setTimeout(() => {
        socket.emit("initVideoCall", "9354347660");    
      }, 5000)  
    }
  }, [videoCall]);


  useEffect(() => {
    if (disconnect) {
      socket.emit("disconnect", userId)
    }
  }, [disconnect])

  const callUser = async (id) => {
    console.log(stream)
    debugger
    const peer = new Peer({ initiator: true, trickle: false, stream: stream})
    peer.on("signal", (data) => {
      socket.emit("callUser", { userToCall: id, signalData: data, from: "9354347650", name: "Shivram" })
    })
    //debugger
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
    debugger
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
            ref={myVideo}
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
            ref={userVideo}
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
