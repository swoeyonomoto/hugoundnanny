import { useState, useRef, useEffect, useCallback } from "react";
import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const films = [
  { name: "Dario & Marie", loc: "Köln, Deutschland", locEn: "Cologne, Germany", mediaId: "ejclzzj2uc", thumb: "/photos/dario-marie-thumb.jpg" },
  { name: "Eddie & Mel", loc: "Hongkong", locEn: "Hong Kong", mediaId: "1tt9dtcb3n", thumb: "/photos/eddie-mel-thumb.jpg" },
  { name: "Toni & Freddi", loc: "Nizza, Frankreich", locEn: "Nice, France", mediaId: "shthso9t3v", thumb: "/photos/toni-freddi-thumb.jpg" },
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
  const [isMuted, setIsMuted] = useState(false);
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

  const toggleMute = () => {
    if (!wistiaRef.current) return;
    const newMuted = !isMuted;
    wistiaRef.current.volume(newMuted ? 0 : 1);
    setIsMuted(newMuted);
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
                    src={f.thumb}
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

      {activeFilm !== null && (
        <div className="video-overlay" ref={overlayRef}>
          <div className="video-overlay-bg" onClick={handleClose} />
          <button className="video-overlay-close" onClick={handleClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div className="video-overlay-player">
            <wistia-player
              media-id={films[activeFilm].mediaId}
              aspect="1.7777777777777777"
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
            <div className="video-playbar">
              <button className="vp-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                )}
              </button>
              <button className="vp-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                )}
              </button>
              <button className="vp-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Work;
