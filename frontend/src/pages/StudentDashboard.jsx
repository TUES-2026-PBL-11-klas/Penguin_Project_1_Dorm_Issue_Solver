import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './purple-theme.css'

function StudentDashboard() {
  const navigate = useNavigate()

  const [incidents] = useState([
    { id: 1, title: 'Report 1', priority: 'HIGH', status: 'IN PROGRESS' },
    { id: 2, title: 'Report 2', priority: 'HIGH', status: 'NOT STARTED' },
    { id: 3, title: 'Report 3', priority: 'NORMAL', status: 'NOT STARTED' },
    { id: 4, title: 'Report 4', priority: 'LOW', status: 'NOT STARTED' },
  ])

  const getPriorityBadge = (priority) => {
    if (priority === 'HIGH') return 'badge-high'
    if (priority === 'NORMAL') return 'badge-normal'
    return 'badge-low'
  }

  const getStatusBadge = (status) => {
    if (status === 'IN PROGRESS') return 'badge-inprogress'
    if (status === 'FINISHED') return 'badge-finished'
    return 'badge-notstarted'
  }

  return (
    <div className="purple-bg min-vh-100 d-flex flex-column">

      {/* Navbar */}
      <nav className="d-flex justify-content-between align-items-center px-5 py-3">
        <span className="text-white fw-bold fs-4">LOGO</span>
        <div className="d-flex gap-4">
          <span className="text-white nav-link-custom">ABOUT US</span>
          <span className="text-white fw-bold nav-link-custom">DASHBOARD</span>
          <span className="text-white nav-link-custom cursor-pointer" onClick={() => navigate('/')}>HOME PAGE</span>
          <span className="text-white nav-link-custom">CONTACT</span>
        </div>
      </nav>

      {/* Content */}
      <div className="container-fluid px-5 py-4 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4">

          {/* Left - Profile Card */}
          <div className="col-md-4">
            <div className="card-white text-center h-100 d-flex flex-column align-items-center justify-content-between">
              <div>
                {/* Avatar */}
                <div className="rounded-circle border border-2 border-secondary d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '100px', height: '100px', background: '#eee' }}>
                  <span style={{ fontSize: '3rem' }}>👤</span>
                </div>
                <h5 className="fw-bold">Username</h5>
                <p className="text-muted">Student</p>
                <hr />
                <p className="text-muted">Email</p>
                <p className="text-muted">Phone Number</p>
                <p className="text-muted">Location</p>
              </div>
              <button className="btn-purple mt-3" onClick={() => navigate('/report')}>
                MAKE A NEW REPORT
              </button>
            </div>
          </div>

          {/* Right - Stats + Reports */}
          <div className="col-md-8 d-flex flex-column gap-4">

            {/* Stats */}
            <div className="card-white">
              <h5 className="fw-bold text-decoration-underline mb-3">Reports Statistics</h5>
              <p className="text-muted">All time reports: {incidents.length}</p>
              <p><span style={{ color: 'red' }}>●</span> <strong>Not started: {incidents.filter(i => i.status === 'NOT STARTED').length}</strong></p>
              <p><span style={{ color: 'orange' }}>●</span> <strong>In progress: {incidents.filter(i => i.status === 'IN PROGRESS').length}</strong></p>
              <p><span style={{ color: 'green' }}>●</span> <strong>Finished: {incidents.filter(i => i.status === 'FINISHED').length}</strong></p>
            </div>

            {/* Reports List */}
            <div className="card-white d-flex flex-column gap-3">
              {incidents.map(incident => (
                <div key={incident.id} className="d-flex align-items-center justify-content-between p-3 rounded border">
                  <span className="fw-bold">{incident.title}</span>
                  <div className="d-flex gap-3 align-items-center">
                    <span className={getPriorityBadge(incident.priority)}>{incident.priority}</span>
                    <span className={getStatusBadge(incident.status)}>{incident.status}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default StudentDashboard