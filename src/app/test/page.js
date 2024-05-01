import {useEffect} from 'react';
import {connectWithWebSocket} from './utils/wssConnection/wssConnection';
import LoginPage from './LoginPage/LoginPage';
import './index.css';

const Test = () => {
  useEffect(() => {
    connectWithWebSocket();
  },[]);
  return (
    <LoginPage />
  );
};

export default Test;
