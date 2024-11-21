import { Ruuvi } from "../types/DBTypes";

const filterData = (range: string, ruuviTagData: Ruuvi[]) => {
  let filteredData;
  const now = new Date();

  // filter data based on selected range
  /******specific time intervals => "1 hour" means 60 minutes******/
  // 1 hour
  switch (range) {
    case "1hour":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp.toLocaleString());
        return timestamp >= new Date(now.getTime() - 60 * 60 * 1000);
      });
      return filteredData;
    // 24 hours
    case "24hours":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp.toLocaleString());
        return timestamp >= new Date(now.getTime() - 24 * 60 * 60 * 1000);
      });
      return filteredData;
    // 7 days
    case "7days":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp.toLocaleString());
        return timestamp >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      });
      return filteredData;
    // 30 days
    case "30days":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp.toLocaleString());
        return timestamp >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      });
      return filteredData;
    // 12 months
    case "12months":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp);
        return timestamp >= new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      });
      return filteredData;
    /******current period timeframes => "this hour" means from the start of the hour******/
    // current hour
    case "currenthour":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp);
        const startTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours()
        );
        return timestamp >= startTime;
      });
      return filteredData;
    // today
    case "today":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp);
        const startTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        return timestamp >= startTime;
      });
      return filteredData;
    // current week
    case "currentweek":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp);
        const startTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - now.getDay() + 1
        );
        return timestamp >= startTime;
      });
      return filteredData;
    // current month
    case "currentmonth":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp);
        const startTime = new Date(now.getFullYear(), now.getMonth(), 1);
        return timestamp >= startTime;
      });
      return filteredData;
    // current year
    case "currentyear":
      filteredData = ruuviTagData.filter((ruuvi) => {
        const timestamp = new Date(ruuvi.timestamp);
        const startTime = new Date(now.getFullYear(), 0, 1);
        return timestamp >= startTime;
      });
      return filteredData;
    default:
      filteredData = ruuviTagData;
      return filteredData;
  }
};

const calculateAverage = (dataInInterval: Ruuvi[], selected: string) => {
  const average =
    dataInInterval.reduce((sum, data) => {
      switch (selected) {
        case "temperature":
          return sum + data.data.temperature;
        case "humidity":
          return sum + data.data.humidity;
        case "pressure":
          return sum + data.data.pressure;
        default:
          return sum + data.data.temperature;
      }
    }, 0) / dataInInterval.length;

  return average;
};

// const returnRuuvitag = (pointData: number[], macItem: { mac: string }) => {
//   return {
//     label: "RuuviTag MAC:" + macItem.mac,
//     data: pointData,
//     fill: false,
//     backgroundColor: "rgba(75, 192, 192, 0.5)",
//     borderColor: "rgba(75, 192, 192, 1)",
//     tension: 0.1,
//   };
// };

