import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FloorPlan from "./components/FloorPlan";
import IssuePanel from "./components/IssuePanel";
import { useStageContext } from "../../contexts/StageContext";
import "./DormAssignment.css";

// Mock data for floors and rooms
// Distribution: ~80% night owls (late/very late/slightly late), only 3 athletes/floor, mostly social (7-9) with ~15% shy (2-4)
const MOCK_FLOORS = [
  {
    id: 1,
    name: "Floor 1",
    label: "Main Floor",
    width: 870,
    height: 420,
    rooms: [
      // Top horizontal section - First row (25px tall rooms)
      {
        id: 101,
        zone: "North Hall",
        position: { x: 140, y: 20 },
        students: ["Emma Chen", "Sofia Rodriguez"],
        preferences: {
          social: 8,
          quiet: 3,
          sleep: "late",
          interests: ["Photography", "Coffee"],
          varsity: false,
        },
      },
      {
        id: 102,
        zone: "North Hall",
        position: { x: 200, y: 20 },
        students: ["Marcus Johnson", "Aiden Park"],
        preferences: {
          social: 9,
          quiet: 2,
          sleep: "very late",
          interests: ["Gaming", "Music"],
          varsity: false,
        },
      },
      {
        id: 103,
        zone: "North Hall",
        position: { x: 260, y: 20 },
        students: ["Olivia Martinez", "Zoe Kim"],
        preferences: {
          social: 3,
          quiet: 8,
          sleep: "slightly late",
          interests: ["Reading", "Art"],
          varsity: false,
        },
      },
      {
        id: 104,
        zone: "North Hall",
        position: { x: 320, y: 20 },
        students: ["Liam O'Brien", "Noah Williams"],
        preferences: {
          social: 7,
          quiet: 5,
          sleep: "late",
          interests: ["Film", "Podcasts"],
          varsity: false,
        },
      },
      {
        id: 105,
        zone: "North Hall",
        position: { x: 380, y: 20 },
        students: ["Ava Thompson", "Mia Davis"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "very late",
          interests: ["Dance", "Writing"],
          varsity: false,
        },
      },
      {
        id: 106,
        zone: "North Hall",
        position: { x: 440, y: 20 },
        students: ["Ethan Garcia", "Lucas Anderson"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "late",
          interests: ["Robotics", "Coding"],
          varsity: false,
        },
      },
      {
        id: 107,
        zone: "North Hall",
        position: { x: 500, y: 20 },
        students: ["Isabella Lee", "Charlotte Brown"],
        preferences: {
          social: 7,
          quiet: 5,
          sleep: "slightly late",
          interests: ["Piano", "Science"],
          varsity: false,
        },
      },
      {
        id: 108,
        zone: "North Hall",
        position: { x: 560, y: 20 },
        students: ["James Wilson", "Benjamin Taylor"],
        preferences: {
          social: 9,
          quiet: 3,
          sleep: "very late",
          interests: ["Theater", "Improv"],
          varsity: false,
        },
      },
      {
        id: 109,
        zone: "North Hall",
        position: { x: 620, y: 20 },
        students: ["Amelia Moore", "Harper Jackson"],
        preferences: {
          social: 2,
          quiet: 9,
          sleep: "early",
          interests: ["Meditation", "Yoga"],
          varsity: false,
        },
      },
      {
        id: 110,
        zone: "North Hall",
        position: { x: 680, y: 20 },
        students: ["Daniel Martinez", "Matthew White"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "very late",
          interests: ["Gaming", "Esports"],
          varsity: false,
        },
      },

      // Second row of top section - with hallway gap (25px tall rooms)
      {
        id: 151,
        zone: "North Hall",
        position: { x: 140, y: 105 },
        students: ["Elijah Ward", "Sebastian Torres"],
        preferences: {
          social: 7,
          quiet: 5,
          sleep: "very late",
          interests: ["Music Production", "DJing"],
          varsity: false,
        },
      },
      {
        id: 152,
        zone: "North Hall",
        position: { x: 200, y: 105 },
        students: ["Nora Peterson", "Hazel Gray"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "late",
          interests: ["True Crime", "Coffee"],
          varsity: false,
        },
      },
      {
        id: 153,
        zone: "North Hall",
        position: { x: 260, y: 105 },
        students: ["Carter Ramirez", "Wyatt James"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "slightly late",
          interests: ["Entrepreneurship", "Tech"],
          varsity: false,
        },
      },
      {
        id: 154,
        zone: "North Hall",
        position: { x: 320, y: 105 },
        students: ["Aubrey Watson", "Brooklyn Brooks"],
        preferences: {
          social: 9,
          quiet: 3,
          sleep: "very late",
          interests: ["Dance", "Fashion"],
          varsity: false,
        },
      },
      {
        id: 155,
        zone: "North Hall",
        position: { x: 380, y: 105 },
        students: ["Julian Kelly", "Miles Sanders"],
        preferences: {
          social: 9,
          quiet: 3,
          sleep: "very late",
          interests: ["Gaming", "Streaming"],
          varsity: false,
        },
      },
      {
        id: 156,
        zone: "North Hall",
        position: { x: 440, y: 105 },
        students: ["Eleanor Price", "Claire Bennett"],
        preferences: {
          social: 3,
          quiet: 8,
          sleep: "slightly late",
          interests: ["Library", "Writing"],
          varsity: false,
        },
      },
      {
        id: 157,
        zone: "North Hall",
        position: { x: 500, y: 105 },
        students: ["Lincoln Wood", "Hudson Barnes"],
        preferences: {
          social: 7,
          quiet: 5,
          sleep: "late",
          interests: ["Fitness", "Nutrition"],
          varsity: false,
        },
      },
      {
        id: 158,
        zone: "North Hall",
        position: { x: 560, y: 105 },
        students: ["Violet Ross", "Aurora Henderson"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "slightly late",
          interests: ["Art", "Photography"],
          varsity: false,
        },
      },
      {
        id: 159,
        zone: "North Hall",
        position: { x: 620, y: 105 },
        students: ["Grayson Coleman", "Easton Jenkins"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "late",
          interests: ["Film Making", "Editing"],
          varsity: false,
        },
      },
      {
        id: 160,
        zone: "North Hall",
        position: { x: 680, y: 105 },
        students: ["Lucy Perry", "Anna Powell"],
        preferences: {
          social: 2,
          quiet: 9,
          sleep: "early",
          interests: ["Quiet Study", "Research"],
          varsity: false,
        },
      },

      // Left outer wing (4 rooms down, 25px wide)
      {
        id: 111,
        zone: "West Wing",
        position: { x: 20, y: 140 },
        students: ["Emily Harris", "Abigail Clark"],
        preferences: {
          social: 7,
          quiet: 5,
          sleep: "slightly late",
          interests: ["Art", "Hiking"],
          varsity: false,
        },
      },
      {
        id: 112,
        zone: "West Wing",
        position: { x: 20, y: 200 },
        students: ["Michael Lewis", "Alexander Hall"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "late",
          interests: ["Travel", "Languages"],
          varsity: false,
        },
      },
      {
        id: 113,
        zone: "West Wing",
        position: { x: 20, y: 260 },
        students: ["Sophia Allen", "Ella Young"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "very late",
          interests: ["Baking", "Netflix"],
          varsity: false,
        },
      },
      {
        id: 114,
        zone: "West Wing",
        position: { x: 20, y: 320 },
        students: ["William King", "Henry Wright"],
        preferences: {
          social: 9,
          quiet: 2,
          sleep: "late",
          interests: ["Party Planning", "Music"],
          varsity: false,
        },
      },

      // Left inner wing (4 rooms down, 25px wide - hallway side)
      {
        id: 121,
        zone: "West Wing",
        position: { x: 105, y: 140 },
        students: ["Victoria Phillips", "Samantha Campbell"],
        preferences: {
          social: 7,
          quiet: 5,
          sleep: "late",
          interests: ["Study Groups", "Coffee"],
          varsity: false,
        },
      },
      {
        id: 122,
        zone: "West Wing",
        position: { x: 105, y: 200 },
        students: ["Joseph Parker", "Samuel Evans"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "slightly late",
          interests: ["Cooking", "Food Photography"],
          varsity: false,
        },
      },
      {
        id: 123,
        zone: "West Wing",
        position: { x: 105, y: 260 },
        students: ["Madison Edwards", "Avery Collins"],
        preferences: {
          social: 9,
          quiet: 3,
          sleep: "very late",
          interests: ["Art", "Music"],
          varsity: false,
        },
      },
      {
        id: 124,
        zone: "West Wing",
        position: { x: 105, y: 320 },
        students: ["Jack Stewart", "Luke Morris"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "slightly early",
          interests: ["Soccer", "Debate"],
          varsity: true,
        },
      },

      // Right inner wing (4 rooms down, 25px wide - hallway side)
      {
        id: 131,
        zone: "East Wing",
        position: { x: 740, y: 140 },
        students: ["Gabriel Cook", "Owen Morgan"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "very late",
          interests: ["Gaming", "Coding"],
          varsity: false,
        },
      },
      {
        id: 132,
        zone: "East Wing",
        position: { x: 740, y: 200 },
        students: ["Aria Bell", "Layla Murphy"],
        preferences: {
          social: 7,
          quiet: 5,
          sleep: "slightly late",
          interests: ["Piano", "Art History"],
          varsity: false,
        },
      },
      {
        id: 133,
        zone: "East Wing",
        position: { x: 740, y: 260 },
        students: ["Dylan Bailey", "Caleb Rivera"],
        preferences: {
          social: 9,
          quiet: 2,
          sleep: "late",
          interests: ["Soccer", "Fraternity Rush"],
          varsity: true,
        },
      },
      {
        id: 134,
        zone: "East Wing",
        position: { x: 740, y: 320 },
        students: ["Penelope Cooper", "Riley Richardson"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "slightly early",
          interests: ["Swimming", "Photography"],
          varsity: true,
        },
      },

      // Right outer wing (4 rooms down, 25px wide)
      {
        id: 141,
        zone: "East Wing",
        position: { x: 825, y: 140 },
        students: ["Ryan Scott", "Tyler Green"],
        preferences: {
          social: 7,
          quiet: 5,
          sleep: "late",
          interests: ["Intramural Sports", "Music"],
          varsity: false,
        },
      },
      {
        id: 142,
        zone: "East Wing",
        position: { x: 825, y: 200 },
        students: ["Natalie Adams", "Lily Baker"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "very late",
          interests: ["Dance", "Fashion"],
          varsity: false,
        },
      },
      {
        id: 143,
        zone: "East Wing",
        position: { x: 825, y: 260 },
        students: ["Joshua Nelson", "Andrew Carter"],
        preferences: {
          social: 8,
          quiet: 4,
          sleep: "late",
          interests: ["Concerts", "Gaming"],
          varsity: false,
        },
      },
      {
        id: 144,
        zone: "East Wing",
        position: { x: 825, y: 320 },
        students: ["Hannah Mitchell", "Addison Perez"],
        preferences: {
          social: 3,
          quiet: 8,
          sleep: "slightly late",
          interests: ["Reading", "Knitting"],
          varsity: false,
        },
      },
    ],
    specialAreas: [
      {
        type: "lounge",
        position: { x: 20, y: 20 },
        label: "Student\nLounge",
        width: 110,
        height: 110,
      },
      {
        type: "rf",
        position: { x: 740, y: 20 },
        label: "RF\nApartment",
        width: 110,
        height: 110,
      },
      {
        type: "exit",
        position: { x: 20, y: 380 },
        label: "Exit/\nStairs",
        width: 110,
        height: 60,
      },
      {
        type: "exit",
        position: { x: 740, y: 380 },
        label: "Exit/\nStairs",
        width: 110,
        height: 60,
      },
    ],
  },
];

