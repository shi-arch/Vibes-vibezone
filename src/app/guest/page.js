import React, { useEffect, useRef, useState } from "react"
import Peer from "simple-peer"
import io from "socket.io-client"


const socket = io.connect(process.env.REACT_APP_BASEURL)
function Page() {
	const [me, setMe] = useState("")
	const [stream, setStream] = useState()
	const [receivingCall, setReceivingCall] = useState(false)
	const [caller, setCaller] = useState("")
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [idToCall, setIdToCall] = useState("")
	const [callEnded, setCallEnded] = useState(false)
	const [name, setName] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()

	useEffect(() => {
		socket.on("me", (id) => {
			setMe(id)
			console.log('socket id', id)
		})

		socket.on("callUser", (data) => {
			console.log('call user data', data)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
			setReceivingCall(true)
		})

		socket.on("closeCall", () => {
			console.log('call ended')
			// setCallEnded(true)

			setCallAccepted(false)
			setReceivingCall(false)
			setCaller("")
			// reload window
			// window.location.reload();
		})
	}, [])

	useEffect(() => {
		if (receivingCall && !callAccepted) {
			answerCall();
		}
	}, [receivingCall, callAccepted]);





	const callUser = (id) => {
		navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
			debugger
			setStream(stream)
			myVideo.current.srcObject = stream
			const peer = new Peer({
				initiator: true,
				trickle: false,
				stream: stream
			})
			peer.on("signal", (data) => {
				socket.emit("callUser", {
					userToCall: id,
					signalData: data,
					from: me,
					name: name
				})
			})
			peer.on("stream", (stream) => {
				userVideo.current.srcObject = stream
			})
			socket.on("callAccepted", (data) => {
				setCallAccepted(true)
				console.log('data from call accepted', data)
				setCaller(data.from)
				peer.signal(data.signal)
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
			socket.emit("answerCall", { signal: data, to: caller, from: me })
		})

		peer.on("stream", (stream) => {
			try {
				userVideo.current.srcObject = stream
			} catch (error) {
				console.log(error)
			}

		})

		try {
			peer.signal(callerSignal)
			connectionRef.current = peer
		} catch (error) {
			console.log(error)
		}

	}

	const leaveCall = () => {
		console.log('')
		setCallEnded(false)
		setCaller(null)
		setCallAccepted(false)
		setReceivingCall(false)
		socket.emit("endCall", { to: caller })
		connectionRef.current.destroy()
		// window.location.reload();
	}



	return (
		<>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Vibe Zone</h1>
			<div className="call-container">
				<div style={{ display: "flex", justifyContent: "right", marginRight: "10px", alignItems: "center" }}  >
					<button variant="contained" onClick={callAccepted && !callEnded ? leaveCall : () => callUser(idToCall)}>
						ESC
					</button>
				</div>
			</div>
			<h1>{caller} receivingCall {receivingCall ? 'true' : 'false'}, callAccepted: {callAccepted ? 'true' : 'false'}</h1>
			<div className="container">
				<div className="video-container">
					<div className="video">
						{stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
					</div>
					<div className="video" style={{ marginLeft: "50px" }}>
						{callAccepted && !callEnded ?
							<video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> : ""}
					</div>
				</div>

				<div>
					{receivingCall && !callAccepted ? (
						<div className="caller">
							<h1 >{name} is calling...</h1>
							<Button variant="contained" color="primary" onClick={answerCall}>
								Answer
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</>
	)
}

export default Page
