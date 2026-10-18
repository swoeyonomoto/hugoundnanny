import { defaultSettings, type GuideSettings } from './settings';

export type Language = 'en' | 'de';
export type Days = 'one' | 'two' | 'three';
export type Crew = 'one' | 'two';
export interface GuideAnswers {
  names: string; start: string; loved: string[]; lovedNote: string; style: string;
  days: Days; crew: Crew; daysNote: string; extraHours: number;
  shootLen: 'h1' | 'h15' | 'h2'; shootWhen: string; voices: string[];
  speechCount: string; speechesFilm: string[]; extras: string[];
  socialCount: number; photoDays: number; contentDays: number; discount: number;
  date: string; place: string; guests: string; contactVia: 'whatsapp' | 'email'; contact: string; story: string;
}
export const initialAnswers: GuideAnswers = {
  names: '', start: '', loved: [], lovedNote: '', style: '', days: 'two', crew: 'two', daysNote: '', extraHours: 0,
  shootLen: 'h1', shootWhen: '', voices: [], speechCount: '', speechesFilm: [], extras: [],
  socialCount: 1, photoDays: 0, contentDays: 0, discount: 0,
  date: '', place: '', guests: '', contactVia: 'whatsapp', contact: '', story: '',
};
export const chapterIds = ['intro','how','film','style','days','crew','shoot','voices','speeches','extras','about','plan'] as const;
export type Chapter = typeof chapterIds[number];
export const round50 = (amount: number) => Math.round(amount / 50) * 50;
export function startingLanguage(search: string, browser: string): Language {
  const query = new URLSearchParams(search).get('lang');
  return query === 'en' || query === 'de' ? query : 'en';
}
export function formatMoney(amount: number, lang: Language) { return `€ ${amount.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')}`; }
export function filmPrice(days: Days, crew: Crew, settings = defaultSettings) {
  return crew === 'one' ? settings.coverage_one_cam[days] : round50(settings.coverage_one_cam[days] * settings.second_cam_factor[days]);
}
export function selectedExtras(a: GuideAnswers) {
  return a.days === 'three' ? [...new Set([...a.extras.filter(x => x !== 'none'), 'feature', 'social'])] : a.extras;
}
export function updateAnswer<K extends keyof GuideAnswers>(a: GuideAnswers, key: K, value: GuideAnswers[K]): GuideAnswers {
  const next = { ...a, [key]: value };
  if (key === 'start') {
    if (value === 'recommended') { next.days = 'two'; next.crew = 'two'; }
    if (value === 'light') { next.days = 'one'; next.crew = 'one'; }
  }
  if (next.days !== a.days) {
    if ((next.days === 'one' && next.shootWhen === 'daybefore') || (a.days === 'three' && next.shootWhen === 'dayafter')) next.shootWhen = '';
    if (next.days === 'three') {
      if (!next.shootWhen) next.shootWhen = 'dayafter';
      next.extras = next.extras.filter(x => x !== 'none');
    }
  }
  if (next.voices.includes('none')) { next.speechCount = ''; next.speechesFilm = []; }
  return next;
}
export function toggleMulti(values: string[], value: string) {
  if (values.includes(value)) return values.filter(x => x !== value);
  return value === 'none' ? ['none'] : [...values.filter(x => x !== 'none'), value];
}
export function missingAnswers(chapter: Chapter, a: GuideAnswers): string[] {
  switch (chapter) {
    case 'how': return a.start ? [] : ['start'];
    case 'film': return a.loved.length ? [] : ['loved'];
    case 'style': return a.style ? [] : ['style'];
    case 'days': return a.days ? [] : ['days'];
    case 'crew': return a.crew ? [] : ['crew'];
    case 'shoot': return [!a.shootLen && 'shootLen', !a.shootWhen && 'shootWhen'].filter((x): x is string => Boolean(x));
    case 'voices': return a.voices.length ? [] : ['voices'];
    case 'speeches': return a.voices.includes('none') || a.speechCount ? [] : ['speechCount'];
    case 'extras': return a.days === 'three' || a.extras.length ? [] : ['extras'];
    case 'about': return ['names','date','contact'].filter(key => !String(a[key as keyof GuideAnswers]).trim());
    default: return [];
  }
}
export function nextChapter(step: number, direction: 1 | -1, a: GuideAnswers) {
  let next = step + direction;
  if (chapterIds[next] === 'speeches' && a.voices.includes('none')) next += direction;
  return Math.max(0, Math.min(chapterIds.length - 1, next));
}
export interface PriceLine { key: string; amount: number; }
export function priceLines(a: GuideAnswers, settings: GuideSettings = defaultSettings): PriceLine[] {
  const p = settings.prices;
  const lines: PriceLine[] = [{ key: 'film', amount: filmPrice(a.days, a.crew, settings) }];
  if (a.extraHours) lines.push({ key: 'extraHours', amount: a.extraHours * p.extraHour[a.crew] });
  if (a.shootLen) lines.push({ key: `shootLen.${a.shootLen}`, amount: 0 });
  if (a.shootWhen === 'dayafter') lines.push({ key: 'shootWhen.dayafter', amount: a.days === 'three' ? 0 : p.shootWhen.dayafter });
  for (const voice of a.voices) lines.push({ key: `voices.${voice}`, amount: p.voices[voice as keyof typeof p.voices] ?? 0 });
  if (!a.voices.includes('none') && a.speechesFilm.length) lines.push({ key: 'speechesFilm.yes', amount: p.speechesFilm });
  for (const extra of selectedExtras(a)) {
    const unit = a.days === 'three' && ['feature','social'].includes(extra) ? 0 : p.extras[extra as keyof typeof p.extras] ?? 0;
    lines.push({ key: `extras.${extra}`, amount: extra === 'social' ? unit * Math.max(1, a.socialCount) : unit });
  }
  if (a.photoDays) lines.push({ key: 'photoDays', amount: a.photoDays * p.photographer.day });
  if (a.contentDays) lines.push({ key: 'contentDays', amount: a.contentDays * p.contentCreator.day });
  return lines;
}
export function subtotal(a: GuideAnswers, settings = defaultSettings) { return round50(priceLines(a, settings).reduce((sum, line) => sum + line.amount, 0)); }
export function discountAmount(a: GuideAnswers, settings = defaultSettings) { return round50(subtotal(a, settings) * Math.min(100, Math.max(0, a.discount)) / 100); }
export function estimate(a: GuideAnswers, settings = defaultSettings) { return round50(subtotal(a, settings) - discountAmount(a, settings)); }
export function packageFor(amount: number, settings = defaultSettings) { return [...settings.packages].sort((a,b) => b.from-a.from).find(p => amount >= p.from); }
export function hoursText(a: GuideAnswers, lang: Language, settings = defaultSettings) {
  const additional = { one: 0, two: 1, three: 2 }[a.days];
  const unit = lang === 'de' ? 'Std.' : 'h';
  return `${lang === 'de' ? 'Hochzeitstag' : 'Wedding day'} ${settings.hours.first} ${unit}${additional ? ` + ${additional} × ${settings.hours.extra} ${unit}` : ''}${a.extraHours ? ` + ${a.extraHours} ${unit} extra` : ''} = ${settings.hours.first + additional * settings.hours.extra + a.extraHours} ${unit}`;
}