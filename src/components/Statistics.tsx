import React, { useState } from "react";
import RuuviChart from "./RuuviChart";

const Statistic: React.FC = () => {
  const [range, setRange] = useState("1hour");
  const [selected, setSelected] = useState("temperature");

  return (
    <div className="statistic">
      <div className="statistic-header">
        <h3>Statistic</h3>
        <select
          value={selected}
          className="range-dropdown"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="pressure">Pressure</option>
        </select>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="range-dropdown"
        >
          <option value="1hour">1 hour</option>
          <option value="24hours">24 hours</option>
          <option value="7days">7 days</option>
          <option value="30days">30 days</option>
          <option value="12months">12 months</option>
          <option value="currenthour">Current hour</option>
          <option value="today">Today</option>
          <option value="currentweek">Current week</option>
          <option value="currentmonth">Current month</option>
          <option value="currentyear">Current year</option>
        </select>
      </div>
      <RuuviChart range={range} selected={selected} />
    </div>
  );
};

export default Statistic;
