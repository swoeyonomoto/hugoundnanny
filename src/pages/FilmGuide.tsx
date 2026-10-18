import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import FilmGuideVideo from '@/components/film-guide/FilmGuideVideo';
import FilmGuidePlan from '@/components/film-guide/FilmGuidePlan';
import { GuideChoices, GuideField, GuideStepper, type GuideOption } from '@/components/film-guide/FilmGuideControls';
import { chapterIds, estimate, filmPrice, formatMoney, hoursText, initialAnswers, missingAnswers, nextChapter, priceLines, selectedExtras, startingLanguage, toggleMulti, updateAnswer, type GuideAnswers, type Language, type Days, type Crew } from '@/lib/film-guide/logic';
import { chapters, choices, reduceLosses } from '@/lib/film-guide/content';
import { defaultSettings as settings, optionClips } from '@/lib/film-guide/settings';
import { formattedDate, optionTitle, planMessage } from '@/lib/film-guide/summary';
import '@/styles/film-guide.css';

const chapterDefaults: Record<string, [number,number]> = { how:[53.5,56], style:[1,4], days:[9,12.5], crew:[53.5,56], shoot:[11.5,15], voices:[35.5,40], speeches:[9,12], extras:[56,60] };
const questionKey: Record<string,keyof GuideAnswers> = { how:'start', film:'loved', style:'style', days:'days', crew:'crew', shoot:'shootWhen', voices:'voices', speeches:'speechCount', extras:'extras' };

