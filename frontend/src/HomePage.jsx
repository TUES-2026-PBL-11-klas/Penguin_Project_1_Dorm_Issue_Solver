import React from 'react';
import './HomePage.css';

export default function HomePage({ onNavigate }) {
  const handleNavigation = (page, e) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <div className="homepage">

      {/* ─── Navigation ─── */}
      <nav className="nav">
        <span className="nav-logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>LOGO</span>
        <div className="nav-links">
          <a href="#about" className="nav-link" onClick={(e) => handleNavigation('home', e)}>About Us</a>
          <a href="#login" className="nav-link" onClick={(e) => handleNavigation('login', e)}>Log In</a>
          <a href="#signup" className="nav-link" onClick={(e) => handleNavigation('signup', e)}>Sign Up</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleNavigation('home', e)}>Contact</a>
        </div>
      </nav>

      {/* ─── Hero Content ─── */}
      <section className="hero">
        <h1 className="hero-name">Name</h1>
        <h2 className="hero-slogan">Slogan</h2>
        <p className="hero-description">Short description of product</p>
        <button className="cta-button">
          <span>Learn More</span>
        </button>
      </section>

    </div>
  );
}