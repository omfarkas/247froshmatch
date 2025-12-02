import { useState } from 'react';
import FloorPlan from './components/FloorPlan';
import IssuePanel from './components/IssuePanel';
import IssueList from './components/IssueList';
import './DormAssignment.css';

// Mock data for floors and rooms
const MOCK_FLOORS = [
  {
    id: 1,
    name: 'Floor 1',
    label: 'Staircase Area',
    rooms: [
      { id: 101, position: { x: 10, y: 10 }, students: ['Emma Chen', 'Sofia Rodriguez'], preferences: { social: 8, quiet: 3, interests: ['Soccer', 'Photography', 'Debate'] } },
      { id: 102, position: { x: 10, y: 80 }, students: ['Marcus Johnson', 'Aiden Park'], preferences: { social: 9, quiet: 2, interests: ['Basketball', 'Gaming', 'Music Production'] } },
      { id: 103, position: { x: 10, y: 150 }, students: ['Olivia Martinez', 'Zoe Kim'], preferences: { social: 4, quiet: 8, interests: ['Reading', 'Art', 'Coding'] } },
      { id: 104, position: { x: 10, y: 220 }, students: ['Liam O\'Brien', 'Noah Williams'], preferences: { social: 7, quiet: 5, interests: ['Soccer', 'Film', 'Cooking'] } },
      { id: 105, position: { x: 10, y: 290 }, students: ['Ava Thompson', 'Mia Davis'], preferences: { social: 6, quiet: 6, interests: ['Dance', 'Writing', 'Volunteering'] } },
      
      // Top row
      { id: 106, position: { x: 80, y: 10 }, students: ['Ethan Garcia', 'Lucas Anderson'], preferences: { social: 8, quiet: 4, interests: ['Soccer', 'Robotics', 'Chess'] } },
      { id: 107, position: { x: 150, y: 10 }, students: ['Isabella Lee', 'Charlotte Brown'], preferences: { social: 5, quiet: 7, interests: ['Piano', 'Science', 'Hiking'] } },
      { id: 108, position: { x: 220, y: 10 }, students: ['James Wilson', 'Benjamin Taylor'], preferences: { social: 9, quiet: 3, interests: ['Soccer', 'Theater', 'Debate'] } },
      
      // Right column
      { id: 109, position: { x: 290, y: 10 }, students: ['Amelia Moore', 'Harper Jackson'], preferences: { social: 3, quiet: 9, interests: ['Meditation', 'Yoga', 'Poetry'] } },
      { id: 110, position: { x: 290, y: 80 }, students: ['Daniel Martinez', 'Matthew White'], preferences: { social: 7, quiet: 5, interests: ['Basketball', 'Gaming', 'Coding'] } },
      { id: 111, position: { x: 290, y: 150 }, students: ['Emily Harris', 'Abigail Clark'], preferences: { social: 6, quiet: 6, interests: ['Swimming', 'Art', 'Music'] } },
      { id: 112, position: { x: 290, y: 220 }, students: ['Michael Lewis', 'Alexander Hall'], preferences: { social: 8, quiet: 4, interests: ['Soccer', 'Entrepreneurship', 'Travel'] } },
      
      // Bottom row
      { id: 113, position: { x: 220, y: 290 }, students: ['Sophia Allen', 'Ella Young'], preferences: { social: 5, quiet: 7, interests: ['Reading', 'Baking', 'Languages'] } },
      { id: 114, position: { x: 150, y: 290 }, students: ['William King', 'Henry Wright'], preferences: { social: 9, quiet: 2, interests: ['Soccer', 'Party Planning', 'Social Media'] } },
      { id: 115, position: { x: 80, y: 290 }, students: ['Grace Lopez', 'Chloe Hill'], preferences: { social: 4, quiet: 8, interests: ['Astronomy', 'Painting', 'Classical Music'] } },
    ],
    specialAreas: [
      { type: 'lounge', position: { x: 150, y: 150 }, label: 'Lounge' },
      { type: 'rf', position: { x: 220, y: 150 }, label: 'RF' }
    ]
  },
  {
    id: 2,
    name: 'Floor 2',
    label: 'Middle Section',
    rooms: [
      { id: 201, position: { x: 10, y: 10 }, students: ['Ryan Scott', 'Tyler Green'], preferences: { social: 7, quiet: 5, interests: ['Basketball', 'Music', 'Photography'] } },
      { id: 202, position: { x: 10, y: 80 }, students: ['Natalie Adams', 'Lily Baker'], preferences: { social: 6, quiet: 6, interests: ['Dance', 'Fashion', 'Blogging'] } },
      { id: 203, position: { x: 10, y: 150 }, students: ['Joshua Nelson', 'Andrew Carter'], preferences: { social: 8, quiet: 4, interests: ['Soccer', 'Gaming', 'Fitness'] } },
      { id: 204, position: { x: 10, y: 220 }, students: ['Hannah Mitchell', 'Addison Perez'], preferences: { social: 5, quiet: 7, interests: ['Reading', 'Knitting', 'Gardening'] } },
      { id: 205, position: { x: 10, y: 290 }, students: ['Christopher Roberts', 'David Turner'], preferences: { social: 9, quiet: 3, interests: ['Soccer', 'Parties', 'Vlogging'] } },
      
      { id: 206, position: { x: 80, y: 10 }, students: ['Victoria Phillips', 'Samantha Campbell'], preferences: { social: 4, quiet: 8, interests: ['Study Groups', 'Research', 'Classical Music'] } },
      { id: 207, position: { x: 150, y: 10 }, students: ['Joseph Parker', 'Samuel Evans'], preferences: { social: 7, quiet: 5, interests: ['Basketball', 'Cooking', 'Travel'] } },
      { id: 208, position: { x: 220, y: 10 }, students: ['Madison Edwards', 'Avery Collins'], preferences: { social: 6, quiet: 6, interests: ['Art', 'Music', 'Volunteering'] } },
      
      { id: 209, position: { x: 290, y: 10 }, students: ['Jack Stewart', 'Luke Morris'], preferences: { social: 8, quiet: 4, interests: ['Soccer', 'Debate', 'Politics'] } },
      { id: 210, position: { x: 290, y: 80 }, students: ['Evelyn Rogers', 'Scarlett Reed'], preferences: { social: 3, quiet: 9, interests: ['Meditation', 'Journaling', 'Nature'] } },
      { id: 211, position: { x: 290, y: 150 }, students: ['Gabriel Cook', 'Owen Morgan'], preferences: { social: 7, quiet: 5, interests: ['Gaming', 'Coding', 'Anime'] } },
      { id: 212, position: { x: 290, y: 220 }, students: ['Aria Bell', 'Layla Murphy'], preferences: { social: 5, quiet: 7, interests: ['Piano', 'Art History', 'Museums'] } },
      
      { id: 213, position: { x: 220, y: 290 }, students: ['Dylan Bailey', 'Caleb Rivera'], preferences: { social: 9, quiet: 2, interests: ['Soccer', 'Fraternity Rush', 'Networking'] } },
      { id: 214, position: { x: 150, y: 290 }, students: ['Penelope Cooper', 'Riley Richardson'], preferences: { social: 6, quiet: 6, interests: ['Swimming', 'Photography', 'Travel'] } },
      { id: 215, position: { x: 80, y: 290 }, students: ['Isaac Cox', 'Nathan Howard'], preferences: { social: 4, quiet: 8, interests: ['Chess', 'Programming', 'Math'] } },
    ],
    specialAreas: [
      { type: 'lounge', position: { x: 150, y: 150 }, label: 'Lounge' },
      { type: 'rf', position: { x: 220, y: 150 }, label: 'RF' }
    ]
  },
  {
    id: 3,
    name: 'Floor 3',
    label: 'Upper Level',
    rooms: [
      { id: 301, position: { x: 10, y: 10 }, students: ['Elijah Ward', 'Sebastian Torres'], preferences: { social: 7, quiet: 5, interests: ['Basketball', 'Music Production', 'DJing'] } },
      { id: 302, position: { x: 10, y: 80 }, students: ['Nora Peterson', 'Hazel Gray'], preferences: { social: 5, quiet: 7, interests: ['Reading', 'Tea', 'Calligraphy'] } },
      { id: 303, position: { x: 10, y: 150 }, students: ['Carter Ramirez', 'Wyatt James'], preferences: { social: 8, quiet: 4, interests: ['Soccer', 'Entrepreneurship', 'Startups'] } },
      { id: 304, position: { x: 10, y: 220 }, students: ['Aubrey Watson', 'Brooklyn Brooks'], preferences: { social: 6, quiet: 6, interests: ['Dance', 'Fashion Design', 'Sewing'] } },
      { id: 305, position: { x: 10, y: 290 }, students: ['Julian Kelly', 'Miles Sanders'], preferences: { social: 9, quiet: 3, interests: ['Soccer', 'Gaming', 'Streaming'] } },
      
      { id: 306, position: { x: 80, y: 10 }, students: ['Eleanor Price', 'Claire Bennett'], preferences: { social: 4, quiet: 8, interests: ['Library', 'Writing', 'Book Club'] } },
      { id: 307, position: { x: 150, y: 10 }, students: ['Lincoln Wood', 'Hudson Barnes'], preferences: { social: 7, quiet: 5, interests: ['Basketball', 'Fitness', 'Nutrition'] } },
      { id: 308, position: { x: 220, y: 10 }, students: ['Violet Ross', 'Aurora Henderson'], preferences: { social: 6, quiet: 6, interests: ['Art', 'Yoga', 'Sustainability'] } },
      
      { id: 309, position: { x: 290, y: 10 }, students: ['Grayson Coleman', 'Easton Jenkins'], preferences: { social: 8, quiet: 4, interests: ['Soccer', 'Film Making', 'YouTube'] } },
      { id: 310, position: { x: 290, y: 80 }, students: ['Lucy Perry', 'Anna Powell'], preferences: { social: 3, quiet: 9, interests: ['Quiet Study', 'Research', 'Lab Work'] } },
      { id: 311, position: { x: 290, y: 150 }, students: ['Leo Long', 'Asher Patterson'], preferences: { social: 7, quiet: 5, interests: ['Gaming', 'Esports', 'Tech'] } },
      { id: 312, position: { x: 290, y: 220 }, students: ['Stella Hughes', 'Maya Flores'], preferences: { social: 5, quiet: 7, interests: ['Music', 'Choir', 'A Cappella'] } },
      
      { id: 313, position: { x: 220, y: 290 }, students: ['Jaxon Washington', 'Maverick Butler'], preferences: { social: 9, quiet: 2, interests: ['Soccer', 'Parties', 'Social Events'] } },
      { id: 314, position: { x: 150, y: 290 }, students: ['Zoey Simmons', 'Leah Foster'], preferences: { social: 6, quiet: 6, interests: ['Swimming', 'Cooking', 'Food Blog'] } },
      { id: 315, position: { x: 80, y: 290 }, students: ['Adrian Gonzales', 'Dominic Bryant'], preferences: { social: 4, quiet: 8, interests: ['Chess', 'Debate', 'Philosophy'] } },
    ],
    specialAreas: [
      { type: 'lounge', position: { x: 150, y: 150 }, label: 'Lounge' },
      { type: 'rf', position: { x: 220, y: 150 }, label: 'RF' }
    ]
  }
];

