import { Link } from 'react-router-dom'

/*
 * DORM MATCHING SECTION
 * 
 * This is your section to build out!
 * Add new components and pages in this /dorm folder.
 * 
 * You can create sub-routes by adding more files here.
 * The shared Header and styles are already available.
 */

function DormIndex() {
  return (
    <div className="placeholder-page">
      <h1>Dorm Matching</h1>
      <p>
        This section handles assigning matched roommate pairs to dorm buildings and rooms.
        <br />
        Build your UI components and pages in the <code>/src/pages/dorm</code> folder.
      </p>
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>
    </div>
  )
}

export default DormIndex

