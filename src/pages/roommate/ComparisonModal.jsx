import "./ComparisonModal.css";

// Field definitions with labels organized by category
// Note: Full schema is preserved in src/data/students.js
const FIELD_CATEGORIES = [
  {
    title: "Academic Background",
    fields: [
      { key: "attendedFamily", label: "Family at Stanford" },
      { key: "specialProgram", label: "Special Program" },
    ],
  },
  {
    title: "Sleep Schedule",
    fields: [
      { key: "weeknightSleep", label: "Weeknight Sleep" },
      { key: "weeknightWake", label: "Weeknight Wake" },
      { key: "weekendSleep", label: "Weekend Sleep" },
      { key: "weekendWake", label: "Weekend Wake" },
    ],
  },
  {
    title: "Room Preferences (1-5 Scale)",
    fields: [
      { key: "prefQuietRoom", label: "Prefer Quiet Room" },
      { key: "roomCleanliness", label: "Keep Neat Room" },
      { key: "roomStudy", label: "Study in Room" },
      { key: "roomEnvironment", label: "Quiet Study Environment" },
      { key: "musicImportance", label: "Music Important" },
      { key: "television", label: "Watch Lots of TV" },
    ],
  },
  {
    title: "Room Usage Plans",
    fields: [
      { key: "roomOvernightGuest", label: "Host Overnight Guests" },
      { key: "roomListenMusic", label: "Listen to Music" },
      { key: "roomMeditatePray", label: "Meditate/Reflect" },
      { key: "roomPractReligion", label: "Practice Religion" },
      { key: "roomWatchTv", label: "Watch TV/Videos" },
      { key: "roomSingInstrument", label: "Play Instrument/Sing" },
      { key: "roomWithFriends", label: "Socialize with Friends" },
      { key: "roomVideoGames", label: "Play Video Games" },
      { key: "roomTimeAlone", label: "Time Alone" },
      { key: "roomArtWork", label: "Artistic/Creative Work" },
      { key: "roomCallFamily", label: "Talk with Family" },
    ],
  },
  {
    title: "Free Time Activities",
    fields: [
      { key: "socialCultural", label: "Cultural Events" },
      { key: "socialExercise", label: "Exercise/Sports" },
      { key: "socialParties", label: "Social Gatherings" },
      { key: "socialOutdoors", label: "Outdoor Activities" },
      { key: "socialRelax", label: "Time in Room" },
      { key: "socialVolunteer", label: "Volunteering" },
      { key: "religiousPractices", label: "Religious Practices" },
      { key: "socialArt", label: "Art Events" },
      { key: "studentClubs", label: "Student Clubs" },
      { key: "reading", label: "Reading" },
      { key: "partTimeWork", label: "Part-Time Work" },
      { key: "varsitySport", label: "Varsity Sport" },
      { key: "walkOnSport", label: "Walk-On Sport" },
    ],
  },
  {
    title: "Music Preferences",
    fields: [
      { key: "musicPrefer", label: "Music Type Preferred" },
      { key: "musicFavorite", label: "Favorite Artists" },
      { key: "musicDontLike", label: "Music Disliked" },
    ],
  },
  {
    title: "Other Information",
    fields: [
      { key: "foodAllergy", label: "Food Allergy" },
      { key: "foodAllergyDetail", label: "Allergy Details" },
      { key: "religiousNeed", label: "Religious Housing Need" },
      { key: "smoking", label: "Smoking/Vaping" },
      { key: "isoAttendance", label: "ISO Attendance" },
      { key: "isoStatus", label: "ISO Status" },
    ],
  },
  {
    title: "Gender & Housing Preferences",
    fields: [
      { key: "identifyAs", label: "I Identify As" },
      { key: "preferredRoomGender", label: "Preferred Room Gender" },
      {
        key: "preferredRoomGenderExplained",
        label: "Gender Preference Explanation",
      },
    ],
  },
];

function formatValue(value) {
  if (value === undefined || value === null || value === "") {
    return "—";
  }
  if (value === "Y") return "Yes";
  if (value === "N") return "No";
  if (value === "O") return "Doesn't bother me";
  if (value === "F") return "Freshman";
  if (value === "T") return "Transfer";
  return value;
}

function ComparisonModal({ student1, student2, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <div className="modal-header-student">
            <h2>
              {student1.firstName} {student1.lastName}
            </h2>
            <p>
              {student1.city}, {student1.state}
            </p>
          </div>
          <div className="modal-header-student">
            <h2>
              {student2.firstName} {student2.lastName}
            </h2>
            <p>
              {student2.city}, {student2.state}
            </p>
          </div>
        </div>

        <div className="modal-content">
          {FIELD_CATEGORIES.map((category) => (
            <div key={category.title} className="modal-category">
              <h3 className="modal-category-title">{category.title}</h3>

              <div className="field-cards-list">
                {category.fields.map((field) => (
                  <div key={field.key} className="field-card">
                    <div className="field-value">
                      {formatValue(student1[field.key])}
                    </div>
                    <div className="field-label">{field.label}</div>
                    <div className="field-value">
                      {formatValue(student2[field.key])}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComparisonModal;
