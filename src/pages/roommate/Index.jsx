import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudentCard from "./StudentCard";
import ComparisonModal from "./ComparisonModal";
import { DEMO_MATCHES } from "../../data/students";
import { useStageContext } from "../../contexts/StageContext";
import "./Roommate.css";

function RoommateIndex() {
  const navigate = useNavigate();
  const { completeStage } = useStageContext();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [notes, setNotes] = useState({});

  const currentPair = DEMO_MATCHES[currentPairIndex];

  const handleNoteChange = (studentId, value) => {
    setNotes((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextPair = () => {
    if (currentPairIndex < DEMO_MATCHES.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      completeStage(1);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="roommate-page roommate-finished">
        <div className="finished-content">
          <h1>You finished reviewing matches!</h1>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            {DEMO_MATCHES.length} pairs reviewed
          </p>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <Link to="/" className="back-link">
              ← Back to Dashboard
            </Link>
            <button
              onClick={() => navigate("/review-matches")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Continue to Review Matches →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = (currentPairIndex / DEMO_MATCHES.length) * 100;

  return (
    <div className="roommate-page">
      <div className="roommate-top-bar">
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
        <div className="progress-circle-container">
          <svg className="progress-circle" viewBox="0 0 36 36">
            <path
              className="progress-circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="progress-circle-fill"
              strokeDasharray={`${progressPercent}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="progress-circle-text">
            {currentPairIndex}/{DEMO_MATCHES.length}
          </span>
        </div>
      </div>

      <header className="roommate-header">
        <h1>These students have compatible living habits.</h1>
        <p className="roommate-subheader">
          <button className="see-all-info-btn" onClick={handleOpenModal}>
            View their full profiles
          </button>
        </p>
      </header>

      <div className="roommate-cards">
        <div className="student-column">
          <StudentCard student={currentPair.student1} />
          <div className="student-notes">
            <textarea
              className="notes-textarea"
              placeholder={`Notes about ${currentPair.student1.firstName}...`}
              value={notes[currentPair.student1.studentId] || ""}
              onChange={(e) =>
                handleNoteChange(currentPair.student1.studentId, e.target.value)
              }
            />
          </div>
        </div>
        <div className="student-column">
          <StudentCard student={currentPair.student2} />
          <div className="student-notes">
            <textarea
              className="notes-textarea"
              placeholder={`Notes about ${currentPair.student2.firstName}...`}
              value={notes[currentPair.student2.studentId] || ""}
              onChange={(e) =>
                handleNoteChange(currentPair.student2.studentId, e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div className="roommate-actions">
        <div className="action-btn-row">
          <button
            className="action-btn action-btn--approve"
            onClick={handleNextPair}
          >
            Approve
          </button>
          <button
            className="action-btn action-btn--reject"
            onClick={handleNextPair}
          >
            Reject
          </button>
        </div>
        <button className="skip-btn" onClick={handleNextPair}>
          Save for Later
        </button>
      </div>

      {isModalOpen && (
        <ComparisonModal
          student1={currentPair.student1}
          student2={currentPair.student2}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default RoommateIndex;
