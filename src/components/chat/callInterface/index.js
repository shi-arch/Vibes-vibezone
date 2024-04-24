import { Mute, Video, EndCall } from "../../svgComponents/index.js";
import Peer from "simple-peer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { setActiveUserData, setMessages, setMySocketId, setUserName } from "../../../redux/features/chatSlice.js";
import { getApi, postApi } from "../../../response/api.js";
import { setAllUsers, setUserSelectedTopics } from "../../../redux/features/loginSlice.js";
const socket = io.connect(process.env.REACT_APP_BASEURL);


const CallInterface = () => {
	const dispatch = useDispatch()
	const { selectedUserData, messagesArr, activeUserData } = useSelector(state => state.chatSlice);
	const { Contact, _id, Name } = useSelector(state => state.loginSlice.loginDetails)
	const { allConnections, userDetails, userSelectedTopics, token } = useSelector(state => state.loginSlice)
	const [disconnect, setDisconnect] = useState(false)
	const [stream, setStream] = useState()
	const [receivingCall, setReceivingCall] = useState(false)
	const [caller, setCaller] = useState("")
	const [userId, setUserId] = useState("")
	const [updateMessage, setUpdateMessage] = useState(false)
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [idToCall, setIdToCall] = useState("")
	const [callEnded, setCallEnded] = useState(false)
	const [name, setName] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()
	const { data } = useSelector((state) => state.loginSlice.allPreferences);

	useEffect(() => {
		if (updateMessage) {
			setUpdateMessage(false)
			const cloneArr = [...messagesArr]
			cloneArr[cloneArr.length] = updateMessage
			dispatch(setMessages(cloneArr))
		}
	}, [updateMessage])

	useEffect(() => {
		if (allConnections) {
			postApi('/getAllUsers', allConnections.map(ele => ele.Contact), token).then(res => {
				if (res) {
					dispatch(setAllUsers(res.data))
				}
			})
		}
	}, [allConnections])

	useEffect(() => {
		getActiverUserData()
	}, [])

	const getActiverUserData = async () => {
		getApi('/activeUsers', token).then(res => {
			if (res) {
				dispatch(setActiveUserData(res.data))
			}
		})
	}

	useEffect(() => {
		socket.on("typing", (name) => {
			dispatch(setUserName(name))
		});
		socket.on("stop typing", () => {
			dispatch(setUserName(""))
		});
		socket.on("isUserActive", () => {
			getActiverUserData()
		});
		socket.on("sendMessage", (msg) => {
			setUpdateMessage(msg)
		});
		socket.on("getActiveUsers", (id) => {
			getApi('/activeUsers?userSocketId=' + id, token).then(async res => {
				if (res) {
					await getActiverUserData()
				}
			})
		});
		socket.on('userDisconnected', (id) => {
			setDisconnect(true)
		})
		socket.emit("setup", _id);
		socket.on("me", (id) => {
			dispatch(setMySocketId(id))
		})
		socket.on('endCall', () => {
			setStream(null)
			//setCallAccepted(false)
		})
		socket.on("callUser", (data) => {
			const { topics, from, signal, name, userId } = data
			let topicMatch = false
			// for(let i = 0; i < topics.length; i++){
			// 	if(userSelectedTopics.includes(topics[i])){
			// 		topicMatch = true
			// 		break
			// 	}
			// }
			// if(topicMatch){
			// 	setCaller(from)
			// 	setName(name)
			// 	setCallerSignal(signal)
			// 	setReceivingCall(true)
			// }

			setCaller(from)
			setUserId(userId)
			setName(name)
			setCallerSignal(signal)
			setReceivingCall(true)
		})

		socket.on("closeCall", () => {
			console.log('call ended')
			setCallAccepted(false)
			setReceivingCall(false)
			setCaller("")
		})
	}, [])

	useEffect(() => {
		if (receivingCall && !callAccepted) {
			answerCall();
		}
	}, [receivingCall, callAccepted]);





	const callUser = () => {
		navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
			const peer = new Peer({
				initiator: true,
				trickle: false,
				stream: stream
			})
			peer.on("signal", (data) => {
				socket.emit("callUser", {
					signalData: data,
					from: socket.id,
					userId: _id,
					name: Name,
					topics: userSelectedTopics,
				})
			})
			peer.on("stream", (stream) => {
				userVideo.current.srcObject = stream
			})
			socket.on("callAccepted", (data) => {
				setCallAccepted(true)
				console.log('data from call accepted', data)
				setCaller(data.from)
				peer.signal(data)
			})
			connectionRef.current = peer
		})
	}

	const answerCall = () => {

		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})

		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})
		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		try {
			setCallEnded(true)
			setCallAccepted(true)
			//connectionRef.current.destroy()
			stream.getTracks().forEach(function (track) {
				track.stop();
				setStream(null)
			});
		} catch (err) {
			console.log(err)
		}
	}



	return (
		<div className="call-container">
			<div className="images-con">
				<video
					style={stream ? { visibility: "visible", width: '100%', height: 'auto' } : { visibility: "hidden", height: 0, width: 0 }}
					ref={myVideo}
					autoPlay
					playsInline
					muted
				/>
				{!stream && <img
					src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
					className="image"
					alt="person1"
				/>}
				<video
					style={callAccepted && stream ? { visibility: "visible", width: '100%', height: 'auto' } : { visibility: "hidden", height: 0, width: 0 }}
					ref={userVideo}
					autoPlay
					playsInline
					muted
				/>
				{!stream ? <img
					src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222352/Rectangle_29_zq40pr.png"
					className="image"
					alt="person2"
				/> : ""}

			</div>
			<div className="call-controllers">
				<div className="calls">
					<div onClick={() => {
						//socket.emit("test", selectedUserData.Contact)
					}}>
						<Mute />
					</div>
					<div onClick={callUser}>
						<Video />
					</div>
					<div onClick={leaveCall}>
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
