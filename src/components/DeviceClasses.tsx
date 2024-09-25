import React from "react";
import { useFetchDeviceClasses } from "../hooks/apiHooks";

const DeviceClassList: React.FC = () => {
  const { deviceClasses, loading, error } = useFetchDeviceClasses();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(deviceClasses);

  return (
    <div>
      <h2>Device Classes</h2>
      <ul>
        {deviceClasses.map((deviceClass) => (
          <li key={deviceClass.name}>
            {deviceClass.name}
            <ul>
              {deviceClass.type.map((deviceType, index) => (
                <li key={index}>{deviceType}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceClassList;
