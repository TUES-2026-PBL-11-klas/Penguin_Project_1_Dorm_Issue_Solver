import { useState } from "react";
import { AppProvider } from "./AppContext";
import "./Global.css";
import ReportForm from "./pages/ReportForm";

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
    console.info('Router.navigate ->', { target, id });
    setTaskId(id);
    setPage(target);
  };

  switch (page) {
    case "home":        return <HomePage        onNavigate={navigate} />;
    case "login":       return <LogIn           onNavigate={navigate} />;
    case "signup":      return <SignUp          onNavigate={navigate} />;
    case "dashboard":   return <Dashboard       onNavigate={navigate} />;
    case "admintask":   return <AdminTaskView   onNavigate={navigate} taskId={taskId} />;
    case "studenttask": return <StudentTaskView onNavigate={navigate} taskId={taskId} />;
    case "newreport":   return <ReportForm      onNavigate={navigate} />;
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
