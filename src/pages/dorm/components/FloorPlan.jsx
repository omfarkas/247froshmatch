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
        case "slightly early":
          intensity = 0.25;
          break;
        case "mixed":
          intensity = 0.5;
          break;
        case "slightly late":
          intensity = 0.65;
          break;
        case "late":
          intensity = 0.8;
          break;
        case "very late":
          intensity = 0.95;
          break;
        default:
          intensity = 0.5;
      }
    } else if (activeLens === "varsity") {
      intensity = room.preferences.varsity ? 0.8 : 0.1;
    }

    let r, g, b;

    if (activeLens === "social") {
      // Social gradient: Light cream (#F5F0E6) -> Coral (#E87461) -> Stanford Red (#8C1515)
      // Low social: 245, 240, 230
      // High social: 140, 21, 21
      r = Math.round(245 - intensity * (245 - 140));
      g = Math.round(240 - intensity * (240 - 21));
      b = Math.round(230 - intensity * (230 - 21));
    } else if (activeLens === "sleep") {
      // Sleep gradient: Light yellow/cream (#FFF8E1) -> Lavender (#9575CD) -> Deep purple (#5E35B1)
      // Early: 255, 248, 225
      // Late: 94, 53, 177
      r = Math.round(255 - intensity * (255 - 94));
      g = Math.round(248 - intensity * (248 - 53));
      b = Math.round(225 - intensity * (225 - 177));
    } else if (activeLens === "varsity") {
      // Athletes gradient: Light cream (#F5F0E6) -> Turf Green (#2E6F40)
      // Non-athlete: 245, 240, 230
      // Athlete: 46, 111, 64
      r = Math.round(245 - intensity * (245 - 46));
      g = Math.round(240 - intensity * (240 - 111));
      b = Math.round(230 - intensity * (230 - 64));
    }

    const strokeR = Math.max(r - 35, 40);
    const strokeG = Math.max(g - 35, 10);
    const strokeB = Math.max(b - 35, 10);

    // Calculate perceived brightness (0-255)
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    const textColor = brightness < 150 ? "white" : "var(--color-text-primary)";

    return {
      fill: `rgb(${r}, ${g}, ${b})`,
      stroke: `rgb(${strokeR}, ${strokeG}, ${strokeB})`,
      textColor: textColor,
      transition: "fill 0.3s ease, stroke 0.3s ease",
    };
  };

  return (
    <div className="floor-plan-container">
      <div className="floor-plan-wrapper">
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
                  fill={dynamicStyle.textColor || "var(--color-text-primary)"}
                  fontWeight="500"
                  pointerEvents="none"
                  style={{
                    textShadow:
                      dynamicStyle.textColor === "white"
                        ? "0 1px 2px rgba(0,0,0,0.5)"
                        : "0 1px 2px rgba(255,255,255,0.3)",
                  }}
                >
                  {room.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Controls row below map */}
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
      </div>
    </div>
  );
}

export default FloorPlan;
