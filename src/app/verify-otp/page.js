"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "../../components/otpInput/otpInput";
import "./page.css";
import { useRouter } from "next/navigation";
import { setLoginDetails, setVerifyOtp } from "../../Context/features/loginSlice";
import { postApi} from "../../response/api"

const Page = (props) => {
  console.log("props", props);
  // const [userInput, setUserInput] = useState("");
  const {email, Contact, CountryCode} = useSelector(state => state.loginSlice.loginDetails);
  const dispatch = useDispatch();
  const router = useRouter();
  const [timer, setTimer] = useState(30);
  const [disableResend, setDisableResend] = useState(false);
  const [otp, setOtp] = useState("");
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const phoneRegex = /^[6-9]\d{9}$/

  useEffect(() => {
    let interval;
    setInterval(30)
    if (timer > 0 && disableResend) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setDisableResend(false);
    }

    return () => clearInterval(interval);
  }, [timer, disableResend]);

  const userSelector = useSelector(state => state.loginSlice)
  const {loginDetails} = userSelector
  console.log(loginDetails)
  const userInput = loginDetails.Contact ?loginDetails.Contact : loginDetails.email

  const handleResendOtp = async () => {
    let obj = {Contact: userInput}
    let isErr = true
    

    if(emailRegex.test(userInput)){
      obj = {email: userInput, CountryCode: "+91"}
      isErr = false 
    } else if(phoneRegex.test(userInput)){
      obj = {Contact: userInput, CountryCode: "+91"}
      isErr = false
    }
    if(isErr){
      alert("Invalid OTP")
      return
    }    
    const res = await postApi('/resend-otp', obj)
    if(res){      
      dispatch(setLoginDetails(res));
      router.push("/verify-otp");  
    }    
  };

  return (
    <>
      <Navbar />
      <div className="verifyOtp">
        <div className="Otp-verify-container">
          <h1 className="otp-heading">OTP Verification</h1>
          <p className="verification-text">
            Enter We have sent Verification code to
            <br />
            {CountryCode && CountryCode+" "} {email && email || Contact && Contact}
            <span>
              <a href="signup" className="Edit">
                {" "}
                Edit
              </a>
            </span>
          </p>
          <OtpInput getOtp={setOtp} />
          <button onClick={async () => {
            let userCred = {Contact}
            if(email){
              userCred = {email}
            }
            userCred.otp = otp.join("")
            const res = await postApi('/verify-otp', userCred)
            if(res.status !== 400){
              localStorage.setItem("userData", JSON.stringify(res)); 
              dispatch(setVerifyOtp(true))
              router.push("/chat");
            } else {
              alert("Invalid OTP")
            }            
          }} className="verify-button">Verify</button>
          <p
            className="resend-text"
            onClick={handleResendOtp}
            style={{ cursor: disableResend ? "not-allowed" : "pointer" }}
          >
            Resend<span className="text-style-1"> OTP </span>in {timer}{" "}
            {timer === 1 ? "second" : "sec"}
          </p>

          <span className="Have-trouble">
            Have trouble logging in?
            <span>
              <a href="get_help" className="text-style-2">
                {" "}
                Get help
              </a>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Page;
