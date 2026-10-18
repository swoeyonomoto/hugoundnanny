export const TOKEN_RE = /^[A-Za-z0-9+_-]{8,64}$/;
export function validToken(value: unknown): value is string {
  return typeof value === 'string' && TOKEN_RE.test(value);
}
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Preserve the uploaded function's writable fields and progress semantics.
const TEXT = { lang: 5, names: 200, location: 300, guests: 20, contact_via: 20, contact: 200, story: 5000, package_hint: 60, last_step: 30 };
export function buildUpdate(patch: Record<string, unknown>, lead: { status: string | null; furthest_step: number | null }) {
  const update: Record<string, unknown> = {};
  for (const [key, max] of Object.entries(TEXT)) {
    if (key in patch) update[key] = patch[key] == null ? null : String(patch[key]).slice(0, max);
  }
  if ('wedding_date' in patch) update.wedding_date = typeof patch.wedding_date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(patch.wedding_date) ? patch.wedding_date : null;
  if ('answers' in patch && isRecord(patch.answers)) update.answers = patch.answers;
  if ('step_times' in patch && isRecord(patch.step_times)) update.step_times = patch.step_times;
  if ('estimate_eur' in patch) update.estimate_eur = Number.isFinite(Number(patch.estimate_eur)) ? Math.round(Number(patch.estimate_eur)) : null;
  if ('furthest_step' in patch && Number.isFinite(Number(patch.furthest_step))) update.furthest_step = Math.max(lead.furthest_step ?? 0, Math.round(Number(patch.furthest_step)));
  if (lead.status === 'new') update.status = 'in progress';
  return update;
}