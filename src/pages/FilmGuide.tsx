import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import FilmGuideVideo from "@/components/film-guide/FilmGuideVideo";
import { GuideChoices, GuideField, GuideStepper, type GuideOption } from "@/components/film-guide/FilmGuideControls";
import "@/styles/film-guide.css";

type Language = "en" | "de";
const chapters = [
  ["intro", "The film guide", "Der Film-Guide"], ["how", "How we like to work", "Wie wir am liebsten arbeiten"],
  ["film", "What we do", "Was wir machen"], ["style", "Camera feel", "Kamera-Gefühl"], ["days", "Days", "Tage"],
  ["crew", "Both of us", "Wir beide"], ["shoot", "Couple shoot", "Paarshooting"], ["voices", "Voices", "Stimmen"],
  ["speeches", "Speeches", "Reden"], ["extras", "Your films", "Eure Filme"], ["about", "About you", "Über euch"], ["plan", "Your film plan", "Euer Filmplan"],
];
const choices: Record<string, [string, string, string][]> = {
  how: [["recommended", "Sounds like us", "Klingt nach uns"], ["light", "We need less", "Wir brauchen weniger"], ["later", "Let’s decide later", "Entscheiden wir später"]],
  film: [["closeness", "The closeness", "Die Nähe"], ["voices", "The voices", "Die Stimmen"], ["music", "Music & pacing", "Musik & Rhythmus"], ["views", "The wide views", "Die Weite"], ["other", "Something else", "Etwas anderes"]],
  style: [["natural", "Natural & close", "Natürlich & nah"], ["composed", "Calm & composed", "Ruhig & komponiert"], ["mix", "The mix", "Die Mischung"]],
  days: [["one", "One day", "Ein Tag"], ["two", "Two days", "Zwei Tage"], ["three", "Three days", "Drei Tage"]],
  crew: [["one", "One cinematographer", "Eine Kamera"], ["two", "Two cinematographers", "Zwei Kameras"]],
  shoot: [["golden", "Golden hour, on the day", "Goldene Stunde, am Tag"], ["firstlook", "First look, before the ceremony", "First Look, vor der Trauung"], ["both", "Golden hour + first look", "Goldene Stunde + First Look"], ["daybefore", "The day before, at golden hour", "Am Vortag, zur goldenen Stunde"], ["dayafter", "A separate day", "Ein eigener Tag"]],
  voices: [["interviews", "Interviews with loved ones", "Interviews mit euren Liebsten"], ["letters", "Letters to each other", "Briefe aneinander"], ["vows", "Your vows & speeches", "Eure Gelübde & Reden"], ["none", "Purely visual", "Rein visuell"]],
  speeches: [["0", "None", "Keine"], ["1-2", "1-2", "1-2"], ["3-5", "3-5", "3-5"], ["6+", "6+", "6+"]],
  extras: [["none", "Just the highlight film", "Nur der Highlight-Film"], ["feature", "Long film, about 30 min", "Langer Film, ca. 30 Min."], ["social", "Social shorts", "Social Shorts"], ["ceremony", "Full ceremony film", "Komplette Trauung"], ["super8", "Super 8", "Super 8"], ["vhs", "VHS nostalgia film", "VHS-Nostalgiefilm"], ["photo", "Photography too", "Auch Fotografie"]],
};
const clips: Record<string, [number, number]> = { how: [53.5, 56], style: [1, 4], days: [9, 12.5], crew: [53.5, 56], shoot: [11.5, 15], voices: [35.5, 40], speeches: [9, 12], extras: [56, 60], "style.natural": [45, 50], "style.composed": [41.5, 44], "style.mix": [1, 4] };

