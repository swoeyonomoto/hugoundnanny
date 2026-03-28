import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?sa=X&sca_esv=41127e9fb389a8f5&biw=1728&bih=958&sxsrf=ANbL-n4jKwvve-P8qN6OnEizNTduzWn_4g:1774718669140&q=rezensionen%20f%C3%BCr%20hugo%20und%20nanny&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDE3A0JDMxMTYwNjS3MLEwvDDYyMrxjli1KrUvOKM_PzUvMU0g7vKVLIKE3PVyjNS1HIS8zLq1zESkgFAEVmlnpfAAAA&rldimm=14767671644303978481&tbm=lcl&hl=de-DE&ved=0CAwQ5foLahcKEwjA7JOgjsOTAxUAAAAAHQAAAAAQBQ#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2kxNFFUZDZSVUp4ZEZadU9FbFpRelZQYlRoQ0xXYxAB";

const testimonials = [
  {
    quoteDe: "Anfangs haben wir überlegt, ob wir auf ein Hochzeitsvideo verzichten können — zum Glück haben wir es nicht getan! Denn ein Video fängt Emotionen, Stimmen und Bewegungen ein, wie es Fotos allein niemals könnten. Es ermöglicht uns, den Tag immer wieder neu zu erleben.",
    quoteEn: "At first we wondered whether we even needed a wedding film — thank god we didn't skip it. A film captures emotions, voices and movement in a way photos alone never could. It lets us relive the day again and again.",
    name: "Juliana & Stephan",
    whereDe: "Hochzeit · 2024",
    whereEn: "Wedding · 2024",
    photo: "/photos/testi-01.png",
  },
  {
    quoteDe: "Sie haben alles gegeben und sich wirklich Zeit genommen, uns, unsere Beziehung und unsere besondere Woche kennenzulernen. Die Qualität der Fotos und Videos ist authentisch und einzigartig. Schaut unbedingt auf ihre Website, um die großartigen Produktionen zu sehen. Außerdem hatten wir einfach eine tolle Zeit mit ihnen bei der Hochzeit — sie haben die ganze Zeit über extra Liebe und Freude verbreitet!",
    quoteEn: "They gave everything and truly took the time to get to know us, our relationship and our special week. The quality of the photos and videos is authentic and unique. And on top of that — they brought so much love and joy to our wedding day!",
    name: "Eddie & Mel",
    whereDe: "Hongkong · 2024",
    whereEn: "Hong Kong · 2024",
    photo: "/photos/testi-02.png",
  },
  {
    quoteDe: 'Seit wir das erste Bild bekommen haben, wissen wir, dass das \u201EF\u00FCr immer\u201C einer Hochzeit nicht nur im Ja-Wort liegt, sondern vor allem in all den Momenten, Emotionen und der Atmosph\u00E4re, die sie f\u00FCr uns f\u00FCr immer festgehalten haben. Der First Look mit unseren Bildern war einer unserer Lieblingsmomente und die Emotionen dabei unbezahlbar.',
    quoteEn: "Since receiving the first photo, we know that the 'forever' of a wedding isn't just in the vows — it's in all the moments, emotions and atmosphere they captured for us. The first look at our photos was one of our favourite moments, and the emotions were priceless.",
    name: "Isabel & Peter",
    whereDe: "Hochzeit · 2024",
    whereEn: "Wedding · 2024",
    photo: "/photos/testi-03.png",
  },
];

const Testimonials = () => {
  const { t } = useLang();
  return (
    <>
      <hr className="rule" />
      <section id="testi">
        <div className="wrap">
          <RevealOnScroll>
            <div className="testi-top">
              <h2 className="testi-h">
                {t(
                  <>Was Paare<br /><em>{"über uns sagen."}</em></>,
                  <>What couples<br /><em>say about us.</em></>
                )}
              </h2>
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="testi-reviews-link">{"Google Reviews \u2192"}</a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="testis">
              {testimonials.map((item, i) => (
                <div className="testi-card" key={i}>
                  <div className="testi-stars">{"\u2605 \u2605 \u2605 \u2605 \u2605"}</div>
                  <img className="testi-face" src={item.photo} alt={item.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
                  <p className="testi-quote">{t(item.quoteDe, item.quoteEn)}</p>
                  <hr className="testi-hr" />
                  <div className="testi-name">{item.name}</div>
                  <div className="testi-where">{t(item.whereDe, item.whereEn)}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
