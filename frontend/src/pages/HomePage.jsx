import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-vh-100 d-flex flex-column">
      
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold fs-4">🏫 Incident Tracker</span>
        <div>
          <button className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Вход</button>
          <button className="btn btn-light" onClick={() => navigate('/register')}>Регистрация</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Докладвай проблем лесно</h1>
          <p className="lead mt-3">Система за управление на инциденти в университета</p>
          <button className="btn btn-light btn-lg mt-3" onClick={() => navigate('/register')}>
            Започни сега
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="container my-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm p-4">
              <div className="fs-1">📋</div>
              <h5 className="mt-3">Подай сигнал</h5>
              <p className="text-muted">Докладвай повредена техника, мебели или друг проблем бързо и лесно.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm p-4">
              <div className="fs-1">🔍</div>
              <h5 className="mt-3">Проследи статуса</h5>
              <p className="text-muted">Виждай в реално време какво се случва с твоя сигнал.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm p-4">
              <div className="fs-1">✅</div>
              <h5 className="mt-3">Бърза реакция</h5>
              <p className="text-muted">Администрацията получава сигналите веднага и реагира своевременно.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">© 2025 Incident Tracker – Екип Пингвин</p>
      </footer>

    </div>
  )
}

export default HomePage