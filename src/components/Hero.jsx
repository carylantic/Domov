import TextType from "../TextType";
import Plasma from './Plasma/Plasma';
import { Link } from 'react-router-dom'



function Hero() {
  return (
    <section id="home" className="hero-bg" style={{ position: 'relative' }}>

      {/* Plasma pozadie */}
      <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
  <Plasma 
    color="#0d1ca8"
    speed={0.5}
    direction="forward"
    scale={1.1}
    opacity={0.8}
    mouseInteractive={true}
  />
</div>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <TextType
              text={[
                "Ahoj! Sme radi, že si tu.",
                "Pozri sa, ako pracujeme."
              ]}
            />
          </h1>
          <div className="cta">
           <Link to="/zacat-projekt" className="btn-primary">
  Začať projekt
</Link>
            <Link to="/technic" className="btn-ghost">
  Technická Podpora
</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
