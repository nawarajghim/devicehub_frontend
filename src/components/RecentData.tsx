import useWebSocket from "../hooks/webSocketHooks";
import { Device } from "../types/DBTypes";

const RecentData: React.FC<{ device: Device }> = ({ device }) => {
  console.log(device);
  const { data, isConnected } = useWebSocket("ws://localhost:3000");

  if (!isConnected) {
    return <div className="additional-info">Connecting to WebSocket...</div>;
  }

  if (!data) {
    return <div className="additional-info">No data received yet.</div>;
  }

  console.log(data);

  return (
    <div className="additional-info">
      {device.name === "RuuviTag" && (
        <>
          <div className="recent-data">
            <p>{data.data.temperature} °C</p>
            <p>{data.data.humidity} %</p>
            <p>{data.data.pressure} hPa</p>
          </div>
          <p>Last updated: {new Date(data.last_updated).toLocaleString()}</p>
        </>
      )}
    </div>
  );
};

export default RecentData;
