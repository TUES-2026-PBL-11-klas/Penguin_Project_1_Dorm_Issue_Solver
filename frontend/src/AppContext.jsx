import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

const PRIORITY_ORDER = { HIGH: 0, NORMAL: 1, LOW: 2 };
const STATUS_ORDER   = { "IN PROGRESS": 0, "NOT STARTED": 1, FINISHED: 2 };

const INITIAL_TASKS = [
  { id: 1, name: "Broken window in Room 204", priority: "HIGH",   status: "IN PROGRESS", reportedBy: "alice", reportedAt: "09:15", photo: null, description: "The window latch is broken and cannot be closed." },
  { id: 2, name: "Leaking pipe in bathroom",  priority: "HIGH",   status: "NOT STARTED", reportedBy: "bob",   reportedAt: "10:02", photo: null, description: "Water is dripping from the pipe under sink B2." },
  { id: 3, name: "Flickering lights hallway", priority: "NORMAL", status: "NOT STARTED", reportedBy: "carol", reportedAt: "11:30", photo: null, description: "Hallway lights on floor 3 keep flickering." },
  { id: 4, name: "Loose door handle",         priority: "LOW",    status: "FINISHED",    reportedBy: "dave",  reportedAt: "08:45", photo: null, description: "Door handle on room 101 was loose." },
  { id: 5, name: "Missing ceiling tile",      priority: "LOW",    status: "NOT STARTED", reportedBy: "eve",   reportedAt: "13:00", photo: null, description: "Ceiling tile in corridor B is missing." },
];

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const pd = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (pd !== 0) return pd;
    return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
  });
}

export function AppProvider({ children }) {
  const [role, setRole]   = useState(null);
  const [user, setUser]   = useState(null);
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const addTask = (task) => {
    setTasks(prev => [...prev, {
      ...task,
      id: Date.now(),
      status: "NOT STARTED",
      reportedAt: new Date().toTimeString().slice(0, 5),
    }]);
  };

  const sortedTasks = sortTasks(tasks);
  const studentTasks = (username) => sortTasks(tasks.filter(t => t.reportedBy === username));

  return (
    <AppContext.Provider value={{ role, setRole, user, setUser, tasks: sortedTasks, updateTaskStatus, addTask, studentTasks }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}