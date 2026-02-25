import { useState } from "react";
import AvatarIcon from "./AvatarIcon";
import { useApp } from "./AppContext";
import "./LogIn.css";

export default function LogIn({ onNavigate }) {
  const { setRole, setUser } = useApp();
  const [form, setForm] = useState({ username: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = () => {
    setRole("student");
    setUser(form.username || "Student");
    onNavigate("dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1 className="login-title">Log In</h1>

        <div className="login-avatar">
          <AvatarIcon size={60} />
        </div>

        <div className="login-fields">
          <input
            className="login-input"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            autoComplete="username"
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
          />
        </div>

        <button className="login-submit-btn" onClick={handleLogin}>
          LOG IN
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <span onClick={() => onNavigate("signup")}>Sign up</span>
        </p>

      </div>

      <p className="login-footer-name">Name</p>

    </div>
  );
}