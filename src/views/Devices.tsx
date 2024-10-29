import { useState } from "react";
import { Link } from "react-router-dom";
import DeviceClassList from "../components/DeviceClasses";
import DeviceDataList from "../components/DeviceData";
import DeleteConfirmation from "../components/DeleteConfirmation";
import {
  useFetchDevices,
  useDeleteDevice,
  usePostDevice,
} from "../hooks/apiHooks";
import { Device } from "../types/DBTypes";

const Devices = () => {
  const { devices, loading, error, fetchDevices } = useFetchDevices();
  const { deleteDevice } = useDeleteDevice();
  const { postDevice } = usePostDevice();

  const [isModalOpen, setModalOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState<Device>({
    name: "",
    deviceClass: "",
    deviceType: "",
    location: "",
    status: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const createDevice = async () => {
    await postDevice(newDevice);
    await fetchDevices();
    setAddModalOpen(false);
  };

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
        <hr className="line" />
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
              <button
                className="device-button"
                onClick={() => handleDelete(device.name)}
              >
                Delete
              </button>
            </div>
          ))}

          <hr className="line" />
          <DeviceClassList />
          <DeviceDataList />
        </div>

        {/* Add Device Button */}
        <button
          className="add-device-button"
          onClick={() => setAddModalOpen(true)}
        >
          Add Device
        </button>

        {/* Modal for Adding a New Device */}
        {isAddModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add a New Device</h3>
              <input
                type="text"
                name="name"
                placeholder="Device Name"
                value={newDevice.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="deviceClass"
                placeholder="Device Class"
                value={newDevice.deviceClass}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="deviceType"
                placeholder="Device Type"
                value={newDevice.deviceType}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={newDevice.location}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={newDevice.status}
                onChange={handleInputChange}
              />

              <button onClick={createDevice}>Submit</button>
              <button onClick={() => setAddModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Confirmation Modal for deletion */}
        <DeleteConfirmation
          isOpen={isModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this device?"
        />
      </div>
    </>
  );
};

export default Devices;
