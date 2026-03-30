import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LangBar from "@/components/LangBar";
import RevealOnScroll from "@/components/RevealOnScroll";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";

const WHATSAPP_URL = "https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny!%20%F0%9F%96%A4%0A%0AWe%20came%20across%20your%20work%20and%20love%20your%20style.%20Here%27s%20a%20little%20about%20us%3A%0A%0ANames%3A%20%5Byour%20names%5D%0AWedding%20date%20%26%20location%3A%20%5Bdate%20%26%20location%5D%0ALooking%20for%3A%20%5Bphoto%20%2F%20video%20%2F%20both%5D%0ABudget%3A%20%5Bapprox.%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!";

const AboutUsContent = () => {
  const { t } = useLang();

  return (
    <>
      <LangBar />

      <section className="aboutus-hero">
        <div className="wrap">
          <Link to="/" className="aboutus-back">
            ← {t("Zurück", "Back")}
          </Link>
          <RevealOnScroll>
            <span className="label">{t("Über uns", "About us")}</span>
            <h1 className="aboutus-title">
              {t(
                <>Zwei Menschen.<br /><em>Eine Leidenschaft.</em></>,
                <>Two people.<br /><em>One passion.</em></>
              )}
            </h1>
            <p className="aboutus-intro">
              {t(
                "Wir glauben daran, dass die schönsten Momente die ungeplanten sind. Deshalb arbeiten wir leise, aufmerksam und immer mit Herz.",
                "We believe the most beautiful moments are the unplanned ones. That's why we work quietly, attentively, and always with heart."
              )}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <hr className="rule" />

      <section className="aboutus-person">
        <div className="wrap aboutus-person-grid">
          <RevealOnScroll className="rv2">
            <div className="aboutus-photo">
              <img src="/photos/about.jpg" alt="Hugo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <span className="label">{t("Videograf", "Videographer")}</span>
            <h2 className="aboutus-name">Hugo</h2>
            <p className="aboutus-bio">
              {t(
                "Hugo ist Filmemacher aus Leidenschaft. Schon als Kind hat er Geschichten durch die Linse erzählt — heute macht er daraus Kunst. Sein Stil ist ruhig, filmisch und emotional. Er fängt die Momente ein, die man sonst vergessen würde: ein Blick, ein Lachen, eine stille Träne. Für Hugo geht es nicht um perfekte Bilder, sondern um echte Gefühle.",
                "Hugo is a filmmaker by passion. Even as a child, he told stories through the lens — today he turns them into art. His style is calm, cinematic, and emotional. He captures the moments you'd otherwise forget: a glance, a laugh, a quiet tear. For Hugo, it's not about perfect images — it's about real feelings."
              )}
            </p>
            <p className="aboutus-bio">
              {t(
                "Wenn er nicht gerade dreht, findet man ihn beim Surfen, in der Natur oder bei einem guten Espresso — meistens alles gleichzeitig.",
                "When he's not filming, you'll find him surfing, in nature, or with a good espresso — usually all at once."
              )}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <hr className="rule" />

      <section className="aboutus-person">
        <div className="wrap aboutus-person-grid reverse">
          <RevealOnScroll className="rv2">
            <div className="aboutus-photo">
              <img src="/photos/about.jpg" alt="Nanny" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <span className="label">{t("Fotografin", "Photographer")}</span>
            <h2 className="aboutus-name">Nanny</h2>
            <p className="aboutus-bio">
              {t(
                "Nanny sieht die Welt in Farben, Licht und Gefühlen. Ihre Fotografie ist intuitiv — sie spürt den richtigen Moment und drückt genau dann ab. Ihre Bilder sind warm, ehrlich und voller Leben. Sie glaubt daran, dass jede Hochzeit ihre eigene Sprache hat — und sie hört genau zu.",
                "Nanny sees the world in colors, light, and feelings. Her photography is intuitive — she senses the right moment and clicks at exactly the right time. Her images are warm, honest, and full of life. She believes every wedding has its own language — and she listens carefully."
              )}
            </p>
            <p className="aboutus-bio">
              {t(
                "Abseits der Kamera liebt sie gutes Essen, lange Spaziergänge und das Meer. Und ja — sie weint auf fast jeder Hochzeit. Aber pssst.",
                "Away from the camera, she loves good food, long walks, and the sea. And yes — she cries at almost every wedding. But shhh."
              )}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <hr className="rule" />

      <section className="aboutus-cta-section">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <RevealOnScroll>
            <h2 className="aboutus-cta-h">
              {t(
                <><em>Lust uns kennenzulernen?</em></>,
                <><em>Want to get to know us?</em></>
              )}
            </h2>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              style={{ background: '#111', color: '#fff' }}
              onClick={() => (window as any).fbq?.('track', 'Contact', { content_name: 'WhatsApp Click' })}
            >
              {t("Schreib uns auf WhatsApp", "Chat with us on WhatsApp")}
            </a>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </>
  );
};

const AboutUs = () => (
  <LanguageProvider>
    <AboutUsContent />
  </LanguageProvider>
);

export default AboutUs;
