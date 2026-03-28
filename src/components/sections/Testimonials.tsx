import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const testimonials = [
  {
    quoteDe: "„Wir haben bis heute nicht aufgehört, uns die Fotos anzusehen. Sie haben Momente festgehalten, von denen wir nicht mal wussten, dass sie passiert sind."",
    quoteEn: ""We haven't stopped looking at the photos. They captured moments we didn't even know were happening."",
    name: "Lisa & Jonas",
    whereDe: "Toskana · September 2024",
    whereEn: "Tuscany · September 2024",
  },
  {
    quoteDe: "„Man merkt das Team kaum. Und trotzdem ist jeder wichtige Moment drauf. Leise, unauffällig — das Ergebnis ist atemberaubend."",
    quoteEn: ""You barely notice the team. And yet every important moment is there. Quiet, unobtrusive — the result is breathtaking."",
    name: "Marie & Dario",
    whereDe: "Destination Wedding · August 2024",
    whereEn: "Destination Wedding · August 2024",
  },
  {
    quoteDe: "„Ich bin total kamerascheu und habe das vorher gesagt. Die haben das sofort verstanden. Das Video hat meine Mutter zum Weinen gebracht."",
    quoteEn: ""I'm totally camera shy and said so upfront. They got it immediately. The video made my mum cry."",
    name: "Steph & Chris",
    whereDe: "Hamburg · Juni 2024",
    whereEn: "Hamburg · June 2024",
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
                  <>Was Paare<br /><em>über uns sagen.</em></>,
                  <>What couples<br /><em>say about us.</em></>
                )}
              </h2>
              <a href="#" className="testi-reviews-link">Google Reviews →</a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="testis">
              {testimonials.map((item, i) => (
                <div className="testi-card" key={i}>
                  <div className="testi-stars">★ ★ ★ ★ ★</div>
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
