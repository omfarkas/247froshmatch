import { useState, useEffect } from 'react'
import './ComparisonModal.css'

// Field definitions with labels organized by category
const FIELD_CATEGORIES = [
  {
    title: 'Basic Information',
    fields: [
      { key: 'studentId', label: 'Student ID' },
      { key: 'studentType', label: 'Student Type' },
      { key: 'firstName', label: 'First Name' },
      { key: 'prefFirst', label: 'Preferred First Name' },
      { key: 'middleName', label: 'Middle Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'sex', label: 'Sex' },
      { key: 'genderClarification', label: 'Gender Clarification' },
      { key: 'height', label: 'Height' },
      { key: 'birthDate', label: 'Birth Date' },
      { key: 'birthPlace', label: 'Birth Place' },
    ]
  },
  {
    title: 'Contact Information',
    fields: [
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'addressLine1', label: 'Address Line 1' },
      { key: 'addressLine2', label: 'Address Line 2' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'zip', label: 'ZIP' },
      { key: 'country', label: 'Country' },
    ]
  },
  {
    title: 'Academic Background',
    fields: [
      { key: 'lastSchool', label: 'Last School Attended' },
      { key: 'attendedFamily', label: 'Family at Stanford' },
      { key: 'specialProgram', label: 'Special Program' },
    ]
  },
  {
    title: 'Room Preferences (1-5 Scale)',
    fields: [
      { key: 'prefQuietRoom', label: 'Prefer Quiet Room' },
      { key: 'roomCleanliness', label: 'Keep Neat Room' },
      { key: 'roomStudy', label: 'Study in Room' },
      { key: 'roomEnvironment', label: 'Quiet Study Environment' },
      { key: 'musicImportance', label: 'Music Important' },
      { key: 'television', label: 'Watch Lots of TV' },
    ]
  },
  {
    title: 'Sleep Schedule',
    fields: [
      { key: 'weeknightSleep', label: 'Weeknight Sleep' },
      { key: 'weeknightWake', label: 'Weeknight Wake' },
      { key: 'weekendSleep', label: 'Weekend Sleep' },
      { key: 'weekendWake', label: 'Weekend Wake' },
    ]
  },
  {
    title: 'Music Preferences',
    fields: [
      { key: 'musicPrefer', label: 'Music Type Preferred' },
      { key: 'musicFavorite', label: 'Favorite Artists' },
      { key: 'musicDontLike', label: 'Music Disliked' },
    ]
  },
  {
    title: 'Free Time Activities',
    fields: [
      { key: 'socialCultural', label: 'Cultural Events' },
      { key: 'socialExercise', label: 'Exercise/Sports' },
      { key: 'socialParties', label: 'Social Gatherings' },
      { key: 'socialOutdoors', label: 'Outdoor Activities' },
      { key: 'socialRelax', label: 'Time in Room' },
      { key: 'socialVolunteer', label: 'Volunteering' },
      { key: 'religiousPractices', label: 'Religious Practices' },
      { key: 'socialArt', label: 'Art Events' },
      { key: 'studentClubs', label: 'Student Clubs' },
      { key: 'reading', label: 'Reading' },
      { key: 'partTimeWork', label: 'Part-Time Work' },
      { key: 'varsitySport', label: 'Varsity Sport' },
      { key: 'walkOnSport', label: 'Walk-On Sport' },
    ]
  },
  {
    title: 'Room Usage Plans',
    fields: [
      { key: 'roomOvernightGuest', label: 'Host Overnight Guests' },
      { key: 'roomListenMusic', label: 'Listen to Music' },
      { key: 'roomMeditatePray', label: 'Meditate/Reflect' },
      { key: 'roomPractReligion', label: 'Practice Religion' },
      { key: 'roomWatchTv', label: 'Watch TV/Videos' },
      { key: 'roomSingInstrument', label: 'Play Instrument/Sing' },
      { key: 'roomWithFriends', label: 'Socialize with Friends' },
      { key: 'roomVideoGames', label: 'Play Video Games' },
      { key: 'roomTimeAlone', label: 'Time Alone' },
      { key: 'roomArtWork', label: 'Artistic/Creative Work' },
      { key: 'roomCallFamily', label: 'Talk with Family' },
    ]
  },
  {
    title: 'Other Information',
    fields: [
      { key: 'foodAllergy', label: 'Food Allergy' },
      { key: 'foodAllergyDetail', label: 'Allergy Details' },
      { key: 'religiousNeed', label: 'Religious Housing Need' },
      { key: 'smoking', label: 'Smoking/Vaping' },
      { key: 'isoAttendance', label: 'ISO Attendance' },
      { key: 'isoStatus', label: 'ISO Status' },
    ]
  },
  {
    title: 'Gender & Housing Preferences',
    fields: [
      { key: 'identifyAs', label: 'I Identify As' },
      { key: 'preferredRoomGender', label: 'Preferred Room Gender' },
      { key: 'preferredRoomGenderExplained', label: 'Gender Preference Explanation' },
    ]
  },
  {
    title: 'Optimal Room Environment',
    fields: [
      { key: 'optimalVibe', label: '' },
    ],
    isWrittenResponse: true,
  },
  {
    title: 'Potential Roommate Concerns',
    fields: [
      { key: 'concerns', label: '' },
    ],
    isWrittenResponse: true,
  },
]

