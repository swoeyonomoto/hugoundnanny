import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LangBar from "@/components/LangBar";
import LogoHeader from "@/components/LogoHeader";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import RevealOnScroll from "@/components/RevealOnScroll";

const PrivacyContent = () => {
  const { t } = useLang();

  return (
    <>
      <SEO
        title="Privacy Policy - Hugo + Nanny"
        description="Privacy policy for Hugo + Nanny wedding photography and film - how we collect, use and protect your personal data."
        path="/privacy"
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
              {t("Datenschutzerklärung", "Privacy Policy")}
            </h1>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Verantwortlicher", "Data Controller")}</h2>
              <p className="imprint-body">
                {t(
                  "Verantwortlich für die Datenverarbeitung auf dieser Website und für Anfragen über Facebook Lead Ads ist:",
                  "Responsible for data processing on this website and for inquiries submitted via Facebook Lead Ads:"
                )}
                <br />
                FEELSLIKE HOLIDAY LIMITED<br />
                Unit 2A, 17/F, Glenealy Tower<br />
                No. 1 Glenealy, Central, Hong Kong<br />
                <a href="mailto:hello@hugo-nanny.de">hello@hugo-nanny.de</a>
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Welche Daten wir erheben", "What Data We Collect")}</h2>
              <p className="imprint-body">
                {t(
                  "Wenn du ein Formular auf unserer Website oder in einer Facebook/Instagram Kampagne ausfüllst, erheben wir die Angaben, die du selbst einträgst: Name, E-Mail-Adresse, Telefonnummer (optional), Instagram-Handle (optional), Hochzeitsdatum, Location, gewünschte Leistung, Budget und die Geschichte, die du uns erzählst.",
                  "When you fill in a form on our website or in a Facebook/Instagram campaign, we collect the details you enter yourself: name, email address, phone number (optional), Instagram handle (optional), wedding date, venue, the service you are looking for, your budget, and the story you share with us."
                )}
                <br />
                {t(
                  "Zusätzlich erheben wir technische Daten, die dein Browser beim Besuch automatisch übermittelt (z. B. IP-Adresse, Browsertyp), um die Website zu betreiben und sicherzuhalten.",
                  "We also collect technical data your browser automatically transmits when visiting (e.g. IP address, browser type) in order to operate and secure the website."
                )}
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Zweck und Rechtsgrundlage", "Purpose and Legal Basis")}</h2>
              <p className="imprint-body">
                {t(
                  "Wir verwenden deine Daten ausschließlich, um deine Anfrage zu beantworten, deine Verfügbarkeit zu prüfen und dich über unsere Leistungen zu informieren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. a DSGVO (deine Einwilligung beim Absenden des Formulars). Eine Kontaktaufnahme hat keine rechtlichen Folgen für dich.",
                  "We use your data exclusively to respond to your inquiry, check our availability for your date, and inform you about our services. The legal basis is Art. 6 (1) (b) GDPR (pre-contractual measures) and Art. 6 (1) (a) GDPR (your consent when submitting the form). Submitting an inquiry has no legal consequences for you."
                )}
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Facebook Lead Ads / Meta", "Facebook Lead Ads / Meta")}</h2>
              <p className="imprint-body">
                {t(
                  "Wenn du deine Daten über ein Instant Form auf Facebook oder Instagram übermittelst, verarbeitet die Meta Platforms Ireland Ltd. die Daten im Auftrag und nach eigenen Datenschutzbestimmungen (meta.com/privacy). Wir erhalten deine Angaben von Meta und verarbeiten sie wie oben beschrieben. Für die Übermittlung von Meta an uns liegt die Verantwortung bei Meta.",
                  "If you submit your details via an Instant Form on Facebook or Instagram, Meta Platforms Ireland Ltd. processes the data on its own responsibility under its own privacy policy (meta.com/privacy). We receive your details from Meta and process them as described above. Meta is responsible for the transfer of your data from Meta to us."
                )}
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Speicherdauer", "How Long We Keep Your Data")}</h2>
              <p className="imprint-body">
                {t(
                  "Wir speichern deine Daten so lange, wie es für die Bearbeitung deiner Anfrage und die Kommunikation mit dir nötig ist - in der Regel bis zu 24 Monate nach deiner letzten Nachricht. Danach löschen wir sie, sofern keine gesetzlichen Aufbewahrungspflichten bestehen. Möchtest du sie früher gelöscht haben, genügt eine kurze Nachricht an hello@hugo-nanny.de.",
                  "We store your data for as long as needed to handle your inquiry and communicate with you - usually up to 24 months after your last message. After that we delete it, unless legal retention obligations apply. If you want it deleted sooner, just write to hello@hugo-nanny.de."
                )}
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Weitergabe an Dritte", "Sharing Your Data")}</h2>
              <p className="imprint-body">
                {t(
                  "Wir verkaufen oder vermieten deine Daten niemals. Sie werden nur an Dienstleister weitergegeben, die für den Betrieb der Website und der Formulare technisch erforderlich sind (Formularversand und Hosting). Ein Versand findet in ein Land außerhalb der EU nur mit angemessenem Schutzniveau (z. B. EU-Standardvertragsklauseln) statt.",
                  "We never sell or rent your data. It is only shared with providers technically required to operate the website and the forms (form delivery and hosting). Any transfer to a country outside the EU only takes place with an adequate level of protection (e.g. EU standard contractual clauses)."
                )}
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Deine Rechte", "Your Rights")}</h2>
              <p className="imprint-body">
                {t(
                  "Du hast jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Eine erteilte Einwilligung kannst du jederzeit widerrufen - formlos per E-Mail an hello@hugo-nanny.de. Außerdem hast du das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren.",
                  "At any time you have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection (Art. 21). You may withdraw any consent at any time - simply by email to hello@hugo-nanny.de. You also have the right to lodge a complaint with a data protection supervisory authority."
                )}
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Cookies", "Cookies")}</h2>
              <p className="imprint-body">
                {t(
                  "Diese Website verwendet keine Tracking-Cookies. Für Statistik- und Marketingzwecke (Facebook Pixel) werden Daten nur mit deiner Einwilligung verarbeitet; du kannst die Einwilligung jederzeit über den Cookie-Hinweis widerrufen.",
                  "This website does not use tracking cookies. For statistics and marketing purposes (Facebook Pixel), data is only processed with your consent; you can withdraw it at any time via the cookie notice."
                )}
              </p>
            </div>

            <div className="imprint-block">
              <h2 className="imprint-label">{t("Kontakt", "Contact")}</h2>
              <p className="imprint-body">
                {t("Fragen zum Datenschutz? Schreib uns:", "Questions about privacy? Write to us:")}
                <br />
                <a href="mailto:hello@hugo-nanny.de">hello@hugo-nanny.de</a>
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </>
  );
};

const Privacy = () => (
  <LanguageProvider>
    <PrivacyContent />
  </LanguageProvider>
);

export default Privacy;
