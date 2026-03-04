import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

// Use Vite env if provided, otherwise use relative path so dev proxy works
const BASE_URL = "http://localhost:8080";

export function AppProvider({ children }) {
  const [role, setRole]   = useState(null);
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);

  // Помощна функция – слага токена в хедъра автоматично
  const authHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  });

  // ── Auth ──────────────────────────────────────────────────────────────────

  const login = async (username, password) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Грешно потребителско име или парола");
    }

    const data = await res.json();
    setToken(data.token);
    setUser(data.username);
    setRole(data.role?.toLowerCase()); // "STUDENT" → "student"
    return data;
  };

  const register = async (email, username, password, role) => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, role: role.toUpperCase() })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Грешка при регистрация");
    }
    const data = await res.json();
    setToken(data.token);
    setUser(data.username);
    setRole(data.role?.toLowerCase());
    return data;
  };

  // ── Incidents ─────────────────────────────────────────────────────────────

  const getMyIncidents = async () => {
    const res = await fetch(`${BASE_URL}/api/incidents/my`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error("Грешка при зареждане на инциденти");
    return res.json();
  };

  const getMyStats = async () => {
    const res = await fetch(`${BASE_URL}/api/incidents/my/stats`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error("Грешка при зареждане на статистика");
    return res.json();
  };

  const getAllIncidents = async () => {
    const res = await fetch(`${BASE_URL}/api/incidents/admin/all`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error("Грешка при зареждане на инциденти");
    return res.json();
  };

  const getAdminStats = async () => {
    const res = await fetch(`${BASE_URL}/api/incidents/admin/stats`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error("Грешка при зареждане на статистика");
    return res.json();
  };

  const getIncidentById = async (id) => {
    const res = await fetch(`${BASE_URL}/api/incidents/${id}`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error("Инцидентът не е намерен");
    return res.json();
  };

  const createIncident = async (formData) => {
    // formData е FormData обект (защото има снимка)
    const res = await fetch(`${BASE_URL}/api/incidents`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` }, // без Content-Type – браузърът го слага сам
      body: formData
    });
    if (!res.ok) throw new Error("Грешка при създаване на инцидент");
    return res.json();
  };

  const updateStatus = async (id, newStatus) => {
    const res = await fetch(`${BASE_URL}/api/incidents/${id}/status?newStatus=${newStatus}`, {
      method: "PATCH",
      headers: authHeaders()
    });
    if (!res.ok) throw new Error("Грешка при промяна на статус");
    return res.json();
  };

  return (
    <AppContext.Provider value={{
      role, user, token,
      login, register,
      getMyIncidents, getMyStats,
      getAllIncidents, getAdminStats,
      getIncidentById, createIncident, updateStatus
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}