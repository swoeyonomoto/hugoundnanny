const KEY = Deno.env.get('DROPBOX_APP_KEY')
const SECRET = Deno.env.get('DROPBOX_APP_SECRET')
const REFRESH = Deno.env.get('DROPBOX_REFRESH_TOKEN')
const FALLBACK = Deno.env.get('DROPBOX_ACCESS_TOKEN_2')

let cached: { token: string; expires: number } | null = null

export async function getDropboxToken(): Promise<string> {
  if (!KEY || !SECRET || !REFRESH) {
    if (FALLBACK) return FALLBACK
    throw new Error('Dropbox credentials not configured')
  }
  if (cached && cached.expires > Date.now() + 60_000) return cached.token
  const res = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${KEY}:${SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: REFRESH }),
  })
  if (!res.ok) throw new Error(`Dropbox token refresh failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  cached = { token: data.access_token, expires: Date.now() + (data.expires_in ?? 14400) * 1000 }
  return cached.token
}
