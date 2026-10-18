import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { PUBLIC_FIELDS, validToken } from './handler.ts';

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

// A personal token is the existing public guide credential; never expose private admin fields.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  try {
    const reader = req.body?.getReader();
    if (!reader) return json({ error: 'could not load' }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2000) { await reader.cancel(); return json({ error: 'body too large' }, 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const body = JSON.parse(new TextDecoder().decode(bytes));
    const token = body?.token;
    if (!validToken(token)) return json({ error: 'not found' }, 404);
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Missing server configuration');
    const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await client.from('film_guide_leads').select(`${PUBLIC_FIELDS}, opened_at`).eq('token', token).maybeSingle();
    if (error) throw error;
    if (!data) return json({ error: 'not found' }, 404);
    if (!data.opened_at) await client.from('film_guide_leads').update({ opened_at: new Date().toISOString() }).eq('token', token);
    const { opened_at: _opened, ...lead } = data;
    return json({ lead });
  } catch {
    console.error('[film-guide-load] could not load');
    return json({ error: 'could not load' }, 400);
  }
});