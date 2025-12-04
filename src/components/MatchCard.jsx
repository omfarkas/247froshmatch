import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { User, ChevronDown, Star } from 'lucide-react';
import './MatchCard.css';

const MatchCard = ({ match, defaultPosition, onDrag, onStop, onClick, isScissorMode, isStatic, isSelected, onToggleSelect, isHighlighted }) => {
  const nodeRef = useRef(null);
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
      className={`match-card-container ${isStatic ? 'static' : ''} ${isScissorMode ? 'scissor-target' : ''} ${isExpanded ? 'expanded' : ''} ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`}
      onClick={handleDividerClick}
      onContextMenu={handleContextMenu}
      style={isStatic ? { position: 'relative', left: 'auto', top: 'auto', transform: 'none' } : {}}
    >
      <div className="match-card-main">
        <div className="match-card-header">
          <div className="match-person">
            <User size={40} strokeWidth={2} />
            <span className="person-name">{match.person1}</span>
          </div>

          <div
            className={`divider ${isScissorMode ? 'scissor-active' : ''}`}
            onClick={handleDividerClick}
          />

          <div className="match-person">
            <User size={40} strokeWidth={2} />
            <span className="person-name">{match.person2}</span>
          </div>

          {match.person3 && (
            <>
              <div
                className={`divider ${isScissorMode ? 'scissor-active' : ''}`}
                onClick={handleDividerClick}
              />
              <div className="match-person">
                <User size={40} strokeWidth={2} />
                <span className="person-name">{match.person3}</span>
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
            <span className="notes-label">Notes: </span>
            {match.notes}
          </div>

          <div className="rating-row">
            <button className="details-btn">details</button>
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
