import "./FloorPlan.css";

function FloorPlan({
  floor,
  floors,
  currentFloorIndex,
  onChangeFloor,
  floorComplete,
  zones,
  selectedRoom,
  selectedZone,
  onRoomClick,
  onZoneClick,
  activeLens,
  swapSource,
}) {
  // Extract zone type from zone ID (e.g., "floor1-west" -> "west")
  const getZoneType = (zoneId) => {
    return zoneId.split("-").slice(1).join("-");
  };

  const getZoneTypeForRoom = (room) => {
    if (room.zone === "West Wing") return "west";
    if (room.zone === "East Wing") return "east";
    if (room.zone === "North Hall") {
      return room.position.x < 420 ? "north-west" : "north-east";
    }
    return null;
  };

  const isRoomHighlighted = (roomId) => {
    if (swapSource?.id === roomId) return "swap-source";
    if (selectedRoom?.id === roomId) return "selected";
    // Highlight rooms in selected zone
    if (selectedZone) {
      const room = floor.rooms.find((r) => r.id === roomId);
      if (room && getZoneType(selectedZone.id) === getZoneTypeForRoom(room))
        return "zone-highlight";
    }
    if (swapSource) return "swap-target";
    return "";
  };

  const getRoomStyle = (room) => {
    if (activeLens === "none") return {};

    let intensity = 0;

    if (activeLens === "social") {
      intensity = (room.preferences.social - 1) / 9;
    } else if (activeLens === "sleep") {
      switch (room.preferences.sleep) {
        case "early":
          intensity = 0.1;
          break;
        case "mixed":
          intensity = 0.5;
          break;
        case "late":
          intensity = 0.9;
          break;
        default:
          intensity = 0;
      }
    } else if (activeLens === "varsity") {
      intensity = room.preferences.varsity ? 0.8 : 0.1;
    }

    // Stanford palette gradient: Eggshell (#F8F0DD) -> Charcoal Brown (#48463E)
    // RGB for Eggshell: 248, 240, 221
    // RGB for Charcoal Brown: 72, 70, 62
    const r = Math.round(248 - intensity * (248 - 72));
    const g = Math.round(240 - intensity * (240 - 70));
    const b = Math.round(221 - intensity * (221 - 62));

    const strokeR = Math.max(r - 30, 50);
    const strokeG = Math.max(g - 30, 50);
    const strokeB = Math.max(b - 30, 45);

    return {
      fill: `rgb(${r}, ${g}, ${b})`,
      stroke: `rgb(${strokeR}, ${strokeG}, ${strokeB})`,
      transition: "fill 0.3s ease, stroke 0.3s ease",
    };
  };

  return (
    <div className="floor-plan-container">
      <div className="floor-plan-wrapper">
        {/* Controls row above map */}
        <div className="map-controls-row">
          {/* Section tabs on left */}
          <div className="section-tabs">
            <span className="section-tabs-label">Sections:</span>
            <div className="section-tabs-list">
              {zones &&
                zones.map((zone) => {
                  const isSelected = selectedZone?.id === zone.id;
                  const isApproved = zone.status === "approved";

                  return (
                    <button
                      key={zone.id}
                      className={`section-tab ${isSelected ? "selected" : ""} ${
                        isApproved ? "approved" : "pending"
                      }`}
                      onClick={() => onZoneClick(zone)}
                    >
                      {isApproved && <span className="tab-check">✓</span>}
                      {zone.label}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Floor navigation on right */}
          <div className="floor-nav">
            <button
              className="floor-nav-btn"
              onClick={() => onChangeFloor(-1)}
              disabled={currentFloorIndex === 0}
            >
              ‹
            </button>
            <div className="floor-indicator">
              <span className="floor-name">{floor.name}</span>
            </div>
            <button
              className="floor-nav-btn"
              onClick={() => onChangeFloor(1)}
              disabled={currentFloorIndex === floors.length - 1}
            >
              ›
            </button>
          </div>
        </div>

        <svg
          className="floor-plan"
          viewBox="0 0 870 460"
          preserveAspectRatio="xMidYMid meet"
        >
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

            const isVerticalWing =
              room.zone === "West Wing" || room.zone === "East Wing";
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
                  x={room.position.x + width / 2}
                  y={room.position.y + height / 2 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--color-text-primary)"
                  fontWeight="500"
                  pointerEvents="none"
                  style={{ textShadow: "0 1px 2px rgba(255,255,255,0.3)" }}
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
