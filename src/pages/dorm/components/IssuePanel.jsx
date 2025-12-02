import './IssuePanel.css';

function IssuePanel({ selectedRoom, selectedIssue, onAccept, onReject, onClose }) {
  if (!selectedRoom && !selectedIssue) {
    return (
      <div className="issue-panel empty">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p>Select a room or issue to view details</p>
        </div>
      </div>
    );
  }

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
            <h4 className="section-title">Roommate Pair</h4>
            <div className="wireframe-box">
              <p className="wireframe-text">Student A & Student B</p>
              <p className="wireframe-subtext">Social: 8/10 | Quiet: 4/10</p>
            </div>
          </div>

          <div className="room-info-section">
            <h4 className="section-title">Interests</h4>
            <div className="wireframe-box">
              <p className="wireframe-text">Interest 1, Interest 2, Interest 3</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedIssue) {
    return (
      <div className="issue-panel">
        <div className="panel-header">
          <div className="issue-header-content">
            <span className="severity-badge">
              {selectedIssue.severity}
            </span>
            <h3 className="panel-title">{selectedIssue.title}</h3>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="panel-content">
          <div className="issue-description">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            <p>{selectedIssue.description}</p>
          </div>

          {selectedIssue.recommendation && (
            <div className="recommendation-section">
              <h4 className="section-title">Recommendation</h4>
              
              {selectedIssue.recommendation.action === 'swap' ? (
                <>
                  <div className="swap-visual">
                    <div className="swap-room">
                      <span className="room-number">{selectedIssue.recommendation.fromRoom}</span>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4"/>
                    </svg>
                    <div className="swap-room">
                      <span className="room-number">{selectedIssue.recommendation.toRoom}</span>
                    </div>
                  </div>
                  <p className="recommendation-reason">
                    {selectedIssue.recommendation.reason}
                  </p>
                  
                  <div className="action-buttons">
                    <button 
                      className="action-btn accept"
                      onClick={() => onAccept(selectedIssue.id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Accept
                    </button>
                    <button 
                      className="action-btn reject"
                      onClick={() => onReject(selectedIssue.id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                      Reject
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="recommendation-reason">
                    {selectedIssue.recommendation.reason}
                  </p>
                  <div className="action-buttons">
                    <button 
                      className="action-btn acknowledge"
                      onClick={() => onAccept(selectedIssue.id)}
                    >
                      Acknowledge
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default IssuePanel;
