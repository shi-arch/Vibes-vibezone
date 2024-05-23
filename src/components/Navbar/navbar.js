import React from "react";
import { Link } from "react-router-dom";
import Hamburger from "../../assets/images/Hamburger.svg"

import "./navbar.css";
import { LogoSvg } from "../svgComponents";

const Navbar = () => {
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
          <div href="#early-access" className="nav-link sm-lg-nav-links">
            <span>Early Access</span>
          </div>
          <div href="#pricing" className="nav-link sm-lg-nav-links">
            <span>Pricing</span>
          </div>
          <div href="#contact" className="nav-link sm-lg-nav-links">
            <span>Contact</span>
          </div>
          <Link to="/signup" className="nav-link">
            <button style={{ cursor: "pointer" }} className="sign-up">
              Sign Up
            </button>
          </Link>
        </div>
        <button className="hamburger-button"> 
          <img src={Hamburger} alt="Hamburger-icon" className="hamburger-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;