// Generate floor 2 and 3 with different student names
const generateFloor = (floorNum) => {
  const baseFloor = JSON.parse(JSON.stringify(MOCK_FLOORS[0]));
  baseFloor.id = floorNum;
  baseFloor.name = `Floor ${floorNum}`;
  baseFloor.label = `Floor ${floorNum}`;

  // Update room IDs and generate new student names
  const firstNames = [
    "Alex",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Quinn",
    "Avery",
    "Parker",
    "Sage",
    "Drew",
    "Blake",
    "Cameron",
    "Devon",
    "Finley",
    "Hayden",
    "Jamie",
    "Kendall",
    "Logan",
    "Peyton",
  ];
  const lastNames = [
    "Smith",
    "Jones",
    "Brown",
    "Davis",
    "Wilson",
    "Moore",
    "Taylor",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Garcia",
    "Lee",
    "Clark",
    "Lewis",
    "Young",
    "Walker",
    "Hall",
    "Allen",
  ];

  // Randomize preferences: ~80% night owls (varied), ~15% shy, only 3 athletes
  const athleteRooms = [24, 33, 34]; // Only these 3 rooms get athletes
  const sleepSchedules = [
    "late",
    "very late",
    "slightly late",
    "late",
    "very late",
    "late",
    "slightly late",
    "late",
  ];

  baseFloor.rooms = baseFloor.rooms.map((room, idx) => {
    const roomNum = room.id % 100;
    const isAthlete = athleteRooms.includes(roomNum);
    const isShy = [3, 9, 44, 56, 60].includes(roomNum); // ~15% shy
    const isEarlyRiser = roomNum === 9; // Only 1 early riser pair
    const isSlightlyEarly = roomNum === 24 || roomNum === 34; // Athletes wake earlier

    // Determine sleep schedule with variation
    let sleep;
    if (isEarlyRiser) {
      sleep = "early";
    } else if (isSlightlyEarly) {
      sleep = "slightly early";
    } else {
      sleep = sleepSchedules[(idx + floorNum) % sleepSchedules.length];
    }

    return {
      ...room,
      id: floorNum * 100 + roomNum,
      students: [
        `${firstNames[(idx * 2 + floorNum) % firstNames.length]} ${
          lastNames[(idx * 3 + floorNum) % lastNames.length]
        }`,
        `${firstNames[(idx * 2 + 1 + floorNum) % firstNames.length]} ${
          lastNames[(idx * 3 + 1 + floorNum) % lastNames.length]
        }`,
      ],
      preferences: {
        ...room.preferences,
        social: isShy ? 2 + (idx % 2) : 7 + (idx % 3),
        sleep: sleep,
        varsity: isAthlete,
      },
    };
  });

  return baseFloor;
};

