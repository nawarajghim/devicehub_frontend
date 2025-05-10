import React, { useEffect, useState } from "react";

import useWebSocket from "../hooks/webSocketHooks";
import { Device } from "../types/DBTypes";

export type NewDevice = {
  device_name: string;
};

const NewDevices: React.FC = () => {
  const [devices, setDevices] = useState<NewDevice>([]);
  const { data, isConnected } = useWebSocket(
    "ws://localhost:3000",
    "new_device_alert_stream"
  );

  useEffect(() => {
    if (
      data &&
      !devices.some((device) => device.device_name === data.device_name)
    ) {
      setDevices((prevDevices: NewDevice[]) => [...prevDevices, data]);
    }
  }, [data]);

  if (!isConnected) {
    return (
      <div className="additional-info">
        <p>Connecting to WebSocket...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="additional-info">
        <p>Loading the data...</p>
      </div>
    );
  }

  return (
    <div className="new-device-wrapper">
      <h2 className="h2-title">Detected new devices</h2>
      <hr className="line" />
      <ul>
        {devices?.map((device) => (
          <li key={device.device_name}>{device.device_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewDevices;
