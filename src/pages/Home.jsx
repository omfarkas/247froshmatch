import DashboardCard from "../components/DashboardCard";

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
  <svg viewBox="0 0 180 120" fill="currentColor">
    {/* Empty/minimal - dorm matching shows less visual in wireframe */}
  </svg>
);

// Demo data - these numbers match the wireframe
const DEMO_DATA = {
  roommate: { current: 900, total: 1800 },
  review: { current: 200, total: 900 },
  dorm: { current: 120, total: 200 },
};

function Home() {
  return (
    <div className="home-page">
      <h1 className="page-title">Welcome back, Resident Director</h1>

      <div className="card-grid">
        <DashboardCard
          title="Roommate Matching"
          icon={<RoommateIcon />}
          current={DEMO_DATA.roommate.current}
          total={DEMO_DATA.roommate.total}
          to="/roommate"
        />

        <DashboardCard
          title="Match Review"
          icon={<ReviewIcon />}
          current={DEMO_DATA.review.current}
          total={DEMO_DATA.review.total}
          to="/review"
        />

        <DashboardCard
          title="Dorm Assignment"
          icon={<DormIcon />}
          current={DEMO_DATA.dorm.current}
          total={DEMO_DATA.dorm.total}
          to="/dorm"
        />
      </div>
    </div>
  );
}

export default Home;
