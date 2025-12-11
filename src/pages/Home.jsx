import DashboardCard from "../components/DashboardCard";
import { useStageContext } from "../contexts/StageContext";
import houseIcon from '../assets/house_icon.png';
import figureIcon from '../assets/figure_icon.png';

// Icons matching the wireframe
const RoommateIcon = () => (
  <svg viewBox="0 0 180 120" fill="currentColor">
    {/* Three stars */}
    <polygon points="50,15 53,25 63,25 55,32 58,42 50,36 42,42 45,32 37,25 47,25" />
    <polygon points="90,10 94,22 106,22 96,30 100,42 90,35 80,42 84,30 74,22 86,22" />
    <polygon points="130,15 133,25 143,25 135,32 138,42 130,36 122,42 125,32 117,25 127,25" />
    {/* Two people */}
    <circle cx="65" cy="70" r="18" />
    <ellipse cx="65" cy="110" rx="28" ry="20" />
    <circle cx="115" cy="70" r="18" />
    <ellipse cx="115" cy="110" rx="28" ry="20" />
  </svg>
);

const ReviewIcon = () => (
  <svg viewBox="0 0 180 140" fill="currentColor">
    {/* Three match cards arranged in a pattern */}
    <g transform="translate(20, 10)">
      <rect
        x="0"
        y="0"
        width="55"
        height="45"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="18" cy="22" r="10" />
      <circle cx="38" cy="22" r="10" />
      <line
        x1="28"
        y1="10"
        x2="28"
        y2="35"
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
    <g transform="translate(90, 30)">
      <rect
        x="0"
        y="0"
        width="55"
        height="45"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="18" cy="22" r="10" />
      <circle cx="38" cy="22" r="10" />
      <line
        x1="28"
        y1="10"
        x2="28"
        y2="35"
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
    <g transform="translate(20, 80)">
      <rect
        x="0"
        y="0"
        width="55"
        height="45"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="18" cy="22" r="10" />
      <circle cx="38" cy="22" r="10" />
      <line
        x1="28"
        y1="10"
        x2="28"
        y2="35"
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
  </svg>
);

const DormIcon = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', height: '100%' }}>
    <img src={houseIcon} alt="Dorm" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
    <img src={figureIcon} alt="Person" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
  </div>
);

// Demo data - these numbers match the wireframe
const DEMO_DATA = {
  roommate: { current: 150, total: 300 },
  review: { current: 200, total: 900 },
  dorm: { current: 120, total: 200 },
};

function Home() {
  const { canAccessStage, isStageComplete, resetStages } = useStageContext();

  return (
    <div className="home-page">
      <div className="grid-container">
        <div className="col-span-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="page-title" style={{ marginBottom: 0, textAlign: 'left' }}>Welcome back, Resident Director</h1>
          <button
            onClick={resetStages}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Reset Demo
          </button>
        </div>

        <div className="col-span-12 card-grid" style={{ maxWidth: 'none', margin: 0, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--grid-gutter)' }}>
          <div className="col-span-4">
            <DashboardCard
              title="Roommate Matching"
              icon={<RoommateIcon />}
              current={DEMO_DATA.roommate.current}
              total={DEMO_DATA.roommate.total}
              to="/roommate"
              locked={false}
              completed={isStageComplete(1)}
            />
          </div>

          <div className="col-span-4">
            <DashboardCard
              title="Match Review"
              icon={<ReviewIcon />}
              current={DEMO_DATA.review.current}
              total={DEMO_DATA.review.total}
              to="/review-matches"
              locked={!canAccessStage(2)}
              completed={isStageComplete(2)}
            />
          </div>

          <div className="col-span-4">
            <DashboardCard
              title="Dorm Assignment"
              icon={<DormIcon />}
              current={DEMO_DATA.dorm.current}
              total={DEMO_DATA.dorm.total}
              to="/dorm"
              locked={!canAccessStage(3)}
              completed={isStageComplete(3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
