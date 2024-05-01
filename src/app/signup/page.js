import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDetails } from "../../redux/features/loginSlice";
import "./page.css";
import { useNavigate } from "react-router-dom";
import { postApi} from "../../response/api"
import {Loader} from '../../components/commonComponents/commonComponents'
import { connectWithWebSocket } from "../test/utils/wssConnection/wssConnection";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegex = /^[6-9]\d{9}$/


const Page = () => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useNavigate();
  useEffect(() => {
    connectWithWebSocket()
  }, [])
  const handleGetOtp = async () => {
    setIsLoading(true)
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
      alert("Invalid Email or Phone Number")
      return
    }    
    const res = await postApi('/login', obj)
    if(res){      
      dispatch(setLoginDetails(res));
      router("/verify-otp");  
    } 
    setIsLoading(false)   
  };
  const handleEmailOrPhoneNumber = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="Sign-Up">
      { isLoading ? <Loader /> : ""}
        <div className="login-form">
          <h1 className="Login-or-sign-up">
            Login
            <span className="text-style-1"> or </span>
            sign up
          </h1>
          <p className="Enter-your-number">Enter your number</p>
          <form>
            <input
              type="tel"
              className="number-box"
              value={userInput}
              onChange={handleEmailOrPhoneNumber}
              placeholder="Enter your 10 digit number or email"
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
            <button style={{cursor: "pointer"}} type="button" onClick={handleGetOtp} className="button-otp">
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
