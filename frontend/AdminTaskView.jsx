import { useState } from "react";
import WavyBackground from "../../components/WavyBackground";
import Navbar from "../../components/Navbar";
import "./AdminTaskView.css";

const STATUS_OPTIONS = ["NOT STARTED", "IN PROGRESS", "FINISHED"];

export default function AdminTaskView({ onNavigate }) {
  const [status, setStatus] = useState("NOT STARTED");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="page">
      <WavyBackground />
      <Navbar activePage="dashboard" onNavigate={onNavigate} />

      <div className="task-body">
        <div className="task-top">
          {/* Image card */}
          <div className="card image-card">
            <div className="task-card-title">Image</div>
            <div className="image-placeholder" />
          </div>

          {/* Info card */}
          <div className="card info-card">
            <div className="task-card-title">Info about report</div>
            <div className="info-row">Reported by: <strong>username</strong></div>
            <div className="info-row">Reported at: <strong>00:00</strong></div>
            <div className="info-row">Priority: <strong>Normal</strong></div>

            <div className="status-selector" style={{ position: "relative" }}>
              <span className="status-label-text">Set status of report</span>
              <button
                className={`status-dropdown-btn ${status === "NOT STARTED" ? "red" : status === "IN PROGRESS" ? "yellow" : "green"}`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                ✓ {status} ▾
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  {STATUS_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      className="dropdown-item"
                      onClick={() => { setStatus(opt); setShowDropdown(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="or-divider">or</div>

            <button className="mark-finished-btn" onClick={() => setStatus("FINISHED")}>
              MARK REPORT AS FINISHED
            </button>
          </div>
        </div>

        {/* Description card */}
        <div className="card desc-card">
          <div className="task-card-title">Description</div>
          <p className="desc-text">Bleblublublubla</p>
        </div>
      </div>
    </div>
  );
}
