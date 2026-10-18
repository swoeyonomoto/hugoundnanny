import { useState } from 'react';
import { Calculator, ArrowLeftRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { convertCurrency, type GuideCurrency } from '@/lib/film-guide/currency';
import type { Language } from '@/lib/film-guide/logic';

export default function FilmGuideCurrency({ currency, onChange, rate, date, lang }: { currency: GuideCurrency; onChange: (value: GuideCurrency) => void; rate: number; date: string; lang: Language }) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<GuideCurrency>('EUR');
  const [amount, setAmount] = useState('1000');
  const to = from === 'EUR' ? 'HKD' : 'EUR';
  const value = Number(amount);
  const result = Number.isFinite(value) && amount !== '' ? convertCurrency(value, from, to, rate) : null;
  const t = (en: string, de: string) => lang === 'en' ? en : de;
  return <div className="fg-currency">
    <div className="fg-currency-tools"><div className="fg-lang" role="group" aria-label={t('Currency', 'Währung')}>{(['HKD', 'EUR'] as const).map(unit => <Button variant="ghost" key={unit} className={currency === unit ? 'fg-on' : ''} aria-pressed={currency === unit} onClick={() => onChange(unit)}>{unit}</Button>)}</div>
      <Button variant="ghost" className="fg-calc-toggle" title={t('Currency calculator', 'Währungsrechner')} aria-label={t('Currency calculator', 'Währungsrechner')} aria-expanded={open} onClick={() => setOpen(!open)}><Calculator size={16} /></Button></div>
    {open && <section className="fg-calculator" aria-label={t('Currency calculator', 'Währungsrechner')}><div className="fg-calculator-heading"><span className="fg-label">{t('Currency calculator', 'Währungsrechner')}</span><Button variant="ghost" aria-label={t('Close calculator', 'Rechner schließen')} onClick={() => setOpen(false)}><X size={16} /></Button></div>
      <div className="fg-conversion"><label className="fg-field"><span>{from}</span><input aria-label={`${t('Amount in', 'Betrag in')} ${from}`} type="number" min="0" step="any" value={amount} onChange={event => setAmount(event.target.value)} /></label><Button variant="ghost" title={t('Swap currencies', 'Währungen tauschen')} aria-label={t('Swap currencies', 'Währungen tauschen')} onClick={() => { if(result !== null) setAmount(String(Math.round(result * 100) / 100)); setFrom(to); }}><ArrowLeftRight size={18} /></Button><div className="fg-field"><span>{to}</span><output aria-live="polite">{result === null ? '-' : result.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US', {maximumFractionDigits: 2})}</output></div></div>
      <p className="fg-fine">1 EUR = {rate.toLocaleString('en-US', {maximumFractionDigits: 4})} HKD · {date}<br />{t('Indicative conversion. Final quote in EUR.', 'Unverbindliche Umrechnung. Finales Angebot in EUR.')}</p>
    </section>}
  </div>;
}