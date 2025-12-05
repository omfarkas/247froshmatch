import { createContext, useContext, useState, useEffect } from 'react';

const StageContext = createContext();

export const useStageContext = () => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error('useStageContext must be used within a StageProvider');
  }
  return context;
};

/**
 * Simple stage tracking for the demo flow
 * Stage 1: Roommate Matching
 * Stage 2: Review Matches
 * Stage 3: Dorm Assignment
 */
export const StageProvider = ({ children }) => {
  const [completedStages, setCompletedStages] = useState(() => {
    const saved = localStorage.getItem('completedStages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('completedStages', JSON.stringify(completedStages));
  }, [completedStages]);

  const completeStage = (stageNumber) => {
    if (!completedStages.includes(stageNumber)) {
      setCompletedStages([...completedStages, stageNumber]);
    }
  };

  const isStageComplete = (stageNumber) => {
    return completedStages.includes(stageNumber);
  };

  const canAccessStage = (stageNumber) => {
    if (stageNumber === 1) return true;
    // Can access stage N if stage N-1 is complete
    return completedStages.includes(stageNumber - 1);
  };

  const resetStages = () => {
    setCompletedStages([]);
    localStorage.removeItem('completedStages');
  };

  return (
    <StageContext.Provider value={{
      completedStages,
      completeStage,
      isStageComplete,
      canAccessStage,
      resetStages,
    }}>
      {children}
    </StageContext.Provider>
  );
};

