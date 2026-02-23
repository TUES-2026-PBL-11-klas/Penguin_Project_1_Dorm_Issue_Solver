import { useState } from "react";
import WavyBackground from "../../components/WavyBackground";
import AvatarIcon from "../../components/AvatarIcon";
import "./LogIn.css";

export default function LogIn({ onNavigate }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="page login-page">
      <WavyBackground />

      <div className="card login-card">
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
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />
        </div>

        <button className="login-btn" onClick={() => onNavigate("adminDashboard")}>
          LOG IN
        </button>
      </div>

      <p className="page-name">Name</p>
    </div>
  );
}
