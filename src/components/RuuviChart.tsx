// RuuviChart.js
import React, { useEffect, useState } from "react";
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

import { useFetchRuuviTagData } from "../hooks/apiHooks";

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

const RuuviChart: React.FC = () => {
  const { ruuviTagData, loading, error } = useFetchRuuviTagData();
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (loading || error) {
      return;
    }

    if (ruuviTagData.length === 0) {
      console.log("No data available");
      return;
    }

    // Get the current time
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    // Filter data for the last hour
    const filteredData = ruuviTagData.filter((ruuvi) => {
      const timestamp = new Date(ruuvi.timestamp);
      return timestamp >= oneHourAgo && timestamp <= now;
    });

    if (filteredData.length === 0) {
      console.log("No data available in the last hour");
      return;
    }

    // Create unique MAC addresses
    const macs = new Set(filteredData.map((ruuvi) => ruuvi.data.mac));

    const macData = Array.from(macs).map((mac) => {
      const data = filteredData.filter((ruuvi) => ruuvi.data.mac === mac);
      return {
        mac: mac,
        data: data,
      };
    });

    // Format the labels for hours and minutes
    const labels = macData[0].data.map((data) => {
      const date = new Date(data.timestamp);
      return `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    });

    const chartData = {
      labels: labels,
      datasets: macData.map((macItem) => ({
        label: "RuuviTag MAC:" + macItem.mac,
        data: macItem.data.map((data) => data.data.temperature),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      })),
    };

    setData(chartData);
  }, [ruuviTagData, loading, error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
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
              text: "Temperature Data (°C) for the last hour",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time (HH:MM)",
              },
            },
            y: {
              title: {
                display: true,
                text: "Temperature (°C)",
              },
              beginAtZero: true,
            },
          },
        }}
        style={{ height: "300px" }}
      />
    </div>
  );
};

export default RuuviChart;
