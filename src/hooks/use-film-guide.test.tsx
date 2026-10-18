import { renderHook, waitFor, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defaultSettings } from '@/lib/film-guide/settings';

const mocks = vi.hoisted(() => ({ invoke: vi.fn(), navigate: vi.fn() }));
vi.mock('react-router-dom', () => ({ useNavigate: () => mocks.navigate, useParams: () => ({ token: 'joey_+_seli_v01' }) }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { functions: { invoke: mocks.invoke } } }));
import { useGuideSession } from './use-film-guide';

describe('Personal couple link loading', () => {
  beforeEach(() => { vi.clearAllMocks(); localStorage.clear(); });
  afterEach(cleanup);
  it('does not redirect or create a duplicate guide when a custom link returns not found', async () => {
    mocks.invoke.mockResolvedValue({ data: null, error: { context: { status: 404 } } });
    const { result } = renderHook(() => useGuideSession(defaultSettings));
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.loadError).toBe(true);
    expect(mocks.navigate).not.toHaveBeenCalled();
    await act(async () => { expect(await result.current.finish()).toBe(false); });
    expect(mocks.invoke.mock.calls.some(([name]) => name === 'film-guide-start')).toBe(false);
  });
  it('loads Joey + Seli with EUR first and their 35 percent discount', async () => {
    mocks.invoke.mockResolvedValue({ data: { lead: { names: 'Joey + Seli', answers: { currency: 'EUR', discount: 35 }, last_step: 'intro', furthest_step: 0 } }, error: null });
    const { result } = renderHook(() => useGuideSession(defaultSettings));
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.a.names).toBe('Joey + Seli');
    expect(result.current.a.currency).toBe('EUR');
    expect(result.current.a.discount).toBe(35);
    expect(result.current.loadError).toBe(false);
  });
  it('finishes only after saved completion is acknowledged', async () => {
    mocks.invoke.mockImplementation(async (name, options) => name === 'film-guide-load' ? {data:{lead:{names:'Joey + Seli',last_step:'plan',furthest_step:11}},error:null} : {data:options?.body?.complete ? {ok:true,completed:true} : {ok:true},error:null});
    const {result}=renderHook(()=>useGuideSession(defaultSettings));
    await waitFor(()=>expect(result.current.ready).toBe(true));
    await act(async()=>{expect(await result.current.finish()).toBe(true);});
    expect(result.current.sent).toBe(true);
    expect(mocks.invoke).toHaveBeenCalledWith('film-guide-save',expect.objectContaining({body:expect.objectContaining({token:'joey_+_seli_v01',complete:true})}));
    expect(mocks.invoke.mock.calls.some(([name])=>name==='film-guide-send')).toBe(false);
  });
  it('does not show receipt when saving completion fails', async () => {
    mocks.invoke.mockImplementation(async (name, options) => name === 'film-guide-load' ? {data:{lead:{names:'Joey + Seli',last_step:'plan',furthest_step:11}},error:null} : options?.body?.complete ? {data:null,error:{message:'unavailable'}} : {data:{ok:true},error:null});
    const {result}=renderHook(()=>useGuideSession(defaultSettings));
    await waitFor(()=>expect(result.current.ready).toBe(true));
    await act(async()=>{expect(await result.current.finish()).toBe(false);});
    expect(result.current.sent).toBe(false);
  });
});