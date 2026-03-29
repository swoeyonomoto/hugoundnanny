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
      </div>
      <div className="hero-content">
        <h1 className="hero-headline">
          {t(
            <>Eure Geschichten.<br /><em>Authentisch und echt.</em></>,
            <>Your stories.<br /><em>Authentic and raw.</em></>
          )}
        </h1>
        <div className="hero-right">
          <p className="hero-sub">
            {t(
              "Wir halten die Momente fest, die man nicht planen kann. Die spontanen Blicke, die Berührungen, das Lachen — die echten Momente.",
              "We always strive to capture what cannot be planned. The spontaneous looks, the touches, the laughs — the real moments."
            )}
          </p>
          <a href="https://wa.me/4916097813272?text=Hi%2C%20we%20are%20interested%20in%20getting%20to%20know%20more%20about%20you.%20We%20are..." target="_blank" rel="noopener noreferrer" className="hero-cta">
            {t("Termin anfragen", "Get in touch")}
          </a>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
