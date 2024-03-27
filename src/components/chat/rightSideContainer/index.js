import Header from "../header";
import CallInterface from "../callInterface";
import ChatInterface from "../chatInterface";
import Friends from "../chatConnectionsPanel";
import { useSelector } from "react-redux";

const RightSideContainer = () => {
  const modalSelector = useSelector((state) => state.modalSlice);
  const { leftOpen } = modalSelector;

  return (
    <div
      className={`right-side-con ${
        leftOpen ? "" : "right-con-sidebar-close expand-left"
      }`}
    >
      <Header />
      <div className="bottom-con">
        <CallInterface />
        <ChatInterface />
        <Friends />
      </div>
    </div>
  );
};

export default RightSideContainer;
