import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ReportForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Сигнал:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-dark bg-primary px-4">
          <span className="navbar-brand fw-bold fs-4">🏫 Incident Tracker</span>
        </nav>
        <div className="container my-5 text-center">
          <div className="card shadow-sm p-5 mx-auto" style={{ maxWidth: '500px' }}>
            <div className="fs-1">✅</div>
            <h4 className="mt-3 fw-bold">Сигналът е подаден!</h4>
            <p className="text-muted">Ще бъдете уведомени при промяна на статуса.</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/student')}>
              Към моите сигнали
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100 d-flex flex-column">

      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold fs-4">🏫 Incident Tracker</span>
        <button className="btn btn-outline-light" onClick={() => navigate('/student')}>
          ← Назад
        </button>
      </nav>

      <div className="container my-5">
        <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
          <h4 className="fw-bold mb-4">📋 Подай нов сигнал</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Заглавие на проблема</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Напр. Счупен стол"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Локация</label>
              <input
                type="text"
                className="form-control"
                name="location"
                placeholder="Напр. Зала 101"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Описание</label>
              <textarea
                className="form-control"
                name="description"
                rows="4"
                placeholder="Опиши проблема подробно..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Подай сигнал
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">© 2025 Incident Tracker – Екип Пингвин</p>
      </footer>

    </div>
  )
}

export default ReportForm