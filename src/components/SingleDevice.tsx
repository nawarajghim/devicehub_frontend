import React from "react";
import { useFetchDevice } from "../hooks/apiHooks";
import { useParams } from "react-router-dom";

const SingleDevice: React.FC = () => {
  const { deviceName } = useParams<{ deviceName: string }>();
  const { device, loading, error } = useFetchDevice(deviceName || "");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Device</h2>
      <ul>
        <li>
          <h2>{device?.name}</h2>
        </li>
        <li>
          <p>Class: {device?.deviceClass}</p>
        </li>
        <li>{device?.deviceType}</li>
        <li>{device?.location}</li>
        <li>{device?.settings}</li>
      </ul>
    </div>
  );
};

export default SingleDevice;
