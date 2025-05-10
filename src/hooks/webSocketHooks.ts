import { useEffect, useState } from "react";
import { Device } from "../types/DBTypes";
import { NewDevice } from "../views/NewDevices";

const useWebSocket = (url: string, eventType: string) => {
  const [data, setData] = useState<Device | NewDevice | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server");
    });

    socket.addEventListener("message", (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.event_type === eventType)
        return setData(receivedData.data);
      setData(null);
    });

    socket.addEventListener("close", () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.close();
    };
  }, [url, setData, setIsConnected]);

  return { data, isConnected };
};

export default useWebSocket;
