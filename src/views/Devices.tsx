import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../components/DeleteConfirmation";
import {
  useFetchDevices,
  useDeleteDevice,
  usePostDevice,
  useUser,
  useUpdateDevice,
  useFetchDeviceClasses,
} from "../hooks/apiHooks";
import { Device } from "../types/DBTypes";

const Devices = () => {
  const { getRoleByToken } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const { devices, loading, error, fetchDevices } = useFetchDevices();
  const { deleteDevice } = useDeleteDevice();
  const { postDevice } = usePostDevice();
  const { updateDevice } = useUpdateDevice();
  const { deviceClasses } = useFetchDeviceClasses();
  const [otherLocation, setOtherLocation] = useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deviceToUpdate, setDeviceToUpdate] = useState<Device | null>(null);

  // const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState<
    Omit<Device, "data" | "timestamp" | "last_updated">
  >({
    name: "",
    deviceClass: "",
    deviceType: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    if (deviceClasses.length > 0) {
      const deviceType =
        deviceClasses.find(
          (deviceClass) => deviceClass.name === deviceClasses[0]?.name
        )?.type[0] || "";

      setNewDevice({
        ...newDevice,
        deviceClass: deviceClasses[0]?.name || "",
        deviceType,
      });
    }
  }, [deviceClasses]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleUpdateInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "location" && value === "Other") {
      setDeviceToUpdate({ ...deviceToUpdate, location: value } as Device);
      setOtherLocation("");
    } else if (name === "location" && deviceToUpdate?.location === "Other") {
      setOtherLocation(value);
    } else {
      setDeviceToUpdate({ ...deviceToUpdate, [name]: value } as Device);
    }
  };

  const handleUpdate = (device: Device) => {
    setDeviceToUpdate(device);
    setIsUpdateModalOpen(true);

    if (device.location && !locations.includes(device.location)) {
      setOtherLocation(device.location);
    } else {
      setOtherLocation("");
    }
  };

  const confirmUpdate = async () => {
    if (deviceToUpdate) {
      const updatedDevice = {
        ...deviceToUpdate,
        location:
          deviceToUpdate.location === "Other"
            ? otherLocation
            : deviceToUpdate.location,
      };
      await updateDevice(updatedDevice.name, updatedDevice);
      await fetchDevices();
      setIsUpdateModalOpen(false);
    }
  };

  const createDevice = async () => {
    console.log(newDevice);
    await postDevice(newDevice);
    await fetchDevices();
    setAddModalOpen(false);
    console.log(newDevice);
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

  const implementCondition = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = await getRoleByToken();
      if (role === "admin") {
        setRole("admin");
      } else {
        setRole("user");
      }
    }
  };

  useEffect(() => {
    implementCondition();
    fetchDevices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Classes, types ans statuses for updating devices TODO: fetch from database later
  const statuses = ["Active", "Inactive"];
  const locations = [
    "Nokia Garage",
    "Nokia Campus",
    "Alternating",
    "Metropolia",
    "Other",
  ];

  return (
    <div className="devices-page">
      <h2 className="h2-title">Device Hub</h2>
      <hr className="line" />
      <div className="button-container">
        <h3 className="device-h3">Devices</h3>
        {/* Add Device Button */}
        {role === "admin" && (
          <button
            className="add-device-button"
            onClick={() => setAddModalOpen(true)}
          >
            Add Device
          </button>
        )}
      </div>
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
            {role === "admin" && (
              <>
                <button
                  className="device-button-modify"
                  onClick={() => handleUpdate(device)}
                >
                  Modify
                </button>
                <button
                  className="device-button-delete"
                  onClick={() => handleDelete(device.name)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}

        <hr className="line" />
      </div>
      {/* Modal for Adding a New Device */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="form-field">
              <h3>Add a New Device</h3>
              <input
                type="text"
                name="name"
                placeholder="Device Name"
                value={newDevice.name}
                onChange={handleInputChange}
              />
              <p>Device Class</p>
              <select
                name="deviceClass"
                value={newDevice.deviceClass}
                onChange={handleInputChange}
              >
                {deviceClasses.map((deviceClass) => (
                  <option key={deviceClass.name} value={deviceClass.name}>
                    {deviceClass.name}
                  </option>
                ))}
              </select>
              <p>Device Type</p>
              <select
                name="deviceType"
                value={newDevice.deviceType}
                onChange={handleInputChange}
              >
                {deviceClasses
                  .find(
                    (deviceClass) => deviceClass.name === newDevice.deviceClass
                  )
                  ?.type.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
              <p>Device Location</p>
              <select
                name="location"
                value={newDevice.location}
                onChange={handleInputChange}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {newDevice.location === "Other" && (
                <div className="specify-location">
                  <input
                    type="text"
                    name="otherLocation"
                    placeholder="Please specify location"
                    value={otherLocation}
                    onChange={(e) => setOtherLocation(e.target.value)}
                  />
                </div>
              )}
            </div>
            <button onClick={createDevice}>Submit</button>
            <button onClick={() => setAddModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal for Updating a Device */}
      {isUpdateModalOpen && deviceToUpdate && (
        <div className="modal">
          <div className="modal-content">
            <div className="form-field">
              <h3>Modify Device</h3>
              <h4>{deviceToUpdate.name}</h4>
              <p>Device Class</p>
              <select
                name="deviceClass"
                value={deviceToUpdate.deviceClass}
                onChange={handleUpdateInputChange}
              >
                {deviceClasses.map((deviceClass) => (
                  <option key={deviceClass.name} value={deviceClass.name}>
                    {deviceClass.name}
                  </option>
                ))}
              </select>
              <p>Device Type</p>
              <select
                name="deviceType"
                value={deviceToUpdate.deviceType}
                onChange={handleUpdateInputChange}
              >
                {deviceClasses
                  .find(
                    (deviceClass) =>
                      deviceClass.name === deviceToUpdate.deviceClass
                  )
                  ?.type.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
              <p>Location</p>
              <select
                name="location"
                value={
                  deviceToUpdate &&
                  locations.includes(deviceToUpdate?.location ?? "")
                    ? deviceToUpdate.location
                    : "Other"
                }
                onChange={handleUpdateInputChange}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {/* TODO: make the exact location instead of other appear in the input field immediately*/}
              {deviceToUpdate.location === "Other" && (
                <div className="specify-location">
                  <input
                    type="text"
                    name="otherLocation"
                    placeholder="Please specify location"
                    value={otherLocation}
                    onChange={(e) => setOtherLocation(e.target.value)}
                  />
                </div>
              )}
              <p>Status</p>
              <select
                name="status"
                value={deviceToUpdate.status}
                onChange={handleUpdateInputChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={confirmUpdate}>Submit</button>
            <button onClick={() => setIsUpdateModalOpen(false)}>Cancel</button>
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
  );
};

export default Devices;
