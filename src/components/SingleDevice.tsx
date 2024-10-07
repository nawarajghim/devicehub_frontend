import React from "react";
import { useFetchDevice } from "../hooks/apiHooks";
import { useParams } from "react-router-dom";
import Data from "../views/data";

const SingleDevice: React.FC = () => {
  const { deviceName } = useParams<{ deviceName: string }>();
  const { device, loading, error } = useFetchDevice(deviceName || "");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <h1>Device</h1>
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
      <div>
        <h2>Data</h2>
        <Data />
      </div>
    </>
  );
};

export default SingleDevice;
