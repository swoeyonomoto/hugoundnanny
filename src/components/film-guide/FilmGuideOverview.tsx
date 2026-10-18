import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { hoursText, priceLines, type GuideAnswers, type Language } from '@/lib/film-guide/logic';
import { optionTitle } from '@/lib/film-guide/summary';
import type { GuideSettings } from '@/lib/film-guide/settings';

interface Props {
  answers: GuideAnswers; lang: Language; settings: GuideSettings;
  money: (amount: number) => string; gross: number; discount: number; total: number; onClose: () => void;
}

export default function FilmGuideOverview({ answers: a, lang, settings, money, gross, discount, total, onClose }: Props) {
  const t = (en: string, de: string) => lang === 'en' ? en : de;
  const title = (key: string, value: string) => optionTitle(key, value, lang);
  const rows = priceLines(a, settings).filter(line => !['extras.none', 'extras.photo', 'voices.none', 'extraHours'].includes(line.key)).map(line => {
    let label = ''; let detail = '';
    if (line.key === 'film') {
      label = `${title('days', a.days)} · ${title('crew', a.crew)}`;
      detail = hoursText(a, lang, settings);
    } else if (line.key.startsWith('shootLen.')) {
      label = t('Couple shoot', 'Paarshooting');
      detail = `${title('shootLen', a.shootLen)}${a.shootWhen ? ` · ${title('shootWhen', a.shootWhen)}` : ''}. ${t('Time for portraits together, not the length of your film. Included in your coverage.', 'Zeit für eure gemeinsamen Aufnahmen, nicht die Filmlänge. In eurer Begleitung enthalten.')}`;
    } else if (line.key === 'shootWhen.dayafter') {
      label = t('Day-after shoot', 'Day-after-Shooting');
      detail = t('A separate shoot on the day after your wedding.', 'Ein separates Shooting am Tag nach eurer Hochzeit.');
    } else if (line.key === 'photoDays') {
      label = t('Photography', 'Fotografie');
      detail = `${Math.max(1, a.photoDays)} ${t('day(s) · 10 hours per day', 'Tag(e) · 10 Stunden pro Tag')}`;
    } else if (line.key === 'contentDays') {
      label = t('Phone content creator', 'Handy-Content-Creator');
      detail = `${a.contentDays} ${t('day(s) · vertical behind-the-scenes content', 'Tag(e) · vertikaler Behind-the-Scenes-Content')}`;
    } else {
      const [key, value] = line.key.split('.');
      label = title(key, value);
      if (value === 'social') label = `${Math.max(1, a.socialCount)} ${t(a.socialCount === 1 ? 'social short' : 'social shorts', a.socialCount === 1 ? 'Social Short' : 'Social Shorts')}`;
      if (value === 'interviews') detail = t('Personal stories from 3-6 of your closest family & friends.', 'Persönliche Geschichten von 3-6 eurer engsten Freunde und Familienmitglieder.');
    }
    return { ...line, label, detail };
  });
  if (a.extraHours) rows.splice(1, 0, { key: 'extraHours', amount: a.extraHours * settings.prices.extraHour[a.crew], label: `${a.extraHours} ${t('extra coverage hours', 'zusätzliche Stunden Begleitung')}`, detail: t('Added to your wedding coverage.', 'Zusätzlich zu eurer Hochzeitsbegleitung.') });
  return <section id="fg-breakdown" className="fg-breakdown" role="region" aria-label={t('Your film overview', 'Eure Filmübersicht')}>
    <header className="fg-overview-heading"><h3>{t('Your film, so far.', 'Euer Film, bis jetzt.')}</h3><Button variant="ghost" size="icon" onClick={onClose} aria-label={t('Close overview', 'Übersicht schließen')}><X size={18} /></Button></header>
    <p className="fg-overview-intro">{t('Your coverage, included films and chosen extras.', 'Eure Begleitung, enthaltene Filme und gewählte Extras.')}</p>
    {rows.map(row => <div className="fg-overview-row" key={row.key}><span><strong>{row.label}</strong>{row.detail && <small>{row.detail}</small>}{row.key === 'film' && <small>{t('Includes a 4-5 minute highlight film, drone footage, music and colour grading.', 'Inklusive 4-5 Minuten Highlight-Film, Drohnenaufnahmen, Musik und Colorgrading.')}</small>}</span><span className={row.amount ? '' : 'fg-overview-included'}>{row.amount ? money(row.amount) : t('Included', 'Inklusive')}</span></div>)}
    {discount > 0 && <><div className="fg-overview-row"><span>{t('Before your discount', 'Vor eurem Rabatt')}</span><s>{money(gross)}</s></div><div className="fg-overview-row fg-discount-row"><b>{t('Your discount', 'Euer Rabatt')} (-{a.discount}%)</b><b>- {money(discount)}</b></div></>}
    <div className="fg-overview-row fg-overview-total"><b>{t('Your estimate', 'Eure Schätzung')}</b><b>{money(total)}</b></div>
    <p className="fg-fine">{t('Net, excl. VAT, travel & accommodation. No payment now.', 'Netto, zzgl. MwSt., Reise & Unterkunft. Jetzt keine Zahlung.')}</p>
  </section>;
}