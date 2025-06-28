import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useFetchRuuviTagData, useUser } from "../hooks/apiHooks";
import { filterData, processData } from "../utils/helpers";
import { Device, Ruuvi } from "../types/DBTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
};

// accept range and selected as props
const RuuviChart = ({
  range,
  selected,
  device,
}: {
  range: string;
  selected: string;
  device: Device;
}) => {
  console.log({ device: device._id });
  const { getRoleByToken } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const { ruuviTagData, loading, error } = useFetchRuuviTagData(device?._id);
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [filteredData, setFilteredData] = useState<Ruuvi[]>([]);

  const implementCondition = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = await getRoleByToken();
      if (role === "admin") {
        setRole("admin");
      } else {
        setRole("user");
      }
    }
  };

  function assignMetrics(selected: string) {
    switch (selected) {
      case "temperature":
        return "°C";
      case "humidity":
        return "%";
      case "pressure":
        return "hPa";
      default:
        return "°C";
    }
  }

  const assignLabel = (range: string) => {
    switch (range) {
      case "1hour":
        return "last hour";
      case "24hours":
        return "last 24 hours";
      case "7days":
        return "last 7 days";
      case "30days":
        return "last 30 days";
      case "12months":
        return "last 12 months";
      case "currenthour":
        return "current hour";
      case "today":
        return "today";
      case "currentweek":
        return "current week";
      case "currentmonth":
        return "current month";
      case "currentyear":
        return "current year";
      default:
        return "last hour";
    }
  };

  function generateCSV(data: Ruuvi[]) {
    if (!data.length) {
      return "No data available";
    }
    const headers = Object.keys(data[0].data).join(",") + ",timestamp";
    const rows = data
      .map((ruuvi) => {
        const values = Object.values(ruuvi.data);
        const localizedTimestamp = new Date(ruuvi.timestamp).toLocaleString(
          "fi-FI"
        );
        return `${values.join(",")},${localizedTimestamp}`;
      })
      .join("\n");
    return `${headers}\n${rows}`;
  }

  const downloadCSV = () => {
    const csv = generateCSV(filteredData);
    // date without time separators
    const now = new Date();
    const date = now.toLocaleDateString("fi-FI");
    const time = now.toLocaleTimeString("fi-FI", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    const filename = `devicehub_data_${range}_${date}_${time}.csv`;
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (loading || error) {
      return;
    }

    if (ruuviTagData.length === 0) {
      return;
    }

    implementCondition();

    const filteredData = filterData(range, ruuviTagData);

    // if (!filteredData || filteredData.length === 0) {
    //   console.log("No data available for the selected range");
    //   setData({
    //     labels: [],
    //     datasets: [
    //       {
    //         label: "No Data",
    //         data: [0],
    //         fill: false,
    //         backgroundColor: "rgba(75,192,192,0.4)",
    //         borderColor: "rgba(75,192,192,1)",
    //       },
    //     ],
    //   });
    //   return;
    // }

    setFilteredData(filteredData);

    const macs = new Set(filteredData.map((ruuvi) => ruuvi.data.mac));
    const macData = Array.from(macs).map((mac) => {
      const data = filteredData.filter((ruuvi) => ruuvi.data.mac === mac);
      return { mac: mac, data: data };
    });
    console.log("macData", macData);

    const chartData = processData(device.name, range, selected, macData);
    if (!chartData) {
      console.log("No data available for the selected range");
      setData({
        labels: [],
        datasets: [
          {
            label: "No Data",
            data: [0],
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      });
      return;
    } else {
      setData(chartData);
    }
  }, [ruuviTagData, loading, error, range, selected]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="chart-container">
        <Line
          key={`${range}-${selected}`}
          data={data}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: `${selected.toUpperCase()} data for${
                  range === "today" ? "" : " the"
                } ${assignLabel(range)}`,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time",
                },
              },
              y: {
                title: {
                  display: true,
                  text: assignMetrics(selected),
                },
                beginAtZero: true,
              },
            },
          }}
          style={{ height: "300px" }}
        />
        {role === "admin" && (
          <button className="download-button" onClick={downloadCSV}>
            Download CSV
          </button>
        )}
      </div>
      <div></div>
    </>
  );
};

export default RuuviChart;
