import JSZip from "jszip";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, Download, Heart, Menu, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import dibondImage from "@/assets/gallery-dibond.jpg";
import bookImage from "@/assets/gallery-book.jpg";
import acrylicImage from "@/assets/gallery-acrylic.jpg";
import printsImage from "@/assets/gallery-prints.jpg";
import framesImage from "@/assets/gallery-frames.jpg";
import deckledImage from "@/assets/gallery-deckled.jpg";

const GALLERIES: Record<string, { path: string; couple: string; date: string; location: string; cover?: string | null; highlights?: string[]; labelDe?: string; labelEn?: string; headingDe?: string; headingEn?: string }> = {
  "karo-amir": { path: "/2026/karo_amir", couple: "Karo & Amir", date: "2026", location: "" },
};

const FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dropbox-media`;
const img = (path: string, size = "w960h640") =>
  `${FN}?mode=thumb&size=${size}&path=${encodeURIComponent(path)}`;
const original = (path: string) => `${FN}?mode=original&path=${encodeURIComponent(path)}`;

type Entry = { tag: string; name: string; path: string };
type ProductId = string;
type ProductSize = { label: string; price: number };
type Product = { id: ProductId; title: string; description: string; image: string; sizes: ProductSize[]; comingSoon?: boolean };
type CartItem = { id: string; productId: ProductId; title: string; option: string; quantity: number; unitPrice: number; photos: Entry[] };

const PRODUCT_IMAGES: Record<string, string> = { prints: printsImage, "print-pack": printsImage, frames: framesImage, canvas: framesImage, "deckled-prints": deckledImage, "metal-prints": acrylicImage, "dibond-prints": dibondImage, "everyday-albums": bookImage, "hardcover-book": bookImage, "lay-flat-albums": bookImage };
const FALLBACK_PRODUCTS: Product[] = [
  { id: "prints", title: "Prints", description: "Classic fine-art prints on premium photographic paper.", image: printsImage, sizes: [{ label: "10 × 15 cm", price: 8 }] },
  { id: "dibond-prints", title: "Dibond Prints", description: "A refined, lightweight wall piece with a clean frameless finish.", image: dibondImage, sizes: [{ label: "20 × 30 cm", price: 89 }] },
  { id: "hardcover-book", title: "Hardcover Book", description: "A timeless coffee-table book made for your story.", image: bookImage, sizes: [{ label: "Configurator coming soon", price: 0 }], comingSoon: true },
];

async function list(path: string): Promise<Entry[]> {
  const out: Entry[] = [];
  let cursor: string | null = null;
  do {
    const { data, error } = await supabase.functions.invoke("dropbox-list", { body: cursor ? { cursor } : { path } });
    if (error) throw error;
    out.push(...data.entries);
    cursor = data.hasMore ? data.cursor : null;
  } while (cursor);
  return out;
}

const isImg = (n: string) => /\.(jpe?g|png|webp|heic)$/i.test(n);

async function download(e: Entry) {
  const res = await fetch(original(e.path));
  const blob = await res.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = e.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

const GalleryContent = () => {
  const { t } = useLang();
  const { slug = "" } = useParams();
  const [gallery, setGallery] = useState(GALLERIES[slug]);
  const g = gallery;
  const [folders, setFolders] = useState<Entry[]>([]);
  const [covers, setCovers] = useState<Record<string, Entry[]>>({});
  const [open, setOpen] = useState<Entry | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [selectionName, setSelectionName] = useState("");
  const [selectionNote, setSelectionNote] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [pendingProduct, setPendingProduct] = useState<ProductId | null>(null);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [productOptions, setProductOptions] = useState<Record<ProductId, string>>({});
  const [productOpen, setProductOpen] = useState<ProductId | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [sendingOrder, setSendingOrder] = useState(false);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.from("gallery_configs").select("slug, dropbox_path, couple_name, wedding_date, location, cover_path, highlight_paths, story_label_de, story_label_en, story_heading_de, story_heading_en").eq("slug", slug).eq("active", true).maybeSingle().then(({ data }) => {
      if (!data) return;
      setGallery({ path: data.dropbox_path, couple: data.couple_name, date: data.wedding_date, location: data.location, cover: data.cover_path, highlights: data.highlight_paths, labelDe: data.story_label_de, labelEn: data.story_label_en, headingDe: data.story_heading_de, headingEn: data.story_heading_en });
    });
  }, [slug]);

  useEffect(() => {
    supabase.from("gallery_products").select("slug, title, description_de, description_en, image_url, sizes, coming_soon").order("sort_index").then(({ data }) => {
      if (!data?.length) return;
      const mapped = data.map((item) => ({
        id: item.slug,
        title: item.title,
        description: t(item.description_de, item.description_en),
        image: PRODUCT_IMAGES[item.slug] || item.image_url || printsImage,
        sizes: Array.isArray(item.sizes) ? item.sizes.filter((size): size is ProductSize => Boolean(size) && typeof size === "object" && "label" in size && "price" in size).map((size) => ({ label: String(size.label), price: Number(size.price) })) : [],
        comingSoon: item.coming_soon,
      }));
      setProducts(mapped);
      setProductOptions(Object.fromEntries(mapped.map((item) => [item.id, item.sizes[0]?.label || ""])));
    });
  }, [t]);

  useEffect(() => {
    if (!g) return;
    list(g.path).then(async (items) => {
      const f = items.filter((i) => i.tag === "folder");
      setFolders(f);
      setOpen((current) => current ?? f[0] ?? null);
      const map: Record<string, Entry[]> = {};
      await Promise.all(f.map(async (x) => (map[x.path] = (await list(x.path)).filter((i) => i.tag === "file" && isImg(i.name)))));
      setCovers(map);
    });
  }, [g]);

  useEffect(() => {
    const media = heroMediaRef.current;
    const copy = heroCopyRef.current;
    if (!media || !copy || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(window.scrollY, window.innerHeight) / window.innerHeight;
      media.style.transform = `translate3d(0, ${progress * 56}px, 0) scale(${1 + progress * 0.025})`;
      copy.style.transform = `translate3d(0, ${progress * -28}px, 0)`;
      copy.style.opacity = String(1 - progress * 0.65);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const photos = useMemo(() => (open ? covers[open.path] ?? [] : []), [open, covers]);
  const selectedPhotos = useMemo(() => photos.filter((photo) => selected.has(photo.path)), [photos, selected]);
  const allPhotos = useMemo(() => Object.values(covers).flat(), [covers]);
  const hero = allPhotos.find((photo) => photo.path === g?.cover) ?? allPhotos[0];
  const highlights = (g?.highlights ?? []).map((path) => allPhotos.find((photo) => photo.path === path)).filter((photo): photo is Entry => Boolean(photo));
  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const toggle = (p: string) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(p) ? n.delete(p) : n.add(p);
      return n;
    });

  const downloadMany = async (items: Entry[]) => {
    if (items.length === 0) return;
    setBusy(true);
    try {
      if (open && items.length === photos.length && items.length > 1) {
        const zipUrl = `${FN}?mode=zip&path=${encodeURIComponent(open.path)}`;
        const a = document.createElement("a");
        a.href = zipUrl;
        a.download = `${open.name}.zip`;
        a.click();
      } else if (items.length > 1) {
        const zip = new JSZip();
        for (let i = 0; i < items.length; i += 3) {
          const chunk = items.slice(i, i + 3);
          await Promise.all(chunk.map(async (item) => {
            const res = await fetch(original(item.path));
            if (!res.ok) throw new Error(`Failed to fetch ${item.name}`);
            const blob = await res.blob();
            zip.file(item.name, blob);
          }));
        }
        const content = await zip.generateAsync({ type: "blob" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = `auswahl-${open?.name || "galerie"}.zip`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      } else {
        await download(items[0]);
      }
    } catch (err) {
      console.error("Download failed", err);
      for (const e of items) await download(e);
    } finally {
      setBusy(false);
    }
  };

  const saveSelection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectionName.trim() || selectedPhotos.length === 0) return;
    const key = `hn-gallery-selection-${slug}-${Date.now()}`;
    localStorage.setItem(key, JSON.stringify({ name: selectionName.trim(), note: selectionNote.trim(), photos: selectedPhotos, savedAt: new Date().toISOString() }));
    setSavedMessage(t("Auswahl vorübergehend in diesem Browser gespeichert.", "Selection temporarily saved in this browser."));
    setSelectionName("");
    setSelectionNote("");
    setSaveOpen(false);
  };

  const chooseProduct = (productId: ProductId) => {
    const product = products.find((item) => item.id === productId);
    if (!product || product.comingSoon) return;
    setProductOpen(null);
    setPendingProduct(productId);
    const firstFolder = folders[0];
    if (!open && firstFolder) setOpen(firstFolder);
    window.setTimeout(() => document.querySelector("#gal-main")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const addToCart = (productId: ProductId) => {
    const product = products.find((item) => item.id === productId);
    if (!product || product.comingSoon || selectedPhotos.length === 0) return;
    const selectedSize = product.sizes.find((size) => size.label === productOptions[productId]) ?? product.sizes[0];
    if (!selectedSize) return;
    setCart((items) => [...items, {
      id: `${productId}-${Date.now()}`,
      productId,
      title: product.title,
      option: selectedSize.label,
      quantity: selectedPhotos.length,
      unitPrice: selectedSize.price,
      photos: selectedPhotos,
    }]);
    setPendingProduct(null);
    setSelected(new Set());
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => setCart((items) => items.flatMap((item) => {
    if (item.id !== id) return [item];
    const quantity = item.quantity + delta;
    return quantity > 0 ? [{ ...item, quantity }] : [];
  }));

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendingOrder(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("gallery", g.couple);
    data.set("order_total", `€${total.toFixed(2)}`);
    data.set("order_items", cart.map((item) => `${item.quantity}× ${item.title} · ${item.option} · ${item.photos.map((photo) => photo.name).join(", ")}`).join("\n"));
    try {
      const response = await fetch("https://formspree.io/f/xgopaaqa", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Order request failed");
      setOrderSent(true);
      setCart([]);
    } finally {
      setSendingOrder(false);
    }
  };

  if (!g)
    return (
      <div className="gal-empty">
        <p>{t("Diese Galerie existiert nicht.", "This gallery does not exist.")}</p>
        <Link to="/">← Hugo & Nanny</Link>
      </div>
    );

  return (
    <div className="gallery-page">
      <SEO title={`${g.couple} · Hugo & Nanny`} description={t("Private Galerie", "Private gallery")} path={`/gallery/${slug}`} />
      <nav className="gal-nav" aria-label={t("Galerie-Navigation", "Gallery navigation")}>
        <a className="gal-brand" href="#gal-hero" aria-label="Hugo & Nanny"><img src="/photos/logo-left.png" alt="Hugo & Nanny" width="1200" height="348" /></a>
        <div className="gal-nav-links">
          <a href="#gal-main">{t("Highlights", "Highlights")}</a>
          {folders.map((folder) => <button key={folder.path} onClick={() => { setOpen(folder); setSelected(new Set()); window.setTimeout(() => document.querySelector("#gal-main")?.scrollIntoView({ behavior: "smooth" }), 50); }}>{folder.name}</button>)}
          <a href="#shop">Shop</a>
        </div>
        <button className="gal-nav-action" onClick={() => setCartOpen(true)} aria-label={t("Warenkorb öffnen", "Open bag")}><ShoppingBag size={17} /><span>{cart.length}</span></button>
        <Menu className="gal-menu-icon" size={19} />
      </nav>

      <section id="gal-hero" className="gal-hero">
        <div className="gal-hero-media-wrap"><div ref={heroMediaRef} className="gal-hero-media">{hero && <img src={img(hero.path, "w2048h1536")} alt={g.couple} width={2048} height={1536} fetchPriority="high" />}</div></div>
        <div ref={heroCopyRef} className="gal-hero-inner">
          <img className="gal-hero-logo" src="/photos/logo-left.png" alt="Hugo & Nanny" width="1200" height="348" />
          <h1>{g.couple}</h1>
          <p className="gal-meta">{[g.date, g.location].filter(Boolean).join(" · ")}</p>
          <a href="#gal-main" className="gal-enter">{t("Galerie öffnen", "Enter gallery")}</a>
        </div>
      </section>

      <main id="gal-main" className="wrap gal-main">
        <RevealOnScroll className="gal-gallery-head">
           <p className="gal-label">{t(g.labelDe || "Eure Geschichte", g.labelEn || "Your story")}</p>
           <h2 className="gal-h">{t(g.headingDe || "Ein Tag, in Bildern erzählt.", g.headingEn || "One day, told in pictures.")}</h2>
        </RevealOnScroll>
         {highlights.length > 0 && <div className="gal-highlights">{highlights.map((photo) => <img key={photo.path} src={img(photo.path)} alt={photo.name} loading="lazy" />)}</div>}
        <div className="gal-segments" aria-label={t("Momente des Hochzeitstags", "Wedding day moments")}>
          {folders.map((folder) => <button key={folder.path} className={open?.path === folder.path ? "is-active" : ""} onClick={() => { setOpen(folder); setSelected(new Set()); }}><span>{folder.name}</span><small>{(covers[folder.path] ?? []).length}</small></button>)}
          {folders.length === 0 && <span className="gal-loading">{t("Lädt …", "Loading …")}</span>}
        </div>
        {open && <>
            <div className="gal-bar">
              <div><p className="gal-label">{t("Moment", "Moment")}</p><h2 className="gal-h gal-h-sm">{open.name}</h2></div>
              <div className="gal-actions">
                <button onClick={() => setSelected(selected.size === photos.length ? new Set() : new Set(photos.map((p) => p.path)))}>
                  {selected.size === photos.length ? t("Auswahl aufheben", "Clear selection") : t("Alle auswählen", "Select all")}
                </button>
                <button disabled={busy} onClick={() => downloadMany(selected.size ? photos.filter((p) => selected.has(p.path)) : photos)}>
                  {busy ? t("Lädt …", "Downloading …") : selected.size ? `${t("Download", "Download")} (${selected.size})` : t("Alle herunterladen", "Download all")}
                </button>
              </div>
            </div>
             {pendingProduct && <div className="gal-product-prompt"><span>{t("Wählt jetzt die Fotos für", "Now select photos for")} <strong>{products.find((item) => item.id === pendingProduct)?.title}</strong>. {t("Jedes ausgewählte Foto entspricht einem Produkt.", "Each selected photo equals one product.")}</span><button onClick={() => setPendingProduct(null)}><X size={16} /></button></div>}
            <div className="gal-masonry">
              {photos.map((p) => {
                const index = photos.findIndex((photo) => photo.path === p.path);
                return (
                <figure key={p.path} className={selected.has(p.path) ? "is-sel" : ""}>
                   <img src={img(p.path, "w960h640")} alt={p.name} loading="lazy" onClick={() => setLightbox(index)} />
                  <button className="gal-check" aria-label={t("Auswählen", "Select")} onClick={() => toggle(p.path)}>
                    {selected.has(p.path) ? <Check size={15} /> : <Heart size={14} />}
                  </button>
                </figure>
              )})}
            </div>
          </>}
      </main>

      <section id="shop" className="gal-shop">
        <RevealOnScroll className="gal-shop-heading">
          <p className="gal-label">N°02 — Print Shop</p>
          <h2 className="gal-h">{t("Eure Bilder, ", "Your photographs, ")}<em>{t("zum Anfassen.", "made tangible.")}</em></h2>
          <p>{t("Wählt eure Lieblingsbilder und gestaltet daraus etwas Bleibendes.", "Select your favourite photographs and turn them into something lasting.")}</p>
        </RevealOnScroll>
        <div className="gal-products">
          {products.map((product) => (
            <article className="gal-product" key={product.id} onClick={() => setProductOpen(product.id)}>
              <img src={product.image} alt={product.title} width={1200} height={900} loading="lazy" />
              <div className="gal-product-copy">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                {product.comingSoon ? <span className="gal-coming">{t("Konfigurator · Bald verfügbar", "Configurator · Coming soon")}</span> : <div className="gal-product-buy"><span>{t("Ab", "From")} €{Math.min(...product.sizes.map((size) => size.price))}</span><button onClick={(event) => { event.stopPropagation(); setProductOpen(product.id); }}>{t("Produkt ansehen", "View product")}</button></div>}
              </div>
            </article>
          ))}
        </div>
        <p className="gal-price-note">{t("Die Preise sind vorläufig und werden vor der Zahlung persönlich bestätigt.", "Prices are provisional and will be personally confirmed before payment.")}</p>
      </section>

      {productOpen && products.find((item) => item.id === productOpen) && (() => { const product = products.find((item) => item.id === productOpen); if (!product) return null; const chosen = product.sizes.find((size) => size.label === productOptions[product.id]) ?? product.sizes[0]; return <div className="gal-modal" role="dialog" aria-modal="true" aria-label={product.title}><div className="gal-product-dialog"><button className="gal-dialog-close" onClick={() => setProductOpen(null)} aria-label={t("Schließen", "Close")}><X /></button><img src={product.image} alt={product.title} width={1200} height={900} /><div className="gal-product-detail"><p className="gal-label">Print Shop</p><h2>{product.title}</h2><p>{product.description}</p>{product.comingSoon ? <span className="gal-coming">{t("Konfigurator · Bald verfügbar", "Configurator · Coming soon")}</span> : <><p className="gal-step">01 — {t("Größe wählen", "Choose a size")}</p><div className="gal-size-options">{product.sizes.map((size) => <button key={size.label} className={chosen?.label === size.label ? "is-active" : ""} onClick={() => setProductOptions((options) => ({ ...options, [product.id]: size.label }))}><span>{size.label}</span><strong>€{size.price}</strong></button>)}</div><p className="gal-step">02 — {t("Bilder auswählen", "Select photographs")}</p><p className="gal-product-note">{t("Im nächsten Schritt wählt ihr die Bilder. Drei Bilder ergeben drei Produkte zum jeweiligen Einzelpreis.", "Next, select the photographs. Three photographs create three products at the listed unit price.")}</p><button className="gal-dialog-submit" onClick={() => chooseProduct(product.id)}>{t("Bilder auswählen", "Select photographs")} · €{chosen?.price ?? 0} {t("pro Bild", "each")}</button></>}</div></div></div>; })()}

      {selectedPhotos.length > 0 && <aside className="gal-tray" aria-label={t("Fotoauswahl", "Photo selection")}>
        <div className="gal-tray-thumbs">{selectedPhotos.slice(0, 7).map((photo) => <img key={photo.path} src={img(photo.path, "w480h320")} alt="" />)}{selectedPhotos.length > 7 && <span>+{selectedPhotos.length - 7}</span>}</div>
        <strong>{selectedPhotos.length} {t("ausgewählt", "selected")}</strong>
        <div className="gal-tray-actions">
          <button onClick={() => downloadMany(selectedPhotos)}><Download size={15} />{t("Download", "Download")}</button>
          <button onClick={() => setSaveOpen(true)}>{t("Speichern", "Save")}</button>
          {pendingProduct ? <button className="gal-tray-primary" onClick={() => addToCart(pendingProduct)}><ShoppingBag size={15} />{t("Zum Warenkorb", "Add to bag")}</button> : <a className="gal-tray-primary" href="#shop">{t("Mit Auswahl shoppen", "Shop selection")}</a>}
        </div>
      </aside>}

      {saveOpen && <div className="gal-modal" role="dialog" aria-modal="true" aria-label={t("Auswahl speichern", "Save selection")}>
        <form className="gal-dialog" onSubmit={saveSelection}>
          <button type="button" className="gal-dialog-close" onClick={() => setSaveOpen(false)} aria-label={t("Schließen", "Close")}><X /></button>
          <p className="gal-label">{t("Auswahl speichern", "Save selection")}</p>
          <h2>{t("Gebt eurer Auswahl einen Namen.", "Give your selection a name.")}</h2>
          <label>{t("Name", "Name")}<input required value={selectionName} onChange={(event) => setSelectionName(event.target.value)} placeholder={t("Unsere Favoriten", "Our favourites")} /></label>
          <label>{t("Notiz (optional)", "Note (optional)")}<textarea value={selectionNote} onChange={(event) => setSelectionNote(event.target.value)} rows={3} /></label>
          <p className="gal-temporary">{t("Nur vorübergehend in diesem Browser gespeichert. Bitte nicht als dauerhaftes Backup verwenden.", "Temporarily saved in this browser only. Please do not use this as a permanent backup.")}</p>
          <button className="gal-dialog-submit" type="submit">{t("Auswahl speichern", "Save selection")}</button>
        </form>
      </div>}

      {cartOpen && <div className="gal-cart-layer" role="dialog" aria-modal="true" aria-label={t("Warenkorb", "Bag")} onClick={() => setCartOpen(false)}>
        <aside className="gal-cart" onClick={(event) => event.stopPropagation()}>
          <div className="gal-cart-head"><div><p className="gal-label">{t("Eure Auswahl", "Your selection")}</p><h2>{t("Warenkorb", "Bag")}</h2></div><button onClick={() => setCartOpen(false)} aria-label={t("Schließen", "Close")}><X /></button></div>
          {cart.length === 0 ? <p className="gal-cart-empty">{t("Euer Warenkorb ist noch leer.", "Your bag is still empty.")}</p> : <>
            <div className="gal-cart-items">{cart.map((item) => <article key={item.id}>
              <img src={img(item.photos[0].path, "w480h320")} alt="" />
              <div><h3>{item.title}</h3><p>{item.option} · {item.photos.length} {t("Foto(s)", "photo(s)")}</p><div className="gal-qty"><button onClick={() => updateQuantity(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus size={13} /></button></div></div>
              <strong>€{(item.unitPrice * item.quantity).toFixed(2)}</strong>
            </article>)}</div>
            <div className="gal-cart-total"><span>Total</span><strong>€{total.toFixed(2)}</strong></div>
            <button className="gal-checkout-button" onClick={() => { setCheckoutOpen(true); setCartOpen(false); }}>{t("Zur Anfrage", "Proceed to checkout")}</button>
          </>}
        </aside>
      </div>}

      {checkoutOpen && <div className="gal-modal" role="dialog" aria-modal="true" aria-label={t("Bestellanfrage", "Order request")}>
        <div className="gal-dialog gal-checkout">
          <button type="button" className="gal-dialog-close" onClick={() => setCheckoutOpen(false)} aria-label={t("Schließen", "Close")}><X /></button>
          {orderSent ? <div className="gal-order-success"><Check size={28} /><h2>{t("Danke — wir melden uns in den nächsten Stunden.", "Thank you — we'll get in touch within the next hours.")}</h2><p>{t("Ihr erhaltet die finalen Details und euren PayPal-Zahlungslink persönlich per E-Mail.", "You'll receive the final details and your PayPal payment link personally by email.")}</p></div> : <form onSubmit={submitOrder}>
            <p className="gal-label">{t("Bestellanfrage", "Order request")}</p>
            <h2>{t("Fast geschafft.", "Almost yours.")}</h2>
            <p>{t("Wir prüfen eure Zusammenstellung und melden uns in den nächsten Stunden mit der Bestätigung und einem PayPal-Link.", "We'll review your selection and get in touch within the next hours with confirmation and a PayPal link.")}</p>
            <label>{t("Eure Namen", "Your names")}<input name="names" required /></label>
            <label>{t("E-Mail", "Email")}<input name="email" type="email" required /></label>
            <label>{t("Notiz (optional)", "Note (optional)")}<textarea name="message" rows={3} /></label>
            <div className="gal-cart-total"><span>Total</span><strong>€{total.toFixed(2)}</strong></div>
            <button className="gal-dialog-submit" type="submit" disabled={sendingOrder}>{sendingOrder ? t("Wird gesendet…", "Sending…") : t("Bestellanfrage senden", "Send order request")}</button>
          </form>}
        </div>
      </div>}

      {savedMessage && <button className="gal-saved-toast" onClick={() => setSavedMessage("")}>{savedMessage}<X size={14} /></button>}

      {lightbox !== null && photos[lightbox] && (
        <div className="gal-lightbox" onClick={() => setLightbox(null)}>
          <img src={img(photos[lightbox].path, "w2048h1536")} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="gal-lb-close" onClick={() => setLightbox(null)} aria-label={t("Schließen", "Close")}><X /></button>
          <button className="gal-lb-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}><ChevronLeft /></button>
          <button className="gal-lb-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}><ChevronRight /></button>
          <button className="gal-lb-dl" onClick={(e) => { e.stopPropagation(); download(photos[lightbox]); }}>Download</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

const Gallery = () => (
  <LanguageProvider>
    <GalleryContent />
  </LanguageProvider>
);

export default Gallery;
