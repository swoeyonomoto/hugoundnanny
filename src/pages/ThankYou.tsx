import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LangBar from "@/components/LangBar";
import LogoHeader from "@/components/LogoHeader";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";
import RevealOnScroll from "@/components/RevealOnScroll";

const photos = [
  "/photos/02.jpg",
  "/photos/03.png",
  "/photos/07.jpg",
  "/photos/08.jpg",
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
                "Eure Nachricht ist bei uns angekommen. 🥂",
                "Your message just landed with us. 🥂"
              )}
            </h1>
            <p className="thankyou-body">
              {t(
                "Wir melden uns innerhalb von 24 Stunden — oft viel schneller. In der Zwischenzeit könnt ihr gerne unsere neuesten Arbeiten auf Instagram stalken.",
                "We'll be back within 24 hours — often much sooner. In the meantime, feel free to check out our latest work on Instagram."
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
            <p className="thankyou-signoff">
              {t("Hugo & Nanny", "Hugo & Nanny")}
            </p>
            <p className="thankyou-ps">
              {t(
                "P.S. Falls ihr innerhalb von zwei Tagen nichts von uns hört, schaut in euren Spam-Ordner — oder schreibt uns direkt auf Instagram.",
                "P.S. If you don't hear from us within two days, check your spam folder — or drop us a message directly on Instagram."
              )}
            </p>
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
