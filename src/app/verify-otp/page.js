
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "../../components/otpInput/otpInput";
import { setVerifyOtp, setLoginDetails, setToken } from "../../redux/features/loginSlice";
import { postApi} from "../../response/api"
import "./page.css";
import { registerNewUser } from "../test/utils/wssConnection/wssConnection";
const Page = (props) => {
  console.log("props", props);
  const {email, Contact, CountryCode} = useSelector(state => state.loginSlice.loginDetails);
  const dispatch = useDispatch();
  const router = useNavigate();
  const [timer, setTimer] = useState(30);
  const [disableResend, setDisableResend] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    let interval;
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

  const handleResendOtp = () => {
    setTimer(30);
    setDisableResend(true);
  };

  return (
    <>
      {/* <Navbar /> */}
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
              
              //registerNewUser(res.user.Name || "Guest")
              dispatch(setLoginDetails(res.user));
              dispatch(setToken(res.token));
              dispatch(setVerifyOtp(true))
              router("/chat");
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
