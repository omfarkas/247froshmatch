import { Navigate } from 'react-router-dom';
import { useStageContext } from '../contexts/StageContext';

function ProtectedRoute({ children, requiredStage }) {
  const { canAccessStage } = useStageContext();

  if (!canAccessStage(requiredStage)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

