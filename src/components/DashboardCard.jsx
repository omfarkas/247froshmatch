import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, current, total, onClick, children }) => {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <h2 className="card-title">{title}</h2>
      
      <div className="card-content">
        {children}
      </div>
      
      <div className="card-footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
          <span>{current} / {total}</span>
          <span>students</span>
        </div>
        {/* Simple progress bar */}
        <div style={{ 
          height: '4px', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '2px', 
          marginTop: '0.5rem',
          overflow: 'hidden' 
        }}>
          <div style={{ 
            width: `${(current / total) * 100}%`, 
            height: '100%', 
            backgroundColor: '#000' 
          }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
