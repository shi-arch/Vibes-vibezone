import VibeZonePlans from "../VibeZonePlans";
import {
  AtSvg,
  BadgesSvg,
  BillingSvg,
  CallSvg,
  CameraSvg,
  InfoSvg,
  LeftArrowSvg,
  NotificationSvg,
  PenSvg,
  PreferenceSvg,
  PrivacySvg,
} from "../svgComponents/svgComponents";
import sidebarProfile from "../../assets/images/sidebarProfile.svg";

import "./sidebar.css";
import { SideBarSelections } from "../commonComponents/commonComponents";
import {
  setNotificationModal,
  setPreferenceModal,
  setBillingModal,
  setPrivacyAndSecurityModal,
  setBadgesModal,
  setProfileModal,
  setLeftOpen,
  setRightOpen,
  setCss
} from "../../redux/features/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { result } from "../commonComponents/commonComponents";

const SideBar = () => {
  const modalSelector = useSelector(state => state.modalSlice);
  const { profileImage, name, contact, userName, status, email } = useSelector(state => state.loginSlice.loginDetails);
  const { leftOpen } = modalSelector;
  result.onchange = () => {
    if (result.matches) {
      dispatch(setCss(true))
      dispatch(setLeftOpen(false));
      //dispatch(setRightOpen(false));
    } else {
      dispatch(setCss(false))
      dispatch(setLeftOpen(true));
      //dispatch(setRightOpen(true));
    }
  };
  const dispatch = useDispatch();
  const handlePrivacySelection = () => {
    dispatch(setPrivacyAndSecurityModal());
  };
  const handleNotificationSelection = () => {
    dispatch(setNotificationModal());
  };

  const handleSelection = () => {
    console.log("Selection");
  };

  const handleEditSelection = () => {
    console.log("Edit Selection");
    dispatch(setProfileModal());
  };

  const onClickPreferences = () => {
    //updating the preferences modal selection
    dispatch(setPreferenceModal());
  };

  const handleBadgeSelection = () => {
    dispatch(setBadgesModal());
  };

  const onClickLeftOpen = () => {
    dispatch(setLeftOpen(!leftOpen));
  };

  return (
    <>
      <div className={`side-con sidebar-bg-container ${leftOpen ? "" : "closed"}`}>
        <div className="side-bar-top-container">
          <div className="profile-container">
            <div className="sidebar-profile">
              <img className="sidebar-profile" src={profileImage ? profileImage : sidebarProfile} alt="sidebar-profile" />
            </div>
            <div className="img-icon-container">
              <CameraSvg />
            </div>
          </div>
          <h5 className="user-name-head">{name || contact || email}</h5>
          <p className="side-bar-user-prof-text">Name</p>
        </div>

        <div>
          <div className="side-bar-icon-text-container">
            <CallSvg />
            <div>
              <p className="mobile-number-text">+91 {contact ? contact : 1234567890}</p>
              <p className="phone-text">Phone</p>
            </div>
          </div>
          <div className="side-bar-icon-text-container">
            <AtSvg />

            <div>
              <p className="mobile-number-text">{userName ? userName : "guest.user"}</p>
              <p className="phone-text">Username</p>
            </div>
          </div>

          <div className="side-bar-icon-text-container">
            <InfoSvg />
            <div>
              <p className="mobile-number-text">{status ? status : "Guest status"}</p>
              <p className="phone-text">status</p>
            </div>
            <button
              type="button"
              className="edit-button"
              onClick={handleEditSelection}
            >
              <PenSvg />
            </button>
          </div>
        </div>

        <hr className="hr-line" />

        <div>
          <div
            className="side-bar-icon-text-container pointer"
            onClick={onClickPreferences}
          >
            <PreferenceSvg />

            <p className="mobile-number-text">Preferences</p>
          </div>
          <div
            onClick={handleNotificationSelection}
            className="side-bar-icon-text-container pointer"
          >
            <NotificationSvg />

            <p className="mobile-number-text">Notifications</p>
          </div>
          <div
            onClick={handlePrivacySelection}
            className="side-bar-icon-text-container pointer"
          >
            <PrivacySvg />

            <p className="mobile-number-text">Privacy and Security</p>
          </div>
          <div
            onClick={() => dispatch(setBillingModal())}
            className="side-bar-icon-text-container pointer"
          >
            <BillingSvg />
            <p className="mobile-number-text ">Billing</p>
          </div>
          <div
            className="side-bar-icon-text-container pointer "
            onClick={handleBadgeSelection}
          >
            <BadgesSvg />
            <p className="mobile-number-text">Badges</p>
          </div>
        </div>

        <VibeZonePlans />

        <button
          className="close-left-side-bar-button"
          onClick={onClickLeftOpen}
        >
          <LeftArrowSvg />
        </button>
      </div>

      {!leftOpen && (
        <div
          className={`sidebar-bg-container sidebar-bg-container-2 ${leftOpen ? "" : "closed-2"
            }`}
        >
          <button
            className={`close-left-side-bar-button ${!leftOpen ? "update-left-open-button" : ""
              }`}
            onClick={onClickLeftOpen}
          >
            <LeftArrowSvg />
          </button>
        </div>
      )}
    </>
  );
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e) {
      setMatches(e.matches);
    }
    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);
  return matches;
}

export default SideBar;
