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

type Admin = {
  id: number;
  username: string;
  password: string;
  role: string;
};

export type { Device, DeviceClass, DeviceData, Ruuvi, Admin };
