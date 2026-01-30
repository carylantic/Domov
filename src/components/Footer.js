// src/components/Footer.js
import "../App.css"; // namiesto "./App.css"

import logo from "../assets/dff.png";

const Footer = () => {
  return (
    <footer className="calyra-footer">
      <div className="calyra-footer-inner">

        <div className="calyra-footer-left">
          <div className="calyra-footer-brand">
            <img src={logo} className="calyra-footer-logo" alt="Logo" />
            <span className="calyra-footer-name">CALYRA</span>
          </div>

          <p className="calyra-footer-subtitle">
            Moderné digitálne riešenia pre váš rast
          </p>

          <p className="calyra-footer-copy">© 2026 CALYRA</p>
        </div>

        <nav className="calyra-footer-nav">
          <a href="#about">O nás</a>
          <a href="#services">Služby</a>
          <a href="#contact">Kontakt</a>
          <a href="#home">Podpora</a>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
