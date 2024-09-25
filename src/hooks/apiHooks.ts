import axios from "axios";
import { useEffect, useState } from "react";

/******************Types******************/

type Device = {
  name: string;
  deviceClass: string;
  deviceType: string;
  location?: string;
  settings?: string;
};

type DeviceClass = {
  name: string;
  type: Array<string>;
};

type DeviceData = {
  deviceId: number;
  timestamp: Date;
  data: Array<string>;
};

type Ruuvi = {
  data: {
    data_format: number;
    humidity: number;
    temperature: number;
    pressure: number;
    acceleration: number;
    acceleration_x: number;
    acceleration_y: number;
    acceleration_z: number;
    tx_power: number;
    battery: number;
    movement_counter: number;
    measurement_sequence_number: number;
    mac: string;
    rssi: number | null;
  };
};

/******************Device Hooks******************/

// Hook to get all devices
const useFetchDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Device[]>(
          "http://localhost:3000/api/v1/devices"
        );
        setDevices(response.data);
      } catch {
        setError("Failed to fetch devices");
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);
  return { devices, loading, error };
};

// Hook to get a single device by name
const useFetchDevice = (name: string) => {
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Device>(
          `http://localhost:3000/api/v1/devices/${name}`
        );
        setDevice(response.data);
      } catch {
        setError("Failed to fetch device");
      } finally {
        setLoading(false);
      }
    };
    fetchDevice();
  }, [name]);
  return { device, loading, error };
};

/******************Device Class Hooks******************/

// Hook to get all device classes
const useFetchDeviceClasses = () => {
  const [deviceClasses, setDeviceClasses] = useState<DeviceClass[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceClasses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<DeviceClass[]>(
          "http://localhost:3000/api/v1/deviceclasses"
        );
        setDeviceClasses(response.data);
      } catch {
        setError("Failed to fetch device classes");
      } finally {
        setLoading(false);
      }
    };
    fetchDeviceClasses();
  }, []);
  return { deviceClasses, loading, error };
};

/******************Device Data Hooks******************/

// Hook to get all device data
const useFetchDeviceData = () => {
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<DeviceData[]>(
          "http://localhost:3000/api/v1/devicedata"
        );
        setDeviceData(response.data);
      } catch {
        setError("Failed to fetch device data");
      } finally {
        setLoading(false);
      }
    };
    fetchDeviceData();
  }, []);
  return { deviceData, loading, error };
};

/******************RuuviTag (example of IoT device)******************/

// Hook to get all RuuviTag data
const useFetchRuuviTagData = () => {
  const [ruuviTagData, setRuuviTagData] = useState<Ruuvi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRuuviTagData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Ruuvi[]>(
          "http://localhost:3000/api/v1/ruuvi"
        );
        setRuuviTagData(response.data);
      } catch {
        setError("Failed to fetch RuuviTag data");
      } finally {
        setLoading(false);
      }
    };
    fetchRuuviTagData();
  }, []);

  return { ruuviTagData, loading, error };
};

export {
  useFetchDevices,
  useFetchDevice,
  useFetchDeviceClasses,
  useFetchDeviceData,
  useFetchRuuviTagData,
};
