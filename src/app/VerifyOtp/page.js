"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import OtpInput from "../../components/otpInput/otpInput";
import "./page.css";

const Page = (props) => {
  console.log("props", props);

  const [timer, setTimer] = useState(30);
  const [disableResend, setDisableResend] = useState(false);

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
      <Navbar />
      <div className="verifyOtp">
        <div className="Otp-verify-container">
          <h1 className="otp-heading">OTP Verification</h1>
          <p className="verification-text">
            Enter We have sent Verification code to
            <br />
            +9999999999
            <span>
              <a href="signup" className="Edit">
                {" "}
                Edit
              </a>
            </span>
          </p>
          <OtpInput />
          <button className="verify-button">Verify</button>
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
