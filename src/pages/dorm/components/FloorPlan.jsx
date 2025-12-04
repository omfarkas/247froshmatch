import './FloorPlan.css';

function FloorPlan({ 
  floor, 
  zones,
  selectedRoom, 
  selectedZone,
  onRoomClick, 
  onZoneClick,
  activeLens,
  swapSource 
}) {
  // Extract zone type from zone ID (e.g., "floor1-west" -> "west")
  const getZoneType = (zoneId) => {
    return zoneId.split('-').slice(1).join('-');
  };

  const getZoneTypeForRoom = (room) => {
    if (room.zone === 'West Wing') return 'west';
    if (room.zone === 'East Wing') return 'east';
    if (room.zone === 'North Hall') {
      return room.position.x < 420 ? 'north-west' : 'north-east';
    }
    return null;
  };

  const isRoomHighlighted = (roomId) => {
    if (swapSource?.id === roomId) return 'swap-source';
    if (selectedRoom?.id === roomId) return 'selected';
    // Highlight rooms in selected zone
    if (selectedZone) {
      const room = floor.rooms.find(r => r.id === roomId);
      if (room && getZoneType(selectedZone.id) === getZoneTypeForRoom(room)) return 'zone-highlight';
    }
    if (swapSource) return 'swap-target';
    return '';
  };

  const getRoomStyle = (room) => {
    if (activeLens === 'none') return {};

    const hue = 225; 
    const sat = 70;
    let intensity = 0;
    
    if (activeLens === 'social') {
      intensity = (room.preferences.social - 1) / 9;
    } else if (activeLens === 'sleep') {
      switch (room.preferences.sleep) {
        case 'early': intensity = 0.1; break;
        case 'mixed': intensity = 0.5; break;
        case 'late': intensity = 0.9; break;
        default: intensity = 0;
      }
    } else if (activeLens === 'varsity') {
      intensity = room.preferences.varsity ? 0.8 : 0.1;
    }

    const lightness = 95 - (intensity * 55);
    const strokeLightness = Math.max(lightness - 20, 30);

    return {
      fill: `hsl(${hue}, ${sat}%, ${lightness}%)`,
      stroke: `hsl(${hue}, ${sat}%, ${strokeLightness}%)`,
      transition: 'fill 0.3s ease, stroke 0.3s ease'
    };
  };

  return (
    <div className="floor-plan-container">
      <div className="floor-plan-wrapper">
        {/* Section tabs at top */}
        <div className="section-tabs">
          <span className="section-tabs-label">Sections:</span>
          <div className="section-tabs-list">
            {zones && zones.map((zone) => {
              const isSelected = selectedZone?.id === zone.id;
              const isApproved = zone.status === 'approved';
              
              return (
                <button
                  key={zone.id}
                  className={`section-tab ${isSelected ? 'selected' : ''} ${isApproved ? 'approved' : 'pending'}`}
                  onClick={() => onZoneClick(zone)}
                >
                  {isApproved && <span className="tab-check">✓</span>}
                  {zone.label}
                </button>
              );
            })}
          </div>
        </div>

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
            
            const isVerticalWing = room.zone === 'West Wing' || room.zone === 'East Wing';
            const width = isVerticalWing ? 25 : 50;
            const height = isVerticalWing ? 50 : 25;
            
            return (
              <g key={room.id} className={`room-group ${highlight}`}>
                <rect
                  x={room.position.x}
                  y={room.position.y}
                  width={width}
                  height={height}
                  className={`room ${highlight}`}
                  onClick={() => onRoomClick(room)}
                  rx="4"
                  style={dynamicStyle}
                />
                <text
                  x={room.position.x + width/2}
                  y={room.position.y + height/2 + 4}
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
        </svg>
      </div>
    </div>
  );
}

export default FloorPlan;
