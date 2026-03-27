import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Velora Hotels
        </a>
        <ul className="navbar-menu">
          <li><a href="/#about-section">À propos</a></li>
          <li><Link to="/hotels">Hôtels</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="navbar-buttons">
          <Link to="/login" className="btn-login">Se connecter</Link>
          <Link to="/register" className="btn-register">S'inscrire</Link>
        </div>
      </div>
    </nav>
  );
}