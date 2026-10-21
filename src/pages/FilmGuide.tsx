import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import FilmGuideVideo from '@/components/film-guide/FilmGuideVideo';
import FilmGuidePlan from '@/components/film-guide/FilmGuidePlan';
import FilmGuideCurrency from '@/components/film-guide/FilmGuideCurrency';
import FilmGuideOffer from '@/components/film-guide/FilmGuideOffer';
import FilmGuideOverview from '@/components/film-guide/FilmGuideOverview';
import { ChevronUp } from 'lucide-react';
import { currencyMoney, referenceRate, type GuideCurrency } from '@/lib/film-guide/currency';
import { GuideRichText } from '@/components/film-guide/FilmGuideCopy';
import { chapterCopy } from '@/lib/film-guide/copy';
import { GuideChoices, GuideField, GuideStepper, type GuideOption } from '@/components/film-guide/FilmGuideControls';
import { chapterIds, discountAmount, estimate, filmPrice, formatMoney, hoursText, initialAnswers, missingAnswers, nextChapter, priceLines, selectedExtras, startingLanguage, subtotal, toggleMulti, updateAnswer, type GuideAnswers, type Language, type Days, type Crew } from '@/lib/film-guide/logic';
import { chapters, choices, reduceLosses } from '@/lib/film-guide/content';
import { optionClips } from '@/lib/film-guide/settings';
import { optionTitle } from '@/lib/film-guide/summary';
import '@/styles/film-guide.css';
import { useGuideConfig, useGuideSession } from '@/hooks/use-film-guide';
import { guideEvent, useGuideClarity } from '@/lib/film-guide/clarity';

const chapterDefaults: Record<string, [number,number]> = { how:[53.5,56], style:[1,4], days:[9,12.5], crew:[53.5,56], shoot:[11.5,15], voices:[35.5,40], speeches:[9,12], extras:[56,60] };
const questionKey: Record<string,keyof GuideAnswers> = { how:'start', film:'loved', style:'style', days:'days', crew:'crew', shoot:'shootWhen', voices:'voices', speeches:'speechCount', extras:'extras' };

