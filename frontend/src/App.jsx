import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StudentDashboard from './pages/StudentDashboard'
import ReportForm from './pages/ReportForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/report" element={<ReportForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
