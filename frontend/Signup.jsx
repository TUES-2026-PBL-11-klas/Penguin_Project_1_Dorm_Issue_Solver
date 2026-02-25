import { useState } from "react";
import WavyBackground from "./WavyBackground";
import AvatarIcon from "./AvatarIcon";
import { useApp } from "./AppContext";
import "./SignUp.css";

export default function SignUp({ onNavigate }) {
  const { setRole, setUser } = useApp();
  const [role, setRoleLocal] = useState("student");
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignUp = () => {
    setRole(role === "administrator" ? "admin" : "student");
    setUser(form.username || (role === "administrator" ? "Admin" : "Student"));
    onNavigate("dashboard");
  };

  return (
    <div className="page signup-page">
      <WavyBackground />
      <div className="card signup-card">
        <h1 className="signup-title">Sign Up</h1>
        <div className="avatar-ring"><AvatarIcon size={52} /></div>
        <div className="signup-fields">
          <input className="signup-input" type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} />
          <input className="signup-input" type="text" name="username" placeholder="Username" value={form.username} onChange={onChange} />
          <input className="signup-input" type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
        </div>
        <div className="role-toggle">
          <button className={`role-btn ${role === "administrator" ? "active" : ""}`} onClick={() => setRoleLocal("administrator")}>Administrator</button>
          <button className={`role-btn ${role === "student" ? "active" : ""}`} onClick={() => setRoleLocal("student")}>Student</button>
        </div>
        <button className="signup-submit-btn" onClick={handleSignUp}>SIGN UP</button>
        <p className="auth-switch">Already have an account? <span onClick={() => onNavigate("login")}>Log in</span></p>
      </div>
      <p className="page-name">Name</p>
    </div>
  );
}