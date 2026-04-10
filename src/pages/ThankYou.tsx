import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LangBar from "@/components/LangBar";
import LogoHeader from "@/components/LogoHeader";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import RevealOnScroll from "@/components/RevealOnScroll";

const photos = [
  "/photos/thankyou-01.jpg",
  "/photos/thankyou-02.jpg",
  "/photos/thankyou-03.jpg",
  "/photos/thankyou-04.jpg",
];

const ThankYouContent = () => {
  const { t } = useLang();

  return (
    <>
      <LogoHeader variant="black" />
      <LangBar />

      <section className="thankyou-section">
        <div className="wrap">
          <RevealOnScroll>
            <h1 className="thankyou-h">
              {t(
                "Ihr seid dabei. Wir melden uns innerhalb von 24 Stunden. 🥂",
                "You're in. We'll be back within 24 hours. 🥂"
              )}
            </h1>
            <p className="thankyou-body">
              {t(
                "In der Zwischenzeit haben wir unseren Paarguide für euch — alles darüber, wie wir arbeiten, wie ihr euch auf euren Tag vorbereiten könnt und eine vollständige Übersicht über die Pakete. Keine Überraschungen, nur Klarheit.",
                "While you wait, we put together our couple's guide — everything about how we work, how to prepare for your day, and a full breakdown of what's included in each package. No surprises, just clarity."
              )}
            </p>
            <a
              href="/couples-guide.pdf"
              download
              className="thankyou-download"
            >
              {t("Paarguide herunterladen →", "Download the Couple's Guide →")}
            </a>
            <p className="thankyou-signoff">
              {t(
                "Wir freuen uns darauf, eure Geschichte zu hören. — Hugo, Nanny & das Team",
                "Looking forward to hearing your story. — Hugo, Nanny & the team"
              )}
            </p>
            <p className="thankyou-ps">
              {t(
                "P.S. Falls ihr innerhalb von 24 Stunden nichts von uns hört, schaut in euren Spam-Ordner — oder schreibt uns direkt auf Instagram.",
                "P.S. If you don't hear from us within 24 hours, check your spam folder — or drop us a message directly on Instagram."
              )}
            </p>
            <a
              href="https://www.instagram.com/hugoundnanny"
              target="_blank"
              rel="noopener noreferrer"
              className="thankyou-ig"
            >
              @hugoundnanny
            </a>
          </RevealOnScroll>
        </div>
      </section>

      <section className="thankyou-photos">
        <div className="thankyou-grid">
          {photos.map((src, i) => (
            <div className="thankyou-photo" key={i}>
              <img src={src} alt={`Wedding photo ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

const ThankYou = () => (
  <LanguageProvider>
    <ThankYouContent />
  </LanguageProvider>
);

export default ThankYou;
