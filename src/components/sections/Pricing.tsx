import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const CONTACT_URL = "https://hugo-nanny.de/contact/";

const Pricing = () => {
  const { t } = useLang();

  const packages = [
    {
      tag: t("Fotografie", "Photography"),
      name: t(<>Ein Tag.<br /><em>Eine Person, voll und ganz für euch da.</em></>, <>One day.<br /><em>One person, fully present.</em></>),
      emotionalLine: true,
      emotionalText: t("Ein Kameramann — ruhig, aufmerksam und komplett auf euren Tag fokussiert.", "One cinematographer — quiet, attentive, and completely focused on your day."),
      from: t("Ab", "From"),
      price: "€ 3.500",
      items: [
        t("1 Tag Begleitung — Hochzeitstag (10h)", "1 day of coverage — Wedding day (10h)"),
        t("1 Kameramann (Foto oder Video)", "1 cinematographer (photo or video)"),
        t("Kinokamera & Drohne", "Cinema camera & drone"),
        t("Hochzeitsfilm: 4–6 Minuten oder 400 Fotos (digital)", "Wedding film: 4–6 minutes or 400 photos (digital)"),
      ],
      hi: false,
    },
    {
      tag: t("Beliebtestes Paket", "Most popular"),
      name: t(<>Zwei Kameras.<br /><em>Eine Geschichte.</em></>, <>Two cameras.<br /><em>One story.</em></>),
      from: t("Ab", "From"),
      price: "€ 5.800",
      emotionalLine: true,
      emotionalText: t("Wir beide am Set — einer filmt, einer fotografiert. Oder beide filmen. Wir finden das Setup, das zu eurem Tag passt.", "Both of us on set — one on film, one on photo. Or both on film. We'll find the setup that fits your day."),
      items: [
        t("2 Tage Begleitung — Welcome (3h) Hochzeitstag (12h)", "2 days of coverage — Welcome (3h) Wedding day (12h)"),
        t("2 Kameraleute — Film & Foto, oder beide auf Film", "2 cinematographers — film & photo, or both on film"),
        t("Kinokameras & Drohne + Highend-Fotokamera, Analogkamera (1× 36 Filme)", "Cinema cameras & drone + Highend Photocamera, Analogue Camera (1x 36 Films)"),
        t("Hochzeitsfilm: 4–6 Minuten", "Wedding film: 4–6 minutes"),
        t("Wedding Short (20–40 Sekunden)", "Wedding short (20–40 seconds)"),
        t("500 Fotos (digital)", "500 photos (digital)"),
        t("72 Fotos (analog)", "72 photos (analogue)"),
      ],
      hi: true,
    },
    {
      tag: "Destination Wedding",
      name: t(<>Überall<br /><em>auf der Welt.</em></>, <>Anywhere<br /><em>in the world.</em></>),
      from: t("Individuell", "Custom"),
      price: t("Auf Anfrage", "On request"),
      priceClass: "ask",
      items: [
        t("Komplett individuell planbar", "Fully tailored"),
        t("Reisekosten inklusive", "Travel costs included"),
        t("Foto und/oder Film möglich", "Photo and/or film"),
        t("Mehrtägige Begleitung", "Multi-day coverage"),
        t("Weltweit verfügbar", "Available worldwide"),
      ],
      hi: false,
    },
  ];

  return (
    <>
      <hr className="rule" />
      <section id="pricing">
        <div className="wrap">
          <RevealOnScroll>
            <div className="pricing-top">
              <div>
                <span className="label">{t("Investition", "Investment")}</span>
                <h2 className="pricing-h">
                  {t(
                    <>Damit ihr wisst,<br /><em>ob wir zusammenpassen.</em></>,
                    <>So you know<br /><em>if we're a good fit.</em></>
                  )}
                </h2>
              </div>
              <div>
                <p className="pricing-intro-p">
                  {t(
                    "Wir glauben an Transparenz. Deshalb nennen wir unsere Preise von Anfang an — keine Überraschungen, keine unangenehmen Gespräche im Nachhinein. Unsere Pakete sind ein Ausgangspunkt. Was ihr wirklich braucht, besprechen wir gemeinsam.",
                    "We believe in transparency. That's why we share our prices upfront — no surprises, no awkward conversations later. Our packages are a starting point. What you actually need, we'll figure out together."
                  )}
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="cards">
              {packages.map((pkg, i) => (
                <div className={`card ${pkg.hi ? "hi" : ""}`} key={i}>
                  <span className="card-tag">{pkg.tag}</span>
                  <h3 className="card-name">{pkg.name}</h3>
                  <hr className="card-hr" />
                  <span className="card-from">{pkg.from}</span>
                  <div className={`card-price ${pkg.priceClass || ""}`}>{pkg.price}</div>
                  {pkg.price !== t("Auf Anfrage", "On request") && (
                    <span className="card-deadline">{t("Frühbucherpreis — verfügbar für Hochzeiten bis 30. April 2025", "Early booking rate — available for weddings booked until 30 April 2025")}</span>
                  )}
                  {pkg.emotionalLine && (
                    <p className="card-emotional">{t("Zwei von uns. Zwei Kameras. Jeder Winkel des Tages — nichts geht verloren.", "Two of us. Two cameras. Every angle of the day — nothing gets missed.")}</p>
                  )}
                  <ul className="card-list">
                    {pkg.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="card-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      const prefill: Record<string, string> = { lookingFor: "Photo & Video" };
                      if (i === 0) prefill.budget = "€3.000 – €5.000";
                      if (i === 1) prefill.budget = "€5.000 – €10.000";
                      window.dispatchEvent(new CustomEvent("prefill-contact", { detail: prefill }));
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {t("Anfragen", "Enquire")}
                  </a>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <p className="pricing-note">
            {t(
              "*Ticket- und Übernachtungskosten sind nicht enthalten // Alle Preise verstehen sich zzgl. MwSt.",
              "*Ticket and accommodation costs are not included // All prices exclude VAT"
            )}
          </p>
          <p className="pricing-note">
            {t(
              "Alle Pakete beinhalten ein kostenloses Kennenlerngespräch. Keine versteckten Kosten.",
              "All packages include a free introductory call. No hidden costs."
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default Pricing;
