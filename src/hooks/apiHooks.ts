import axios from "axios";
import { useEffect, useState } from "react";
import { Values } from "../types/LocalTypes";
import {
  DBMessageResponse,
  MessageResponse,
  RoleResponse,
} from "../types/MessageTypes";
import {
  DetectedDevice,
  Device,
  DeviceClass,
  DeviceData,
  Ruuvi,
  Weekly,
} from "../types/DBTypes";

/******************Device Hooks******************/

// Hook to get all devices
const useFetchDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Device[]>(
        `${import.meta.env.VITE_API_URL}/devices`
      );
      setDevices(response.data);
    } catch {
      setError("Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return { devices, loading, error, fetchDevices };
};

// Hook to get a single device by name
const useFetchDetectedDevices = () => {
  const [detectedDevices, setDetectedDevices] = useState<DetectedDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<DetectedDevice[]>(
          `${import.meta.env.VITE_API_URL}/devices/detectedDevices/new`
        );
        setDetectedDevices(response.data);
      } catch {
        setError("Failed to fetch device");
      } finally {
        setLoading(false);
      }
    };
    fetchDevice();
  }, []);
  return { detectedDevices, loading, error };
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
          `${import.meta.env.VITE_API_URL}/devices/name/${name}`
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

  const postDevice = async (
    device: Omit<Device, "data" | "timestamp" | "last_updated">
  ) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/devices`, device);
    } catch {
      setError("Failed to post device");
      throw new Error("Failed to post device");
    } finally {
      setLoading(false);
    }
  };
  return { postDevice, loading, error };
};

// Hook to update a device by name
const useUpdateDevice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateDevice = async (
    name: string,
    device: Omit<Device, "data" | "timestamp">
  ) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/devices/name/${name}`,
        device
      );
    } catch {
      setError("Failed to update device");
      throw new Error("Failed to update device");
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
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/devices/name/${name}`
      );
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
          `${import.meta.env.VITE_API_URL}/deviceclasses`
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
          `${import.meta.env.VITE_API_URL}/deviceclasses/${name}`
        );
        setDeviceClass(response.data);
      } catch {
        setError("Failed to fetch device class");
      }
      setLoading(false);
    };
    fetchDeviceClass();
  }, [name]);
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
      await axios.put(
        `${import.meta.env.VITE_API_URL}/deviceclasses/${name}`,
        deviceClass
      );
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
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/deviceclasses/${name}`
      );
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
          `${import.meta.env.VITE_API_URL}/devicedata`
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
          `${import.meta.env.VITE_API_URL}/devicedata/${deviceId}`
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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/devicedata`,
        deviceData
      );
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
      await axios.put(
        `${import.meta.env.VITE_API_URL}/devicedata/${deviceId}`,
        deviceData
      );
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
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/devicedata/${deviceId}`
      );
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
const useFetchRuuviTagData = (deviceId: string) => {
  const [ruuviTagData, setRuuviTagData] = useState<Ruuvi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRuuviTagData = async (deviceId: string | null) => {
      if (!deviceId) {
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Ruuvi[]>(
          `${import.meta.env.VITE_API_URL}/ruuvi/${deviceId}`
        );
        if (response.data) {
          setRuuviTagData(response.data);
        } else {
          setError("No RuuviTag data found");
        }
      } catch {
        setError("Failed to fetch RuuviTag data");
      } finally {
        setLoading(false);
      }
    };
    fetchRuuviTagData(deviceId);
  }, [deviceId]);

  return { ruuviTagData, loading, error };
};

/* Testing purposes only */

const useAggregatedWeeklyData = () => {
  const [aggregatedWeekly, setAggregatedWeekly] = useState<Weekly[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAggregatedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Weekly[]>(
          `${import.meta.env.VITE_API_URL}/aggregation/weekly`
        );
        setAggregatedWeekly(response.data);
      } catch {
        setError("Failed to fetch aggregated data");
      } finally {
        setLoading(false);
      }
    };
    fetchAggregatedData();
  }, []);

  return { aggregatedWeekly, loading, error };
};

const useAggregatedMonthlyData = () => {
  const [aggregatedMonthly, setAggregatedMonthly] = useState<Weekly[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAggregatedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Weekly[]>(
          `${import.meta.env.VITE_API_URL}/aggregation/monthly`
        );
        setAggregatedMonthly(response.data);
      } catch {
        setError("Failed to fetch aggregated data");
      } finally {
        setLoading(false);
      }
    };
    fetchAggregatedData();
  }, []);

  return { aggregatedMonthly, loading, error };
};

const useAggregatedYearlyData = () => {
  const [aggregatedYearly, setAggregatedYearly] = useState<Weekly[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAggregatedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Weekly[]>(
          `${import.meta.env.VITE_API_URL}/aggregation/yearly`
        );
        setAggregatedYearly(response.data);
      } catch {
        setError("Failed to fetch aggregated data");
      } finally {
        setLoading(false);
      }
    };
    fetchAggregatedData();
  }, []);

  return { aggregatedYearly, loading, error };
};

/******************Authentication******************/
// Hook to authenticate admin

const useUser = () => {
  const getRoleByToken = async () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await axios.post<RoleResponse>(
      `api/v1/login/role`,
      {},
      options
    );
    if (result) {
      return result.data.data.role;
    } else {
      return null;
    }
  };

  const postPasswordChange = async (password: string) => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await axios.post<MessageResponse>(
      `${import.meta.env.VITE_API_URL}/login/password`,
      { password },
      options
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  };
  return { postPasswordChange, getRoleByToken };
};

const useAuth = () => {
  const postLogin = async (values: Values) => {
    const result = await axios.post<DBMessageResponse>(`api/v1/login`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      return result;
    } else {
      return null;
    }
  };
  return { postLogin };
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
  useAggregatedWeeklyData,
  useAggregatedMonthlyData,
  useAggregatedYearlyData,
  usePostDevice,
  useUpdateDevice,
  useDeleteDevice,
  useUser,
  useAuth,
  useFetchDetectedDevices,
};
