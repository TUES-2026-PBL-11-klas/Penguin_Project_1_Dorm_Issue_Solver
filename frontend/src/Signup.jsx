import { useState } from "react";
import AvatarIcon from "./AvatarIcon";
import { useApp } from "./AppContext";
import "./Signup.css";

export default function Signup({ onNavigate }) {
  const { setRole, setUser } = useApp();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [selectedRole, setSelectedRole] = useState("student");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = () => {
    setRole(selectedRole);
    setUser(form.username || (selectedRole === "admin" ? "Admin" : "Student"));
    onNavigate("dashboard");
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h1 className="signup-title">Sign Up</h1>

        <div className="signup-avatar">
          <AvatarIcon size={60} />
        </div>

        <div className="signup-fields">
          <input
            className="signup-input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
          />
          <input
            className="signup-input"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
            autoComplete="username"
          />
          <input
            className="signup-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            autoComplete="new-password"
          />
        </div>

        <div className="signup-role-toggle">
          <button
            className={`signup-role-btn ${selectedRole === "admin" ? "active" : ""}`}
            onClick={() => setSelectedRole("admin")}
          >
            Administrator
          </button>
          <button
            className={`signup-role-btn ${selectedRole === "student" ? "active" : ""}`}
            onClick={() => setSelectedRole("student")}
          >
            Student
          </button>
        </div>

        <button className="signup-submit-btn" onClick={handleSignup}>
          LOG IN
        </button>

        <p className="signup-auth-switch">
          Already have an account?{" "}
          <span onClick={() => onNavigate("login")}>Log in</span>
        </p>

      </div>

      <p className="signup-footer-name">Name</p>

    </div>
  );
}