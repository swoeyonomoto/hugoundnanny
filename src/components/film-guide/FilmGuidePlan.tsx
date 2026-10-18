import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { estimate, formatMoney, packageFor, type GuideAnswers, type Language } from '@/lib/film-guide/logic';
import { defaultSettings } from '@/lib/film-guide/settings';
import { formattedDate, summaryRows } from '@/lib/film-guide/summary';
import { nextSteps } from '@/lib/film-guide/content';

export default function FilmGuidePlan({ answers: a, lang, onSend, sent }: { answers: GuideAnswers; lang: Language; onSend: (via: 'whatsapp' | 'email') => void; sent: boolean }) {
  const t = (en: string,de: string) => lang === 'en' ? en : de;
  const total = estimate(a);
  const pkg = packageFor(total);
  return <><div className="fg-plan"><span className="fg-label">{t('The film of','Der Film von')}</span><h3>{a.names || t('The two of you','Euch beiden')}</h3>
    <p className="fg-meta">{[formattedDate(a.date,lang),a.place,a.guests ? `${a.guests === 'under40' ? t('under 40','unter 40') : a.guests} ${t('guests','Gäste')}` : ''].filter(Boolean).join(' · ')}</p>
    <div className="fg-plan-rows">{summaryRows(a,lang).map(row => <div className="fg-plan-row" key={row.key}><span className="fg-k">{row.label}</span><span className="fg-v">{row.value}<small>{row.description}</small></span>{defaultSettings.show_price_to_client && row.amount !== undefined && <span className="fg-p">{row.amount ? formatMoney(row.amount,lang) : t('included','inklusive')}</span>}</div>)}</div>
    {defaultSettings.show_price_to_client && <><div className="fg-total"><span className="fg-label">{t('Your estimate','Eure Schätzung')}</span><span className="fg-amount">{formatMoney(total,lang)}</span></div><p className="fg-fine">{t('Net, excl. VAT, travel and accommodation. Your final quote follows our call.','Netto, zzgl. MwSt. sowie Reise- und Unterkunftskosten. Das finale Angebot bekommt ihr nach unserem Gespräch.')}</p>{pkg && <p className="fg-pkg">{t('This sits around our','Das liegt im Bereich unseres Pakets')} <b>{pkg.name}</b>{t(' package. On our call we’ll check whether a package works out better for you - we always go with the better option.','. Im Gespräch schauen wir, ob ein Paket für euch günstiger ist - wir nehmen immer die bessere Variante.')}</p>}</>}
  </div><div className="fg-next"><span className="fg-label">{t('What happens next','So geht es weiter')}</span><ol>{nextSteps.map(([en,de]) => <li key={en}>{t(en,de)}</li>)}</ol></div>
    <div className="fg-send"><Button className="fg-btn" onClick={() => onSend('whatsapp')}>{t('Send plan via WhatsApp →','Plan per WhatsApp senden →')}</Button><Button variant="outline" className="fg-btn fg-ghost" onClick={() => onSend('email')}>{t('Send via email','Per E-Mail senden')}</Button></div>
    {sent && <p role="status" className="fg-fine">{t('Thank you! We’ll be in touch within 24 hours.','Danke! Wir melden uns innerhalb von 24 Stunden.')}</p>}<p className="fg-fine"><Link to="/privacy">{t('Privacy policy','Datenschutzerklärung')}</Link></p>
  </>;
}