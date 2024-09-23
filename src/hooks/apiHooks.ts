import axios from "axios";
import { useEffect, useState } from "react";


type Device = {
    name: string;
    deviceClass: string;
    deviceType: string;
    location?: string;
    settings?: string;
}

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

export {useFetchDevices};