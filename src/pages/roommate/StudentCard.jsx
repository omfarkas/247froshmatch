import { useRef, useEffect, useState } from 'react'

function ScrollableSection({ title, content }) {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const contentRef = useRef(null)

  const handleScroll = (e) => {
    const element = e.target
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 5
    setIsAtBottom(atBottom)
  }

  useEffect(() => {
    // Check on mount if content is scrollable and if already at bottom
    const element = contentRef.current
    if (element) {
      const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 5
      setIsAtBottom(atBottom)
    }
  }, [])

  return (
    <div className="student-section">
      <h3 className="section-title">{title}</h3>
      <div className={`section-content-wrapper ${isAtBottom ? 'at-bottom' : ''}`}>
        <div 
          className="section-content"
          ref={contentRef}
          onScroll={handleScroll}
        >
          {content}
        </div>
      </div>
    </div>
  )
}

function StudentCard({ student, onSeeMore }) {
  return (
    <div className="student-card">
      <div className="student-header">
        <h2 className="student-name">{student.name}</h2>
        <p className="student-location">{student.location}</p>
      </div>
      
      <ScrollableSection 
        title="Optimal Room Vibe" 
        content={student.optimalVibe} 
      />
      
      <ScrollableSection 
        title="Potential Roommate Concerns" 
        content={student.concerns} 
      />
      
      <button 
        className="see-more-btn"
        onClick={onSeeMore}
      >
        see all info
      </button>
    </div>
  )
}

export default StudentCard
