import { choices, dayDescriptions, styleDescriptions } from './content';
import { estimate, filmPrice, formatMoney, hoursText, priceLines, selectedExtras, type GuideAnswers, type Language } from './logic';
import { defaultSettings } from './settings';

export function optionTitle(key: string, value: string, lang: Language): string {
  const group = ({ start: 'how', loved: 'film', shootWhen: 'shoot', speechCount: 'speeches' } as Record<string,string>)[key] ?? key;
  if (key === 'shootLen') return ({ h1: lang === 'en' ? '1 hour' : '1 Stunde', h15: lang === 'en' ? '1.5 hours' : '1,5 Stunden', h2: lang === 'en' ? '2 hours' : '2 Stunden' } as Record<string,string>)[value] ?? value;
  if (key === 'speechesFilm') return lang === 'en' ? 'Full speeches film' : 'Kompletter Reden-Film';
  return choices[group]?.find(o => o[0] === value)?.[lang === 'en' ? 1 : 2] ?? value;
}
export function formattedDate(value: string, lang: Language) {
  if (!value) return '';
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
export interface SummaryRow { key: string; label: string; value: string; description?: string; amount?: number; }
export function summaryRows(a: GuideAnswers, lang: Language): SummaryRow[] {
  const t = (en: string, de: string) => lang === 'en' ? en : de;
  const title = (key: string, value: string) => optionTitle(key, value, lang);
  const lines = priceLines(a);
  const amount = (prefix: string) => lines.filter(l => l.key.startsWith(prefix)).reduce((sum, l) => sum + l.amount, 0);
  const extras = selectedExtras(a);
  const rows: SummaryRow[] = [
    { key: 'film', label: 'Film', value: `${title('days',a.days)} · ${title('crew',a.crew)}`, amount: filmPrice(a.days,a.crew) + a.extraHours * defaultSettings.prices.extraHour[a.crew],
      description: [hoursText(a,lang),dayDescriptions.find(d => d[0] === a.days)?.[lang === 'en' ? 1 : 2],a.days !== 'one' && a.daysNote ? `${t('Your plan','Euer Plan')}: ${a.daysNote}` : '',a.crew === 'two' ? t('Drone, speech set-up and reaction shots covered','Drohne, Reden-Setup und Gegenschüsse abgedeckt') : t('One eye, one vision','Ein Blick, eine Vision'),t('Highlight film 4-5 min, drone, music, grading.','Highlight-Film 4-5 Min., Drohne, Musik, Colorgrading.')].filter(Boolean).join('. ') },
    { key: 'style', label: t('Feel','Gefühl'), value: title('style',a.style), description: styleDescriptions.find(d => d[0] === a.style)?.[lang === 'en' ? 1 : 2] },
    { key: 'shoot', label: t('Couple shoot','Paarshooting'), value: `${title('shootLen',a.shootLen)} · ${title('shootWhen',a.shootWhen)}`, amount: amount('shoot') },
    { key: 'voices', label: t('Voices','Stimmen'), value: a.voices.map(v => title('voices',v)).join(', ') || '-', amount: amount('voices') },
  ];
  if (!a.voices.includes('none')) rows.push({ key: 'speeches', label: t('Speeches','Reden'), value: title('speechCount',a.speechCount) });
  rows.push({ key: 'extras', label: 'Extras', value: [...(a.speechesFilm.length && !a.voices.includes('none') ? [title('speechesFilm','yes')] : []),...extras.map(v => `${title('extras',v)}${a.days === 'three' && ['feature','social'].includes(v) ? t(' (incl.)',' (inkl.)') : ''}`)].join(', ') || '-', amount: amount('extras') + amount('speechesFilm') });
  return rows;
}
export function planMessage(a: GuideAnswers, lang: Language, showPrices = defaultSettings.show_price_to_client) {
  const t = (en: string, de: string) => lang === 'en' ? en : de;
  const rows = summaryRows(a,lang).filter(r => r.value && r.value !== '-');
  return [t('Hi Hugo + Nanny! Here is our film plan:','Hallo Hugo + Nanny! Hier ist unser Filmplan:'),'',a.names,
    [formattedDate(a.date,lang),a.place,a.guests ? `${a.guests === 'under40' ? t('under 40','unter 40') : a.guests} ${t('guests','Gäste')}` : ''].filter(Boolean).join(' · '),'',
    ...rows.map(r => `• ${r.label}: ${r.value}`),
    a.loved.length ? `• ${t('Loved in the reel','Am Reel gefallen')}: ${a.loved.map(v => optionTitle('loved',v,lang)).join(', ')}${a.loved.includes('other') && a.lovedNote ? ` (${a.lovedNote})` : ''}` : '',
    a.days !== 'one' && a.daysNote ? `• ${t('Plan for the extra days','Plan für die Zusatztage')}: ${a.daysNote}` : '',
    `• ${t('Hours','Stunden')}: ${hoursText(a,lang)}`,'',
    showPrices ? `${t('Estimate','Schätzung')}: ${formatMoney(estimate(a),lang)} ${t('net','netto')}` : '', '', a.story,'',
    `${t('Reach us via','Erreicht uns per')} ${a.contactVia === 'whatsapp' ? 'WhatsApp' : 'E-Mail'}: ${a.contact}`,
  ].filter(line => line !== '').join('\n');
}