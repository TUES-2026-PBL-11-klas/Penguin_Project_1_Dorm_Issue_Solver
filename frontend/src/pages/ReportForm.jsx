import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './purple-theme.css'

function ReportForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    priority: 'NORMAL',
    description: '',
    image: null,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Сигнал:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="purple-bg min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="card-white text-center p-5">
          <div className="fs-1">✅</div>
          <h4 className="mt-3 fw-bold">Report submitted!</h4>
          <p className="text-muted">You will be notified when the status changes.</p>
          <button className="btn-purple mt-3" onClick={() => navigate('/student')}>
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="purple-bg min-vh-100 d-flex flex-column">

      {/* Navbar */}
      <nav className="d-flex justify-content-between align-items-center px-5 py-3">
        <span className="text-white fw-bold fs-4">LOGO</span>
        <div className="d-flex gap-4">
          <span className="text-white nav-link-custom">ABOUT US</span>
          <span className="text-white nav-link-custom cursor-pointer" onClick={() => navigate('/student')}>DASHBOARD</span>
          <span className="text-white nav-link-custom cursor-pointer" onClick={() => navigate('/')}>HOME PAGE</span>
          <span className="text-white nav-link-custom">CONTACT</span>
        </div>
      </nav>

      <div className="container-fluid px-5 py-4 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4">

          {/* Вляво - Снимка */}
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

          {/* Вдясно - Форма */}
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
                    <option value="NORMAL">NORMAL</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <button type="submit" className="btn-purple mt-auto">
                  MAKE REPORT
                </button>
              </form>
            </div>
          </div>

          {/* Долу - Описание */}
          <div className="col-12">
            <div className="card-white">
              <h5 className="fw-bold mb-3">Description</h5>
              <textarea
                className="form-control border-0"
                name="description"
                rows="4"
                placeholder="Bleblublublubla"
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