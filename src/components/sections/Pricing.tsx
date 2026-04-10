import { useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";

const Pricing = () => {
  const { t } = useLang();

  const packages = [
    {
      tag: t("EINE PERSPEKTIVE", "ONE PERSPECTIVE"),
      name: t(<>One eye.<br /><em>Your story.</em></>, <>One eye.<br /><em>Your story.</em></>),
      from: t("Ab", "From"),
      price: "€ 3.900",
      emotionalLine: true,
      emotionalText: t(
        "Eine Person. Vom ersten bis zum letzten Moment. Voll da, voll fokussiert — auf euch, auf den Tag, auf nichts anderes. Eine Vision. Erzählt aus einer starken Perspektive.",
        "One person. From the first moment to the last. Fully there, fully focused — on you, on the day, on nothing else. One vision. Told from one strong perspective."
      ),
      items: [
        { label: t("Abdeckung", "Coverage"), value: t("Hochzeitstag (10h)", "Wedding day (10h)") },
        { label: t("Team", "Crew"), value: t("1 Kameramann (Film oder Foto)", "1 cinematographer (film or photo)") },
        { label: t("Kamera", "Camera"), value: t(<>Kinokamera<br />+ Drohne</>, <>Cinema camera<br />+ drone</>) },
        { label: "Film", value: t("Highlightfilm 4–5 Min.", "Highlight film 4–5 min") },
        { label: "Social", value: "—" },
        { label: t("Fotos", "Photos"), value: t("400 digital", "400 digital") },
      ],
      hi: false,
    },
    {
      tag: t("ZWEI PERSPEKTIVEN", "TWO PERSPECTIVES"),
      name: t(<>Two eyes.<br /><em>Your full story.</em></>, <>Two eyes.<br /><em>Your full story.</em></>),
      from: t("Ab", "From"),
      price: "€ 5.800",
      emotionalLine: true,
      emotionalText: t(
        "Wir beide an eurem Tag. Das bedeutet: zwei Dinge passieren immer gleichzeitig. Die Drohne und die Tanzfläche. Die Totale und die Nähe. Ihr Gesicht und seines. Ihr müsst nicht wählen, was festgehalten wird. Wir haben es schon abgedeckt.",
        "Two of us on your day. That means two things happening at once — always. The drone and the dance floor. The wide and the close. Her face and his. You don't have to choose what gets captured. We already covered it."
      ),
      items: [
        { label: t("Abdeckung", "Coverage"), value: t("Welcome (3h) + Hochzeitstag (12h)", "Welcome (3h) + Wedding day (12h)") },
        { label: t("Team", "Crew"), value: t("2 Kameraleute (Film oder Foto)", "2 cinematographers (film or photo)") },
        { label: t("Kamera", "Camera"), value: t("Cinema + Highend Fotokamera + Drohne + Analog (36 Bilder)", "Cinema + Highend Photocamera + drone + Analogue (36 frames)") },
        { label: "Film", value: t("Highlightfilm 4–5 Min.", "Highlight film 4–5 min") },
        { label: "Social", value: t("Social Shorts", "Social shorts") },
        { label: t("Fotos", "Photos"), value: t("500 digital + analog (36 Bilder)", "500 digital + analogue (36 frames)") },
      ],
      hi: true,
    },
    {
      tag: t("JEDER EINZELNE MOMENT", "EVERY SINGLE MOMENT"),
      name: t(<>Three eyes.<br /><em>Every last moment.</em></>, <>Three eyes.<br /><em>Every last moment.</em></>),
      from: t("Ab", "From"),
      price: "€ 8.500",
      emotionalLine: true,
      emotionalText: t(
        "Alles aus Two eyes — plus ein Fotograf, der parallel läuft. Film und Foto gleichzeitig. Bewegtes Bild und Standbild. Die Momente, die man in Bewegung fühlen muss, und die, die eingefroren werden müssen. Zwei Formate, drei Menschen, ein Tag. Nichts ausgelassen.",
        "Everything from Two eyes — plus a photographer running alongside. Film and photo at the same time. Moving image and still. The moments that need to be felt in motion, and the ones that need to be frozen. Two formats, three people, one day. Nothing left out."
      ),
      items: [
        { label: t("Abdeckung", "Coverage"), value: t("Welcome (3h) + Hochzeitstag (12h)", "Welcome (3h) + Wedding day (12h)") },
        { label: t("Team", "Crew"), value: t("2 Kameraleute + 1 Fotograf", "2 cinematographers + 1 photographer") },
        { label: t("Kamera", "Camera"), value: t("Cinema + Super 8 + VHS & Drohne + Highend Fotokamera + Analog (72 Bilder)", "Cinema + Super 8 + VHS + drone + Highend Photocamera + Analogue (72 frames)") },
        { label: "Film", value: t("Highlightfilm 7–8 Min. + Redenfilm", "Highlight film 7–8 min + Speeches film") },
        { label: "Social", value: t("2x Social Shorts + Super VHS Nostalgiefilm", "2x Social shorts + Super VHS nostalgic film") },
        { label: t("Fotos", "Photos"), value: t("600 digital + analog (72 Bilder)", "600 digital + analogue (72 frames)") },
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
                    <em>Damit ihr wisst,<br />ob wir zusammenpassen.</em>,
                    <em>So you know<br />if we're a good fit.</em>
                  )}
                </h2>
              </div>
              <div>
                <p className="pricing-intro-p">
                  {t(
                    "Wir glauben an Transparenz. Deshalb nennen wir unsere Preise von Anfang an — keine Überraschungen, keine unangenehmen Gespräche im Nachhinein. Unsere Pakete sind ein Ausgangspunkt. Was ihr wirklich braucht, besprechen wir gemeinsam.",
                    "We believe in transparency. That's why we share our prices upfront - no surprises, no awkward conversations later. Our packages are a starting point. What you actually need, we'll figure out together."
                  )}
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="cards">
              {packages.map((pkg, i) => (
                <div className="card" key={i}>
                  <span className="card-tag">{pkg.tag}</span>
                  <h3 className="card-name">{pkg.name}</h3>
                  <hr className="card-hr" />
                  <span className="card-from">{pkg.from}</span>
                  <div className="card-price">{pkg.price}</div>
                  {pkg.emotionalLine && pkg.emotionalText && (
                    <p className="card-outcome">{pkg.emotionalText}</p>
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
                      const budgetMap = [
                        "€3.900 — One day · 1 cinematographer (film or photo)",
                        "€5.800 — Two days · 2 cinematographers (film or photo)",
                        "€8.500 — Two days · 2 cinematographers + photographer",
                      ];
                      const prefill: Record<string, string> = { lookingFor: "Photo & Video", budget: budgetMap[i] };
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
