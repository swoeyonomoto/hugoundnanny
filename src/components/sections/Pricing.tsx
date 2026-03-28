import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const Pricing = () => {
  const { t } = useLang();

  const packages = [
    {
      tag: t("Fotografie", "Photography"),
      name: t(<>Ein Tag.<br /><em>Eure Geschichte.</em></>, <>One day.<br /><em>Your story.</em></>),
      from: t("Ab", "From"),
      price: "€ 3.900",
      items: [
        t("Bis zu 10 Stunden", "Up to 10 hours"),
        t("2 Fotografen", "2 photographers"),
        t("Online-Galerie (alle Fotos)", "Online gallery (all photos)"),
        t("Professionelle Bearbeitung", "Professional editing"),
        t("Lieferung in 6 Wochen", "Delivery in 6 weeks"),
      ],
      hi: false,
    },
    {
      tag: t("Beliebtestes Paket", "Most popular"),
      name: t(<>Foto + Film.<br /><em>Vollständig.</em></>, <>Photo + Film.<br /><em>Complete.</em></>),
      from: t("Ab", "From"),
      price: "€ 5.900",
      items: [
        t("Zwei-Tages-Begleitung", "Two-day coverage"),
        t("2 Fotografen + 1 Filmmaker", "2 photographers + 1 filmmaker"),
        t("Online-Galerie (alle Fotos)", "Online gallery (all photos)"),
        t("Hochzeitsfilm (8–12 Min.)", "Wedding film (8–12 min)"),
        t("Highlight-Reel (2–3 Min.)", "Highlight reel (2–3 min)"),
        t("Lieferung in 8 Wochen", "Delivery in 8 weeks"),
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
                    "Wir glauben an Klarheit. Deswegen nennen wir unsere Preise von Anfang an — damit nur Paare anfragen, bei denen es wirklich passt.",
                    "We believe in transparency. That's why we share our prices upfront — so only couples who are genuinely aligned reach out."
                  )}
                </p>
                <p className="pricing-intro-p">
                  {t(
                    "Unsere Pakete sind ein Ausgangspunkt. Was ihr wirklich braucht, besprechen wir gemeinsam.",
                    "Our packages are a starting point. What you actually need, we'll figure out together."
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
                  <ul className="card-list">
                    {pkg.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="card-btn">
                    {t("Anfragen", "Enquire")}
                  </a>
                </div>
              ))}
            </div>
          </RevealOnScroll>

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
