import React from "react";
import { useFetchDevices } from "../hooks/apiHooks";

const DeviceList: React.FC = () => {
  const { devices, loading, error } = useFetchDevices();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Devices</h2>
      <ul>
        {devices.map((device) => (
          <li key={device.name}>
            {device.name} - {device.deviceType} - {device.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceList;
