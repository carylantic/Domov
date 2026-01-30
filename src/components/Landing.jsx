import { useEffect, useRef } from "react";
import "../App.css";

const Landing = () => {
  const canvasRef = useRef(null);

  // 👉 SEM PATRÍ HANDLER
  const handleHashClick = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 50;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139,92,246,0.3)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    };
    draw();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll(".custom-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", x);
      card.style.setProperty("--mouse-y", y);
    });
  };

  return (
    <section className="custom-landing" onMouseMove={handleMouseMove}>
      <div className="custom-container">
        <div className="custom-card custom-large">
          <canvas ref={canvasRef}></canvas>
          <div className="custom-bg-glow"></div>

          <h1>Webové riešenia na mieru</h1>
          <p>
            Vytvárame moderné webové stránky a jednoduché digitálne riešenia,
            ktoré pomáhajú firmám a projektom byť lepšie viditeľné online.
          </p>

          {/* 👉 A TU SA TO POUŽIJE */}
          <button
            className="custom-cta"
            onClick={handleHashClick("services")}
          >
            Preskúmať služby
          </button>
        </div>

        <div className="custom-stack">
          <div className="custom-card custom-small">
            <h3>Dizajn zameraný na používateľa</h3>
            <p>
              Navrhujeme prehľadné a zrozumiteľné rozhrania,
              aby sa na webe návštevníci rýchlo zorientovali.
            </p>
          </div>

          <div className="custom-card custom-small">
            <h3>Full-Stack vývoj</h3>
            <p>
              Tvoríme rýchle a spoľahlivé webové aplikácie
              s dôrazom na funkčnosť a výkon.
            </p>
          </div>

          <div className="custom-card custom-small">
            <h3>Priebežná podpora & SEO</h3>
            <p>
              Pomáhame s údržbou webu a základnou optimalizáciou,
              aby váš projekt rástol
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
