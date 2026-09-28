import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const DBX_API = 'https://api.dropboxapi.com/2'
const DBX_CONTENT = 'https://content.dropboxapi.com/2'
const TOKEN = Deno.env.get('DROPBOX_ACCESS_TOKEN_2')

type Mode = 'thumb' | 'preview' | 'original'

async function dbxJson(path: string, body: unknown) {
  const res = await fetch(`${DBX_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Dropbox ${path} failed: ${res.status} ${await res.text()}`)
  return res.json()
}

async function dbxContent(path: string, arg: unknown) {
  const res = await fetch(`${DBX_CONTENT}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Dropbox-API-Arg': JSON.stringify(arg),
    },
  })
  if (!res.ok) throw new Error(`Dropbox ${path} failed: ${res.status} ${await res.text()}`)
  return res
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (!TOKEN) {
    return new Response(JSON.stringify({ error: 'Dropbox token not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const qs = new URL(req.url).searchParams
    const body = req.method === 'GET'
      ? { path: qs.get('path'), mode: qs.get('mode'), size: qs.get('size') }
      : await req.json().catch(() => ({}))
    // Only gallery folders are readable
    if (typeof body.path === 'string' && !/^\/20\d\d\//.test(body.path.toLowerCase())) {
      return new Response(JSON.stringify({ error: 'forbidden path' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const filePath = typeof body.path === 'string' ? body.path : null
    const mode: Mode = ['thumb', 'preview', 'original'].includes(body.mode) ? body.mode : 'thumb'
    if (!filePath) {
      return new Response(JSON.stringify({ error: 'path is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (mode === 'original') {
      // Temporary link for full-resolution download (expires ~4h, not a public shared link)
      const data = await dbxJson('/files/get_temporary_link', { path: filePath })
      if (req.method === 'GET') {
        return new Response(null, { status: 302, headers: { ...corsHeaders, Location: data.link } })
      }
      return new Response(JSON.stringify({ url: data.link, name: data.metadata?.name }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const arg =
      mode === 'thumb'
        ? {
            resource: { '.tag': 'path', path: filePath },
            format: 'jpeg',
            size: ['w960h640','w1024h768','w2048h1536'].includes(body.size) ? body.size : 'w480h320',
            mode: 'fitone_bestfit',
          }
        : { path: filePath, format: 'jpeg' }

    const res = await dbxContent(mode === 'thumb' ? '/files/get_thumbnail_v2' : '/files/get_preview', arg)
    const bytes = await res.arrayBuffer()
    return new Response(bytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