export default function FilmGuide() {
  const [lang,setLang] = useState<Language>(() => startingLanguage(window.location.search,navigator.language));
  const [step,setStep] = useState(0);
  const [a,setAnswers] = useState<GuideAnswers>({...initialAnswers});
  const [preview,setPreview] = useState<string|null>(null);
  const [lastPicked,setLastPicked] = useState<Record<string,string>>({});
  const [breakdown,setBreakdown] = useState(false);
  const [errors,setErrors] = useState<string[]>([]);
  const [toast,setToast] = useState('');
  const [sent,setSent] = useState(false);
  const [reduce,setReduce] = useState<{key:'days'|'crew';value:Days|Crew}|null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const modalRef = useRef<HTMLDivElement>(null);
  const t = (en:string,de:string) => lang === 'en' ? en : de;
  const id = chapterIds[step];
  const chapter = chapters[step];
  const title = chapter[lang === 'en' ? 1 : 2];
  const key = questionKey[id];
  const single = ['intro','about','plan'].includes(id);
  const total = estimate(a);
  const missing = missingAnswers(id,a);
  const included = t('included','inklusive');
  const showPrices = settings.show_price_to_client;
  const money = (value:number) => formatMoney(value,lang);
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
    setAnswers(current => updateAnswer(current,field,value));
    setErrors(current => current.filter(x => x !== field));
    setSent(false);
  };
  const change = (field:keyof GuideAnswers,value:string,multi=false) => {
    if (field === 'days' && ['one','two','three'].indexOf(value) < ['one','two','three'].indexOf(a.days)) { setReduce({key:'days',value:value as Days}); return; }
    if (field === 'crew' && a.crew === 'two' && value === 'one') { setReduce({key:'crew',value:'one'}); return; }
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
    if (field === 'shootLen') price = a.days === 'three' && a.shootWhen === 'dayafter' ? 0 : settings.prices.shootLen[value as keyof typeof settings.prices.shootLen];
    if (field === 'shootWhen') price = value === 'dayafter' && a.days !== 'three' ? 600 : 0;
    if (field === 'voices') price = settings.prices.voices[value as keyof typeof settings.prices.voices];
    if (field === 'extras') {
      if (a.days === 'three' && ['feature','social'].includes(value)) return t('included with 3 days','inkl. bei 3 Tagen');
      price = settings.prices.extras[value as keyof typeof settings.prices.extras];
    }
    if (field === 'speechesFilm') price = settings.prices.speechesFilm;
    return price ? `+ ${money(price)}` : included;
  };
  const options:GuideOption[] = (choices[id] ?? []).filter(([value]) => !(id === 'shoot' && value === 'daybefore' && a.days === 'one') && !(id === 'extras' && value === 'none' && a.days === 'three')).map(([value,en,de]) => ({
    id:value,title:t(en,de),clip:Boolean(optionClips[`${key}.${value}`]),
    locked:id === 'extras' && a.days === 'three' && ['feature','social'].includes(value),
    tag:['days','crew'].includes(id) && value === 'two' ? t('Recommended','Empfohlen') : undefined,
    price:!showPrices ? undefined : id === 'days' ? money(filmPrice(value as Days,a.crew)) : id === 'crew' ? money(filmPrice(a.days,value as Crew)) : ['shoot','voices','extras'].includes(id) ? addonPrice(key,value) : undefined,
    hours:id === 'days' ? hoursText({...a,days:value as Days,extraHours:0},lang) : undefined,
  }));
  const currentValue = key ? a[key] : '';
  const selected = Array.isArray(currentValue) ? currentValue : [String(currentValue)];
  const picked = lastPicked[id];
  const active = preview ?? (picked && selected.includes(picked) ? picked : selected[0]);
  const clip = optionClips[`${key}.${active}`];
  const defaultClip = chapterDefaults[id];
  const priceLabel = (lineKey:string) => lineKey === 'film' ? `Film · ${label('days',a.days)} · ${label('crew',a.crew)}` : lineKey === 'extraHours' ? `${a.extraHours} ${t('extra hours','Zusatzstunden')}` : label(lineKey.split('.')[0],lineKey.split('.')[1]);
  const send = (via:'whatsapp'|'email') => {
    const text = planMessage(a,lang,showPrices);
    if (via === 'whatsapp') window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');
    else {
      const subject = `${t('Our film plan','Unser Filmplan')} - ${a.names} · ${formattedDate(a.date,lang)}`;
      window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setSent(true);
  };
  const simulated = reduce ? updateAnswer(a,reduce.key,reduce.value) : a;
  const losses = reduce?.key === 'crew' ? [...reduceLosses.crew,...(a.speechesFilm.length ? [[t('Your speeches film would be filmed from one angle only','Euer Reden-Film wäre nur aus einer Perspektive gefilmt'),t('Your speeches film would be filmed from one angle only','Euer Reden-Film wäre nur aus einer Perspektive gefilmt')] as [string,string]] : [])] : reduce ? [...(a.days === 'three' ? reduceLosses.three : []),...(reduce.value === 'one' ? reduceLosses.two : [])] : [];
  return <div className="film-guide-page">
    <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap" /><meta name="twitter:card" content="summary" /></Helmet>
    <SEO title="Film Guide | hugo + nanny" description="Explore your wedding film with Hugo + Nanny, one chapter at a time." path="/film-guide" />
    <header className="fg-top"><div className="fg-top-inner"><Link className="fg-wordmark" to="/">hugo + nanny</Link><span className="fg-top-step fg-label">{step ? `${String(step).padStart(2,'0')} / 11 · ${title}` : ''}</span><div className="fg-lang">{(['de','en'] as const).map(language => <Button variant="ghost" key={language} className={language === lang ? 'fg-on' : ''} aria-pressed={language === lang} onClick={() => setLang(language)}>{language.toUpperCase()}</Button>)}</div></div><progress className="fg-progress" max={11} value={step} aria-label={t('Progress','Fortschritt')} /></header>
    <main className="fg-stage"><section key={id} className={`fg-chapter${single ? ' fg-single' : ''}`}><div className="fg-copy"><span className="fg-label">{step ? `${String(step).padStart(2,'0')} - ${title}` : title}</span>
      {id === 'intro' ? <><h1>{t('Your wedding film.','Euer Hochzeitsfilm.')} <em>{t('The film guide.','Der Film-Guide.')}</em></h1><div className="fg-fields">{field('names',t('Your names','Eure Namen'),'text','Mira + Jonas')}</div></> : <h2>{id === 'how' ? <>{t('Hey','Hey')} {a.names || t('you two','ihr zwei')}, <em>{title}.</em></> : <em>{title}.</em>}</h2>}
      {id === 'shoot' && <div id="fg-shootLen"><GuideChoices label={t('How long?','Wie lange?')} compact selected={[a.shootLen]} onChange={value => change('shootLen',value)} options={['h1','h15','h2'].map(value => ({id:value,title:label('shootLen',value),price:addonPrice('shootLen',value)}))} /></div>}
      {options.length > 0 && key && <div id={`fg-${key}`}><GuideChoices label={t('Your choice','Eure Wahl')} options={options} selected={id === 'extras' ? selectedExtras(a) : selected} multi={['film','voices','extras'].includes(id)} compact={['film','speeches'].includes(id)} onChange={value => change(key,value,['film','voices','extras'].includes(id))} onPreview={setPreview} /></div>}
      {id === 'film' && a.loved.includes('other') && <div className="fg-fields">{field('lovedNote',t('Tell us what it was','Erzählt uns, was es war'))}</div>}
      {id === 'days' && <>{a.days !== 'one' && <div className="fg-fields">{field('daysNote',t('Your own plan for the extra days (optional)','Euer eigener Plan für die Zusatztage (optional)'))}</div>}<GuideStepper label={t('Need more time?','Mehr Zeit nötig?')} value={a.extraHours} onChange={value => apply('extraHours',value)} detail={`${showPrices ? `${money(settings.prices.extraHour[a.crew])} ${t('per hour','pro Stunde')} · ` : ''}${t('Total','Gesamt')}: ${hoursText(a,lang)}`} /></>}
      {id === 'speeches' && <><GuideChoices label={t('Keep them forever','Für immer behalten')} multi selected={a.speechesFilm} onChange={value => change('speechesFilm',value,true)} options={[{id:'yes',title:label('speechesFilm','yes'),price:addonPrice('speechesFilm','yes')}]} />{a.speechesFilm.length > 0 && a.crew === 'one' && <p className="fg-pkg">{t('With one cinematographer we can’t set up a fixed speech camera and film reactions at the same time. For a speeches film we recommend two.','Mit einer Kamera können wir nicht gleichzeitig eine feste Reden-Kamera einrichten und Reaktionen filmen. Für einen Reden-Film empfehlen wir zwei.')}</p>}</>}
      {id === 'extras' && <div className="fg-included">{[t('Highlight film, 4-5 min','Highlight-Film, 4-5 Min.'),t('Drone footage','Drohnenaufnahmen'),t('Licensed music + colour grading','Lizenzierte Musik + Colorgrading'),t('Sneak peek within 2 weeks','Sneak Peek innerhalb von 2 Wochen')].map(text => <div key={text}><span>{text}</span><span>{included}</span></div>)}</div>}
      {id === 'about' && <div className="fg-fields">{field('names',t('Your names *','Eure Namen *'),'text','Mira + Jonas')}<div className="fg-two">{field('date',t('Wedding date *','Hochzeitsdatum *'),'date')}<label className="fg-field"><span>{t('Guests','Gäste')}</span><select value={a.guests} onChange={e => apply('guests',e.target.value)}><option value="">-</option><option value="under40">{t('Under 40','Unter 40')}</option>{['40-80','80-120','120+'].map(value => <option key={value}>{value}</option>)}</select></label></div>{field('place',t('Venue / location','Ort / Location'),'text','Köln, Toskana, ...')}<div className="fg-field"><span>{t('Best reached via','Am besten erreichbar per')}</span><div className="fg-seg">{(['whatsapp','email'] as const).map(via => <Button variant="ghost" key={via} className={via === a.contactVia ? 'fg-on' : ''} onClick={() => apply('contactVia',via)}>{via === 'whatsapp' ? 'WhatsApp' : 'E-Mail'}</Button>)}</div></div>{field('contact',a.contactVia === 'whatsapp' ? t('WhatsApp number *','WhatsApp-Nummer *') : t('Email *','E-Mail *'),a.contactVia === 'whatsapp' ? 'tel' : 'email')}{field('story',t('And this is our story (optional)','Und das ist unsere Geschichte (optional)'),'text',undefined,true)}<p className="fg-fine"><Link to="/privacy">{t('Privacy policy','Datenschutzerklärung')}</Link></p></div>}
      {id === 'plan' && <FilmGuidePlan answers={a} lang={lang} onSend={send} sent={sent} />}
    </div>{!single && <aside className="fg-media"><FilmGuideVideo caption={id === 'film' ? undefined : options.find(o => o.id === active)?.title ?? title} start={clip?.start ?? defaultClip?.[0] ?? 0} end={id === 'film' ? undefined : clip?.end ?? defaultClip?.[1]} soundLabel={t('Toggle sound','Ton umschalten')} /></aside>}</section>{id === 'intro' && <FilmGuideVideo intro soundLabel="" />}</main>
    <footer className="fg-dock"><div className="fg-dock-inner">{step > 0 && <Button variant="ghost" className="fg-back" onClick={() => navigate(-1)}>← {t('Back','Zurück')}</Button>}{step > 1 && showPrices ? <Button variant="ghost" className="fg-est" aria-expanded={breakdown} aria-controls="fg-breakdown" onClick={() => setBreakdown(value => !value)}><span className="fg-label">{t('Your estimate','Eure Schätzung')}</span><span className="fg-num">{money(total)} <small>{t('net','netto')}</small></span></Button> : <div className="fg-dock-space" />}{step < 11 && <Button className={`fg-btn${missing.length ? ' fg-off' : ''}`} onClick={() => navigate(1)}>{step === 0 ? t("Let's begin",'Los geht’s') : step === 10 ? t('See our plan','Unser Plan') : t('Continue','Weiter')}</Button>}</div></footer>
    {breakdown && showPrices && <div id="fg-breakdown" className="fg-breakdown" role="region" aria-label={t('Estimate breakdown','Preisübersicht')}>{priceLines(a).map(line => <div key={line.key}><span>{priceLabel(line.key)}</span><span>{line.amount ? money(line.amount) : included}</span></div>)}<div><b>{t('Your estimate','Eure Schätzung')}</b><b>{money(total)}</b></div><p className="fg-fine">{t('Net, excl. VAT, travel & accommodation.','Netto, zzgl. MwSt., Reise & Unterkunft.')}</p></div>}
    {toast && <div className="fg-toast" role="status">{toast}</div>}
    {reduce && <div className="fg-modal" onClick={() => setReduce(null)}><div className="fg-sheet" role="dialog" aria-modal="true" aria-labelledby="fg-reduce-title" ref={modalRef} onClick={event => event.stopPropagation()}><span className="fg-label">{t('Just checking','Kurz nachgefragt')}</span><h3 id="fg-reduce-title">{t('Reduce to','Wirklich auf')} “{label(reduce.key,reduce.value)}”{t('?',' reduzieren?')}</h3><p>{t('Your film would lose:','Euer Film würde verlieren:')}</p><ul>{losses.map(([en,de]) => <li key={en}>{t(en,de)}</li>)}</ul>{showPrices && <p className="fg-fine">{t('Estimate','Schätzung')}: {money(total)} → {money(estimate(simulated))}</p>}<div className="fg-send"><Button className="fg-btn" onClick={() => setReduce(null)}>{lang === 'en' ? `Keep ${label(reduce.key,a[reduce.key]).toLowerCase()}` : `${label(reduce.key,a[reduce.key])} behalten`}</Button><Button variant="outline" className="fg-btn fg-ghost" onClick={() => { setAnswers(simulated); setReduce(null); setPreview(null); }}>{t('Yes, reduce','Ja, reduzieren')}</Button></div></div></div>}
  </div>;
}
