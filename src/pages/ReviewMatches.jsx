import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MatchCard from "../components/MatchCard";
import ProfileCard from "../components/ProfileCard";
// import Toolbar from "../components/Toolbar"; // Removed
import TutorialOverlay from "../components/TutorialOverlay";
import { Search, SlidersHorizontal } from "lucide-react";
import { useStageContext } from "../contexts/StageContext";
import "./ReviewMatches.css";

const ReviewMatches = () => {
  const navigate = useNavigate();
  const { completeStage } = useStageContext();

  // Mock data for matches - only 3 pairs for demo
  const [matches, setMatches] = useState([
    {
      id: 1,
      type: "match",
      person1: "Joey C",
      person2: "Barack O",
      x: 50,
      y: 50,
      gender: "male",
      rating: 4,
      person1Notes:
        "Early bird, loves outdoors and nature. Plays Ultimate Frisbee.",
      person1Sleep: "early",
      person1Social: 7,
      person1Athlete: true,
      person2Notes:
        "Interested in leadership and public service. Brings calm energy.",
      person2Sleep: "early",
      person2Social: 8,
      person2Athlete: true,
      location: "sidebar",
      hasWarning: true,
    },
    {
      id: 2,
      type: "match",
      person1: "Sabrina C",
      person2: "Taylor S",
      x: 50,
      y: 250,
      gender: "female",
      rating: 5,
      person1Notes:
        "Musician and night owl. Loves songwriting and coffee shop vibes.",
      person1Sleep: "late",
      person1Social: 6,
      person1Athlete: false,
      person2Notes:
        "Musician and performer. Loves cats and re-recording albums.",
      person2Sleep: "late",
      person2Social: 9,
      person2Athlete: false,
      location: "sidebar",
      hasWarning: false,
    },
    {
      id: 3,
      type: "match",
      person1: "Mitt R",
      person2: "Steve I",
      x: 50,
      y: 450,
      gender: "male",
      rating: 4,
      person1Notes: "Enjoys outdoors and business. Early riser, more formal.",
      person1Sleep: "early",
      person1Social: 4,
      person1Athlete: true,
      person2Notes: "Tech enthusiast, creative thinker. Loves turtlenecks.",
      person2Sleep: "late",
      person2Social: 7,
      person2Athlete: false,
      location: "sidebar",
      hasWarning: true,
    },
  ]);

  // Mock data for individual profiles
  const [profiles, setProfiles] = useState([]);
  const [nextProfileId, setNextProfileId] = useState(1);

  // const [scissorMode, setScissorMode] = useState(false); // Removed
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
    const SIDEBAR_WIDTH = 350;
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

    // Check for merging with other matches (Pair + Pair = Quad)
    const PROXIMITY_THRESHOLD = 150;
    const nearbyMatches = matches.filter((m) => {
      if (m.id === id) return false;
      const distance = Math.sqrt(
        Math.pow(m.x - data.x, 2) + Math.pow(m.y - data.y, 2)
      );
      return distance < PROXIMITY_THRESHOLD;
    });

    if (nearbyMatches.length > 0) {
      const targetMatch = nearbyMatches[0];
      console.log("Merging match", draggedMatch, "into", targetMatch);

      // Create a new merged match (Quad)
      // Note: This assumes we want to support quads. If the UI only supports triples, we might need to adjust.
      // For now, let's assume we can add person3 and person4, or just combine names.
      // Since the UI seems to support person3, let's try to fit them in.
      // If target has 2 people and dragged has 2 people -> 4 people.

      // Let's create a new match with all people
      const mergedMatch = {
        ...targetMatch,
        person3: draggedMatch.person1,
        person4: draggedMatch.person2, // We'll need to update MatchCard to display person4
        notes: `${targetMatch.notes} + ${draggedMatch.notes}`,
        rating: Math.round((targetMatch.rating + draggedMatch.rating) / 2),
      };

      // Remove the dragged match and update the target match
      setMatches(
        matches
          .filter((m) => m.id !== id)
          .map((m) => (m.id === targetMatch.id ? mergedMatch : m))
      );
      return;
    }

    // Keep card exactly where it was dropped (no grid snapping)
    const finalMatch = {
      ...draggedMatch,
      x: Math.max(0, data.x), // Ensure not negative
      y: Math.max(0, data.y), // Ensure not negative
      location: "canvas", // Ensure location is updated to canvas
    };

    const updatedMatches = matches.map((m) => (m.id === id ? finalMatch : m));
    setMatches(updatedMatches);
  };

  const handleProfileStop = (id, data) => {
    const PROFILE_WIDTH = 140;
    const PROFILE_HEIGHT = 140;
    const MATCH_WIDTH = 280;
    const MATCH_HEIGHT = 140;
    const PADDING = 20;
    const PROXIMITY_THRESHOLD = 250; // Increased for easier combining
    const SIDEBAR_WIDTH = 350; // Updated to match CSS

    const draggedProfile = {
      ...profiles.find((p) => p.id === id),
      x: data.x,
      y: data.y,
      location: "canvas", // Default to canvas, will be overwritten if in sidebar
    };

    // Check if profile was dropped in the sidebar area
    // Simplified check: if x is negative, it's to the left of the canvas (sidebar)
    const isSidebarDrop = data.x < 0;

    // If dropped in sidebar area, check if it's over a match card
    if (isSidebarDrop) {
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
      const person1 = profilesToCombine[0].name;
      const person2 = profilesToCombine[1].name;

      // Check if this pair should have a warning
      const warningPairs = [
        ["Joey C", "Steve I"],
        ["Barack O", "Mitt R"],
      ];

      const hasWarning = warningPairs.some(
        (pair) => pair.includes(person1) && pair.includes(person2)
      );

      const newMatch = {
        id: `match-${Date.now()}`,
        type: "match",
        person1: person1,
        person2: person2,
        person3: profilesToCombine[2]?.name, // Optional third person
        x: avgX,
        y: avgY,
        gender: profilesToCombine[0].gender,
        rating: 3,
        notes: "Manually combined group", // Default note
        person1Notes: profilesToCombine[0].notes, // Preserve notes
        person2Notes: profilesToCombine[1].notes, // Preserve notes
        person3Notes: profilesToCombine[2]?.notes, // Preserve notes
        location: "canvas", // New matches go to canvas
        hasWarning: hasWarning, // Preserve warning if it's a warning pair
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
    console.log("handleMatchSplit called for:", matchId);
    // No scissor mode check needed anymore
    const matchToSplit = matches.find((m) => m.id === matchId);
    console.log("Match to split:", matchToSplit);

    if (!matchToSplit) {
      console.error("Match not found for splitting:", matchId);
      return;
    }

    // Ensure coordinates are valid numbers
    const isSidebarMatch = matchToSplit.location === "sidebar";
    const startX = isSidebarMatch
      ? 0
      : typeof matchToSplit.x === "number"
      ? matchToSplit.x
      : 0;
    const startY = isSidebarMatch
      ? 0
      : typeof matchToSplit.y === "number"
      ? matchToSplit.y
      : 0;

    // Create individual profiles for each person in the match
    const people = [
      matchToSplit.person1,
      matchToSplit.person2,
      matchToSplit.person3,
      matchToSplit.person4,
    ].filter(Boolean); // Filter out undefined/null

    const newProfiles = people.map((personName, index) => {
      // Calculate offset based on index to spread them out
      // e.g. -120, -40, 40, 120
      const offset = (index - (people.length - 1) / 2) * 100;

      return {
        id: `profile-${nextProfileId + index}`,
        type: "profile",
        name: personName,
        x: isSidebarMatch ? 0 : startX + offset,
        y: startY,
        gender: matchToSplit.gender,
        location: matchToSplit.location || "canvas",
        notes: matchToSplit[`person${index + 1}Notes`], // Preserve notes
      };
    });

    console.log("Creating profiles:", newProfiles);

    // Remove the match and add the new profiles
    setMatches(matches.filter((m) => m.id !== matchId));
    setProfiles([...profiles, ...newProfiles]);
    setNextProfileId(nextProfileId + people.length);

    console.log("Split complete");
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

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Gender Filter Tool moved to header */}
          <div className="gender-filter-tool">
            <button
              className={`gender-btn ${
                genderFilter === "male" ? "active" : ""
              }`}
              onClick={() =>
                setGenderFilter(genderFilter === "male" ? "all" : "male")
              }
              title="Filter Male"
            >
              ♂
            </button>
            <button
              className={`gender-btn ${
                genderFilter === "female" ? "active" : ""
              }`}
              onClick={() =>
                setGenderFilter(genderFilter === "female" ? "all" : "female")
              }
              title="Filter Female"
            >
              ♀
            </button>
          </div>

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
      </div>

      <div className="split-layout">
        {/* Left Sidebar */}
        <div className="sidebar-area">
          <div className="sidebar-header">
            <h2>Matches</h2>
            <button className="filter-icon-btn">
              <SlidersHorizontal size={20} />
            </button>
          </div>
          <div className="sidebar-content">
            {sidebarMatches.map((match) => (
              <div key={match.id} className="sidebar-item">
                <MatchCard
                  match={match}
                  defaultPosition={{ x: 0, y: 0 }}
                  onDrag={handleMatchDrag}
                  onStop={handleMatchStop}
                  onClick={() => handleMatchSplit(match.id)}
                  isScissorMode={false} // No longer needed
                  isStatic={false}
                  isSelected={selectedMatches.includes(match.id)}
                  onToggleSelect={toggleMatchSelection}
                  isHighlighted={recommendedMatchIds.includes(match.id)}
                  className="sidebar-card"
                />
              </div>
            ))}
            {sidebarProfiles.map((profile) => (
              <div key={profile.id} className="sidebar-item">
                <ProfileCard
                  profile={profile}
                  defaultPosition={{ x: 0, y: 0 }}
                  onStart={handleProfileDragStart}
                  onStop={(id, data) => {
                    handleProfileStop(id, data);
                    handleProfileDragEnd();
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Canvas */}
        <div className="canvas-section">
          <div className="canvas-header">
            <h2>Workspace</h2>
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
                isScissorMode={false} // No longer needed
                isHighlighted={recommendedMatchIds.includes(match.id)}
                className="canvas-card"
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

      {/* Toolbar removed */}
    </div>
  );
};

export default ReviewMatches;
