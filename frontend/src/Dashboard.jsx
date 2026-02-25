import { useState } from "react";
import AvatarIcon from "./AvatarIcon";
import { useApp } from "./AppContext";
import "./Dashboard.css";

// ─── Badge config ──────────────────────────────────────────────────────────────

const PRIORITY_CONFIG = {
  high:   { label: "HIGH",   bg: "rgba(149,0,173,0.8)", border: "#9500ad", color: "#fff" },
  normal: { label: "NORMAL", bg: "rgba(102,0,123,0.8)", border: "#66007b", color: "#fff" },
  low:    { label: "LOW",    bg: "rgba(64,1,81,0.8)",   border: "#400151", color: "#fff" },
};

const STATUS_CONFIG = {
  in_progress:  { label: "IN PROGRESS",  bg: "rgba(255,226,5,0.5)",  border: "#ffe205", color: "#000" },
  not_started:  { label: "NOT STARTED",  bg: "rgba(189,0,0,0.5)",    border: "#bd0000", color: "#fff" },
  finished:     { label: "FINISHED",     bg: "rgba(0,180,50,0.5)",   border: "#00b432", color: "#fff" },
};

// ─── Sample data — replace with real API data ──────────────────────────────────
const SAMPLE_REPORTS = [
  { id: 1, title: "Report 1", priority: "high",   status: "in_progress" },
  { id: 2, title: "Report 2", priority: "high",   status: "not_started" },
  { id: 3, title: "Report 3", priority: "normal", status: "not_started" },
  { id: 4, title: "Report 4", priority: "low",    status: "not_started" },
  { id: 5, title: "Report 5", priority: "low",    status: "not_started" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function ReportRow({ report, onRowClick }) {
  const priority = PRIORITY_CONFIG[report.priority] || PRIORITY_CONFIG.low;
  const status   = STATUS_CONFIG[report.status]     || STATUS_CONFIG.not_started;
  return (
    <div
      className="db-report-row"
      onClick={() => onRowClick && onRowClick(report)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onRowClick && onRowClick(report)}
    >
      <span className="db-report-name">{report.title}</span>
      <span
        className="db-badge db-badge--priority"
        style={{ background: priority.bg, borderColor: priority.border, color: priority.color }}
      >
        {priority.label}
      </span>
      <span
        className="db-badge db-badge--status"
        style={{ background: status.bg, borderColor: status.border, color: status.color }}
      >
        {status.label}
      </span>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard({ onNavigate }) {
  const { user, role } = useApp();
  const isAdmin = role === "admin";

  // Replace with real data from your API/context
  const [reports] = useState(SAMPLE_REPORTS);

  const notStartedCount = reports.filter(r => r.status === "not_started").length;
  const inProgressCount = reports.filter(r => r.status === "in_progress").length;
  const finishedCount   = reports.filter(r => r.status === "finished").length;

  const handleReportClick = (report) => {
    // Navigate to the appropriate singular task view
    // TODO: pass the selected report id/data to the task view via context or state
    if (isAdmin) {
      onNavigate && onNavigate("admintask");
    } else {
      onNavigate && onNavigate("studenttask");
    }
  };

  const handleActionBtn = () => {
    if (isAdmin) {
      onNavigate && onNavigate("allreports");
    } else {
      onNavigate && onNavigate("newreport");
    }
  };

  return (
    <div className="db-page">

      {/* ── Navbar ── */}
      <nav className="db-nav">
        <span className="db-nav-logo">LOGO</span>
        <div className="db-nav-links">
          <a href="#about"   className="db-nav-link">About Us</a>
          <a
            href="#dashboard"
            className="db-nav-link db-nav-link--active"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          <a
            href="#home"
            className="db-nav-link"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("home"); }}
          >
            Home Page
          </a>
          <a href="#contact" className="db-nav-link">Contact</a>
        </div>
      </nav>

      {/* ── Main layout ── */}
      <main className="db-main">

        {/* ── Left: Profile card ── */}
        <aside className="db-profile-card">

          {/* Avatar — replace AvatarIcon with real user photo when available */}
          <div className="db-profile-avatar">
            <AvatarIcon size={90} />
          </div>

          <h2 className="db-profile-username">{user || "Username"}</h2>
          <p className="db-profile-role">{isAdmin ? "Admin" : "Student"}</p>

          <div className="db-profile-details">
            <p className="db-profile-detail">Email</p>
            <p className="db-profile-detail">Phone Number</p>
            <p className="db-profile-detail">Location</p>
          </div>

          {/* Action button — differs by role */}
          <button className="db-action-btn" onClick={handleActionBtn}>
            {isAdmin ? "View All Reports" : "Make a New Report"}
          </button>

        </aside>

        {/* ── Right: Reports statistics panel ── */}
        <section className="db-reports-panel">

          <h1 className="db-reports-title">Reports Statistics</h1>
          <p className="db-reports-subtitle">
            {isAdmin
              ? `All time fixed reports: ${finishedCount}`
              : `All time reports: ${reports.length}`
            }
          </p>

          {/* Stat boxes */}
          <div className="db-stats-row">
            <div className="db-stat-box db-stat-box--red">
              <span className="db-stat-number">{notStartedCount}</span>
              <span className="db-stat-label">Not started</span>
            </div>
            <div className="db-stat-box db-stat-box--yellow">
              <span className="db-stat-number">{inProgressCount}</span>
              <span className="db-stat-label">In progress</span>
            </div>
            <div className="db-stat-box db-stat-box--green">
              <span className="db-stat-number">{finishedCount}</span>
              <span className="db-stat-label">Finished</span>
            </div>
          </div>

          {/* Report rows */}
          <div className="db-report-list">
            {reports.map(report => (
              <ReportRow
                key={report.id}
                report={report}
                onRowClick={handleReportClick}
              />
            ))}
          </div>

        </section>
      </main>

      {/* ── Footer ── */}
      <p className="db-footer-name">Name</p>

    </div>
  );
}