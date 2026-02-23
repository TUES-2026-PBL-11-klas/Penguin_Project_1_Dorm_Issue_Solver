import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function StudentDashboard() {
  const navigate = useNavigate()

  // Примерни данни докато backend-а не е готов
  const [incidents] = useState([
    { id: 1, title: 'Счупен стол', location: 'Зала 101', status: 'Изчакване', date: '2025-02-20' },
    { id: 2, title: 'Повреден проектор', location: 'Зала 203', status: 'В процес', date: '2025-02-21' },
    { id: 3, title: 'Липсваща дъска', location: 'Зала 305', status: 'Решен', date: '2025-02-22' },
  ])

  const getStatusBadge = (status) => {
    if (status === 'Решен') return 'badge bg-success'
    if (status === 'В процес') return 'badge bg-warning text-dark'
    return 'badge bg-secondary'
  }

  return (
    <div className="min-vh-100 d-flex flex-column">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold fs-4">🏫 Incident Tracker</span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white">Здравей, Студент!</span>
          <button className="btn btn-outline-light" onClick={() => navigate('/')}>Изход</button>
        </div>
      </nav>

      <div className="container my-4">

        {/* Горна секция */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Моите сигнали</h4>
          <button className="btn btn-primary" onClick={() => navigate('/report')}>
            + Нов сигнал
          </button>
        </div>

        {/* Статистики */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h2 className="fw-bold text-primary">{incidents.length}</h2>
              <p className="text-muted mb-0">Общо сигнали</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h2 className="fw-bold text-warning">{incidents.filter(i => i.status === 'В процес').length}</h2>
              <p className="text-muted mb-0">В процес</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h2 className="fw-bold text-success">{incidents.filter(i => i.status === 'Решен').length}</h2>
              <p className="text-muted mb-0">Решени</p>
            </div>
          </div>
        </div>

        {/* Таблица със сигнали */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Проблем</th>
                  <th>Локация</th>
                  <th>Статус</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map(incident => (
                  <tr key={incident.id}>
                    <td>{incident.id}</td>
                    <td>{incident.title}</td>
                    <td>{incident.location}</td>
                    <td><span className={getStatusBadge(incident.status)}>{incident.status}</span></td>
                    <td>{incident.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">© 2025 Incident Tracker – Екип Пингвин</p>
      </footer>

    </div>
  )
}

export default StudentDashboard