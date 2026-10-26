import { getDropboxToken } from '../_shared/dropbox-token.ts'

// Serves a tiny HTML page for link previews (WhatsApp, iMessage, ...).
// It carries the couple's names + header photo as og tags, then opens the
// real gallery on https://hugo-nanny.de/gallery/<slug>.
// The browser never receives the Dropbox token; image links are fresh
// temporary Dropbox links generated server-side per preview request.

const SITE = 'https://hugo-nanny.de'
const FALLBACK_IMAGE = 'https://trfmpmwkkzdemcbutbuk.supabase.co/storage/v1/object/public/hugoundnanny/Logo/Hugo_Nanny_Square.jpg'
const DBX_API = 'https://api.dropboxapi.com/2'

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&', '<': '<', '>': '>', '"': '"', "'": '&#39;' })[c] ?? c)
}

async function dbxJson(path: string, body: unknown): Promise<any> {
  const res = await fetch(`${DBX_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await getDropboxToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Dropbox ${path} failed: ${res.status}`)
  return res.json()
}

async function tempLink(path: string): Promise<string | null> {
  try {
    const data = await dbxJson('/files/get_temporary_link', { path })
    return typeof data?.link === 'string' ? data.link : null
  } catch {
    return null
  }
}

async function pickImage(config: Record<string, unknown>): Promise<string | null> {
  const cover = typeof config.cover_path === 'string' ? config.cover_path : ''
  const folder = typeof config.dropbox_path === 'string' ? config.dropbox_path : ''
  if (cover && /\.(jpe?g|png|webp)$/i.test(cover)) return tempLink(cover)
  // No cover set: take the first photo found in the gallery folder.
  if (folder) {
    try {
      const data = await dbxJson('/files/list_folder', { path: folder, limit: 100 })
      const first = (data?.entries ?? []).find((e: any) => e['.tag'] === 'file' && /\.(jpe?g|png|webp)$/i.test(String(e.name)))
      if (first) return tempLink(first.path_lower)
    } catch {
      // fall through to fallback image
    }
  }
  return null
}

async function loadGallery(slug: string): Promise<Record<string, unknown> | null> {
  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) return null
  const res = await fetch(
    `${url}/rest/v1/gallery_configs?slug=eq.${encodeURIComponent(slug)}&select=*`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } },
  )
  if (!res.ok) return null
  const rows = await res.json()
  const row = Array.isArray(rows) ? rows[0] : null
  return row && row.active ? row : null
}

function html(slug: string, title: string, description: string, image: string): string {
  const target = `${SITE}/gallery/${encodeURIComponent(slug)}`
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<meta http-equiv="refresh" content="0;url=${esc(target)}">
<link rel="canonical" href="${esc(target)}">
</head>
<body>
<p>Opening gallery … <a href="${esc(target)}">${esc(target)}</a></p>
<script>location.replace(${JSON.stringify(target)})</script>
</body>
</html>`
}

Deno.serve(async (req) => {
  const slug = new URL(req.url).searchParams.get('g') ?? ''
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return new Response(null, { status: 302, headers: { Location: SITE } })
  }
  const config = await loadGallery(slug)
  if (!config) {
    return new Response(null, { status: 302, headers: { Location: SITE } })
  }
  const names = String(config.couple_name ?? '').trim()
  const date = typeof config.wedding_date === 'string' ? config.wedding_date : ''
  const location = String(config.location ?? '').trim()
  const title = `${names} - Hochzeitsfotos & Film`
  const parts = [location, date ? new Date(date + 'T00:00:00Z').toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }) : '']
    .filter(Boolean)
    .join(' · ')
  const description = parts || 'Die Galerie von Hugo + Nanny'
  const image = (await pickImage(config)) ?? FALLBACK_IMAGE
  return new Response(html(slug, title, description, image), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=120' },
  })
})
