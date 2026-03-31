import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const Pricing = () => {
  const { t } = useLang();

  const columns = [
    {
      tag: t("Fotografie", "Photography"),
      name: t(<>One eye. <em>Your story.</em></>, <>One eye. <em>Your story.</em></>),
      hi: false,
    },
    {
      tag: t("Beliebtestes Paket", "Most popular"),
      name: t(<>Two eyes. <em>Your full story.</em></>, <>Two eyes. <em>Your full story.</em></>),
      hi: true,
    },
    {
      tag: "Platinum",
      name: t(<>Three eyes. <em>Every last moment.</em></>, <>Three eyes. <em>Every last moment.</em></>),
      hi: false,
    },
  ];

  const rows = [
    {
      label: t("Abdeckung", "Coverage"),
      values: [
        t("Hochzeitstag (10h)", "Wedding day (10h)"),
        t("Welcome (3h) + Hochzeitstag (12h)", "Welcome (3h) + Wedding day (12h)"),
        t("Welcome (3h) + Hochzeitstag (12h)", "Welcome (3h) + Wedding day (12h)"),
      ],
    },
    {
      label: t("Team", "Crew"),
      values: [
        t("1 Kameramann", "1 cinematographer"),
        t("2 Kameraleute", "2 cinematographers"),
        t("2 Kameraleute + 1 Fotograf", "2 cinematographers + 1 photographer"),
      ],
    },
    {
      label: t("Kamera", "Camera"),
      values: [
        t("Kinokamera & Drohne", "Cinema camera & drone"),
        t("Cinema + Highend Fotokamera + Analog (36 Bilder)", "Cinema + Highend Photocamera + Analogue (36 frames)"),
        t("Cinema + Super 8 + VHS & Drohne + Highend Fotokamera + Analog (72 Bilder)", "Cinema + Super 8 + VHS + drone + Highend Photocamera + Analogue (72 frames)"),
      ],
    },
    {
      label: "Film",
      values: [
        t("Highlightfilm 4–5 Min.", "Highlight film 4–5 min"),
        t("Highlightfilm 4–5 Min.", "Highlight film 4–5 min"),
        t("Highlightfilm 7–8 Min. + Redenfilm", "Highlight film 7–8 min + Speeches film"),
      ],
    },
    {
      label: "Social",
      values: [
        "—",
        t("Social Shorts", "Social shorts"),
        t("2x Social Shorts + Super VHS Nostalgiefilm", "2x Social shorts + Super VHS nostalgic film"),
      ],
    },
    {
      label: t("Fotos", "Photos"),
      values: [
        t("400 digital", "400 digital"),
        t("500 digital + analog", "500 digital + analogue"),
        t("600 digital + analog", "600 digital + analogue"),
      ],
    },
    {
      label: t("Preis", "Price"),
      values: [
        t("Ab € 3.900", "From € 3.900"),
        t("Ab € 5.800", "From € 5.800"),
        t("Ab € 8.500", "From € 8.500"),
      ],
      isPrice: true,
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
            <div className="pricing-table">
              {/* Header row */}
              <div className="pricing-table-row pricing-table-header">
                <div className="pricing-table-label" />
                {columns.map((col, i) => (
                  <div key={i} className={`pricing-table-col-header ${col.hi ? "hi" : ""}`}>
                    <span className="card-tag">{col.tag}</span>
                    <h3 className="card-name">{col.name}</h3>
                  </div>
                ))}
              </div>

              {/* Data rows */}
              {rows.map((row, ri) => (
                <div key={ri} className={`pricing-table-row ${row.isPrice ? "pricing-table-row-price" : ""}`}>
                  <div className="pricing-table-label">{row.label}</div>
                  {row.values.map((val, ci) => (
                    <div key={ci} className={`pricing-table-cell ${columns[ci].hi ? "hi" : ""} ${row.isPrice ? "price-cell" : ""}`}>
                      {val}
                    </div>
                  ))}
                </div>
              ))}

              {/* Enquire buttons row */}
              <div className="pricing-table-row pricing-table-row-btn">
                <div className="pricing-table-label" />
                {columns.map((col, i) => (
                  <div key={i} className={`pricing-table-cell ${col.hi ? "hi" : ""}`}>
                    <a
                      href="#contact"
                      className={`card-btn ${col.hi ? "hi-btn" : ""}`}
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
