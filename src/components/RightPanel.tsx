import { Device } from "../types/DBTypes";
import RecentData from "./RecentData";

// get device of type Device from props
const RightPanel = ({ device }: { device: Device }) => {
  return (
    <div className="right-panel">
      <div className="info-section">
        <h3>Info</h3>
        <hr className="short-line" />
        <div className="info-item">
          <span className="bold-text">Class</span>
          <span className="label-data">{device.deviceClass}</span>
        </div>
        <hr className="short-line" />
        <div className="info-item">
          <span className="bold-text">Type</span>
          <span>{device.deviceType}</span>
        </div>
        <hr className="short-line" />
        <div className="info-item">
          <span className="bold-text">Location</span>
          <span>{device.location}</span>
        </div>
        <div className="info-item">
          <span className="bold-text">Status</span>
          <span
            style={{
              color: device.status === "Active" ? "green" : "red",
            }}
          >
            {device.status}
          </span>
        </div>
      </div>
      <RecentData device={device} />
    </div>
  );
};

export default RightPanel;
