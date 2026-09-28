import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, LogOut, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type Entry = { tag: string; name: string; path: string };
type GalleryConfig = {
  id: string; slug: string; dropbox_path: string; couple_name: string; wedding_date: string; location: string;
  cover_path: string | null; highlight_paths: string[]; story_label_de: string; story_label_en: string;
  story_heading_de: string; story_heading_en: string; active: boolean;
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
  const [email, setEmail] = useState("admin@feelslikeholiday.cms");
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

  const updateGallery = (field: keyof GalleryConfig, value: string | boolean | string[] | null) => {
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
    const { error } = await supabase.from("gallery_configs").update(changes).eq("id", id);
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
  if (!signedIn) return <main className="gallery-admin"><form className="ga-login" onSubmit={signIn}><img src="/photos/logo-left.png" alt="Hugo & Nanny" /><h1>Gallery Manager</h1><label>E-Mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Passwort<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{message && <p>{message}</p>}<Button type="submit">Anmelden</Button></form></main>;
  if (!allowed) return <main className="gallery-admin"><p>Dieses Konto hat keinen Admin-Zugriff.</p><Button onClick={() => supabase.auth.signOut().then(() => window.location.reload())}>Abmelden</Button></main>;

  return <main className="gallery-admin">
    <header className="ga-head"><div><img src="/photos/logo-left.png" alt="Hugo & Nanny" /><span>Gallery Manager</span></div><Button variant="ghost" size="icon" title="Abmelden" onClick={() => supabase.auth.signOut().then(() => window.location.reload())}><LogOut /></Button></header>
    <div className="ga-shell">
      <nav className="ga-nav"><h2>Galerien</h2>{galleries.map((item) => <Button key={item.id} variant={item.id === activeId ? "secondary" : "ghost"} onClick={() => setActiveId(item.id)}>{item.couple_name}</Button>)}</nav>
      <div className="ga-content">
        {message && <button className="ga-message" onClick={() => setMessage("")}>{message}</button>}
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
          <div className="ga-photo-title"><h2>Titelbild & Highlights</h2><span>{selectedCount} Highlights</span></div>
          <div className="ga-photo-grid">{photos.map((photo) => { const isCover = gallery.cover_path === photo.path; const isHighlight = gallery.highlight_paths.includes(photo.path); return <article key={photo.path} className={isCover || isHighlight ? "is-chosen" : ""}><img src={thumb(photo.path)} alt={photo.name} loading="lazy" /><div><Button size="sm" variant={isCover ? "default" : "outline"} onClick={() => updateGallery("cover_path", photo.path)}>{isCover && <Check />} Titelbild</Button><Button size="sm" variant={isHighlight ? "default" : "outline"} onClick={() => updateGallery("highlight_paths", isHighlight ? gallery.highlight_paths.filter((path) => path !== photo.path) : [...gallery.highlight_paths, photo.path])}>{isHighlight && <Check />} Highlight</Button></div></article>; })}</div>
        </section>}
        <section className="ga-section"><div className="ga-section-head"><div><p>Shop</p><h1>Produkte</h1></div></div><div className="ga-product-list">{products.map((product) => <article key={product.id}><div className="ga-product-fields"><label>Name<input value={product.title} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, title: e.target.value } : item))} /></label><label>Bild-URL<input value={product.image_url} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, image_url: e.target.value } : item))} /></label><label className="ga-wide">Beschreibung Deutsch<textarea rows={2} value={product.description_de} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, description_de: e.target.value } : item))} /></label><label className="ga-wide">Beschreibung Englisch<textarea rows={2} value={product.description_en} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, description_en: e.target.value } : item))} /></label></div><div className="ga-sizes">{parsedSizes(product.sizes).map((size, index) => <div key={`${size.label}-${index}`}><input aria-label="Größe" value={size.label} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, sizes: parsedSizes(item.sizes).map((old, i) => i === index ? { ...old, label: e.target.value } : old) } : item))} /><input aria-label="Preis" type="number" value={size.price} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, sizes: parsedSizes(item.sizes).map((old, i) => i === index ? { ...old, price: Number(e.target.value) } : old) } : item))} /></div>)}</div><div className="ga-product-actions"><label><input type="checkbox" checked={product.coming_soon} onChange={(e) => setProducts((items) => items.map((item) => item.id === product.id ? { ...item, coming_soon: e.target.checked } : item))} /> Coming soon</label><Button onClick={() => saveProduct(product)}><Save /> Speichern</Button></div></article>)}</div></section>
      </div>
    </div>
  </main>;
}