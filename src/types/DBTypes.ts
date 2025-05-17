type Device = {
  name: string;
  deviceClass: string;
  deviceType: string;
  location?: string;
  settings?: string;
  status: string;
  data: {
    [key: string]: string | number;
  };
  last_updated: Date;
};

export type DetectedDevice = {
  event_type: string;
  data: { device_name: string };
  last_updated: Date;
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
    humidity: number;
    temperature: number;
    pressure: number;
    mac: string;
  };
  timestamp: Date;
};

type Admin = {
  id: number;
  username: string;
  password: string;
  role: string;
};

type Weekly = {
  year: number;
  week: number;
  averageHumidity: number;
  averageTemperature: number;
  averagePressure: number;
  startDate: Date;
  endDate: Date;
};

type Monthly = {
  year: number;
  month: number;
  averageHumidity: number;
  averageTemperature: number;
  averagePressure: number;
  startDate: Date;
  endDate: Date;
};

type Yearly = {
  year: number;
  averageHumidity: number;
  averageTemperature: number;
  averagePressure: number;
  startDate: Date;
  endDate: Date;
};

export type {
  Device,
  DeviceClass,
  DeviceData,
  Ruuvi,
  Admin,
  Weekly,
  Monthly,
  Yearly,
};
