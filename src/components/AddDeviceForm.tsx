import { useEffect, useState } from "react";

import {
  usePostDevice,
  useUpdateDevice,
  useFetchDeviceClasses,
} from "../hooks/apiHooks";
import { Device } from "../types/DBTypes";
import "../style/devices.css";
import { NewDevice } from "../views/NewDevices";

interface AddDeviceFormProps {
  isOpen: boolean;
  onClose: () => void;
  device: NewDevice;
  updateDevicesList: (
    device: Omit<Device, "data" | "timestamp" | "last_updated">
  ) => void;
}

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({
  device,
  isOpen,
  onClose,
  updateDevicesList,
}) => {
  const { postDevice, error } = usePostDevice();
  const { updateDevice, error: updateError } = useUpdateDevice();
  const { deviceClasses } = useFetchDeviceClasses();
  const [otherLocation, setOtherLocation] = useState("");

  // const [searchQuery, setSearchQuery] = useState("");

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
    const { isUpdate, ...rest } = device;

    if (isUpdate) {
      return setNewDevice({ ...rest });
    }
    let deviceData = { ...newDevice };

    if (deviceClasses.length > 0) {
      const deviceType =
        deviceClasses.find(
          (deviceClass) => deviceClass.name === deviceClasses[0]?.name
        )?.type[0] || "";

      deviceData = {
        ...deviceData,
        deviceClass: deviceClasses[0]?.name || "",
        deviceType,
      };
    }

    if (device?.name) {
      deviceData = {
        ...deviceData,
        name: device.name || "",
      };
    }

    setNewDevice(deviceData);
  }, [deviceClasses, device]);

  console.log(newDevice);

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
      setNewDevice({ ...newDevice, location: value } as Device);
      setOtherLocation("");
    } else if (name === "location" && newDevice?.location === "Other") {
      setOtherLocation(value);
    } else {
      setNewDevice({ ...newDevice, [name]: value } as Device);
    }
  };

  const confirmUpdate = async () => {
    try {
      if (newDevice) {
        const updatedDevice = {
          ...newDevice,
          location:
            newDevice.location === "Other" ? otherLocation : newDevice.location,
          last_updated: new Date(),
        };
        await updateDevice(updatedDevice.name, updatedDevice);
        updateDevicesList(updatedDevice);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createDevice = async () => {
    try {
      await postDevice({
        ...newDevice,
        location:
          newDevice.location === "Other" ? otherLocation : newDevice.location,
      });
      updateDevicesList(newDevice);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Classes, types ans statuses for updating devices TODO: fetch from database later
  const statuses = ["Active", "Inactive"];
  const locations = [
    "Nokia Garage",
    "Nokia Campus",
    "Alternating",
    "Metropolia",
    "Other",
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <form className="form-field">
            <h3>Add a New Device</h3>
            <input
              type="text"
              name="name"
              placeholder="Device Name"
              value={newDevice.name}
              readOnly={true}
            />
            <p>Device Class</p>
            <select
              name="deviceClass"
              value={newDevice.deviceClass}
              onChange={
                device?.isUpdate ? handleUpdateInputChange : handleInputChange
              }
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
              onChange={
                device?.isUpdate ? handleUpdateInputChange : handleInputChange
              }
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
              onChange={
                device?.isUpdate ? handleUpdateInputChange : handleInputChange
              }
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
            {device.isUpdate && (
              <>
                <p>Status</p>
                <select
                  name="status"
                  value={newDevice?.status}
                  onChange={handleUpdateInputChange}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </>
            )}
          </form>
          {(error || updateError) && (
            <div className="error-message">
              <span>{error || updateError}</span>
            </div>
          )}
          <button onClick={device.isUpdate ? confirmUpdate : createDevice}>
            Submit
          </button>
          <button onClick={() => onClose()}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default AddDeviceForm;
