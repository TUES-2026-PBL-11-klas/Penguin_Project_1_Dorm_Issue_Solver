import { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import "./Admintaskview.css";

// Status options for the dropdown
const STATUS_OPTIONS = [
  { value: "not_started", label: "NOT STARTED", bg: "rgba(189,0,0,0.5)",   border: "#bd0000", color: "#fff" },
  { value: "in_progress", label: "IN PROGRESS", bg: "rgba(255,226,5,0.5)", border: "#ffe205", color: "#000" },
  { value: "finished",    label: "FINISHED",    bg: "rgba(0,180,50,0.5)",  border: "#00b432", color: "#fff" },
];

export default function AdminTaskView({ onNavigate, taskId, report }) {
  const { user, getIncidentById, updateStatus } = useApp();

  const [reportData, setReportData] = useState(report || null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!taskId) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getIncidentById(taskId);
        if (mounted) setReportData(data);
      } catch (err) {
        if (mounted) setLoadError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [taskId]);

  console.info('AdminTaskView:', { taskId, reportData, loadError });

  const placeholder = {
    title:       "Report Title",
    imageUrl:    null,
    description: "No description",
    reportedBy:  "username",
    reportedAt:  "00:00",
    priority:    "Normal",
    status:      "not_started",
  };
  const rd = reportData || report || placeholder;

  // Map backend enum/status to frontend option value and back
  const mapBackendToFrontend = (backendStatus) => {
    if (!backendStatus) return "not_started";
    const s = String(backendStatus).toUpperCase();
    if (s === "FINISHED") return "finished";
    if (s === "IN_PROGRESS") return "in_progress";
    return "not_started";
  };
  const mapFrontendToBackend = (frontendValue) => {
    switch (frontendValue) {
      case "finished": return "FINISHED";
      case "in_progress": return "IN_PROGRESS";
      default: return "NOT_STARTED";
    }
  };

  const [selectedStatus, setSelectedStatus] = useState(
    STATUS_OPTIONS.find(s => s.value === (mapBackendToFrontend(rd.status) || "not_started")) || STATUS_OPTIONS[0]
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [finished, setFinished] = useState(mapBackendToFrontend(rd.status) === "finished");
  const [statusUpdating, setStatusUpdating] = useState(false);

  const handleStatusSelect = (option) => {
    const prev = selectedStatus;
    setSelectedStatus(option);
    setDropdownOpen(false);
    if (option.value === "finished") setFinished(true);

    // Persist the change to backend
    (async () => {
      if (!rd || !rd.id) return;
      const backendVal = mapFrontendToBackend(option.value);
      try {
        setStatusUpdating(true);
        const updated = await updateStatus(rd.id, backendVal);
        setReportData(updated);
        // reflect the backend canonical status in UI
        const newFrontend = mapBackendToFrontend(updated.status);
        const newOption = STATUS_OPTIONS.find(s => s.value === newFrontend) || option;
        setSelectedStatus(newOption);
        setFinished(newFrontend === "finished");
      } catch (err) {
        console.error('Failed to update status', err);
        // revert selection on error
        setSelectedStatus(prev);
      } finally {
        setStatusUpdating(false);
      }
    })();
  };

  const handleMarkFinished = () => {
    const finishedOption = STATUS_OPTIONS.find(s => s.value === "finished");
    if (!rd || !rd.id) {
      setSelectedStatus(finishedOption);
      setFinished(true);
      return;
    }
    (async () => {
      try {
        setStatusUpdating(true);
        const updated = await updateStatus(rd.id, mapFrontendToBackend(finishedOption.value));
        setReportData(updated);
        setSelectedStatus(finishedOption);
        setFinished(true);
      } catch (err) {
        console.error('Failed to mark finished', err);
      } finally {
        setStatusUpdating(false);
      }
    })();
  };

  if (loading) return (
    <div className="atv-page"><nav className="atv-nav"><span className="atv-nav-logo">LOGO</span></nav><main className="atv-main" style={{padding:40}}>Loading...</main></div>
  );
  if (loadError) return (
    <div className="atv-page"><nav className="atv-nav"><span className="atv-nav-logo">LOGO</span></nav><main className="atv-main" style={{padding:40}}>Error: {loadError}</main></div>
  );

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
              {rd.imageUrl
                ? <img src={rd.imageUrl} alt="Report" className="atv-image-real" />
                : null
              }
            </div>
          </div>

          {/* Info card */}
          <div className="atv-card atv-info-card">
            <h2 className="atv-card-title">Info about report</h2>

            <div className="atv-info-fields">
              <p className="atv-info-line">
                Reported by: <strong>{rd.studentName || rd.reportedBy}</strong>
              </p>
              <p className="atv-info-line">
                Reported at: <strong>{rd.createdAt || rd.reportedAt}</strong>
              </p>
              <p className="atv-info-line">
                Priority: <strong>{rd.priority}</strong>
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
          <p className="atv-description-text">{rd.description}</p>
        </div>

      </main>

    </div>
  );
}