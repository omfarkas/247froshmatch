import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Bell, User } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import './Header.css';

const Header = ({ onHelpClick }) => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        stanford | resident department
      </div>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Help" onClick={onHelpClick}>
          <HelpCircle size={24} />
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={24} />
        </button>
        <button 
          className="icon-btn" 
          aria-label="Profile"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <User size={24} />
        </button>
      </div>
      {showProfileDropdown && <ProfileDropdown onClose={() => setShowProfileDropdown(false)} />}
    </header>
  );
};

export default Header;
