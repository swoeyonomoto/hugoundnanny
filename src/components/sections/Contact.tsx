import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const Contact = () => {
  const { t } = useLang();

  return (
    <>
      <hr className="rule" />
      <section id="contact">
        <div className="wrap contact-grid">
          <RevealOnScroll>
            <span className="label">{t("Kontakt", "Contact")}</span>
            <h2 className="contact-h">
              {t(<>Lasst uns<br /><em>reden.</em></>, <>Let's<br /><em>talk.</em></>)}
            </h2>
            <p className="contact-p">
              {t(
                "Schreibt uns kurz, wann eure Hochzeit ist und was euch wichtig ist. Wir melden uns innerhalb von 24 Stunden — kein Druck, kein Skript. Einfach ein echtes Gespräch.",
                "Tell us when your wedding is and what matters to you. We'll be back within 24 hours — no pressure, no script. Just a real conversation."
              )}
            </p>
            <p className="contact-p">
              {t(
                "Wir freuen uns, von euch zu hören.",
                "We look forward to hearing from you."
              )}
            </p>
            <div className="contact-meta">
              <div className="meta-row">
                <span className="meta-lbl">Email</span>
                <span className="meta-val">info@hugo-nanny.de</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">Instagram</span>
                <span className="meta-val">@hugoundnanny</span>
              </div>
              <div className="meta-row">
                <span className="meta-lbl">{t("Standort", "Based")}</span>
                <span className="meta-val">{t("Deutschland & weltweit", "Germany & worldwide")}</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="rv2">
            <a
              href="https://wa.me/4916097813272?text=Hi%2C%20we%20are%20interested%20in%20getting%20to%20know%20more%20about%20you.%20We%20are..."
              target="_blank"
              rel="noopener noreferrer"
              className="cf-submit"
              style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}
            >
              {t("Schreib uns auf WhatsApp", "Message us on WhatsApp")}
            </a>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
};

export default Contact;
