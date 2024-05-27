import React, { useEffect } from 'react'
import RightSideContainer from "./rightSideContainer"
import "./index.css";
import SideBar from "../SideBar/sideBar";
import { useSelector, useDispatch } from "react-redux";
import PricingPlansModal from "../../components/Modals/PricingPlansModal"
import { setLoginDetails, setToken } from "../../redux/features/loginSlice";

const Chat = () => {
  const modalSelector = useSelector(state => state.modalSlice)
  const {pricingAndPlans} = modalSelector

  const dispatch = useDispatch();
  useEffect(() => {
  let userData = localStorage.getItem("userData")
  if(userData){
    const parsedData = JSON.parse(userData)
    dispatch(setLoginDetails(parsedData.user));
    dispatch(setToken(parsedData.token));
  }  
  }, []);

  return (
    <div className="main-container">
      <SideBar />
      {pricingAndPlans ? (
        <div className="pricing-bg">
          <PricingPlansModal />
        </div>
      ) : (
        <RightSideContainer />
      )}
    </div>
  );
};

export default Chat;
