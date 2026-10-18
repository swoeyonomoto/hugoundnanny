import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { discountAmount, estimate, formatMoney, packageFor, subtotal, type GuideAnswers, type Language } from '@/lib/film-guide/logic';
import { defaultSettings, type GuideSettings } from '@/lib/film-guide/settings';
import { formattedDate, summaryRows } from '@/lib/film-guide/summary';
import { nextSteps } from '@/lib/film-guide/content';

export default function FilmGuidePlan({ answers: a, lang, onFinish, sent, settings = defaultSettings, readOnly = false, sending = false, formatAmount }: { answers: GuideAnswers; lang: Language; onFinish?: () => void; sent: boolean; settings?: GuideSettings; readOnly?: boolean; sending?: boolean; formatAmount?: (amount: number) => string }) {
  const t = (en: string,de: string) => lang === 'en' ? en : de;
  const total = estimate(a,settings);
  const gross = subtotal(a,settings);
  const discount = discountAmount(a,settings);
  const pkg = packageFor(total,settings);
  const money = formatAmount ?? ((amount: number) => formatMoney(amount,lang));
  return <><div className="fg-plan"><span className="fg-label">{t('The film of','Der Film von')}</span><h3>{a.names || t('The two of you','Euch beiden')}</h3>
    <p className="fg-meta">{[formattedDate(a.date,lang),a.place,a.guests ? `${a.guests === 'under40' ? t('under 40','unter 40') : a.guests} ${t('guests','Gäste')}` : ''].filter(Boolean).join(' · ')}</p>
    <div className="fg-plan-rows">{summaryRows(a,lang,settings).map(row => <div className="fg-plan-row" key={row.key}><span className="fg-k">{row.label}</span><span className="fg-v">{row.value}<small>{row.description}</small></span>{settings.show_price_to_client && row.amount !== undefined && <span className="fg-p">{row.amount ? money(row.amount) : t('included','inklusive')}</span>}</div>)}</div>
    {settings.show_price_to_client && <><div className="fg-total"><span className="fg-label">{t('Your estimate','Eure Schätzung')}</span><span className="fg-amount">{discount > 0 && <s className="fg-gross">{money(gross)}</s>}<span key={total} className={discount > 0 ? 'fg-num-discounted' : ''}>{money(total)}</span>{discount > 0 && <em className="fg-discount-tag">{t('Your discount','Euer Rabatt')} -{a.discount}%</em>}</span></div><p className="fg-fine">{t('Net, excl. VAT. All travel and accommodation costs are included. Your final quote follows our call.','Netto, zzgl. MwSt. Alle Reise- und Unterkunftskosten sind enthalten. Das finale Angebot bekommt ihr nach unserem Gespräch.')}</p>{pkg && <p className="fg-pkg">{t('This sits around our','Das liegt im Bereich unseres Pakets')} <b>{pkg.name}</b>{t(' package. On our call we’ll check whether a package works out better for you - we always go with the better option.','. Im Gespräch schauen wir, ob ein Paket für euch günstiger ist - wir nehmen immer die bessere Variante.')}</p>}</>}
  </div><div className="fg-next"><span className="fg-label">{t('What happens next','So geht es weiter')}</span><ol>{nextSteps.map(([en,de]) => <li key={en}>{t(en,de)}</li>)}</ol></div>
    {!readOnly && !sent && <div className="fg-send"><Button disabled={sending} className="fg-btn fg-finish" onClick={onFinish}>{sending ? <Loader2 size={18} className="fg-finishing" /> : <Check size={18} />}{sending ? t('Finishing…','Wird abgeschlossen…') : t('Finish','Abschließen')}</Button></div>}
    {!readOnly && sent && <div role="status" className="fg-received"><Check size={32} strokeWidth={1.5} /><h3>{t('All received. Thank you!','Alles angekommen. Danke!')}</h3><p>{t('We’ll get back to you within the next 48 hours.','Wir melden uns innerhalb der nächsten 48 Stunden bei euch.')}</p></div>}<p className="fg-fine"><Link to="/privacy">{t('Privacy policy','Datenschutzerklärung')}</Link></p>
  </>;
}