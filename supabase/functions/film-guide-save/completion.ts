export const RESPONSE_HOURS = 48;
export function completionUpdate(lead: { status: string | null; sent_at: string | null }, now: string) {
  return { sent_at: lead.sent_at || now, ...(['new', 'in progress', 'sent'].includes(lead.status || '') ? { status: 'sent' } : {}) };
}
export function readyToFinish(lead: { names?: string | null; wedding_date?: string | null; contact?: string | null; last_step?: string | null; furthest_step?: number | null }) {
  return Boolean(lead.names?.trim() && lead.wedding_date && lead.contact?.trim() && lead.last_step === 'plan' && Number(lead.furthest_step) >= 11);
}
export async function notifyCompletion(lead: { names: string | null; wedding_date: string | null; location: string | null; contact: string | null; contact_via: string | null; estimate_eur: number | null; package_hint: string | null }, request: typeof fetch = fetch) {
  // Reuse the site's existing inquiry inbox. Never send the personal token or admin notes.
  const response = await request('https://formspree.io/f/xgopaaqa', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `Film Guide finished - ${lead.names || 'Couple'}`,
      names: lead.names, wedding_date: lead.wedding_date, location: lead.location,
      contact: lead.contact, contact_via: lead.contact_via,
      saved_estimate_eur: lead.estimate_eur, package: lead.package_hint,
      message: `This couple has finished their Film Guide. Reply within ${RESPONSE_HOURS} hours. Their complete choices and saved price are in your admin.`,
      admin: 'https://hugo-nanny.de/admin',
    }), signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) { console.error(`[film-guide-finish] inbox notification failed (${response.status})`); return false; }
  const result = await response.json();
  return result.ok === true;
}