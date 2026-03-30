import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LangBar from "@/components/LangBar";
import RevealOnScroll from "@/components/RevealOnScroll";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";

const WHATSAPP_URL = "https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny!%20%F0%9F%96%A4%0A%0AWe%20came%20across%20your%20work%20and%20love%20your%20style.%20Here%27s%20a%20little%20about%20us%3A%0A%0ANames%3A%20%5Byour%20names%5D%0AWedding%20date%20%26%20location%3A%20%5Bdate%20%26%20location%5D%0ALooking%20for%3A%20%5Bphoto%20%2F%20video%20%2F%20both%5D%0ABudget%3A%20%5Bapprox.%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!";

const team = [
  {
    name: "Joey",
    role: { de: "Gründer · Videograf · Fotograf", en: "Founder · Videographer · Photographer" },
    bio: {
      de: "Joey, Gründer von Hugo & Nanny, liebt Hochzeiten seit 7 Jahren wie am ersten Tag. Tagsüber Videograf, nachts Maler — und unser Ass im Ärmel, wenn es um Fotografie geht. Ein moderner Ninja mit Charme. Falls ihr ihn nicht findet: schaut bei den Süßigkeiten.",
      en: "Joey, founder of Hugo & Nanny, has loved weddings for 7 years like it was day one. Videographer by day, painter by night—and our ace up the sleeve when it comes to photography. A modern-world ninja with charm. If you can't find him: check by the sweets.",
    },
    photo: "/photos/joey.jpg",
  },
  {
    name: "Seli",
    role: { de: "Künstlerin · Fotografin", en: "Artist · Photographer" },
    bio: {
      de: "Seli, Künstlerin und selbsternannte Ästhetin — zu Recht. Ihr Gespür dafür, Momente in Kunst zu verwandeln, ist unübertroffen. Heimlich unser Web-Nerd: Schaut man eine Sekunde weg, ist die Website schon neu gestaltet.",
      en: "Seli, artist and self-proclaimed aesthete—rightfully so. Her instinct for transforming moments into art is unmatched. Secretly our web nerd: look away for a second, and the website is already redesigned.",
    },
    photo: "/photos/seli.jpg",
  },
  {
    name: "Tilmann",
    role: { de: "Hochzeitsfilmer", en: "Wedding Filmmaker" },
    bio: {
      de: "Tilmann, unser Hochzeitsfilm-Maestro mit einer Schwäche für Keyframes, Schnitte und die Kelly Family — mit der er regelmäßig auf Tour geht. Stellt ihn in die richtige Ecke und er verzaubert die Gäste mit seinen stoischen Gedanken.",
      en: "Tilmann, our wedding film maestro with a soft spot for keyframes, cuts and the Kelly Family—with whom he regularly goes on tour. Put him in the right corner, and he'll enchant the guests with his stoic thoughts.",
    },
    photo: "/photos/about.jpg",
  },
  {
    name: "Chiara",
    role: { de: "Fotografin · Künstlerin", en: "Photographer · Artist" },
    bio: {
      de: "Chiara, unsere künstlerischste Seele. Sie fotografiert Hochzeiten, aber immer mit einem besonderen Twist. Wenn sie nicht hinter der Linse steht, erschafft sie Kunstobjekte und studiert Kunst an einer der renommiertesten Akademien Deutschlands.",
      en: "Chiara, our most artistic soul. She shoots wedding photos but always with a twist. When she's not behind the lenses, she's crafting art objects and studies arts at one of the most renowned academies in Germany.",
    },
    photo: "/photos/chiara.jpg",
  },
];

const AboutUsContent = () => {
  const { t } = useLang();

  return (
    <>
      <LangBar />

      {/* Sticky back button */}
      <Link to="/" className="aboutus-back-sticky">
        ← {t("Zurück", "Back")}
      </Link>

      <section className="aboutus-hero">
        <div className="wrap">
          <RevealOnScroll>
            <span className="label">{t("Über uns", "About us")}</span>
            <h1 className="aboutus-title">
              {t(
                <>Mehr als ein Team.<br /><em>Eine Familie.</em></>,
                <>More than a team.<br /><em>A family.</em></>
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

      {/* Magazine-style team grid */}
      <section className="aboutus-magazine">
        <div className="wrap">
          {team.map((member, i) => (
            <div key={member.name} className={`mag-card mag-${member.layout}`}>
              <RevealOnScroll className="mag-card-photo-wrap">
                <div className="mag-card-photo">
                  <img src={member.photo} alt={member.name} />
                </div>
              </RevealOnScroll>
              <RevealOnScroll className="mag-card-text">
                <span className="label">{t(member.role.de, member.role.en)}</span>
                <h2 className="mag-card-name">{member.name}</h2>
                <p className="mag-card-bio">{t(member.bio.de, member.bio.en)}</p>
              </RevealOnScroll>
            </div>
          ))}
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
