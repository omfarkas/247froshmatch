import './IssueList.css';

function IssueList({ issues, allIssues, onIssueClick, selectedIssue }) {
  const totalIssues = allIssues.length;
  const currentFloorIssues = issues.length;

  return (
    <div className="issue-list-container">
      <div className="issue-list-header">
        <h3 className="issue-list-title">Areas of Concern</h3>
        <div className="issue-count">
          <span className="count-current">{currentFloorIssues}</span>
          <span className="count-separator">/</span>
          <span className="count-total">{totalIssues} total</span>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="no-issues">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          <p>All issues resolved for this floor!</p>
        </div>
      ) : (
        <div className="issue-list">
          {issues.map((issue, index) => (
            <button
              key={issue.id}
              className={`issue-item ${selectedIssue?.id === issue.id ? 'selected' : ''}`}
              onClick={() => onIssueClick(issue)}
            >
              <div className="issue-item-header">
                <span className="issue-number">{index + 1}</span>
                <span 
                  className={`issue-severity ${issue.severity}`}
                  aria-label={`${issue.severity} severity`}
                />
              </div>
              <div className="issue-item-content">
                <h4 className="issue-item-title">{issue.title}</h4>
                <p className="issue-item-preview">{issue.description}</p>
              </div>
              <div className="issue-item-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {currentFloorIssues > 0 && (
        <div className="issue-list-footer">
          <button className="bulk-action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Accept All Recommendations
          </button>
          <button className="bulk-action-btn secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            Leave All As-Is
          </button>
        </div>
      )}
    </div>
  );
}

export default IssueList;
