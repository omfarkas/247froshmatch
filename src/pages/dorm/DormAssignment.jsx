import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloorPlan from './components/FloorPlan';
import IssuePanel from './components/IssuePanel';
import './DormAssignment.css';

// Mock data for floors and rooms
const MOCK_FLOORS = [
  {
    id: 1,
    name: 'Floor 1',
    label: 'Main Floor',
    width: 870,
    height: 420,
    rooms: [
      // Top horizontal section - First row (25px tall rooms)
      { id: 101, zone: 'North Hall', position: { x: 140, y: 20 }, students: ['Emma Chen', 'Sofia Rodriguez'], preferences: { social: 8, quiet: 3, sleep: 'late', interests: ['Soccer', 'Photography'], varsity: true } },
      { id: 102, zone: 'North Hall', position: { x: 200, y: 20 }, students: ['Marcus Johnson', 'Aiden Park'], preferences: { social: 9, quiet: 2, sleep: 'late', interests: ['Basketball', 'Gaming'], varsity: true } },
      { id: 103, zone: 'North Hall', position: { x: 260, y: 20 }, students: ['Olivia Martinez', 'Zoe Kim'], preferences: { social: 4, quiet: 8, sleep: 'early', interests: ['Reading', 'Art'], varsity: false } },
      { id: 104, zone: 'North Hall', position: { x: 320, y: 20 }, students: ['Liam O\'Brien', 'Noah Williams'], preferences: { social: 7, quiet: 5, sleep: 'mixed', interests: ['Soccer', 'Film'], varsity: true } },
      { id: 105, zone: 'North Hall', position: { x: 380, y: 20 }, students: ['Ava Thompson', 'Mia Davis'], preferences: { social: 6, quiet: 6, sleep: 'early', interests: ['Dance', 'Writing'], varsity: false } },
      { id: 106, zone: 'North Hall', position: { x: 440, y: 20 }, students: ['Ethan Garcia', 'Lucas Anderson'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Robotics'], varsity: true } },
      { id: 107, zone: 'North Hall', position: { x: 500, y: 20 }, students: ['Isabella Lee', 'Charlotte Brown'], preferences: { social: 5, quiet: 7, sleep: 'early', interests: ['Piano', 'Science'], varsity: false } },
      { id: 108, zone: 'North Hall', position: { x: 560, y: 20 }, students: ['James Wilson', 'Benjamin Taylor'], preferences: { social: 9, quiet: 3, sleep: 'late', interests: ['Soccer', 'Theater'], varsity: true } },
      { id: 109, zone: 'North Hall', position: { x: 620, y: 20 }, students: ['Amelia Moore', 'Harper Jackson'], preferences: { social: 3, quiet: 9, sleep: 'early', interests: ['Meditation', 'Yoga'], varsity: false } },
      { id: 110, zone: 'North Hall', position: { x: 680, y: 20 }, students: ['Daniel Martinez', 'Matthew White'], preferences: { social: 7, quiet: 5, sleep: 'mixed', interests: ['Basketball', 'Gaming'], varsity: false } },
      
      // Second row of top section - with hallway gap (25px tall rooms)
      { id: 151, zone: 'North Hall', position: { x: 140, y: 105 }, students: ['Elijah Ward', 'Sebastian Torres'], preferences: { social: 7, quiet: 5, sleep: 'late', interests: ['Basketball', 'Music Production'], varsity: false } },
      { id: 152, zone: 'North Hall', position: { x: 200, y: 105 }, students: ['Nora Peterson', 'Hazel Gray'], preferences: { social: 5, quiet: 7, sleep: 'early', interests: ['Reading', 'Tea'], varsity: false } },
      { id: 153, zone: 'North Hall', position: { x: 260, y: 105 }, students: ['Carter Ramirez', 'Wyatt James'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Entrepreneurship'], varsity: true } },
      { id: 154, zone: 'North Hall', position: { x: 320, y: 105 }, students: ['Aubrey Watson', 'Brooklyn Brooks'], preferences: { social: 6, quiet: 6, sleep: 'mixed', interests: ['Dance', 'Fashion Design'], varsity: false } },
      { id: 155, zone: 'North Hall', position: { x: 380, y: 105 }, students: ['Julian Kelly', 'Miles Sanders'], preferences: { social: 9, quiet: 3, sleep: 'late', interests: ['Soccer', 'Gaming'], varsity: true } },
      { id: 156, zone: 'North Hall', position: { x: 440, y: 105 }, students: ['Eleanor Price', 'Claire Bennett'], preferences: { social: 4, quiet: 8, sleep: 'early', interests: ['Library', 'Writing'], varsity: false } },
      { id: 157, zone: 'North Hall', position: { x: 500, y: 105 }, students: ['Lincoln Wood', 'Hudson Barnes'], preferences: { social: 7, quiet: 5, sleep: 'mixed', interests: ['Basketball', 'Fitness'], varsity: false } },
      { id: 158, zone: 'North Hall', position: { x: 560, y: 105 }, students: ['Violet Ross', 'Aurora Henderson'], preferences: { social: 6, quiet: 6, sleep: 'early', interests: ['Art', 'Yoga'], varsity: false } },
      { id: 159, zone: 'North Hall', position: { x: 620, y: 105 }, students: ['Grayson Coleman', 'Easton Jenkins'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Film Making'], varsity: true } },
      { id: 160, zone: 'North Hall', position: { x: 680, y: 105 }, students: ['Lucy Perry', 'Anna Powell'], preferences: { social: 3, quiet: 9, sleep: 'early', interests: ['Quiet Study', 'Research'], varsity: false } },

      // Left outer wing (4 rooms down, 25px wide)
      { id: 111, zone: 'West Wing', position: { x: 20, y: 140 }, students: ['Emily Harris', 'Abigail Clark'], preferences: { social: 6, quiet: 6, sleep: 'mixed', interests: ['Swimming', 'Art'], varsity: true } },
      { id: 112, zone: 'West Wing', position: { x: 20, y: 200 }, students: ['Michael Lewis', 'Alexander Hall'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Travel'], varsity: true } },
      { id: 113, zone: 'West Wing', position: { x: 20, y: 260 }, students: ['Sophia Allen', 'Ella Young'], preferences: { social: 5, quiet: 7, sleep: 'early', interests: ['Reading', 'Baking'], varsity: false } },
      { id: 114, zone: 'West Wing', position: { x: 20, y: 320 }, students: ['William King', 'Henry Wright'], preferences: { social: 9, quiet: 2, sleep: 'late', interests: ['Soccer', 'Party Planning'], varsity: false } },

      // Left inner wing (4 rooms down, 25px wide - hallway side)
      { id: 121, zone: 'West Wing', position: { x: 105, y: 140 }, students: ['Victoria Phillips', 'Samantha Campbell'], preferences: { social: 4, quiet: 8, sleep: 'early', interests: ['Study Groups', 'Research'], varsity: false } },
      { id: 122, zone: 'West Wing', position: { x: 105, y: 200 }, students: ['Joseph Parker', 'Samuel Evans'], preferences: { social: 7, quiet: 5, sleep: 'mixed', interests: ['Basketball', 'Cooking'], varsity: false } },
      { id: 123, zone: 'West Wing', position: { x: 105, y: 260 }, students: ['Madison Edwards', 'Avery Collins'], preferences: { social: 6, quiet: 6, sleep: 'mixed', interests: ['Art', 'Music'], varsity: false } },
      { id: 124, zone: 'West Wing', position: { x: 105, y: 320 }, students: ['Jack Stewart', 'Luke Morris'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Debate'], varsity: true } },

      // Right inner wing (4 rooms down, 25px wide - hallway side)
      { id: 131, zone: 'East Wing', position: { x: 740, y: 140 }, students: ['Gabriel Cook', 'Owen Morgan'], preferences: { social: 7, quiet: 5, sleep: 'late', interests: ['Gaming', 'Coding'], varsity: false } },
      { id: 132, zone: 'East Wing', position: { x: 740, y: 200 }, students: ['Aria Bell', 'Layla Murphy'], preferences: { social: 5, quiet: 7, sleep: 'mixed', interests: ['Piano', 'Art History'], varsity: false } },
      { id: 133, zone: 'East Wing', position: { x: 740, y: 260 }, students: ['Dylan Bailey', 'Caleb Rivera'], preferences: { social: 9, quiet: 2, sleep: 'late', interests: ['Soccer', 'Fraternity Rush'], varsity: true } },
      { id: 134, zone: 'East Wing', position: { x: 740, y: 320 }, students: ['Penelope Cooper', 'Riley Richardson'], preferences: { social: 6, quiet: 6, sleep: 'mixed', interests: ['Swimming', 'Photography'], varsity: true } },

      // Right outer wing (4 rooms down, 25px wide)
      { id: 141, zone: 'East Wing', position: { x: 825, y: 140 }, students: ['Ryan Scott', 'Tyler Green'], preferences: { social: 7, quiet: 5, sleep: 'mixed', interests: ['Basketball', 'Music'], varsity: false } },
      { id: 142, zone: 'East Wing', position: { x: 825, y: 200 }, students: ['Natalie Adams', 'Lily Baker'], preferences: { social: 6, quiet: 6, sleep: 'early', interests: ['Dance', 'Fashion'], varsity: false } },
      { id: 143, zone: 'East Wing', position: { x: 825, y: 260 }, students: ['Joshua Nelson', 'Andrew Carter'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Gaming'], varsity: true } },
      { id: 144, zone: 'East Wing', position: { x: 825, y: 320 }, students: ['Hannah Mitchell', 'Addison Perez'], preferences: { social: 5, quiet: 7, sleep: 'early', interests: ['Reading', 'Knitting'], varsity: false } },
    ],
    specialAreas: [
      { type: 'lounge', position: { x: 20, y: 20 }, label: 'Student\nLounge', width: 110, height: 110 },
      { type: 'rf', position: { x: 740, y: 20 }, label: 'RF\nApartment', width: 110, height: 110 },
      { type: 'exit', position: { x: 20, y: 380 }, label: 'Exit/\nStairs', width: 110, height: 60 },
      { type: 'exit', position: { x: 740, y: 380 }, label: 'Exit/\nStairs', width: 110, height: 60 }
    ]
  }
];

// Generate floor 2 and 3 with different student names
const generateFloor = (floorNum) => {
  const baseFloor = JSON.parse(JSON.stringify(MOCK_FLOORS[0]));
  baseFloor.id = floorNum;
  baseFloor.name = `Floor ${floorNum}`;
  baseFloor.label = `Floor ${floorNum}`;
  
  // Update room IDs and generate new student names
  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Parker', 'Sage', 'Drew', 'Blake', 'Cameron', 'Devon', 'Finley', 'Hayden', 'Jamie', 'Kendall', 'Logan', 'Peyton'];
  const lastNames = ['Smith', 'Jones', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Garcia', 'Lee', 'Clark', 'Lewis', 'Young', 'Walker', 'Hall', 'Allen'];
  
  baseFloor.rooms = baseFloor.rooms.map((room, idx) => ({
    ...room,
    id: floorNum * 100 + (room.id % 100),
    students: [
      `${firstNames[(idx * 2 + floorNum) % firstNames.length]} ${lastNames[(idx * 3 + floorNum) % lastNames.length]}`,
      `${firstNames[(idx * 2 + 1 + floorNum) % firstNames.length]} ${lastNames[(idx * 3 + 1 + floorNum) % lastNames.length]}`
    ]
  }));
  
  return baseFloor;
};

const ALL_FLOORS = [
  MOCK_FLOORS[0],
  generateFloor(2),
  generateFloor(3)
];

const createInitialZones = (floorId) => [
  {
    id: `floor${floorId}-west`,
    label: 'West Wing',
    stats: { social: 'High', sleep: 'Mixed', athletes: '40%' },
    insights: [
      'High social energy cluster near lounge',
      'Potential noise conflicts with inner rooms'
    ],
    status: 'pending',
    roomIds: [floorId * 100 + 11, floorId * 100 + 12, floorId * 100 + 13, floorId * 100 + 14, floorId * 100 + 21, floorId * 100 + 22, floorId * 100 + 23, floorId * 100 + 24]
  },
  {
    id: `floor${floorId}-north-west`,
    label: 'North Hall (West)',
    stats: { social: 'Medium', sleep: 'Early', athletes: '20%' },
    insights: [
      'Quiet study area formed naturally',
      'Good sleep schedule alignment'
    ],
    status: 'pending',
    roomIds: [floorId * 100 + 1, floorId * 100 + 2, floorId * 100 + 3, floorId * 100 + 4, floorId * 100 + 5, floorId * 100 + 51, floorId * 100 + 52, floorId * 100 + 53, floorId * 100 + 54, floorId * 100 + 55]
  },
  {
    id: `floor${floorId}-north-east`,
    label: 'North Hall (East)',
    stats: { social: 'Low', sleep: 'Late', athletes: '10%' },
    insights: [
      'Late night activity cluster',
      'Isolated from main social hubs'
    ],
    status: 'pending',
    roomIds: [floorId * 100 + 6, floorId * 100 + 7, floorId * 100 + 8, floorId * 100 + 9, floorId * 100 + 10, floorId * 100 + 56, floorId * 100 + 57, floorId * 100 + 58, floorId * 100 + 59, floorId * 100 + 60]
  },
  {
    id: `floor${floorId}-east`,
    label: 'East Wing',
    stats: { social: 'High', sleep: 'Late', athletes: '80%' },
    insights: [
      'Varsity athlete block formed',
      'Consistent schedules, high cohesion'
    ],
    status: 'pending',
    roomIds: [floorId * 100 + 31, floorId * 100 + 32, floorId * 100 + 33, floorId * 100 + 34, floorId * 100 + 41, floorId * 100 + 42, floorId * 100 + 43, floorId * 100 + 44]
  }
];

function DormAssignment() {
  const navigate = useNavigate();
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [activeLens, setActiveLens] = useState('social');
  const [swapSource, setSwapSource] = useState(null);
  const [swapTarget, setSwapTarget] = useState(null);
  const [showSwapConfirm, setShowSwapConfirm] = useState(false);
  const [floors, setFloors] = useState(ALL_FLOORS);
  const [allZones, setAllZones] = useState({
    1: createInitialZones(1),
    2: createInitialZones(2),
    3: createInitialZones(3)
  });

  const currentFloor = floors[currentFloorIndex];
  const zones = allZones[currentFloor.id];
  const floorApprovedCount = zones.filter(z => z.status === 'approved').length;
  const floorComplete = floorApprovedCount === zones.length;
  
  // Total progress across ALL floors
  const totalSections = Object.values(allZones).flat().length;
  const totalApproved = Object.values(allZones).flat().filter(z => z.status === 'approved').length;
  
  // Check if ALL floors are complete
  const allFloorsComplete = Object.values(allZones).every(floorZones => 
    floorZones.every(z => z.status === 'approved')
  );

  const handleRoomClick = (room) => {
    if (swapSource) {
      if (swapSource.id === room.id) {
        // Cancel swap if clicking same room
        setSwapSource(null);
        setSelectedRoom(room); // Show room info
      } else {
        // Show swap confirmation
        setSwapTarget(room);
        setShowSwapConfirm(true);
      }
    } else {
      // Show room info panel
      setSelectedRoom(room);
      setSelectedZone(null);
    }
  };

  const initiateSwap = (room) => {
    setSwapSource(room);
    setSelectedRoom(null);
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    setSelectedRoom(null);
    setSwapSource(null);
  };

  const handleApproveZone = (zoneId) => {
    setAllZones(prev => ({
      ...prev,
      [currentFloor.id]: prev[currentFloor.id].map(z => 
        z.id === zoneId ? { ...z, status: 'approved' } : z
      )
    }));
    setSelectedZone(null);
  };

  const confirmSwap = () => {
    if (!swapSource || !swapTarget) return;
    
    const newFloors = JSON.parse(JSON.stringify(floors));
    const floor = newFloors[currentFloorIndex];
    
    const rA = floor.rooms.find(r => r.id === swapSource.id);
    const rB = floor.rooms.find(r => r.id === swapTarget.id);
    
    const tempStudents = rA.students;
    const tempPreferences = rA.preferences;
    
    rA.students = rB.students;
    rA.preferences = rB.preferences;
    
    rB.students = tempStudents;
    rB.preferences = tempPreferences;
    
    setFloors(newFloors);
    setSwapSource(null);
    setSwapTarget(null);
    setShowSwapConfirm(false);
    setSelectedRoom(null);
  };

  const cancelSwapConfirm = () => {
    setSwapTarget(null);
    setShowSwapConfirm(false);
  };

  const cancelSwap = () => {
    setSwapSource(null);
    setSelectedRoom(null);
  };

  const changeFloor = (direction) => {
    const newIndex = currentFloorIndex + direction;
    if (newIndex >= 0 && newIndex < floors.length) {
      setCurrentFloorIndex(newIndex);
      setSelectedRoom(null);
      setSelectedZone(null);
      setSwapSource(null);
    }
  };

  const getLegendLabels = () => {
    switch (activeLens) {
      case 'social':
        return { low: 'Low', high: 'High' };
      case 'sleep':
        return { low: 'Early', high: 'Late' };
      case 'varsity':
        return { low: 'Not Athlete', high: 'Athlete' };
      default:
        return { low: 'Low', high: 'High' };
    }
  };

  const legendLabels = getLegendLabels();

  // Get rooms for a zone
  const getRoomsForZone = (zone) => {
    return currentFloor.rooms.filter(r => zone.roomIds.includes(r.id));
  };

  // Get contextual insights for a room based on location and neighbors
  const getRoomContext = (room) => {
    const insights = [];
    
    // Location context
    if (room.zone === 'West Wing' && room.position.y < 200) {
      insights.push('Near student lounge - higher foot traffic');
    }
    if (room.zone === 'East Wing' && room.position.y < 200) {
      insights.push('Near RF apartment - quieter area');
    }
    if (room.position.x < 50 || room.position.x > 800) {
      insights.push('Corner room - more privacy');
    }
    
    // Find neighbors and analyze
    const neighbors = currentFloor.rooms.filter(r => {
      const dx = Math.abs(r.position.x - room.position.x);
      const dy = Math.abs(r.position.y - room.position.y);
      return r.id !== room.id && dx <= 60 && dy <= 60;
    });
    
    if (neighbors.length > 0) {
      const avgSocial = neighbors.reduce((sum, n) => sum + n.preferences.social, 0) / neighbors.length;
      if (Math.abs(room.preferences.social - avgSocial) > 3) {
        insights.push('Social energy differs from neighbors');
      } else {
        insights.push('Similar social vibe to adjacent rooms');
      }
      
      const sameSchedule = neighbors.filter(n => n.preferences.sleep === room.preferences.sleep);
      if (sameSchedule.length >= neighbors.length / 2) {
        insights.push('Sleep schedule aligned with neighbors');
      }
    }
    
    return insights;
  };

  if (allFloorsComplete) {
    return (
      <div className="dorm-assignment completion-screen">
        <div className="completion-content">
          <div className="completion-icon">✓</div>
          <h1>All Floors Reviewed!</h1>
          <p>You have successfully reviewed and approved all wing assignments across all 3 floors.</p>
          <button 
            className="completion-btn"
            onClick={() => navigate('/')}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dorm-assignment">
      <div className="dorm-header">
        <div className="header-content">
          <div>
            <h1 className="dorm-title">Dorm Assignment</h1>
            <p className="dorm-subtitle">Review and adjust assignments with human agency</p>
          </div>
          <div className="header-controls">
            {/* Floor Navigation */}
            <div className="floor-nav">
              <button 
                className="floor-nav-btn"
                onClick={() => changeFloor(-1)}
                disabled={currentFloorIndex === 0}
              >
                ‹
              </button>
              <div className="floor-indicator">
                <span className="floor-name">{currentFloor.name}</span>
                {floorComplete && <span className="floor-complete-badge">✓</span>}
              </div>
              <button 
                className="floor-nav-btn"
                onClick={() => changeFloor(1)}
                disabled={currentFloorIndex === floors.length - 1}
              >
                ›
              </button>
            </div>

            {/* Progress Tracker */}
            <div className="progress-tracker">
              <span className="progress-label">{totalApproved}/{totalSections} sections</span>
              <div className="progress-dots">
                {Object.values(allZones).flat().map(zone => (
                  <div 
                    key={zone.id} 
                    className={`progress-dot ${zone.status === 'approved' ? 'approved' : 'pending'}`}
                    title={zone.label}
                  />
                ))}
              </div>
            </div>

            <div className="lens-selector">
              <span className="lens-label">Lens:</span>
              <div className="lens-buttons">
                <button 
                  className={`lens-btn ${activeLens === 'social' ? 'active' : ''}`}
                  onClick={() => setActiveLens('social')}
                >
                  Social
                </button>
                <button 
                  className={`lens-btn ${activeLens === 'sleep' ? 'active' : ''}`}
                  onClick={() => setActiveLens('sleep')}
                >
                  Sleep
                </button>
                <button 
                  className={`lens-btn ${activeLens === 'varsity' ? 'active' : ''}`}
                  onClick={() => setActiveLens('varsity')}
                >
                  Athletes
                </button>
              </div>
            </div>
            
            {activeLens !== 'none' && (
              <div className="color-legend">
                <div className="legend-gradient">
                  <span className="legend-text">{legendLabels.low}</span>
                  <div className="gradient-bar"></div>
                  <span className="legend-text">{legendLabels.high}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dorm-content">
        <div className="dorm-main">
          <FloorPlan
            floor={currentFloor}
            zones={zones}
            selectedRoom={selectedRoom}
            selectedZone={selectedZone}
            onRoomClick={handleRoomClick}
            onZoneClick={handleZoneClick}
            activeLens={activeLens}
            swapSource={swapSource}
          />
        </div>

        <IssuePanel
          selectedRoom={selectedRoom}
          selectedZone={selectedZone}
          zoneRooms={selectedZone ? getRoomsForZone(selectedZone) : []}
          roomContext={selectedRoom ? getRoomContext(selectedRoom) : []}
          onApproveZone={handleApproveZone}
          onClose={() => {
            setSelectedRoom(null);
            setSelectedZone(null);
            setSwapSource(null);
          }}
          activeLens={activeLens}
          swapSource={swapSource}
          onInitiateSwap={initiateSwap}
          onCancelSwap={cancelSwap}
          floor={currentFloor}
        />
      </div>

      {/* Swap Confirmation Modal */}
      {showSwapConfirm && swapSource && swapTarget && (
        <div className="swap-modal-overlay">
          <div className="swap-modal">
            <h3>Confirm Room Swap</h3>
            <div className="swap-details">
              <div className="swap-room">
                <strong>Room {swapSource.id}</strong>
                <p>{swapSource.students.join(' & ')}</p>
              </div>
              <div className="swap-arrow">⇄</div>
              <div className="swap-room">
                <strong>Room {swapTarget.id}</strong>
                <p>{swapTarget.students.join(' & ')}</p>
              </div>
            </div>
            <div className="swap-actions">
              <button className="swap-cancel" onClick={cancelSwapConfirm}>
                Cancel
              </button>
              <button className="swap-confirm" onClick={confirmSwap}>
                Confirm Swap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DormAssignment;
