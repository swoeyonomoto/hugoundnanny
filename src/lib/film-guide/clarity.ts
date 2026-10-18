import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { GuideAnswers } from './logic';
let permitted=false;
export const guideEvent=(event:string)=>{if(permitted) window.clarity?.('event',event);};
export function useGuideClarity(token:string|null, chapter:string, a:GuideAnswers,total:number) {
  const [allowed,setAllowed]=useState(false);
  useEffect(()=>{let live=true;const check=async()=>{const {data,error}=await supabase.rpc('film_guide_is_admin');if(!live)return;permitted=!error && data === false;setAllowed(permitted);if(permitted && !window.clarity){const queue: unknown[][]=[];window.clarity=(...args:unknown[])=>{queue.push(args);};Object.assign(window.clarity,{q:queue});const script=document.createElement('script');script.id='film-guide-clarity';script.async=true;script.src='https://www.clarity.ms/tag/w37cyu9vbh';document.head.appendChild(script);}if(!permitted)window.clarity?.('stop');};void check();const {data:{subscription}}=supabase.auth.onAuthStateChange(()=>{setTimeout(()=>void check(),0);});return()=>{live=false;permitted=false;window.clarity?.('stop');subscription.unsubscribe();};},[]);
  useEffect(()=>{if(allowed && token)window.clarity?.('identify',token);},[allowed,token]);
  useEffect(()=>{if(!allowed)return;window.clarity?.('set','guide_step',chapter);guideEvent(`guide_step_${chapter}`);},[allowed,chapter]);
  useEffect(()=>{if(!allowed)return;for(const key of ['days','crew','start'] as const)window.clarity?.('set',key,a[key]);window.clarity?.('set','estimate_band',total<6000?'<6k':total<9000?'6-9k':total<12000?'9-12k':'12k+');},[allowed,a.days,a.crew,a.start,total]);
}
