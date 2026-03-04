import { useState } from 'react'
import { useApp } from '../AppContext'
import './purple-theme.css'

function ReportForm({ onNavigate }) {
  const { createIncident } = useApp()
  const [formData, setFormData] = useState({
    title: '',
    priority: 'HIGH',
    description: '',
    image: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('priority', formData.priority)
      if (formData.image) data.append('image', formData.image)

      await createIncident(data)
      setSubmitted(true)
    } catch (err) {
      setError('Грешка при изпращане на репорта. Опитай отново.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="purple-bg min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="card-white text-center p-5">
          <div className="fs-1">✅</div>
          <h4 className="mt-3 fw-bold">Report submitted!</h4>
          <p className="text-muted">You will be notified when the status changes.</p>
          <button className="btn-purple mt-3" onClick={() => onNavigate('dashboard')}>
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="purple-bg min-vh-100 d-flex flex-column">

      <nav className="d-flex justify-content-between align-items-center px-5 py-3">
        <span className="text-white fw-bold fs-4">LOGO</span>
        <div className="d-flex gap-4">
          <span className="text-white nav-link-custom">ABOUT US</span>
          <span className="text-white nav-link-custom cursor-pointer" onClick={() => onNavigate('dashboard')}>DASHBOARD</span>
          <span className="text-white nav-link-custom cursor-pointer" onClick={() => onNavigate('home')}>HOME PAGE</span>
          <span className="text-white nav-link-custom">CONTACT</span>
        </div>
      </nav>

      <div className="container-fluid px-5 py-4 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4">

          <div className="col-md-7">
            <div className="card-white">
              <h5 className="fw-bold mb-3">Image</h5>
              <div
                className="rounded d-flex align-items-center justify-content-center"
                style={{ background: '#ddd', height: '250px', cursor: 'pointer' }}
                onClick={() => document.getElementById('imageInput').click()}
              >
                {formData.image
                  ? <img src={URL.createObjectURL(formData.image)} alt="preview" style={{ maxHeight: '240px', maxWidth: '100%', borderRadius: '8px' }} />
                  : <span className="text-muted">Click to upload image</span>
                }
              </div>
              <input id="imageInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
            </div>
          </div>

          <div className="col-md-5">
            <div className="card-white h-100 d-flex flex-column justify-content-between">
              <h5 className="fw-bold mb-3">Info about report</h5>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 flex-grow-1">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter name of report"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{ borderColor: '#9b00d9' }}
                />

                <div className="d-flex align-items-center border rounded px-3 py-2" style={{ borderColor: '#9b00d9' }}>
                  <span className="text-muted me-auto">Set priority of report</span>
                  <select
                    className="border-0 fw-bold"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    style={{ background: '#6a00a8', color: 'white', borderRadius: '20px', padding: '4px 12px', cursor: 'pointer' }}
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

                <button type="submit" className="btn-purple mt-auto" disabled={loading}>
                  {loading ? 'Изпращане...' : 'MAKE REPORT'}
                </button>
              </form>
            </div>
          </div>

          <div className="col-12">
            <div className="card-white">
              <h5 className="fw-bold mb-3">Description</h5>
              <textarea
                className="form-control border-0"
                name="description"
                rows="4"
                placeholder="Describe the issue..."
                value={formData.description}
                onChange={handleChange}
                style={{ resize: 'none' }}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ReportForm