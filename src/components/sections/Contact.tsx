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
              href="https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny!%20%F0%9F%91%8B%20We%20came%20across%20your%20work%20and%20love%20your%20style.%20Here%E2%80%99s%20a%20little%20about%20us%3A%0A%0ANames%3A%20%5Byour%20names%5D%0AWedding%20date%3A%20%5Bdate%20%26%20location%5D%0AWhat%20we%E2%80%99re%20looking%20for%3A%20%5Bphoto%20%2F%20video%20%2F%20both%5D%0ABudget%20range%3A%20%5Bapprox.%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!"
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
