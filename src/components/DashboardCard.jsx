import { Link } from 'react-router-dom'
import './DashboardCard.css'

function DashboardCard({ title, icon, current, total, to, locked = false, completed = false }) {
  const progress = Math.round((current / total) * 100) || 0
  
  const handleLockedClick = () => {
    alert('Complete the previous stage first!');
  };
  
  const cardContent = (
    <>
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">{title}</h2>
        {locked && <span className="lock-icon">🔒</span>}
        {completed && !locked && <span className="complete-icon">✓</span>}
      </div>
      
      <div className={`dashboard-card-visual ${locked ? 'locked' : ''}`}>
        {icon}
      </div>
      
      <div className="dashboard-card-progress">
        <div className="progress-text">{current}/{total}</div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${locked ? 'locked' : ''}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {locked && (
          <div className="locked-message">
            Complete previous stage to unlock
          </div>
        )}
      </div>
    </>
  );
  
  if (locked) {
    return (
      <div className="dashboard-card locked" onClick={handleLockedClick}>
        {cardContent}
      </div>
    );
  }
  
  return (
    <Link to={to} className={`dashboard-card ${completed ? 'completed' : ''}`}>
      {cardContent}
    </Link>
  )
}

export default DashboardCard

