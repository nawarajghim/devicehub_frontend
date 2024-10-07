import React from "react";
import { useFetchDeviceData } from "../hooks/apiHooks";

const DeviceDataList: React.FC = () => {
  const { deviceData, loading, error } = useFetchDeviceData();

  console.log(deviceData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Device Data</h2>
      <ul>
        {deviceData.map((data) => (
          <li key={data.deviceId}>
            <div>Device ID: {data.deviceId}</div>
            <div>
              Timestamp:{" "}
              {new Date(data.timestamp).toLocaleString("fi-FI").slice(0, -3)}
            </div>
            <div>
              Data:
              <ul>
                {Object.entries(data.data).map(([key, value]) => (
                  <li key={`${data.deviceId}-${key}`}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceDataList;
