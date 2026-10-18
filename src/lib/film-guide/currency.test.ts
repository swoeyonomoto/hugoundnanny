import { describe, expect, it } from 'vitest';
import { convertCurrency, currencyMoney } from './currency';
describe('Film Guide currency conversion', () => {
  it('converts EUR to HKD', () => expect(convertCurrency(1000, 'EUR', 'HKD', 8.8316)).toBeCloseTo(8831.6));
  it('converts HKD back to EUR', () => expect(convertCurrency(8831.6, 'HKD', 'EUR', 8.8316)).toBeCloseTo(1000));
  it('keeps EUR unchanged', () => expect(convertCurrency(5050, 'EUR', 'EUR', 8.8316)).toBe(5050));
  it('displays HKD with an unambiguous symbol', () => expect(currencyMoney(1000, 'en', 'HKD', 8.8316)).toBe('HK$ 8,832'));
  it('rejects invalid rates', () => expect(() => convertCurrency(1000, 'EUR', 'HKD', 0)).toThrow());
});