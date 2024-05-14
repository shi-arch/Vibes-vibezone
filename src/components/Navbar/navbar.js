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
          <Link to="/home" className="nav-link sm-lg-nav-links">
            <span>Home</span>
          </Link>
          <Link to="/about" className="nav-link sm-lg-nav-links">
            <span>About</span>
          </Link>
          <Link to="/early-access" className="nav-link sm-lg-nav-links">
            <span>Early Access</span>
          </Link>
          <Link to="/pricing" className="nav-link sm-lg-nav-links">
            <span>Pricing</span>
          </Link>
          <Link to="/contact" className="nav-link sm-lg-nav-links">
            <span>Contact</span>
          </Link>
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