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
import { Ruuvi } from "../types/DBTypes";

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
}: {
  range: string;
  selected: string;
}) => {
  const { getRoleByToken } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const { ruuviTagData, loading, error } = useFetchRuuviTagData();
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
    const date = now.toLocaleDateString("fi-FI"); // e.g., "21.11.2024"
    const time = now.toLocaleTimeString("fi-FI", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    const filename = `ruuvi_data_${range}_${date}_${time}.csv`;
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

    if (!filteredData || filteredData.length === 0) {
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
    }

    setFilteredData(filteredData);

    const macs = new Set(filteredData.map((ruuvi) => ruuvi.data.mac));
    const macData = Array.from(macs).map((mac) => {
      const data = filteredData.filter((ruuvi) => ruuvi.data.mac === mac);
      return { mac: mac, data: data };
    });

    const chartData = processData(range, selected, macData);
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
          data={data}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: `${selected.toUpperCase()} data for the last ${range}`,
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
