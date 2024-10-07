import React from 'react';
import Statistic from './Statistics';
import ManagementSection from './ManagmentSection';

const LeftPanel: React.FC = () => {
  return (
    <div className="left-panel">
      <Statistic />
      <ManagementSection />
    </div>
  );
}

export default LeftPanel;