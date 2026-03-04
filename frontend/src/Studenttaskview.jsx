import { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import "./Studenttaskview.css";

// Priority options matching Figma badge colours
const PRIORITY_OPTIONS = [
  { value: "high",   label: "HIGH",   bg: "rgba(149,0,173,0.8)", border: "#9500ad", color: "#fff" },
  { value: "normal", label: "NORMAL", bg: "rgba(102,0,123,0.8)", border: "#66007b", color: "#fff" },
  { value: "low",    label: "LOW",    bg: "rgba(64,1,81,0.8)",   border: "#400151", color: "#fff" },
];

export default function Studenttaskview({ onNavigate, taskId }) {
  const { user, getIncidentById } = useApp();

  const [reportData, setReportData] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!taskId) return;
    let mounted = true;
    const load = async () => {
      setLoadingReport(true);
      try {
        const data = await getIncidentById(taskId);
        if (mounted) setReportData(data);
      } catch (err) {
        if (mounted) setLoadError(err.message || String(err));
      } finally {
        if (mounted) setLoadingReport(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [taskId]);

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

  // If opened with a taskId, show read-only report details instead of the create form
  if (taskId) {
    if (loadingReport) {
      return (
        <div className="stv-page">
          <nav className="stv-nav">
            <span className="stv-nav-logo">LOGO</span>
          </nav>
          <main className="stv-main">
            <div style={{ padding: 40, color: '#fff' }}>Loading report...</div>
          </main>
        </div>
      );
    }

    if (loadError) {
      return (
        <div className="stv-page">
          <nav className="stv-nav">
            <span className="stv-nav-logo">LOGO</span>
          </nav>
          <main className="stv-main">
            <div style={{ padding: 40, color: '#fff' }}>Error loading report: {loadError}</div>
          </main>
        </div>
      );
    }

    const rd = reportData || {};
    const backendBase = "http://localhost:8080"; // match AppContext BASE_URL
    const imageSrc = rd.imageUrl
      ? (rd.imageUrl.startsWith('http') ? rd.imageUrl : `${backendBase}${rd.imageUrl}`)
      : null;
    const imageSrcEncoded = imageSrc ? encodeURI(imageSrc) : null;
    // Debug info: show what backend returned for image URL
    // (temporary; remove when issue is resolved)
    console.info('Loaded reportData for taskId', taskId, reportData);
    return (
      <div className="stv-page">
        <nav className="stv-nav">
          <span className="stv-nav-logo">LOGO</span>
          <div className="stv-nav-links">
            <a href="#about" className="stv-nav-link">About Us</a>
            <a href="#dashboard" className="stv-nav-link" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("dashboard"); }}>Dashboard</a>
            <a href="#home" className="stv-nav-link" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("home"); }}>Home Page</a>
            <a href="#contact" className="stv-nav-link">Contact</a>
          </div>
        </nav>

        <main className="stv-main">
          <div className="stv-top-row">
            <div className="stv-card stv-image-card">
              <h2 className="stv-card-title">Image</h2>
              <div className="stv-image-placeholder">
                {imageSrc
                  ? (
                    <>
                      <img
                        src={imageSrcEncoded}
                        alt="report"
                        className="stv-image-preview"
                        onError={(e) => { e.currentTarget.style.display = 'none'; console.error('Image load error for', imageSrcEncoded); }}
                      />
                      <div style={{ marginTop: 8, color: '#666' }}>
                        <a href={imageSrcEncoded} target="_blank" rel="noreferrer">Open image in new tab</a>
                        <div style={{ fontSize: 12, marginTop: 4, color: '#999' }}>{imageSrcEncoded}</div>
                      </div>
                    </>
                  ) : <span className="stv-image-hint">No image provided</span>
                }
              </div>
            </div>

            <div className="stv-card stv-form-card">
              <h2 className="stv-card-title">Info about report</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div><strong>Title:</strong> {rd.title || '—'}</div>
                <div><strong>Priority:</strong> {rd.priority || '—'}</div>
                <div><strong>Reported by:</strong> {rd.reportedBy || rd.username || user || '—'}</div>
              </div>
            </div>
          </div>

          <div className="stv-card stv-description-card">
            <h2 className="stv-card-title">Description</h2>
            <p style={{ whiteSpace: 'pre-wrap', color: '#222' }}>{rd.description || 'No description'}</p>
          </div>
        </main>
      </div>
    );
  }

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