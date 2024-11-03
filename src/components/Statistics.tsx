import React, { useState } from 'react';
import RuuviChart from './RuuviChart';

const Statistic: React.FC = () => {
  const [range, setRange] = useState('1h'); // Default selection

  // Handler to update selected range
  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRange(event.target.value);
  };

  return (
    <div className="statistic">
      <div className="statistic-header">
        <h3>Statistic</h3>
        <select value={range} onChange={handleRangeChange} className="range-dropdown">
          <option value="1h">1 Hour</option>
          <option value="1day">1 Day</option>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
          <option value="1year">1 Year</option>
        </select>
      </div>
      <RuuviChart />
    </div>
  );
}

export default Statistic;
