import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const Contact = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", date: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend
    alert(t("Nachricht gesendet!", "Message sent!"));
  };

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
                "Schreibt uns kurz, wann eure Hochzeit ist. Wir melden uns innerhalb von 24 Stunden — kein Druck, kein Skript. Einfach ein echtes Gespräch.",
                "Tell us when your wedding is. We'll be back within 24 hours — no pressure, no script. Just a real conversation."
              )}
            </p>
            <div className="contact-meta">
              <div className="meta-row">
                <span className="meta-lbl">Email</span>
                <span className="meta-val">hallo@hugo-nanny.de</span>
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
            <form className="cform" onSubmit={handleSubmit}>
              <div className="cf-row">
                <div className="cf">
                  <label>{t("Euer Name", "Your name")}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="cf">
                  <label>{t("Hochzeitsdatum", "Wedding date")}</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="cf">
                <label>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="cf">
                <label>{t("Erzählt uns kurz von eurer Hochzeit", "Tell us a little about your wedding")}</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="cf-submit">
                {t("Nachricht senden", "Send message")}
              </button>
              <p className="cf-legal">
                {t(
                  "Eure Daten werden nur zur Kontaktaufnahme verwendet und nicht weitergegeben.",
                  "Your data is used only for getting in touch and will not be shared."
                )}
              </p>
            </form>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
};

export default Contact;
