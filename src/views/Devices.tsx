import { useState } from "react";
import { Link } from "react-router-dom";
import DeviceClassList from "../components/DeviceClasses";
import DeviceDataList from "../components/DeviceData";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { useFetchDevices, useDeleteDevice } from "../hooks/apiHooks";

const Devices = () => {
  const { devices, loading, error, fetchDevices } = useFetchDevices();
  const { deleteDevice } = useDeleteDevice();

  const [isModalOpen, setModalOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  const handleDelete = async (deviceName: string) => {
    setDeviceToDelete(deviceName);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deviceToDelete) {
      await deleteDevice(deviceToDelete);
      await fetchDevices();
    }
    setModalOpen(false);
  };

  const cancelDelete = () => {
    setModalOpen(false);
  };

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
            <h4 className="card-info">Actions</h4>
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
              {/* Delete Button */}
              <button
                className="device-button"
                onClick={() => handleDelete(device.name)}
              >
                Delete
              </button>
            </div>
          ))}

          <hr className="line"></hr>
          <DeviceClassList />
          <DeviceDataList />
        </div>
      </div>

      {/* Confirmation Modal for deletion */}
      <DeleteConfirmation
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this device?"
      />
    </>
  );
};

export default Devices;
