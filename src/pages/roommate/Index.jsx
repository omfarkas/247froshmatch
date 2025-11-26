import { Link } from 'react-router-dom'

/*
 * ROOMMATE MATCHING SECTION
 * 
 * This is your section to build out!
 * Add new components and pages in this /roommate folder.
 * 
 * You can create sub-routes by adding more files here.
 * The shared Header and styles are already available.
 */

function RoommateIndex() {
  return (
    <div className="placeholder-page">
      <h1>Roommate Matching</h1>
      <p>
        This section handles matching incoming freshmen with compatible roommates.
        <br />
        Build your UI components and pages in the <code>/src/pages/roommate</code> folder.
      </p>
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>
    </div>
  )
}

export default RoommateIndex

