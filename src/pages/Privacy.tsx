import { Fragment, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LangBar from "@/components/LangBar";
import LogoHeader from "@/components/LogoHeader";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { openCookieSettings } from "@/lib/consent";

type Block = string | { list: string[] };
type Section = { h?: string; body: Block[] };

const linkify = (text: string): ReactNode[] =>
  text.split(/(https?:\/\/[^\s),;]+|[\w.+-]+@[\w-]+\.[\w.]+[a-z]|hugo-nanny\.de\/privacy)/g).map((part, i) => {
    if (/^https?:\/\//.test(part)) return <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
    if (/@/.test(part) && /^[\w.+-]+@/.test(part)) return <a key={i} href={`mailto:${part}`}>{part}</a>;
    if (part === "hugo-nanny.de/privacy") return <Link key={i} to="/privacy">{part}</Link>;
    return <Fragment key={i}>{part}</Fragment>;
  });

const EN: Section[] = [
  { body: [
    'Hugo + Nanny ("we", "us", "our") is a wedding photography and film brand operated by FEELSLIKE HOLIDAY LIMITED, Hong Kong Company No. 78830813, Unit 2A, 17/F, Glenealy Tower, No. 1 Glenealy, Central, Hong Kong. FEELSLIKE HOLIDAY LIMITED is the data user / controller responsible for the processing of your personal data described in this policy.',
    "Contact for all privacy matters: hello@hugo-nanny.de",
    'This policy explains how we collect, use, disclose and protect personal data in accordance with the Hong Kong Personal Data (Privacy) Ordinance (Cap. 486) ("PDPO") and, where it applies to visitors and clients in the European Union / EEA, the EU General Data Protection Regulation ("GDPR"). It also serves as our Personal Information Collection Statement.',
  ]},
  { h: "1. Personal data we collect", body: [
    "When you contact us - via our website form, WhatsApp, email, Instagram, Facebook or a Meta lead form on Facebook/Instagram - we collect the information you provide, such as: your names, email address, phone/WhatsApp number, Instagram handle, wedding date, wedding location or venue, the services you are interested in (photo, film), your budget range and your message.",
    "When you book us - additionally the details required to plan and deliver your wedding photography and film (e.g. timeline, contacts of your planner/venue, billing address and invoicing details).",
    "When you visit our website - technical data such as IP address, browser type, device, operating system, referring page, date and time of access, and - only if you consent - usage data collected by the analytics and advertising tools listed in section 4.",
    "Providing your details is voluntary. If you do not provide the information marked as required in our forms, we may not be able to answer your enquiry or check your date.",
  ]},
  { h: "2. Purposes of use", body: [
    "We use your personal data to:",
    { list: [
      "answer your enquiry, check availability and send you our couple's guide, pricing and offers;",
      "prepare, perform and manage our contract with you (planning, shooting, editing, delivery of photos and films, galleries);",
      "issue invoices and comply with accounting, tax and other legal obligations;",
      "operate, secure and improve our website;",
      "measure and improve our advertising on Facebook and Instagram (only with your consent);",
      "communicate with you about your booking.",
    ]},
    "We will not use your personal data for direct marketing unless you have given us your consent. You can withdraw that consent at any time free of charge by writing to hello@hugo-nanny.de.",
    "Legal bases under the GDPR (for EU/EEA visitors and clients): steps prior to entering into a contract and performance of a contract (Art. 6(1)(b)); legal obligations (Art. 6(1)(c)); our legitimate interests in answering enquiries and running a secure website (Art. 6(1)(f)); your consent for analytics and advertising cookies (Art. 6(1)(a) GDPR in conjunction with § 25(1) TDDDG / Art. 5(3) ePrivacy Directive).",
  ]},
  { h: "3. Who we share your data with", body: [
    "We only disclose personal data where necessary for the purposes above, to:",
    { list: [
      "members of our team and second photographers/filmmakers working on your wedding;",
      "service providers acting on our behalf, such as website hosting, email, cloud storage, online gallery, file delivery, form processing, accounting and payment providers;",
      "Meta Platforms (Facebook, Instagram, WhatsApp) and Google/Microsoft as described in sections 4-6;",
      "professional advisers and authorities where required by law.",
    ]},
    "We do not sell your personal data.",
  ]},
  { h: "4. Cookies, analytics and advertising tools", body: [
    'When you first visit our website, a cookie banner asks for your choice (Accept / Decline / Settings). Technically necessary storage (e.g. saving your cookie choice) is always used. The following tools are loaded only after you have given your consent - if you decline, they are not loaded at all:',
    { list: [
      "Meta Pixel (Meta Platforms Ireland Ltd., Dublin / Meta Platforms, Inc., USA) - category \"Marketing\": measures the effect of our ads on Facebook and Instagram and helps show our ads to people who are likely to be interested. Meta may link this information to your Meta account. We and Meta are joint controllers for the collection and transmission of this data. Privacy policy: https://www.facebook.com/privacy/policy",
      "Google Analytics 4 (Google Ireland Ltd., Dublin / Google LLC, USA) - category \"Analytics\": helps us understand how visitors use our website (pseudonymised data, IP anonymisation enabled). Privacy policy: https://policies.google.com/privacy",
      "Microsoft Clarity (Microsoft Corporation, USA) - category \"Analytics\": helps us understand how our pages are used (e.g. heatmaps, anonymised session recordings). Privacy policy: https://privacy.microsoft.com/privacystatement",
    ]},
    'You can withdraw or change your consent at any time with effect for the future via the "Cookies" link in the footer of every page, or by blocking cookies in your browser settings.',
  ]},
  { h: "5. Meta lead forms (Facebook / Instagram)", body: [
    "If you send us an enquiry through a form inside Facebook or Instagram, Meta passes the information you entered to us. We use it only to answer your enquiry as described in this policy. Meta's own processing is governed by Meta's Privacy Policy: https://www.facebook.com/privacy/policy",
  ]},
  { h: "6. WhatsApp and Instagram messages", body: [
    "If you contact us via WhatsApp or Instagram, your messages and phone number/account are also processed by Meta (WhatsApp LLC / Meta Platforms). Please see https://www.whatsapp.com/legal/privacy-policy and https://privacycenter.instagram.com/policy",
  ]},
  { h: "7. Transfers outside Hong Kong", body: [
    "Our team works internationally, and some of our service providers are located outside Hong Kong, including in the European Union and the United States. Your personal data may therefore be transferred to and stored in these jurisdictions. We take reasonable steps to ensure your data receives an adequate level of protection. For EU/EEA data, transfers to the USA are based on the EU-US Data Privacy Framework or the EU Standard Contractual Clauses.",
  ]},
  { h: "8. How long we keep your data", body: [
    { list: [
      "Enquiries that do not lead to a booking: up to 12 months after our last contact.",
      "Client and booking data: for the duration of our contract and afterwards as required by accounting and tax law (generally up to 7 years).",
      "Photos and films of your wedding: as agreed in your contract.",
      "Analytics and advertising data: according to the retention settings of the respective tool (maximum 26 months).",
      "Your cookie choice: stored in your browser until you change it or clear your browser data.",
    ]},
    "We delete or anonymise personal data when it is no longer needed.",
  ]},
  { h: "9. Security", body: [
    "We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, misuse or alteration, including encrypted (HTTPS) data transmission and access restrictions. No method of transmission over the internet is completely secure.",
  ]},
  { h: "10. Your rights", body: [
    "Under the PDPO you have the right to request access to and correction of your personal data. Under the GDPR (if it applies to you) you also have the right to erasure, restriction of processing, data portability, to object to processing based on legitimate interests, and to withdraw your consent at any time with effect for the future.",
    "To exercise your rights, write to hello@hugo-nanny.de. We may charge a reasonable fee for processing a data access request where permitted by the PDPO.",
    "You may also lodge a complaint with a data protection authority - in Hong Kong the Office of the Privacy Commissioner for Personal Data (PCPD, https://www.pcpd.org.hk), or, if you are located in the EU/EEA, the supervisory authority of your country of residence.",
  ]},
  { h: "11. Children", body: ["Our services are aimed at adults. We do not knowingly collect personal data from persons under 18."] },
  { h: "12. Changes to this policy", body: ["We may update this policy when our services or legal requirements change. The current version is always available at hugo-nanny.de/privacy."] },
];

const DE: Section[] = [
  { body: [
    'Hugo + Nanny („wir", „uns", „unser") ist eine Marke für Hochzeitsfotografie und -film, betrieben von der FEELSLIKE HOLIDAY LIMITED, Hongkong, Company No. 78830813, Unit 2A, 17/F, Glenealy Tower, No. 1 Glenealy, Central, Hong Kong. Die FEELSLIKE HOLIDAY LIMITED ist als Verantwortliche (data user / controller) für die in dieser Erklärung beschriebene Verarbeitung deiner personenbezogenen Daten zuständig.',
    "Kontakt für alle Datenschutzfragen: hello@hugo-nanny.de",
    'Diese Erklärung beschreibt, wie wir personenbezogene Daten gemäß der Hong Kong Personal Data (Privacy) Ordinance (Cap. 486) („PDPO") und - soweit anwendbar für Besucher und Kunden in der EU / im EWR - der Datenschutz-Grundverordnung („DSGVO") erheben, nutzen, weitergeben und schützen. Sie dient zugleich als unser Personal Information Collection Statement.',
  ]},
  { h: "1. Welche Daten wir erheben", body: [
    "Wenn du uns kontaktierst - über unser Website-Formular, WhatsApp, E-Mail, Instagram, Facebook oder ein Meta-Lead-Formular auf Facebook/Instagram - erheben wir die Angaben, die du machst, z. B.: eure Namen, E-Mail-Adresse, Telefon-/WhatsApp-Nummer, Instagram-Handle, Hochzeitsdatum, Ort oder Location, gewünschte Leistungen (Foto, Film), Budgetrahmen und deine Nachricht.",
    "Wenn du uns buchst - zusätzlich die Angaben, die wir zur Planung und Umsetzung eurer Hochzeitsfotografie und -filme brauchen (z. B. Ablaufplan, Kontakte von Planer/Location, Rechnungsadresse und Rechnungsdaten).",
    "Wenn du unsere Website besuchst - technische Daten wie IP-Adresse, Browsertyp, Gerät, Betriebssystem, verweisende Seite, Datum und Uhrzeit des Zugriffs sowie - nur mit deiner Einwilligung - Nutzungsdaten der in Abschnitt 4 genannten Analyse- und Werbetools.",
    "Die Angabe deiner Daten ist freiwillig. Ohne die in unseren Formularen als erforderlich markierten Angaben können wir deine Anfrage ggf. nicht beantworten oder dein Datum nicht prüfen.",
  ]},
  { h: "2. Zwecke der Verarbeitung", body: [
    "Wir verwenden deine personenbezogenen Daten, um:",
    { list: [
      "deine Anfrage zu beantworten, die Verfügbarkeit zu prüfen und dir unseren Couple's Guide, Preise und Angebote zu senden;",
      "unseren Vertrag mit dir vorzubereiten, durchzuführen und zu verwalten (Planung, Shooting, Bearbeitung, Lieferung von Fotos und Filmen, Galerien);",
      "Rechnungen zu stellen und buchhalterische, steuerliche und sonstige gesetzliche Pflichten zu erfüllen;",
      "unsere Website zu betreiben, abzusichern und zu verbessern;",
      "unsere Werbung auf Facebook und Instagram zu messen und zu verbessern (nur mit deiner Einwilligung);",
      "mit dir über deine Buchung zu kommunizieren.",
    ]},
    "Wir nutzen deine Daten nicht für Direktmarketing, außer du hast eingewilligt. Diese Einwilligung kannst du jederzeit kostenlos per E-Mail an hello@hugo-nanny.de widerrufen.",
    "Rechtsgrundlagen nach der DSGVO (für Besucher und Kunden aus der EU/dem EWR): vorvertragliche Maßnahmen und Vertragserfüllung (Art. 6 Abs. 1 lit. b); rechtliche Verpflichtungen (Art. 6 Abs. 1 lit. c); unser berechtigtes Interesse an der Beantwortung von Anfragen und dem sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f); deine Einwilligung für Analyse- und Werbe-Cookies (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG).",
  ]},
  { h: "3. An wen wir Daten weitergeben", body: [
    "Wir geben personenbezogene Daten nur weiter, soweit dies für die oben genannten Zwecke erforderlich ist, und zwar an:",
    { list: [
      "Mitglieder unseres Teams sowie Second Shooter / Filmemacher, die auf eurer Hochzeit arbeiten;",
      "Dienstleister, die in unserem Auftrag tätig sind, z. B. für Website-Hosting, E-Mail, Cloud-Speicher, Online-Galerie, Dateiversand, Formularverarbeitung, Buchhaltung und Zahlungen;",
      "Meta Platforms (Facebook, Instagram, WhatsApp) sowie Google/Microsoft wie in Abschnitt 4-6 beschrieben;",
      "Berater und Behörden, soweit gesetzlich vorgeschrieben.",
    ]},
    "Wir verkaufen deine personenbezogenen Daten nicht.",
  ]},
  { h: "4. Cookies, Analyse- und Werbetools", body: [
    "Beim ersten Besuch unserer Website fragt dich ein Cookie-Banner nach deiner Auswahl (Akzeptieren / Ablehnen / Einstellungen). Technisch notwendige Speicherung (z. B. das Speichern deiner Cookie-Auswahl) erfolgt immer. Die folgenden Tools werden erst nach deiner Einwilligung geladen - lehnst du ab, werden sie gar nicht geladen:",
    { list: [
      "Meta Pixel (Meta Platforms Ireland Ltd., Dublin / Meta Platforms, Inc., USA) - Kategorie „Marketing\": misst die Wirkung unserer Anzeigen auf Facebook und Instagram und hilft, sie Personen zu zeigen, die wahrscheinlich interessiert sind. Meta kann diese Informationen mit deinem Meta-Konto verknüpfen. Für die Erhebung und Übermittlung dieser Daten sind wir und Meta gemeinsam verantwortlich. Datenschutzrichtlinie: https://www.facebook.com/privacy/policy",
      "Google Analytics 4 (Google Ireland Ltd., Dublin / Google LLC, USA) - Kategorie „Analyse\": hilft uns zu verstehen, wie Besucher unsere Website nutzen (pseudonymisierte Daten, IP-Anonymisierung aktiv). Datenschutzerklärung: https://policies.google.com/privacy",
      "Microsoft Clarity (Microsoft Corporation, USA) - Kategorie „Analyse\": hilft uns zu verstehen, wie unsere Seiten genutzt werden (z. B. Heatmaps, anonymisierte Sitzungsaufzeichnungen). Datenschutzerklärung: https://privacy.microsoft.com/privacystatement",
    ]},
    "Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft über den Link „Cookies\" im Footer jeder Seite widerrufen oder ändern, oder Cookies in deinen Browser-Einstellungen blockieren.",
  ]},
  { h: "5. Meta-Lead-Formulare (Facebook / Instagram)", body: [
    "Wenn du uns über ein Formular innerhalb von Facebook oder Instagram eine Anfrage sendest, übermittelt Meta uns deine Angaben. Wir nutzen sie ausschließlich zur Beantwortung deiner Anfrage wie in dieser Erklärung beschrieben. Für Metas eigene Verarbeitung gilt Metas Datenschutzrichtlinie: https://www.facebook.com/privacy/policy",
  ]},
  { h: "6. WhatsApp- und Instagram-Nachrichten", body: [
    "Wenn du uns über WhatsApp oder Instagram kontaktierst, werden deine Nachrichten und deine Telefonnummer/dein Konto auch von Meta (WhatsApp LLC / Meta Platforms) verarbeitet. Siehe https://www.whatsapp.com/legal/privacy-policy und https://privacycenter.instagram.com/policy",
  ]},
  { h: "7. Übermittlung außerhalb Hongkongs", body: [
    "Unser Team arbeitet international, und einige unserer Dienstleister sitzen außerhalb Hongkongs, u. a. in der Europäischen Union und den USA. Deine Daten können daher in diese Länder übermittelt und dort gespeichert werden. Wir treffen angemessene Maßnahmen für ein angemessenes Schutzniveau. Für Daten aus der EU/dem EWR erfolgen Übermittlungen in die USA auf Grundlage des EU-US Data Privacy Framework oder der EU-Standardvertragsklauseln.",
  ]},
  { h: "8. Wie lange wir Daten speichern", body: [
    { list: [
      "Anfragen ohne Buchung: bis zu 12 Monate nach unserem letzten Kontakt.",
      "Kunden- und Buchungsdaten: für die Dauer des Vertrags und danach gemäß handels- und steuerrechtlichen Pflichten (in der Regel bis zu 7 Jahre).",
      "Fotos und Filme eurer Hochzeit: wie im Vertrag vereinbart.",
      "Analyse- und Werbedaten: gemäß den Speichereinstellungen des jeweiligen Tools (maximal 26 Monate).",
      "Deine Cookie-Auswahl: in deinem Browser, bis du sie änderst oder deine Browserdaten löschst.",
    ]},
    "Wir löschen oder anonymisieren personenbezogene Daten, sobald sie nicht mehr benötigt werden.",
  ]},
  { h: "9. Sicherheit", body: [
    "Wir treffen angemessene technische und organisatorische Maßnahmen, um deine Daten vor unbefugtem Zugriff, Verlust, Missbrauch oder Veränderung zu schützen, u. a. verschlüsselte Übertragung (HTTPS) und Zugriffsbeschränkungen. Keine Übertragung über das Internet ist vollständig sicher.",
  ]},
  { h: "10. Deine Rechte", body: [
    "Nach der PDPO hast du das Recht auf Auskunft über und Berichtigung deiner personenbezogenen Daten. Nach der DSGVO (soweit anwendbar) hast du zudem das Recht auf Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen sowie auf jederzeitigen Widerruf deiner Einwilligung mit Wirkung für die Zukunft.",
    "Um deine Rechte auszuüben, schreib an hello@hugo-nanny.de. Für die Bearbeitung eines Auskunftsersuchens können wir, soweit nach der PDPO zulässig, eine angemessene Gebühr verlangen.",
    "Du kannst dich außerdem bei einer Datenschutzaufsichtsbehörde beschweren - in Hongkong beim Office of the Privacy Commissioner for Personal Data (PCPD, https://www.pcpd.org.hk) oder, wenn du in der EU/im EWR lebst, bei der Aufsichtsbehörde deines Wohnsitzlandes.",
  ]},
  { h: "11. Kinder", body: ["Unsere Leistungen richten sich an Erwachsene. Wir erheben wissentlich keine Daten von Personen unter 18 Jahren."] },
  { h: "12. Änderungen dieser Erklärung", body: ["Wir können diese Erklärung anpassen, wenn sich unsere Leistungen oder rechtliche Anforderungen ändern. Die aktuelle Fassung ist immer unter hugo-nanny.de/privacy abrufbar.", "Im Zweifel gilt die englische Fassung."] },
];

const PrivacyContent = () => {
  const { t, lang } = useLang();
  const sections = lang === "de" ? DE : EN;

  return (
    <>
      <SEO
        title="Privacy Policy – Hugo + Nanny"
        description="Privacy policy of Hugo + Nanny wedding photography and film - how we collect, use and protect your personal data."
        path="/privacy"
      />
      <Helmet><meta name="robots" content="index, follow" /></Helmet>
      <LogoHeader variant="black" />
      <LangBar />

      <section className="imprint-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <Link to="/" className="imprint-back">← {t("Zurück", "Back")}</Link>
          <h1 className="imprint-h">{t("Datenschutzerklärung", "Privacy Policy")}</h1>
          <p className="imprint-body">{t("Stand: 2. Oktober 2026", "Last updated: 2 October 2026")}</p>

          {sections.map((s, i) => (
            <div className="imprint-block" key={i}>
              {s.h && <h2 className="imprint-label">{s.h}</h2>}
              {s.body.map((b, j) =>
                typeof b === "string" ? (
                  <p className="imprint-body" key={j} style={{ lineHeight: 1.8 }}>{linkify(b)}</p>
                ) : (
                  <ul className="imprint-body" key={j} style={{ listStyle: "disc", paddingLeft: "1.2em", lineHeight: 1.8 }}>
                    {b.list.map((li, k) => <li key={k}>{linkify(li)}</li>)}
                  </ul>
                )
              )}
            </div>
          ))}

          <p className="imprint-body">
            <button type="button" className="f-cookie-link" style={{ textDecoration: "underline" }} onClick={openCookieSettings}>
              {t("Cookie-Einstellungen öffnen", "Open cookie settings")}
            </button>
          </p>
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
