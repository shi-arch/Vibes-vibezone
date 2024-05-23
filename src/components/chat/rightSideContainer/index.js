import Header from "../header";
import CallInterface from "../callInterface";
import ChatInterface from "../chatInterface";
import Friends from "../chatConnectionsPanel";
import { useSelector } from "react-redux";
import VideoCallInterFace from "../../VideoCallInterFace";
import ChatInterfaceNew from "../../ChatInerfaceNew";

const RightSideContainer = () => {
  //VideoCallInterFace
  const {leftOpen, css} = useSelector((state) => state.modalSlice);
  return (
    <div
      className={`right-side-con ${
        leftOpen ? "" : "right-con-sidebar-close expand-left"
      }`}
    >
      <Header />
      <div className={css ? "" : "bottom-con"}>
      <VideoCallInterFace />
      <ChatInterfaceNew />
        {/* <CallInterface /> */}
        {/* <ChatInterface /> */}
        <Friends />
      </div>
    </div>
  );
};

export default RightSideContainer;
