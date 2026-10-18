import { Button } from '@/components/ui/button';
import type { GuideCurrency } from '@/lib/film-guide/currency';
import type { Language } from '@/lib/film-guide/logic';

export default function FilmGuideCurrency({ currency, onChange, lang }: { currency: GuideCurrency; onChange: (value: GuideCurrency) => void; lang: Language }) {
  const t = (en: string, de: string) => lang === 'en' ? en : de;
  return <div className="fg-currency">
    <div className="fg-currency-tools"><div className="fg-lang" role="group" aria-label={t('Currency', 'Währung')}>{(['HKD', 'EUR'] as const).map(unit => <Button variant="ghost" key={unit} className={currency === unit ? 'fg-on' : ''} aria-pressed={currency === unit} onClick={() => onChange(unit)}>{unit}</Button>)}</div>
    </div>
  </div>;
}
