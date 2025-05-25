import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { useFetchDevices, useDeleteDevice, useUser } from "../hooks/apiHooks";
import { Device } from "../types/DBTypes";
import AddDeviceForm from "../components/AddDeviceForm";

const Devices = () => {
  const { getRoleByToken } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const { devices, loading, error, fetchDevices } = useFetchDevices();
  const { deleteDevice } = useDeleteDevice();
  const [otherLocation, setOtherLocation] = useState("");
  const [allDevices, setAllDevices] = useState<
    Omit<Device, "data" | "timestamp" | "last_updated">[]
  >([]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deviceToUpdate, setDeviceToUpdate] = useState<Omit<
    Device,
    "data" | "timestamp" | "last_updated"
  > | null>(null);

  // const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (devices?.length < 1) return;
    setAllDevices(devices);
  }, [devices]);

  const navigate = useNavigate();

  const handleUpdate = (
    device: Omit<Device, "data" | "timestamp" | "last_updated">
  ) => {
    setDeviceToUpdate(device);
    setIsUpdateModalOpen(true);

    if (device.location && !locations.includes(device.location)) {
      setOtherLocation(device.location);
    } else {
      setOtherLocation("");
    }
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
            onClick={() => navigate("/devices/detected")}
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

        {allDevices.map((device) => (
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

      {/* Modal for Updating a Device */}
      {isUpdateModalOpen && deviceToUpdate && (
        <AddDeviceForm
          device={{ ...deviceToUpdate, isUpdate: true }}
          updateDevicesList={(device) => {
            setAllDevices((prevDevices) =>
              prevDevices.map((d) => (d.name === device.name ? device : d))
            );
          }}
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setDeviceToUpdate(null);
          }}
        />
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
