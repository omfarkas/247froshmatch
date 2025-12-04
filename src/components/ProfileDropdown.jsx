import React from 'react';
import './ProfileDropdown.css';

const ProfileDropdown = ({ onClose }) => {
  return (
    <>
      <div className="profile-dropdown-overlay" onClick={onClose}></div>
      <div className="profile-dropdown">
        <div className="profile-header">
          <div className="profile-avatar">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="profile-info">
            <h2>Russel</h2>
            <p className="pronouns">(he/him)</p>
            <p className="dorm">West Lag RD</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">67</div>
            <div className="stat-label">Matches</div>
            <div className="stat-sublabel">(33 left)</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">20</div>
            <div className="stat-label">Reviews</div>
            <div className="stat-sublabel">(80 left)</div>
          </div>
        </div>

        <div className="goals-section">
          <h3>Today's Goals</h3>
          <div className="goal-item">
            <div className="goal-progress">11/20 matches</div>
          </div>
          <div className="goal-item">
            <div className="goal-progress">5/9 reviews</div>
          </div>
        </div>

        <div className="week-section">
          <h3>This Week</h3>
          <div className="week-bars">
            <div className="day-bar">
              <div className="bar" style={{ height: '80%' }}></div>
              <span>M</span>
            </div>
            <div className="day-bar">
              <div className="bar" style={{ height: '60%' }}></div>
              <span>T</span>
            </div>
            <div className="day-bar">
              <div className="bar" style={{ height: '70%' }}></div>
              <span>W</span>
            </div>
            <div className="day-bar">
              <div className="bar" style={{ height: '40%' }}></div>
              <span>TH</span>
            </div>
            <div className="day-bar">
              <div className="bar" style={{ height: '0%' }}></div>
              <span>F</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
