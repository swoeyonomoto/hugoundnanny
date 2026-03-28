import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const films = [
  { name: "Dario & Marie", loc: "Köln, Deutschland", locEn: "Cologne, Germany", mediaId: "ejclzzj2uc" },
  { name: "Eddie & Mel", loc: "Hongkong", locEn: "Hong Kong", mediaId: "1tt9dtcb3n" },
  { name: "Toni & Freddi", loc: "Nizza, Frankreich", locEn: "Nice, France", mediaId: "shthso9t3v" },
];

const photos = [
  "/photos/02.png",
  "/photos/03.png",
  "/photos/08.png",
  "/photos/10.png",
  "/photos/11.png",
  "/photos/14.png",
];

const Work = () => {
  const { t } = useLang();
  const [playing, setPlaying] = useState<number | null>(null);

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
                <div className="film" key={i} onClick={() => setPlaying(i)}>
                  {playing === i ? (
                    <wistia-player
                      media-id={f.mediaId}
                      aspect="1.7777777777777777"
                      autoplay
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  ) : (
                    <>
                      <img
                        className="film-bg"
                        src={`https://fast.wistia.com/embed/medias/${f.mediaId}/swatch`}
                        alt={f.name}
                      />
                      <div className="film-shade" />
                      <div className="film-play">▶</div>
                    </>
                  )}
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
              {photos.map((src, i) => (
                <div className="photo" key={i}>
                  <img src={src} alt={`Wedding photo ${i + 1}`} loading="lazy" />
                </div>
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
