import React from 'react';
import '../style/data.css';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';


const Data: React.FC = () => {
  return (
    <div className="device-hub-container">
      <header className="header">
        <h1>Device Hub</h1>
      </header>
      <div className="content">
        <div className="left-section">
          <h2>Device X</h2>
          <LeftPanel />
        </div>
        <div className="right-section">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

export default Data;