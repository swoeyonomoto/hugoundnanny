import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/contexts/LanguageContext";

const BUNNY_SRC = "https://player.mediadelivery.net/embed/631498/b16359ac-5b5d-45af-b1af-179ed85b37be?autoplay=true&loop=false&muted=false&preload=true&responsive=true";

const Hero = () => {
  const { t } = useLang();
  const [showScroll, setShowScroll] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const srcRemovedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer: pause/resume iframe video
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        if (entry.isIntersecting) {
          // Try postMessage play
          try {
            iframe.contentWindow?.postMessage('{"event":"command","func":"play","method":"play"}', "*");
          } catch {}
          // Fallback: restore src if it was removed
          if (srcRemovedRef.current) {
            iframe.src = BUNNY_SRC;
            srcRemovedRef.current = false;
          }
        } else {
          // Try postMessage pause
          try {
            iframe.contentWindow?.postMessage('{"event":"command","func":"pause","method":"pause"}', "*");
          } catch {}
          // Fallback: remove src after a short delay
          setTimeout(() => {
            if (iframe && !containerRef.current?.getBoundingClientRect()) return;
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect && (rect.bottom < 0 || rect.top > window.innerHeight)) {
              iframe.src = "";
              srcRemovedRef.current = true;
            }
          }, 300);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero">
      <div className="hero-video" ref={containerRef}>
        <iframe
          ref={iframeRef}
          src={BUNNY_SRC}
          loading="lazy"
          style={{
            border: 0,
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowFullScreen
        />
        <div className="hero-video-overlay" />
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
