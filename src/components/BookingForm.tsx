import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const BookingForm = () => {
  const { t } = useLang();
  const navigate = useNavigate();
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
      navigate("/thank-you");
    } catch {
      setSubmitting(false);
    }
  };

  return (
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
          <input type="date" name="wedding_date" required />
        </div>
        <div className="cf">
          <label>{t("In (Venue oder Location)", "At (Venue or Location)")} *</label>
          <input type="text" name="venue" placeholder={t("Palácio Belmonte, Lissabon", "Palácio Belmonte, Lisbon")} required />
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
  );
};

export default BookingForm;
