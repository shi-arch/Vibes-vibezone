import { Mute, Video, EndCall } from "../../svgComponents/index.js";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import io from "socket.io-client";
import { hangUp, switchForScreenSharingStream } from "../../../app/test/utils/webRTC/webRTCHandler.js";
import { setLocalCameraEnabled, setLocalMicrophoneEnabled, setHangUp } from "../../../redux/features/callSlice.js";
const socket = io.connect(process.env.REACT_APP_BASEURL);


const CallInterface = () => {
	const dispatch = useDispatch()
	const myVideo = useRef()
	const userVideo = useRef()
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
		const micEnabled = localMicrophoneEnabled;
		localStream.getAudioTracks()[0].enabled = !micEnabled;
		dispatch(setLocalMicrophoneEnabled(!micEnabled))		
	  };
	
	  const handleCameraButtonPressed = () => {
		const cameraEnabled = localCameraEnabled;
		localStream.getVideoTracks()[0].enabled = !cameraEnabled;
		dispatch(setLocalCameraEnabled(!cameraEnabled))
	  };
	
	  const handleScreenSharingButtonPressed = () => {
		switchForScreenSharingStream();
	  };
	
	  const handleHangUpButtonPressed = () => {
		hangUp();
		dispatch(setHangUp(true))
	  };
		
	return (
		<div className="call-container">
			<div className="images-con">
				{
					<video
					id="myVideo"
					style={!hangUps && localStream ?  {width: '100%', height: 'auto'} : {width: 0, height: 0, visibility: 'hidden'}}
					ref={myVideo}
					autoPlay
					playsInline
					//muted
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
					style={{width: '100%', height: 'auto'}}
					ref={userVideo}
					autoPlay
					playsInline
					muted
				/>
				}	
				{hangUps ? <img
					src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222352/Rectangle_29_zq40pr.png"
					className="image"
					alt="person2"
				/> : ""}

			</div>
			<div className="call-controllers">
				<div className="calls">
					<div onClick={handleMicButtonPressed}>
						<Mute />
					</div>
					<div onClick={handleCameraButtonPressed}>
						<Video />
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
