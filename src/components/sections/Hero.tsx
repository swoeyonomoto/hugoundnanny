import { useState, useRef, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const { t } = useLang();
  const [showScroll, setShowScroll] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = playerRef.current as any;
        if (!player) return;
        entry.isIntersecting ? player.play?.() : player.pause?.();
      },
      { threshold: 0.6 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const player = playerRef.current as any;
    if (player) {
      player.muted = !player.muted;
      setIsMuted(player.muted);
    }
  };

  const muteStyle: React.CSSProperties = isMobile
    ? { position: "absolute", bottom: 56, right: 16, left: "auto", zIndex: 20 }
    : { position: "absolute", bottom: 56, left: "50%", transform: "translateX(-50%)", zIndex: 20 };

  return (
    <section id="hero">
      <div className="hero-video" ref={containerRef}>
        <mux-player
          ref={playerRef as any}
          playback-id="rR8P8mSaKDzz02TsftugTUdI00cQPJX00oy"
          autoplay
          loop
          muted
          stream-type="on-demand"
          default-hidden-captions
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            "--media-object-fit": "cover",
            "--controls": "none",
          } as React.CSSProperties}
        />
        <div className="hero-video-overlay" />
        <button
          className="hero-mute-btn"
          style={muteStyle}
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
            <em>Eure Geschichte.<br />Authentisch und echt.</em>,
            <em>Your story.<br />Authentic and raw.</em>
          )}
        </h1>
        <div className="hero-right">
          <p className="hero-sub">
            {t(
              "Wir halten die Momente fest, die man nicht planen kann. Die spontanen Blicke, die Berührungen, das Lachen — die echten Momente.",
              "We always strive to capture what cannot be planned. The spontaneous looks, the touches, the laughs — the real moments."
            )}
          </p>
          <a href="https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny!%20%F0%9F%96%A4%0A%0AWe%20came%20across%20your%20work%20and%20love%20your%20style.%20Here%27s%20a%20little%20about%20us%3A%0A%0ANames%3A%20%5Byour%20names%5D%0AWedding%20date%20%26%20location%3A%20%5Bdate%20%26%20location%5D%0ALooking%20for%3A%20%5Bphoto%20%2F%20video%20%2F%20both%5D%0ABudget%3A%20%5Bapprox.%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!" target="_blank" rel="noopener noreferrer" className="hero-cta" style={{ pointerEvents: "auto" }} onClick={(e) => { e.stopPropagation(); window.fbq?.('track', 'Contact', { content_name: 'WhatsApp Click' }); }}>
            {t("Schreib uns", "Chat with us")}
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

export default Hero;
