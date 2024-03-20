import React from "react";
import "./index.css";
import { CrossSvg } from "../../svgComponents/svgComponents";
import { setPrivacyAndSecurityModal } from "../../../Context/features/modalSlice";
import { useDispatch } from "react-redux";

const PrivacyPolicyModal = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setPrivacyAndSecurityModal());
  };
  return (
    <div className="privacy-policy-main-container">
      <button className="cross-button" onClick={handleClose}>
        <CrossSvg />
      </button>
      <h1 className="privacy-security">Privacy and Security</h1>

      <div className="policy-context scroll-bar">
        <h1 className="terms">1.Terms</h1>
        <p>
          A bettor is typically considered “SHARP” if they win at a 55% average
          or greater. If you have a winning percentage of 55% or greaterA bettor
          is typically considered “SHARP” if they win at a 55% average or
          greater. If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greate A bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greaterA bettor is
          typically considered “SHARP” if they win at a 55% average or greater.
          If you have a winning percentage of 55% or greate
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
