import "./IssuePanel.css";

function IssuePanel({
  selectedRoom,
  selectedZone,
  zoneRooms,
  roomContext,
  onApproveZone,
  onUnapproveZone,
  onClose,
  activeLens,
  swapSource,
  onInitiateSwap,
  onCancelSwap,
  floor,
}) {
  // Zone review panel
  if (selectedZone) {
    return (
      <div className="issue-panel">
        <div className="panel-header">
          <h2>{selectedZone.label}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="panel-content">
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

          {selectedZone.considerations &&
            selectedZone.considerations.length > 0 && (
              <div className="zone-considerations">
                <h3>Before You Approve</h3>
                <ul className="insight-list">
                  {selectedZone.considerations.map((consideration, idx) => (
                    <li key={idx} className="insight-item consideration">
                      <span className="bullet">→</span>
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <div className="approval-section">
            {selectedZone.status !== "approved" ? (
              <button
                className="action-btn approve"
                onClick={() => onApproveZone(selectedZone.id)}
              >
                ✓ Approve This Section
              </button>
            ) : (
              <button
                className="action-btn unapprove"
                onClick={() => onUnapproveZone(selectedZone.id)}
              >
                ↻ Unapprove Section
              </button>
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
          <div className="help-section">
            <div className="help-item">
              <span className="help-number">1</span>
              <p>Click rooms to view details and initiate swaps</p>
            </div>
            <div className="help-item">
              <span className="help-number">2</span>
              <p>Review sections and approve</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper to get student display info
  const getStudentInfo = (student) => {
    if (typeof student === "string") return { name: student, location: null };
    if (student && student.firstName) {
      return {
        name: `${student.firstName} ${student.lastName}`,
        location: student.location || student.city,
      };
    }
    return { name: "Unknown", location: null };
  };

  // Swap mode active - room selected for swap (show full info + swap indicator)
  if (swapSource) {
    return (
      <div className="issue-panel swap-mode">
        <div className="panel-header">
          <h3 className="panel-title">Room {swapSource.id}</h3>
          <button
            className="close-btn"
            onClick={onCancelSwap}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="panel-content">
          {/* Swap mode indicator */}
          <div className="swap-mode-banner">
            <span>Click another room to swap</span>
          </div>

          {/* Occupants */}
          <div style={{ marginBottom: "12px" }}>
            {swapSource.students.map((student, idx) => {
              const info = getStudentInfo(student);
              return (
                <div key={idx} style={{ marginBottom: "6px" }}>
                  <span style={{ fontWeight: "600" }}>{info.name}</span>
                  {info.location && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "12px",
                        marginLeft: "6px",
                      }}
                    >
                      — {info.location}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Compact stats row */}
          <div
            className="compact-stats"
            style={{ display: "flex", gap: "12px", marginBottom: "12px" }}
          >
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px",
                background: "var(--color-surface-alt)",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#666" }}>Social</div>
              <div style={{ fontWeight: "bold" }}>
                {swapSource.preferences.social}/10
              </div>
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px",
                background: "var(--color-surface-alt)",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#666" }}>Sleep</div>
              <div style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                {swapSource.preferences.sleep}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px",
                background: "var(--color-surface-alt)",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#666" }}>Athlete</div>
              <div style={{ fontWeight: "bold" }}>
                {swapSource.preferences.varsity ? "Yes" : "No"}
              </div>
            </div>
          </div>

          {/* Interests with header */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#666",
                marginBottom: "6px",
                fontWeight: "500",
              }}
            >
              Interests
            </div>
            <div
              className="tags"
              style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
            >
              {swapSource.preferences.interests.map((interest, i) => (
                <span
                  key={i}
                  className="tag"
                  style={{ fontSize: "11px", padding: "4px 8px" }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <button
            className="action-btn cancel"
            onClick={onCancelSwap}
            style={{ width: "100%" }}
          >
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
          {/* Occupants */}
          <div style={{ marginBottom: "12px" }}>
            {selectedRoom.students.map((student, idx) => {
              const info = getStudentInfo(student);
              return (
                <div key={idx} style={{ marginBottom: "6px" }}>
                  <span style={{ fontWeight: "600" }}>{info.name}</span>
                  {info.location && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "12px",
                        marginLeft: "6px",
                      }}
                    >
                      — {info.location}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Compact stats row */}
          <div
            className="compact-stats"
            style={{ display: "flex", gap: "12px", marginBottom: "12px" }}
          >
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px",
                background: "var(--color-surface-alt)",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#666" }}>Social</div>
              <div style={{ fontWeight: "bold" }}>
                {selectedRoom.preferences.social}/10
              </div>
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px",
                background: "var(--color-surface-alt)",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#666" }}>Sleep</div>
              <div style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                {selectedRoom.preferences.sleep}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px",
                background: "var(--color-surface-alt)",
                borderRadius: "6px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#666" }}>Athlete</div>
              <div style={{ fontWeight: "bold" }}>
                {selectedRoom.preferences.varsity ? "Yes" : "No"}
              </div>
            </div>
          </div>

          {/* Interests with header */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#666",
                marginBottom: "6px",
                fontWeight: "500",
              }}
            >
              Interests
            </div>
            <div
              className="tags"
              style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
            >
              {selectedRoom.preferences.interests.map((interest, i) => (
                <span
                  key={i}
                  className="tag"
                  style={{ fontSize: "11px", padding: "4px 8px" }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Location insights - condensed */}
          {roomContext && roomContext.length > 0 && (
            <div
              style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}
            >
              {roomContext.slice(0, 2).map((insight, i) => (
                <div key={i} style={{ marginBottom: "4px" }}>
                  📍 {insight}
                </div>
              ))}
            </div>
          )}

          <button
            className="action-btn primary"
            onClick={() => onInitiateSwap(selectedRoom)}
            style={{ width: "100%" }}
          >
            Swap This Room
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default IssuePanel;
