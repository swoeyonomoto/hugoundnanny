import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LogoHeader from "@/components/LogoHeader";
import AutoColorNav from "@/components/AutoColorNav";
import RevealOnScroll from "@/components/RevealOnScroll";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";
import WistiaAutoplayPlayer, { type WistiaPlayerElement } from "@/components/WistiaAutoplayPlayer";
import BookingForm from "@/components/BookingForm";
import { ASIA_WHATSAPP_MESSAGE, getWhatsAppUrl } from "@/lib/whatsapp";

const ASIA_VIDEO_ID = "qj5sf0a59j";

const WHATSAPP_URL = getWhatsAppUrl(ASIA_WHATSAPP_MESSAGE);

const AsiaHero = () => {
  const { t } = useLang();
  const [showScroll, setShowScroll] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPlayFallback, setShowPlayFallback] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<WistiaPlayerElement | null>(null);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    const player = playerRef.current;
    if (player) {
      if (nextMuted) player.setAttribute("muted", "");
      else player.removeAttribute("muted");
      player.muted = nextMuted;
      player.volume = nextMuted ? 0 : 1;
      player._wistiaApi?.volume(nextMuted ? 0 : 1);
    }
    setIsMuted(nextMuted);
  };

  const toggleCaptions = () => {
    const nextEnabled = !captionsEnabled;
    const player = playerRef.current;
    if (player) player.captionsEnabled = nextEnabled;
    setCaptionsEnabled(nextEnabled);
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;
    const videoContainer = videoContainerRef.current;
    if (!player || !videoContainer) return;

    if (document.fullscreenElement || player.inFullscreen) {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (player.cancelFullscreen) await player.cancelFullscreen();
      setIsFullscreen(false);
      return;
    }

    if (videoContainer.requestFullscreen) await videoContainer.requestFullscreen();
    else if (player.requestFullscreen) await player.requestFullscreen();
    setIsFullscreen(true);
  };

  const startVideo = async () => {
    const player = playerRef.current;
    if (!player) return;
    player.muted = true;
    player.volume = 0;
    player._wistiaApi?.volume(0);
    try {
      await (player.play?.() ?? player._wistiaApi?.play?.());
      setShowPlayFallback(false);
    } catch {
      setShowPlayFallback(true);
    }
  };

  return (
    <section id="hero" className={`asia-hero ${captionsEnabled ? "captions-active" : ""}`}>
      <div className="hero-video" ref={videoContainerRef}>
        <WistiaAutoplayPlayer
          ref={playerRef}
          mediaId={ASIA_VIDEO_ID}
          aspect="1.25"
          className="asia-wistia-player"
          onAutoplayBlocked={() => setShowPlayFallback(true)}
          onPlaybackStarted={() => setShowPlayFallback(false)}
        />
        {showPlayFallback && (
          <button
            type="button"
            className="asia-video-play-fallback"
            onClick={startVideo}
            aria-label={t("Video abspielen", "Play video")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l10-6.5-10-6.5Z" />
            </svg>
          </button>
        )}
        <div className="asia-video-controls">
          <button
            className="hero-mute-btn"
            onClick={toggleMute}
            aria-label={isMuted ? t("Ton einschalten", "Unmute") : t("Ton ausschalten", "Mute")}
          >
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            )}
          </button>
          <button
            className={`hero-mute-btn asia-cc-btn ${captionsEnabled ? "active" : ""}`}
            onClick={toggleCaptions}
            aria-label={captionsEnabled ? t("Untertitel ausschalten", "Turn captions off") : t("Untertitel einschalten", "Turn captions on")}
            aria-pressed={captionsEnabled}
          >
            CC
          </button>
          <button
            className="hero-mute-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? t("Vollbild verlassen", "Exit fullscreen") : t("Vollbild", "Fullscreen")}
          >
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><polyline points="9 3 9 9 3 9"/><polyline points="15 21 15 15 21 15"/><polyline points="21 9 15 9 15 3"/><polyline points="3 15 9 15 9 21"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><polyline points="8 3 3 3 3 8"/><polyline points="16 3 21 3 21 8"/><polyline points="21 16 21 21 16 21"/><polyline points="3 16 3 21 8 21"/></svg>
            )}
          </button>
        </div>
      </div>
      <div className="hero-content" style={{ pointerEvents: "none" }}>
        <h1 className="hero-headline">
          {t(
            <em>Asien,<br />wir kommen zurück.</em>,
            <em>Asia,<br />we are coming back.</em>
          )}
        </h1>
        <div className="hero-right">
          <p className="hero-sub">
            {t(
              "Winter 2026/27: Wir sind im asiatischen Raum unterwegs - auf der Suche nach Paaren mit Geschichten, die es so noch nicht gibt.",
              "Winter 2026/27: We're travelling through Asia - looking for couples with stories that don't exist yet."
            )}
          </p>
          <a href="#apply" className="hero-cta" style={{ pointerEvents: "auto" }} onClick={() => window.fbq?.("track", "Contact", { content_name: "Asia Apply Click" })}>
            {t("Bewerbt euch", "Apply now")}
          </a>
        </div>
      </div>
      <div className={`hero-scroll-indicator ${showScroll ? "" : "hidden"}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
};

const AsiaLangBar = () => {
  const { lang, setLang } = useLang();
  return (
    <AutoColorNav className="lang-bar" darkSelectors="#hero" style={{ position: "fixed", top: 26, right: 32, zIndex: 500 }}>
      <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
      <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
    </AutoColorNav>
  );
};

const AsiaContent = () => {
  const { t } = useLang();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const openForm = () => {
    setShowForm(true);
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <>
      <SEO
        title="Hugo + Nanny in Asia - Winter 2026/27 · Wedding Photography & Film"
        description="From November to February we're shooting weddings across Asia. We're looking for adventurous couples - selected couples experience our premium service under special conditions. Just two weddings a month."
        path="/asia"
      />
      <LogoHeader variant="auto" />
      <AsiaLangBar />
      <Link to="/" className="aboutus-back-sticky">
        ← {t("Zurück", "Back")}
      </Link>

      <AsiaHero />

      <div className="asia-page">
      {/* Intro */}
      <section className="intro-text-section">
        <div className="wrap">
          <RevealOnScroll className="asia-editorial-grid asia-intro-grid">
            <span className="label">
              {t("N°01 - Warum Asien", "N°01 - Why Asia")}
            </span>
            <div className="asia-editorial-main">
              <h2 className="about-h intro-headline">
                {t(
                  <>Die Hochzeit von Eddie + Mel in Hongkong hat <em>unser Leben verändert.</em></>,
                  <>Eddie + Mel's wedding in Hong Kong <em>changed our life.</em></>
                )}
              </h2>
              <p className="about-p asia-lede">
                {t(
                  "Aus diesem einen Besuch wurde mehr: Wir haben in Asien unsere Familie gestartet und suchen seither ein neues Zuhause. Deshalb kommen wir zurück. Diesen Winter, von November bis Februar, ist unser Kalender in der ganzen Region offen. Wir suchen die Paare und die Geschichten, die vielleicht die Antwort sind.",
                  "That one visit became something bigger: we started our family in Asia and have been searching for a new home ever since. That's why we're coming back. This winter, from November through February, our calendar is open across the region. We're looking for the couples and the stories that might be the answer."
                )}
              </p>
            </div>
            <figure className="asia-photo asia-photo-wide">
              <img
                src="/photos/eddie-mel-thumb.jpg"
                alt={t("Eddie + Mel in Hongkong", "Eddie + Mel in Hong Kong")}
                loading="lazy"
              />
              <figcaption>{t("Eddie + Mel · Hongkong", "Eddie + Mel · Hong Kong")}</figcaption>
            </figure>
            <hr className="intro-rule" />
          </RevealOnScroll>
        </div>
      </section>

      {/* Who we're looking for */}
      <section id="story">
        <div className="wrap">
          <RevealOnScroll className="asia-editorial-grid">
            <span className="label">{t("N°02 - Wen wir suchen", "N°02 - Who we're looking for")}</span>
            <div className="asia-editorial-main">
              <h2 className="about-h">
                {t(
                  <>Abenteuerlustig.<br />Dynamisch. <em>Offen.</em></>,
                  <>Adventurous.<br />Dynamic. <em>Open.</em></>
                )}
              </h2>
              <p className="about-p">
                {t(
                  "Wir suchen keinen bestimmten Look und kein bestimmtes Budget. Wir suchen Menschen - Paare mit einem Hochzeitskonzept, das es zu erzählen lohnt, irgendwo im asiatischen Raum.",
                  "We're not looking for a certain look or a certain budget. We're looking for people - couples with a wedding concept worth telling, somewhere in the Asian region."
                )}
              </p>
              <ul className="asia-traits">
                <li>{t("Ihr wandert lieber zu eurer Zeremonie, als mit der Limousine vorzufahren.", "You'd rather hike to your ceremony than arrive by limousine.")}</li>
                <li>{t("Ihr beendet die Nacht dort, wo ihr wirklich sein wollt - nicht dort, wo es der Ablaufplan sagt.", "You end the night where you actually love to be - not where the schedule says.")}</li>
                <li>{t("Ihr vertraut uns, zu filmen, was wirklich passiert - nicht was gestellt ist.", "You trust us to film what really happens, not what's posed.")}</li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="asia-photo-pair">
            <figure className="asia-photo">
              <img
                src="/photos/02.jpg"
                alt={t("Hochzeitsfoto von Hugo + Nanny", "Wedding photo by Hugo + Nanny")}
                loading="lazy"
              />
            </figure>
            <figure className="asia-photo asia-photo-offset">
              <img
                src="/photos/11.jpg"
                alt={t("Hochzeitsfoto von Hugo + Nanny", "Wedding photo by Hugo + Nanny")}
                loading="lazy"
              />
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      <hr className="rule" />

      {/* The limit */}
      <section id="limit">
        <div className="wrap">
          <RevealOnScroll className="asia-editorial-grid asia-limit-grid">
            <span className="label">{t("Die 2", "The 2")}</span>
            <figure className="asia-photo asia-photo-side">
              <img
                src="/photos/14.jpg"
                alt={t("Hochzeitsfoto von Hugo + Nanny", "Wedding photo by Hugo + Nanny")}
                loading="lazy"
              />
            </figure>
            <div className="asia-editorial-main">
              <h2 className="about-h">
                {t(<>Nur noch 2 Hochzeiten<br /><em>pro Monat.</em></>, <>Only 2 weddings<br /><em>left per month.</em></>)}
              </h2>
              <div className="asia-copy-columns">
                {t(
                  <><p className="about-p">Von November bis Februar halten wir pro Monat zwei Hochzeiten für Asien frei - Termine, die ganz allein dieser Reise gehören. Genug Raum, um jede Geschichte richtig zu erzählen.</p><p className="about-p">Für euer Datum heißt das ganz einfach: solange es noch frei ist, ist es frei. Schreibt uns einfach, wenn ihr dabei sein wollt.</p></>,
                  <><p className="about-p">From November to February we keep two weddings a month just for Asia - dates that belong entirely to this journey. Enough room to tell each story properly.</p><p className="about-p">For your date that simply means: as long as it's open, it's open. Just write to us if you'd like to be one of them.</p></>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <hr className="rule" />

      {/* The offer */}
      <section id="offer">
        <div className="wrap">
          <RevealOnScroll className="asia-editorial-grid">
            <span className="label"></span>
            <div className="asia-editorial-main">
              <h2 className="about-h">
                {t(<>Ausgewählte Paare erleben<br /><em>unseren Premium-Service</em> - zu besonderen Konditionen.</>, <>Selected couples experience<br /><em>our premium service</em> - under special conditions.</>)}
              </h2>
              <div className="asia-copy-columns">
                {t(
                  <><p className="about-p">Diese Reisen sind ein neues Kapitel für unser Portfolio. Deshalb öffnen wir dieses Kapitel für ausgewählte Paare - derselbe Premium-Service, dasselbe Team, dieselbe Sorgfalt wie für jede andere Hochzeit auch.</p><p className="about-p">Ihr bekommt unsere vollständigen Pakete - Film, Foto, Drohne, Analog - einfach zu besonderen Konditionen, weil eure Geschichte Teil von etwas Neuem wird.</p></>,
                  <><p className="about-p">These journeys are a new chapter for our portfolio. That's why we open this chapter for selected couples - the same premium service, the same team, the same care as any other wedding.</p><p className="about-p">You get our full packages - film, photo, drone, analogue - simply under special conditions, because your story becomes part of something new.</p></>
                )}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="asia-steps-wrap">
            <ol className="asia-steps">
              <li>
                <span className="asia-step-n">1</span>
                <span>
                  {t(
                    "Schreibt uns mit eurem Datum, eurer Location und ein paar Zeilen zu eurer Idee.",
                    "Write to us with your date, your location and a few lines about your idea."
                  )}
                </span>
              </li>
              <li>
                <span className="asia-step-n">2</span>
                <span>
                  {t(
                    "Wir melden uns persönlich und sagen euch, ob euer Datum noch frei ist.",
                    "We reply personally and let you know if your date is still free."
                  )}
                </span>
              </li>
              <li>
                <span className="asia-step-n">3</span>
                <span>
                  {t(
                    "Wenn es passt, halten wir euer Datum für euch frei - zu besonderen Konditionen.",
                    "If it's a fit, we'll keep your date free for you - under special conditions."
                  )}
                </span>
              </li>
            </ol>
          </RevealOnScroll>
        </div>
      </section>

      <hr className="rule" />

      {/* Apply CTA */}
      <section id="apply" className="aboutus-cta-section">
        <div className="wrap">
          <RevealOnScroll className="asia-apply-grid">
            <h2 className="aboutus-cta-h">
              {t(
                <>Erzählt uns <em>eure Geschichte.</em></>,
                <>Tell us <em>your story.</em></>
              )}
            </h2>
            <div className="asia-apply-details">
              <p className="about-p asia-apply-copy">
                {t(
                  "Schickt uns euer Datum, eure Location und ein paar Zeilen zu euch. Wir antworten persönlich - versprochen.",
                  "Send us your date, your location and a few lines about you. We reply personally - promised."
                )}
              </p>
              <div className="asia-apply-actions">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta"
                  onClick={() => window.fbq?.("track", "Contact", { content_name: "Asia WhatsApp Click" })}
                >
                  {t("Per WhatsApp bewerben", "Apply via WhatsApp")}
                </a>
                <button type="button" className="about-cta-link asia-apply-link" onClick={openForm} aria-expanded={showForm}>
                  {t("Oder direkt über das Formular →", "Or use the form here →")}
                </button>
              </div>
            </div>
          </RevealOnScroll>
          {showForm && (
            <div ref={formRef} className="asia-inline-form">
              <BookingForm />
            </div>
          )}
        </div>
      </section>

      </div>

      <Footer />
    </>
  );
};

const Asia = () => (
  <LanguageProvider>
    <AsiaContent />
  </LanguageProvider>
);

export default Asia;
