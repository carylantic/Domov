import { useState, memo } from "react";
import FloatingLines from "../components/FloatingLines/FloatingLines";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./StartProject.css";

/* ================= PREMIUM ICONS ================= */
function IconWeb() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="4" width="17" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="4" width="17" height="3.5" rx="2" fill="currentColor" opacity="0.12" />
      <circle cx="6.2" cy="5.8" r="0.7" fill="currentColor" opacity="0.35" />
      <circle cx="8.2" cy="5.8" r="0.7" fill="currentColor" opacity="0.35" />
      <circle cx="10.2" cy="5.8" r="0.7" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function IconShop() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16l-1.6 11.2H5.6L4 7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 7V5.4a4.5 4.5 0 0 1 9 0V7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 11h10" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
    </svg>
  );
}

function IconDesign() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 20l6.4-2 7.8-7.8a2 2 0 0 0 0-2.8l-1.6-1.6a2 2 0 0 0-2.8 0L6 13.6 4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13.2 6.8l4 4" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
    </svg>
  );
}

function IconOther() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

/* ================= MEMOIZED BACKGROUND ================= */
const MemoizedFloatingLines = memo(() => (
  <FloatingLines
    enabledWaves={["top", "middle", "bottom"]}
    lineCount={[10, 15, 20]}
    lineDistance={[8, 6, 4]}
    bendRadius={5}
    bendStrength={-0.5}
    interactive
    parallax
  />
));