export default function FilmGuide() {
  const [lang, setLang] = useState<Language>(() => new URLSearchParams(window.location.search).get("lang") === "de" ? "de" : "en");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({ days: ["two"], crew: ["two"], length: ["h1"] });
  const [fields, setFields] = useState<Record<string, string>>({});
  const [hours, setHours] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [contactVia, setContactVia] = useState("whatsapp");
  const t = (en: string, de: string) => lang === "en" ? en : de;
  const chapter = chapters[step] ?? chapters[0];
  const id = chapter[0];
  const title = chapter[lang === "en" ? 1 : 2];
  const single = ["intro", "about", "plan"].includes(id);
  const multi = ["film", "voices", "extras"].includes(id);
  const change = (key: string, value: string, multiple = false) => setAnswers(current => ({ ...current, [key]: multiple ? (current[key]?.includes(value) ? current[key].filter(item => item !== value) : [...(current[key] ?? []), value]) : [value] }));
  const field = (key: string, label: string, type = "text", placeholder?: string, multiline = false) => <GuideField label={label} value={fields[key] ?? ""} type={type} placeholder={placeholder} multiline={multiline} onChange={value => setFields(current => ({ ...current, [key]: value }))} />;
  const navigate = (next: number) => { setStep(next); setPreview(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const options: GuideOption[] = (choices[id] ?? []).map(([key, en, de]) => ({ id: key, title: t(en, de), clip: !["how", "film", "speeches"].includes(id) && key !== "none", tag: (id === "days" || id === "crew") && key === "two" ? t("Recommended", "Empfohlen") : undefined, hours: id === "days" ? t(key === "one" ? "Wedding day · 10 h" : key === "two" ? "Wedding day 10 h + 1 day · 4 h" : "Wedding day 10 h + 2 days · 4 h each", key === "one" ? "Hochzeitstag · 10 Std." : key === "two" ? "Hochzeitstag 10 Std. + 1 Tag · 4 Std." : "Hochzeitstag 10 Std. + 2 Tage · je 4 Std.") : undefined }));
  const currentClip = clips[`${id}.${preview ?? answers[id]?.[0]}`] ?? clips[id];
  return <div className="film-guide-page">
    <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap" /><meta name="twitter:card" content="summary" /></Helmet>
    <SEO title="Film Guide | hugo + nanny" description="Explore your wedding film with Hugo + Nanny, one chapter at a time." path="/film-guide" />
    <header className="fg-top"><div className="fg-top-inner"><Link className="fg-wordmark" to="/">hugo + nanny</Link><span className="fg-top-step fg-label">{step > 0 ? `${String(step).padStart(2, "0")} / 11 · ${title}` : ""}</span><div className="fg-lang">{(["de", "en"] as const).map(language => <Button variant="ghost" key={language} className={language === lang ? "fg-on" : ""} aria-pressed={language === lang} onClick={() => setLang(language)}>{language.toUpperCase()}</Button>)}</div></div><progress className="fg-progress" max={11} value={step} aria-label={t("Progress", "Fortschritt")} /></header>
    <main className="fg-stage"><section key={id} className={`fg-chapter${single ? " fg-single" : ""}`}>
      <div className="fg-copy"><span className="fg-label">{step === 0 ? title : `${String(step).padStart(2, "0")} - ${title}`}</span>
        {id === "intro" ? <><h1>{t("Your wedding film.", "Euer Hochzeitsfilm.")} <em>{t("The film guide.", "Der Film-Guide.")}</em></h1><div className="fg-fields">{field("names", t("Your names", "Eure Namen"), "text", "Mira + Jonas")}</div></> : <h2>{id === "how" ? `${t("Hey", "Hey")} ${fields.names || t("you two", "ihr zwei")}, ` : ""}<em>{title}.</em></h2>}
        {id === "shoot" && <GuideChoices label={t("How long?", "Wie lange?")} compact selected={answers.length ?? []} onChange={value => change("length", value)} options={[{id:"h1",title:t("1 hour","1 Stunde")},{id:"h15",title:t("1.5 hours","1,5 Stunden")},{id:"h2",title:t("2 hours","2 Stunden")}]} />}
        {options.length > 0 && <GuideChoices label={t("Your choice", "Eure Wahl")} options={options} selected={answers[id] ?? []} multi={multi} compact={["film", "speeches"].includes(id)} onChange={value => change(id, value, multi)} onPreview={setPreview} />}
        {id === "film" && answers.film?.includes("other") && <div className="fg-fields">{field("lovedNote", t("Tell us what it was", "Erzählt uns, was es war"))}</div>}
        {id === "days" && <><div className="fg-fields">{field("daysNote", t("Your own plan for the extra days (optional)", "Euer eigener Plan für die Zusatztage (optional)"))}</div><GuideStepper label={t("Need more time?", "Mehr Zeit nötig?")} value={hours} onChange={setHours} /></>}
        {id === "speeches" && <GuideChoices label={t("Keep them forever", "Für immer behalten")} multi selected={answers.speechesFilm ?? []} onChange={value => change("speechesFilm", value, true)} options={[{id:"yes",title:t("Full speeches film","Kompletter Reden-Film")}]} />}
        {id === "extras" && <div className="fg-included">{[t("Highlight film, 4-5 min", "Highlight-Film, 4-5 Min."),t("Drone footage", "Drohnenaufnahmen"),t("Licensed music & colour grading", "Lizenzierte Musik & Colorgrading"),t("Sneak peek within 2 weeks", "Sneak Peek innerhalb von 2 Wochen")].map(text => <div key={text}><span>{text}</span><span>{t("Included", "Inklusive")}</span></div>)}</div>}
        {id === "about" && <div className="fg-fields">{field("names",t("Your names *","Eure Namen *"),"text","Mira + Jonas")}<div className="fg-two">{field("date",t("Wedding date *","Hochzeitsdatum *"),"date")}<label className="fg-field"><span>{t("Guests","Gäste")}</span><select value={fields.guests ?? ""} onChange={e => setFields(current => ({...current,guests:e.target.value}))}><option value="">-</option><option value="under40">{t("Under 40","Unter 40")}</option>{["40-80","80-120","120+"].map(value => <option key={value}>{value}</option>)}</select></label></div>{field("place",t("Venue / location","Ort / Location"),"text","Köln, Toskana, ...")}<div className="fg-field"><span>{t("Best reached via","Am besten erreichbar per")}</span><div className="fg-seg">{["whatsapp","email"].map(via => <Button variant="ghost" key={via} className={via === contactVia ? "fg-on" : ""} onClick={() => setContactVia(via)}>{via === "whatsapp" ? "WhatsApp" : "E-Mail"}</Button>)}</div></div>{field(contactVia,contactVia === "whatsapp" ? t("WhatsApp number *","WhatsApp-Nummer *") : t("Email *","E-Mail *"),contactVia === "whatsapp" ? "tel" : "email")}{field("story",t("And this is our story (optional)","Und das ist unsere Geschichte (optional)"),"text",undefined,true)}<p className="fg-fine"><Link to="/privacy">{t("Privacy policy","Datenschutzerklärung")}</Link></p></div>}
        {id === "plan" && <><div className="fg-plan"><span className="fg-label">{t("The film of","Der Film von")}</span><h3>{fields.names || t("The two of you","Euch beiden")}</h3><p className="fg-meta">{[fields.date,fields.place,fields.guests].filter(Boolean).join(" · ")}</p><div className="fg-plan-rows">{["days","crew","style","shoot","voices","extras"].map(key => <div className="fg-plan-row" key={key}><span className="fg-k">{chapters.find(item => item[0] === key)?.[lang === "en" ? 1 : 2]}</span><span className="fg-v">{answers[key]?.map(value => { const option = choices[key]?.find(item => item[0] === value); return option?.[lang === "en" ? 1 : 2] ?? value; }).join(", ") || "-"}</span></div>)}</div></div></>}
      </div>
      {!single && <aside className="fg-media"><FilmGuideVideo caption={id === "film" ? undefined : options.find(option => option.id === (preview ?? answers[id]?.[0]))?.title ?? title} start={currentClip?.[0] ?? 0} end={id === "film" ? undefined : currentClip?.[1]} soundLabel={t("Toggle sound","Ton umschalten")} /></aside>}
    </section>{id === "intro" && <FilmGuideVideo intro soundLabel="" />}</main>
    <footer className="fg-dock"><div className="fg-dock-inner">{step > 0 && <Button variant="ghost" className="fg-back" onClick={() => navigate(step - 1)}>← {t("Back","Zurück")}</Button>}<div className="fg-dock-space" />{step < 11 && <Button className="fg-btn" onClick={() => navigate(step + 1)}>{step === 0 ? t("Let’s begin","Los geht’s") : step === 10 ? t("See our plan","Unser Plan") : t("Continue","Weiter")}</Button>}</div></footer>
  </div>;
}