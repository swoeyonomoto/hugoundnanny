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
          <a href="https://api.whatsapp.com/send/?phone=4916097813272&text=Hi+Hugo+%26+Nanny%2C+wir+w%C3%BCrden+gerne+mehr+Infos+zu+euch+und+eurer+Arbeitsweise+erfahren.+Habt+ihr+Zeit+f%C3%BCr+einen+kurzen+Call+in+den+n%C3%A4chsten+Tagen%3F+Hier+ein+paar+Infos+%C3%BCber+uns%3A&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hero-cta">
            {t("Termin anfragen", "Get in touch")}
          </a>
        </div>
      </div>
      <span className="hero-scroll">Scroll</span>
    </section>
  );
};

export default Hero;
