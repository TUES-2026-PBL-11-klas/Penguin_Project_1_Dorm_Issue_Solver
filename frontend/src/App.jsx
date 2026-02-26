import { useState } from "react";
import { AppProvider } from "./AppContext";
import "./global.css";

import HomePage        from "./HomePage";
import LogIn           from "./LogIn";
import SignUp          from "./SignUp";
import Dashboard       from "./Dashboard";
import AdminTaskView   from "./AdminTaskView";
import StudentTaskView from "./StudentTaskView";

function Router() {
  const [page, setPage]     = useState("home");
  const [taskId, setTaskId] = useState(null);

  const navigate = (target, id = null) => {
    setTaskId(id);
    setPage(target);
  };

  switch (page) {
    case "home":        return <HomePage        onNavigate={navigate} />;
    case "login":       return <LogIn           onNavigate={navigate} />;
    case "signup":      return <SignUp          onNavigate={navigate} />;
    case "dashboard":   return <Dashboard       onNavigate={navigate} />;
    case "adminTask":   return <AdminTaskView   onNavigate={navigate} taskId={taskId} />;
    case "studentTask": return <StudentTaskView onNavigate={navigate} taskId={taskId} />;
    default:            return <HomePage        onNavigate={navigate} />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}