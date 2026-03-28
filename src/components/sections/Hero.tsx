import { useLang } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLang();
  return (
    <section id="hero">
      <div className="hero-video">
        <wistia-player
          media-id="n9jj0nzep3"
          aspect="1.7777777777777777"
          autoplay
          muted
          loop
          playsinline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
        <div className="hero-video-overlay" />
        <div className="hero-video-labels">
          <span className="hero-video-label-top">Weddingfilms</span>
          <span className="hero-video-label-bottom">Season 2025</span>
        </div>
      </div>
      <div className="hero-content">
        <h1 className="hero-headline">
          {t(
            <>Dein Tag.<br />Echt. <em>Für immer.</em></>,
            <>Your day.<br />Real. <em>Forever.</em></>
          )}
        </h1>
        <div className="hero-right">
          <p className="hero-sub">
            {t(
              "Wir halten die Momente fest, die man nicht planen kann. Die spontanen Blicke, die Berührungen, das Lachen — die echten Momente.",
              "We always strive to capture what cannot be planned. The spontaneous looks, the touches, the laughs — the real moments."
            )}
          </p>
          <a href="#contact" className="hero-cta">
            {t("Termin anfragen", "Get in touch")}
          </a>
        </div>
      </div>
      <span className="hero-scroll">Scroll</span>
    </section>
  );
};

export default Hero;
