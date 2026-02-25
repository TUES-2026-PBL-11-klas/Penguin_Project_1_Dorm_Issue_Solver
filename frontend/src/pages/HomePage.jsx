import { useNavigate, useLocation } from 'react-router-dom'
import './purple-theme.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="purple-bg min-vh-100 d-flex flex-column">
      
      {/* Navbar */}
      <nav className="d-flex justify-content-between align-items-center px-5 py-3">
        <span className="text-white fw-bold fs-4">LOGO</span>
        <div className="d-flex gap-4">
          <span className="text-white nav-link-custom">ABOUT US</span>
          <span className="text-white nav-link-custom" onClick={() => navigate('/login')}>LOG IN</span>
          <span className="text-white nav-link-custom" onClick={() => navigate('/register')}>SIGN UP</span>
          <span className="text-white nav-link-custom">CONTACT</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="text-white fw-bold display-3">Incident Tracker</h1>
        <h4 className="text-white fw-bold mb-3">ДОКЛАДВАЙ ЛЕСНО И БЪРЗО</h4>
        <p className="text-white-50 mb-4">Система за управление на инциденти в университета</p>
        <button className="btn-purple-outline" onClick={() => navigate('/register')}>
          LEARN MORE
        </button>
      </div>

    </div>
  )
}

export default HomePage