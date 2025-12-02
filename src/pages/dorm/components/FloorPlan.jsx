import './FloorPlan.css';

function FloorPlan({ floor, selectedRoom, selectedIssue, onRoomClick }) {
  const isRoomHighlighted = (roomId) => {
    if (selectedRoom?.id === roomId) return 'selected';
    if (selectedIssue?.affectedRooms?.includes(roomId)) return 'issue';
    return '';
  };

  return (
    <div className="floor-plan-container">
      <div className="floor-plan-label">
        <span className="area-label">Area of Concern</span>
      </div>
      
      <div className="floor-plan-wrapper">
        <svg className="floor-plan" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          {/* Floor outline */}
          <rect
            x="30"
            y="30"
            width="340"
            height="340"
            fill="none"
            stroke="var(--color-text-primary)"
            strokeWidth="3"
          />

          {/* Special areas */}
          {floor.specialAreas.map((area, idx) => (
            <g key={idx}>
              <rect
                x={area.position.x + 30}
                y={area.position.y + 30}
                width="60"
                height="60"
                fill="var(--color-surface-alt)"
                stroke="var(--color-border)"
                strokeWidth="2"
                rx="4"
              />
              <text
                x={area.position.x + 60}
                y={area.position.y + 65}
                textAnchor="middle"
                fontSize="11"
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
            return (
              <g key={room.id}>
                <rect
                  x={room.position.x + 30}
                  y={room.position.y + 30}
                  width="50"
                  height="50"
                  className={`room ${highlight}`}
                  onClick={() => onRoomClick(room)}
                  rx="4"
                />
                <text
                  x={room.position.x + 55}
                  y={room.position.y + 60}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--color-text-primary)"
                  fontWeight="500"
                  pointerEvents="none"
                >
                  {room.id}
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
