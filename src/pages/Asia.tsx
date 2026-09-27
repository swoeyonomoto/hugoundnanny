import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LogoHeader from "@/components/LogoHeader";
import AutoColorNav from "@/components/AutoColorNav";
import RevealOnScroll from "@/components/RevealOnScroll";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";

// Placeholder — same reel as the current pages, swap later when the Asia reel exists
const VIDEO_URL = "https://pub-389b609f3429428897e0717a18b3a2f0.r2.dev/Hugo%20%26%20Nanny%20Reel%204%2016-9_1.mp4";

const WHATSAPP_URL =
  "https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny!%20%F0%9F%96%A4%0A%0AWir%20heiraten%20in%20Asien%20(November%E2%80%93Februar)%20und%20interessieren%20uns%20f%C3%BCr%20euer%20Asia-Kapitel.%0A%0ANamen%3A%20%5Beure%20Namen%5D%0ADatum%20%26%20Location%3A%20%5BDatum%20%26%20Ort%5D%0AUnsere%20Idee%3A%20%5Bkurz%20eure%20Vision%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!";

const AsiaHero = () => {
  const { t } = useLang();
  const [showScroll, setShowScroll] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    const container = containerRef.current;
    if (!player || !container) return;

    player.muted = true;
    player.play()?.catch(() => {});

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.6) {
        player.play()?.catch(() => {});
      } else {
        player.pause();
      }
    }, { threshold: [0, 0.6, 1] });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const player = playerRef.current;
    if (player) {
      player.muted = !player.muted;
      setIsMuted(player.muted);
    }
  };

  return (
    <section id="hero" className="asia-hero">
      <div className="hero-video" ref={containerRef}>
        <video
          ref={playerRef}
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div className="hero-video-overlay" />
        <button
          className="hero-mute-btn"
          style={{ position: "absolute", bottom: 56, right: 16, zIndex: 20 }}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          )}
        </button>
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
              "Winter 2026/27: Wir sind im asiatischen Raum unterwegs — auf der Suche nach Paaren mit Geschichten, die es so noch nicht gibt.",
              "Winter 2026/27: We're travelling through Asia — looking for couples with stories that don't exist yet."
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
    <AutoColorNav className="lang-bar" darkSelectors="#hero, #offer" style={{ position: "fixed", top: 26, right: 32, zIndex: 500 }}>
      <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
      <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
    </AutoColorNav>
  );
};

