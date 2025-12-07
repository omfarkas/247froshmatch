import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import { ChevronDown } from 'lucide-react';
import './ProfileCard.css';

const ProfileCard = ({ profile, defaultPosition, onStop, onStart }) => {
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const cardContent = (
    <div
      ref={nodeRef}
      className={`profile-card-container ${isExpanded ? 'expanded' : ''}`}
    >
      <div className="profile-card">
        <span className="person-name-large">{profile.name}</span>
        
        <div className="expand-btn" onClick={toggleExpand}>
          <ChevronDown size={20} className={isExpanded ? "rotated" : ""} />
        </div>
      </div>

      {isExpanded && (
        <div className="match-card-details">
          <div className="notes-box">
            <div className="note-item">
              <span className="notes-label">{profile.name}: </span>
              {profile.notes || "No notes"}
            </div>
          </div>

          <div className="rating-row">
            <button 
              className="details-btn"
              onClick={(e) => {
                e.stopPropagation();
                // Construct a match-like object for the details page
                const matchData = {
                  id: profile.id,
                  person1: profile.name,
                  person2: null, // Single profile
                  person1Notes: profile.notes,
                  hasWarning: false, // Default for single
                  // Add other necessary fields if MatchDetails expects them
                };
                navigate('/match-details', { state: { match: matchData } });
              }}
            >
              details
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: defaultPosition?.x || 0, y: defaultPosition?.y || 0 }}
      onStop={(e, data) => onStop(profile.id, data)}
      onStart={(e, data) => onStart && onStart(profile.id, data)}
    >
      {cardContent}
    </Draggable>
  );
};

export default ProfileCard;
