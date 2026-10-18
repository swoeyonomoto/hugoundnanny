import { chapterIds, estimate, initialAnswers, packageFor, type GuideAnswers, type Language } from './logic';
import { defaultSettings, type GuideSettings } from './settings';
export const leadStatuses = ['new','in progress','sent','contacted','call booked','booked','lost'] as const;
export const linkSources = ['link','facebook','whatsapp','manual'] as const;
export const clipLimit = 15 * 1024 * 1024;
export function newLeadToken() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789';
  let token = '';
  while (token.length < 24) for (const n of crypto.getRandomValues(new Uint8Array(32))) { if (n < 240 && token.length < 24) token += alphabet[n % alphabet.length]; }
  return token;
}
// Admin-chosen readable link names, e.g. "joel_+_selina_v01"; same rules as the database check.
export function customLeadToken(raw: string) {
  const slug = raw.trim().replace(/\s+/g, '_').replace(/[^A-Za-z0-9+_-]/g, '').replace(/([_+-])\1+/g, '$1');
  return /^[A-Za-z0-9+_-]{8,64}$/.test(slug) ? slug : null;
}
// Suggests a readable link name from the couple's names, e.g. "Sheetal + Amal" -> "sheetal_+_amal_v01".
export function suggestLeadSlug(names: string) {
  const base = names.trim().toLowerCase().replace(/\s*&\s*/g, ' + ').replace(/\s+und\s+/g, ' + ').replace(/\s+and\s+/g, ' + ');
  const slug = customLeadToken(`${base}_v01`);
  return slug || '';
}
export function validClip(file: Pick<File,'name'|'size'>) { return /\.(mp4|webm)$/i.test(file.name) && file.size <= clipLimit; }
export function followUp(lead: {sent_at: string|null; contact: string|null; names: string|null; updated_at: string}, now = Date.now()) { return !lead.sent_at && Boolean(lead.contact || lead.names) && now - Date.parse(lead.updated_at) > 86400000; }
export function restoreAnswers(lead: { answers?: unknown; names?: string|null; wedding_date?: string|null; location?: string|null; guests?: string|null; contact_via?: string|null; contact?: string|null; story?: string|null }): GuideAnswers {
  const a = { ...initialAnswers, ...(lead.answers && typeof lead.answers === 'object' ? lead.answers : {}) } as GuideAnswers;
  return {...a, names:lead.names ?? a.names,date:lead.wedding_date ?? a.date,place:lead.location ?? a.place,guests:lead.guests ?? a.guests,contactVia:lead.contact_via === 'email' ? 'email' : a.contactVia,contact:lead.contact ?? a.contact,story:lead.story ?? a.story};
}
// Couple choices can be recovered locally; the discount always belongs to the saved admin configuration.
export function withLeadDiscount(answers: GuideAnswers, lead: { answers?: unknown }): GuideAnswers {
  const value = Number(restoreAnswers(lead).discount);
  return {...answers,discount:Number.isFinite(value) ? Math.min(100,Math.max(0,value)) : 0};
}
export function restoreSessionAnswers(lead: Parameters<typeof restoreAnswers>[0], draft?: Parameters<typeof restoreAnswers>[0]): GuideAnswers {
  return withLeadDiscount(restoreAnswers(draft ?? lead),lead);
}
export function leadPatch(a: GuideAnswers, lang: Language, step: number, furthest: number, times: Record<string,number>, settings: GuideSettings = defaultSettings) {
  const total = estimate(a,settings);
  return { lang,names:a.names,wedding_date:a.date || null,location:a.place,guests:a.guests,contact_via:a.contactVia,contact:a.contact,story:a.story,answers:a,estimate_eur:total,package_hint:packageFor(total,settings)?.name ?? null,last_step:chapterIds[step],furthest_step:Math.max(step,furthest),step_times:times };
}
export function mergeSettings(value: unknown): GuideSettings {
  const merge = (base: unknown, incoming: unknown): unknown => {
    if (Array.isArray(base)) return Array.isArray(incoming) ? incoming : base;
    if (base && typeof base === 'object') return Object.fromEntries(Object.entries(base).map(([k,v]) => [k,merge(v,incoming && typeof incoming === 'object' ? (incoming as Record<string,unknown>)[k] : undefined)]));
    return typeof incoming === typeof base ? incoming : base;
  };
  return merge(defaultSettings,value) as GuideSettings;
}
