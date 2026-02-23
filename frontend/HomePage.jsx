import WavyBackground from "../../components/WavyBackground";
import Navbar from "../../components/Navbar";
import "./HomePage.css";

export default function HomePage({ onNavigate }) {
  return (
    <div className="page home-page">
      <WavyBackground />
      <Navbar activePage="home" onNavigate={onNavigate} homeNav />
      <div className="home-hero">
        <h1 className="home-name">Name</h1>
        <h2 className="home-slogan">SLOGAN</h2>
        <p className="home-desc">Short Description Of Product</p>
        <button className="home-btn" onClick={() => onNavigate("signup")}>
          LEARN MORE
        </button>
      </div>
    </div>
  );
}
