import { FormEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { gallerySlug, validGalleryFilm, validGalleryFolder } from "@/lib/gallery-media";

type Props = { onCreated: (id: string) => Promise<void>; onCancel: () => void };

export default function NewGalleryForm({ onCreated, onCancel }: Props) {
  const [names, setNames] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [folder, setFolder] = useState("");
  const [video, setVideo] = useState("");
  const [hasPhotos, setHasPhotos] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const create = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!names.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return setError("Bitte Namen und einen gültigen URL-Namen eingeben.");
    if (hasPhotos && !validGalleryFolder(folder)) return setError("Bitte den Dropbox-Ordnerpfad eingeben, z. B. /2026/Karo_Amir.");
    if (video.trim() && !validGalleryFilm(video)) return setError("Bitte einen Dropbox-Dateilink (kein Ordnerlink) oder Wistia-Link eingeben.");
    if (!hasPhotos && !video.trim()) return setError("Bitte einen Film-Link eingeben.");
    setSaving(true);
    try {
      const { data, error: saveError } = await supabase.from("gallery_configs").insert({
        couple_name: names.trim(), slug, wedding_date: date, location: location.trim(),
        dropbox_path: hasPhotos ? folder.trim() : "", has_photos: hasPhotos, active: false,
        films: video.trim() ? [{ id: crypto.randomUUID(), kind: "highlight", title: "", url: video.trim() }] : [],
        highlight_paths: [], film_image_paths: [],
        story_label_de: "Eure Geschichte", story_label_en: "Your story",
        story_heading_de: names.trim(), story_heading_en: names.trim(),
      }).select("id").single();
      if (saveError) { setError(saveError.code === "23505" ? "Dieser URL-Name ist bereits vergeben." : `Galerie konnte nicht erstellt werden: ${saveError.message}`); return; }
      if (data) await onCreated(data.id);
    } catch {
      setError("Galerie konnte nicht geladen werden. Bitte erneut versuchen.");
    } finally { setSaving(false); }
  };

  return <section className="ga-section">
    <div className="ga-section-head"><h1>Neue Galerie</h1><Button variant="ghost" size="icon" title="Abbrechen" onClick={onCancel}><X /></Button></div>
    <form className="ga-form-grid" onSubmit={create}>
      <label>Namen<input required value={names} placeholder="Karo + Amir" onChange={(e) => { setNames(e.target.value); if (!slug || slug === gallerySlug(names)) setSlug(gallerySlug(e.target.value)); }} /></label>
      <label>URL-Name<input required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="karo-amir" /></label>
      <label>Datum<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
      <label>Ort<input value={location} onChange={(e) => setLocation(e.target.value)} /></label>
      <label className="ga-check-label ga-wide"><input type="checkbox" checked={hasPhotos} onChange={(e) => setHasPhotos(e.target.checked)} /> Foto-Galerie anzeigen</label>
      {hasPhotos && <label className="ga-wide">Dropbox-Ordner für Fotos<input required value={folder} placeholder="/2026/Karo_Amir" onChange={(e) => setFolder(e.target.value)} /></label>}
      <label className="ga-wide">Dropbox-Dateilink oder Wistia-Link für den Film<input type="text" value={video} placeholder="https://www.dropbox.com/scl/fi/…/film.mp4?…" onChange={(e) => setVideo(e.target.value)} /></label>
      {error && <p role="alert" className="ga-wide">{error}</p>}
      <div className="ga-wide"><Button type="submit" disabled={saving}><Plus size={16} />{saving ? "Wird erstellt …" : "Galerie als Entwurf erstellen"}</Button></div>
    </form>
  </section>;
}