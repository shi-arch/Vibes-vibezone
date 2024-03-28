import React from "react";
import Link from "next/link";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="Rectangle-156">
      <div className="VibeZone">
        Vibe<span className="text-style-1">Zone</span>
      </div>
      <div className="LinksContainer">
        <Link href="/home" className="nav-link">
          <span>Home</span>
        </Link>
        <Link href="/about" className="nav-link">
          <span>About</span>
        </Link>
        <Link href="/early-access" className="nav-link">
          <span>Early Access</span>
        </Link>
        <Link href="/pricing" className="nav-link">
          <span>Pricing</span>
        </Link>
        <Link href="/contact" className="nav-link">
          <span>Contact</span>
        </Link>
        <Link href="/signup" className="nav-link">
          <button className="sign-up">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;