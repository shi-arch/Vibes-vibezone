import { Badge1, Badge2, Badge3, Badge4 } from "../../svgComponents/index.js";
import Tooltip from "@mui/material/Tooltip";

const Badges = () => (
  <div className="badges-container">
    <Tooltip
      title="Certified Sharp"
      placement="bottom"
      enterDelay={400}
      leaveDelay={200}
    >
      <div>
        <Badge1 />
      </div>
    </Tooltip>
    <Tooltip
      title="Hot Streak"
      placement="bottom"
      enterDelay={400}
      leaveDelay={200}
    >
      <div>
        <Badge2 />
      </div>
    </Tooltip>
    <Tooltip
      title="Cold Streak"
      placement="bottom"
      enterDelay={400}
      leaveDelay={200}
    >
      <div>
        <Badge3 />
      </div>
    </Tooltip>
    <Tooltip
      title="Lotto Winner"
      placement="bottom"
      enterDelay={400}
      leaveDelay={200}
    >
      <div>
        <Badge4 />
      </div>
    </Tooltip>
    <p className="five-plus">5+</p>
  </div>
);

export default Badges;
