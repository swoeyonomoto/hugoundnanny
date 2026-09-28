import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, Download, Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import RevealOnScroll from "@/components/RevealOnScroll";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import dibondImage from "@/assets/gallery-dibond.jpg";
import bookImage from "@/assets/gallery-book.jpg";
import acrylicImage from "@/assets/gallery-acrylic.jpg";

// Temporary gallery config until the admin area exists
const GALLERIES: Record<string, { path: string; couple: string; date: string; location: string }> = {
  "karo-amir": { path: "/2026/karo_amir", couple: "Karo & Amir", date: "2026", location: "" },
};

const FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dropbox-media`;
const img = (path: string, size = "w1024h768") =>
  `${FN}?mode=thumb&size=${size}&path=${encodeURIComponent(path)}`;
const original = (path: string) => `${FN}?mode=original&path=${encodeURIComponent(path)}`;

type Entry = { tag: string; name: string; path: string };
type ProductId = "dibond" | "book" | "acrylic";
type CartItem = { id: string; productId: ProductId; title: string; option: string; quantity: number; unitPrice: number; photos: Entry[] };

const PRODUCTS: Array<{ id: ProductId; title: string; description: string; image: string; price: number; options: string[]; comingSoon?: boolean }> = [
  { id: "dibond", title: "Dibond Prints", description: "A sturdy and lightweight wall display that elevates any photo.", image: dibondImage, price: 89, options: ["20 × 30 cm", "30 × 45 cm", "40 × 60 cm"] },
  { id: "book", title: "Hardcover Books", description: "A coffee-table-style book with pages you'll enjoy flipping through often.", image: bookImage, price: 390, options: ["25 × 25 cm · 20 spreads"], comingSoon: true },
  { id: "acrylic", title: "Acrylic Prints", description: "A refined and durable wall display with striking clarity and minimalist style.", image: acrylicImage, price: 129, options: ["20 × 30 cm", "30 × 45 cm", "40 × 60 cm"] },
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
  const g = GALLERIES[slug];
  const [folders, setFolders] = useState<Entry[]>([]);
  const [covers, setCovers] = useState<Record<string, Entry[]>>({});
  const [open, setOpen] = useState<Entry | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [selectionName, setSelectionName] = useState("");
  const [selectionNote, setSelectionNote] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [pendingProduct, setPendingProduct] = useState<ProductId | null>(null);
  const [productOptions, setProductOptions] = useState<Record<ProductId, string>>({ dibond: PRODUCTS[0].options[0], book: PRODUCTS[1].options[0], acrylic: PRODUCTS[2].options[0] });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [sendingOrder, setSendingOrder] = useState(false);

  useEffect(() => {
    if (!g) return;
    list(g.path).then(async (items) => {
      const f = items.filter((i) => i.tag === "folder");
      setFolders(f);
      const map: Record<string, Entry[]> = {};
      await Promise.all(f.map(async (x) => (map[x.path] = (await list(x.path)).filter((i) => i.tag === "file" && isImg(i.name)))));
      setCovers(map);
    });
  }, [g]);

  const photos = useMemo(() => (open ? covers[open.path] ?? [] : []), [open, covers]);
  const visiblePhotos = useMemo(() => photos.filter((photo) => photo.name.toLowerCase().includes(search.toLowerCase())), [photos, search]);
  const selectedPhotos = useMemo(() => photos.filter((photo) => selected.has(photo.path)), [photos, selected]);
  const hero = Object.values(covers)[0]?.[0];
  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const toggle = (p: string) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(p) ? n.delete(p) : n.add(p);
      return n;
    });

  const downloadMany = async (items: Entry[]) => {
    setBusy(true);
    for (const e of items) await download(e);
    setBusy(false);
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
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product || product.comingSoon) return;
    if (selectedPhotos.length > 0) {
      addToCart(productId);
      return;
    }
    setPendingProduct(productId);
    const firstFolder = folders[0];
    if (!open && firstFolder) setOpen(firstFolder);
    window.setTimeout(() => document.querySelector("#gal-main")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const addToCart = (productId: ProductId) => {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product || product.comingSoon || selectedPhotos.length === 0) return;
    setCart((items) => [...items, {
      id: `${productId}-${Date.now()}`,
      productId,
      title: product.title,
      option: productOptions[productId],
      quantity: 1,
      unitPrice: product.price,
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
        <a className="gal-brand" href="#gal-hero">Hugo &amp; Nanny</a>
        <label className="gal-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("Galerie durchsuchen", "Search gallery")} /></label>
        <div className="gal-nav-links">
          <a href="#gal-main">{t("Highlights", "Highlights")}</a>
          {folders.map((folder) => <button key={folder.path} onClick={() => { setOpen(folder); setSelected(new Set()); window.setTimeout(() => document.querySelector("#gal-main")?.scrollIntoView({ behavior: "smooth" }), 50); }}>{folder.name}</button>)}
          <a href="#shop">Shop</a>
        </div>
        <button className="gal-nav-action" onClick={() => setCartOpen(true)} aria-label={t("Warenkorb öffnen", "Open bag")}><ShoppingBag size={17} /><span>{cart.length}</span></button>
        <Menu className="gal-menu-icon" size={19} />
      </nav>

      <section id="gal-hero" className="gal-hero">
        <div className="gal-hero-inner">
          <p className="gal-kicker">Hugo & Nanny</p>
          <h1>{g.couple}</h1>
          <p className="gal-meta">{[g.date, g.location].filter(Boolean).join(" · ")}</p>
          <a href="#gal-main" className="gal-enter">{t("Galerie öffnen", "Enter gallery")}</a>
        </div>
        <div className="gal-hero-media">{hero && <img src={img(hero.path, "w2048h1536")} alt={g.couple} width={2048} height={1536} fetchPriority="high" />}</div>
      </section>

      <main id="gal-main" className="wrap gal-main">
        {!open ? (
          <>
            <RevealOnScroll className="gal-intro">
              <p className="gal-label">N°01 — {t("Eure Geschichte", "Your story")}</p>
              <h2 className="gal-h">{t("Ein Tag, ", "One day, ")}<em>{t("in Bildern erzählt.", "told in pictures.")}</em></h2>
            </RevealOnScroll>
            <div className="gal-folders">
              {folders.map((f, i) => {
                const c = covers[f.path] ?? [];
                return (
                <button key={f.path} className="gal-folder" onClick={() => { setOpen(f); setSelected(new Set()); }}>
                    <div className="gal-folder-stack">
                      {c.slice(0, 3).reverse().map((p) => <img key={p.path} src={img(p.path, "w960h640")} alt="" loading="lazy" />)}
                    </div>
                    <span className="gal-folder-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="gal-folder-name">{f.name}</span>
                    <span className="gal-folder-count">{c.length} {t("Fotos", "photos")}</span>
                  </button>
                );
              })}
              {folders.length === 0 && <p className="gal-loading">{t("Lädt …", "Loading …")}</p>}
            </div>
          </>
        ) : (
          <>
            <div className="gal-bar">
              <button className="gal-back" onClick={() => setOpen(null)}>← {t("Alle Ordner", "All folders")}</button>
              <h2 className="gal-h gal-h-sm"><em>{open.name}</em></h2>
              <div className="gal-actions">
                <button onClick={() => setSelected(selected.size === photos.length ? new Set() : new Set(photos.map((p) => p.path)))}>
                  {selected.size === photos.length ? t("Auswahl aufheben", "Clear selection") : t("Alle auswählen", "Select all")}
                </button>
                <button disabled={busy} onClick={() => downloadMany(selected.size ? photos.filter((p) => selected.has(p.path)) : photos)}>
                  {busy ? t("Lädt …", "Downloading …") : selected.size ? `${t("Download", "Download")} (${selected.size})` : t("Alle herunterladen", "Download all")}
                </button>
              </div>
            </div>
            {pendingProduct && <div className="gal-product-prompt"><span>{t("Wählt jetzt die Fotos für", "Now select photos for")} <strong>{PRODUCTS.find((item) => item.id === pendingProduct)?.title}</strong></span><button onClick={() => setPendingProduct(null)}><X size={16} /></button></div>}
            <div className="gal-masonry">
              {visiblePhotos.map((p) => {
                const index = photos.findIndex((photo) => photo.path === p.path);
                return (
                <figure key={p.path} className={selected.has(p.path) ? "is-sel" : ""}>
                  <img src={img(p.path)} alt={p.name} loading="lazy" onClick={() => setLightbox(index)} />
                  <button className="gal-check" aria-label={t("Auswählen", "Select")} onClick={() => toggle(p.path)}>
                    {selected.has(p.path) ? <Check size={15} /> : <Heart size={14} />}
                  </button>
                </figure>
              )})}
            </div>
          </>
        )}
      </main>

      <section id="shop" className="gal-shop">
        <RevealOnScroll className="gal-shop-heading">
          <p className="gal-label">N°02 — Print Shop</p>
          <h2 className="gal-h">{t("Eure Bilder, ", "Your photographs, ")}<em>{t("zum Anfassen.", "made tangible.")}</em></h2>
          <p>{t("Wählt eure Lieblingsbilder und gestaltet daraus etwas Bleibendes.", "Select your favourite photographs and turn them into something lasting.")}</p>
        </RevealOnScroll>
        <div className="gal-products">
          {PRODUCTS.map((product) => (
            <article className="gal-product" key={product.id}>
              <img src={product.image} alt={product.title} width={1200} height={900} loading="lazy" />
              <div className="gal-product-copy">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                {product.comingSoon ? <span className="gal-coming">{t("Buchdesigner · Bald verfügbar", "Book designer · Coming soon")}</span> : <>
                  <select aria-label={t("Größe", "Size")} value={productOptions[product.id]} onChange={(event) => setProductOptions((options) => ({ ...options, [product.id]: event.target.value }))}>
                    {product.options.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <div className="gal-product-buy"><span>{t("Vorschaupreis ab", "Preview price from")} €{product.price}</span><button onClick={() => chooseProduct(product.id)}>{selectedPhotos.length ? t("Mit Auswahl hinzufügen", "Add with selection") : t("Fotos wählen", "Choose photos")}</button></div>
                </>}
              </div>
            </article>
          ))}
        </div>
        <p className="gal-price-note">{t("Die Preise sind vorläufig und werden vor der Zahlung persönlich bestätigt.", "Prices are provisional and will be personally confirmed before payment.")}</p>
      </section>

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
