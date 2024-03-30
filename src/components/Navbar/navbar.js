import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="Rectangle-156">
      <div className="VibeZone">
        Vibe<span className="text-style-1">Zone</span>
      </div>
      <div className="LinksContainer">
        <Link to="/home" className="nav-link">
          <span>Home</span>
        </Link>
        <Link to="/about" className="nav-link">
          <span>About</span>
        </Link>
        <Link to="/early-access" className="nav-link">
          <span>Early Access</span>
        </Link>
        <Link to="/pricing" className="nav-link">
          <span>Pricing</span>
        </Link>
        <Link to="/contact" className="nav-link">
          <span>Contact</span>
        </Link>
        <Link to="/signup" className="nav-link">
          <button style={{cursor: "pointer"}} className="sign-up">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;