import React, { useEffect, useState } from "react";

import useWebSocket from "../hooks/webSocketHooks";
import { useFetchDetectedDevices } from "../hooks/apiHooks";

import "../style/newdevice.css";
import AddDeviceForm from "../components/AddDeviceForm";
import { Device } from "../types/DBTypes";
export type NewDevice = Omit<Device, "data" | "timestamp" | "last_updated"> & {
  deviceClass?: string;
  deviceType?: string;
  status?: string;
  isUpdate?: boolean;
};

const NewDevices: React.FC = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<NewDevice | null>(null);
  const [devices, setDevices] = useState<NewDevice[]>([]);
  const { detectedDevices, loading } = useFetchDetectedDevices();
  const { data, isConnected } = useWebSocket(
    "ws://localhost:3000",
    "new_device_alert_stream"
  );

  useEffect(() => {
    if (
      data &&
      !devices.some((device) => device.name === (data as NewDevice).name)
    ) {
      setDevices((prevDevices: NewDevice[]) => [
        ...prevDevices,
        data as NewDevice,
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (detectedDevices) {
      const newDevices = detectedDevices
        .filter((device) => !devices.some((d) => d.name === device.data.name))
        .map((device) => ({ name: device.data.name })) as NewDevice[];

      newDevices.length > 0 && setDevices([...devices, ...newDevices]);
    }
  }, [detectedDevices]);

  if (loading) {
    return (
      <div className="additional-info">
        <p>Loading the data...</p>
      </div>
    );
  }

  return (
    <div className="new-device-wrapper">
      <h2 className="h2-title">
        Detected devices <span>({devices?.length || 0})</span>
      </h2>
      <hr className="line" />
      <ul className="new-device-list">
        {devices?.map((device) => (
          <li key={device.name} className="new-device-item">
            <span className="bold-text">{device.name}</span>
            <div className="button-container">
              <button
                className="device-button"
                onClick={() => {
                  setAddModalOpen(true);
                  setSelectedDevice(device);
                }}
              >
                Add
              </button>
              <button
                className="device-button-delete"
                //  onClick={() => handleDelete(device.name)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isAddModalOpen && (
        <AddDeviceForm
          device={selectedDevice || ({} as NewDevice)}
          updateDevicesList={(device) => {
            setDevices((prevDevices) =>
              prevDevices.filter((d) => d.name !== device.name)
            );
          }}
          isOpen={isAddModalOpen}
          onClose={() => {
            setAddModalOpen(false);
            setSelectedDevice(null);
          }}
        />
      )}
    </div>
  );
};

export default NewDevices;
