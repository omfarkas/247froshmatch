import { useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";
import ComparisonModal from "./ComparisonModal";
import { DEMO_MATCHES } from "../../data/students";
import "./Roommate.css";

function RoommateIndex() {
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
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="roommate-page roommate-finished">
        <div className="finished-content">
          <h1>You finished approving matches!</h1>
          <Link to="/" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="roommate-page">
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>

      <header className="roommate-header">
        <h1>These students have compatible living habits.</h1>
        <p className="roommate-subheader">
          View their full profiles:{" "}
          <button className="see-all-info-btn" onClick={handleOpenModal}>
            see all info
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

      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(currentPairIndex / DEMO_MATCHES.length) * 100}%`,
            }}
          />
        </div>
        <div className="progress-text">
          {currentPairIndex} of {DEMO_MATCHES.length} Matches Reviewed
        </div>
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
