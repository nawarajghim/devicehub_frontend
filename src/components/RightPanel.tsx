import { Device } from "../types/DBTypes";
import RecentData from "./RecentData";

// get device of type Device from props
const RightPanel = ({ device }: { device: Device }) => {
  return (
    <div className="right-panel">
      <div className="info-section">
        <hr className="short-line" />
        <p>Class: {device.deviceClass}</p>
        <hr className="short-line" />
        <p>Device type: {device.deviceType}</p>
        <hr className="short-line" />
        <p>Location: {device.location}</p>
      </div>
      <RecentData device={device} />
    </div>
  );
};

export default RightPanel;
