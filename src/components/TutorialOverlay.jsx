import React, { useState } from 'react';
import { X, Scissors, Users, Sparkles, MousePointer2, CheckCircle } from 'lucide-react';
import './TutorialOverlay.css';

const TutorialOverlay = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      icon: <Scissors size={48} />,
      title: "Split Roommate Pairs",
      description: "Click the scissors tool in the toolbar, then click the divider between roommates to split them into individual profiles.",
      color: "#FF6B6B"
    },
    {
      icon: <Users size={48} />,
      title: "Combine Profiles",
      description: "Drag individual profiles close together to create pairs. You can combine up to 3 people to form a triple!",
      color: "#4ECDC4"
    },
    {
      icon: <Sparkles size={48} />,
      title: "Smart Recommendations",
      description: "When you drag a single profile, the best matching pairs will glow yellow. Matches are based on gender and compatibility rating.",
      color: "#FFD93D"
    },
    {
      icon: <MousePointer2 size={48} />,
      title: "Drag Between Areas",
      description: "Drag match cards from the canvas into the 'Matches' sidebar to organize them. Drag profiles onto sidebar pairs to create triples!",
      color: "#95E1D3"
    },
    {
      icon: <CheckCircle size={48} />,
      title: "Confirm Matches",
      description: "Right-click on matches in the sidebar to select them. Click 'confirm' to finalize and remove them from your workspace.",
      color: "#6C5CE7"
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-backdrop" onClick={onClose} />
      
      <div className="tutorial-card">
        <button className="tutorial-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="tutorial-content">
          <div 
            className="tutorial-icon" 
            style={{ backgroundColor: `${currentTutorial.color}20`, color: currentTutorial.color }}
          >
            {currentTutorial.icon}
          </div>

          <h2 className="tutorial-title">{currentTutorial.title}</h2>
          <p className="tutorial-description">{currentTutorial.description}</p>

          <div className="tutorial-progress">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                style={{
                  backgroundColor: index === currentStep ? currentTutorial.color : 
                                   index < currentStep ? '#4CAF50' : '#E0E0E0'
                }}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>

          <div className="tutorial-navigation">
            <button
              className="tutorial-btn secondary"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              className="tutorial-btn primary"
              onClick={handleNext}
              style={{ backgroundColor: currentTutorial.color }}
            >
              {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>

          <div className="tutorial-step-counter">
            Step {currentStep + 1} of {tutorialSteps.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