export default function FilmGuide() {
  const {settings,clips} = useGuideConfig();
  const {offer,showOffer,acceptOffer,a,setAnswers,lang,setLang,step,setStep,sent,setSent,ready,loadError,token,touch,finish} = useGuideSession(settings);
  const [sending,setSending] = useState(false);
  const [fullGuide,setFullGuide] = useState(false);
  const [offerError,setOfferError] = useState('');
  const needsDetails = useRef(false);
  const offerView = Boolean(offer) && !fullGuide;
  useEffect(() => { if (ready && !loadError) showOffer(offerView); }, [ready, loadError, offerView]); // eslint-disable-line react-hooks/exhaustive-deps
  const [currency,setCurrency] = useState<GuideCurrency>('HKD');
  const currencyInit = useRef(false);
  useEffect(() => {
    if (!ready || currencyInit.current) return;
    currencyInit.current = true;
    if (a.currency === 'EUR' || a.currency === 'HKD') setCurrency(a.currency);
  }, [ready, a.currency]);
  const [exchange,setExchange] = useState(referenceRate);
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=HKD', {signal:controller.signal})
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (typeof data?.rates?.HKD === 'number' && data.rates.HKD > 0 && typeof data.date === 'string') setExchange({rate:data.rates.HKD,date:data.date}); })
      .catch(() => { /* Retain the dated reference rate when offline. */ });
    return () => controller.abort();
  }, []);
  const [preview,setPreview] = useState<string|null>(null);
  const [lastPicked,setLastPicked] = useState<Record<string,string>>({});
  const [breakdown,setBreakdown] = useState(false);
  const [errors,setErrors] = useState<string[]>([]);
  const [toast,setToast] = useState('');
  const [reduce,setReduce] = useState<{key:'days'|'crew';value:Days|Crew}|null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const modalRef = useRef<HTMLDivElement>(null);
  const t = (en:string,de:string) => lang === 'en' ? en : de;
  const id = chapterIds[step];
  const chapter = chapters[step];
  const title = chapter[lang === 'en' ? 1 : 2];
  const copy = chapterCopy[id];
  const text = (question:string,part:'label'|'placeholder'|'description' = 'label') => copy.questions[question]?.[part]?.[lang] ?? '';
  const copyTitle = (copy.title[lang] ?? `*${title}.*`).replace('{names}',a.names || t('you two','ihr zwei'));
  const key = questionKey[id];
  const single = ['intro','about','plan'].includes(id);
  const total = estimate(a,settings);
  const gross = subtotal(a,settings);
  const discount = discountAmount(a,settings);
  useGuideClarity(token,offerView ? 'offer' : id,a,total);
  const missing = missingAnswers(id,a);
  const included = t('included','inklusive');
  const showPrices = settings.show_price_to_client;
  const money = (value:number) => currencyMoney(value,lang,currency,exchange.rate);
  const label = (field:string,value:string) => optionTitle(field,value,lang);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); },[]);
  useEffect(() => {
    if (!reduce) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modalRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const listener = (event:KeyboardEvent) => {
      if (event.key === 'Escape') setReduce(null);
      if (event.key === 'Tab') {
        const buttons = modalRef.current?.querySelectorAll<HTMLButtonElement>('button');
        if (!buttons?.length) return;
        const first = buttons[0], last = buttons[buttons.length-1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown',listener);
    return () => { document.removeEventListener('keydown',listener); previous?.focus(); };
  },[reduce]);
  const apply = <K extends keyof GuideAnswers,>(field:K,value:GuideAnswers[K]) => {
    touch();
    setAnswers(current => updateAnswer(current,field,value));
    setErrors(current => current.filter(x => x !== field));
    setSent(false);
  };
  const change = (field:keyof GuideAnswers,value:string,multi=false) => {
    if (field === 'days' && ['one','two','three'].indexOf(value) < ['one','two','three'].indexOf(a.days)) { guideEvent('guide_reduce_popup'); setReduce({key:'days',value:value as Days}); return; }
    if (field === 'crew' && a.crew === 'two' && value === 'one') { guideEvent('guide_reduce_popup'); setReduce({key:'crew',value:'one'}); return; }
    const values = a[field];
    const wasSelected = Array.isArray(values) && values.includes(value);
    apply(field,multi && Array.isArray(values) ? toggleMulti(values,value) : value as GuideAnswers[typeof field]);
    setPreview(null);
    setLastPicked(current => ({...current,[id]:wasSelected ? '' : value}));
  };
  const navigate = (direction:1|-1) => {
    if (direction === 1 && missing.length) {
      setErrors(missing);
      setToast(id === 'about' ? t('Please fill in the required fields','Bitte füllt die Pflichtfelder aus') : t('Pick at least one option to continue','Wählt mindestens eine Option, um weiterzugehen'));
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(''),2400);
      document.getElementById(`fg-${missing[0]}`)?.scrollIntoView({behavior:'smooth',block:'center'});
      return;
    }
    setStep(nextChapter(step,direction,a)); setPreview(null); setBreakdown(false); setErrors([]); setToast('');
    window.scrollTo({top:0,behavior:'smooth'});
  };
  const field = (name:'names'|'date'|'place'|'lovedNote'|'daysNote'|'contact'|'story',text:string,type='text',placeholder?:string,multiline=false) => <div id={`fg-${name}`}><GuideField label={text} value={a[name]} type={type} placeholder={placeholder} multiline={multiline} error={errors.includes(name)} onChange={value => apply(name,value)} /></div>;
  const addonPrice = (field:string,value:string) => {
    if (!showPrices) return undefined;
    let price = 0;
    if (field === 'shootLen') price = 0;
    if (field === 'shootWhen') price = value === 'dayafter' && a.days !== 'three' ? settings.prices.shootWhen.dayafter : 0;
    if (field === 'voices') price = settings.prices.voices[value as keyof typeof settings.prices.voices];
    if (field === 'extras') {
      if (a.days === 'three' && ['feature','social'].includes(value)) return t('included with 3 days','inkl. bei 3 Tagen');
      if (value === 'photo') return `${money(settings.prices.photographer.day)} ${t('per day (10 h)','pro Tag (10 Std.)')}`;
      price = settings.prices.extras[value as keyof typeof settings.prices.extras];
    }
    if (field === 'speechesFilm') price = settings.prices.speechesFilm;
    return price ? `+ ${money(price)}` : included;
  };
  const options:GuideOption[] = (choices[id] ?? []).filter(([value]) => !(id === 'shoot' && value === 'daybefore' && a.days === 'one') && !(id === 'extras' && value === 'none' && a.days === 'three')).map(([value,en,de]) => ({
    id:value,title:copy.questions[key]?.options[value]?.title?.[lang] ?? t(en,de),clip:Boolean(clips[`${key}.${value}`] || optionClips[`${key}.${value}`]),
    description:copy.questions[key]?.options[value]?.description?.[lang],
    locked:id === 'extras' && a.days === 'three' && ['feature','social'].includes(value),
    tag:copy.questions[key]?.options[value]?.tag?.[lang],
    price:!showPrices ? undefined : id === 'days' ? money(filmPrice(value as Days,a.crew,settings)) : id === 'crew' ? money(filmPrice(a.days,value as Crew,settings)) : ['shoot','voices','extras'].includes(id) ? addonPrice(key,value) : undefined,
    hours:copy.questions[key]?.options[value]?.hours?.[lang],
  }));
  const currentValue = key ? a[key] : '';
  const selected = Array.isArray(currentValue) ? currentValue : [String(currentValue)];
  const picked = lastPicked[id];
  const active = preview ?? (picked && selected.includes(picked) ? picked : selected[0]);
  const storedClip = clips[`${key}.${active}`] || clips[`chapter.${id}`];
  const clip = storedClip ? {start:storedClip.start_s,end:storedClip.end_s} : optionClips[`${key}.${active}`];
  const clipUrl = storedClip?.video_path;
  const videoUrl = clipUrl ? (/^https?:\/\//.test(clipUrl) ? clipUrl : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/hugoundnanny/${clipUrl}`) : undefined;
  const defaultClip = chapterDefaults[id];
  const complete = async () => {
    if(sending) return;
    setSending(true);
    try {
      if(!await finish()) {setToast(t('Could not finish yet. Your answers are kept - please try again.','Noch nicht abgeschlossen. Eure Antworten bleiben gespeichert - bitte versucht es erneut.'));return;}
      setToast(''); guideEvent('guide_finished');
      requestAnimationFrame(()=>document.querySelector('.fg-received')?.scrollIntoView({behavior:'smooth',block:'center'}));
    } catch {setToast(t('Could not finish. Please try again.','Abschließen fehlgeschlagen. Bitte erneut versuchen.'));}
    finally {setSending(false);}
  };
  const accept = async () => {
    if (sending) return;
    if (!a.names.trim() || !a.contact.trim()) { setOfferError(t('Please add your names and WhatsApp or email.','Bitte ergänzt eure Namen und WhatsApp oder E-Mail.')); return; }
    setSending(true); setOfferError('');
    try { const result = await acceptOffer(); if (result === true) guideEvent('guide_offer_accepted'); else setOfferError(result.length > 8 && result !== 'missing' ? result : t('Could not send. Please try again.','Senden fehlgeschlagen. Bitte erneut versuchen.')); }
    finally { setSending(false); }
  };
  const simulated = reduce ? updateAnswer(a,reduce.key,reduce.value) : a;
  const losses = reduce?.key === 'crew' ? [...reduceLosses.crew,...(a.speechesFilm.length ? [[t('Your speeches film would be filmed from one angle only','Euer Reden-Film wäre nur aus einer Perspektive gefilmt'),t('Your speeches film would be filmed from one angle only','Euer Reden-Film wäre nur aus einer Perspektive gefilmt')] as [string,string]] : [])] : reduce ? [...(a.days === 'three' ? reduceLosses.three : []),...(reduce.value === 'one' ? reduceLosses.two : [])] : [];
  if(!ready) return <div className="film-guide-page"><main className="fg-stage"><p role="status">{t('Loading your guide…','Euer Guide lädt…')}</p></main></div>;
  if(loadError) return <div className="film-guide-page"><main className="fg-stage"><h1>{t('Your personal guide could not be loaded.','Euer persönlicher Guide konnte nicht geladen werden.')}</h1><p role="alert">{t('Please ask Hugo + Nanny to check your link. Your saved names, currency and discount have not been changed.','Bitte fragt Hugo + Nanny, euren Link zu prüfen. Eure gespeicherten Namen, Währung und Rabatt wurden nicht geändert.')}</p><Button variant="outline" onClick={()=>window.location.reload()}>{t('Try again','Erneut versuchen')}</Button></main></div>;
  return <div className="film-guide-page">
    <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" /><meta name="twitter:card" content="summary" /></Helmet>
    <SEO title="Film Guide | hugo + nanny" description="Explore your wedding film with Hugo + Nanny, one chapter at a time." path="/film-guide" />
    <header className="fg-top"><div className="fg-top-inner"><Link className="fg-wordmark" to="/">hugo + nanny</Link>{offer && fullGuide && <Button variant="link" className="fg-offer-back" onClick={() => {setFullGuide(false);window.scrollTo({top:0});}}>← {t('Back to your offer','Zurück zu eurem Angebot')}</Button>}<span className="fg-top-step fg-label">{!offerView && step ? `${String(step).padStart(2,'0')} / 11 · ${title}` : ''}</span><div className="fg-lang">{(['en','de'] as const).map(language => <Button variant="ghost" key={language} className={language === lang ? 'fg-on' : ''} aria-pressed={language === lang} onClick={() => {touch();setLang(language);}}>{language.toUpperCase()}</Button>)}</div></div><progress className="fg-progress" max={11} value={step} aria-label={t('Progress','Fortschritt')} /></header>
    {offerView && offer ? <main className="fg-stage"><FilmGuideOffer offer={offer} lang={lang} names={a.names} date={a.date} place={a.place} contact={a.contact} needsDetails={!a.names.trim() || !a.contact.trim() || needsDetails.current} sent={sent} sending={sending} error={offerError} whatsapp={settings.whatsapp} onNames={value => {needsDetails.current=true;apply('names',value);}} onContact={value => {needsDetails.current=true;apply('contact',value);apply('contactVia',value.includes('@') ? 'email' : 'whatsapp');}} onAccept={() => void accept()} onFullGuide={() => {setFullGuide(true);window.scrollTo({top:0});}} /></main> : <><main className="fg-stage"><section key={id} className={`fg-chapter${single ? ' fg-single' : ''}`}><div className="fg-copy"><span className="fg-label">{step ? `${String(step).padStart(2,'0')} - ${title}` : title}</span>
      {id === 'intro' ? <h1><GuideRichText text={copyTitle} /></h1> : <h2><GuideRichText text={copyTitle} /></h2>}
      {copy.paragraphs.map((paragraph,index) => <p className="fg-lead" key={index}><GuideRichText text={paragraph[lang] ?? ''} /></p>)}
      {copy.points.length > 0 && <ul className="fg-points">{copy.points.map((point,index) => <li key={index}><span><GuideRichText text={point[lang] ?? ''} /></span></li>)}</ul>}
      {copy.afterList[lang] && <p className="fg-lead"><GuideRichText text={copy.afterList[lang] ?? ''} /></p>}
      {['intro','about'].includes(id) && <p className="fg-fine">{t('We save your answers as you go, so you can come back later.','Wir speichern eure Antworten automatisch, damit ihr später weitermachen könnt.')}</p>}
      {id === 'intro' && <div className="fg-fields">{field('names',t('Your names','Eure Namen'),'text','Mira + Jonas')}</div>}
      {copy.included && <div className="fg-included">{copy.included.map((row,index) => <div key={index}><span>{row[lang]}</span><span>{included}</span></div>)}</div>}
      {id === 'shoot' && <div id="fg-shootLen"><GuideChoices label={text('shootLen')} compact selected={[a.shootLen]} onChange={value => change('shootLen',value)} options={['h1','h15','h2'].map(value => ({id:value,title:label('shootLen',value),price:addonPrice('shootLen',value)}))} /></div>}
      {options.length > 0 && key && <div id={`fg-${key}`}><GuideChoices label={text(key)} options={options} selected={id === 'extras' ? selectedExtras(a) : selected} multi={['film','voices','extras'].includes(id)} compact={['film','speeches'].includes(id)} onChange={value => change(key,value,['film','voices','extras'].includes(id))} onPreview={setPreview} /></div>}
      {id === 'film' && a.loved.includes('other') && <div className="fg-fields">{field('lovedNote',text('lovedNote'),'text',text('lovedNote','placeholder'))}</div>}
      {id === 'extras' && <>
        {selectedExtras(a).includes('social') && <GuideStepper label={t('How many social shorts?','Wie viele Social Shorts?')} description={t('Each short is cut vertically, ready to post.','Jeder Short wird vertikal geschnitten, bereit zum Posten.')} value={a.socialCount} min={1} max={3} onChange={value => apply('socialCount',value)} detail={a.days === 'three' ? included : `${money(settings.prices.extras.social)} ${t('each','pro Short')}`} />}
        {a.extras.includes('photo') && <GuideStepper label={t('Photographer - how many days?','Fotograf - wie viele Tage?')} description={t('One of our trusted photographers, 10 h per day, same look as the film.','Einer unserer Fotografen, 10 Std. pro Tag, im gleichen Look wie der Film.')} value={Math.max(1,a.photoDays)} min={1} max={3} onChange={value => apply('photoDays',value)} detail={showPrices ? `${money(settings.prices.photographer.day)} ${t('per day','pro Tag')}` : undefined} />}
        <GuideStepper label={t('Content creation package','Content-Creation-Paket')} description={t('A dedicated creator films vertical behind-the-scenes content on a phone all day - reels, stories, everything raw and immediate.','Ein eigener Creator filmt den ganzen Tag vertikalen Behind-the-Scenes-Content auf dem Handy - Reels, Stories, alles roh und direkt.')} value={a.contentDays} min={0} max={3} onChange={value => apply('contentDays',value)} detail={showPrices ? `${money(settings.prices.contentCreator.day)} ${t('per day','pro Tag')}` : undefined} />
      </>}
      {id === 'days' && <>{a.days !== 'one' && <div className="fg-fields">{field('daysNote',text('daysNote'),'text',text('daysNote','placeholder'))}</div>}<GuideStepper label={text('extraHours')} description={text('extraHours','description')} value={a.extraHours} onChange={value => apply('extraHours',value)} detail={`${showPrices ? `${money(settings.prices.extraHour[a.crew])} ${t('per hour','pro Stunde')} · ` : ''}${t('Total','Gesamt')}: ${hoursText(a,lang,settings)}`} /></>}
      {id === 'speeches' && <><GuideChoices label={text('speechesFilm')} multi selected={a.speechesFilm} onChange={value => change('speechesFilm',value,true)} options={[{id:'yes',title:label('speechesFilm','yes'),description:copy.questions.speechesFilm?.options.yes?.description?.[lang],price:addonPrice('speechesFilm','yes')}]} />{a.speechesFilm.length > 0 && a.crew === 'one' && <p className="fg-pkg">{copy.note?.[lang]}</p>}</>}
      {id === 'about' && <div className="fg-fields">{field('names',t('Your names *','Eure Namen *'),'text','Mira + Jonas')}<div className="fg-two">{field('date',t('Wedding date *','Hochzeitsdatum *'),'date')}<label className="fg-field"><span>{t('Guests','Gäste')}</span><select value={a.guests} onChange={e => apply('guests',e.target.value)}><option value="">-</option><option value="under40">{t('Under 40','Unter 40')}</option>{['40-80','80-120','120+'].map(value => <option key={value}>{value}</option>)}</select></label></div>{field('place',t('Venue / location','Ort / Location'),'text','Köln, Toskana, ...')}<div className="fg-field"><span>{t('Best reached via','Am besten erreichbar per')}</span><div className="fg-seg">{(['whatsapp','email'] as const).map(via => <Button variant="ghost" key={via} className={via === a.contactVia ? 'fg-on' : ''} onClick={() => apply('contactVia',via)}>{via === 'whatsapp' ? 'WhatsApp' : 'E-Mail'}</Button>)}</div></div>{field('contact',a.contactVia === 'whatsapp' ? t('WhatsApp number *','WhatsApp-Nummer *') : t('Email *','E-Mail *'),a.contactVia === 'whatsapp' ? 'tel' : 'email')}{field('story',t('And this is our story (optional)','Und das ist unsere Geschichte (optional)'),'text',undefined,true)}<p className="fg-fine"><Link to="/privacy">{t('Privacy policy','Datenschutzerklärung')}</Link></p></div>}
      {id === 'plan' && <><FilmGuidePlan answers={a} lang={lang} onFinish={complete} sent={sent} settings={settings} sending={sending} formatAmount={money} />{showPrices && currency === 'HKD' && <p className="fg-fine">{t('Indicative HKD conversion. Final quote in EUR.','Unverbindliche HKD-Umrechnung. Finales Angebot in EUR.')} 1 EUR = {exchange.rate} HKD · {exchange.date}</p>}</>}
    </div>{!single && <aside className="fg-media"><FilmGuideVideo src={videoUrl} caption={id === 'film' ? undefined : options.find(o => o.id === active)?.title ?? title} start={clip?.start ?? defaultClip?.[0] ?? 0} end={id === 'film' ? undefined : clip?.end ?? defaultClip?.[1]} soundLabel={t('Toggle sound','Ton umschalten')} /></aside>}</section>{id === 'intro' && <FilmGuideVideo intro src={clips['chapter.intro']?.video_path || settings.reel_url} soundLabel="" />}</main>
    <footer className="fg-dock"><div className="fg-dock-inner">{step > 0 && <Button variant="ghost" className="fg-back" onClick={() => navigate(-1)}>← {t('Back','Zurück')}</Button>}{(step > 1 || a.discount > 0) && showPrices ? <div className="fg-estimate-group"><div className="fg-est" aria-live="polite" aria-atomic="true"><span className="fg-label">{a.discount > 0 ? t(`Your estimate · ${a.discount}% off`, `Eure Schätzung · ${a.discount}% Rabatt`) : t('Your estimate','Eure Schätzung')}</span><span className="fg-num">{discount > 0 && <s className="fg-gross">{money(gross)}</s>}<span key={total} className={discount > 0 ? 'fg-num-discounted' : ''}>{money(total)}</span> <small>{t('net','netto')}</small></span>{a.discount > 0 && <em key={gross} className="fg-discount-tag fg-dock-discount">{t('You save','Ihr spart')} {money(discount)}</em>}</div><FilmGuideCurrency currency={currency} onChange={setCurrency} lang={lang} /><Button variant="outline" className={`fg-overview-trigger${breakdown ? ' fg-open' : ''}`} aria-expanded={breakdown} aria-controls="fg-breakdown" onClick={() => {if(!breakdown) guideEvent('guide_breakdown_open');setBreakdown(value => !value);}}>{t('View overview','Übersicht ansehen')}<ChevronUp size={16} /></Button></div> : <div className="fg-dock-space" />}{step < 11 && <Button className={`fg-btn${missing.length ? ' fg-off' : ''}`} onClick={() => navigate(1)}>{step === 0 ? t("Let's begin",'Los geht’s') : step === 10 ? t('See our plan','Unser Plan') : t('Continue','Weiter')}</Button>}</div></footer></>}
    {breakdown && showPrices && <FilmGuideOverview answers={a} lang={lang} settings={settings} money={money} gross={gross} discount={discount} total={total} onClose={() => setBreakdown(false)} />}
    {toast && <div className="fg-toast" role="status">{toast}</div>}
    {reduce && <div className="fg-modal" onClick={() => setReduce(null)}><div className="fg-sheet" role="dialog" aria-modal="true" aria-labelledby="fg-reduce-title" ref={modalRef} onClick={event => event.stopPropagation()}><span className="fg-label">{t('Just checking','Kurz nachgefragt')}</span><h3 id="fg-reduce-title">{t('Reduce to','Wirklich auf')} “{label(reduce.key,reduce.value)}”{t('?',' reduzieren?')}</h3><p>{t('Your film would lose:','Euer Film würde verlieren:')}</p><ul>{losses.map(([en,de]) => <li key={en}>{t(en,de)}</li>)}</ul>{showPrices && <p className="fg-fine">{t('Estimate','Schätzung')}: {money(total)} → {money(estimate(simulated,settings))}</p>}<div className="fg-send"><Button className="fg-btn" onClick={() => {guideEvent('guide_reduce_kept');setReduce(null);}}>{lang === 'en' ? `Keep ${label(reduce.key,a[reduce.key]).toLowerCase()}` : `${label(reduce.key,a[reduce.key])} behalten`}</Button><Button variant="outline" className="fg-btn fg-ghost" onClick={() => { guideEvent('guide_reduce_confirmed');touch();setAnswers(simulated); setReduce(null); setPreview(null); }}>{t('Yes, reduce','Ja, reduzieren')}</Button></div></div></div>}
  </div>;
}
