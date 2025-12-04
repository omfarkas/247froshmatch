import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import RoommateIndex from './pages/roommate/Index'
import ReviewIndex from './pages/review/Index'
import ReviewMatches from './pages/ReviewMatches'
import DormIndex from './pages/dorm/Index'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review-matches" element={<ReviewMatches />} />
        <Route path="/roommate/*" element={<RoommateIndex />} />
        <Route path="/review/*" element={<ReviewIndex />} />
        <Route path="/dorm/*" element={<DormIndex />} />
      </Routes>
    </div>
  )
}

export default App

