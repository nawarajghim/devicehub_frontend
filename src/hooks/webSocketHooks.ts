// src/hooks/useWebSocket.ts
import { useEffect, useState } from 'react';
import {Device} from '../types/DBTypes';

const useWebSocket = (url: string) => {
  const [data, setData] = useState<Device | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket(url);

    // Connection opened
    socket.addEventListener('open', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const receivedData = JSON.parse(event.data);
      console.log('Received data from WebSocket:', receivedData);
      setData(receivedData);  // Store the updated data in state
    });

    // Handle WebSocket closure
    socket.addEventListener('close', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.close();
    };
  }, [url]);

  return { data, isConnected };
};

export default useWebSocket;
