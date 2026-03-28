import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?sa=X&sca_esv=41127e9fb389a8f5&biw=1728&bih=958&sxsrf=ANbL-n4jKwvve-P8qN6OnEizNTduzWn_4g:1774718669140&q=rezensionen%20f%C3%BCr%20hugo%20und%20nanny&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDE3A0JDMxMTYwNjS3MLEwvDDYyMrxjli1KrUvOKM_PzUvMU0g7vKVLIKE3PVyjNS1HIS8zLq1zESkgFAEVmlnpfAAAA&rldimm=14767671644303978481&tbm=lcl&hl=de-DE&ved=0CAwQ5foLahcKEwjA7JOgjsOTAxUAAAAAHQAAAAAQBQ#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2kxNFFUZDZSVUp4ZEZadU9FbFpRelZQYlRoQ0xXYxAB";

const testimonials = [
  {
    quoteDe: "Anfangs haben wir überlegt, ob wir auf ein Hochzeitsvideo verzichten können — zum Glück haben wir es nicht getan! Denn ein Video fängt Emotionen, Stimmen und Bewegungen ein, wie es Fotos allein niemals könnten. Es ermöglicht uns, den Tag immer wieder neu zu erleben.",
    quoteEn: "Initially, we considered whether we could do without a wedding video — thankfully, we didn't! Because a video captures emotions, voices, and movements in a way that photos alone never could. It allows us to relive the day again and again.",
    name: "Juliana & Stephan",
    whereDe: "Hochzeit · 2024",
    whereEn: "Wedding · 2024",
  },
  {
    quoteDe: "Sie haben alles gegeben und sich wirklich Zeit genommen, uns, unsere Beziehung und unsere besondere Woche kennenzulernen. Die Qualität der Fotos und Videos ist authentisch und einzigartig. Schaut unbedingt auf ihre Website, um die großartigen Produktionen zu sehen. Außerdem hatten wir einfach eine tolle Zeit mit ihnen bei der Hochzeit — sie haben die ganze Zeit über extra Liebe und Freude verbreitet!",
    quoteEn: "They went above & beyond; really took time to get to know us, our relationship & our special week. The quality of the photos & videos are authentic & unique. Definitely check out their website to see the amazing productions to get a feel what could be created for you. On top, we just had a great time having them at the wedding & they offered extra love and joy the whole way!",
    name: "Eddie & Mel",
    whereDe: "Hongkong · 2024",
    whereEn: "Hong Kong · 2024",
  },
  {
    quoteDe: 'Seit wir das erste Bild bekommen haben, wissen wir, dass das \u201EF\u00FCr immer\u201C einer Hochzeit nicht nur im Ja-Wort liegt, sondern vor allem in all den Momenten, Emotionen und der Atmosph\u00E4re, die sie f\u00FCr uns f\u00FCr immer festgehalten haben. Der First Look mit unseren Bildern war einer unserer Lieblingsmomente und die Emotionen dabei unbezahlbar.',
    quoteEn: "From the moment we received the first image, we knew that the 'forever' of a wedding isn't just in the vows — it's in all the moments, emotions, and atmosphere they captured for us forever. The first look at our photos was one of our favorite moments, and the emotions were priceless.",
    name: "Isabel & Peter",
    whereDe: "Hochzeit · 2024",
    whereEn: "Wedding · 2024",
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
                  <div className="testi-face">Foto</div>
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
