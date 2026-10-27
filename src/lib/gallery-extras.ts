export type FilmExtra = { id: string; title: string; description: string; price: number | null; enabled: boolean };

export const FILM_EXTRA_PRESETS: FilmExtra[] = [
  { id: "social-20", title: "Social Media Short (20s)", description: "A 20-second edit of your wedding, made for sharing.", price: null, enabled: true },
  { id: "social-40", title: "Social Media Short (40s)", description: "A 40-second edit with more moments from your day.", price: null, enabled: true },
  { id: "vertical", title: "Vertical film edit", description: "Your favourite film moments in a phone-friendly vertical edit.", price: null, enabled: false },
  { id: "speeches", title: "Full speeches edit", description: "A dedicated edit of the recorded speeches.", price: null, enabled: false },
  { id: "ceremony", title: "Full ceremony edit", description: "A dedicated edit of your recorded ceremony.", price: null, enabled: false },
];

export function parseFilmExtras(value: unknown): FilmExtra[] {
  const meta = Array.isArray(value) ? value.find((item) => item && typeof item === "object" && "booking_extras" in item) : null;
  if (!meta || !Array.isArray(meta.booking_extras)) return FILM_EXTRA_PRESETS.map((item) => ({ ...item }));
  return meta.booking_extras.filter((item: unknown): item is FilmExtra => {
    if (!item || typeof item !== "object") return false;
    const extra = item as Partial<FilmExtra>;
    return typeof extra.id === "string" && typeof extra.title === "string" && typeof extra.description === "string" && typeof extra.enabled === "boolean" && (extra.price === null || (typeof extra.price === "number" && Number.isFinite(extra.price) && extra.price >= 0));
  });
}

// Keep presentation metadata separate from film records, in the existing JSON field.
export function withFilmExtras(films: unknown, extras: FilmExtra[]): unknown[] {
  const records = Array.isArray(films) ? films.filter((item) => !(item && typeof item === "object" && "booking_extras" in item)) : [];
  return [...records, { booking_extras: extras }];
}

export function galleryPreview(path: string, size = "w640h480"): string {
  return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dropbox-media?mode=thumb&format=webp&size=${size}&path=${encodeURIComponent(path)}`;
}