import Statistic from "./Statistics";
import { Device } from "../types/DBTypes";

const LeftPanel = ({ device }: { device: Device }) => {
  return (
    <div className="left-panel">
      <Statistic device={device} />
    </div>
  );
};

export default LeftPanel;
