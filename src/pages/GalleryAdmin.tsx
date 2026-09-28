import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, LogOut, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Film, parseFilms } from "@/components/gallery/FilmView";

type Entry = { tag: string; name: string; path: string };
type GalleryConfig = {
  id: string; slug: string; dropbox_path: string; couple_name: string; wedding_date: string; location: string;
  cover_path: string | null; highlight_paths: string[]; story_label_de: string; story_label_en: string;
  story_heading_de: string; story_heading_en: string; active: boolean;
  has_photos?: boolean; films?: unknown; film_image_paths?: string[];
};
type Size = { label: string; price: number };
type Product = { id: string; slug: string; title: string; description_de: string; description_en: string; image_url: string; sizes: unknown; coming_soon: boolean; active: boolean; sort_index: number };

const FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dropbox-media`;
const thumb = (path: string) => `${FN}?mode=thumb&size=w480h320&path=${encodeURIComponent(path)}`;
const isImage = (name: string) => /\.(jpe?g|png|webp|heic)$/i.test(name);

async function listDropbox(path: string) {
  const output: Entry[] = [];
  let cursor: string | null = null;
  do {
    const { data, error } = await supabase.functions.invoke("dropbox-list", { body: cursor ? { cursor } : { path } });
    if (error) throw error;
    output.push(...data.entries);
    cursor = data.hasMore ? data.cursor : null;
  } while (cursor);
  return output;
}

export default function GalleryAdmin() {
  const [sessionReady, setSessionReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [galleries, setGalleries] = useState<GalleryConfig[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeId, setActiveId] = useState("");
  const [photos, setPhotos] = useState<Entry[]>([]);
  const gallery = galleries.find((item) => item.id === activeId);

  const load = async () => {
    const [{ data: galleryData }, { data: productData }] = await Promise.all([
      supabase.from("gallery_configs").select("*").order("created_at"),
      supabase.from("gallery_products").select("*").order("sort_index"),
    ]);
    setGalleries(galleryData ?? []);
    setProducts(productData ?? []);
    setActiveId((current) => current || galleryData?.[0]?.id || "");
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const hasSession = Boolean(data.session);
      setSignedIn(hasSession);
      if (hasSession) {
        const { data: role } = await supabase.from("user_roles").select("id").eq("role", "admin").maybeSingle();
        setAllowed(Boolean(role));
        if (role) await load();
      }
      setSessionReady(true);
    });
  }, []);

  useEffect(() => {
    if (!gallery) return;
    Promise.all([listDropbox(gallery.dropbox_path), listDropbox(gallery.dropbox_path).then((items) => Promise.all(items.filter((item) => item.tag === "folder").map((folder) => listDropbox(folder.path)))).then((groups) => groups.flat())])
      .then(([, nested]) => setPhotos(nested.filter((item) => item.tag === "file" && isImage(item.name))))
      .catch(() => setPhotos([]));
  }, [gallery?.id, gallery?.dropbox_path]);

  const updateGallery = (field: keyof GalleryConfig, value: string | boolean | string[] | Film[] | null) => {
    if (!gallery) return;
    setGalleries((items) => items.map((item) => item.id === gallery.id ? { ...item, [field]: value } : item));
  };

  const signIn = async (event: FormEvent) => {
    event.preventDefault(); setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMessage("Anmeldung fehlgeschlagen."); return; }
    window.location.reload();
  };

  const saveGallery = async () => {
    if (!gallery) return;
    const { id, ...changes } = gallery;
    const { error } = await supabase.from("gallery_configs").update(changes as never).eq("id", id);
    setMessage(error ? "Galerie konnte nicht gespeichert werden." : "Galerie gespeichert.");
  };

  const saveProduct = async (product: Product) => {
    const { id, sizes, ...rest } = product;
    const { error } = await supabase.from("gallery_products").update({ ...rest, sizes: sizes as never }).eq("id", id);
    setMessage(error ? "Produkt konnte nicht gespeichert werden." : `${product.title} gespeichert.`);
  };

  const parsedSizes = (value: unknown): Size[] => Array.isArray(value) ? value.filter((item): item is Size => Boolean(item) && typeof item === "object" && "label" in item && "price" in item) : [];
  const selectedCount = useMemo(() => gallery?.highlight_paths.length ?? 0, [gallery]);

  if (!sessionReady) return <main className="gallery-admin"><p>Lädt …</p></main>;
  if (!signedIn) return <main className="gallery-admin"><form className="ga-login" onSubmit={signIn}><img src="/photos/logo-left.png" alt="Hugo + Nanny" /><h1>Gallery Manager</h1><label>E-Mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Passwort<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{message && <p>{message}</p>}<Button type="submit">Anmelden</Button></form></main>;
  if (!allowed) return <main className="gallery-admin"><p>Dieses Konto hat keinen Admin-Zugriff.</p><Button onClick={() => supabase.auth.signOut().then(() => window.location.reload())}>Abmelden</Button></main>;

  return <main className="gallery-admin">
    <header className="ga-head"><div><img src="/photos/logo-left.png" alt="Hugo + Nanny" /><span>Gallery Manager</span></div><Button variant="ghost" size="icon" title="Abmelden" onClick={() => supabase.auth.signOut().then(() => window.location.reload())}><LogOut /></Button></header>
    <div className="ga-shell">
      <nav className="ga-nav"><h2>Galerien</h2>{galleries.map((item) => <Button key={item.id} variant={item.id === activeId ? "secondary" : "ghost"} onClick={() => setActiveId(item.id)}>{item.couple_name}</Button>)}</nav>
      <div className="ga-content">
        {message && <button className="ga-message" onClick={() => setMessage("")}>{message}</button>}
        <AccountSettings onMessage={setMessage} />
        {gallery && <section className="ga-section"><div className="ga-section-head"><div><p>Galerie</p><h1>{gallery.couple_name}</h1></div><Button onClick={saveGallery}><Save /> Speichern</Button></div>
          <div className="ga-form-grid">
            <label>Name<input value={gallery.couple_name} onChange={(e) => updateGallery("couple_name", e.target.value)} /></label>
            <label>Datum<input value={gallery.wedding_date} onChange={(e) => updateGallery("wedding_date", e.target.value)} /></label>
            <label>Ort<input value={gallery.location} onChange={(e) => updateGallery("location", e.target.value)} /></label>
            <label>URL-Name<input value={gallery.slug} onChange={(e) => updateGallery("slug", e.target.value)} /></label>
            <label>Dropbox-Ordner<input value={gallery.dropbox_path} onChange={(e) => updateGallery("dropbox_path", e.target.value)} /></label>
            <label className="ga-check-label"><input type="checkbox" checked={gallery.active} onChange={(e) => updateGallery("active", e.target.checked)} /> Galerie aktiv</label>
            <label>Label Deutsch<input value={gallery.story_label_de} onChange={(e) => updateGallery("story_label_de", e.target.value)} /></label>
            <label>Label Englisch<input value={gallery.story_label_en} onChange={(e) => updateGallery("story_label_en", e.target.value)} /></label>
            <label className="ga-wide">Überschrift Deutsch<input value={gallery.story_heading_de} onChange={(e) => updateGallery("story_heading_de", e.target.value)} /></label>
            <label className="ga-wide">Überschrift Englisch<input value={gallery.story_heading_en} onChange={(e) => updateGallery("story_heading_en", e.target.value)} /></label>
          </div>
          <label className="ga-check-label"><input type="checkbox" checked={gallery.has_photos !== false} onChange={(e) => updateGallery("has_photos", e.target.checked)} /> Foto-Galerie anzeigen (aus = nur Film)</label>
          <div className="ga-photo-title"><h2>Filme (Wistia)</h2><Button size="sm" variant="outline" onClick={() => updateGallery("films", [...parseFilms(gallery.films), { id: `f${Date.now()}`, kind: "highlight", title: "", url: "" }])}>+ Film</Button></div>
          <div className="ga-product-list">{parseFilms(gallery.films).map((film, index) => { const set = (patch: Partial<Film>) => updateGallery("films", parseFilms(gallery.films).map((f, i) => i === index ? { ...f, ...patch } : f)); return <article key={film.id}><div className="ga-product-fields">
            <label>Typ<select value={film.kind} onChange={(e) => set({ kind: e.target.value as Film["kind"] })}><option value="highlight">Highlight-Film</option><option value="film">Weiterer Film</option><option value="reel">Reel (hochkant)</option></select></label>
            <label>Titel<input value={film.title} onChange={(e) => set({ title: e.target.value })} /></label>
            <label className="ga-wide">Wistia-Link oder ID<input value={film.url} placeholder="https://….wistia.com/medias/abc123" onChange={(e) => set({ url: e.target.value })} /></label>
          </div><div className="ga-product-actions"><span /><Button size="sm" variant="outline" onClick={() => updateGallery("films", parseFilms(gallery.films).filter((_, i) => i !== index))}>Entfernen</Button></div></article>; })}</div>
          <div className="ga-photo-title"><h2>Titelbild, Highlights & Film-Bilder</h2><span>{selectedCount} Highlights · {gallery.film_image_paths?.length ?? 0} Film-Bilder</span></div>
          <div className="ga-photo-grid">{photos.map((photo) => { const isCover = gallery.cover_path === photo.path; const isHighlight = gallery.highlight_paths.includes(photo.path); const filmImgs = gallery.film_image_paths ?? []; const isFilmImg = filmImgs.includes(photo.path); return <article key={photo.path} className={isCover || isHighlight || isFilmImg ? "is-chosen" : ""}><img src={thumb(photo.path)} alt={photo.name} loading="lazy" /><div><Button size="sm" variant={isCover ? "default" : "outline"} onClick={() => updateGallery("cover_path", photo.path)}>{isCover && <Check />} Titelbild</Button><Button size="sm" variant={isHighlight ? "default" : "outline"} onClick={() => updateGallery("highlight_paths", isHighlight ? gallery.highlight_paths.filter((path) => path !== photo.path) : [...gallery.highlight_paths, photo.path])}>{isHighlight && <Check />} Highlight</Button><Button size="sm" variant={isFilmImg ? "default" : "outline"} onClick={() => updateGallery("film_image_paths", isFilmImg ? filmImgs.filter((p) => p !== photo.path) : [...filmImgs, photo.path])}>{isFilmImg && <Check />} Film-Bild</Button></div></article>; })}</div>
        </section>}
        <section className="ga-section"><div className="ga-section-head"><div><p>Shop</p><h1>Produkte</h1></div></div><div className="ga-product-list">{products.map((product) => <article key={product.id}><div className="ga-product-fields"><label>Name<input value={product.title} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, title: e.target.value } : item))} /></label><label>Bild-URL<input value={product.image_url} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, image_url: e.target.value } : item))} /></label><label className="ga-wide">Beschreibung Deutsch<textarea rows={2} value={product.description_de} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, description_de: e.target.value } : item))} /></label><label className="ga-wide">Beschreibung Englisch<textarea rows={2} value={product.description_en} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, description_en: e.target.value } : item))} /></label></div><div className="ga-sizes">{parsedSizes(product.sizes).map((size, index) => <div key={`${size.label}-${index}`}><input aria-label="Größe" value={size.label} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, sizes: parsedSizes(item.sizes).map((old, i) => i === index ? { ...old, label: e.target.value } : old) } : item))} /><input aria-label="Preis" type="number" value={size.price} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, sizes: parsedSizes(item.sizes).map((old, i) => i === index ? { ...old, price: Number(e.target.value) } : old) } : item))} /></div>)}</div><div className="ga-product-actions"><label><input type="checkbox" checked={product.coming_soon} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, coming_soon: e.target.checked } : item))} /> Coming soon</label><Button onClick={() => saveProduct(product)}><Save /> Speichern</Button></div></article>)}</div></section>
      </div>
    </div>
  </main>;
}

function AccountSettings({ onMessage }: { onMessage: (m: string) => void }) {
  const [current, setCurrent] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setCurrent(data.user?.email ?? "")); }, []);

  const saveEmail = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ email: newEmail }, { emailRedirectTo: `${window.location.origin}/gallery-admin` });
    onMessage(error ? `E-Mail konnte nicht geändert werden: ${error.message}` : "Bestätigungslink an die neue E-Mail gesendet. Erst nach Klick ist sie aktiv.");
    if (!error) setNewEmail("");
  };

  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPw.length < 8) return onMessage("Passwort muss mindestens 8 Zeichen haben.");
    if (newPw !== newPw2) return onMessage("Passwörter stimmen nicht überein.");
    const { error: loginError } = await supabase.auth.signInWithPassword({ email: current, password: currentPw });
    if (loginError) return onMessage("Aktuelles Passwort ist falsch.");
    const { error } = await supabase.auth.updateUser({ password: newPw });
    onMessage(error ? `Passwort konnte nicht geändert werden: ${error.message}` : "Passwort geändert.");
    if (!error) { setCurrentPw(""); setNewPw(""); setNewPw2(""); }
  };

  return <section className="ga-section">
    <div className="ga-section-head"><div><p>Konto</p><h1>Login-Daten</h1></div></div>
    <p>Aktuelle E-Mail: <strong>{current}</strong></p>
    <form className="ga-form-grid" onSubmit={saveEmail}>
      <label className="ga-wide">Neue E-Mail<input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /></label>
      <Button type="submit"><Save /> E-Mail ändern</Button>
    </form>
    <form className="ga-form-grid" onSubmit={savePassword} style={{ marginTop: 24 }}>
      <label>Aktuelles Passwort<input type="password" required value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} /></label>
      <label>Neues Passwort<input type="password" required value={newPw} onChange={(e) => setNewPw(e.target.value)} /></label>
      <label>Neues Passwort wiederholen<input type="password" required value={newPw2} onChange={(e) => setNewPw2(e.target.value)} /></label>
      <Button type="submit"><Save /> Passwort ändern</Button>
    </form>
  </section>;
}