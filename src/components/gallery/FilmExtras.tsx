import { FormEvent, useState } from "react";
import { Check, Film, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilmExtra } from "@/lib/gallery-extras";

export default function FilmExtras({ extras, couple, slug, t }: { extras: FilmExtra[]; couple: string; slug: string; t: (de: string, en: string) => string }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const visible = extras.filter((item) => item.enabled && item.title.trim());
  const chosen = visible.filter((item) => selected.includes(item.id));
  if (!visible.length) return null;
  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!chosen.length || sending) return;
    setSending(true); setError("");
    const data = new FormData(event.currentTarget);
    data.set("gallery", couple); data.set("gallery_url", `https://hugo-nanny.de/gallery/${encodeURIComponent(slug)}`);
    data.set("_subject", `Film extras - ${couple}`);
    data.set("film_extras", chosen.map((item) => `${item.title} - ${item.price === null ? "Price on request" : `EUR ${item.price.toFixed(2)}`}`).join("\n"));
    try {
      const response = await fetch("https://formspree.io/f/xgopaaqa", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error();
      setSent(true);
    } catch { setError(t("Die Anfrage konnte nicht gesendet werden. Bitte erneut versuchen.", "Your request could not be sent. Please try again.")); }
    finally { setSending(false); }
  };
  return <section id="shop" className="gal-shop">
    <header className="gal-shop-heading"><p className="gal-label">Film extras</p><h2 className="gal-h">{t("Noch mehr von ", "More of ")}<em>{t("eurer Geschichte.", "your story.")}</em></h2><p>{t("Weitere Erinnerungen aus eurem Hochzeitsfilm.", "A few more ways to keep and share your wedding memories.")}</p></header>
    <div className="gal-products">{visible.map((extra) => <article className="gal-product" key={extra.id}><div className="gal-product-copy"><Film size={24} className="mb-6" /><h3>{extra.title}</h3><p>{extra.description}</p><div className="gal-product-buy"><span>{extra.price === null ? t("Preis auf Anfrage", "Price on request") : `€${extra.price.toFixed(2)}`}</span><Button variant={selected.includes(extra.id) ? "secondary" : "outline"} onClick={() => setSelected((current) => current.includes(extra.id) ? current.filter((id) => id !== extra.id) : [...current, extra.id])}>{selected.includes(extra.id) ? <Check size={14} /> : <Plus size={14} />}{selected.includes(extra.id) ? t("Ausgewählt", "Selected") : t("Auswählen", "Select")}</Button></div></div></article>)}</div>
    {chosen.length > 0 && <div className="mt-8"><Button className="gal-dialog-submit" onClick={() => { setOpen(true); setSent(false); }}>{t("Film-Extras anfragen", "Request film extras")} ({chosen.length})</Button></div>}
    {open && <div className="gal-modal" role="dialog" aria-modal="true" aria-label={t("Film-Extras anfragen", "Request film extras")}><div className="gal-dialog"><Button variant="ghost" size="icon" className="gal-dialog-close" aria-label={t("Schließen", "Close")} onClick={() => setOpen(false)}><X /></Button>{sent ? <div className="gal-order-success"><Check size={28} /><h2>{t("Danke für eure Anfrage.", "Thank you for your request.")}</h2><p>{t("Wir melden uns mit den Details und dem Preis persönlich per E-Mail.", "We'll email you personally with the details and confirmed price.")}</p></div> : <form onSubmit={send}><h2>{t("Film-Extras anfragen", "Request film extras")}</h2><ul className="my-6 space-y-2">{chosen.map((item) => <li key={item.id}>{item.title} - {item.price === null ? t("Preis auf Anfrage", "Price on request") : `€${item.price.toFixed(2)}`}</li>)}</ul><label>{t("Eure Namen", "Your names")}<input name="names" required /></label><label>{t("E-Mail", "Email")}<input type="email" name="email" required /></label><label>{t("Notiz (optional)", "Note (optional)")}<textarea name="message" rows={3} /></label>{error && <p role="alert">{error}</p>}<Button className="gal-dialog-submit" type="submit" disabled={sending || !chosen.length}>{sending ? t("Wird gesendet…", "Sending…") : t("Anfrage senden", "Send request")}</Button></form>}</div></div>}
  </section>;
}