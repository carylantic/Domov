import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/dff.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashClick = (hash) => (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      // Ak nie sme na hlavnej stránke, prejsť na "/" a potom scroll
      navigate(`/#${hash}`);
      // krátke oneskorenie, aby React stihol navigovať
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    setMenuOpen(false); // zatvoriť mobilné menu
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-left">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span className="logo-text">CALYRA</span>
        </div>
      </div>

      <ul className="nav-menu desktop-links">
        <li><a href="#home" className="active" onClick={handleHashClick("home")}>Domov</a></li>
        <li><a href="#about" onClick={handleHashClick("about")}>O nás</a></li>
        <li><a href="#services" onClick={handleHashClick("services")}>Služby</a></li>
        <li><Link to="/contact" className="contact">Kontakt</Link></li>
      </ul>

      <div className="nav-right">
<Link to="/zacat-projekt" className="quote-btn">
  Začať projekt
</Link>
      </div>

      <div id="menuToggle">
        <input
          id="checkbox"
          type="checkbox"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />
        <label className="toggle" htmlFor="checkbox">
          <div className="bar bar--top"></div>
          <div className="bar bar--middle"></div>
          <div className="bar bar--bottom"></div>
        </label>

        {menuOpen && (
          <div className="mobile-links">
            <a href="#home" onClick={handleHashClick("home")}>Domov</a>
            <a href="#about" onClick={handleHashClick("about")}>O nás</a>
            <a href="#services" onClick={handleHashClick("services")}>Služby</a>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Kontakt</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
