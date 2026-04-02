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
import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";

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
          <h2 className="about-h intro-headline">
            <em>
              {t(
                <>springt direkt zu 'Let's get rolling', wenn ihr schon wisst.</>,
                <>skip straight to 'Let's get rolling' if you already know.</>
              )}
            </em>
          </h2>
          <hr className="intro-rule" />
        </RevealOnScroll>
      </div>
    </section>
  );
};

const AboutPage = () => (
  <LanguageProvider>
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
