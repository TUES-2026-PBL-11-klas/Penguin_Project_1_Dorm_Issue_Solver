import WavyBackground from "../../components/WavyBackground";
import Navbar from "../../components/Navbar";
import AvatarIcon from "../../components/AvatarIcon";
import "./StudentDashboard.css";

const REPORTS = [
  { id: 1, name: "Report 1", priority: "HIGH",   status: "IN PROGRESS" },
  { id: 2, name: "Report 2", priority: "HIGH",   status: "NOT STARTED" },
  { id: 3, name: "Report 3", priority: "NORMAL", status: "NOT STARTED" },
  { id: 4, name: "Report 4", priority: "LOW",    status: "NOT STARTED" },
  { id: 5, name: "Report 5", priority: "LOW",    status: "NOT STARTED" },
];

function priorityClass(p) {
  if (p === "HIGH") return "high";
  if (p === "NORMAL") return "normal";
  return "low";
}

function statusClass(s) {
  if (s === "IN PROGRESS") return "in-progress";
  if (s === "FINISHED") return "finished";
  return "not-started";
}

export default function StudentDashboard({ onNavigate }) {
  const notStarted = REPORTS.filter((r) => r.status === "NOT STARTED").length;
  const inProgress = REPORTS.filter((r) => r.status === "IN PROGRESS").length;
  const finished   = REPORTS.filter((r) => r.status === "FINISHED").length;

  return (
    <div className="page">
      <WavyBackground />
      <Navbar activePage="dashboard" onNavigate={onNavigate} />

      <div className="dashboard-body">
        <div className="card profile-card">
          <div className="profile-avatar"><AvatarIcon size={60} /></div>
          <div className="profile-name">Username</div>
          <div className="profile-role">Student</div>
          <div className="profile-details">
            <span className="profile-detail">Email</span>
            <span className="profile-detail">Phone Number</span>
            <span className="profile-detail">Location</span>
          </div>
          <button className="dashboard-action-btn" onClick={() => onNavigate("studentTask")}>
            MAKE A NEW REPORT
          </button>
        </div>

        <div className="card stats-card">
          <div className="stats-title">Reports Statistics</div>
          <div className="stats-subtitle">All time reports: 0</div>
          <div className="stats-boxes">
            <div className="stat-box red"><div className="stat-number">{notStarted}</div><div className="stat-label">Not started</div></div>
            <div className="stat-box yellow"><div className="stat-number">{inProgress}</div><div className="stat-label">In progress</div></div>
            <div className="stat-box green"><div className="stat-number">{finished}</div><div className="stat-label">Finished</div></div>
          </div>
          <div className="report-list">
            {REPORTS.map((r) => (
              <div key={r.id} className="report-row" onClick={() => onNavigate("studentTask")}>
                <span className="report-name">{r.name}</span>
                <span className={`badge ${priorityClass(r.priority)}`}>{r.priority}</span>
                <span className={`status-badge ${statusClass(r.status)}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="page-name">Name</p>
    </div>
  );
}
