import { useState } from 'react';
import { Copy, ExternalLink, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OfferPrice } from './FilmGuideOffer';
import type { CustomOffer } from '@/lib/film-guide/offer';

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export function initialOffer(stored: unknown, discount: number, enable = false): CustomOffer & { includesText: string } {
  const o = isRecord(stored) ? stored : {};
  const includes = Array.isArray(o.includes) ? o.includes.filter((x): x is string => typeof x === 'string') : [];
  return {
    enabled: enable || o.enabled === true, title: String(o.title ?? ''), intro: String(o.intro ?? ''),
    hours: Number(o.hours) || undefined, crew: o.crew === 'two' ? 'two' : 'one', includes,
    price: Number(o.price) || 0, currency: o.currency === 'EUR' ? 'EUR' : 'HKD',
    discount_pct: o.discount_pct !== undefined ? Number(o.discount_pct) || 0 : discount,
    valid_until: typeof o.valid_until === 'string' ? o.valid_until : '', allow_full_guide: o.allow_full_guide !== false,
    includesText: includes.join('\n'),
  };
}

export default function FilmGuideOfferEditor({ stored, discount, names, link, autoEnable, onSave, onCopy }: {
  stored: unknown; discount: number; names: string; link: string; autoEnable?: boolean;
  onSave: (offer: CustomOffer) => void; onCopy: (text: string) => void;
}) {
  const [d, setD] = useState(() => initialOffer(stored, discount, autoEnable));
  const set = <K extends keyof typeof d>(k: K, v: (typeof d)[K]) => setD(old => ({ ...old, [k]: v }));
  const save = () => {
    const { includesText, ...rest } = d;
    const offer: CustomOffer = { ...rest, includes: includesText.split('\n').map(x => x.trim()).filter(Boolean) };
    if (!offer.hours) delete offer.hours;
    if (!offer.valid_until) delete offer.valid_until;
    if (!offer.discount_pct) delete offer.discount_pct;
    onSave(offer);
  };
  return <section className="fga-offer" id="fga-offer">
    <h3>Custom offer</h3>
    <label className="fga-check"><input type="checkbox" checked={d.enabled} onChange={e => set('enabled', e.target.checked)} /> Offer active</label>
    <div className="fga-form">
      <label>Title<input value={d.title} placeholder="Your wedding film – 3 hours" onChange={e => set('title', e.target.value)} /></label>
      <label>Intro<textarea value={d.intro} onChange={e => set('intro', e.target.value)} /></label>
      <label>Hours<input type="number" min={0} value={d.hours ?? ''} onChange={e => set('hours', Number(e.target.value) || undefined)} /></label>
      <label>Crew<select value={d.crew} onChange={e => set('crew', e.target.value === 'two' ? 'two' : 'one')}><option value="one">1 camera</option><option value="two">2 cameras</option></select></label>
      <label>Includes (one per line)<textarea value={d.includesText} onChange={e => set('includesText', e.target.value)} /></label>
      <label>Price before discount<input type="number" min={0} value={d.price || ''} onChange={e => set('price', Math.max(0, Number(e.target.value) || 0))} /></label>
      <label>Currency<select value={d.currency} onChange={e => set('currency', e.target.value === 'EUR' ? 'EUR' : 'HKD')}><option>HKD</option><option>EUR</option></select></label>
      <label>Discount %<input type="number" min={0} max={100} value={d.discount_pct ?? 0} onChange={e => set('discount_pct', Math.min(100, Math.max(0, Number(e.target.value) || 0)))} /></label>
      <label>Valid until<input type="date" value={d.valid_until ?? ''} onChange={e => set('valid_until', e.target.value)} /></label>
      <label className="fga-check"><input type="checkbox" checked={d.allow_full_guide} onChange={e => set('allow_full_guide', e.target.checked)} /> Allow full guide</label>
    </div>
    <div className="film-guide-page"><OfferPrice offer={{ ...d, valid_until: d.valid_until || undefined }} lang="en" /></div>
    <div className="fga-actions">
      <Button onClick={save}><Save size={16} /> Save offer</Button>
      <Button variant="outline" onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}><ExternalLink size={16} /> Open couple page</Button>
      <Button variant="outline" onClick={() => onCopy(`Hi ${names || 'you two'}! 🤍 Here's your custom offer for your wedding film: ${link}`)}><Copy size={16} /> Copy WhatsApp text</Button>
    </div>
  </section>;
}
