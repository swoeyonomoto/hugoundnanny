import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";
import BookingForm from "@/components/BookingForm";

const Contact = () => {
  const { t } = useLang();

  return (
    <>
      <hr className="rule" />
      <section id="contact">
        <div className="wrap">
          <RevealOnScroll>
            <span className="label">{t("Kontakt", "Contact")}</span>
            <h2 className="contact-h">
              <em>Limited 2026 dates.<br />Find out if yours is free…</em>
            </h2>
            <p className="contact-p" style={{ maxWidth: 560 }}>
              {t(
                "Früh anzufragen heißt: Ihr wisst sofort, ob euer Datum frei ist — und bekommt unseren Couple's Guide mit allen Infos zu unserer Arbeit, zur Vorbereitung und zu den Kosten, damit ihr in Ruhe entscheiden könnt.",
                "Reaching out early means you'll know if your date is free and we'll send you our couple's guide - everything about the work, how to prepare and what it costs, so you have all you need to decide."
              )}
            </p>
            <p style={{ fontSize: 12, color: "#999", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
              {t("Pakete ab € 3.900 — alle Preise im Couple's Guide.", "Packages from €3,900 — full pricing in the couple's guide.")}
            </p>
            <a
              href="https://wa.me/4916097813272?text=Hi%20Hugo%20%26%20Nanny%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eure%20Hochzeitsfotografie%20und%20%E2%80%93film.%20K%C3%B6nnt%20ihr%20mir%20mehr%20Infos%20schicken%3F"
              rel="noopener noreferrer"
              style={{ display: "block", marginTop: 24, marginBottom: 28, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#888", textDecoration: "none" }}
            >
              {t("💬 Lieber per WhatsApp? Schreibt uns direkt →", "💬 Prefer WhatsApp? Message us directly →")}
            </a>
          </RevealOnScroll>

          <div className="contact-grid" style={{ marginTop: 56 }}>
            <RevealOnScroll className="rv2">
              <BookingForm />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
