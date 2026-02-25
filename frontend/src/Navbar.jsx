import "./Navbar.css";

export default function Navbar({ activePage, onNavigate, homeNav = false }) {
  if (homeNav) {
    return (
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => onNavigate("home")}>LOGO</div>
        <ul className="navbar-links">
          <li onClick={() => onNavigate("about")}>ABOUT US</li>
          <li className={activePage === "login" ? "active" : ""} onClick={() => onNavigate("login")}>LOG IN</li>
          <li className={activePage === "signup" ? "active" : ""} onClick={() => onNavigate("signup")}>SIGN UP</li>
          <li onClick={() => onNavigate("contact")}>CONTACT</li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => onNavigate("home")}>LOGO</div>
      <ul className="navbar-links">
        <li onClick={() => onNavigate("about")}>ABOUT US</li>
        <li className={activePage === "dashboard" ? "active" : ""} onClick={() => onNavigate("dashboard")}>DASHBOARD</li>
        <li onClick={() => onNavigate("home")}>HOME PAGE</li>
        <li onClick={() => onNavigate("contact")}>CONTACT</li>
      </ul>
    </nav>
  );
}
