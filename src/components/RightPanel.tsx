import React from 'react';
import AdditionalInfo from './AdditionalInfo';

const RightPanel: React.FC = () => {
  return (
    <div className="right-panel">
      <div className="info-section">
        <h3>Info</h3>
        {/* Existing info goes here */}
      </div>
      <AdditionalInfo />
    </div>
  );
}

export default RightPanel;