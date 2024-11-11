import useWebSocket from "../hooks/webSocketHooks";
import { Device } from "../types/DBTypes";

const RecentData: React.FC<{ device: Device }> = ({ device }) => {
  console.log(device);
  const { data, isConnected } = useWebSocket("ws://localhost:3000");

  if (!isConnected) {
    return <div className="additional-info"><p>Connecting to WebSocket...</p></div>;
  }

  if (!data) {
    return <div className="additional-info"><p>Loading the data...</p></div>;
  }

  // round the values to no decimal places
  data.data.temperature = Math.round(+data.data.temperature);
  data.data.humidity = Math.round(+data.data.humidity);
  data.data.pressure = Math.round(+data.data.pressure);

  console.log(new Date(data.last_updated).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
    }).replace(",", ""));

  return (
    <div className="additional-info">
      {device.name === "RuuviTag" && (
        <>
          <div className="recent-data">
            <p>{data.data.temperature} °C</p>
            <hr className="vertical-line" />
            <p>{data.data.humidity} %</p>
            <hr className="vertical-line" />
            <p>{data.data.pressure} hPa</p>
          </div>
            <p>Last updated: {new Date(data.last_updated).toLocaleString("fi-FI", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
            }).replace(",", "")}</p>
        </>
      )}
    </div>
  );
};

export default RecentData;
