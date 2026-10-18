import { buildUpdate, isRecord, validToken } from './handler.ts';

function equal(actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
Deno.test('accepts Joey + Seli custom save token', () => {
  equal(validToken('joey_+_seli_v01'), true);
});
Deno.test('accepts Sheetal + Amal custom save token', () => {
  equal(validToken('sheetal_+_amal_v01'), true);
});
Deno.test('preserves legacy random tokens and rejects malformed tokens', () => {
  equal(validToken('gtHy3G79iZqZaXKhAGRKtb3r'), true);
  for (const token of [null, {}, [], 42, '', 'short', '../joey_+_seli_v01', 'a'.repeat(65)]) equal(validToken(token), false);
});
Deno.test('saves chapter 5 progress and transitions new couple to in progress', () => {
  equal(buildUpdate({ last_step: 'days', furthest_step: 5 }, { status: 'new', furthest_step: 0 }), { last_step: 'days', furthest_step: 5, status: 'in progress' });
});
Deno.test('returning to an earlier chapter does not erase progress', () => {
  equal(buildUpdate({ furthest_step: 2 }, { status: 'in progress', furthest_step: 5 }).furthest_step, 5);
});
Deno.test('couple saves cannot overwrite admin-only top-level fields or booked status', () => {
  equal(buildUpdate({ status: 'lost', admin_note: 'overwrite', token: 'different', id: 'different' }, { status: 'booked', furthest_step: 5 }), {});
});
Deno.test('rejects arrays and null as patch objects', () => {
  equal(isRecord([]), false); equal(isRecord(null), false); equal(isRecord({}), true);
});