const ALL_FLOORS = [MOCK_FLOORS[0], generateFloor(2), generateFloor(3)];

const createInitialZones = (floorId) => [
  {
    id: `floor${floorId}-west`,
    label: "West Wing",
    stats: { social: "High", sleep: "Late", athletes: "1" },
    insights: [
      "All night owls—perfect for late-night socializing",
      "Jack & Luke (124) are the only athletes here",
      "High social energy—party planning types grouped",
    ],
    considerations: [
      "Near lounge—expect late night hangouts",
      "One athlete may feel isolated from teammates",
      "Great fit for extroverts who stay up late",
    ],
    status: "pending",
    roomIds: [
      floorId * 100 + 11,
      floorId * 100 + 12,
      floorId * 100 + 13,
      floorId * 100 + 14,
      floorId * 100 + 21,
      floorId * 100 + 22,
      floorId * 100 + 23,
      floorId * 100 + 24,
    ],
  },
  {
    id: `floor${floorId}-north-west`,
    label: "North Hall (West)",
    stats: { social: "High", sleep: "Late", athletes: "0" },
    insights: [
      "Night owl corridor—all late sleepers",
      "Shy students Olivia & Zoe in Room 103",
      "Music production + DJing students grouped",
    ],
    considerations: [
      "Room 103 introverts surrounded by extroverts",
      "Consider swapping shy pair to North East",
      "Far from lounge—good for focused socializing",
    ],
    status: "pending",
    roomIds: [
      floorId * 100 + 1,
      floorId * 100 + 2,
      floorId * 100 + 3,
      floorId * 100 + 4,
      floorId * 100 + 5,
      floorId * 100 + 51,
      floorId * 100 + 52,
      floorId * 100 + 53,
      floorId * 100 + 54,
      floorId * 100 + 55,
    ],
  },
  {
    id: `floor${floorId}-north-east`,
    label: "North Hall (East)",
    stats: { social: "Mixed", sleep: "Late", athletes: "0" },
    insights: [
      "2 shy pairs placed in quieter corner (109, 160)",
      "Early risers Amelia & Harper isolated here",
      "Theater + Film students near each other",
    ],
    considerations: [
      "Room 109 early risers may clash with night owls",
      "Good spot for introverts—less foot traffic",
      "Consider moving early risers off this floor",
    ],
    status: "pending",
    roomIds: [
      floorId * 100 + 6,
      floorId * 100 + 7,
      floorId * 100 + 8,
      floorId * 100 + 9,
      floorId * 100 + 10,
      floorId * 100 + 56,
      floorId * 100 + 57,
      floorId * 100 + 58,
      floorId * 100 + 59,
      floorId * 100 + 60,
    ],
  },
  {
    id: `floor${floorId}-east`,
    label: "East Wing",
    stats: { social: "High", sleep: "Late", athletes: "2" },
    insights: [
      "Dylan & Penelope—floor's only 2 varsity athletes",
      "High social energy matches rest of floor",
      "One shy pair (Hannah & Addison) in corner 144",
    ],
    considerations: [
      "Athletes near gym exit—good for early practice",
      "Shy pair may feel out of place—check in",
      "Strong social cohesion, late-night friendly",
    ],
    status: "pending",
    roomIds: [
      floorId * 100 + 31,
      floorId * 100 + 32,
      floorId * 100 + 33,
      floorId * 100 + 34,
      floorId * 100 + 41,
      floorId * 100 + 42,
      floorId * 100 + 43,
      floorId * 100 + 44,
    ],
  },
];

