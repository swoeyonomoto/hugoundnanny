import { useState, useRef, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import BookingForm from "@/components/BookingForm";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LogoHeader from "@/components/LogoHeader";
import AutoColorNav from "@/components/AutoColorNav";
import Footer from "@/components/sections/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { isElementMostlyVisible, pauseMuxPlayer, playMuxPlayer, type MuxPlayerElement } from "@/lib/mux";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const MuteButton = ({ isMuted, onClick, position }: { isMuted: boolean; onClick: () => void; position: "desktop-left" | "mobile-right" }) => {
  const style: React.CSSProperties = position === "mobile-right"
    ? { position: "absolute", bottom: 56, right: 16, left: "auto", zIndex: 20 }
    : { position: "absolute", bottom: 56, left: 16, zIndex: 20 };
  return (
    <button
      className="hero-mute-btn"
      style={style}
      onClick={onClick}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
      )}
    </button>
  );
};

const MuxVideo = forwardRef<MuxPlayerElement, { style?: React.CSSProperties }>(({ style }, ref) => {
  const props: any = {
    ref,
    "playback-id": "ir3Oo00t5PY11sOMI1Vy02rA4wZsLpS1M81XGhdgf00rVw",
    autoplay: "muted",
    autoPlay: true,
    loop: true,
    muted: true,
    playsinline: true,
    playsInline: true,
    preload: "metadata",
    "stream-type": "on-demand",
    "default-hidden-captions": true,
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      "--media-object-fit": "cover",
      "--controls": "none",
      ...style,
    },
  };
  return <mux-player {...props} />;
});

MuxVideo.displayName = "MuxVideo";

const HomepageContent = () => {
  const { t, lang, setLang } = useLang();
  const isMobile = useIsMobile();
  const [isMuted, setIsMuted] = useState(true);
  const mobilePlayerRef = useRef<MuxPlayerElement>(null);
  const desktopPlayerRef = useRef<MuxPlayerElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  const activePlayerRef = useRef<"mobile" | "desktop" | null>(null);

  useEffect(() => {
    const player = isMobile ? mobilePlayerRef.current : desktopPlayerRef.current;
    if (!player) return;

    const attemptPlay = () => {
      player.muted = true;
      const playResult = player.play?.();
      if (playResult && typeof playResult.catch === "function") {
        playResult.catch(() => {});
      }
    };

    attemptPlay();
    void customElements.whenDefined("mux-player").then(attemptPlay);
    player.addEventListener("canplay", attemptPlay, { once: true });

    return () => {
      player.removeEventListener("canplay", attemptPlay);
    };
  }, [isMobile]);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    const active = activePlayerRef.current === "mobile"
      ? mobilePlayerRef.current
      : activePlayerRef.current === "desktop"
        ? desktopPlayerRef.current
        : isMobile
          ? mobilePlayerRef.current
          : desktopPlayerRef.current;
    const inactive = isMobile ? desktopPlayerRef.current : mobilePlayerRef.current;
    if (active) active.muted = next;
    if (inactive) inactive.muted = true;
  };

  useEffect(() => {
    if (!isMobile) return;

    const container = mobileContainerRef.current;
    if (!container) return;

    const syncPlayback = async () => {
      const player = mobilePlayerRef.current;
      if (!player) return;
      if (isElementMostlyVisible(container, 0.6)) {
        activePlayerRef.current = "mobile";
        await playMuxPlayer(player);
      } else {
        await pauseMuxPlayer(player);
        player.muted = true;
      }
    };

    const observer = new IntersectionObserver(() => {
      void syncPlayback();
    }, { threshold: [0, 0.6, 1] });

    observer.observe(container);
    void syncPlayback();
    window.addEventListener("pageshow", syncPlayback);
    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", syncPlayback);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const container = desktopContainerRef.current;
    if (!container) return;

    const syncPlayback = async () => {
      const player = desktopPlayerRef.current;
      if (!player) return;
      if (isElementMostlyVisible(container, 0.6)) {
        activePlayerRef.current = "desktop";
        await playMuxPlayer(player);
      } else {
        await pauseMuxPlayer(player);
        player.muted = true;
      }
    };

    const observer = new IntersectionObserver(() => {
      void syncPlayback();
    }, { threshold: [0, 0.6, 1] });

    observer.observe(container);
    void syncPlayback();
    window.addEventListener("pageshow", syncPlayback);
    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", syncPlayback);
    };
  }, [isMobile]);

  return (
    <>
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
        {isMobile && (
          <div className="home-video-mobile" ref={mobileContainerRef}>
            <div className="home-video-inner" style={{ position: "relative" }}>
              <MuxVideo ref={mobilePlayerRef} />
              <div className="home-video-overlay" />
              <MuteButton isMuted={isMuted} onClick={toggleMute} position="mobile-right" />
            </div>
          </div>
        )}

        <div className="home-form-col">
          <nav className="home-desktop-nav">
            <div className="home-desktop-nav-left">
              <a href="/">
                <img src="/photos/logo-left.png" alt="hugo + nanny" className="logo-header-img" />
              </a>
              <Link to="/about" className="home-desktop-about">{t("ÜBER UNS", "ABOUT US")}</Link>
            </div>
          </nav>

          <AutoColorNav className="home-desktop-lang" style={{ position: "fixed", zIndex: 500 }}>
            <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
          </AutoColorNav>

          <div className="home-form-inner">
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
            <p style={{ fontSize: 12, color: "#999", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
              {t("Pakete ab € 3.900 — alle Preise im Couple's Guide.", "Packages from €3,900 — full pricing in the couple's guide.")}
            </p>

            <a
              href="https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eure%20Hochzeitsfotografie%20und%20%E2%80%93film.%20K%C3%B6nnt%20ihr%20mir%20mehr%20Infos%20schicken%3F"
              rel="noopener noreferrer"
              style={{ display: "block", marginTop: 24, marginBottom: 28, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#888", textDecoration: "none" }}
            >
              {t("💬 Lieber per WhatsApp? Schreibt uns direkt →", "💬 Prefer WhatsApp? Message us directly →")}
            </a>

            <BookingForm />
          </div>
        </div>

        {!isMobile && (
          <div className="home-video-col" ref={desktopContainerRef}>
            <div className="home-video-sticky" style={{ position: "relative" }}>
              <MuxVideo ref={desktopPlayerRef} />
              <div className="home-video-overlay" />
              <MuteButton isMuted={isMuted} onClick={toggleMute} position="desktop-left" />
            </div>
          </div>
        )}
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
