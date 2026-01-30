import { useState, memo, useEffect } from "react";
import FloatingLines from "../components/FloatingLines/FloatingLines";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Technic.css";

/* ================= ICONS ================= */
function IconBug() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M8 6h8M9 6V4h6v2M6 10h12M7 10v6a5 5 0 0 0 10 0v-6" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}
function IconDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 4v10M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="4" y="18" width="16" height="2" rx="1" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}
function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 20l5-1 9-9a2 2 0 0 0 0-3l-1-1a2 2 0 0 0-3 0l-9 9-1 5Z" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}
function IconQuestion() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 8a3 3 0 0 1 3 3c0 2-3 2-3 4" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
    </svg>
  );
}

/* ================= BACKGROUND ================= */
const MemoizedFloatingLines = memo(() => (
  <FloatingLines
    enabledWaves={["top", "middle", "bottom"]}
    lineCount={[10, 15, 20]}
    lineDistance={[8, 6, 4]}
    interactive
    parallax
  />
));

/* ================= COMPONENT ================= */
export default function StartProject() {
  const [step, setStep] = useState(1);
  const [issueType, setIssueType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  });

  useEffect(() => {
    emailjs.init("k1DmjL101eOHnf4qb");
  }, []);

  const issueTiles = [
    { id: "Technický problém / bug", icon: <IconBug /> },
    { id: "Nefunguje web / výpadok", icon: <IconDown /> },
    { id: "Zmena / úprava projektu", icon: <IconEdit /> },
    { id: "Otázka k používaniu", icon: <IconQuestion /> },
  ];

  const issueHints = {
    "Technický problém / bug": "Popíš presne čo nefunguje, ideálne krok za krokom.",
    "Nefunguje web / výpadok": "Uveď odkedy je problém a či ide o úplný výpadok.",
    "Zmena / úprava projektu": "Napíš čo chceš zmeniť a prečo.",
    "Otázka k používaniu": "Napíš otázku čo najkonkrétnejšie."
  };

  const handleSubmit = () => {
    const payload = {
      formType: "TECHNIC",
      name: form.name,
      email: form.email,
      phone: form.phone,
      tech_project: form.project,
      tech_issueType: issueType,
      tech_message: form.message,
    };

    emailjs
      .send("service_lirnc2b", "template_bf0tmhu", payload)
      .then(() => setSubmitted(true))
      .catch(err => {
        console.error(err);
        alert("Odoslanie zlyhalo");
      });
  };

  const isValid =
    form.name.trim() &&
    form.email.includes("@") &&
    form.phone.trim() &&
    form.project.trim() &&
    form.message.trim();

  return (
    <section className="sp-start-project">
      <MemoizedFloatingLines />

      <div className="sp-start-project-content">
        <div className="sp-glass-panel">
          {submitted ? (
            <div className="sp-thank-you">
              <h1>Požiadavka prijatá</h1>
              <p>
                Stav: <strong>Prijaté</strong><br />
                Prípady do <strong>24 hodín</strong><br />
                Ostatné <strong>1–3 dni</strong>
              </p>
              <button className="sp-next-btn" onClick={() => navigate("/")}>
                Späť na úvod
              </button>
            </div>
          ) : (
            <>
              <h1 className="sp-panel-title">
                {step === 1 ? "S čím máte problém?" : issueType}
              </h1>

              {step === 1 && (
                <div className="sp-tiles">
                  {issueTiles.map(t => (
                    <div
                      key={t.id}
                      className={`sp-tile ${issueType === t.id ? "selected" : ""}`}
                      onClick={() => setIssueType(t.id)}
                    >
                      <div className="sp-tile-icon">{t.icon}</div>
                      <div className="sp-tile-text">{t.id}</div>
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="sp-step-form">
                  <p className="sp-step-hint">{issueHints[issueType]}</p>

                  <div className="sp-form-wrapper">
                    <div className="sp-form-grid">
                      <input
                        className="sp-form-input"
                        placeholder="Meno"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                      <input
                        className="sp-form-input"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                      <input
                        className="sp-form-input"
                        placeholder="Telefónne číslo"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    <input
                      className="sp-form-input"
                      placeholder="Názov projektu / webu / URL"
                      value={form.project}
                      onChange={e => setForm({ ...form, project: e.target.value })}
                    />

                    <textarea
                      className="sp-form-textarea"
                      placeholder="Popis problému"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="sp-panel-footer">
                {step > 1 && (
                  <button className="sp-back-btn" onClick={() => setStep(1)}>
                    Späť
                  </button>
                )}
                {step === 1 && (
                  <button
                    className="sp-next-btn"
                    disabled={!issueType}
                    onClick={() => setStep(2)}
                  >
                    Pokračovať
                  </button>
                )}
                {step === 2 && (
                  <button
                    className="sp-next-btn"
                    disabled={!isValid}
                    onClick={handleSubmit}
                  >
                    Odoslať
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
