import { useState, useEffect, useRef, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LogoHeader from "@/components/LogoHeader";
import AutoColorNav from "@/components/AutoColorNav";
import Footer from "@/components/sections/Footer";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const HomepageContent = () => {
  const { t, lang, setLang } = useLang();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [lookingFor, setLookingFor] = useState("");
  const [budget, setBudget] = useState("");
  const wistiaRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = document.querySelector(".home-video-col wistia-player") as any;
      if (el && el._wistiaApi) {
        wistiaRef.current = el._wistiaApi;
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
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
    <>
      {/* Mobile: floating nav elements over video */}
      <div className="home-mobile-nav">
        <LogoHeader variant="auto" />
        <AutoColorNav className="lang-bar home-lang" style={{ position: "fixed", zIndex: 500 }}>
          <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
        </AutoColorNav>
        <AutoColorNav className="home-about-link" style={{ position: "fixed", zIndex: 500 }}>
          <Link to="/about">{t("ÜBER UNS", "ABOUT US")}</Link>
        </AutoColorNav>
      </div>

      <div className="home-layout">
        {/* Mobile: compact video at top */}
        <div className="home-video-mobile">
          <div className="home-video-inner">
            <wistia-player
              media-id="n9jj0nzep3"
              autoplay
              muted
              loop
              playsinline
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "max(100%, 177.78vh)",
                height: "max(100%, 56.25vw)",
                transform: "translate(-50%, -50%)",
                objectFit: "cover" as any,
                pointerEvents: "none",
              }}
            />
            <div className="home-video-overlay" />
          </div>
        </div>

        {/* Left: Form */}
        <div className="home-form-col">
          {/* Desktop navbar inside form column */}
          <nav className="home-desktop-nav">
            <div className="home-desktop-nav-left">
              <a href="/">
                <img src="/photos/logo-left.png" alt="hugo + nanny" className="logo-header-img" />
              </a>
              <Link to="/about" className="home-desktop-about">{t("ÜBER UNS", "ABOUT US")}</Link>
            </div>
          </nav>

          {/* Desktop language toggle: fixed over video */}
          <div className="home-desktop-lang">
            <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>

          <div className="home-form-inner">
            <span className="label">{t(<>Eure Geschichten.<br /><em>Authentisch und echt.</em></>, <>Your stories.<br /><em>Authentic and raw.</em></>)}</span>
            <h1 className="home-form-h">
              {t(
                <>Limited 2026 dates.<br /><em>Find out if yours is free…</em></>,
                <>Limited 2026 dates.<br /><em>Find out if yours is free…</em></>
              )}
            </h1>
            <p className="home-form-sub">
              {t(
                "Früh anzufragen heißt: Ihr wisst sofort, ob euer Datum frei ist — und bekommt unseren Couple's Guide mit allen Infos zu unserer Arbeit, zur Vorbereitung und zu den Kosten, damit ihr in Ruhe entscheiden könnt.",
                "Reaching out early means you'll know if your date is free and we'll send you our couple's guide — everything about the work, how to prepare and what it costs, so you have all you need to decide."
              )}
            </p>

            <form className="cform" onSubmit={handleSubmit}>
              <div className="cf-row">
                <div className="cf">
                  <label>{t("Eure Namen", "Your Names")}</label>
                  <input type="text" name="names" placeholder={t("Anna & Max", "Anna & Max")} required />
                </div>
                <div className="cf">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="hello@example.com" required />
                </div>
              </div>
              <div className="cf-row">
                <div className="cf">
                  <label>{t("Hochzeitsdatum", "Wedding Date")}</label>
                  <input type="text" name="wedding_date" placeholder={t("TT.MM.JJJJ", "DD.MM.YYYY")} onFocus={(e) => { e.currentTarget.type = 'date'; }} onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = 'text'; }} required />
                </div>
                <div className="cf">
                  <label>{t("Location", "Venue / Location")}</label>
                  <input type="text" name="venue" placeholder={t("Toskana, Italien", "Tuscany, Italy")} required />
                </div>
              </div>
              <div className="cf-row">
                <div className="cf">
                  <label>{t("Ihr sucht", "Looking For")}</label>
                  <select name="looking_for" required value={lookingFor} onChange={e => setLookingFor(e.target.value)}>
                    <option value="" disabled>{t("Bitte wählen", "Please select")}</option>
                    <option value="Photo">Photo</option>
                    <option value="Video">Video</option>
                    <option value="Photo & Video">Photo &amp; Video</option>
                  </select>
                </div>
                <div className="cf">
                  <label>{t("Budget", "Your Foto / Film Budget")}</label>
                  <select name="budget" required value={budget} onChange={e => setBudget(e.target.value)}>
                    <option value="" disabled>{t("Bitte wählen", "Please select")}</option>
                    <option value="€2.000 – €3.000">€2.000 – €3.000</option>
                    <option value="€3.000 – €5.000">€3.000 – €5.000</option>
                    <option value="€5.000 – €10.000">€5.000 – €10.000</option>
                    <option value="€10.000+">€10.000+</option>
                  </select>
                </div>
              </div>
              <div className="cf">
                <label>Instagram</label>
                <input type="text" name="instagram" placeholder="@yourhandle" />
              </div>
              <div className="cf">
                <label>{t("NOCH ETWAS, DAS WIR WISSEN SOLLTEN?", "ANYTHING ELSE WE SHOULD KNOW?")}</label>
                <textarea name="message" rows={3} placeholder={t("Erzählt uns von eurer Hochzeit, eurer Vision oder allem, was euch wichtig ist.", "Tell us about your wedding, your vision, or anything that matters to you.")} />
              </div>
              <button type="submit" className="cf-submit home-submit" disabled={submitting}>
                {submitting ? t("Wird gesendet…", "Sending…") : t("VERFÜGBARKEIT PRÜFEN ♥", "CHECK AVAILABILITY ♥")}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Sticky video (desktop only) */}
        <div className="home-video-col">
          <div className="home-video-sticky">
            <wistia-player
              media-id="n9jj0nzep3"
              autoplay
              muted
              loop
              playsinline
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "max(100%, 177.78vh)",
                height: "max(100%, 56.25vw)",
                transform: "translate(-50%, -50%)",
                objectFit: "cover" as any,
                pointerEvents: "none",
              }}
            />
            <div className="home-video-overlay" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const Index = () => (
  <LanguageProvider>
    <HomepageContent />
  </LanguageProvider>
);

export default Index;
