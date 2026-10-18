import { Button } from "@/components/ui/button";

export interface GuideOption { id: string; title: string; description?: string; tag?: string; hours?: string; price?: string; clip?: boolean; locked?: boolean; }

export function GuideChoices({ label, options, selected, onChange, multi = false, compact = false, onPreview }: {
  label: string; options: GuideOption[]; selected: string[]; onChange: (id: string) => void; multi?: boolean; compact?: boolean; onPreview?: (id: string | null) => void;
}) {
  return <fieldset className="fg-q"><legend className="fg-label">{label}</legend>
    <div className={`fg-opts${multi ? " fg-multi" : ""}${compact ? " fg-row" : ""}`} onMouseLeave={() => onPreview?.(null)}>
      {options.map(option => <Button key={option.id} variant="ghost" className={`fg-opt${selected.includes(option.id) || option.locked ? " fg-on" : ""}${option.clip ? " fg-has-clip" : ""}${option.locked ? " fg-locked" : ""}`}
        role={multi ? "checkbox" : "radio"} aria-checked={selected.includes(option.id) || Boolean(option.locked)} aria-disabled={option.locked}
        onClick={() => { if (!option.locked) onChange(option.id); }} onMouseEnter={() => { if (window.matchMedia("(pointer: fine)").matches) onPreview?.(option.id); }}>
        <span className="fg-opt-head"><span className="fg-opt-title">{option.title}</span>{option.price && <span className="fg-opt-price">{option.price}</span>}</span>
        {option.hours && <span className="fg-opt-hours">{option.hours}</span>}
        {option.description && <span className="fg-opt-desc">{option.description}</span>}
        {option.tag && <span className="fg-opt-tag">{option.tag}</span>}
      </Button>)}
    </div>
  </fieldset>;
}

export function GuideField({ label, value, onChange, type = "text", placeholder, multiline = false, error = false }: {
  label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; multiline?: boolean; error?: boolean;
}) {
  return <label className={`fg-field${error ? ' fg-err' : ''}`}><span>{label}</span>{multiline ? <textarea value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} /> : <input type={type} value={value} aria-invalid={error} placeholder={placeholder} onChange={e => onChange(e.target.value)} />}</label>;
}

export function GuideStepper({ label, value, onChange, detail, description }: { label: string; value: number; onChange: (n: number) => void; detail?: string; description?: string }) {
  return <div className="fg-q"><span className="fg-label">{label}</span><div className="fg-stepper">{description && <span className="fg-opt-desc">{description}</span>}<div className="fg-stepper-ctl">
    <Button variant="ghost" aria-label="−" disabled={value === 0} onClick={() => onChange(Math.max(0, value - 1))}>−</Button>
    <output className="fg-stepper-val">{value}</output><Button variant="ghost" aria-label="+" onClick={() => onChange(value + 1)}>+</Button>
  </div>{detail && <span className="fg-opt-price">{detail}</span>}</div></div>;
}