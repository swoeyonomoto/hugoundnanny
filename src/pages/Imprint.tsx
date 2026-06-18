import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LangBar from "@/components/LangBar";
import LogoHeader from "@/components/LogoHeader";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import RevealOnScroll from "@/components/RevealOnScroll";

const ImprintContent = () => {
  const { t } = useLang();

  return (
    <>
      <SEO
        title="Imprint — Hugo + Nanny"
        description="Legal notice and imprint for Hugo + Nanny wedding photography and film."
        path="/imprint"
      />
      <LogoHeader variant="black" />
      <LangBar />

      <section className="imprint-section">
        <div className="wrap">
          <RevealOnScroll>
            <Link to="/" className="imprint-back">
              ← {t("Zurück", "Back")}
            </Link>

            <h1 className="imprint-h">
              {t("Impressum", "Imprint")}
            </h1>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Betreiber", "Operator")}</h2>
              <p className="imprint-body">
                {t(
                  "Hugo & Nanny ist eine Marke der FEELSLIKE HOLIDAY LIMITED, Hong Kong Company No. 78830813.",
                  "Hugo & Nanny is a wedding photography and film brand operated by FEELSLIKE HOLIDAY LIMITED, Hong Kong Company No. 78830813."
                )}
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Adresse", "Address")}</h2>
              <p className="imprint-body">
                FEELSLIKE HOLIDAY LIMITED<br />
                Unit 2A, 17/F, Glenealy Tower<br />
                No. 1 Glenealy<br />
                Central, Hong Kong
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Kontakt", "Contact")}</h2>
              <p className="imprint-body">
                <a href="mailto:hello@hugo-nanny.de">hello@hugo-nanny.de</a><br />
                <a href="https://www.instagram.com/hugoundnanny" target="_blank" rel="noopener noreferrer">@hugoundnanny</a>
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Haftungsausschluss", "Liability")}</h2>
              <p className="imprint-body">
                {t(
                  "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
                  "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content."
                )}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </>
  );
};

const Imprint = () => (
  <LanguageProvider>
    <ImprintContent />
  </LanguageProvider>
);

export default Imprint;
