import { useState, useRef, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const films = [
  { name: "Dario & Marie", loc: "Köln, Deutschland", locEn: "Cologne, Germany", mediaId: "ejclzzj2uc" },
  { name: "Eddie & Mel", loc: "Hongkong", locEn: "Hong Kong", mediaId: "1tt9dtcb3n" },
  { name: "Toni & Freddi", loc: "Nizza, Frankreich", locEn: "Nice, France", mediaId: "shthso9t3v" },
];

const photos = [
  "/photos/02.jpg",
  "/photos/03.png",
  "/photos/07.jpg",
  "/photos/08.jpg",
  "/photos/11.jpg",
  "/photos/14.jpg",
];

const Work = () => {
  const { t } = useLang();
  const [activeFilm, setActiveFilm] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wistiaRef = useRef<any>(null);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (activeFilm !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeFilm]);

  // Listen for Wistia player events
  useEffect(() => {
    if (activeFilm === null) return;

    const interval = setInterval(() => {
      const el = overlayRef.current?.querySelector("wistia-player") as any;
      if (el && el._wistiaApi) {
        wistiaRef.current = el._wistiaApi;
        setIsPlaying(true);
        clearInterval(interval);

        el._wistiaApi.bind("play", () => setIsPlaying(true));
        el._wistiaApi.bind("pause", () => setIsPlaying(false));
        el._wistiaApi.bind("end", () => {
          setIsPlaying(false);
          setActiveFilm(null);
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [activeFilm]);

  const handleClose = () => {
    if (wistiaRef.current) {
      wistiaRef.current.pause();
    }
    wistiaRef.current = null;
    setActiveFilm(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!wistiaRef.current) return;
    if (isPlaying) {
      wistiaRef.current.pause();
    } else {
      wistiaRef.current.play();
    }
  };

  const toggleFullscreen = () => {
    const el = overlayRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  };

  return (
    <>
      <hr className="rule" />
      <section id="work">
        <div className="wrap">
          <RevealOnScroll>
            <div className="work-top">
              <div>
                <span className="label">{t("Unsere Arbeit", "Our work")}</span>
                <h2 className="work-h">
                  {t(
                    <>Echte Momente.<br /><em>Echte Geschichten.</em></>,
                    <>Real moments.<br /><em>Real stories.</em></>
                  )}
                </h2>
              </div>
              <p className="work-intro">
                {t(
                  "Jede Hochzeit ist anders. Genau das lieben wir. Hier sind ein paar der Geschichten, die wir festhalten durften.",
                  "Every wedding is different. That's exactly what we love. Here are a few of the stories we got to tell."
                )}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="films">
              {films.map((f, i) => (
                <div className="film" key={i} onClick={() => { setActiveFilm(i); setIsPlaying(true); }}>
                  <img
                    className="film-bg"
                    src={`https://fast.wistia.com/embed/medias/${f.mediaId}/swatch`}
                    alt={f.name}
                  />
                  <div className="film-shade" />
                  <div className="film-play">▶</div>
                  <div className="film-info">
                    <div className="film-name">{f.name}</div>
                    <div className="film-loc">{t(f.loc, f.locEn)}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="photos">
              {photos.map((src, i) => (
                <div className="photo" key={i}>
                  <img src={src} alt={`Wedding photo ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <a href="https://www.hugo-nanny.de" target="_blank" rel="noopener noreferrer" className="work-link">
            {t("Alle Hochzeiten ansehen", "See all weddings")} →
          </a>
        </div>
      </section>

      {/* Minimal fullscreen video overlay */}
      {activeFilm !== null && (
        <div className="video-overlay" ref={overlayRef}>
          <div className="video-overlay-bg" onClick={handleClose} />
          <div className="video-overlay-player">
            <wistia-player
              media-id={films[activeFilm].mediaId}
              aspect="1.7777777777777777"
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="video-overlay-controls">
            <button className="vo-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              )}
            </button>
            <button className="vo-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
            </button>
            <button className="vo-btn" onClick={handleClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Work;
