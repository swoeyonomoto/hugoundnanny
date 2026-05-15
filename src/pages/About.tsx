import { LanguageProvider } from "@/contexts/LanguageContext";
import AutoColorNav from "@/components/AutoColorNav";
import LogoHeader from "@/components/LogoHeader";
import StickyCta from "@/components/StickyCta";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can we have a chat before booking?", acceptedAnswer: { "@type": "Answer", text: "Yes, absolutely — and we'd actually love that. We would never confirm anything without having had a good chance to connect and exchange first." } },
    { "@type": "Question", name: "How far in advance should we book?", acceptedAnswer: { "@type": "Answer", text: "Most couples book us 12–18 months in advance. For summer season and destination weddings, the earlier the better." } },
    { "@type": "Question", name: "Do you travel internationally?", acceptedAnswer: { "@type": "Answer", text: "Yes. We've shot in Italy, France, Belgium and many more. Travel costs are discussed transparently upfront." } },
    { "@type": "Question", name: "We're really camera shy — is that a problem?", acceptedAnswer: { "@type": "Answer", text: "Not at all. Our work works precisely because we don't need poses. We just need you to be yourselves." } },
    { "@type": "Question", name: "When do we receive the photos and videos?", acceptedAnswer: { "@type": "Answer", text: "Photos in 4–6 weeks, films in 6–10 weeks. You'll always get sneak peeks first." } },
  ],
};

const AboutNav = () => {
  const { t } = useLang();
  return (
    <Link to="/" className="aboutus-back-sticky">
      ← {t("Zurück", "Back")}
    </Link>
  );
};

const AboutLangBar = () => {
  const { lang, setLang } = useLang();
  return (
    <AutoColorNav className="lang-bar" darkSelectors="#hero" style={{ position: "fixed", top: 26, right: 32, zIndex: 500 }}>
      <button className={`lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>DE</button>
      <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
    </AutoColorNav>
  );
};
const IntroText = () => {
  const { t } = useLang();
  return (
    <section className="intro-text-section">
      <div className="wrap">
        <RevealOnScroll>
          <span className="label">
            {t("Scrollt runter, um uns kennenzulernen — oder", "Scroll to meet us — or")}
          </span>
          <p className="about-p" style={{ maxWidth: 560 }}>
            {t(
              "springt direkt zu 'Let's get rolling', wenn ihr schon wisst.",
              "skip straight to 'Let's get rolling' if you already know."
            )}
          </p>
          <hr className="intro-rule" />
        </RevealOnScroll>
      </div>
    </section>
  );
};

const AboutPage = () => (
  <LanguageProvider>
    <SEO
      title="About Hugo + Nanny — Wedding Photography & Film Story"
      description="Who we are, our work, testimonials, pricing and FAQs. Authentic wedding documentation across Europe — packages from €3,900."
      path="/about"
      jsonLd={FAQ_LD}
    />
    <LogoHeader variant="auto" />
    <AboutLangBar />
    <AboutNav />
    <StickyCta />
    <Hero />
    <IntroText />
    <About />
    <Work />
    <Testimonials />
    <Pricing />
    <Contact />
    <FAQ />
    <Footer />
  </LanguageProvider>
);

export default AboutPage;
