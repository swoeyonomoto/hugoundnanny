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
          <a href="https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny!%20%F0%9F%96%A4%0A%0AWe%20came%20across%20your%20work%20and%20love%20your%20style.%20Here%27s%20a%20little%20about%20us%3A%0A%0ANames%3A%20%5Byour%20names%5D%0AWedding%20date%20%26%20location%3A%20%5Bdate%20%26%20location%5D%0ALooking%20for%3A%20%5Bphoto%20%2F%20video%20%2F%20both%5D%0ABudget%3A%20%5Bapprox.%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!" target="_blank" rel="noopener noreferrer" className="hero-cta" onClick={() => window.fbq?.('track', 'Contact', { content_name: 'WhatsApp Click' })}>
            {t("Schreib uns", "Chat with us")}
          </a>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
