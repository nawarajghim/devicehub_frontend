import axios from "axios";
import { useEffect, useState } from "react";

/******************Types******************/

type Device = {
  name: string;
  deviceClass: string;
  deviceType: string;
  location?: string;
  settings?: string;
  status: string;
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
          `http://localhost:3000/api/v1/devices/name/${name}`
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

// Hook to post a device
const usePostDevice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postDevice = async (device: Device) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:3000/api/v1/devices", device);
    } catch {
      setError("Failed to post device");
    } finally {
      setLoading(false);
    }
  };
  return { postDevice, loading, error };
}

// Hook to update a device by name
const useUpdateDevice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateDevice = async (name: string, device: Device) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:3000/api/v1/devices/name/${name}`, device);
    } catch {
      setError("Failed to update device");
    } finally {
      setLoading(false);
    }
  };
  return { updateDevice, loading, error };
};

// Hook to delete a device by name
const useDeleteDevice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDevice = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:3000/api/v1/devices/name/${name}`);
    } catch {
      setError("Failed to delete device");
    } finally {
      setLoading(false);
    }
  };
  return { deleteDevice, loading, error };
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

// Hook to get a device class by name
const useFetchDeviceClass = (name: string) => {
  const [deviceClass, setDeviceClass] = useState<DeviceClass | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceClass = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<DeviceClass>(
          `http://localhost:3000/api/v1/deviceclasses/${name}`
        );
        setDeviceClass(response.data);
      } catch {
        setError("Failed to fetch device class");
      }
      setLoading(false);
    }
    fetchDeviceClass();
  }
  , [name]);
  return { deviceClass, loading, error };
};

// Hook to update a device class by name
const useUpdateDeviceClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateDeviceClass = async (name: string, deviceClass: DeviceClass) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:3000/api/v1/deviceclasses/${name}`, deviceClass);
    } catch {
      setError("Failed to update device class");
    } finally {
      setLoading(false);
    }
  };
  return { updateDeviceClass, loading, error };
};

// Hook to delete a device class by name
const useDeleteDeviceClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDeviceClass = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:3000/api/v1/deviceclasses/${name}`);
    } catch {
      setError("Failed to delete device class");
    } finally {
      setLoading(false);
    }
  };
  return { deleteDeviceClass, loading, error };
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

// Hook to get one device's data by deviceId
const useFetchDeviceDataByDeviceId = (deviceId: number) => {
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<DeviceData[]>(
          `http://localhost:3000/api/v1/devicedata/${deviceId}`
        );
        setDeviceData(response.data);
      } catch {
        setError("Failed to fetch device data");
      } finally {
        setLoading(false);
      }
    };
    fetchDeviceData();
  }, [deviceId]);
  return { deviceData, loading, error };
};

// Hook to post device data
const usePostDeviceData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postDeviceData = async (deviceData: DeviceData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:3000/api/v1/devicedata", deviceData);
    } catch {
      setError("Failed to post device data");
    } finally {
      setLoading(false);
    }
  };
  return { postDeviceData, loading, error };
};

// Hook to update device data by deviceId
const useUpdateDeviceData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateDeviceData = async (deviceId: number, deviceData: DeviceData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:3000/api/v1/devicedata/${deviceId}`, deviceData);
    } catch {
      setError("Failed to update device data");
    } finally {
      setLoading(false);
    }
  };
  return { updateDeviceData, loading, error };
};

// Hook to delete device data by deviceId
const useDeleteDeviceData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDeviceData = async (deviceId: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:3000/api/v1/devicedata/${deviceId}`);
    } catch {
      setError("Failed to delete device data");
    } finally {
      setLoading(false);
    }
  };
  return { deleteDeviceData, loading, error };
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
  useFetchDeviceClass,
  useUpdateDeviceClass,
  useDeleteDeviceClass,
  useFetchDeviceData,
  useFetchDeviceDataByDeviceId,
  usePostDeviceData,
  useUpdateDeviceData,
  useDeleteDeviceData,
  useFetchRuuviTagData,
  usePostDevice,
  useUpdateDevice,
  useDeleteDevice,
};