function DormAssignment() {
  const navigate = useNavigate();
  const { completeStage } = useStageContext();
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [activeLens, setActiveLens] = useState("social");
  const [swapSource, setSwapSource] = useState(null);
  const [swapTarget, setSwapTarget] = useState(null);
  const [showSwapConfirm, setShowSwapConfirm] = useState(false);
  const [floors, setFloors] = useState(ALL_FLOORS);
  const [allZones, setAllZones] = useState({
    1: createInitialZones(1),
    2: createInitialZones(2),
    3: createInitialZones(3),
  });

  const currentFloor = floors[currentFloorIndex];
  const zones = allZones[currentFloor.id];
  const floorApprovedCount = zones.filter(
    (z) => z.status === "approved"
  ).length;
  const floorComplete = floorApprovedCount === zones.length;

  // Total progress across ALL floors
  const totalSections = Object.values(allZones).flat().length;
  const totalApproved = Object.values(allZones)
    .flat()
    .filter((z) => z.status === "approved").length;

  // Check if ALL floors are complete
  const allFloorsComplete = Object.values(allZones).every((floorZones) =>
    floorZones.every((z) => z.status === "approved")
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
    // If clicking the same zone, deselect it
    if (selectedZone?.id === zone.id) {
      setSelectedZone(null);
    } else {
      setSelectedZone(zone);
    }
    setSelectedRoom(null);
    setSwapSource(null);
  };

  const handleApproveZone = (zoneId) => {
    setAllZones((prev) => ({
      ...prev,
      [currentFloor.id]: prev[currentFloor.id].map((z) =>
        z.id === zoneId ? { ...z, status: "approved" } : z
      ),
    }));
    setSelectedZone(null);
  };

  const handleUnapproveZone = (zoneId) => {
    setAllZones((prev) => ({
      ...prev,
      [currentFloor.id]: prev[currentFloor.id].map((z) =>
        z.id === zoneId ? { ...z, status: "pending" } : z
      ),
    }));
    setSelectedZone(null);
  };

  const confirmSwap = () => {
    if (!swapSource || !swapTarget) return;

    const newFloors = JSON.parse(JSON.stringify(floors));
    const floor = newFloors[currentFloorIndex];

    const rA = floor.rooms.find((r) => r.id === swapSource.id);
    const rB = floor.rooms.find((r) => r.id === swapTarget.id);

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
      case "social":
        return { low: "Low", high: "High" };
      case "sleep":
        return { low: "Early", high: "Late" };
      case "varsity":
        return { low: "Not Athlete", high: "Athlete" };
      default:
        return { low: "Low", high: "High" };
    }
  };

  const legendLabels = getLegendLabels();

  // Get rooms for a zone
  const getRoomsForZone = (zone) => {
    return currentFloor.rooms.filter((r) => zone.roomIds.includes(r.id));
  };

  // Get contextual insights for a room based on location and neighbors
  const getRoomContext = (room) => {
    const insights = [];

    // Location-based insights
    if (room.zone === "West Wing") {
      insights.push("5 steps from common room—great for socializing");
      if (room.position.y < 200) {
        insights.push("Faces quad courtyard—morning sun exposure");
      }
    }
    if (room.zone === "East Wing") {
      insights.push("Near east stairwell—quick gym access");
      if (room.preferences.varsity) {
        insights.push("Close to other athletes for early practice runs");
      }
    }
    if (room.zone?.includes("North")) {
      insights.push("Quietest hallway—far from main entrance");
    }
    if (room.position.x < 100 || room.position.x > 750) {
      insights.push("Corner room—extra window, more natural light");
    }

    // Student-specific insights based on their preferences
    if (room.preferences.social >= 8) {
      insights.push("High-social student placed in active corridor");
    }
    if (room.preferences.sleep === "early" && room.zone === "West Wing") {
      insights.push("⚠️ Early riser near social lounge—may want to swap");
    }
    if (room.preferences.varsity && room.zone?.includes("North")) {
      insights.push("Athlete placed far from gym entrance—consider swap");
    }

    // Neighbor compatibility
    const neighbors = currentFloor.rooms.filter((r) => {
      const dx = Math.abs(r.position.x - room.position.x);
      const dy = Math.abs(r.position.y - room.position.y);
      return r.id !== room.id && dx <= 60 && dy <= 60;
    });

    if (neighbors.length > 0) {
      const sameSchedule = neighbors.filter(
        (n) => n.preferences.sleep === room.preferences.sleep
      );
      if (sameSchedule.length === neighbors.length) {
        insights.push("✓ All neighbors have matching sleep schedule");
      } else if (
        sameSchedule.length === 0 &&
        room.preferences.sleep === "early"
      ) {
        insights.push("⚠️ Only early riser among night owl neighbors");
      }

      const athleteNeighbors = neighbors.filter((n) => n.preferences.varsity);
      if (room.preferences.varsity && athleteNeighbors.length >= 2) {
        insights.push("✓ Surrounded by fellow athletes—team cohesion");
      }
    }

    return insights.slice(0, 4); // Limit to 4 most relevant
  };

  // Mark stage 3 as complete when all floors are done
  useEffect(() => {
    if (allFloorsComplete) {
      completeStage(3);
    }
  }, [allFloorsComplete]);

  if (allFloorsComplete) {
    return (
      <div className="dorm-assignment completion-screen">
        <div className="completion-content">
          <div className="completion-icon">✓</div>
          <h1>All Floors Reviewed!</h1>
          <p>
            You have successfully reviewed and approved all wing assignments
            across all 3 floors.
          </p>
          <button className="completion-btn" onClick={() => navigate("/")}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dorm-assignment">
      <div style={{ padding: "20px" }}>
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>
      <div className="dorm-header">
        <div className="header-content">
          <div>
            <h1 className="dorm-title">Dorm Assignment</h1>
            <p className="dorm-subtitle">
              Assign roommate pairs to rooms in Crothers Memorial.
            </p>
          </div>
          <div className="header-controls">
            {/* Progress Tracker */}
            <div className="progress-tracker">
              <span className="progress-label">
                {totalApproved}/{totalSections}
              </span>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${(totalApproved / totalSections) * 100}%` }}
                />
              </div>
            </div>

            <div className="lens-selector">
              <span className="lens-label">Lens:</span>
              <div className="lens-buttons">
                <button
                  className={`lens-btn ${
                    activeLens === "social" ? "active" : ""
                  }`}
                  onClick={() => setActiveLens("social")}
                >
                  Social
                </button>
                <button
                  className={`lens-btn ${
                    activeLens === "sleep" ? "active" : ""
                  }`}
                  onClick={() => setActiveLens("sleep")}
                >
                  Sleep
                </button>
                <button
                  className={`lens-btn ${
                    activeLens === "varsity" ? "active" : ""
                  }`}
                  onClick={() => setActiveLens("varsity")}
                >
                  Athletes
                </button>
              </div>
            </div>

            {activeLens !== "none" && (
              <div className="color-legend">
                <div className="legend-gradient">
                  <span className="legend-text">{legendLabels.low}</span>
                  <div className={`gradient-bar ${activeLens}-gradient`}></div>
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
            floors={floors}
            currentFloorIndex={currentFloorIndex}
            onChangeFloor={changeFloor}
            floorComplete={floorComplete}
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
          onUnapproveZone={handleUnapproveZone}
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
                <p>{swapSource.students.join(" & ")}</p>
                <div className="swap-room-habits">
                  <div className="habit-item">
                    <span className="habit-label">Social:</span>
                    <span className="habit-value">
                      {swapSource.preferences.social}/10
                    </span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-label">Sleep:</span>
                    <span className="habit-value capitalize">
                      {swapSource.preferences.sleep}
                    </span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-label">Athlete:</span>
                    <span className="habit-value">
                      {swapSource.preferences.varsity ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="swap-arrow">⇄</div>
              <div className="swap-room">
                <strong>Room {swapTarget.id}</strong>
                <p>{swapTarget.students.join(" & ")}</p>
                <div className="swap-room-habits">
                  <div className="habit-item">
                    <span className="habit-label">Social:</span>
                    <span className="habit-value">
                      {swapTarget.preferences.social}/10
                    </span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-label">Sleep:</span>
                    <span className="habit-value capitalize">
                      {swapTarget.preferences.sleep}
                    </span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-label">Athlete:</span>
                    <span className="habit-value">
                      {swapTarget.preferences.varsity ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
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
