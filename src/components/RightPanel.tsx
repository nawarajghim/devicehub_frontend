import React from "react";
import AdditionalInfo from "./AdditionalInfo";
import { Device } from "../types/DBTypes";

// get device of type Device from props
const RightPanel = ({ device }: { device: Device }) => {
  return (
    <div className="right-panel">
      <div className="info-section">
        <h3>Info</h3>
        <ul>
          <li>
            <p>Class: {device.deviceClass}</p>
          </li>
          <li>Device type: {device.deviceType}</li>
          <li>Location: {device.location}</li>
        </ul>
      </div>
      <AdditionalInfo />
    </div>
  );
};

export default RightPanel;
