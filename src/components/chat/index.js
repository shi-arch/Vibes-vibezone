import RightSideContainer from "./rightSideContainer"
import "./index.css";
import SideBar from "../SideBar/sideBar";
import { useSelector } from "react-redux";
import PricingPlansModal from "../../components/Modals/PricingPlansModal"

const Chat = () => {
  const modalSelector = useSelector(state => state.modalSlice)
  const {pricingAndPlans} = modalSelector

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
