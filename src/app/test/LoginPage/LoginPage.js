import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../utils/resources/logo.png';
import UsernameInput from './components/Usernameinput';
import SubmitButton from './components/SubmitButton';
import { registerNewUser }  from '../utils/wssConnection/wssConnection';
import { setUserName } from "../../../redux/features/dashboardSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const router = useNavigate()
  const dispatch = useDispatch()
  const [username, setUser] = useState('');

  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    dispatch(setUserName(username))
    router("/dashboard") 
  };

  return (
    <div className='login-page_container background_main_color'>
      <div className='login-page_login_box background_secondary_color'>
        <div className='login-page_logo_container'>
          <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
        </div>
        <div className='login-page_title_container'>
          <h2>VIDEO CHAT</h2>
        </div>
        <UsernameInput username={username} setUsername={setUser} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

export default LoginPage
