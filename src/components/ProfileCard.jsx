import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { User } from 'lucide-react';
import './ProfileCard.css';

const ProfileCard = ({ profile, defaultPosition, onStop, onStart }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: defaultPosition?.x || 0, y: defaultPosition?.y || 0 }}
      onStop={(e, data) => onStop(profile.id, data)}
      onStart={(e, data) => onStart && onStart(profile.id, data)}
    >
      <div ref={nodeRef} className="profile-card-container">
        <div className="profile-card">
          <User size={60} strokeWidth={1.5} />
          <span className="profile-name">{profile.name}</span>
        </div>
      </div>
    </Draggable>
  );
};

export default ProfileCard;
