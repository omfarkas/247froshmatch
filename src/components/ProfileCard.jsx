import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import { ChevronDown } from "lucide-react";
import "./ProfileCard.css";

const ProfileCard = ({
  profile,
  defaultPosition,
  onStop,
  onStart,
  isInWorkspace,
}) => {
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Student info tooltip component - matching IssuePanel style with stats
  const StudentTooltip = ({ name, notes, sleep, social, athlete }) => (
    <div className="student-tooltip">
      <div className="tooltip-name">{name}</div>
      <div className="tooltip-stats">
        <div className="tooltip-stat">
          <span className="stat-label">Social</span>
          <span className="stat-value">{social || "—"}/10</span>
        </div>
        <div className="tooltip-stat">
          <span className="stat-label">Sleep</span>
          <span className="stat-value">{sleep || "—"}</span>
        </div>
        <div className="tooltip-stat">
          <span className="stat-label">Athlete</span>
          <span className="stat-value">{athlete ? "Yes" : "No"}</span>
        </div>
      </div>
      {notes && <div className="tooltip-notes">{notes}</div>}
    </div>
  );

  const cardContent = (
    <div
      ref={nodeRef}
      className={`profile-card-container ${isExpanded ? "expanded" : ""}`}
    >
      <div
        className="profile-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="person-name-large">{profile.name}</span>

        {isHovered && !isExpanded && isInWorkspace && (
          <StudentTooltip
            name={profile.name}
            notes={profile.notes}
            sleep={profile.sleep}
            social={profile.social}
            athlete={profile.athlete}
          />
        )}

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
                navigate("/match-details", { state: { match: matchData } });
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
      defaultPosition={{
        x: defaultPosition?.x || 0,
        y: defaultPosition?.y || 0,
      }}
      onStop={(e, data) => onStop(profile.id, data)}
      onStart={(e, data) => onStart && onStart(profile.id, data)}
    >
      {cardContent}
    </Draggable>
  );
};

export default ProfileCard;
