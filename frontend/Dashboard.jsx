import WavyBackground from "./WavyBackground";
import Navbar from "./Navbar";
import AvatarIcon from "./AvatarIcon";
import { useApp } from "./AppContext";
import "./Dashboard.css";

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

export default function Dashboard({ onNavigate }) {
  const { role, user, tasks, studentTasks } = useApp();
  const isAdmin = role === "admin";
  const displayTasks = isAdmin ? tasks : studentTasks(user);

  const notStarted = displayTasks.filter(t => t.status === "NOT STARTED").length;
  const inProgress = displayTasks.filter(t => t.status === "IN PROGRESS").length;
  const finished   = displayTasks.filter(t => t.status === "FINISHED").length;
  const total      = displayTasks.length;

  return (
    <div className="page">
      <WavyBackground />
      <Navbar activePage="dashboard" onNavigate={onNavigate} />

      <div className="dashboard-body">
        {/* Profile card */}
        <div className="card profile-card">
          <div className="profile-avatar"><AvatarIcon size={60} /></div>
          <div className="profile-name">{user || "Username"}</div>
          <div className="profile-role">{isAdmin ? "Admin" : "Student"}</div>
          <div className="profile-details">
            <span className="profile-detail">Email</span>
            <span className="profile-detail">Phone Number</span>
            <span className="profile-detail">Location</span>
          </div>
          {!isAdmin && (
            <button className="dashboard-action-btn" onClick={() => onNavigate("studentTask", null)}>
              MAKE A NEW REPORT
            </button>
          )}
        </div>

        {/* Stats + list card */}
        <div className="card stats-card">
          <div className="stats-title">Reports Statistics</div>
          <div className="stats-subtitle">
            {isAdmin ? `All time fixed reports: ${finished}` : `All time reports: ${total}`}
          </div>

          <div className="stats-boxes">
            <div className="stat-box red">
              <div className="stat-number">{notStarted}</div>
              <div className="stat-label">Not started</div>
            </div>
            <div className="stat-box yellow">
              <div className="stat-number">{inProgress}</div>
              <div className="stat-label">In progress</div>
            </div>
            <div className="stat-box green">
              <div className="stat-number">{finished}</div>
              <div className="stat-label">Finished</div>
            </div>
            <div className="stat-box total">
              <div className="stat-number">{total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>

          <div className="report-list">
            {displayTasks.length === 0 && (
              <div className="no-reports">No reports yet.</div>
            )}
            {displayTasks.map((r) => (
              <div
                key={r.id}
                className="report-row"
                onClick={() => onNavigate(isAdmin ? "adminTask" : "studentTask", r.id)}
              >
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