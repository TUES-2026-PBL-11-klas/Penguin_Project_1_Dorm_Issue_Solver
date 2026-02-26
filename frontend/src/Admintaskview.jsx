import { useState } from "react";
import { useApp } from "./AppContext";
import "./Admintaskview.css";

// Status options for the dropdown
const STATUS_OPTIONS = [
  { value: "not_started", label: "NOT STARTED", bg: "rgba(189,0,0,0.5)",   border: "#bd0000", color: "#fff" },
  { value: "in_progress", label: "IN PROGRESS", bg: "rgba(255,226,5,0.5)", border: "#ffe205", color: "#000" },
  { value: "finished",    label: "FINISHED",    bg: "rgba(0,180,50,0.5)",  border: "#00b432", color: "#fff" },
];

export default function Admintaskview({ onNavigate, report }) {
  const { user } = useApp();

  // Report data — use passed prop or fall back to placeholder values
  const reportData = report || {
    title:       "Report Title",
    imageUrl:    null,          // replace with real image URL
    description: "Bleblublublubla",
    reportedBy:  "username",
    reportedAt:  "00:00",
    priority:    "Normal",
    status:      "not_started",
  };

  const [selectedStatus, setSelectedStatus] = useState(
    STATUS_OPTIONS.find(s => s.value === reportData.status) || STATUS_OPTIONS[0]
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [finished, setFinished] = useState(reportData.status === "finished");

  const handleStatusSelect = (option) => {
    setSelectedStatus(option);
    setDropdownOpen(false);
    if (option.value === "finished") setFinished(true);
  };

  const handleMarkFinished = () => {
    const finishedOption = STATUS_OPTIONS.find(s => s.value === "finished");
    setSelectedStatus(finishedOption);
    setFinished(true);
    // TODO: call your API here to persist the status change
  };

  return (
    <div className="atv-page">

      {/* ── Navbar ── */}
      <nav className="atv-nav">
        <span className="atv-nav-logo">LOGO</span>
        <div className="atv-nav-links">
          <a href="#about"     className="atv-nav-link">About Us</a>
          <a href="#dashboard" className="atv-nav-link"
             onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("dashboard"); }}>
            Dashboard
          </a>
          <a href="#home"      className="atv-nav-link"
             onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("home"); }}>
            Home Page
          </a>
          <a href="#contact"   className="atv-nav-link">Contact</a>
        </div>
      </nav>

      {/* ── Top row: Image card + Info card ── */}
      <main className="atv-main">
        <div className="atv-top-row">

          {/* Image card */}
          <div className="atv-card atv-image-card">
            <h2 className="atv-card-title">Image</h2>
            <div className="atv-image-placeholder">
              {/* Replace with real report image when available */}
              {reportData.imageUrl
                ? <img src={reportData.imageUrl} alt="Report" className="atv-image-real" />
                : null
              }
            </div>
          </div>

          {/* Info card */}
          <div className="atv-card atv-info-card">
            <h2 className="atv-card-title">Info about report</h2>

            <div className="atv-info-fields">
              <p className="atv-info-line">
                Reported by: <strong>{reportData.reportedBy}</strong>
              </p>
              <p className="atv-info-line">
                Reported at: <strong>{reportData.reportedAt}</strong>
              </p>
              <p className="atv-info-line">
                Priority: <strong>{reportData.priority}</strong>
              </p>
            </div>

            {/* Status selector */}
            <div className="atv-status-wrapper">
              <div
                className="atv-status-select"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="atv-status-placeholder">Set status of report</span>
                <span
                  className="atv-status-badge"
                  style={{
                    background:  selectedStatus.bg,
                    borderColor: selectedStatus.border,
                    color:       selectedStatus.color,
                  }}
                >
                  <span className="atv-status-chevron">▾</span>
                  {selectedStatus.label}
                </span>
              </div>

              {dropdownOpen && (
                <div className="atv-dropdown">
                  {STATUS_OPTIONS.map(option => (
                    <div
                      key={option.value}
                      className="atv-dropdown-item"
                      onClick={() => handleStatusSelect(option)}
                    >
                      <span
                        className="atv-dropdown-badge"
                        style={{
                          background:  option.bg,
                          borderColor: option.border,
                          color:       option.color,
                        }}
                      >
                        {option.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* OR divider */}
            <p className="atv-or-divider">OR</p>

            {/* Mark as finished button */}
            <button
              className={`atv-finish-btn ${finished ? "atv-finish-btn--done" : ""}`}
              onClick={handleMarkFinished}
              disabled={finished}
            >
              {finished ? "REPORT MARKED AS FINISHED" : "MARK REPORT AS FINISHED"}
            </button>
          </div>

        </div>

        {/* ── Description card (full width) ── */}
        <div className="atv-card atv-description-card">
          <h2 className="atv-card-title">Description</h2>
          <p className="atv-description-text">{reportData.description}</p>
        </div>

      </main>

    </div>
  );
}