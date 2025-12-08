import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import { User, ChevronDown, Star, AlertCircle } from "lucide-react";
import "./MatchCard.css";

const MatchCard = ({
  match,
  defaultPosition,
  onDrag,
  onStop,
  onClick,
  isScissorMode,
  isStatic,
  isSelected,
  onToggleSelect,
  isHighlighted,
  className,
}) => {
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredPerson, setHoveredPerson] = useState(null);

  const toggleExpand = (e) => {
    if (isScissorMode) return; // Don't expand in scissor mode
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Only show tooltips on canvas (workspace), not sidebar
  const isInWorkspace = className?.includes("canvas-card");

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

  const handleDividerClick = (e) => {
    e.stopPropagation();
    console.log("Divider clicked, triggering split for match:", match.id);
    if (onClick) onClick(); // Trigger the split action
  };

  const handleContextMenu = (e) => {
    if (isStatic && onToggleSelect) {
      e.preventDefault(); // Prevent default context menu
      onToggleSelect(match.id);
    }
  };

  const cardContent = (
    <div
      ref={isStatic ? null : nodeRef}
      className={`match-card-container ${isStatic ? "static" : ""} ${
        isScissorMode ? "scissor-target" : ""
      } ${isExpanded ? "expanded" : ""} ${isSelected ? "selected" : ""} ${
        isHighlighted ? "highlighted" : ""
      } ${className || ""}`}
      onContextMenu={handleContextMenu}
      style={
        isStatic
          ? {
              position: "relative",
              left: "auto",
              top: "auto",
              transform: "none",
            }
          : {}
      }
    >
      {/* Warning icon badge in top right corner */}
      {match.hasWarning && (
        <div className="warning-badge">
          <AlertCircle size={30} color="#E53935" strokeWidth={2.5} />
        </div>
      )}

      <div className="match-card-main">
        <div className="match-card-header">
          <div
            className="match-person"
            onMouseEnter={() => isInWorkspace && setHoveredPerson("person1")}
            onMouseLeave={() => setHoveredPerson(null)}
          >
            <span className="person-name-large">{match.person1}</span>
            {isInWorkspace && hoveredPerson === "person1" && (
              <StudentTooltip
                name={match.person1}
                notes={match.person1Notes}
                sleep={match.person1Sleep}
                social={match.person1Social}
                athlete={match.person1Athlete}
              />
            )}
          </div>

          <div className="divider" onClick={handleDividerClick} />

          <div
            className="match-person"
            onMouseEnter={() => isInWorkspace && setHoveredPerson("person2")}
            onMouseLeave={() => setHoveredPerson(null)}
          >
            <span className="person-name-large">{match.person2}</span>
            {isInWorkspace && hoveredPerson === "person2" && (
              <StudentTooltip
                name={match.person2}
                notes={match.person2Notes}
                sleep={match.person2Sleep}
                social={match.person2Social}
                athlete={match.person2Athlete}
              />
            )}
          </div>
        </div>

        {!isExpanded && !isScissorMode && (
          <div className="expand-btn" onClick={toggleExpand}>
            <ChevronDown size={20} />
          </div>
        )}

        {isExpanded && (
          <div className="expand-btn" onClick={toggleExpand}>
            <ChevronDown size={20} className="rotated" />
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="match-card-details">
          <div className="notes-box">
            <div className="note-item">
              <span className="notes-label">{match.person1}: </span>
              {match.person1Notes || "No notes"}
            </div>
            <div className="note-item">
              <span className="notes-label">{match.person2}: </span>
              {match.person2Notes || "No notes"}
            </div>
          </div>

          <div className="rating-row">
            <button
              className="details-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/match-details", { state: { match } });
              }}
            >
              details
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isStatic) {
    return cardContent;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={defaultPosition}
      onDrag={onDrag ? (e, data) => onDrag(match.id, data) : undefined}
      onStop={(e, data) => onStop(match.id, data)}
      disabled={isScissorMode}
    >
      {cardContent}
    </Draggable>
  );
};

export default MatchCard;
