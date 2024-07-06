import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import "./EarlyAccess.css";
import { Loader, getEarlyAccess } from "../commonComponents/commonComponents";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import axios from "axios";
import { getApi } from "../../response/api";
import { setIsLoading, setKeyWords, setUserName } from "../../redux/features/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPeerId, setIpAddress } from "../../redux/features/callSlice";
import { setEarlyAccessBardModal } from "../../redux/features/modalSlice";
import EarlyBardAccessModal from "../Modals/EarlyAccessBardModal";

const EarlyAccess = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  let {isLoading, userName} = useSelector(state => state.chatSlice)
  let {peerId} = useSelector(state => state.callSlice)
  const [totalUserCount, settotalUserCount] = useState(0)
  useEffect(() =>{
    (async () => {
      dispatch(setIsLoading(true))
      const response = await axios.get('https://api.ipify.org?format=json')
      if(response){
        const ip = response.data.ip
        dispatch(setIpAddress(ip))
        const {data} = await getApi('/getUserPeersData?ipAddress='+ip)
        if(data){
          dispatch(setUserName(data.userName));
          dispatch(setPeerId(data.peerId))
          dispatch(setKeyWords(data.keyWords || ''))
        }        
      }
      const {result} = await getApi('/getAllRegisteredUsers')
      settotalUserCount(result.length)
      dispatch(setIsLoading(false))
    })()    
  }, [])
  const openPopup = async () => {
    Swal.fire({
      title: "Please give your name ... !",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      confirmButtonText: "Great",
      showLoaderOnConfirm: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (result.value) {
          await getEarlyAccess(result.value)
          router("/video-chat");
        } else {
          Swal.showValidationMessage(`
          Request failed: Please enter the name
        `);
        }
      }
    });
  }
  return (
    <Box
      id="home"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <EarlyBardAccessModal totalUserCount={totalUserCount} />
      {
        isLoading ? <Loader style={{position: 'absolute', right: '49%'}} /> : ""
      }      
      <Box
        sx={{
          display: "flex",
          fontFamily: "Poppins, Arial",
          marginTop: "30px",
          marginBottom: "20px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{ width: "50%", padding: "50px" }}
          className="sm-lg-early-access-container"
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "30px", marginBottom: "20px" }}
          >
            The <span className="hash-one">#1 </span>Live Video Chat with Random
            Stranger
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "20px",
              color: "rgba(43, 43, 43, 0.6)",
              fontSize: "14px",
            }}
          >
            The leading social platform that brings the world to your screen.
            Connect with new friends from every corner of the globe in live,
            random video chats.
          </Typography>
          <Button
            onClick={async () => {
              dispatch(setEarlyAccessBardModal());
              // if(!userName || !peerId){
              //   await openPopup()
              // } else {
              //   router("/video-chat");
              // }

            }}
            variant="contained"
            sx={{
              backgroundColor: "#8f47ff",
              color: "#ffffff",
              border: "1px solid",
              "&:hover": { backgroundColor: "#8f47ff", color: "#ffffff" },
              padding: "10px",
              fontSize: "12px",
              textTransform: "none",
              width: "150px",
              borderRadius: "5px",
            }}
          >
            Get Early Access
          </Button>
        </Box>
        <Box
          sx={{
            padding: "50px",
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/dhczdaczx/image/upload/v1710906981/vn9fkut0mrqbvmiqtrrl.png"
            alt="video call"
            sx={{
              width: "80%",
              margin: "0 auto",
              objectFit: "contain",
              height: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EarlyAccess;
