import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const films = [
  { name: "Dario & Marie", loc: "Köln, Deutschland", locEn: "Cologne, Germany" },
  { name: "Eddie & Mel", loc: "Hongkong", locEn: "Hong Kong" },
  { name: "Toni & Freddi", loc: "Nizza, Frankreich", locEn: "Nice, France" },
];

const Work = () => {
  const { t } = useLang();
  return (
    <>
      <hr className="rule" />
      <section id="work">
        <div className="wrap">
          <RevealOnScroll>
            <div className="work-top">
              <div>
                <span className="label">{t("Unsere Arbeit", "Our work")}</span>
                <h2 className="work-h">
                  {t(
                    <>Echte Momente.<br /><em>Echte Geschichten.</em></>,
                    <>Real moments.<br /><em>Real stories.</em></>
                  )}
                </h2>
              </div>
              <p className="work-intro">
                {t(
                  "Jede Hochzeit ist anders. Genau das lieben wir. Hier sind ein paar der Geschichten, die wir festhalten durften.",
                  "Every wedding is different. That's exactly what we love. Here are a few of the stories we got to tell."
                )}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="films">
              {films.map((f, i) => (
                <div className="film" key={i}>
                  <div className="film-bg">Thumbnail</div>
                  <div className="film-shade" />
                  <div className="film-play">▶</div>
                  <div className="film-info">
                    <div className="film-name">{f.name}</div>
                    <div className="film-loc">{t(f.loc, f.locEn)}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="photos">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div className="photo" key={n}>Foto {n}</div>
              ))}
            </div>
          </RevealOnScroll>

          <a href="https://www.hugo-nanny.de" target="_blank" rel="noopener noreferrer" className="work-link">
            {t("Alle Hochzeiten ansehen", "See all weddings")} →
          </a>
        </div>
      </section>
    </>
  );
};

export default Work;
