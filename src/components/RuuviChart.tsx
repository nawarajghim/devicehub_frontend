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

import { useFetchRuuviTagData } from "../hooks/apiHooks";
import { filterData, processData } from "../utils/helpers";

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
  const { ruuviTagData, loading, error } = useFetchRuuviTagData();
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

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

  useEffect(() => {
    if (loading || error) {
      return;
    }

    if (ruuviTagData.length === 0) {
      return;
    }

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
    </div>
  );
};

export default RuuviChart;
