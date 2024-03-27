import React from "react";

import "./index.css";
import { useDispatch } from "react-redux";
import { setPricingAndPlans } from "../../Context/features/modalSlice";

const VibeZonePlans = () => {
  const dispatch = useDispatch()
  const handleClick=()=>{
    dispatch(setPricingAndPlans())
  }
  return (
    <div className="vibezone-plans-bg-container">
      <span className="VibeZone-Plans">
        VibeZone
        <span className="text-style-1">Plans</span>
      </span>

      <span className="VibeZone-Free mt-vibe">VibeZone Free</span>
      <span className="VibeZone-Free">VibeZone Pulse</span>
      <span className="VibeZone-Free">VibeZone Spark</span>
      <span className="VibeZone-Free">VibeZone Spotlight</span>

      <div className="Rectangle-44" onClick={handleClick}>
        <span className="Upgrade-Now">Upgrade Now</span>
      </div>
    </div>
  );
};

export default VibeZonePlans;
