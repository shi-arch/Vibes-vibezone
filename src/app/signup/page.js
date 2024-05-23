import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginDetails } from "../../redux/features/loginSlice";
import "./page.css";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../response/api"
import { Loader } from '../../components/commonComponents/commonComponents'
import { setLoader } from "../../redux/features/chatSlice";
import { isNumeric, validation } from "../utils/constant";
const Page = () => {
  const [userInput, setUserInput] = useState({ type: "email", val: "" });  
  const [isErr, setError] = useState({type: "email", msg: "", isErr: false});
  const {loader} = useSelector(state => state.chatSlice)
  const dispatch = useDispatch();
  const router = useNavigate();
  const handleGetOtp = async () => {
    dispatch(setLoader(true))
    const error = await validation([userInput.type], { [userInput.type]: userInput.val })    
    if (!error.isErr) {
      const res = await postApi('/login', { [userInput.type]: userInput.val, countryCode: "+91" })
      if (res) {
        dispatch(setLoginDetails(res));
        router("/verify-otp");
      }
    } else {
      setError(error)
    }
  };
  const handleEmailOrPhoneNumber = (event) => {
    const {value} = event.target
    let user = { val: value, type: 'email' }
    if (isNumeric(value)) {
      user.type = 'contact'
    }
    setUserInput(user);
  };

  return (
    <>
      <div className="Sign-Up">
        {loader ? <Loader /> : ""}
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
              //value={userInput?.val}
              onBlur={handleEmailOrPhoneNumber}
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
            <button style={{ cursor: "pointer" }} type="button" onClick={handleGetOtp} className="button-otp">
              Get OTP
            </button>
            <span style={{color: '#D90202'}}>{isErr?.msg}</span>
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
