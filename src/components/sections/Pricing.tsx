import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const Pricing = () => {
  const { t } = useLang();

  const packages = [
    {
      tag: t("Fotografie", "Photography"),
      name: t(<>One eye.<br /><em>Your story.</em></>, <>One eye.<br /><em>Your story.</em></>),
      from: t("Ab", "From"),
      price: "€ 3.900",
      emotionalLine: true,
      emotionalText: t(
        "Eine Person, ganz bei euch. Jemand, der euren Tag so sieht, wie er wirklich ist.",
        "One person, completely present. Someone who sees your day the way it actually happens."
      ),
      items: [
        { label: t("Abdeckung", "Coverage"), value: t("Hochzeitstag (10h)", "Wedding day (10h)") },
        { label: t("Team", "Crew"), value: t("1 Kameramann", "1 cinematographer") },
        { label: t("Kamera", "Camera"), value: t("Kinokamera & Drohne", "Cinema camera & drone") },
        { label: "Film", value: t("Highlightfilm 4–5 Min.", "Highlight film 4–5 min") },
        { label: "Social", value: "—" },
        { label: t("Fotos", "Photos"), value: t("400 digital", "400 digital") },
      ],
      hi: false,
    },
    {
      tag: t("Beliebtestes Paket", "Most popular"),
      name: t(<>Two eyes.<br /><em>Your full story.</em></>, <>Two eyes.<br /><em>Your full story.</em></>),
      from: t("Ab", "From"),
      price: "€ 5.800",
      emotionalLine: true,
      emotionalText: t(
        "Wir beide am Set — einer filmt, einer fotografiert. Oder beide filmen. Wir finden das Setup, das zu eurem Tag passt.",
        "Both of us on set — one on film, one on photo. Or both on film. We'll find the setup that fits your day."
      ),
      items: [
        { label: t("Abdeckung", "Coverage"), value: t("Welcome (3h) + Hochzeitstag (12h)", "Welcome (3h) + Wedding day (12h)") },
        { label: t("Team", "Crew"), value: t("2 Kameraleute", "2 cinematographers") },
        { label: t("Kamera", "Camera"), value: t("Cinema + Highend Fotokamera + Analog (36 Bilder)", "Cinema + Highend Photocamera + Analogue (36 frames)") },
        { label: "Film", value: t("Highlightfilm 4–5 Min.", "Highlight film 4–5 min") },
        { label: "Social", value: t("Social Shorts", "Social shorts") },
        { label: t("Fotos", "Photos"), value: t("500 digital + analog", "500 digital + analogue") },
      ],
      hi: true,
    },
    {
      tag: "Platinum",
      name: t(<>Three eyes.<br /><em>Every last moment.</em></>, <>Three eyes.<br /><em>Every last moment.</em></>),
      from: t("Ab", "From"),
      price: "€ 8.500",
      emotionalLine: false,
      emotionalText: "",
      items: [
        { label: t("Abdeckung", "Coverage"), value: t("Welcome (3h) + Hochzeitstag (12h)", "Welcome (3h) + Wedding day (12h)") },
        { label: t("Team", "Crew"), value: t("2 Kameraleute + 1 Fotograf", "2 cinematographers + 1 photographer") },
        { label: t("Kamera", "Camera"), value: t("Cinema + Super 8 + VHS & Drohne + Highend Fotokamera + Analog (72 Bilder)", "Cinema + Super 8 + VHS + drone + Highend Photocamera + Analogue (72 frames)") },
        { label: "Film", value: t("Highlightfilm 7–8 Min. + Redenfilm", "Highlight film 7–8 min + Speeches film") },
        { label: "Social", value: t("2x Social Shorts + Super VHS Nostalgiefilm", "2x Social shorts + Super VHS nostalgic film") },
        { label: t("Fotos", "Photos"), value: t("600 digital + analog", "600 digital + analogue") },
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
                  <div className="card-price">{pkg.price}</div>
                  {pkg.emotionalLine && pkg.emotionalText && (
                    <p className="card-emotional">{pkg.emotionalText}</p>
                  )}
                  <ul className="card-list">
                    {pkg.items.map((item, j) => (
                      <li key={j}>
                        <span className="card-list-label">{item.label}</span>
                        {item.value}
                      </li>
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
