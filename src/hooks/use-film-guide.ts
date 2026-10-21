import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { chapterIds, initialAnswers, startingLanguage, type GuideAnswers, type Language } from '@/lib/film-guide/logic';
import { defaultSettings } from '@/lib/film-guide/settings';
import { parseOffer, type CustomOffer } from '@/lib/film-guide/offer';
import { leadPatch, mergeSettings, restoreAnswers, restoreSessionAnswers, withLeadDiscount } from '@/lib/film-guide/persistence';
export type GuideClip = {key:string;video_path:string;start_s:number;end_s:number};
export function useGuideConfig() {
  const [settings,setSettings] = useState(defaultSettings);
  const [clips,setClips] = useState<Record<string,GuideClip>>({});
  useEffect(() => { let live = true; Promise.all([supabase.from('film_guide_settings').select('data').eq('id',1).maybeSingle(),supabase.from('film_guide_clips').select('*')]).then(([s,c]) => { if (!live) return; if (s.data) setSettings(mergeSettings(s.data.data)); if (c.data) setClips(Object.fromEntries(c.data.map(x => [x.key,x]))); }); return () => {live=false;}; },[]);
  return {settings,clips};
}
const TOKEN_KEY = 'hn-film-guide-token';
const draftKey = (token: string|null) => `hn-film-guide-draft:${token || 'new'}`;
function readDraft(token:string|null) { try {return JSON.parse(localStorage.getItem(draftKey(token)) || 'null');} catch {return null;} }
export function useGuideSession(settings: typeof defaultSettings) {
  const {token:routeToken} = useParams();
  const navigate = useNavigate();
  const [lang,setLang] = useState<Language>(() => startingLanguage(location.search,navigator.language));
  const [a,setAnswers] = useState<GuideAnswers>({...initialAnswers});
  const [step,setStep] = useState(0);
  const [sent,setSent] = useState(false);
  const [ready,setReady] = useState(false);
  const [loadError,setLoadError] = useState(false);
  const [token,setToken] = useState<string|null>(null);
  const [revision,bump] = useState(0);
  const [offer,setOffer] = useState<CustomOffer|null>(null);
  const offerMode = useRef(false);
  const active = useRef(false), tokenRef = useRef<string|null>(null), startPromise = useRef<Promise<string|null>|null>(null);
  const furthest = useRef(0), times = useRef<Record<string,number>>({}), entered = useRef(Date.now());
  const latest = useRef({a,lang,step,settings}); latest.current={a,lang,step,settings};
  const patch = (answers = latest.current.a) => { const s=latest.current; const out=leadPatch(answers,s.lang,s.step,furthest.current,{...times.current,[chapterIds[s.step]]:(times.current[chapterIds[s.step]] || 0)+(Date.now()-entered.current)/1000},s.settings); return offerMode.current ? {...out,last_step:'offer'} : out; };
  const cache = () => { try {localStorage.setItem(draftKey(tokenRef.current),JSON.stringify({patch:patch(),pending:true}));} catch { /* browser storage unavailable */ } };
  const ensureToken = async () => {
    if (tokenRef.current) return tokenRef.current;
    if (routeToken) return null;
    if (!startPromise.current) startPromise.current = (async () => {
      const source = new URLSearchParams(location.search).get('source');
      const {data,error} = await supabase.functions.invoke('film-guide-start',{body:{lang:latest.current.lang,...(source && ['link','website','facebook','whatsapp','manual'].includes(source) ? {source} : {})}});
      if (error || !data?.token) return null;
      tokenRef.current=data.token; setToken(data.token);
      try {localStorage.setItem(TOKEN_KEY,data.token);} catch { /* unavailable */ }
      cache(); try {localStorage.removeItem(draftKey(null));} catch { /* unavailable */ } navigate(`/film-guide/${data.token}${location.search}`,{replace:true}); return data.token as string;
    })().finally(() => {startPromise.current=null;});
    return startPromise.current;
  };
  const saveChain = useRef(Promise.resolve(true));
  const save = () => {
    cache();
    const work = async () => {
      const t=await ensureToken(); if (!t) return false;
      const loaded=await supabase.functions.invoke('film-guide-load',{body:{token:t}});
      if(loaded.error || !loaded.data?.lead) return false;
      const revisionAtSave=latest.current;
      const answers=withLeadDiscount(revisionAtSave.a,loaded.data.lead);
      const current=patch(answers);
      if(answers.discount !== revisionAtSave.a.discount) setAnswers(old=>({...old,discount:answers.discount}));
      const {error}=await supabase.functions.invoke('film-guide-save',{body:{token:t,patch:current}});
      if (!error && latest.current.a === revisionAtSave.a && latest.current.step === revisionAtSave.step && latest.current.lang === revisionAtSave.lang) {try {localStorage.setItem(draftKey(t),JSON.stringify({patch:current,pending:false}));} catch { /* unavailable */ }}
      return !error;
    };
    saveChain.current = saveChain.current.then(work,work); return saveChain.current;
  };
  useEffect(() => {
    let live=true;
    (async () => {
      let stored:string|null=null; try {stored=localStorage.getItem(TOKEN_KEY);} catch { /* unavailable */ }
      const t=routeToken || stored;
      if (t && t === tokenRef.current) {setReady(true);return;}
      if (routeToken && routeToken !== tokenRef.current) {setAnswers({...initialAnswers});setStep(0);setSent(false);active.current=false;tokenRef.current=null;setToken(null);furthest.current=0;times.current={};}
      setReady(false);
      setLoadError(false);
      let local=readDraft(t);
      if (t) {
        const {data,error}=await supabase.functions.invoke('film-guide-load',{body:{token:t}});
        if (!live) return;
        if (!error && data?.lead) {
          const p=local?.pending ? local.patch : data.lead;
          setAnswers(restoreSessionAnswers(data.lead,local?.pending ? local.patch : undefined)); setStep(Math.max(0,chapterIds.indexOf(p.last_step))); setSent(Boolean(data.lead.sent_at)); setOffer(parseOffer(data.lead.custom_offer));
          if (!new URLSearchParams(location.search).has('lang')) setLang(p.lang === 'de' ? 'de' : 'en');
          furthest.current=Math.max(p.furthest_step || 0,data.lead.furthest_step || 0); times.current=p.step_times || {};entered.current=Date.now();active.current=true;tokenRef.current=t;setToken(t);
          try {localStorage.setItem(TOKEN_KEY,t);} catch { /* unavailable */ }
          if (!routeToken) navigate(`/film-guide/${t}${location.search}`,{replace:true});
          setReady(true); if(local?.pending) bump(x=>x+1); return;
        }
        // Only invalid tokens reset. Network failures retain the local draft and token.
        const invalid=error && 'context' in error && (error.context as Response)?.status === 404;
        // A personal link must never silently become a blank guide or a different couple record.
        if (routeToken) {active.current=false;setLoadError(true);setReady(true);return;}
        if (!invalid) {tokenRef.current=t;setToken(t);active.current=Boolean(local);}
        else {local=null;try {localStorage.removeItem(TOKEN_KEY);} catch { /* unavailable */ }navigate(`/film-guide${location.search}`,{replace:true});}
      }
      local=local || (!t ? readDraft(null) : null);
      if(local?.patch) {setAnswers(restoreAnswers(local.patch));setStep(Math.max(0,chapterIds.indexOf(local.patch.last_step)));furthest.current=local.patch.furthest_step || 0;times.current=local.patch.step_times || {};active.current=true;bump(x=>x+1);}
      if(live) setReady(true);
    })();return () => {live=false;};
  },[routeToken,navigate]);
  useEffect(() => {if(!ready || !active.current) return; cache();const timer=setTimeout(() => {void save();},800);return () => clearTimeout(timer);},[a,lang,step,settings,ready,revision]);
  useEffect(() => {
    const flush=()=>{if(!active.current) return;cache();const t=tokenRef.current;if(!t) return;
      const headers={'Content-Type':'application/json',apikey:import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`};
      const current=patch();
      void fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/film-guide-load`,{method:'POST',keepalive:true,headers,body:JSON.stringify({token:t})})
        .then(async response=>{if(!response.ok)return;const data=await response.json();if(!data?.lead)return;const answers=withLeadDiscount(current.answers,data.lead);const safe=leadPatch(answers,current.lang,Math.max(0,chapterIds.indexOf(current.last_step as typeof chapterIds[number])),current.furthest_step,current.step_times,latest.current.settings);if(offerMode.current)safe.last_step="offer";await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/film-guide-save`,{method:'POST',keepalive:true,headers,body:JSON.stringify({token:t,patch:safe})});}).catch(()=>{});
    };
    const hidden=()=>{if(document.visibilityState === 'hidden') flush();}; const retry=()=>{if(active.current) bump(x=>x+1);};
    document.addEventListener('visibilitychange',hidden);window.addEventListener('pagehide',flush);window.addEventListener('online',retry);
    return()=>{document.removeEventListener('visibilitychange',hidden);window.removeEventListener('pagehide',flush);window.removeEventListener('online',retry);};
  },[]);
  const touch=()=>{active.current=true;bump(x=>x+1);};
  const go=(next:number)=>{const old=latest.current.step;times.current[chapterIds[old]]=(times.current[chapterIds[old]] || 0)+(Date.now()-entered.current)/1000;entered.current=Date.now();furthest.current=Math.max(furthest.current,next);setStep(next);};
  const finish=async()=>{active.current=true;if(!await save()) return false;const t=tokenRef.current;if(!t)return false;const {data,error}=await supabase.functions.invoke('film-guide-save',{body:{token:t,patch:patch(),complete:true}});if(error || data?.completed !== true)return false;setSent(true);return true;};
  const showOffer=(on:boolean)=>{if(offerMode.current===on)return;offerMode.current=on;touch();};
  const acceptOffer=async():Promise<true|string>=>{active.current=true;const t=tokenRef.current;if(!t)return 'missing';await save();const c=latest.current.a;const {data,error}=await supabase.functions.invoke('film-guide-save',{body:{token:t,patch:{names:c.names,contact:c.contact,contact_via:c.contactVia},accept_offer:true}});
    if(!error && data?.accepted===true){setSent(true);return true;}
    let message=typeof data?.error==='string'?data.error:'';
    if(!message && error && 'context' in error){try{const body=await (error.context as Response).json();if(typeof body?.error==='string')message=body.error;}catch{/* no body */}}
    return message || 'error';};
  return {offer,showOffer,acceptOffer,a,setAnswers,lang,setLang,step,setStep:go,sent,setSent,ready,loadError,token,touch,finish};
}
