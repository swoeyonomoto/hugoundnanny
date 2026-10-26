export function gallerySlug(names: string): string {
  return names.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Shared file URLs are public; only rewrite Dropbox's own file links, never credentials.
export function dropboxVideoUrl(value: string): string | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || !["dropbox.com", "www.dropbox.com"].includes(url.hostname)) return null;
    if (!/^\/(?:s\/[^/]+\/|scl\/fi\/[^/]+\/)[^/]+$/i.test(url.pathname)) return null;
    url.searchParams.delete("dl");
    url.searchParams.set("raw", "1");
    return url.toString();
  } catch {
    return null;
  }
}

export function validGalleryFilm(value: string): boolean {
  return Boolean(dropboxVideoUrl(value)) || /^[a-z0-9]+$/i.test(value.trim()) || /^https:\/\/(?:[a-z0-9-]+\.)?(?:wistia\.com|wistia\.net)\//i.test(value.trim());
}

export function validGalleryFolder(value: string): boolean {
  return /^\/20\d\d\/[^\u0000-\u001f]+$/.test(value.trim());
}