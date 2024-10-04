import axios from "axios";
import { useEffect, useState } from "react";


/******************Types******************/

type Device = {
    name: string;
    deviceClass: string;
    deviceType: string;
    location?: string;
    settings?: string;
}

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
                const response = await axios.get<Device[]>('http://localhost:3000/api/v1/devices');
                setDevices(response.data)
            }   catch {
                setError('Failed to fetch devices');
            }   finally {
                setLoading(false);
            }
        }
        fetchDevices();
    }, []);
    return {devices, loading, error};
}

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
                const response = await axios.get<Device>(`http://localhost:3000/api/v1/devices/name/${name}`);
                setDevice(response.data)
            }   catch (err) {
                console.error(`Error fetching device ${name}: `, err)
                setError('Failed to fetch device');
            }   finally {
                setLoading(false);
            }
        }
        fetchDevice();
    }, [name]);
    return {device, loading, error};
}

export {useFetchDevices, useFetchDevice};