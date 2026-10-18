export const chapters = [
  ["intro", "The film guide", "Der Film-Guide"], ["how", "How we like to work", "Wie wir am liebsten arbeiten"],
  ["film", "What we do", "Was wir machen"], ["style", "Camera feel", "Kamera-Gefühl"], ["days", "Days", "Tage"],
  ["crew", "Both of us", "Wir beide"], ["shoot", "Couple shoot", "Paarshooting"], ["voices", "Voices", "Stimmen"],
  ["speeches", "Speeches", "Reden"], ["extras", "Your films", "Eure Filme"], ["about", "About you", "Über euch"], ["plan", "Your film plan", "Euer Filmplan"],
];
export const choices: Record<string, [string, string, string][]> = {
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

export const dayDescriptions = [
 ['one','From getting ready to the dance floor','Vom Getting Ready bis zur Tanzfläche'],
 ['two','Plus 4 hours on another day - the film gets depth','Plus 4 Stunden an einem weiteren Tag - der Film bekommt Tiefe'],
 ['three','Plus 2 × 4 hours on other days - the whole story','Plus 2 × 4 Stunden an weiteren Tagen - die ganze Geschichte'],
];
export const styleDescriptions = [
 ['natural','Handheld and close - our signature','Aus der Hand, nah - unsere Handschrift'],
 ['composed','Steady, gliding, elegant','Ruhig, gleitend, elegant'],
 ['mix','Close in the emotion, calm for ceremony and places','Nah in den Emotionen, ruhig bei Trauung und Orten'],
];
export const reduceLosses: Record<string, [string,string][]> = {
 two: [
 ['4 hours on another day - welcome evening, civil ceremony or a couple shoot wherever you like','4 Stunden an einem weiteren Tag - Welcome-Abend, Standesamt oder ein Paarshooting, wo ihr wollt'],
 ['Time for you and your guests to get used to us before the big day','Zeit, damit ihr und eure Gäste euch vor dem großen Tag an uns gewöhnt'],
 ['The option to do the couple shoot the day before - no rush on the wedding day','Die Möglichkeit, das Paarshooting am Vortag zu machen - ohne Eile am Hochzeitstag']],
 three: [
 ['4 more hours on a third day - usually the day after: brunch, goodbyes, the quiet ending of your film','4 weitere Stunden an einem dritten Tag - meist der Tag danach: Brunch, Abschiede, das leise Ende eures Films'],
 ['Your couple shoot on its own day, up to 2 hours (included)','Euer Paarshooting an einem eigenen Tag, bis 2 Std. (inklusive)'],
 ['The long film, about 30 min (included)','Den langen Film, ca. 30 Min. (inklusive)'],
 ['Social shorts (included)','Social Shorts (inklusive)']],
 crew: [
 ['Drone footage without missing a moment on the ground','Drohnenaufnahmen, ohne einen Moment am Boden zu verpassen'],
 ['A fixed, perfectly set-up camera for every speech','Eine feste, perfekt eingerichtete Kamera für jede Rede'],
 ['The reaction shot - your face and theirs, in the same second','Den Gegenschuss - euer Gesicht und ihres, in derselben Sekunde'],
 ['Both of you getting ready, filmed at the same time','Euer beider Getting Ready, gleichzeitig gefilmt']],
};
export const nextSteps: [string,string][] = [
 ['You send us your plan - via WhatsApp or email, one tap.','Ihr schickt uns euren Plan - per WhatsApp oder E-Mail, ein Klick.'],
 ['Within 24 hours we tell you whether your date is free.','Innerhalb von 24 Stunden sagen wir euch, ob euer Datum frei ist.'],
 ['A 30-minute call to go through your plan together.','Kennenlern-Call, 30 Minuten. Wir gehen euren Plan gemeinsam durch.'],
 ['Contract + deposit - your date is reserved.','Vertrag + Anzahlung - und euer Datum ist fest reserviert.'],
 ['Planning in our app: timeline, interview questions, references. Nothing to prepare on your own.','Planung über unsere App: Zeitplan, Interview-Fragen, Referenzen. Ihr müsst nichts vorbereiten, was wir nicht mit euch zusammen machen.'],
 ['Sneak peek in 2 weeks, your film in 6-10 weeks.','Sneak Peek in 2 Wochen, euer Film in 6-10 Wochen.'],
];