/* ================= WIZARD COMPONENT ================= */
export default function StartProject() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [selectedTilesStep1, setSelectedTilesStep1] = useState([]);
  const [selectedTileStep2, setSelectedTileStep2] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Inicializácia EmailJS
  emailjs.init("k1DmjL101eOHnf4qb");

  const step1Tiles = [
    { id: "Web stránka", icon: <IconWeb />, text: "Web stránka" },
    { id: "E-shop", icon: <IconShop />, text: "E-shop" },
    { id: "Grafický dizajn", icon: <IconDesign />, text: "Grafický dizajn" },
    { id: "Iné", icon: <IconOther />, text: "Iné" },
  ];

  const step2Tiles = [
    { id: "asap", text: "ASAP (do 2 týždňov)" },
    { id: "soon", text: "Čoskoro (1–2 mesiace)" },
    { id: "noRush", text: "Bez náhlenia" },
    { id: "justLooking", text: <>Vlastné<br />(Na konci uvediete)</> }
  ];

  const toggleTileStep1 = (id) => {
    setSelectedTilesStep1(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const selectTileStep2 = (id) => {
    setSelectedTileStep2(prev => prev === id ? "" : id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    if (!formData.name || !formData.phone || !formData.email || !formData.message) return false;
    if (!formData.email.includes("@")) return false;
    if (selectedTileStep2 === "justLooking" && !formData.date) return false;
    return true;
  };

  const handleNext = () => {
    if (step === 1 && selectedTilesStep1.length > 0) setStep(2);
    else if (step === 2 && selectedTileStep2) setStep(3);
  };

  const handleBack = () => { if (step > 1) setStep(step - 1); };

 const handleSubmit = async () => {
  console.log("Kliknuté Odoslať");

  let attachmentBase64 = "";
  if (formData.attachment) {
    attachmentBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(formData.attachment);
    });
  }

  const templateParams = {
    formType: "STARTPROJECT",
    name: formData.name,
    email: formData.email,
    sp_projectType: selectedTilesStep1.join(", "),
    sp_deadline: selectedTileStep2 === "justLooking" ? formData.date : selectedTileStep2,
    sp_message: formData.message,
    tech_project: "",
    tech_issueType: "",
    tech_message: "",
    attachment: attachmentBase64
  };

  emailjs
    .send("service_lirnc2b", "template_bf0tmhu", templateParams)
    .then(
      (response) => {
        console.log("Email poslaný!", response.status, response.text);
        setSubmitted(true);
      },
      (err) => {
        console.error("Chyba pri posielaní emailu:", err);
      }
    );
};


  const renderTiles = (tiles, selected, stepNum) =>
    tiles.map(tile => (
      <div
        key={tile.id}
        className={`tile ${stepNum === 1 ? selected.includes(tile.id) ? "selected" : "" : selected === tile.id ? "selected" : ""}`}
        onClick={() => stepNum === 1 ? toggleTileStep1(tile.id) : selectTileStep2(tile.id)}
      >
        {tile.icon && <div className="tile-icon">{tile.icon}</div>}
        <div className="tile-text">{tile.text}</div>
      </div>
    ));

  const progressWidth = step === 1 ? "33%" : step === 2 ? "66%" : "100%";
  const stepText = `Krok ${step} z 3`;
  const panelTitle =
    step === 1 ? "Aký projekt máte v hlave?" :
    step === 2 ? "Ako rýchlo to potrebujete?" : "Hotovo!";

  return (
    <section className="start-project">
      <MemoizedFloatingLines />
      <div className="start-project-content">
        <div className="glass-panel">

          {submitted ? (
            <div className="thank-you">
              <div className="check-wrapper">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <defs>
                    <linearGradient id="gradCircle" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c084fc"/>
                      <stop offset="100%" stopColor="#f472b6"/>
                    </linearGradient>
                    <linearGradient id="gradCheck" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6"/>
                      <stop offset="100%" stopColor="#c084fc"/>
                    </linearGradient>
                  </defs>
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="url(#gradCircle)" strokeWidth="4" strokeDasharray="157" strokeDashoffset="157"/>
                  <path className="checkmark-check" fill="none" stroke="url(#gradCheck)" strokeWidth="4" d="M14 27l7 7 17-17" strokeDasharray="30" strokeDashoffset="30"/>
                </svg>
              </div>

              <h1>Ďakujeme, váš projekt sme prijali!</h1>

              <p>
                Vaše zadanie pre <strong>{selectedTilesStep1.join(", ")}</strong> sme práve dostali.<br/>
                Náš tím ho teraz analyzuje.
              </p>

              <p>
                Čo sa bude diať teraz?<br/>
                Do 24 hodín vám pošleme e-mail s doplňujúcimi otázkami.<br/>
                Dohodneme si krátky online call (15 min) na doladenie detailov.<br/>
                Pripravíme vám cenovú ponuku na mieru.
              </p>

              <button className="next-btn" onClick={() => navigate("/")}>Späť na úvod</button>
            </div>
          ) : (
            <>
              <h1 className="panel-title">{panelTitle}</h1>

              {step < 3 && (
                <div className="tiles">
                  {step === 1 ? renderTiles(step1Tiles, selectedTilesStep1, 1) : renderTiles(step2Tiles, selectedTileStep2, 2)}
                </div>
              )}

              {step === 3 && (
                <div className="form-wrapper">
                  <div className="form-grid">
                    <input type="text" name="name" placeholder="Meno" value={formData.name} onChange={handleChange} className={formData.name ? "" : "invalid"} />
                    <input type="tel" name="phone" placeholder="Telefónne číslo" value={formData.phone} onChange={handleChange} className={formData.phone ? "" : "invalid"} />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={formData.email ? "" : "invalid"} />
                    {selectedTileStep2 === "justLooking" && <input type="date" name="date" value={formData.date} onChange={handleChange} className={formData.date ? "" : "invalid"} />}
                  </div>
                  <textarea className={`form-textarea ${formData.message ? "" : "invalid"}`} name="message" placeholder="Napíšte nám viac o projekte..." rows="4" value={formData.message} onChange={handleChange} />
                </div>
              )}

              <div className="panel-footer">
                <div className="progress-wrapper">
                  <span className="step-text">{stepText}</span>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: progressWidth }} /></div>
                </div>

                <div className="footer-buttons">
                  {step > 1 && <button className="next-btn back-btn" onClick={handleBack}>Späť</button>}
                  {step < 3 && <button className="next-btn" disabled={(step === 1 && selectedTilesStep1.length === 0) || (step === 2 && !selectedTileStep2)} onClick={handleNext} style={{ opacity: (step === 1 && selectedTilesStep1.length === 0) || (step === 2 && !selectedTileStep2) ? 0.5 : 1, cursor: (step === 1 && selectedTilesStep1.length === 0) || (step === 2 && !selectedTileStep2) ? "not-allowed" : "pointer" }}>Pokračovať</button>}
                  {step === 3 && (
                    <button className="next-btn" disabled={!isFormValid()} onClick={handleSubmit} style={{ opacity: !isFormValid() ? 0.5 : 1, cursor: !isFormValid() ? "not-allowed" : "pointer" }}>
                      Odoslať
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