function formatValue(value) {
  if (value === undefined || value === null || value === '') {
    return '—'
  }
  if (value === 'Y') return 'Yes'
  if (value === 'N') return 'No'
  if (value === 'O') return "Doesn't bother me"
  if (value === 'F') return 'Freshman'
  if (value === 'T') return 'Transfer'
  return value
}

// Generate a unique key for the student pair
function getPairKey(student1, student2) {
  return `modal-collapsed-${student1.studentId}-${student2.studentId}`
}

function ComparisonModal({ student1, student2, onClose }) {
  const pairKey = getPairKey(student1, student2)
  
  // Initialize collapsed state from localStorage or default to all open
  const [collapsedSections, setCollapsedSections] = useState(() => {
    const saved = localStorage.getItem(pairKey)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return {}
      }
    }
    return {}
  })

  // Save to localStorage whenever collapsed state changes
  useEffect(() => {
    localStorage.setItem(pairKey, JSON.stringify(collapsedSections))
  }, [collapsedSections, pairKey])

  const toggleSection = (title) => {
    setCollapsedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  const isCollapsed = (title) => collapsedSections[title] === true

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-header-student">
            <h2>{student1.firstName} {student1.lastName}</h2>
            <p>{student1.city}, {student1.state}</p>
          </div>
          <div className="modal-header-student">
            <h2>{student2.firstName} {student2.lastName}</h2>
            <p>{student2.city}, {student2.state}</p>
          </div>
        </div>
        
        <div className="modal-content">
          {FIELD_CATEGORIES.map((category) => (
            <div key={category.title} className={`modal-category ${category.isWrittenResponse ? 'modal-category-written' : ''}`}>
              <button 
                className={`modal-category-header ${isCollapsed(category.title) ? 'collapsed' : ''}`}
                onClick={() => toggleSection(category.title)}
              >
                <h3 className="modal-category-title">{category.title}</h3>
                <span className="modal-category-chevron">
                  {isCollapsed(category.title) ? '▸' : '▾'}
                </span>
              </button>
              
              {!isCollapsed(category.title) && (
                category.isWrittenResponse ? (
                  <div className="modal-written-responses">
                    <div className="modal-written-text">
                      {formatValue(student1[category.fields[0].key])}
                    </div>
                    <div className="modal-written-divider"></div>
                    <div className="modal-written-text">
                      {formatValue(student2[category.fields[0].key])}
                    </div>
                  </div>
                ) : (
                  <div className="modal-rows">
                    {category.fields.map((field) => (
                      <div key={field.key} className="modal-row">
                        <div className="modal-cell modal-cell-value">
                          {formatValue(student1[field.key])}
                        </div>
                        <div className="modal-cell modal-cell-label">
                          {field.label}
                        </div>
                        <div className="modal-cell modal-cell-value">
                          {formatValue(student2[field.key])}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal
