import { validToken, PUBLIC_FIELDS } from './handler.ts';

Deno.test('allows Sheetal and Joey custom couple links', () => {
  for (const token of ['sheetal_+_amal_v01', 'joey_+_seli_v01']) {
    if (!validToken(token)) throw new Error('Custom couple link rejected');
  }
});
Deno.test('retains existing random links and rejects malformed input', () => {
  if (!validToken('6KegTcKjLeKKA2A8e3XmGWFp')) throw new Error('Random link rejected');
  for (const token of [null, 42, {}, '', 'short', '../joey_+_seli_v01', 'a'.repeat(65)]) {
    if (validToken(token)) throw new Error('Invalid token accepted');
  }
});
Deno.test('returns public settings but never admin notes or internal fields', () => {
  if (!PUBLIC_FIELDS.split(', ').includes('answers') || !PUBLIC_FIELDS.split(', ').includes('names')) throw new Error('Couple settings missing');
  for (const field of ['admin_note', 'created_by', 'token', 'id']) {
    if (PUBLIC_FIELDS.split(', ').includes(field)) throw new Error('Private field exposed');
  }
});