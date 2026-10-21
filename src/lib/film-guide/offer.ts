import type { Language } from './logic';

export type OfferCurrency = 'HKD' | 'EUR';
export interface CustomOffer {
  enabled: boolean; title: string; intro: string; hours?: number; crew: 'one' | 'two';
  includes?: string[]; price: number; currency: OfferCurrency; discount_pct?: number;
  valid_until?: string; allow_full_guide: boolean;
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Reads a stored offer defensively; returns null unless it is enabled and has a usable price. */
export function parseOffer(value: unknown): CustomOffer | null {
  if (!isRecord(value) || value.enabled !== true) return null;
  const price = Number(value.price);
  if (!Number.isFinite(price) || price < 0) return null;
  const hours = Number(value.hours);
  const discount = Number(value.discount_pct);
  return {
    enabled: true,
    title: typeof value.title === 'string' ? value.title : '',
    intro: typeof value.intro === 'string' ? value.intro : '',
    hours: Number.isFinite(hours) && hours > 0 ? hours : undefined,
    crew: value.crew === 'two' ? 'two' : 'one',
    includes: Array.isArray(value.includes) ? value.includes.filter((x): x is string => typeof x === 'string' && x.trim() !== '') : undefined,
    price,
    currency: value.currency === 'EUR' ? 'EUR' : 'HKD',
    discount_pct: Number.isFinite(discount) && discount > 0 ? Math.min(100, discount) : undefined,
    valid_until: typeof value.valid_until === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value.valid_until) ? value.valid_until : undefined,
    allow_full_guide: value.allow_full_guide !== false,
  };
}

export function offerPrice(offer: Pick<CustomOffer, 'price' | 'discount_pct'>) {
  const original = Math.round(offer.price);
  const pct = Math.min(100, Math.max(0, offer.discount_pct || 0));
  const final = Math.round(offer.price * (1 - pct / 100));
  return { original, final, saved: original - final, pct };
}

export function offerMoney(amount: number, currency: OfferCurrency, lang: Language) {
  return `${currency === 'HKD' ? 'HK$' : '€'} ${Math.round(amount).toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')}`;
}

export function offerDate(date: string, lang: Language) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
