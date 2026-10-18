import type { Language } from './logic';

export type GuideCurrency = 'HKD' | 'EUR';
export const referenceRate = { rate: 8.8316, date: '2026-10-16' };
export function convertCurrency(amount: number, from: GuideCurrency, to: GuideCurrency, rate: number) {
  if (!Number.isFinite(rate) || rate <= 0) throw new Error('Invalid exchange rate');
  return from === to ? amount : from === 'EUR' ? amount * rate : amount / rate;
}
export function currencyMoney(eur: number, lang: Language, currency: GuideCurrency, rate: number) {
  const amount = convertCurrency(eur, 'EUR', currency, rate);
  return `${currency === 'HKD' ? 'HK$' : '€'} ${Math.round(amount).toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')}`;
}