import { completionUpdate, notifyCompletion, readyToFinish, RESPONSE_HOURS } from './completion.ts';
function equal(actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
Deno.test('completion promises a response within 48 hours', () => equal(RESPONSE_HOURS, 48));
Deno.test('completion records receipt and sent status for an in-progress couple', () => {
  equal(completionUpdate({status:'in progress',sent_at:null},'2026-10-18T21:00:00Z'),{sent_at:'2026-10-18T21:00:00Z',status:'sent'});
});
Deno.test('completion preserves booked status and existing receipt timestamp', () => {
  equal(completionUpdate({status:'booked',sent_at:'2026-10-17T21:00:00Z'},'2026-10-18T21:00:00Z'),{sent_at:'2026-10-17T21:00:00Z'});
});
Deno.test('completion requires final chapter 11 and contact details', () => {
  const lead={names:'Joey + Seli',wedding_date:'2027-11-01',contact:'test@example.com',last_step:'plan',furthest_step:11};
  equal(readyToFinish(lead),true);
  equal(readyToFinish({...lead,last_step:'crew',furthest_step:5}),false);
  equal(readyToFinish({...lead,contact:''}),false);
});
Deno.test('notification uses saved estimate and excludes personal token and admin notes', async () => {
  const lead={names:'Joey + Seli',wedding_date:'2027-11-01',location:'Hong Kong',contact:'test@example.com',contact_via:'email',estimate_eur:6750,package_hint:'Two eyes',token:'joey_+_seli_v01',admin_note:'private'};
  const fake=async (_url: unknown, init?: RequestInit) => {
    const body=JSON.parse(String(init?.body));
    equal(body.saved_estimate_eur,6750); equal(body.token,undefined); equal(body.admin_note,undefined);
    return new Response(JSON.stringify({ok:true}),{status:200});
  };
  equal(await notifyCompletion(lead,fake as typeof fetch),true);
});
Deno.test('notification failure is not reported as delivered', async () => {
  const fake=async()=>new Response('{}',{status:500});
  equal(await notifyCompletion({names:'Joey + Seli',wedding_date:null,location:null,contact:null,contact_via:null,estimate_eur:6750,package_hint:null},fake as typeof fetch),false);
});