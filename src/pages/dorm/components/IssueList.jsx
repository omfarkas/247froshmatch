import './IssueList.css';

function IssueList({ issues, allIssues, onIssueClick, selectedIssue }) {
  const totalIssues = allIssues.length;
  
  // Group issues by zone
  const issuesByZone = issues.reduce((acc, issue) => {
    const zone = issue.zone || 'General';
    if (!acc[zone]) acc[zone] = [];
    acc[zone].push(issue);
    return acc;
  }, {});

  const zones = Object.keys(issuesByZone);

  return (
    <div className="issue-list-container">
      <div className="issue-list-header">
        <h3 className="issue-list-title">Algorithmic Insights</h3>
        <div className="issue-count">
          <span className="count-current">{issues.length}</span>
          <span className="count-separator">/</span>
          <span className="count-total">{totalIssues} active</span>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="no-issues">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          <p>No specific insights for this floor.</p>
        </div>
      ) : (
        <div className="issue-list">
          {zones.map(zone => (
            <div key={zone} className="zone-group">
              <div className="zone-header">
                <span className="zone-title">{zone}</span>
                <button className="zone-approve-btn">
                  Approve Zone
                </button>
              </div>
              {issuesByZone[zone].map((issue, index) => (
                <button
                  key={issue.id}
                  className={`issue-item ${selectedIssue?.id === issue.id ? 'selected' : ''}`}
                  onClick={() => onIssueClick(issue)}
                >
                  <div className="issue-item-header">
                    <span className="issue-number">{index + 1}</span>
                    <span 
                      className={`issue-severity ${issue.severity}`}
                      aria-label={`${issue.severity} priority`}
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
          ))}
        </div>
      )}

      {issues.length > 0 && (
        <div className="issue-list-footer">
          <button className="bulk-action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Approve All Zones
          </button>
        </div>
      )}
    </div>
  );
}

export default IssueList;
