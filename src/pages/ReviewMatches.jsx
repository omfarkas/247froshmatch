import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MatchCard from "../components/MatchCard";
import ProfileCard from "../components/ProfileCard";
import Toolbar from "../components/Toolbar";
import TutorialOverlay from "../components/TutorialOverlay";
import { Search, SlidersHorizontal } from "lucide-react";
import { useStageContext } from "../contexts/StageContext";
import "./ReviewMatches.css";

const ReviewMatches = () => {
  const navigate = useNavigate();
  const { completeStage } = useStageContext();

  // Mock data for matches - includes students from Stage 1 (Joey, Steve, Barack, Mitt, Taylor, Sabrina)
  const [matches, setMatches] = useState([
    {
      id: 1,
      type: "match",
      person1: "Joey C",
      person2: "Steve I",
      x: 50,
      y: 50,
      gender: "male",
      rating: 5,
      notes:
        "Both early birds! Up at 5am, love outdoors and nature. Joey plays Ultimate Frisbee.",
      location: "sidebar",
    },
    {
      id: 2,
      type: "match",
      person1: "Barack O",
      person2: "Mitt R",
      x: 50,
      y: 50,
      gender: "male",
      rating: 4,
      notes:
        "Both interested in public policy and leadership. Different perspectives but respectful.",
      location: "sidebar",
    },
    {
      id: 3,
      type: "match",
      person1: "Taylor S",
      person2: "Sabrina C",
      x: 50,
      y: 250,
      gender: "female",
      rating: 5,
      notes: "Both musicians and night owls! Love songwriting and performing.",
      location: "sidebar",
    },
    {
      id: 4,
      type: "match",
      person1: "Emma C",
      person2: "Sofia R",
      x: 350,
      y: 50,
      gender: "female",
      rating: 4,
      notes: "Photography enthusiasts, similar sleep schedules",
      location: "canvas",
    },
    {
      id: 5,
      type: "match",
      person1: "Marcus J",
      person2: "Aiden P",
      x: 650,
      y: 50,
      gender: "male",
      rating: 3,
      notes: "Gaming and music lovers, very late sleepers",
      location: "canvas",
    },
    {
      id: 6,
      type: "match",
      person1: "Olivia M",
      person2: "Zoe K",
      x: 50,
      y: 450,
      gender: "female",
      rating: 5,
      notes: "Quiet, artistic types. Both love reading.",
      location: "sidebar",
    },
    {
      id: 7,
      type: "match",
      person1: "Liam O",
      person2: "Noah W",
      x: 50,
      y: 220,
      gender: "male",
      rating: 4,
      notes: "Film buffs, podcast enthusiasts",
      location: "canvas",
    },
    {
      id: 8,
      type: "match",
      person1: "Ava T",
      person2: "Mia D",
      x: 350,
      y: 220,
      gender: "female",
      rating: 5,
      notes: "Dance and creative writing, night owls",
      location: "canvas",
    },
    {
      id: 9,
      type: "match",
      person1: "Ethan G",
      person2: "Lucas A",
      x: 50,
      y: 50,
      gender: "male",
      rating: 4,
      notes: "Robotics and coding enthusiasts",
      location: "sidebar",
    },
    {
      id: 10,
      type: "match",
      person1: "Isabella L",
      person2: "Charlotte B",
      x: 650,
      y: 220,
      gender: "female",
      rating: 4,
      notes: "Piano players, science majors",
      location: "canvas",
    },
    {
      id: 11,
      type: "match",
      person1: "James W",
      person2: "Benjamin T",
      x: 50,
      y: 50,
      gender: "male",
      rating: 5,
      notes: "Theater and improv, very social",
      location: "sidebar",
    },
    {
      id: 12,
      type: "match",
      person1: "Amelia M",
      person2: "Harper J",
      x: 50,
      y: 390,
      gender: "female",
      rating: 4,
      notes: "Early risers, yoga and meditation",
      location: "canvas",
    },
    {
      id: 13,
      type: "match",
      person1: "Daniel M",
      person2: "Matthew W",
      x: 50,
      y: 50,
      gender: "male",
      rating: 3,
      notes: "Gamers and esports fans",
      location: "sidebar",
    },
    {
      id: 14,
      type: "match",
      person1: "Elijah W",
      person2: "Sebastian T",
      x: 350,
      y: 390,
      gender: "male",
      rating: 4,
      notes: "Music production, DJing",
      location: "canvas",
    },
    {
      id: 15,
      type: "match",
      person1: "Nora P",
      person2: "Hazel G",
      x: 650,
      y: 390,
      gender: "female",
      rating: 4,
      notes: "True crime fans, coffee lovers",
      location: "canvas",
    },
  ]);

  // Mock data for individual profiles
  const [profiles, setProfiles] = useState([]);
  const [nextProfileId, setNextProfileId] = useState(1);

  const [scissorMode, setScissorMode] = useState(false);
  const [genderFilter, setGenderFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMatches, setSelectedMatches] = useState([]); // Track selected matches
  const [draggedProfileId, setDraggedProfileId] = useState(null); // Track which profile is being dragged
  const [showTutorial, setShowTutorial] = useState(false);

  const toggleMatchSelection = (matchId) => {
    setSelectedMatches((prev) => {
      if (prev.includes(matchId)) {
        // Deselect
        return prev.filter((id) => id !== matchId);
      } else {
        // Select
        return [...prev, matchId];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedMatches.length === 0) {
      alert("No matches selected");
      return;
    }

    // Remove selected matches
    setMatches(matches.filter((m) => !selectedMatches.includes(m.id)));
    setSelectedMatches([]); // Clear selection
    console.log("Confirmed and removed matches:", selectedMatches);
  };

  const handleProfileDragStart = (profileId) => {
    console.log("Profile drag started:", profileId);
    setDraggedProfileId(profileId);
  };

  const handleProfileDragEnd = () => {
    console.log("Profile drag ended");
    setDraggedProfileId(null);
  };

  // Calculate recommended matches based on dragged profile
  const getRecommendedMatches = (profileId) => {
    if (!profileId) return [];

    const draggedProfile = profiles.find((p) => p.id === profileId);
    if (!draggedProfile) return [];

    // Filter matches by same gender and not already a triple
    return matches
      .filter(
        (match) => match.gender === draggedProfile.gender && !match.person3 // Only pairs, not triples
      )
      .sort((a, b) => b.rating - a.rating) // Sort by rating, highest first
      .slice(0, 3) // Top 3 recommendations
      .map((m) => m.id);
  };

  const recommendedMatchIds = getRecommendedMatches(draggedProfileId);

  const checkCollision = (card1, card2) => {
    const CARD_WIDTH = 280; // Approximate width of match card
    const CARD_HEIGHT = 140; // Approximate height of match card
    const PADDING = 20; // Extra padding to prevent tight overlaps

    return (
      card1.x < card2.x + CARD_WIDTH + PADDING &&
      card1.x + CARD_WIDTH + PADDING > card2.x &&
      card1.y < card2.y + CARD_HEIGHT + PADDING &&
      card1.y + CARD_HEIGHT + PADDING > card2.y
    );
  };

  const nudgeAwayFromCollisions = (draggedCard, allCards) => {
    const NUDGE_DISTANCE = 300; // How far to push cards away

    return allCards.map((card) => {
      if (card.id === draggedCard.id) return card;

      if (checkCollision(draggedCard, card)) {
        // Calculate direction to nudge
        const dx = card.x - draggedCard.x;
        const dy = card.y - draggedCard.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) {
          // If cards are exactly on top of each other, nudge right
          return { ...card, x: card.x + NUDGE_DISTANCE };
        }

        // Normalize and apply nudge
        const nudgeX = (dx / distance) * NUDGE_DISTANCE;
        const nudgeY = (dy / distance) * NUDGE_DISTANCE;

        return {
          ...card,
          x: Math.max(0, card.x + nudgeX),
          y: Math.max(0, card.y + nudgeY),
        };
      }

      return card;
    });
  };

  const handleMatchDrag = (id, data) => {
    const draggedMatch = {
      ...matches.find((m) => m.id === id),
      x: data.x,
      y: data.y,
    };

    // Check for collisions and nudge other cards in real-time
    let updatedMatches = matches.map((m) => (m.id === id ? draggedMatch : m));

    updatedMatches = nudgeAwayFromCollisions(draggedMatch, updatedMatches);
    setMatches(updatedMatches);
  };

  const handleMatchStop = (id, data) => {
    // Final position update is already handled by handleMatchDrag
    const draggedMatch = {
      ...matches.find((m) => m.id === id),
      x: data.x,
      y: data.y,
    };

    // Check if the card was dragged into the sidebar area (x < 0 means it's in the sidebar)
    const SIDEBAR_WIDTH = 450;
    const canvasElement = document.querySelector(".canvas-area");
    const canvasRect = canvasElement?.getBoundingClientRect();

    // Calculate absolute position
    const absoluteX = canvasRect ? canvasRect.left + data.x : data.x;

    // If dragged to the left of the canvas (into sidebar area)
    if (absoluteX < SIDEBAR_WIDTH) {
      console.log("Card dragged into sidebar area");
      // Move to sidebar
      const updatedMatch = {
        ...draggedMatch,
        location: "sidebar",
        x: 0, // Reset position for sidebar
        y: 0,
      };

      // Remove the card from its current position and add it to the front
      const otherMatches = matches.filter((m) => m.id !== id);
      setMatches([updatedMatch, ...otherMatches]);
      return;
    }

    let updatedMatches = matches.map((m) => (m.id === id ? draggedMatch : m));

    updatedMatches = nudgeAwayFromCollisions(draggedMatch, updatedMatches);
    setMatches(updatedMatches);
  };

  const handleProfileStop = (id, data) => {
    const PROFILE_WIDTH = 140;
    const PROFILE_HEIGHT = 140;
    const MATCH_WIDTH = 280;
    const MATCH_HEIGHT = 140;
    const PADDING = 20;
    const PROXIMITY_THRESHOLD = 150; // For combining
    const SIDEBAR_WIDTH = 450;

    const draggedProfile = {
      ...profiles.find((p) => p.id === id),
      x: data.x,
      y: data.y,
    };

    // Check if profile was dropped in the sidebar area
    const canvasElement = document.querySelector(".canvas-area");
    const canvasRect = canvasElement?.getBoundingClientRect();
    const absoluteX = canvasRect ? canvasRect.left + data.x : data.x;

    // If dropped in sidebar area, check if it's over a match card
    if (absoluteX < SIDEBAR_WIDTH) {
      console.log("Profile dropped in sidebar area");

      // Get all sidebar match elements and check if profile was dropped on one
      const sidebarMatches = matches.filter(
        (m) => m.location === "sidebar" && !m.person3
      );

      // Find which match card (if any) the profile was dropped on
      // We'll use a simple approach: check the vertical position
      const sidebarElement = document.querySelector(".sidebar-content");
      const sidebarRect = sidebarElement?.getBoundingClientRect();

      if (sidebarRect) {
        const relativeY = data.y; // Y position relative to drag start
        const mouseY = window.event?.clientY || 0;

        // Get all match card elements in sidebar
        const matchElements = document.querySelectorAll(".sidebar-item");
        let targetMatchId = null;

        matchElements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          if (mouseY >= rect.top && mouseY <= rect.bottom) {
            // Found the match card we're hovering over
            const sidebarMatchesArray = sidebarMatches;
            if (sidebarMatchesArray[index]) {
              targetMatchId = sidebarMatchesArray[index].id;
            }
          }
        });

        if (targetMatchId) {
          console.log("Profile dropped on match:", targetMatchId);
          const targetMatch = matches.find((m) => m.id === targetMatchId);

          if (targetMatch && !targetMatch.person3) {
            // Convert pair to triple
            const updatedMatch = {
              ...targetMatch,
              person3: draggedProfile.name,
            };

            // Remove the profile and update the match
            setProfiles(profiles.filter((p) => p.id !== id));
            setMatches(
              matches.map((m) => (m.id === targetMatchId ? updatedMatch : m))
            );
            console.log("Created triple:", updatedMatch);
            return;
          }
        }
      }

      // If not dropped on a specific match, just remove from canvas
      return;
    }

    // Update position first
    let updatedProfiles = profiles.map((p) =>
      p.id === id ? draggedProfile : p
    );

    // CHECK FOR COMBINING FIRST (before collision detection)
    const nearbyProfiles = updatedProfiles.filter((p) => {
      if (p.id === id) return false;
      const distance = Math.sqrt(
        Math.pow(p.x - draggedProfile.x, 2) +
          Math.pow(p.y - draggedProfile.y, 2)
      );
      return distance < PROXIMITY_THRESHOLD;
    });

    // Also check for nearby matches (to add a third person to a pair)
    const nearbyMatches = matches.filter((m) => {
      const distance = Math.sqrt(
        Math.pow(m.x - draggedProfile.x, 2) +
          Math.pow(m.y - draggedProfile.y, 2)
      );
      return distance < PROXIMITY_THRESHOLD && !m.person3; // Only pairs, not existing triples
    });

    // If there's a nearby match (pair), add this profile to make a triple
    if (nearbyMatches.length === 1 && nearbyProfiles.length === 0) {
      const matchToExpand = nearbyMatches[0];

      console.log(
        "Adding profile to existing match:",
        draggedProfile.name,
        "to",
        matchToExpand
      );

      const expandedMatch = {
        ...matchToExpand,
        person3: draggedProfile.name,
      };

      // Remove the profile and update the match
      setProfiles(updatedProfiles.filter((p) => p.id !== id));
      setMatches(
        matches.map((m) => (m.id === matchToExpand.id ? expandedMatch : m))
      );

      console.log("Created triple:", expandedMatch);
      return; // Exit early
    }

    // If there are nearby profiles, combine them
    if (nearbyProfiles.length > 0 && nearbyProfiles.length <= 2) {
      const profilesToCombine = [draggedProfile, ...nearbyProfiles]; // Don't slice, allow all

      console.log(
        "Combining profiles:",
        profilesToCombine.map((p) => p.name)
      );

      // Calculate average position
      const avgX =
        profilesToCombine.reduce((sum, p) => sum + p.x, 0) /
        profilesToCombine.length;
      const avgY =
        profilesToCombine.reduce((sum, p) => sum + p.y, 0) /
        profilesToCombine.length;

      // Create a new match from the profiles
      const newMatch = {
        id: `match-${Date.now()}`,
        type: "match",
        person1: profilesToCombine[0].name,
        person2: profilesToCombine[1].name,
        person3: profilesToCombine[2]?.name, // Optional third person
        x: avgX,
        y: avgY,
        gender: profilesToCombine[0].gender,
        rating: 3,
        notes: "Manually combined group",
        location: "canvas", // New matches go to canvas
      };

      console.log("Created match:", newMatch);

      // Remove the combined profiles and add the new match
      const profileIdsToRemove = profilesToCombine.map((p) => p.id);
      setProfiles(
        updatedProfiles.filter((p) => !profileIdsToRemove.includes(p.id))
      );
      setMatches([...matches, newMatch]);

      return; // Exit early, don't do collision detection
    }

    // ONLY DO COLLISION DETECTION IF NOT COMBINING
    const checkProfileCollision = (profile, otherCard, isMatch = false) => {
      const otherWidth = isMatch ? MATCH_WIDTH : PROFILE_WIDTH;
      const otherHeight = isMatch ? MATCH_HEIGHT : PROFILE_HEIGHT;

      return (
        profile.x < otherCard.x + otherWidth + PADDING &&
        profile.x + PROFILE_WIDTH + PADDING > otherCard.x &&
        profile.y < otherCard.y + otherHeight + PADDING &&
        profile.y + PROFILE_HEIGHT + PADDING > otherCard.y
      );
    };

    // Check for collisions with other profiles
    updatedProfiles = updatedProfiles.map((p) => {
      if (p.id === id) return p;

      if (checkProfileCollision(draggedProfile, p, false)) {
        const dx = p.x - draggedProfile.x;
        const dy = p.y - draggedProfile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) {
          return { ...p, x: p.x + 200 };
        }

        const nudgeX = (dx / distance) * 200;
        const nudgeY = (dy / distance) * 200;

        return {
          ...p,
          x: Math.max(0, p.x + nudgeX),
          y: Math.max(0, p.y + nudgeY),
        };
      }

      return p;
    });

    // Check for collisions with matches and nudge matches away
    let updatedMatches = matches.map((m) => {
      if (checkProfileCollision(draggedProfile, m, true)) {
        const dx = m.x - draggedProfile.x;
        const dy = m.y - draggedProfile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) {
          return { ...m, x: m.x + 300 };
        }

        const nudgeX = (dx / distance) * 300;
        const nudgeY = (dy / distance) * 300;

        return {
          ...m,
          x: Math.max(0, m.x + nudgeX),
          y: Math.max(0, m.y + nudgeY),
        };
      }

      return m;
    });

    setProfiles(updatedProfiles);
    setMatches(updatedMatches);
  };

  const handleMatchSplit = (matchId) => {
    console.log(
      "handleMatchSplit called for:",
      matchId,
      "scissorMode:",
      scissorMode
    );
    if (scissorMode) {
      const matchToSplit = matches.find((m) => m.id === matchId);
      console.log("Match to split:", matchToSplit);

      if (!matchToSplit) {
        console.error("Match not found for splitting:", matchId);
        return;
      }

      // Ensure coordinates are valid numbers
      const startX = typeof matchToSplit.x === "number" ? matchToSplit.x : 0;
      const startY = typeof matchToSplit.y === "number" ? matchToSplit.y : 0;

      // Create two individual profiles from the match
      const profile1 = {
        id: `profile-${nextProfileId}`,
        type: "profile",
        name: matchToSplit.person1 || "Unknown",
        x: startX - 80, // Offset to the left
        y: startY,
        gender: matchToSplit.gender,
        location: matchToSplit.location || "canvas",
      };

      const profile2 = {
        id: `profile-${nextProfileId + 1}`,
        type: "profile",
        name: matchToSplit.person2 || "Unknown",
        x: startX + 80, // Offset to the right
        y: startY,
        gender: matchToSplit.gender,
        location: matchToSplit.location || "canvas",
      };

      console.log("Creating profiles:", profile1, profile2);

      // Remove the match and add the two profiles
      setMatches(matches.filter((m) => m.id !== matchId));
      setProfiles([...profiles, profile1, profile2]);
      setNextProfileId(nextProfileId + 2);

      console.log("Split complete");
    }
  };

  const filteredMatches = matches.filter((match) => {
    const matchesGender =
      genderFilter === "all" || match.gender === genderFilter;
    const matchesSearch =
      searchQuery === "" ||
      match.person1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.person2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (match.person3 &&
        match.person3.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGender && matchesSearch;
  });

  const filteredProfiles = profiles.filter((profile) => {
    const matchesGender =
      genderFilter === "all" || profile.gender === genderFilter;
    const matchesSearch =
      searchQuery === "" ||
      profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGender && matchesSearch;
  });

  const sidebarMatches = filteredMatches.filter(
    (m) => m.location === "sidebar"
  );
  const canvasMatches = filteredMatches.filter((m) => m.location !== "sidebar");
  const sidebarProfiles = filteredProfiles.filter(
    (p) => p.location === "sidebar"
  );
  const canvasProfiles = filteredProfiles.filter(
    (p) => p.location !== "sidebar"
  );

  const handleContinueToDorm = () => {
    completeStage(2);
    navigate("/dorm");
  };

  return (
    <div className="review-matches-container">
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
        <button
          onClick={handleContinueToDorm}
          style={{
            padding: "12px 24px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Continue to Dorm Assignment →
        </button>
      </div>

      <div className="split-layout">
        {/* Left Sidebar */}
        <div className="sidebar-area">
          <div className="sidebar-header">
            <h2>Matches</h2>
            <div className="sidebar-actions">
              <button className="confirm-btn" onClick={handleConfirm}>
                confirm{" "}
                {selectedMatches.length > 0 && `(${selectedMatches.length})`}
              </button>
              <button className="filter-icon-btn">
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>
          <div className="sidebar-content">
            {sidebarMatches.map((match) => (
              <div key={match.id} className="sidebar-item">
                <MatchCard
                  match={match}
                  defaultPosition={{ x: 0, y: 0 }}
                  onDrag={() => {}} // Disable drag in sidebar for now
                  onStop={() => {}}
                  onClick={() => {}}
                  isScissorMode={false}
                  isStatic={true}
                  isSelected={selectedMatches.includes(match.id)}
                  onToggleSelect={toggleMatchSelection}
                  isHighlighted={recommendedMatchIds.includes(match.id)}
                />
              </div>
            ))}
            {sidebarProfiles.map((profile) => (
              <div key={profile.id} className="sidebar-item">
                <ProfileCard
                  profile={profile}
                  defaultPosition={{ x: 0, y: 0 }}
                  onStop={() => {}} // Disable drag/drop in sidebar for now
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Canvas */}
        <div className="canvas-section">
          <div className="canvas-header">
            <h2>Saved</h2>
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="filter-icon-btn">
              <SlidersHorizontal size={20} />
            </button>
          </div>

          <div className="canvas-area">
            {canvasMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                defaultPosition={{ x: match.x, y: match.y }}
                onDrag={handleMatchDrag}
                onStop={handleMatchStop}
                onClick={() => handleMatchSplit(match.id)}
                isScissorMode={scissorMode}
                isHighlighted={recommendedMatchIds.includes(match.id)}
              />
            ))}
            {canvasProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                defaultPosition={{ x: profile.x, y: profile.y }}
                onStart={handleProfileDragStart}
                onStop={(id, data) => {
                  handleProfileStop(id, data);
                  handleProfileDragEnd();
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <Toolbar
        scissorMode={scissorMode}
        onToggleScissor={() => setScissorMode(!scissorMode)}
        genderFilter={genderFilter}
        onGenderChange={setGenderFilter}
      />
    </div>
  );
};

export default ReviewMatches;
