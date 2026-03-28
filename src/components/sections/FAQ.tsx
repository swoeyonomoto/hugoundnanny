import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const faqs = [
  {
    qDe: "Wie weit im Voraus sollten wir buchen?",
    qEn: "How far in advance should we book?",
    aDe: "Die meisten Paare buchen uns 12–18 Monate im Voraus. Für Sommersaison und Destination Weddings empfehlen wir so früh wie möglich — wir nehmen nur eine begrenzte Anzahl Hochzeiten pro Jahr an.",
    aEn: "Most couples book us 12–18 months in advance. For summer season and destination weddings, the earlier the better — we only take a limited number of weddings per year.",
  },
  {
    qDe: "Reist ihr auch ins Ausland?",
    qEn: "Do you travel internationally?",
    aDe: "Ja, sehr gerne. Wir waren schon in Italien, Frankreich, Belgien und vielen anderen Ländern. Reisekosten besprechen wir transparent — keine Überraschungen.",
    aEn: "Yes, absolutely. We've shot in Italy, France, Belgium and many more. Travel costs are discussed transparently — no surprises.",
  },
  {
    qDe: "Wir sind total kamerascheu — ist das ein Problem?",
    qEn: "We're really camera shy — is that a problem?",
    aDe: "Überhaupt nicht. Das sagen uns fast alle. Unsere Arbeit funktioniert gerade deshalb, weil wir keine Posen brauchen. Wir brauchen euch einfach nur so, wie ihr seid.",
    aEn: "Not at all. Almost everyone says this. Our work works precisely because we don't need poses. We just need you to be yourselves.",
  },
  {
    qDe: "Wann bekommen wir die Fotos und Videos?",
    qEn: "When do we receive photos and videos?",
    aDe: "Fotos in 4–6 Wochen, Filme in 6–10 Wochen. Vorab gibt es immer Sneak Peeks — damit ihr nicht ewig warten müsst.",
    aEn: "Photos in 4–6 weeks, films in 6–10 weeks. You'll always get sneak peeks first — so the wait doesn't feel so long.",
  },
];

const FAQ = () => {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <hr className="rule" />
      <section id="faq">
        <div className="wrap">
          <RevealOnScroll>
            <div className="faq-inner">
              <h2 className="faq-h">
                {t(
                  <>Häufig gestellte<br /><em>Fragen.</em></>,
                  <>Frequently asked<br /><em>questions.</em></>
                )}
              </h2>
              {faqs.map((faq, i) => (
                <div className={`faq-item ${openIndex === i ? "open" : ""}`} key={i}>
                  <div className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                    <span className="faq-qt">{t(faq.qDe, faq.qEn)}</span>
                    <span className="faq-ic" />
                  </div>
                  <div className="faq-body">
                    <p>{t(faq.aDe, faq.aEn)}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
};

export default FAQ;
