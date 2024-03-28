"use client"
import Navbar from "../../components/Navbar/navbar";
import React from "react";

import "./page.css";
const page = () => {
  return (
    <>
      <Navbar />
      <div className="success-page">
        <div className="success-container">
          <span className="heading">Congratulations!</span>
          <span className="verification-success">Verification Successful</span>
          <div>
            <span class="Logging-you-in">Logging you in</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
