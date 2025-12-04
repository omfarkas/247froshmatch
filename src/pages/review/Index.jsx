import { Link } from 'react-router-dom'

/*
 * REVIEW MATCHES SECTION
 * 
 * This is your section to build out!
 * Add new components and pages in this /review folder.
 * 
 * You can create sub-routes by adding more files here.
 * The shared Header and styles are already available.
 */

function ReviewIndex() {
  return (
    <div className="placeholder-page">
      <h1>Review Matches</h1>
      <p>
        This section handles reviewing and approving roommate match suggestions.
        <br />
        Build your UI components and pages in the <code>/src/pages/review</code> folder.
      </p>
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>
    </div>
  )
}

export default ReviewIndex
