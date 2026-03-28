import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const Contact = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", date: "", email: "", message: "" });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@hugo-nanny.de", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          "Wedding date": form.date,
          message: form.message,
          _subject: "Neue Anfrage über hugo-nanny.de",
        }),
      });
      if (res.ok) {
        alert(t("Nachricht gesendet!", "Message sent!"));
        setForm({ name: "", date: "", email: "", message: "" });
      } else {
        alert(t("Fehler beim Senden. Bitte versuche es erneut.", "Failed to send. Please try again."));
      }
    } catch {
      alert(t("Fehler beim Senden. Bitte versuche es erneut.", "Failed to send. Please try again."));
    } finally {
      setSending(false);
    }
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
                  placeholder={t(
                    "Wo heiratet ihr? Was ist euch am wichtigsten?",
                    "Where are you getting married? What matters most to you?"
                  )}
                />
              </div>
              <button type="submit" className="cf-submit" disabled={sending}>
                {sending ? t("Wird gesendet…", "Sending…") : t("Nachricht senden", "Send message")}
              </button>
              <p className="cf-legal">
                {t(
                  "Eure Daten werden nur zur Kontaktaufnahme verwendet und nicht an Dritte weitergegeben.",
                  "Your details are used only to get in touch and will not be shared with third parties."
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
