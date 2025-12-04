import './IssuePanel.css';

function IssuePanel({ 
  selectedRoom, 
  selectedZone, 
  zoneRooms,
  roomContext,
  onApproveZone,
  onClose, 
  activeLens, 
  swapSource, 
  onInitiateSwap,
  onCancelSwap,
  floor
}) {
  // Zone review panel
  if (selectedZone) {
    return (
      <div className="issue-panel">
        <div className="panel-header">
          <h2>{selectedZone.label}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="panel-content">
          <div className="zone-status-card">
            <div className="status-header">
              <span className="status-label">Status</span>
              <span className={`status-badge ${selectedZone.status}`}>
                {selectedZone.status === 'approved' ? '✓ Approved' : 'Pending Review'}
              </span>
            </div>
          </div>

          <div className="zone-stats">
            <h3>Area Stats</h3>
            <div className="stat-grid">
              <div className="stat-item">
                <span className="label">Social Vibe</span>
                <span className="value">{selectedZone.stats.social}</span>
              </div>
              <div className="stat-item">
                <span className="label">Sleep Schedule</span>
                <span className="value">{selectedZone.stats.sleep}</span>
              </div>
              <div className="stat-item">
                <span className="label">Athletes</span>
                <span className="value">{selectedZone.stats.athletes}</span>
              </div>
            </div>
          </div>

          <div className="zone-insights">
            <h3>Key Insights</h3>
            <ul className="insight-list">
              {selectedZone.insights.map((insight, idx) => (
                <li key={idx} className="insight-item">
                  <span className="bullet">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          <div className="zone-rooms">
            <h3>Rooms ({zoneRooms.length})</h3>
            <div className="room-list">
              {zoneRooms.map(room => (
                <div key={room.id} className="room-list-item">
                  <div className="room-info">
                    <strong>Room {room.id}</strong>
                    <span className="students">{room.students.join(' & ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="approval-section">
            <div className="approval-info">
              <span className="info-icon">💡</span>
              <p>Approving this section marks it complete in the progress tracker. Review all rooms before approving.</p>
            </div>
            {selectedZone.status !== 'approved' ? (
              <button 
                className="action-btn approve"
                onClick={() => onApproveZone(selectedZone.id)}
              >
                ✓ Approve This Section
              </button>
            ) : (
              <div className="approved-indicator">
                <span>✓ Section Approved</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Empty state - no selection
  if (!selectedRoom && !swapSource) {
    return (
      <div className="issue-panel empty">
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h3>Review Dorm Assignments</h3>
          <div className="instructions">
            <p><strong>1.</strong> Click a section tab below to review & approve</p>
            <p><strong>2.</strong> Click any room to see details & swap</p>
          </div>
        </div>
      </div>
    );
  }

  // Swap mode active - room selected for swap
  if (swapSource) {
    return (
      <div className="issue-panel swap-mode">
        <div className="panel-header swap-header">
          <div className="swap-mode-badge">SWAP MODE</div>
          <button className="close-btn" onClick={onCancelSwap} aria-label="Close">
            ×
          </button>
        </div>
        <div className="panel-content">
          <div className="swap-source-card">
            <span className="swap-label">Swapping Room</span>
            <h4>Room {swapSource.id}</h4>
            <p className="students">{swapSource.students.join(' & ')}</p>
          </div>
          
          <div className="swap-instruction-box">
            <div className="swap-arrow-icon">→</div>
            <p>Click another room on the floor plan to complete the swap</p>
          </div>

          <div className="swap-room-stats">
            <h4>Current Room Info</h4>
            <div className="mini-stats">
              <div className="mini-stat">
                <span>Social</span>
                <strong>{swapSource.preferences.social}/10</strong>
              </div>
              <div className="mini-stat">
                <span>Sleep</span>
                <strong className="capitalize">{swapSource.preferences.sleep}</strong>
              </div>
              <div className="mini-stat">
                <span>Athlete</span>
                <strong>{swapSource.preferences.varsity ? 'Yes' : 'No'}</strong>
              </div>
            </div>
          </div>

          <button className="action-btn cancel" onClick={onCancelSwap}>
            Cancel Swap
          </button>
        </div>
      </div>
    );
  }

  // Room info display
  if (selectedRoom) {
    return (
      <div className="issue-panel">
        <div className="panel-header">
          <h3 className="panel-title">Room {selectedRoom.id}</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="panel-content">
          <div className="room-info-section">
            <h4 className="section-title">Occupants</h4>
            <div className="wireframe-box">
              <p className="wireframe-text">{selectedRoom.students.join(' & ')}</p>
            </div>
          </div>

          <div className="room-info-section">
            <h4 className="section-title">Room Attributes</h4>
            <div className="lens-stats">
               <div className={`stat-item ${activeLens === 'social' ? 'highlight' : ''}`}>
                 <span className="stat-label">Social Energy</span>
                 <span className="stat-value">{selectedRoom.preferences.social}/10</span>
               </div>
               <div className={`stat-item ${activeLens === 'sleep' ? 'highlight' : ''}`}>
                 <span className="stat-label">Sleep Schedule</span>
                 <span className="stat-value capitalize">{selectedRoom.preferences.sleep}</span>
               </div>
               <div className={`stat-item ${activeLens === 'varsity' ? 'highlight' : ''}`}>
                 <span className="stat-label">Varsity Status</span>
                 <span className="stat-value">{selectedRoom.preferences.varsity ? 'Athlete' : 'Non-Athlete'}</span>
               </div>
            </div>
          </div>

          {roomContext && roomContext.length > 0 && (
            <div className="room-info-section">
              <h4 className="section-title">Location Considerations</h4>
              <ul className="context-list">
                {roomContext.map((insight, i) => (
                  <li key={i} className="context-item">
                    <span className="context-icon">📍</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="room-info-section">
            <h4 className="section-title">Interests</h4>
            <div className="tags">
              {selectedRoom.preferences.interests.map((interest, i) => (
                <span key={i} className="tag">{interest}</span>
              ))}
            </div>
          </div>

          <div className="panel-actions">
            <button 
              className="action-btn primary"
              onClick={() => onInitiateSwap(selectedRoom)}
            >
              ⇄ Swap This Room
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default IssuePanel;
