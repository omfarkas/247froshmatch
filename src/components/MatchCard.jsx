import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import { User, ChevronDown, Star, AlertCircle } from 'lucide-react';
import './MatchCard.css';

const MatchCard = ({ match, defaultPosition, onDrag, onStop, onClick, isScissorMode, isStatic, isSelected, onToggleSelect, isHighlighted, className }) => {
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    if (isScissorMode) return; // Don't expand in scissor mode
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleDividerClick = (e) => {
    console.log('Divider clicked, scissorMode:', isScissorMode);
    if (isScissorMode) {
      e.stopPropagation();
      console.log('Calling onClick for match:', match.id);
      if (onClick) onClick(); // Trigger the scissor action
    }
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
      className={`match-card-container ${isStatic ? 'static' : ''} ${isScissorMode ? 'scissor-target' : ''} ${isExpanded ? 'expanded' : ''} ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''} ${className || ''}`}
      onClick={handleDividerClick}
      onContextMenu={handleContextMenu}
      style={isStatic ? { position: 'relative', left: 'auto', top: 'auto', transform: 'none' } : {}}
    >
      {/* Warning icon badge in top right corner */}
      {match.hasWarning && (
        <div className="warning-badge">
          <AlertCircle size={30} color="#E53935" strokeWidth={2.5} />
        </div>
      )}
      
      <div className="match-card-main">
        <div className="match-card-header">
          <div className="match-person">
            <span className="person-name-large">{match.person1}</span>
          </div>

          <div
            className={`divider ${isScissorMode ? 'scissor-active' : ''}`}
            onClick={handleDividerClick}
          />

          <div className="match-person">
            <span className="person-name-large">{match.person2}</span>
          </div>

          {match.person3 && (
            <>
              <div
                className={`divider ${isScissorMode ? 'scissor-active' : ''}`}
                onClick={handleDividerClick}
              />
              <div className="match-person">
                <span className="person-name-large">{match.person3}</span>
              </div>
            </>
          )}

          {match.person4 && (
            <>
              <div
                className={`divider ${isScissorMode ? 'scissor-active' : ''}`}
                onClick={handleDividerClick}
              />
              <div className="match-person">
                <span className="person-name-large">{match.person4}</span>
              </div>
            </>
          )}
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
            {match.person3 && (
              <div className="note-item">
                <span className="notes-label">{match.person3}: </span>
                {match.person3Notes || "No notes"}
              </div>
            )}
            {match.person4 && (
              <div className="note-item">
                <span className="notes-label">{match.person4}: </span>
                {match.person4Notes || "No notes"}
              </div>
            )}
          </div>

          <div className="rating-row">
            <button 
              className="details-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/match-details', { state: { match } });
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
