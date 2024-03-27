import { Mute, Video, EndCall } from "../../svgComponents/index.js";

const CallInterface = () => (
  <div className="call-container">
    <div className="images-con">
      <img
        src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
        className="image"
        alt="person1"
      />
      <img
        src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222352/Rectangle_29_zq40pr.png"
        className="image"
        alt="person2"
      />
    </div>
    <div className="call-controllers">
      <div className="calls">
        <Mute />
        <Video />
        <EndCall />
      </div>
    </div>
  </div>
);

export default CallInterface;
