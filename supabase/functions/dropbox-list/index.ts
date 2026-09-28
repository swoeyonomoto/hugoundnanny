import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const DBX_API = 'https://api.dropboxapi.com/2'
const TOKEN = Deno.env.get('DROPBOX_ACCESS_TOKEN')

async function dbx(path: string, body: unknown) {
  const res = await fetch(`${DBX_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Dropbox ${path} failed: ${res.status} ${text}`)
  }
  return res.json()
}

function mapEntry(e: Record<string, unknown>) {
  return {
    tag: e['.tag'],
    name: e.name,
    path: e.path_lower,
    id: e.id,
    size: e.size ?? null,
    modified: e.server_modified ?? null,
  }
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
    const body = await req.json().catch(() => ({}))
    const folderPath = typeof body.path === 'string' ? body.path : ''
    const cursor = typeof body.cursor === 'string' ? body.cursor : null

    let data
    if (cursor) {
      data = await dbx('/files/list_folder/continue', { cursor })
    } else {
      data = await dbx('/files/list_folder', {
        path: folderPath,
        recursive: false,
        include_media_info: false,
        include_deleted: false,
        limit: 200,
      })
    }

    return new Response(
      JSON.stringify({
        entries: (data.entries ?? []).map(mapEntry),
        cursor: data.cursor,
        hasMore: data.has_more,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
