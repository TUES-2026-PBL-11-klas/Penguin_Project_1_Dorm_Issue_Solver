import { useState } from "react";
import { useApp } from "./AppContext";
import "./Studenttaskview.css";

// Priority options matching Figma badge colours
const PRIORITY_OPTIONS = [
  { value: "high",   label: "HIGH",   bg: "rgba(149,0,173,0.8)", border: "#9500ad", color: "#fff" },
  { value: "normal", label: "NORMAL", bg: "rgba(102,0,123,0.8)", border: "#66007b", color: "#fff" },
  { value: "low",    label: "LOW",    bg: "rgba(64,1,81,0.8)",   border: "#400151", color: "#fff" },
];

export default function Studenttaskview({ onNavigate }) {
  const { user } = useApp();

  const [reportName, setReportName]         = useState("");
  const [selectedPriority, setSelectedPriority] = useState(PRIORITY_OPTIONS[1]); // default: NORMAL
  const [priorityOpen, setPriorityOpen]     = useState(false);
  const [imageFile, setImageFile]           = useState(null);
  const [imagePreview, setImagePreview]     = useState(null);
  const [description, setDescription]       = useState("");
  const [submitted, setSubmitted]           = useState(false);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Priority selection
  const handlePrioritySelect = (option) => {
    setSelectedPriority(option);
    setPriorityOpen(false);
  };

  // Submit report
  const handleSubmit = () => {
    if (!reportName.trim()) return;
    // TODO: send { reportName, priority: selectedPriority.value, imageFile, description, user } to your API
    setSubmitted(true);
    setTimeout(() => {
      onNavigate && onNavigate("dashboard");
    }, 1200);
  };

  return (
    <div className="stv-page">

      {/* ── Navbar ── */}
      <nav className="stv-nav">
        <span className="stv-nav-logo">LOGO</span>
        <div className="stv-nav-links">
          <a href="#about"     className="stv-nav-link">About Us</a>
          <a href="#dashboard" className="stv-nav-link"
             onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("dashboard"); }}>
            Dashboard
          </a>
          <a href="#home"      className="stv-nav-link"
             onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("home"); }}>
            Home Page
          </a>
          <a href="#contact"   className="stv-nav-link">Contact</a>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="stv-main">

        {/* ── Top row: Image card + Form card ── */}
        <div className="stv-top-row">

          {/* Image card */}
          <div className="stv-card stv-image-card">
            <h2 className="stv-card-title">Image</h2>
            <label className="stv-image-placeholder" htmlFor="stv-image-upload">
              {imagePreview
                ? <img src={imagePreview} alt="Report preview" className="stv-image-preview" />
                : <span className="stv-image-hint">Click to upload image</span>
              }
            </label>
            {/* Hidden file input — replace with camera capture on mobile if needed */}
            <input
              id="stv-image-upload"
              type="file"
              accept="image/*"
              className="stv-image-input"
              onChange={handleImageChange}
            />
          </div>

          {/* Info / Form card */}
          <div className="stv-card stv-form-card">
            <h2 className="stv-card-title">Info about report</h2>

            {/* Report name input */}
            <input
              className="stv-input"
              type="text"
              placeholder="Enter name of report"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              maxLength={120}
            />

            {/* Priority selector */}
            <div className="stv-priority-wrapper">
              <div
                className="stv-priority-select"
                onClick={() => setPriorityOpen(!priorityOpen)}
              >
                <span className="stv-priority-placeholder">Set priority of report</span>
                <span
                  className="stv-priority-badge"
                  style={{
                    background:  selectedPriority.bg,
                    borderColor: selectedPriority.border,
                    color:       selectedPriority.color,
                  }}
                >
                  <span className="stv-priority-chevron">▾</span>
                  {selectedPriority.label}
                </span>
              </div>

              {priorityOpen && (
                <div className="stv-dropdown">
                  {PRIORITY_OPTIONS.map(option => (
                    <div
                      key={option.value}
                      className="stv-dropdown-item"
                      onClick={() => handlePrioritySelect(option)}
                    >
                      <span
                        className="stv-dropdown-badge"
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

            {/* Submit button */}
            <button
              className={`stv-submit-btn ${submitted ? "stv-submit-btn--done" : ""}`}
              onClick={handleSubmit}
              disabled={submitted || !reportName.trim()}
            >
              {submitted ? "REPORT SUBMITTED ✓" : "MAKE REPORT"}
            </button>
          </div>

        </div>

        {/* ── Description card (full width) ── */}
        <div className="stv-card stv-description-card">
          <h2 className="stv-card-title">Description</h2>
          <textarea
            className="stv-description-textarea"
            placeholder="Enter report description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

      </main>

    </div>
  );
}