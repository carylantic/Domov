// App.js
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import FloatingLines from './FloatingLines/FloatingLines';
import './Contact.css';
import TextType from "../TextType";

function App() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_lirnc2b",   // z EmailJS dashboardu
      "template_contact",  // z EmailJS dashboardu
      form.current,
      "k1DmjL101eOHnf4qb"    // z EmailJS dashboardu
    )
    .then((result) => {
      console.log("Email odoslaný:", result.text);
      alert("Správa odoslaná!");
      form.current.reset(); // vyčistí formulár
    }, (error) => {
      console.error("Chyba pri odosielaní:", error.text);
      alert("Nastala chyba pri odosielaní.");
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <FloatingLines
        enabledWaves={['top', 'middle', 'bottom']}
        lineCount={[10, 15, 20]}
        lineDistance={[8, 6, 4]}
        bendRadius={5.0}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
      />

      <section className="contact-section">
        <div className="contact-wrapper">
          <div className="contact-left glass">
            <span className="contact-badge">KONTAKT</span>
            <div className="form-text">
              <TextType text={["Pordadiť?", "Spytať sa?", "Pomoc?"]} />
            </div>
            <p className="text">
              Máš otázky alebo chceš posunúť svoj projekt pomocou automatizácie?
              Ozvi sa. Nehryzieme.
            </p>
            <div className="contact-cards">
              <div className="contact-card">
                <div className="icon">✉</div>
                <div>
                  <span>Email</span>
                  <strong>info@firma.sk</strong>
                </div>
                <div className="arrow"></div>
              </div>
              <div className="contact-card">
                <div className="icon">☎</div>
                <div>
                  <span>Phone</span>
                  <strong>+421 900 000 000</strong>
                </div>
                <div className="arrow"></div>
              </div>
            </div>
          </div>

          <div className="form-container glass">
            <form ref={form} onSubmit={sendEmail} className="form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  placeholder="napr. info@gmail.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="textarea">Ako Vám Pomôžeme?</label>
                <textarea
                  name="message"
                  id="textarea"
                  placeholder="Vaša správa..."
                  rows="6"
                  required
                />
              </div>

              <button className="form-submit-btn" type="submit">
                Odoslať
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}

export default App;
