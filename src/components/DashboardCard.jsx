import { Link } from 'react-router-dom'
import './DashboardCard.css'

function DashboardCard({ title, icon, current, total, to }) {
  const progress = Math.round((current / total) * 100)
  
  return (
    <Link to={to} className="dashboard-card">
      <h2 className="dashboard-card-title">{title}</h2>
      
      <div className="dashboard-card-visual">
        {icon}
      </div>
      
      <div className="dashboard-card-progress">
        <div className="progress-text">{current}/{total}</div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Link>
  )
}

export default DashboardCard

