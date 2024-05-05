import { Mute, Video, EndCall, Unmute, VideoOff } from "../../svgComponents/index.js";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import { hangUp, switchForScreenSharingStream } from "../../../app/test/utils/webRTC/webRTCHandler.js";
import { setLocalCameraEnabled, setLocalMicrophoneEnabled, setHangUp } from "../../../redux/features/callSlice.js";
const socket = io.connect(process.env.REACT_APP_BASEURL);
import { CreatePeerConnection, callToOtherUser, getLocalStream } from "../../../app/test/utils/webRTC/webRTCHandler.js";
let containerCss = "call-container";

const CallInterface = () => {
	const dispatch = useDispatch()
	const [mute, setMute] = useState(false)
	const [camera, setCamera] = useState(true)
	const myVideo = useRef()
	const userVideo = useRef()
	const { activeUsers } = useSelector(state => state.dashboardSlice)
	const {css} = useSelector(state => state.modalSlice);
	const { localStream, callState, remoteStream, localCameraEnabled, localMicrophoneEnabled, hangUps } = useSelector((state) => state.callSlice);

	useEffect(() => {
		if (localStream) {
			const localVideo = myVideo.current;
			localVideo.srcObject = localStream;
			localVideo.onloadedmetadata = () => {
				localVideo.play();
				dispatch(setHangUp(false))
			};
		}
	}, [localStream]);

	useEffect(() => {
		if (remoteStream) {
			const remoteVideo = userVideo.current;
			remoteVideo.srcObject = remoteStream;
			remoteVideo.onloadedmetadata = () => {
				remoteVideo.play();
				dispatch(setHangUp(false))
			};
		}
	}, [remoteStream]);

	const handleMicButtonPressed = () => {
		if (callState == `CALL_IN_PROGRESS`) {
			const micEnabled = localMicrophoneEnabled;
			localStream.getAudioTracks()[0].enabled = !micEnabled;
			dispatch(setLocalMicrophoneEnabled(!micEnabled))
			setMute(!mute)
		}
	};

	const handleCameraButtonPressed = () => {
		if (callState == `CALL_IN_PROGRESS`) {
			const cameraEnabled = localCameraEnabled;
			localStream.getVideoTracks()[0].enabled = !cameraEnabled;
			dispatch(setLocalCameraEnabled(!cameraEnabled))
			setCamera(!camera)
		}
	};

	const handleScreenSharingButtonPressed = () => {
		switchForScreenSharingStream();
	};

	const handleHangUpButtonPressed = async () => {
		if (callState == `CALL_IN_PROGRESS`) {
			await hangUp();
			dispatch(setHangUp(true))
			const activeUserData = _.cloneDeep(activeUsers)
			if (activeUserData.length) {
				activeUserData.filter(user => user.isActive === true)
				//dispatch(setStartCall(true))
				callToOtherUser(activeUserData[Math.floor(Math.random() * (activeUserData.length - 1))])
				await getLocalStream()
				await CreatePeerConnection();
			} else {
				Swal.fire({
					title: "sorry...",
					text: "No active users found!",
					icon: "error"
				});
			}
		}
	};

	return (
		<div className={css ? "" : "call-container"}>
			<div className="images-con">
				{
					<video
						id="myVideo"
						style={!hangUps && localStream ? { width: '100%', height: 'auto' } : { width: 0, height: 0, visibility: 'hidden' }}
						ref={myVideo}
						autoPlay
						playsInline
						muted
					/>
				}
				{hangUps && <img
					src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
					className="image"
					alt="person1"
				/>}
				{
					remoteStream && callState === 'CALL_IN_PROGRESS' && <video
						id="userVideo"
						style={{ width: '100%', height: 'auto' }}
						ref={userVideo}
						autoPlay
						playsInline
					//muted
					/>
				}
				{hangUps ? <img
					src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222352/Rectangle_29_zq40pr.png"
					className="image"
					alt="person2"
				/> : ""}

			</div>
			<div className={css ? "call-controllers-mobile" : "call-controllers"}>
				<div className="calls">
					<div onClick={handleMicButtonPressed}>
						{mute ? <Mute disabled={true} /> : <Unmute />}
					</div>
					<div onClick={handleCameraButtonPressed}>
						{camera ? <Video /> : <VideoOff />}
					</div>
					<div onClick={handleHangUpButtonPressed}>
						<EndCall />
					</div>

				</div>
			</div>
		</div>
	)

};

export default CallInterface;
