import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        Stanford | Frosh Matching Portal
      </Link>
      
      <nav className="header-nav">
        <button className="header-icon-btn" aria-label="Profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4"/>
            <path d="M20 21a8 8 0 1 0-16 0"/>
          </svg>
        </button>
      </nav>
    </header>
  )
}

export default Header

