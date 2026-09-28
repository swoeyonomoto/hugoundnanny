import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import LogoHeader from "@/components/LogoHeader";
import AutoColorNav from "@/components/AutoColorNav";
import RevealOnScroll from "@/components/RevealOnScroll";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

// Temporary gallery config until the admin area exists
const GALLERIES: Record<string, { path: string; couple: string; date: string; location: string }> = {
  "karo-amir": { path: "/2026/karo_amir", couple: "Karo & Amir", date: "2026", location: "" },
};

const FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dropbox-media`;
const img = (path: string, size = "w1024h768") =>
  `${FN}?mode=thumb&size=${size}&path=${encodeURIComponent(path)}`;
const original = (path: string) => `${FN}?mode=original&path=${encodeURIComponent(path)}`;

type Entry = { tag: string; name: string; path: string };

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
  const hero = Object.values(covers)[0]?.[0];

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
      <AutoColorNav darkSelectors="#gal-hero" />
      <LogoHeader />

      <section id="gal-hero" className="gal-hero">
        {hero && <img src={img(hero.path, "w2048h1536")} alt={g.couple} fetchPriority="high" />}
        <div className="gal-hero-inner">
          <p className="gal-kicker">Hugo & Nanny</p>
          <h1><em>{g.couple}</em></h1>
          <p className="gal-meta">{[g.date, g.location].filter(Boolean).join(" · ")}</p>
          <a href="#gal-main" className="gal-enter">{t("Galerie öffnen", "Enter gallery")}</a>
        </div>
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
            <div className="gal-masonry">
              {photos.map((p, i) => (
                <figure key={p.path} className={selected.has(p.path) ? "is-sel" : ""}>
                  <img src={img(p.path)} alt={p.name} loading="lazy" onClick={() => setLightbox(i)} />
                  <button className="gal-check" aria-label={t("Auswählen", "Select")} onClick={() => toggle(p.path)}>
                    {selected.has(p.path) ? "✓" : ""}
                  </button>
                </figure>
              ))}
            </div>
          </>
        )}
      </main>

      {lightbox !== null && photos[lightbox] && (
        <div className="gal-lightbox" onClick={() => setLightbox(null)}>
          <img src={img(photos[lightbox].path, "w2048h1536")} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="gal-lb-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}>←</button>
          <button className="gal-lb-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}>→</button>
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
