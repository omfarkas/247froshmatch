import { useState } from 'react';
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
      // Top horizontal section (20 rooms across - doubled)
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
      // Second row of top section
      { id: 151, zone: 'North Hall', position: { x: 140, y: 80 }, students: ['Elijah Ward', 'Sebastian Torres'], preferences: { social: 7, quiet: 5, sleep: 'late', interests: ['Basketball', 'Music Production'], varsity: false } },
      { id: 152, zone: 'North Hall', position: { x: 200, y: 80 }, students: ['Nora Peterson', 'Hazel Gray'], preferences: { social: 5, quiet: 7, sleep: 'early', interests: ['Reading', 'Tea'], varsity: false } },
      { id: 153, zone: 'North Hall', position: { x: 260, y: 80 }, students: ['Carter Ramirez', 'Wyatt James'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Entrepreneurship'], varsity: true } },
      { id: 154, zone: 'North Hall', position: { x: 320, y: 80 }, students: ['Aubrey Watson', 'Brooklyn Brooks'], preferences: { social: 6, quiet: 6, sleep: 'mixed', interests: ['Dance', 'Fashion Design'], varsity: false } },
      { id: 155, zone: 'North Hall', position: { x: 380, y: 80 }, students: ['Julian Kelly', 'Miles Sanders'], preferences: { social: 9, quiet: 3, sleep: 'late', interests: ['Soccer', 'Gaming'], varsity: true } },
      { id: 156, zone: 'North Hall', position: { x: 440, y: 80 }, students: ['Eleanor Price', 'Claire Bennett'], preferences: { social: 4, quiet: 8, sleep: 'early', interests: ['Library', 'Writing'], varsity: false } },
      { id: 157, zone: 'North Hall', position: { x: 500, y: 80 }, students: ['Lincoln Wood', 'Hudson Barnes'], preferences: { social: 7, quiet: 5, sleep: 'mixed', interests: ['Basketball', 'Fitness'], varsity: false } },
      { id: 158, zone: 'North Hall', position: { x: 560, y: 80 }, students: ['Violet Ross', 'Aurora Henderson'], preferences: { social: 6, quiet: 6, sleep: 'early', interests: ['Art', 'Yoga'], varsity: false } },
      { id: 159, zone: 'North Hall', position: { x: 620, y: 80 }, students: ['Grayson Coleman', 'Easton Jenkins'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Film Making'], varsity: true } },
      { id: 160, zone: 'North Hall', position: { x: 680, y: 80 }, students: ['Lucy Perry', 'Anna Powell'], preferences: { social: 3, quiet: 9, sleep: 'early', interests: ['Quiet Study', 'Research'], varsity: false } },

      // Left outer wing (4 rooms down, starting after lounge with 10px spacing)
      { id: 111, zone: 'West Wing', position: { x: 20, y: 140 }, students: ['Emily Harris', 'Abigail Clark'], preferences: { social: 6, quiet: 6, sleep: 'mixed', interests: ['Swimming', 'Art'], varsity: true } },
      { id: 112, zone: 'West Wing', position: { x: 20, y: 200 }, students: ['Michael Lewis', 'Alexander Hall'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Travel'], varsity: true } },
      { id: 113, zone: 'West Wing', position: { x: 20, y: 260 }, students: ['Sophia Allen', 'Ella Young'], preferences: { social: 5, quiet: 7, sleep: 'early', interests: ['Reading', 'Baking'], varsity: false } },
      { id: 114, zone: 'West Wing', position: { x: 20, y: 320 }, students: ['William King', 'Henry Wright'], preferences: { social: 9, quiet: 2, sleep: 'late', interests: ['Soccer', 'Party Planning'], varsity: false } },

      // Left inner wing (4 rooms down - hallway side)
      { id: 121, zone: 'West Wing', position: { x: 80, y: 140 }, students: ['Victoria Phillips', 'Samantha Campbell'], preferences: { social: 4, quiet: 8, sleep: 'early', interests: ['Study Groups', 'Research'], varsity: false } },
      { id: 122, zone: 'West Wing', position: { x: 80, y: 200 }, students: ['Joseph Parker', 'Samuel Evans'], preferences: { social: 7, quiet: 5, sleep: 'mixed', interests: ['Basketball', 'Cooking'], varsity: false } },
      { id: 123, zone: 'West Wing', position: { x: 80, y: 260 }, students: ['Madison Edwards', 'Avery Collins'], preferences: { social: 6, quiet: 6, sleep: 'mixed', interests: ['Art', 'Music'], varsity: false } },
      { id: 124, zone: 'West Wing', position: { x: 80, y: 320 }, students: ['Jack Stewart', 'Luke Morris'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Debate'], varsity: true } },

      // Right inner wing (4 rooms down - hallway side)
      { id: 131, zone: 'East Wing', position: { x: 740, y: 140 }, students: ['Gabriel Cook', 'Owen Morgan'], preferences: { social: 7, quiet: 5, sleep: 'late', interests: ['Gaming', 'Coding'], varsity: false } },
      { id: 132, zone: 'East Wing', position: { x: 740, y: 200 }, students: ['Aria Bell', 'Layla Murphy'], preferences: { social: 5, quiet: 7, sleep: 'mixed', interests: ['Piano', 'Art History'], varsity: false } },
      { id: 133, zone: 'East Wing', position: { x: 740, y: 260 }, students: ['Dylan Bailey', 'Caleb Rivera'], preferences: { social: 9, quiet: 2, sleep: 'late', interests: ['Soccer', 'Fraternity Rush'], varsity: true } },
      { id: 134, zone: 'East Wing', position: { x: 740, y: 320 }, students: ['Penelope Cooper', 'Riley Richardson'], preferences: { social: 6, quiet: 6, sleep: 'mixed', interests: ['Swimming', 'Photography'], varsity: true } },

      // Right outer wing (4 rooms down)
      { id: 141, zone: 'East Wing', position: { x: 800, y: 140 }, students: ['Ryan Scott', 'Tyler Green'], preferences: { social: 7, quiet: 5, sleep: 'mixed', interests: ['Basketball', 'Music'], varsity: false } },
      { id: 142, zone: 'East Wing', position: { x: 800, y: 200 }, students: ['Natalie Adams', 'Lily Baker'], preferences: { social: 6, quiet: 6, sleep: 'early', interests: ['Dance', 'Fashion'], varsity: false } },
      { id: 143, zone: 'East Wing', position: { x: 800, y: 260 }, students: ['Joshua Nelson', 'Andrew Carter'], preferences: { social: 8, quiet: 4, sleep: 'late', interests: ['Soccer', 'Gaming'], varsity: true } },
      { id: 144, zone: 'East Wing', position: { x: 800, y: 320 }, students: ['Hannah Mitchell', 'Addison Perez'], preferences: { social: 5, quiet: 7, sleep: 'early', interests: ['Reading', 'Knitting'], varsity: false } },
    ],
    specialAreas: [
      { type: 'lounge', position: { x: 20, y: 20 }, label: 'Student\nLounge', width: 110, height: 110 },
      { type: 'rf', position: { x: 740, y: 20 }, label: 'RF\nApartment', width: 110, height: 110 },
      { type: 'exit', position: { x: 20, y: 380 }, label: 'Exit/\nStairs', width: 110, height: 60 },
      { type: 'exit', position: { x: 740, y: 380 }, label: 'Exit/\nStairs', width: 110, height: 60 }
    ]
  }
];

// Mock issues identified by the system
const MOCK_ISSUES = [
  {
    id: 1,
    floorId: 1,
    zone: 'West Wing',
    severity: 'medium',
    title: 'High-energy pair in quiet zone',
    description: 'Room 114 (William King & Henry Wright) are very social (social: 9) near quieter neighbors.',
    affectedRooms: [114],
    recommendation: {
      action: 'swap',
      fromRoom: 114,
      toRoom: 106,
      reason: 'Better suited for high-energy students'
    }
  },
  {
    id: 2,
    floorId: 1,
    zone: 'East Wing',
    severity: 'high',
    title: 'Athlete cluster in East Wing',
    description: 'High concentration of varsity athletes in the East Wing.',
    affectedRooms: [118, 120, 128, 129, 139],
    recommendation: {
      action: 'swap',
      fromRoom: 118,
      toRoom: 113,
      reason: 'Balance athlete distribution across zones'
    }
  }
];

function DormAssignment() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [resolvedIssues, setResolvedIssues] = useState(new Set());
  const [activeLens, setActiveLens] = useState('social'); // 'social', 'sleep', 'varsity', 'none'
  const [swapSource, setSwapSource] = useState(null);
  const [floors, setFloors] = useState(MOCK_FLOORS);

  const currentFloor = floors[0]; // Always use first floor
  const currentFloorIssues = MOCK_ISSUES.filter(
    issue => issue.floorId === currentFloor.id && !resolvedIssues.has(issue.id)
  );

  const handleRoomClick = (room) => {
    if (swapSource) {
      if (swapSource.id === room.id) {
        // Cancel swap if clicking same room
        setSwapSource(null);
        setSelectedRoom(room);
      } else {
        // Perform swap
        handleSwap(swapSource, room);
      }
    } else {
      setSelectedRoom(room);
      setSelectedIssue(null);
    }
  };

  const handleSwap = (roomA, roomB) => {
    // Deep copy floors to mutate
    const newFloors = JSON.parse(JSON.stringify(floors));
    const floor = newFloors[0];
    
    const rA = floor.rooms.find(r => r.id === roomA.id);
    const rB = floor.rooms.find(r => r.id === roomB.id);
    
    // Swap students and preferences
    const tempStudents = rA.students;
    const tempPreferences = rA.preferences;
    
    rA.students = rB.students;
    rA.preferences = rB.preferences;
    
    rB.students = tempStudents;
    rB.preferences = tempPreferences;
    
    setFloors(newFloors);
    setSwapSource(null);
    setSelectedRoom(rB); // Select the target room after swap
  };

  const initiateSwap = (room) => {
    setSwapSource(room);
  };

  const cancelSwap = () => {
    setSwapSource(null);
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setSelectedRoom(null);
    setSwapSource(null);
  };

  const handleAcceptRecommendation = (issueId) => {
    setResolvedIssues(prev => new Set([...prev, issueId]));
    setSelectedIssue(null);
  };

  const handleRejectRecommendation = (issueId) => {
    setResolvedIssues(prev => new Set([...prev, issueId]));
    setSelectedIssue(null);
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

  return (
    <div className="dorm-assignment">
      <div className="dorm-header">
        <div className="header-content">
          <div>
            <h1 className="dorm-title">Dorm Assignment</h1>
            <p className="dorm-subtitle">Review and adjust assignments with human agency</p>
          </div>
          <div className="header-controls">
            <div className="lens-selector">
              <span className="lens-label">View Lens:</span>
              <div className="lens-buttons">
                <button 
                  className={`lens-btn ${activeLens === 'social' ? 'active' : ''}`}
                  onClick={() => setActiveLens('social')}
                >
                  Social Vibe
                </button>
                <button 
                  className={`lens-btn ${activeLens === 'sleep' ? 'active' : ''}`}
                  onClick={() => setActiveLens('sleep')}
                >
                  Sleep Habits
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
                <span className="legend-label">Intensity:</span>
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
            issues={currentFloorIssues}
            selectedRoom={selectedRoom}
            selectedIssue={selectedIssue}
            onRoomClick={handleRoomClick}
            onIssueClick={handleIssueClick}
            activeLens={activeLens}
            swapSource={swapSource}
          />
        </div>

        <IssuePanel
          selectedRoom={selectedRoom}
          selectedIssue={selectedIssue}
          onAccept={handleAcceptRecommendation}
          onReject={handleRejectRecommendation}
          onClose={() => {
            setSelectedRoom(null);
            setSelectedIssue(null);
            setSwapSource(null);
          }}
          activeLens={activeLens}
          swapSource={swapSource}
          onInitiateSwap={initiateSwap}
          onCancelSwap={cancelSwap}
        />
      </div>
    </div>
  );
}

export default DormAssignment;
