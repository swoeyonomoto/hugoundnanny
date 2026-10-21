import { describe, expect, it } from 'vitest';
import { offerDate, offerMoney, offerPrice, parseOffer } from './offer';

describe('custom offer', () => {
  it('45% off HK$ 30,000 is HK$ 16,500, saving HK$ 13,500', () => {
    expect(offerPrice({ price: 30000, discount_pct: 45 })).toEqual({ original: 30000, final: 16500, saved: 13500, pct: 45 });
    expect(offerMoney(16500, 'HKD', 'en')).toBe('HK$ 16,500');
  });
  it('without discount the price stays unchanged', () => {
    expect(offerPrice({ price: 30000 }).final).toBe(30000);
  });
  it('disabled offers are not shown', () => {
    expect(parseOffer({ enabled: false, price: 100 })).toBeNull();
    expect(parseOffer(null)).toBeNull();
  });
  it('defaults to HKD, one camera and allowing the full guide', () => {
    expect(parseOffer({ enabled: true, price: 100 })).toMatchObject({ currency: 'HKD', crew: 'one', allow_full_guide: true });
  });
  it('formats the valid-until date', () => {
    expect(offerDate('2026-10-31', 'en')).toBe('31 October 2026');
  });
});
