import { useState, useRef } from "react";
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
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const handleRoomMouseEnter = (room, event) => {
    if (swapSource?.id === room.id) return; // Don't show tooltip for swap source
    setHoveredRoom(room);

    // Get position relative to the SVG container
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      const x = event.clientX - svgRect.left;
      const y = event.clientY - svgRect.top;
      setTooltipPosition({ x, y });
    }
  };

  const handleRoomMouseLeave = () => {
    setHoveredRoom(null);
  };

  const handleRoomMouseMove = (event) => {
    if (!hoveredRoom) return;
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      const x = event.clientX - svgRect.left;
      const y = event.clientY - svgRect.top;
      setTooltipPosition({ x, y });
    }
  };

  // Helper to get student name string
  const getStudentName = (student) => {
    if (typeof student === "string") return student;
    if (student && student.firstName)
      return `${student.firstName} ${student.lastName}`;
    return "Unknown";
  };
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
    if (hoveredRoom?.id === roomId) return "hovered";
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

    // Check if room is in an approved zone
    const roomZoneType = getZoneTypeForRoom(room);
    const roomZone = zones?.find((z) => getZoneType(z.id) === roomZoneType);
    const isApproved = roomZone?.status === "approved";

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

    if (isApproved) {
      // Pale green gradient for approved sections: Very light mint -> Soft sage green
      // Low: 235, 245, 235
      // High: 180, 210, 185
      r = Math.round(235 - intensity * (235 - 180));
      g = Math.round(245 - intensity * (245 - 210));
      b = Math.round(235 - intensity * (235 - 185));
    } else {
      // All lenses use the same red gradient: Light cream -> Coral -> Stanford Red
      // Low: 245, 240, 230
      // High: 140, 21, 21
      r = Math.round(245 - intensity * (245 - 140));
      g = Math.round(240 - intensity * (240 - 21));
      b = Math.round(230 - intensity * (230 - 21));
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
          ref={svgRef}
          className="floor-plan"
          viewBox="0 0 870 460"
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleRoomMouseMove}
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
              <g
                key={room.id}
                className={`room-group ${highlight}`}
                onMouseEnter={(e) => handleRoomMouseEnter(room, e)}
                onMouseLeave={handleRoomMouseLeave}
              >
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

        {/* Hover tooltip */}
        {hoveredRoom && (
          <div
            className="room-hover-tooltip"
            style={{
              left: tooltipPosition.x + 15,
              top: tooltipPosition.y - 10,
            }}
          >
            <div className="tooltip-header">
              <span className="tooltip-room-id">Room {hoveredRoom.id}</span>
              <span className="tooltip-zone">{hoveredRoom.zone}</span>
            </div>
            <div className="tooltip-students">
              {hoveredRoom.students.map((student, idx) => (
                <div key={idx} className="tooltip-student-name">
                  {getStudentName(student)}
                </div>
              ))}
            </div>
            <div className="tooltip-stats">
              <div className="tooltip-stat">
                <span className="stat-label">Social</span>
                <span className="stat-value">
                  {hoveredRoom.preferences.social}/10
                </span>
              </div>
              <div className="tooltip-stat">
                <span className="stat-label">Sleep</span>
                <span className="stat-value capitalize">
                  {hoveredRoom.preferences.sleep}
                </span>
              </div>
              <div className="tooltip-stat">
                <span className="stat-label">Athlete</span>
                <span className="stat-value">
                  {hoveredRoom.preferences.varsity ? "Yes" : "No"}
                </span>
              </div>
            </div>
            {swapSource && (
              <div className="tooltip-swap-hint">Click to swap</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FloorPlan;
