import { useLang } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLang();
  return (
    <section id="hero">
      <div className="hero-video">
        <div className="hero-video-placeholder">Video Showreel</div>
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
              "Wir halten die Momente fest, die man nicht planen kann.",
              "We capture the moments that cannot be planned."
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