const processData = (
  range: string,
  selected: string,
  macData: { mac: string; data: Ruuvi[] }[]
) => {
  const now = new Date();
  // point every 10 minutes for 1 hour
  if (range === "1hour") {
    // 10 minute interval
    const interval = 10 * 60 * 1000;
    // start time is 1 hour ago
    const startTime = new Date(now.getTime() - 60 * 60 * 1000);
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleTimeString("fi-FI", {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
      datasets: macData.map((macItem) => {
        const dataPoints = timePoints.map((timePoint) => {
          const dataInInterval = macItem.data.filter((data) => {
            const timestamp = new Date(data.timestamp);
            return (
              timestamp >= new Date(timePoint.getTime() - interval) &&
              timestamp < timePoint
            );
          });
          if (dataInInterval.length === 0) {
            return 0;
          }

          const average = calculateAverage(dataInInterval, selected);

          return average;
        });

        return {
          label: "RuuviTag MAC:" + macItem.mac,
          data: dataPoints,
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        };
      }),
    };

    return chartData;
  }

  // point every 2 hours for 1 day
  if (range === "24hours") {
    // 2 hour interval
    const interval = 2 * 60 * 60 * 1000;
    // start time is 1 day ago
    const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleTimeString("fi-FI", {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
      datasets: macData.map((macItem) => {
        const dataPoints = timePoints.map((timePoint) => {
          const dataInInterval = macItem.data.filter((data) => {
            const timestamp = new Date(data.timestamp);
            return (
              timestamp >= new Date(timePoint.getTime() - interval) &&
              timestamp < timePoint
            );
          });

          if (dataInInterval.length === 0) {
            return 0;
          }

          const average = calculateAverage(dataInInterval, selected);

          return average;
        });

        return {
          label: "RuuviTag MAC:" + macItem.mac,
          data: dataPoints,
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        };
      }),
    };

    return chartData;
  }

  // point every day for 1 week
  if (range === "7days") {
    // 1 day interval
    const interval = 24 * 60 * 60 * 1000;
    // start time is 1 week ago
    const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleDateString("fi-FI", {
          day: "2-digit",
          month: "2-digit",
        })
      ),
      datasets: macData
        .map((macItem) => {
          const dataPoints = timePoints.map((timePoint) => {
            const dataInInterval = macItem.data.filter((data) => {
              const timestamp = new Date(data.timestamp);
              return (
                timestamp >= new Date(timePoint.getTime() - interval) &&
                timestamp < timePoint
              );
            });

            if (dataInInterval.length === 0) {
              return 0;
            }

            const average = calculateAverage(dataInInterval, selected);

            return average;
          });

          // filter out datasets with all zero values
          if (dataPoints.every((point) => point === 0)) {
            return null;
          }

          return {
            label: "RuuviTag MAC:" + macItem.mac,
            data: dataPoints,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          };
        })
        .filter((dataset) => dataset !== null),
    };

    return chartData;
  }

  // point every week for 1 month
  if (range === "30days") {
    // 1 week interval
    const interval = 7 * 24 * 60 * 60 * 1000;
    // start time is 1 month ago
    const startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleDateString("fi-FI", {
          day: "2-digit",
          month: "2-digit",
        })
      ),
      datasets: macData
        .map((macItem) => {
          const dataPoints = timePoints.map((timePoint) => {
            const dataInInterval = macItem.data.filter((data) => {
              const timestamp = new Date(data.timestamp);
              return (
                timestamp >= new Date(timePoint.getTime() - interval) &&
                timestamp < timePoint
              );
            });

            if (dataInInterval.length === 0) {
              return 0;
            }

            const average = calculateAverage(dataInInterval, selected);
            return average;
          });

          // filter out datasets with all zero values
          if (dataPoints.every((point) => point === 0)) {
            return null;
          }

          return {
            label: "RuuviTag MAC:" + macItem.mac,
            data: dataPoints,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          };
        })
        .filter((dataset) => dataset !== null),
    };

    return chartData;
  }

  // point every month for 1 year
  if (range === "12months") {
    // 1 month interval
    const interval = 30 * 24 * 60 * 60 * 1000;
    // start time is 1 year ago
    const startTime = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleDateString("fi-FI", {
          month: "2-digit",
          year: "numeric",
        })
      ),
      datasets: macData
        .map((macItem) => {
          const dataPoints = timePoints.map((timePoint) => {
            const dataInInterval = macItem.data.filter((data) => {
              const timestamp = new Date(data.timestamp);
              return (
                timestamp >= new Date(timePoint.getTime() - interval) &&
                timestamp < timePoint
              );
            });

            if (dataInInterval.length === 0) {
              return 0;
            }

            const average = calculateAverage(dataInInterval, selected);
            return average;
          });

          // filter out datasets with all zero values
          if (dataPoints.every((point) => point === 0)) {
            return null;
          }

          return {
            label: "RuuviTag MAC:" + macItem.mac,
            data: dataPoints,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          };
        })
        .filter((dataset) => dataset !== null),
    };
    return chartData;
  }

  // point every 10 minutes for current hour
  if (range === "currenthour") {
    // 10 minute interval
    const interval = 10 * 60 * 1000;
    // start time is the beginning of the hour
    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours()
    );
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleTimeString("fi-FI", {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
      datasets: macData.map((macItem) => {
        const dataPoints = timePoints.map((timePoint) => {
          const dataInInterval = macItem.data.filter((data) => {
            const timestamp = new Date(data.timestamp);
            return (
              timestamp >= new Date(timePoint.getTime() - interval) &&
              timestamp < timePoint
            );
          });

          if (dataInInterval.length === 0) {
            return 0;
          }

          const average = calculateAverage(dataInInterval, selected);
          return average;
        });

        return {
          label: "RuuviTag MAC:" + macItem.mac,
          data: dataPoints,
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        };
      }),
    };

    return chartData;
  }

  // point every hour for today
  if (range === "today") {
    // 1 hour interval
    const interval = 60 * 60 * 1000;
    // start time is the beginning of the day
    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleTimeString("fi-FI", {
          hour: "2-digit",
          minute: "2-digit",
        })
      ),
      datasets: macData.map((macItem) => {
        const dataPoints = timePoints.map((timePoint) => {
          const dataInInterval = macItem.data.filter((data) => {
            const timestamp = new Date(data.timestamp);
            return (
              timestamp >= new Date(timePoint.getTime() - interval) &&
              timestamp < timePoint
            );
          });

          if (dataInInterval.length === 0) {
            return 0;
          }

          const average = calculateAverage(dataInInterval, selected);
          return average;
        });

        return {
          label: "RuuviTag MAC:" + macItem.mac,
          data: dataPoints,
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        };
      }),
    };

    return chartData;
  }

  // point every day for current week
  if (range === "currentweek") {
    // 1 day interval
    const interval = 24 * 60 * 60 * 1000;
    // start time is the beginning of the week
    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() + 1
    );
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleDateString("fi-FI", {
          day: "2-digit",
          month: "2-digit",
        })
      ),
      datasets: macData
        .map((macItem) => {
          const dataPoints = timePoints.map((timePoint) => {
            const dataInInterval = macItem.data.filter((data) => {
              const timestamp = new Date(data.timestamp);
              return (
                timestamp >= new Date(timePoint.getTime() - interval) &&
                timestamp < timePoint
              );
            });

            if (dataInInterval.length === 0) {
              return 0;
            }

            const average = calculateAverage(dataInInterval, selected);
            return average;
          });

          // filter out datasets with all zero values
          if (dataPoints.every((point) => point === 0)) {
            return null;
          }

          return {
            label: "RuuviTag MAC:" + macItem.mac,
            data: dataPoints,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          };
        })
        .filter((dataset) => dataset !== null),
    };

    return chartData;
  }

  // point every day for current month
  if (range === "currentmonth") {
    // 1 day interval
    const interval = 24 * 60 * 60 * 1000;
    // start time is the beginning of the month
    const startTime = new Date(now.getFullYear(), now.getMonth(), 1);
    const endTime = now;

    const timePoints: Date[] = [];
    for (
      let time = startTime.getTime();
      time <= endTime.getTime();
      time += interval
    ) {
      timePoints.push(new Date(time));
    }

    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleDateString("fi-FI", {
          day: "2-digit",
          month: "2-digit",
        })
      ),
      datasets: macData
        .map((macItem) => {
          const dataPoints = timePoints.map((timePoint) => {
            const dataInInterval = macItem.data.filter((data) => {
              const timestamp = new Date(data.timestamp);
              return (
                timestamp >= new Date(timePoint.getTime() - interval) &&
                timestamp < timePoint
              );
            });

            if (dataInInterval.length === 0) {
              return 0;
            }

            const average = calculateAverage(dataInInterval, selected);
            return average;
          });

          // filter out datasets with all zero values
          if (dataPoints.every((point) => point === 0)) {
            return null;
          }

          return {
            label: "RuuviTag MAC:" + macItem.mac,
            data: dataPoints,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          };
        })
        .filter((dataset) => dataset !== null),
    };

    return chartData;
  }

  if (range === "currentyear") {
    const startTime = new Date(now.getFullYear(), 0, 1);
    const endTime = now;

    const timePoints: Date[] = [];
    let currentMonth = new Date(startTime);

    // looping though months of year
    while (currentMonth <= endTime) {
      const nextMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      );

      timePoints.push(new Date(currentMonth));

      currentMonth = nextMonth;
    }
    const chartData = {
      labels: timePoints.map((time) =>
        time.toLocaleDateString("fi-FI", {
          month: "2-digit",
          year: "numeric",
        })
      ),
      datasets: macData
        .map((macItem) => {
          const dataPoints = timePoints.map((timePoint) => {
            const dataInInterval = macItem.data.filter((data) => {
              const timestamp = new Date(data.timestamp);
              return (
                timestamp >= timePoint &&
                timestamp <
                  new Date(timePoint.getTime() + 31 * 24 * 60 * 60 * 1000)
              );
            });

            if (dataInInterval.length === 0) {
              return 0;
            }

            const average = calculateAverage(dataInInterval, selected);
            return average;
          });

          // filter out datasets with all zero values
          if (dataPoints.every((point) => point === 0)) {
            return null;
          }

          return {
            label: "RuuviTag MAC:" + macItem.mac,
            data: dataPoints,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          };
        })
        .filter((dataset) => dataset !== null),
    };

    return chartData;
  }
};



export { filterData, processData };
