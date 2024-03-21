"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./page.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  const handleGetOtp = () => {
    router.push("/VerifyOtp", { phoneNumber });
  };
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    setShowOtpInput(true);
  };

  return (
    <>
      <Navbar />
      <div className="Sign-Up">
        <div className="login-form">
          <h1 className="Login-or-sign-up">
            Login
            <span className="text-style-1"> or </span>
            sign up
          </h1>
          <p className="Enter-your-number">Enter your number</p>
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="tel"
              className="number-box"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              placeholder="Enter your 10 digit number"
            />
            <p className="privacy-policy">
              By continuing, I agree to the terms
              <span>
                <a href="privacy_policy_url" className="text-style-2">
                  {" "}
                  conditions & privacy policy
                </a>
              </span>
            </p>
            <button type="submit" onClick={handleGetOtp} className="button-otp">
              Get OTP
            </button>
          </form>
          <p>
            Have trouble logging in?
            <span>
              <a href="get_help" className="text-style-2">
                {" "}
                Get help
              </a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
