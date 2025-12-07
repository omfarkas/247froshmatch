import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './MatchDetails.css';

const MatchDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { match } = location.state || {};

  if (!match) {
    return (
      <div className="match-details-container">
        <p>No match data found.</p>
        <button onClick={() => navigate('/review-matches')}>Back to Review</button>
      </div>
    );
  }

  // Mock extended data for the demo
  // In a real app, we might fetch this by ID or pass it all in
  const getProfileDetails = (name) => {
    // Specific data for demo characters
    if (name.includes("Joey")) {
      return {
        location: "Jersey City, NJ",
        vibe: "I'm definitely an early bird—I'm up at 5am every morning to hit the gym before classes. I love having a calm and focused space where I can get my work done during the week. I like to keep things pretty quiet on weeknights since I'm usually in bed by 9:30pm.",
        concerns: "I'll be honest, I can be a little particular about keeping our shared space clean. It doesn't have to be spotless, but I get stressed when things pile up for too long. I also really need a dedicated desk area where I can focus on my coursework without distractions."
      };
    }
    if (name.includes("Steve") || name.includes("Barack")) {
      return {
        location: "Melbourne, Australia", // Or Chicago for Barack
        vibe: "I'm a total early bird—I love watching the sunrise and getting my day started before anyone else is awake. I thrive in a calm, organized environment and do my best studying either in complete silence or with some chill lo-fi beats in the background.",
        concerns: "One thing I should mention is that I'm pretty sensitive to strong scents—things like heavy cologne, candles, or air fresheners can give me headaches. I'd also appreciate if we could give each other a heads up before having guests over."
      };
    }
    // Default fallback
    return {
      location: "Stanford, CA",
      vibe: "I'm a balanced person who likes a mix of social time and quiet study time. I usually sleep around 11pm and wake up at 7am.",
      concerns: "I like to keep the room relatively tidy but I'm not a neat freak. I listen to music with headphones mostly."
    };
  };

  const p1Details = getProfileDetails(match.person1);
  const p2Details = getProfileDetails(match.person2);

  return (
    <div className="match-details-page">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="match-details-header">
        <h2>These students have compatible living habits.</h2>
        <p>View their full profiles: <a href="#" className="see-all-link">see all info</a></p>
      </div>

      <div className="profiles-comparison">
        {/* Profile 1 */}
        <div className="profile-detail-card">
          <div className="profile-header">
            <h3>{match.person1}</h3>
            <span className="profile-location">{p1Details.location}</span>
          </div>

          <div className="profile-section">
            <h4>OPTIMAL ROOM VIBE</h4>
            <div className="profile-text-box">
              {p1Details.vibe}
            </div>
          </div>

          <div className="profile-section">
            <h4>POTENTIAL ROOMMATE CONCERNS</h4>
            <div className="profile-text-box">
              {p1Details.concerns}
            </div>
          </div>
        </div>

        {/* Profile 2 */}
        <div className="profile-detail-card">
          <div className="profile-header">
            <h3>{match.person2}</h3>
            <span className="profile-location">{p2Details.location}</span>
          </div>

          <div className="profile-section">
            <h4>OPTIMAL ROOM VIBE</h4>
            <div className="profile-text-box">
              {p2Details.vibe}
            </div>
          </div>

          <div className="profile-section">
            <h4>POTENTIAL ROOMMATE CONCERNS</h4>
            <div className="profile-text-box">
              {p2Details.concerns}
            </div>
          </div>
        </div>
      </div>

      <div className="notes-comparison">
        <div className="note-box">
          <span className="note-placeholder">Notes about {match.person1.split(' ')[0]}...</span>
        </div>
        <div className="note-box">
          <span className="note-placeholder">Notes about {match.person2.split(' ')[0]}...</span>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
