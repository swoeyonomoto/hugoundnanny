import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const WHATSAPP_URL = "https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny!%20%F0%9F%96%A4%0A%0AWe%20came%20across%20your%20work%20and%20love%20your%20style.%20Here%27s%20a%20little%20about%20us%3A%0A%0ANames%3A%20%5Byour%20names%5D%0AWedding%20date%20%26%20location%3A%20%5Bdate%20%26%20location%5D%0ALooking%20for%3A%20%5Bphoto%20%2F%20video%20%2F%20both%5D%0ABudget%3A%20%5Bapprox.%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!";

const faqs = [
  {
    qDe: "Können wir vorher mal reden?",
    qEn: "Can we have a chat before booking?",
    aDe: "Ja, absolut — und das wünschen wir uns sogar. Wir würden niemals etwas bestätigen, ohne dass wir uns vorher gut kennenlernen und austauschen konnten. Schreib uns einfach.",
    aEn: "Yes, absolutely — and we'd actually love that. We would never confirm anything without having had a good chance to connect and exchange first. Just write us.",
    hasWhatsApp: true,
  },
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
    aEn: "Yes, absolutely. We've shot in Italy, France, Belgium and many more. Travel costs are discussed transparently upfront — no surprises.",
  },
  {
    qDe: "Wir sind total kamerascheu — ist das ein Problem?",
    qEn: "We're really camera shy — is that a problem?",
    aDe: "Überhaupt nicht. Das sagen uns fast alle. Unsere Arbeit funktioniert gerade deshalb, weil wir keine Posen brauchen. Wir brauchen euch einfach nur so, wie ihr seid.",
    aEn: "Not at all. Almost everyone says this. Our work works precisely because we don't need poses. We just need you to be yourselves.",
  },
  {
    qDe: "Wann bekommen wir die Fotos und Videos?",
    qEn: "When do we receive the photos and videos?",
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
                  <>Was euch meistens<br /><em>bewegt.</em></>,
                  <>Questions couples<br /><em>always ask.</em></>
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
                    {"hasWhatsApp" in faq && faq.hasWhatsApp && (
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faq-wa-btn"
                        onClick={() => (window as any).fbq?.('track', 'Contact', { content_name: 'WhatsApp Click' })}
                      >
                        {t("Schreib uns auf WhatsApp →", "Write us on WhatsApp →")}
                      </a>
                    )}
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
