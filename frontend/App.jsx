import { useState } from "react";
import "./styles/global.css";

import HomePage         from "./pages/HomePage/HomePage";
import LogIn            from "./pages/LogIn/LogIn";
import SignUp           from "./pages/SignUp/SignUp";
import AdminDashboard   from "./pages/AdminDashboard/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import AdminTaskView    from "./pages/AdminTaskView/AdminTaskView";
import StudentTaskView  from "./pages/StudentTaskView/StudentTaskView";

export default function App() {
  const [page, setPage] = useState("home");

  switch (page) {
    case "home":             return <HomePage         onNavigate={setPage} />;
    case "login":            return <LogIn            onNavigate={setPage} />;
    case "signup":           return <SignUp           onNavigate={setPage} />;
    case "adminDashboard":   return <AdminDashboard   onNavigate={setPage} />;
    case "studentDashboard": return <StudentDashboard onNavigate={setPage} />;
    case "adminTask":        return <AdminTaskView    onNavigate={setPage} />;
    case "studentTask":      return <StudentTaskView  onNavigate={setPage} />;
    default:                 return <HomePage         onNavigate={setPage} />;
  }
}
