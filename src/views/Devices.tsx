import {Link} from "react-router-dom";
import DeviceClassList from "../components/DeviceClasses";
import DeviceDataList from "../components/DeviceData";
import { useFetchDevices } from "../hooks/apiHooks";

const Devices = () => {
  const { devices, loading, error } = useFetchDevices();
  console.log(devices);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <h2 className="h2-title">Device Hub</h2>
        <hr className="line"></hr>
        <h3 className="device-h3">Devices</h3>

        <div className="device-container">
          <div className="device-card device-info">
            <h4>Device name</h4>
            <h4 className="card-info">Class</h4>
            <h4 className="card-info">Type</h4>
            <h4 className="card-info">Location</h4>
            <h4 className="card-info">Status</h4>
          </div>

          {devices.map((device) => (
            <div className="device-card" key={device.name}>
              <p>{device.name}</p>
              <p>{device.deviceClass}</p>
              <p>{device.deviceType}</p>
              <p>{device.location}</p>
              <p>{device.status}</p>
              <Link to={`/devices/name/${device.name}`}>
                <button className="device-button">Open</button>
              </Link>
            </div>
          ))}

          <hr className="line"></hr>
          <DeviceClassList />
          <DeviceDataList />
        </div>
      </div>
    </>
  );
};

export default Devices;
