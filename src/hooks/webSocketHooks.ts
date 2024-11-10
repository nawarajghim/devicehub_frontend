import { useEffect, useState } from 'react';
import {Device} from '../types/DBTypes';

const useWebSocket = (url: string) => {
  const [data, setData] = useState<Device | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.addEventListener('open', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server');
    });

    socket.addEventListener('message', (event) => {
      const receivedData = JSON.parse(event.data);
      setData(receivedData);
    });

    socket.addEventListener('close', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.close();
    };
  }, [url, setData, setIsConnected]);

  return { data, isConnected };
};

export default useWebSocket;
