import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { User, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (cardName) => {
    if (cardName === 'Review Matches') {
      navigate('/review-matches');
    } else {
      console.log(`Clicked on ${cardName}`);
      alert(`Navigating to ${cardName}...`);
    }
  };

  return (
    <div className="app-container">
      
      <main className="main-content">
        <h1 className="welcome-text">Welcome Back, Russel</h1>
        
        <div className="cards-grid">
          {/* Roommate Match Card */}
          <DashboardCard 
            title="roommate match" 
            current={900} 
            total={1800}
            onClick={() => handleCardClick('Roommate Match')}
          >
            <div className="illustration-roommate">
              <div className="stars">
                <Star fill="#757575" stroke="#757575" size={32} />
                <Star fill="#757575" stroke="#757575" size={40} className="star-center" />
                <Star fill="#757575" stroke="#757575" size={32} />
              </div>
              <div className="users-large">
                <User fill="#757575" stroke="#757575" size={80} />
                <User fill="#757575" stroke="#757575" size={80} />
              </div>
            </div>
          </DashboardCard>

          {/* Review Matches Card */}
          <DashboardCard 
            title="review matches" 
            current={200} 
            total={900}
            onClick={() => handleCardClick('Review Matches')}
          >
            <div className="illustration-review">
              <div className="mini-card top-left">
                <User fill="#757575" stroke="#757575" size={20} />
                <User fill="#757575" stroke="#757575" size={20} />
              </div>
              <div className="mini-card bottom-left">
                <User fill="#757575" stroke="#757575" size={20} />
                <User fill="#757575" stroke="#757575" size={20} />
              </div>
              <div className="mini-card center-right">
                <User fill="#757575" stroke="#757575" size={20} />
                <User fill="#757575" stroke="#757575" size={20} />
              </div>
            </div>
          </DashboardCard>

          {/* Dorm Match Card */}
          <DashboardCard 
            title="dorm match" 
            current={120} 
            total={200}
            onClick={() => handleCardClick('Dorm Match')}
          >
            <div className="illustration-dorm">
              {/* Empty as per design, or could add a placeholder */}
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default Home;
