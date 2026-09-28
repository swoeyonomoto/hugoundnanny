export type Film = { id: string; kind: "highlight" | "film" | "reel"; title: string; url: string };

export const wistiaId = (value: string) => {
  const v = value.trim();
  const m = v.match(/(?:medias|iframe)\/([a-z0-9]+)/i) || v.match(/wvideo=([a-z0-9]+)/i);
  return m ? m[1] : v;
};

export const parseFilms = (value: unknown): Film[] =>
  Array.isArray(value)
    ? value.filter((f): f is Film => Boolean(f) && typeof f === "object" && "url" in f).map((f, i) => ({ id: f.id || `f${i}`, kind: f.kind || "film", title: f.title || "", url: String(f.url) }))
    : [];

const Player = ({ film, vertical }: { film: Film; vertical?: boolean }) => (
  <div className={`gf-player${vertical ? " is-vertical" : ""}`}>
    <iframe
      src={`https://fast.wistia.net/embed/iframe/${wistiaId(film.url)}?videoFoam=false&playerColor=141414`}
      title={film.title || "Film"}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  </div>
);

const Heading = ({ children }: { children: string }) => (
  <header className="gf-heading"><h2>{children}</h2><span aria-hidden /></header>
);

type Props = { films: Film[]; images: string[]; t: (de: string, en: string) => string };

export default function FilmView({ films, images, t }: Props) {
  const highlight = films.filter((f) => f.kind === "highlight");
  const others = films.filter((f) => f.kind === "film");
  const reels = films.filter((f) => f.kind === "reel");
  let imgIndex = 0;
  const nextImage = () => (images.length ? images[imgIndex++ % images.length] : null);
  const still = (key: string, side: "l" | "r") => {
    const src = imgIndex < images.length ? nextImage() : null;
    return src ? <figure key={key} className={`gf-still gf-still-${side}`}><img src={src} alt="" loading="lazy" /></figure> : null;
  };

  if (!films.length) return <p className="gf-empty">{t("Euer Film ist bald hier.", "Your film will be here soon.")}</p>;

  return (
    <div className="gal-film">
      {highlight.length > 0 && <section id="gf-film" className="gf-section">
        <Heading>{t("Der Film", "The Film")}</Heading>
        {highlight.map((f, i) => <div key={f.id}><div className="gf-wide"><Player film={f} />{f.title && <p className="gf-caption">{f.title}</p>}</div>{still(`h${i}`, i % 2 ? "l" : "r")}</div>)}
      </section>}
      {others.length > 0 && <section id="gf-films" className="gf-section">
        <Heading>{t("Filme", "Films")}</Heading>
        {others.map((f, i) => <div key={f.id} className={`gf-offset gf-offset-${i % 2 ? "r" : "l"}`}><Player film={f} />{f.title && <p className="gf-caption">{f.title}</p>}{i % 2 === 1 && still(`o${i}`, "l")}</div>)}
      </section>}
      {reels.length > 0 && <section id="gf-shorts" className="gf-section">
        <Heading>Shorts</Heading>
        <div className="gf-reels">{reels.map((f) => <div key={f.id} className="gf-reel"><Player film={f} vertical />{f.title && <p className="gf-caption">{f.title}</p>}</div>)}</div>
      </section>}
      {imgIndex < images.length && <section className="gf-section gf-closing">{images.slice(imgIndex).map((src, i) => <figure key={src} className={`gf-still gf-still-${i % 2 ? "l" : "r"}`}><img src={src} alt="" loading="lazy" /></figure>)}</section>}
    </div>
  );
}