const AsiaContent = () => {
  const { t } = useLang();

  return (
    <>
      <SEO
        title="Hugo + Nanny in Asia — Winter 2026/27 · Wedding Photography & Film"
        description="From November to February we're shooting weddings across Asia. We're looking for adventurous couples — selected couples receive 50% off our packages. Only two weddings per month."
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
              {t("N°01 – Warum Asien", "N°01 – Why Asia")}
            </span>
            <div className="asia-editorial-main">
              <h2 className="about-h intro-headline">
                {t(
                  <>Die Hochzeit von Eddie & Mel brachte uns nach Hongkong – und wir kommen seither <em>immer wieder zurück.</em></>,
                  <>The wedding of Eddie & Mel brought us to Hong Kong – and we've been <em>coming back ever since.</em></>
                )}
              </h2>
              <p className="about-p asia-lede">
                {t(
                  "Wir leben hier noch nicht. Wir kommen immer wieder – in denselben Hafen, auf dieselben Hügel – um herauszufinden, ob Asien ein Zuhause werden könnte. Diesen Winter, von November bis Februar, ist unser Kalender in der ganzen Region offen. Wir suchen die Paare und die Geschichten, die vielleicht die Antwort sind.",
                  "We don't live here yet. We keep returning – to the same harbour, the same hills – to find out whether Asia could become a home. This winter, from November through February, our calendar is open across the region. We're looking for the couples and the stories that might be the answer."
                )}
              </p>
            </div>
            <figure className="asia-photo asia-photo-wide">
              <img
                src="/photos/eddie-mel-thumb.jpg"
                alt={t("Eddie & Mel in Hongkong", "Eddie & Mel in Hong Kong")}
                loading="lazy"
              />
              <figcaption>{t("Eddie & Mel · Hongkong", "Eddie & Mel · Hong Kong")}</figcaption>
            </figure>
            <hr className="intro-rule" />
          </RevealOnScroll>
        </div>
      </section>

      {/* Who we're looking for */}
      <section id="story">
        <div className="wrap">
          <RevealOnScroll className="asia-editorial-grid">
            <span className="label">{t("N°02 – Wen wir suchen", "N°02 – Who we're looking for")}</span>
            <div className="asia-editorial-main">
              <h2 className="about-h">
                {t(
                  <>Abenteuerlustig.<br />Dynamisch. <em>Offen.</em></>,
                  <>Adventurous.<br />Dynamic. <em>Open.</em></>
                )}
              </h2>
              <p className="about-p">
                {t(
                  "Wir suchen keinen bestimmten Look und kein bestimmtes Budget. Wir suchen Menschen – Paare mit einem Hochzeitskonzept, das es zu erzählen lohnt, irgendwo im asiatischen Raum.",
                  "We're not looking for a certain look or a certain budget. We're looking for people – couples with a wedding concept worth telling, somewhere in the Asian region."
                )}
              </p>
              <ul className="asia-traits">
                <li>{t("Ihr wandert lieber zu eurer Zeremonie, als mit der Limousine vorzufahren.", "You'd rather hike to your ceremony than arrive by limousine.")}</li>
                <li>{t("Ihr beendet die Nacht dort, wo ihr wirklich sein wollt – nicht dort, wo es der Ablaufplan sagt.", "You end the night where you actually love to be – not where the schedule says.")}</li>
                <li>{t("Ihr vertraut uns, zu filmen, was wirklich passiert – nicht was gestellt ist.", "You trust us to film what really happens, not what's posed.")}</li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="asia-photo-pair">
            <figure className="asia-photo">
              <img
                src="/photos/02.jpg"
                alt={t("Hochzeitsfoto von Hugo & Nanny", "Wedding photo by Hugo & Nanny")}
                loading="lazy"
              />
            </figure>
            <figure className="asia-photo asia-photo-offset">
              <img
                src="/photos/11.jpg"
                alt={t("Hochzeitsfoto von Hugo & Nanny", "Wedding photo by Hugo & Nanny")}
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
            <span className="label">{t("Nur acht Hochzeiten", "Only eight weddings")}</span>
            <div className="asia-editorial-main">
              <h2 className="about-h">
                {t(<>Zwei pro Monat.<br /><em>Acht im ganzen Winter.</em></>, <>Two per month.<br /><em>Eight all winter.</em></>)}
              </h2>
              <div className="asia-copy-columns">
                {t(
                  <><p className="about-p">Zwischen November und Februar nehmen wir maximal zwei Hochzeiten pro Monat an. Das ist keine Marketingzahl — es ist die Menge an Geschichten, die wir neben unseren regulären Hochzeiten in Europa wirklich erzählen können.</p><p className="about-p">Jede verdient unsere volle Aufmerksamkeit. Deshalb gilt: Wenn euer Datum vergeben ist, ist es vergeben. Eine frühe Anfrage lohnt sich.</p></>,
                  <><p className="about-p">Between November and February we take on a maximum of two weddings per month. That's not a marketing number — it's the amount of stories we can honestly tell alongside our regular weddings in Europe.</p><p className="about-p">Each one deserves our full attention. So here's the deal: if your date is taken, it's taken. An early inquiry pays off.</p></>
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
            <span className="label">{t("Für ausgewählte Paare", "For selected couples")}</span>
            <div className="asia-editorial-main">
              <h2 className="about-h">
                {t(<>Ausgewählte Paare erhalten<br /><em>50 % auf unsere Pakete.</em></>, <>Selected couples receive<br /><em>50% off our packages.</em></>)}
              </h2>
              <div className="asia-copy-columns">
                {t(
                  <><p className="about-p">Diese Reisen sind ein neues Kapitel für unser Portfolio. Deshalb arbeiten wir für ausgewählte Paare zur Hälfte unseres regulären Honorars — dieselbe Arbeit, dasselbe Team, dieselbe Sorgfalt wie für jede andere Hochzeit auch.</p><p className="about-p">Ihr bekommt unsere vollständigen Pakete — Film, Foto, Drohne, Analog — einfach zu besonderen Konditionen, weil eure Geschichte Teil von etwas Neuem wird.</p></>,
                  <><p className="about-p">These journeys are a new chapter for our portfolio. That's why selected couples work with us at half our regular rate — the same work, the same team, the same care as any other wedding.</p><p className="about-p">You get our full packages — film, photo, drone, analogue — simply at special terms, because your story becomes part of something new.</p></>
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
                    "Wir melden uns persönlich und sagen euch, ob euer Datum noch offen ist.",
                    "We reply personally and tell you whether your date is still open."
                  )}
                </span>
              </li>
              <li>
                <span className="asia-step-n">3</span>
                <span>
                  {t(
                    "Wenn wir zusammenpassen, sichert ihr euren Platz zum halben Honorar.",
                    "If we're a fit, you secure your date at half our rate."
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
            <p className="about-p asia-apply-copy">
              {t(
                "Schickt uns euer Datum, eure Location und ein paar Zeilen zu euch. Wir antworten persönlich — versprochen.",
                "Send us your date, your location and a few lines about you. We reply personally — promised."
              )}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              onClick={() => window.fbq?.("track", "Contact", { content_name: "Asia WhatsApp Click" })}
            >
              {t("Per WhatsApp bewerben", "Apply via WhatsApp")}
            </a>
            <br />
            <a href="/#contact" className="about-cta-link" style={{ marginTop: 20 }}>
              {t("Oder über das Formular auf unserer Startseite →", "Or use the form on our homepage →")}
            </a>
          </RevealOnScroll>
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
