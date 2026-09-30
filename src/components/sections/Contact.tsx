import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";
import BookingForm from "@/components/BookingForm";
import { GENERAL_WHATSAPP_MESSAGE, getWhatsAppUrl } from "@/lib/whatsapp";

const WHATSAPP_URL = getWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);

const Contact = () => {
  const { t } = useLang();

  return (
    <>
      <hr className="rule" />
      <section id="contact">
        <div className="wrap">
          <RevealOnScroll className="about-contact-top">
            <span className="label">{t("Kontakt", "Contact")}</span>
            <div className="about-contact-main">
              <h2 className="contact-h">
                <em>Open Dates.<br />2027.</em>
              </h2>
              <div className="about-contact-row">
                <p className="contact-p">
                  {t(
                    "Früh anzufragen heißt: Ihr wisst sofort, ob euer Datum frei ist - und bekommt unseren Couple's Guide mit allen Infos zu unserer Arbeit, zur Vorbereitung und zu den Kosten, damit ihr in Ruhe entscheiden könnt.",
                    "Reaching out early means you'll know if your date is free and we'll send you our couple's guide - everything about the work, how to prepare and what it costs, so you have all you need to decide."
                  )}
                </p>
                <div className="about-contact-aside">
                  <p className="contact-note">
                    {t("Pakete ab € 3.900 - alle Preise im Couple's Guide.", "Packages from €3,900 - full pricing in the couple's guide.")}
                  </p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact-wa-link">
                    {t("Lieber per WhatsApp? Schreibt uns direkt →", "Prefer WhatsApp? Message us directly →")}
                  </a>
                </div>
              </div>

              <div className="contact-grid" style={{ marginTop: 80 }}>
                <RevealOnScroll className="rv2">
                  <BookingForm />
                </RevealOnScroll>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
};

export default Contact;
