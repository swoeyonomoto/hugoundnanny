import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { buildUpdate, isRecord, validToken } from './handler.ts';
import { completionUpdate, notifyCompletion, readyToFinish } from './completion.ts';

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

// The existing personal token authorizes writes only to its existing couple row.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  try {
    const reader = req.body?.getReader();
    if (!reader) return json({ error: 'bad request' }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 65536) { await reader.cancel(); return json({ error: 'body too large' }, 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const body: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!isRecord(body) || !validToken(body.token) || !isRecord(body.patch)) return json({ error: 'bad request' }, 400);
    const { token, patch } = body;
    if ('complete' in body && typeof body.complete !== 'boolean') return json({ error: 'bad request' }, 400);
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Missing server configuration');
    const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: lead, error: lookupError } = await client.from('film_guide_leads').select('status, furthest_step').eq('token', token).maybeSingle();
    if (lookupError) throw lookupError;
    if (!lead) return json({ error: 'not found' }, 404);
    const { error } = await client.from('film_guide_leads').update(buildUpdate(patch, lead)).eq('token', token);
    if (error) throw error;
    if (body.complete === true) {
      const { data: saved, error: savedError } = await client.from('film_guide_leads').select('status, sent_at, names, wedding_date, location, contact, contact_via, estimate_eur, package_hint, last_step, furthest_step').eq('token', token).single();
      if (savedError) throw savedError;
      if (!readyToFinish(saved)) return json({ error: 'Please complete your details and reach the final chapter first.' }, 400);
      if (saved.sent_at) return json({ ok: true, completed: true });
      const { data: claimed, error: completionError } = await client.from('film_guide_leads').update(completionUpdate(saved, new Date().toISOString())).eq('token', token).is('sent_at', null).select('sent_at').maybeSingle();
      if (completionError) throw completionError;
      if (!claimed) return json({ ok: true, completed: true });
      let notified = false;
      try { notified = await notifyCompletion(saved); } catch { console.error('[film-guide-finish] inbox notification unavailable'); }
      return json({ ok: true, completed: true, notified });
    }
    return json({ ok: true });
  } catch {
    console.error('[film-guide-save] could not save');
    return json({ error: 'could not save' }, 400);
  }
});