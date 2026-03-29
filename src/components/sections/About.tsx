import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const About = () => {
  const { t } = useLang();
  return (
    <>
      <hr className="rule" />
      <section id="about">
        <div className="wrap about-grid">
          <RevealOnScroll className="rv2">
            <div className="about-img">
              <img src="/photos/about.jpg" alt="Hugo & Nanny" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <span className="label">{t("Wer wir sind", "Who we are")}</span>
            <h2 className="about-h">
              {t(
                <>Wir erzählen eure Geschichten.<br /><em>Authentisch und echt.</em></>,
                <>We tell your stories.<br /><em>Authentic and raw.</em></>
              )}
            </h2>
            {t(
              <>
                <p className="about-p">Wir sind kein Studio. Wir sind zwei Menschen, die sich unsterblich in Hochzeiten verliebt haben — nicht wegen des Glamours, sondern wegen der Ehrlichkeit. Weil an keinem anderen Tag so viel auf einmal passiert.</p>
                <p className="about-p">Unsere Aufgabe ist einfach: Wir sind dabei. Leise, aufmerksam — damit kein Moment verloren geht. Keine gestellten Fotos, keine starren Posen. Nur das, was wirklich passiert.</p>
                <p className="about-p">Was ihr von uns bekommt, ist kein Album. Es ist ein Portal zurück — zu genau dem Gefühl, das ihr an diesem Tag hattet.</p>
              </>,
              <>
                <p className="about-p">We're not a studio. We're two people who fell deeply in love with weddings — not for the glamour, but for the honesty. Because no other day holds this much at once.</p>
                <p className="about-p">Our job is simple: we're there. Quiet, attentive — so no moment gets lost. No posed shots, no stiff directions. Just what really happens.</p>
                <p className="about-p">What you get from us isn't an album. It's a portal back — to exactly how it felt that day.</p>
              </>
            )}
            <p className="about-sig">Hugo & Nanny</p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
};

export default About;
