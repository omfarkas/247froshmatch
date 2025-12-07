import { Routes, Route } from 'react-router-dom'
import { StageProvider } from './contexts/StageContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Home from './pages/Home'
import RoommateIndex from './pages/roommate/Index'
import ReviewIndex from './pages/review/Index'
import ReviewMatches from './pages/ReviewMatches'
import DormIndex from './pages/dorm/Index'
import MatchDetails from './pages/MatchDetails'

function App() {
  return (
    <StageProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roommate/*" element={<RoommateIndex />} />
            <Route 
              path="/review-matches" 
              element={
                <ProtectedRoute requiredStage={2}>
                  <ReviewMatches />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/review/*" 
              element={
                <ProtectedRoute requiredStage={2}>
                  <ReviewIndex />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dorm/*" 
              element={
                <ProtectedRoute requiredStage={3}>
                  <DormIndex />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/match-details" 
              element={
                <ProtectedRoute requiredStage={2}>
                  <MatchDetails />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </StageProvider>
  )
}

export default App

