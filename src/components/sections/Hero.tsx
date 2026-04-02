import { useState, useRef, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";

const VIDEO_SRC = "https://cdcjyvwghreyukugihjx.supabase.co/storage/v1/object/public/Hugo%20Nanny%20Header/Hugo%20%26%20Nanny%20Reel%204%2016-9_1.mp4";

const Hero = () => {
  const { t } = useLang();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = isMuted;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <section id="hero">
      <div className="hero-video">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
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
        <div className="hero-video-overlay" />
        <div className="hero-video-controls">
          <button className="hero-mute-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
          <button className="hero-mute-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="hero-content">
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
          <a href="https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny!%20%F0%9F%96%A4%0A%0AWe%20came%20across%20your%20work%20and%20love%20your%20style.%20Here%27s%20a%20little%20about%20us%3A%0A%0ANames%3A%20%5Byour%20names%5D%0AWedding%20date%20%26%20location%3A%20%5Bdate%20%26%20location%5D%0ALooking%20for%3A%20%5Bphoto%20%2F%20video%20%2F%20both%5D%0ABudget%3A%20%5Bapprox.%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!" target="_blank" rel="noopener noreferrer" className="hero-cta" onClick={() => window.fbq?.('track', 'Contact', { content_name: 'WhatsApp Click' })}>
            {t("Schreib uns", "Chat with us")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
