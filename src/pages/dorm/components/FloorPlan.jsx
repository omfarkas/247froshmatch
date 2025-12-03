import './FloorPlan.css';

function FloorPlan({ floor, issues = [], selectedRoom, selectedIssue, onRoomClick, onIssueClick, activeLens, swapSource }) {
  const isRoomHighlighted = (roomId) => {
    if (swapSource?.id === roomId) return 'swap-source';
    if (selectedRoom?.id === roomId) return 'selected';
    if (selectedIssue?.affectedRooms?.includes(roomId)) return 'issue';
    if (swapSource) return 'swap-target'; // All other rooms are potential targets
    return '';
  };

  const getRoomStyle = (room) => {
    if (activeLens === 'none') return {};

    // Base color (Primary Blue-ish)
    const hue = 225; 
    const sat = 70;
    
    // Calculate intensity (0.0 to 1.0)
    let intensity = 0;
    
    if (activeLens === 'social') {
      // 1-10 scale
      intensity = (room.preferences.social - 1) / 9;
    } else if (activeLens === 'sleep') {
      // Early (Light) -> Late (Dark)
      switch (room.preferences.sleep) {
        case 'early': intensity = 0.1; break;
        case 'mixed': intensity = 0.5; break;
        case 'late': intensity = 0.9; break;
        default: intensity = 0;
      }
    } else if (activeLens === 'varsity') {
      // Binary
      intensity = room.preferences.varsity ? 0.8 : 0.1;
    }

    // Map intensity to Lightness (Light=95%, Dark=40%)
    // Higher intensity = Darker color
    const lightness = 95 - (intensity * 55);
    const strokeLightness = Math.max(lightness - 20, 30);

    return {
      fill: `hsl(${hue}, ${sat}%, ${lightness}%)`,
      stroke: `hsl(${hue}, ${sat}%, ${strokeLightness}%)`,
      transition: 'fill 0.3s ease, stroke 0.3s ease'
    };
  };

  const getIssuePosition = (issue) => {
    if (!issue.affectedRooms || issue.affectedRooms.length === 0) return null;
    const room = floor.rooms.find(r => r.id === issue.affectedRooms[0]);
    if (!room) return null;
    
    return {
      x: room.position.x + 15,
      y: room.position.y + 15
    };
  };

  return (
    <div className="floor-plan-container">
      <div className="floor-plan-wrapper">
        <svg className="floor-plan" viewBox="0 0 870 460" preserveAspectRatio="xMidYMid meet">
          {/* Floor outline */}
          <rect
            x="10"
            y="10"
            width="850"
            height="440"
            fill="none"
            stroke="var(--color-text-primary)"
            strokeWidth="3"
            rx="8"
          />

          {/* Special areas */}
          {floor.specialAreas.map((area, idx) => (
            <g key={idx}>
              <rect
                x={area.position.x}
                y={area.position.y}
                width={area.width || 60}
                height={area.height || 60}
                fill="var(--color-surface-alt)"
                stroke="var(--color-border)"
                strokeWidth="2"
                rx="4"
              />
              <text
                x={area.position.x + (area.width || 60) / 2}
                y={area.position.y + (area.height || 60) / 2 + 5}
                textAnchor="middle"
                fontSize="12"
                fill="var(--color-text-secondary)"
                fontWeight="600"
              >
                {area.label}
              </text>
            </g>
          ))}

          {/* Rooms */}
          {floor.rooms.map((room) => {
            const highlight = isRoomHighlighted(room.id);
            const dynamicStyle = getRoomStyle(room);
            
            return (
              <g key={room.id} className={`room-group ${highlight}`}>
                <rect
                  x={room.position.x}
                  y={room.position.y}
                  width="50"
                  height="50"
                  className={`room ${highlight}`}
                  onClick={() => onRoomClick(room)}
                  rx="4"
                  style={dynamicStyle}
                />
                <text
                  x={room.position.x + 25}
                  y={room.position.y + 30}
                  textAnchor="middle"
                  fontSize="10"
                  fill={activeLens !== 'none' && getRoomStyle(room).fill && parseInt(getRoomStyle(room).fill.split(',')[2]) < 60 ? 'white' : 'var(--color-text-primary)'}
                  fontWeight="500"
                  pointerEvents="none"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                >
                  {room.id}
                </text>
              </g>
            );
          })}

          {/* Issue Icons */}
          {!swapSource && issues.map((issue, index) => {
            const pos = getIssuePosition(issue);
            if (!pos) return null;
            const isSelected = selectedIssue?.id === issue.id;
            
            return (
              <g 
                key={issue.id} 
                onClick={(e) => {
                  e.stopPropagation();
                  onIssueClick(issue);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={pos.x + 30}
                  cy={pos.y + 30}
                  r="12"
                  className={`issue-icon-bg ${isSelected ? 'selected' : ''}`}
                />
                <text
                  x={pos.x + 30}
                  y={pos.y + 34}
                  textAnchor="middle"
                  className={`issue-icon-text ${isSelected ? 'selected' : ''}`}
                >
                  {index + 1}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="floor-plan-footer">
          <span className="floor-label">{floor.label}</span>
        </div>
      </div>
    </div>
  );
}

export default FloorPlan;
