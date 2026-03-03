import { useState } from "react";
import WavyBackground from "./WavyBackground";
import Navbar from "./Navbar";
import { useApp } from "./AppContext";
import "./AdminTaskView.css";

const STATUS_OPTIONS = ["NOT STARTED", "IN PROGRESS", "FINISHED"];

export default function AdminTaskView({ onNavigate, taskId }) {
  const { tasks, updateTaskStatus } = useApp();
  const task = tasks.find(t => t.id === taskId) || tasks[0];
  const [showDropdown, setShowDropdown] = useState(false);

  if (!task) return <div style={{ color: "#fff", padding: 40 }}>Task not found.</div>;

  const btnClass = task.status === "IN PROGRESS" ? "yellow" : task.status === "FINISHED" ? "green" : "red";

  return (
    <div className="page">
      <WavyBackground />
      <Navbar activePage="dashboard" onNavigate={onNavigate} />

      <div className="task-body">
        <div className="task-top">
          {/* Image */}
          <div className="card image-card">
            <div className="task-card-title">Image</div>
            {task.photo
              ? <img src={task.photo} alt="report" className="report-image" />
              : <div className="image-placeholder" />
            }
          </div>

          {/* Info */}
          <div className="card info-card">
            <div className="task-card-title">Info about report</div>
            <div className="info-row">Report: <strong>{task.name}</strong></div>
            <div className="info-row">Reported by: <strong>{task.reportedBy}</strong></div>
            <div className="info-row">Reported at: <strong>{task.reportedAt}</strong></div>
            <div className="info-row">Priority: <strong>{task.priority}</strong></div>

            <div className="status-selector">
              <span className="status-label-text">Set status of report</span>
              <div style={{ position: "relative" }}>
                <button className={`status-dropdown-btn ${btnClass}`} onClick={() => setShowDropdown(!showDropdown)}>
                  ✓ {task.status} ▾
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    {STATUS_OPTIONS.map(opt => (
                      <div key={opt} className="dropdown-item" onClick={() => { updateTaskStatus(task.id, opt); setShowDropdown(false); }}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="or-divider">or</div>

            <button className="mark-finished-btn" onClick={() => updateTaskStatus(task.id, "FINISHED")}>
              MARK REPORT AS FINISHED
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="card desc-card">
          <div className="task-card-title">Description</div>
          <p className="desc-text">{task.description || "No description provided."}</p>
        </div>
      </div>
    </div>
  );
}