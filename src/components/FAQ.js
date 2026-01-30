// src/components/FAQ.js
import "../App.css"; // namiesto "./App.css"
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <section className="faq-section">
      <h1>Frequently Asked <span className="custom-gradient-text">Questions</span></h1>

      <div className="faq-container">
        {/* Q1 */}
        <input type="radio" name="faq" id="q1" />
        <label htmlFor="q1">
          Koľko u vás stojí tvorba webovej stránky? <span className="chevron">▾</span>
        </label>
        <div className="answer">
          <p>
            Cena je individuálna a závisí od <strong>rozsahu projektu</strong>.
            Pre presnú cenovú ponuku mi stačí napísať vašu predstavu a
            <strong>obratom vám vypracujem odhad na mieru</strong>.
          </p>
        </div>

        {/* Q2 */}
        <input type="radio" name="faq" id="q2" />
        <label htmlFor="q2">
          Ako prebieha spolupráca? <span className="chevron">▾</span>
        </label>
        <div className="answer">
          <p>
            Najskôr si prejdeme <strong>vaše požiadavky</strong>, potom pripravím <strong>grafický návrh</strong>.
            Po vašom schválení sa pustím do <strong>kódovania a testovania</strong>, až kým web nie je presne podľa vašich predstáv.
          </p>
        </div>

        {/* Q3 */}
        <input type="radio" name="faq" id="q3" />
        <label htmlFor="q3">
          Musím mať vlastné texty a fotky? <span className="chevron">▾</span>
        </label>
        <div className="answer">
          <p>
            Ideálne áno, pretože <strong>vy poznáte svoje podnikanie najlepšie</strong>.
            Ak ich však nemáte, rád vám poradím, čo by na stránke nemalo chýbať,
            alebo pomôžem s výberom <strong>vhodných ilustračných obrázkov</strong>.
          </p>
        </div>

        {/* Q4 */}
        <input type="radio" name="faq" id="q4" />
        <label htmlFor="q4">
          Bude web správne zobrazený aj na mobiloch? <span className="chevron">▾</span>
        </label>
        <div className="answer">
          <p>
            Samozrejme. Všetky stránky, ktoré tvorím, sú <strong>plne responzívne</strong>.
            To znamená, že budú vyzerať skvele na počítači, tablete aj na mobilnom telefóne.
          </p>
        </div>

        {/* Q5 */}
        <input type="radio" name="faq" id="q5" />
        <label htmlFor="q5">
          Čo ak budem chcieť na stránke niečo zmeniť neskôr? <span className="chevron">▾</span>
        </label>
        <div className="answer">
          <p>
            Weby odovzdávam tak, aby ste si <strong>základné texty alebo fotky vedeli upraviť aj sami</strong>.
            Taktiež ponúkam <a href="https://tvoj-web.sk/kontakt" target="_blank" rel="noopener noreferrer"><strong>dlhodobú technickú podporu</strong></a>,
            ak by ste potrebovali zložitejšie úpravy.
          </p>
        </div>

        {/* Tlačidlo pod FAQ */}
        <div className="faq-button-wrap">
          <Link to="/contact" className="faq-cta">
  Nezodpovedalo to všetko? Napíš mi
</Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