// Mock issues identified by the system
const MOCK_ISSUES = [
  {
    id: 1,
    floorId: 1,
    severity: 'medium',
    title: 'High-energy pair near quiet RF area',
    description: 'Room 108 (James Wilson & Benjamin Taylor) are very social (social: 9) and placed near the RF quiet area. This may cause disruptions.',
    affectedRooms: [108],
    recommendation: {
      action: 'swap',
      fromRoom: 108,
      toRoom: 114,
      reason: 'Room 114 is near the lounge, better suited for social students'
    }
  },
  {
    id: 2,
    floorId: 1,
    severity: 'low',
    title: 'Shy pair in low-traffic area',
    description: 'Room 103 (Olivia Martinez & Zoe Kim) are introverted (social: 4) and in a corner. They might benefit from more social exposure near the lounge.',
    affectedRooms: [103],
    recommendation: {
      action: 'swap',
      fromRoom: 103,
      toRoom: 107,
      reason: 'Room 107 is closer to common areas for gradual social integration'
    }
  },
  {
    id: 3,
    floorId: 1,
    severity: 'high',
    title: 'Multiple soccer players may unbalance teams',
    description: 'Having many soccer players (Rooms 101, 104, 106, 108, 112, 114) on the same floor may unbalance intramural dynamics. Consider distributing across floors.',
    affectedRooms: [101, 104, 106, 108, 112, 114],
    recommendation: {
      action: 'swap',
      fromRoom: 106,
      toRoom: 206,
      reason: 'Redistribute athletic interests across floors for better balance'
    }
  },
  {
    id: 4,
    floorId: 2,
    severity: 'medium',
    title: 'Very quiet pair far from RF support',
    description: 'Room 210 (Evelyn Rogers & Scarlett Reed) prefer quiet (quiet: 9) but are far from the RF area where they could get academic support.',
    affectedRooms: [210],
    recommendation: {
      action: 'swap',
      fromRoom: 210,
      toRoom: 212,
      reason: 'Closer to RF for academic support and mentorship'
    }
  },
  {
    id: 5,
    floorId: 2,
    severity: 'low',
    title: 'Party-oriented pair in middle section',
    description: 'Room 213 (Dylan Bailey & Caleb Rivera) are very social (social: 9) and interested in fraternity rush. Near lounge could amplify noise.',
    affectedRooms: [213],
    recommendation: {
      action: 'leave',
      reason: 'Monitor during first quarter; lounge proximity may actually facilitate healthy social integration'
    }
  },
  {
    id: 6,
    floorId: 3,
    severity: 'medium',
    title: 'Streaming/content creators clustered',
    description: 'Rooms 305 and 309 both have students interested in streaming/content creation. Potential for noise conflicts during recording.',
    affectedRooms: [305, 309],
    recommendation: {
      action: 'swap',
      fromRoom: 305,
      toRoom: 115,
      reason: 'Separate content creators to avoid recording schedule conflicts'
    }
  }
];

