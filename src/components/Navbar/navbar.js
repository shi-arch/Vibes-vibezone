import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "../../assets/images/Hamburger.svg"

import "./navbar.css";
import { LogoSvg } from "../svgComponents";
import { getEarlyAccess } from "../commonComponents/commonComponents";

const Navbar = () => {
  const router = useNavigate();
  return (
    <nav className="Rectangle-156">
      <div className="VibeZone">
        <LogoSvg />
      </div>
      <div className="cont">
        <div className="LinksContainer">
          <a href="#home" className="nav-link sm-lg-nav-links">
            <span>Home</span>
          </a>
          <a href="#about" className="nav-link sm-lg-nav-links">
            <span>About</span>
          </a>
          <a onClick={async () => {
            await getEarlyAccess()
            router("/video-chat");
          }} href="#" className="nav-link sm-lg-nav-links">
            <span>Early Access</span>
          </a>
          <a href="https://vibezone.org/contact-us/" target="_blank" className="nav-link sm-lg-nav-links">
            <span>Contact</span>
          </a>
          {/* <Link to="/signup" className="nav-link">
            <button style={{ cursor: "pointer" }} className="sign-up">
              Sign Up
            </button>
          </Link> */}
        </div>
        <button className="hamburger-button"> 
          <img src={Hamburger} alt="Hamburger-icon" className="hamburger-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;