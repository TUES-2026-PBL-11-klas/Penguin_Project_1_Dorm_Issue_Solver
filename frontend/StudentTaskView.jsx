import { useState } from "react";
import WavyBackground from "../../components/WavyBackground";
import Navbar from "../../components/Navbar";
import "./StudentTaskView.css";

const PRIORITY_OPTIONS = ["LOW", "NORMAL", "HIGH"];

export default function StudentTaskView({ onNavigate }) {
  const [form, setForm] = useState({ name: "", priority: "NORMAL", description: "" });
  const [showDropdown, setShowDropdown] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

          {/* Info card - student fills this in */}
          <div className="card info-card">
            <div className="task-card-title">Info about report</div>

            <input
              className="report-name-input"
              type="text"
              name="name"
              placeholder="Enter name of report"
              value={form.name}
              onChange={onChange}
            />

            <div className="priority-selector" style={{ position: "relative" }}>
              <span className="priority-label-text">Set priority of report</span>
              <button
                className="priority-dropdown-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                ✓ {form.priority} ▾
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  {PRIORITY_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      className="dropdown-item"
                      onClick={() => { setForm({ ...form, priority: opt }); setShowDropdown(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="make-report-btn" onClick={() => onNavigate("studentDashboard")}>
              MAKE REPORT
            </button>
          </div>
        </div>

        {/* Description card */}
        <div className="card desc-card">
          <div className="task-card-title">Description</div>
          <textarea
            className="desc-textarea"
            name="description"
            placeholder="Bleblublublubla"
            value={form.description}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
