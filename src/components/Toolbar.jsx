import React from 'react';
import { Scissors, Mars, Venus } from 'lucide-react';
import './Toolbar.css';

const Toolbar = ({ scissorMode, onToggleScissor, genderFilter, onGenderChange }) => {
  return (
    <div className="toolbar-container">
      <button 
        className={`toolbar-btn ${scissorMode ? 'active' : ''}`} 
        onClick={onToggleScissor}
        aria-label="Split Match"
      >
        <Scissors size={32} />
      </button>
      <div className="toolbar-divider"></div>
      
      <div className="gender-slider-container">
        <div 
          className={`gender-slider ${genderFilter}`} 
          onClick={() => {
            if (genderFilter === 'all') onGenderChange('male');
            else if (genderFilter === 'male') onGenderChange('female');
            else onGenderChange('all');
          }}
        >
          <div className="slider-pill"></div>
          <div className="gender-icon-wrapper">
            <Mars size={24} className={genderFilter === 'male' ? 'active' : ''} />
          </div>
          <div className="gender-icon-wrapper">
            <Venus size={24} className={genderFilter === 'female' ? 'active' : ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
