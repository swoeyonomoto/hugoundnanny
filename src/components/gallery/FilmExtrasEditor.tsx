import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FILM_EXTRA_PRESETS, FilmExtra } from "@/lib/gallery-extras";

export default function FilmExtrasEditor({ extras, onChange }: { extras: FilmExtra[]; onChange: (extras: FilmExtra[]) => void }) {
  const update = (id: string, patch: Partial<FilmExtra>) => onChange(extras.map((item) => item.id === id ? { ...item, ...patch } : item));
  return <div className="mt-8">
    <div className="ga-photo-title"><h2>Film-Extras</h2><Button variant="outline" size="sm" onClick={() => onChange([...extras, { id: crypto.randomUUID(), title: "", description: "", price: null, enabled: true }])}><Plus size={16} />Eigenes Extra</Button></div>
    <div className="flex flex-wrap gap-2 mb-4">{FILM_EXTRA_PRESETS.filter((preset) => !extras.some((item) => item.id === preset.id)).map((preset) => <Button key={preset.id} variant="outline" size="sm" onClick={() => onChange([...extras, { ...preset, enabled: true }])}><Plus size={14} />{preset.title}</Button>)}</div>
    <div className="ga-product-list">{extras.map((extra) => <article key={extra.id}>
      <div className="ga-product-fields"><label>Titel<input value={extra.title} onChange={(event) => update(extra.id, { title: event.target.value })} /></label><label>Preis (EUR, leer = auf Anfrage)<input type="number" min="0" step="0.01" value={extra.price ?? ""} onChange={(event) => update(extra.id, { price: event.target.value === "" ? null : Math.max(0, Number(event.target.value)) })} /></label><label className="ga-wide">Beschreibung<textarea value={extra.description} onChange={(event) => update(extra.id, { description: event.target.value })} rows={2} /></label></div>
      <div className="ga-product-actions"><label className="ga-check-label"><input type="checkbox" checked={extra.enabled} onChange={(event) => update(extra.id, { enabled: event.target.checked })} />In dieser Galerie anzeigen</label><Button variant="ghost" size="icon" title="Extra entfernen" aria-label={`Entfernen: ${extra.title}`} onClick={() => onChange(extras.filter((item) => item.id !== extra.id))}><Trash2 size={16} /></Button></div>
    </article>)}</div>
  </div>;
}