function DormAssignment() {
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [resolvedIssues, setResolvedIssues] = useState(new Set());

  const currentFloor = MOCK_FLOORS[currentFloorIndex];
  const currentFloorIssues = MOCK_ISSUES.filter(
    issue => issue.floorId === currentFloor.id && !resolvedIssues.has(issue.id)
  );

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setSelectedIssue(null);
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setSelectedRoom(null);
  };

  const handleAcceptRecommendation = (issueId) => {
    setResolvedIssues(prev => new Set([...prev, issueId]));
    setSelectedIssue(null);
  };

  const handleRejectRecommendation = (issueId) => {
    setResolvedIssues(prev => new Set([...prev, issueId]));
    setSelectedIssue(null);
  };

  const handleNextFloor = () => {
    setCurrentFloorIndex((prev) => (prev + 1) % MOCK_FLOORS.length);
    setSelectedRoom(null);
    setSelectedIssue(null);
  };

  const handlePrevFloor = () => {
    setCurrentFloorIndex((prev) => (prev - 1 + MOCK_FLOORS.length) % MOCK_FLOORS.length);
    setSelectedRoom(null);
    setSelectedIssue(null);
  };

  return (
    <div className="dorm-assignment">
      <div className="dorm-header">
        <h1 className="dorm-title">Dorm Assignment</h1>
        <p className="dorm-subtitle">Review auto-generated room assignments and address flagged concerns</p>
      </div>

      <div className="dorm-content">
        <div className="dorm-main">
          <div className="floor-navigation">
            <button 
              className="floor-nav-btn"
              onClick={handlePrevFloor}
              aria-label="Previous floor"
            >
              ←
            </button>
            <div className="floor-indicator">
              <span className="floor-name">{currentFloor.name}</span>
              <span className="floor-count">Floor {currentFloorIndex + 1} of {MOCK_FLOORS.length}</span>
            </div>
            <button 
              className="floor-nav-btn"
              onClick={handleNextFloor}
              aria-label="Next floor"
            >
              →
            </button>
          </div>

          <FloorPlan
            floor={currentFloor}
            selectedRoom={selectedRoom}
            selectedIssue={selectedIssue}
            onRoomClick={handleRoomClick}
          />

          <IssueList
            issues={currentFloorIssues}
            allIssues={MOCK_ISSUES.filter(i => !resolvedIssues.has(i.id))}
            onIssueClick={handleIssueClick}
            selectedIssue={selectedIssue}
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
          }}
        />
      </div>
    </div>
  );
}

export default DormAssignment;
