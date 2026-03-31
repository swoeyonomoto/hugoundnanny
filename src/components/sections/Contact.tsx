import { useState, FormEvent, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const Contact = () => {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lookingFor, setLookingFor] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail?.lookingFor) setLookingFor(e.detail.lookingFor);
      if (e.detail?.budget) setBudget(e.detail.budget);
    };
    window.addEventListener("prefill-contact", handler as EventListener);
    return () => window.removeEventListener("prefill-contact", handler as EventListener);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    try {
      await fetch("https://formspree.io/f/xgopaaqa", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (window.fbq) {
        window.fbq("track", "Lead", { content_name: "Wedding Inquiry", currency: "EUR" });
      }
      setSubmitted(true);
    } catch {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <hr className="rule" />
        <section id="contact">
          <div className="wrap">
            <div className="inquiry-thanks">
              <h2 className="contact-h">
                {t(
                  "Wir haben eure Nachricht. Gebt uns 24 Stunden. Wir melden uns bald.",
                  "We got you. Give us 24 hours. We'll be in touch soon."
                )}
              </h2>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <hr className="rule" />
      <section id="contact">
        <div className="wrap">
          <RevealOnScroll>
            <span className="label">{t("Kontakt", "Contact")}</span>
            <h2 className="contact-h">
              {t(<em>Lasst uns<br />reden.</em>, <em>Let's<br />talk.</em>)}
            </h2>
            <p className="contact-p" style={{ maxWidth: 560 }}>
              {t(
                "Schreibt uns kurz, wann eure Hochzeit ist und was euch wichtig ist. Wir melden uns innerhalb von 24 Stunden — kein Druck, kein Skript. Einfach ein echtes Gespräch.",
                "Tell us when your wedding is and what matters to you. We'll be back within 24 hours — no pressure, no script. Just a real conversation."
              )}
            </p>
          </RevealOnScroll>

          <div className="contact-grid" style={{ marginTop: 56 }}>
            <RevealOnScroll>
              <div className="contact-meta" style={{ marginTop: 0 }}>
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
                    <label>{t("Mein(e) Verlobte(r) und ich", "My fiancé(e) and I")} *</label>
                    <input type="text" name="names" placeholder={t("Anna & Max", "Anna & Max")} required />
                  </div>
                  <div className="cf">
                    <label>{t("Erreicht uns unter", "Reach us at")} *</label>
                    <input type="email" name="email" placeholder="hello@example.com" required />
                  </div>
                </div>
                <div className="cf-row">
                  <div className="cf">
                    <label>{t("Heiraten am", "Are getting married on")} *</label>
                    <input type="text" name="wedding_date" placeholder={t("TT.MM.JJJJ", "DD.MM.YYYY")} onFocus={(e) => { e.currentTarget.type = 'date'; }} onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = 'text'; }} required />
                  </div>
                  <div className="cf">
                    <label>{t("In", "At")} *</label>
                    <input type="text" name="venue" placeholder={t("Toskana, Italien", "Tuscany, Italy")} required />
                  </div>
                </div>
                <div className="cf-row">
                  <div className="cf">
                    <label>{t("Und wir suchen", "And we are looking for")} *</label>
                    <select name="looking_for" required value={lookingFor} onChange={e => setLookingFor(e.target.value)}>
                      <option value="" disabled>{t("Bitte wählen", "Please select")}</option>
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                      <option value="Photo & Video">Photo &amp; Video</option>
                    </select>
                  </div>
                  <div className="cf">
                    <label>{t("Unser Budget ist", "Our budget is")} *</label>
                    <select name="budget" required value={budget} onChange={e => setBudget(e.target.value)}>
                      <option value="" disabled>{t("Bitte wählen", "Please select")}</option>
                      <option value="€3.900 — One day · 1 cinematographer (film or photo)">{t("€ 3.900 — Ein Tag · 1 Kameramann (Film oder Foto)", "€ 3.900 — One day · 1 cinematographer (film or photo)")}</option>
                      <option value="€5.800 — Two days · 2 cinematographers (film or photo)">{t("€ 5.800 — Zwei Tage · 2 Kameraleute (Film oder Foto)", "€ 5.800 — Two days · 2 cinematographers (film or photo)")}</option>
                      <option value="€8.500 — Two days · 2 cinematographers + photographer">{t("€ 8.500 — Zwei Tage · 2 Kameraleute + Fotograf", "€ 8.500 — Two days · 2 cinematographers + photographer")}</option>
                      <option value="Custom — destination wedding or special request">{t("Custom — Hochzeit im Ausland oder Sonderwunsch", "Custom — destination wedding or special request")}</option>
                      <option value="Not sure yet — send me the guide">{t("Noch unsicher — schickt mir den Guide", "Not sure yet — send me the guide")}</option>
                    </select>
                  </div>
                </div>
                <div className="cf">
                  <label>{t("Unser Instagram", "Our Instagram")}</label>
                  <input type="text" name="instagram" placeholder="@yourhandle" />
                </div>
                <div className="cf">
                  <label>{t("Oder ruf uns an / WhatsApp", "Or call / WhatsApp us")}</label>
                  <input type="tel" name="phone" placeholder="+49 123 456 7890" />
                </div>
                <div className="cf">
                  <label>{t("Und das ist unsere Geschichte", "And this is our story")}</label>
                  <textarea name="message" rows={3} placeholder={t("Erzählt uns von eurer Hochzeit, eurer Vision oder allem, was euch wichtig ist. Kurz und knapp reicht völlig :)", "Tell us about your wedding, your vision, or anything that matters to you. Short and sweet is totally fine for now :)")} />
                </div>
                <button type="submit" className="cf-submit" disabled={submitting}>
                  {submitting ? t("Wird gesendet…", "Sending…") : t("VERFÜGBARKEIT PRÜFEN ♥", "CHECK AVAILABILITY ♥")}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
