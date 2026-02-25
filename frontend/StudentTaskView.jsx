import { useState } from "react";
import WavyBackground from "./WavyBackground";
import Navbar from "./Navbar";
import { useApp } from "./AppContext";
import "./StudentTaskView.css";

const PRIORITY_OPTIONS = ["LOW", "NORMAL", "HIGH"];

export default function StudentTaskView({ onNavigate, taskId }) {
  const { tasks, addTask, user } = useApp();
  const existingTask = taskId ? tasks.find(t => t.id === taskId) : null;

  const [form, setForm] = useState({
    name: existingTask?.name || "",
    priority: existingTask?.priority || "NORMAL",
    description: existingTask?.description || "",
    photoPreview: existingTask?.photo || null,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isViewOnly = !!existingTask;
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, photoPreview: URL.createObjectURL(file) });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    addTask({
      name: form.name,
      priority: form.priority,
      description: form.description,
      photo: form.photoPreview,
      reportedBy: user || "student",
    });
    setSubmitted(true);
    setTimeout(() => onNavigate("dashboard"), 1200);
  };

  return (
    <div className="page">
      <WavyBackground />
      <Navbar activePage="dashboard" onNavigate={onNavigate} />

      <div className="task-body">
        <div className="task-top">
          {/* Image */}
          <div className="card image-card">
            <div className="task-card-title">Image</div>
            {form.photoPreview
              ? <img src={form.photoPreview} alt="preview" className="report-image" />
              : <div className="image-placeholder" />
            }
            {!isViewOnly && (
              <label className="upload-btn">
                📎 Upload Photo
                <input type="file" accept="image/*" onChange={onPhotoChange} style={{ display: "none" }} />
              </label>
            )}
          </div>

          {/* Info */}
          <div className="card info-card">
            <div className="task-card-title">{isViewOnly ? "Info about report" : "New Report"}</div>

            {isViewOnly ? (
              <>
                <div className="info-row">Report: <strong>{existingTask.name}</strong></div>
                <div className="info-row">Priority: <strong>{existingTask.priority}</strong></div>
                <div className="info-row">Status: <strong>{existingTask.status}</strong></div>
                <div className="info-row">Submitted at: <strong>{existingTask.reportedAt}</strong></div>
              </>
            ) : (
              <>
                <input
                  className="report-name-input"
                  type="text"
                  name="name"
                  placeholder="Enter name of report"
                  value={form.name}
                  onChange={onChange}
                />

                <div className="priority-selector">
                  <span className="priority-label-text">Set priority of report</span>
                  <div style={{ position: "relative" }}>
                    <button className="priority-dropdown-btn" onClick={() => setShowDropdown(!showDropdown)}>
                      ✓ {form.priority} ▾
                    </button>
                    {showDropdown && (
                      <div className="dropdown-menu">
                        {PRIORITY_OPTIONS.map(opt => (
                          <div key={opt} className="dropdown-item" onClick={() => { setForm({ ...form, priority: opt }); setShowDropdown(false); }}>
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className={`make-report-btn ${submitted ? "submitted" : ""}`}
                  onClick={handleSubmit}
                  disabled={submitted}
                >
                  {submitted ? "✓ SUBMITTED!" : "MAKE REPORT"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="card desc-card">
          <div className="task-card-title">Description</div>
          {isViewOnly
            ? <p className="desc-text">{existingTask.description || "No description."}</p>
            : <textarea className="desc-textarea" name="description" placeholder="Describe the issue..." value={form.description} onChange={onChange} />
          }
        </div>
      </div>
    </div>
  );
}