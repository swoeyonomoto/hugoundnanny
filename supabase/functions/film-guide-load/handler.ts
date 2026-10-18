export const TOKEN_RE = /^[A-Za-z0-9+_-]{8,64}$/;
export const PUBLIC_FIELDS = 'names, wedding_date, location, guests, contact_via, contact, story, answers, last_step, furthest_step, lang, sent_at';

export function validToken(value: unknown): value is string {
  return typeof value === 'string' && TOKEN_RE.test(value);
}