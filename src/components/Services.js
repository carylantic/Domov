// src/components/Services.js
import "../App.css"; // namiesto "./App.css"


const Services = () => {
  return (
    <section id="services" className="custom-hero">
      <header className="custom-hero-header">
        <h1>
          Tvoríme <span className="custom-gradient-text">moderné weby</span>
        </h1>
        <p>
          Navrhujeme dizajn, vyvíjame systémy a nasadzujeme technológie s reálnym výkonom.
        </p>
      </header>

      <div className="custom-services-scroll">
        <div className="custom-services-track">
          <span>Webové stránky</span>
          <span>Grafický dizajn</span>
          <span>Umelá inteligencia</span>
          <span>E-shopy</span>

          {/* duplicita pre plynulý loop */}
          <span>Webové stránky</span>
          <span>Grafický dizajn</span>
          <span>Umelá inteligencia</span>
          <span>E-shopy</span>
        </div>
      </div>
    </section>
  );
};

export default Services;
