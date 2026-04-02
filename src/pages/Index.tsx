import { useState, useRef, useEffect, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LogoHeader from "@/components/LogoHeader";
import AutoColorNav from "@/components/AutoColorNav";
import Footer from "@/components/sections/Footer";
const VIDEO_SRC = "https://cdcjyvwghreyukugihjx.supabase.co/storage/v1/object/public/Hugo%20Nanny%20Header/Hugo%20%26%20Nanny%20Reel%204%2016-9_1.mp4";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const HomepageContent = () => {
  const { t, lang, setLang } = useLang();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [lookingFor, setLookingFor] = useState("");
  const [budget, setBudget] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    [mobileVideoRef, desktopVideoRef].forEach(ref => {
      const v = ref.current;
      if (v) { v.muted = true; v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false)); }
    });
  }, []);

  const getActiveVideo = () => {
    const isMobile = window.innerWidth < 900;
    return isMobile ? mobileVideoRef.current : desktopVideoRef.current;
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    // Always keep both visually playing but only unmute the visible one
    [mobileVideoRef, desktopVideoRef].forEach(ref => {
      if (ref.current) ref.current.muted = true;
    });
    const active = getActiveVideo();
    if (active) active.muted = newMuted;
    setIsMuted(newMuted);
  };

  const togglePlay = () => {
    [mobileVideoRef, desktopVideoRef].forEach(ref => {
      const v = ref.current;
      if (!v) return;
      if (isPlaying) { v.pause(); } else { v.muted = true; v.play().catch(() => {}); }
    });
    if (!isPlaying) setIsMuted(true);
    setIsPlaying(!isPlaying);
  };

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
            <video
              ref={mobileVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "max(100%, 177.78vh)",
                height: "max(100%, 56.25vw)",
                transform: "translate(-50%, -50%)",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="home-video-overlay" />
            <div className="hero-video-controls">
              <button className="hero-mute-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                )}
              </button>
              <button className="hero-mute-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                )}
              </button>
            </div>
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
          <AutoColorNav className="home-desktop-lang" style={{ position: "fixed", zIndex: 500 }}>
            <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
          </AutoColorNav>

          <div className="home-form-inner">
            <span className="label">{t(<>Eure Geschichte.<br /><em>Authentisch und echt.</em></>, <>Your story.<br /><em>Authentic and raw.</em></>)}</span>
            <h1 className="home-form-h">
              {t(
                <em>Limited 2026 dates.<br />Find out if yours is free…</em>,
                <em>Limited 2026 dates.<br />Find out if yours is free…</em>
              )}
            </h1>
            <p className="home-form-sub">
              {t(
                "Früh anzufragen heißt: Ihr wisst sofort, ob euer Datum frei ist — und bekommt unseren Couple's Guide mit allen Infos zu unserer Arbeit, zur Vorbereitung und zu den Kosten, damit ihr in Ruhe entscheiden könnt.",
                "Reaching out early means you'll know if your date is free and we'll send you our couple's guide — everything about the work, how to prepare and what it costs, so you have all you need to decide."
              )}
            </p>

            <a
              href="https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eure%20Hochzeitsfotografie%20und%20%E2%80%93film.%20K%C3%B6nnt%20ihr%20mir%20mehr%20Infos%20schicken%3F"
              rel="noopener noreferrer"
              style={{ display: "block", marginTop: 24, marginBottom: 28, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#888", textDecoration: "none" }}
            >
              {t("💬 Lieber per WhatsApp? Schreibt uns direkt →", "💬 Prefer WhatsApp? Message us directly →")}
            </a>

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
              <button type="submit" className="cf-submit home-submit" disabled={submitting}>
                {submitting ? t("Wird gesendet…", "Sending…") : t("VERFÜGBARKEIT PRÜFEN ♥", "CHECK AVAILABILITY ♥")}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Sticky video (desktop only) */}
        <div className="home-video-col">
          <div className="home-video-sticky">
            <video
              ref={desktopVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "max(100%, 177.78vh)",
                height: "max(100%, 56.25vw)",
                transform: "translate(-50%, -50%)",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="home-video-overlay" />
            <div className="hero-video-controls">
              <button className="hero-mute-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                )}
              </button>
              <button className="hero-mute-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                )}
              </button>
            </div>
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
