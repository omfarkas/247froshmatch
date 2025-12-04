import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="progress-container">
      <div 
        className="progress-fill" 
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="progress-text">{current}/{total}</span>
    </div>
  );
};

export default ProgressBar;
