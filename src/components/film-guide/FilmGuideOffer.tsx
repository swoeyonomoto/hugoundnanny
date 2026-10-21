import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { offerDate, offerMoney, offerPrice, type CustomOffer } from '@/lib/film-guide/offer';
import type { Language } from '@/lib/film-guide/logic';

export function OfferPrice({ offer, lang }: { offer: Pick<CustomOffer, 'price' | 'discount_pct' | 'currency' | 'valid_until'>; lang: Language }) {
  const t = (en: string, de: string) => lang === 'en' ? en : de;
  const p = offerPrice(offer);
  const m = (n: number) => offerMoney(n, offer.currency, lang);
  return <div className="fg-offer-price">
    <span className="fg-label">{p.pct > 0 ? t(`Your price · ${p.pct}% off`, `Euer Preis · ${p.pct}% Rabatt`) : t('Your price', 'Euer Preis')}</span>
    {p.pct > 0 && <s className="fg-gross">{m(p.original)}</s>}
    <strong>{m(p.final)}</strong>
    {p.saved > 0 && <span className="fg-offer-save">{t('You save', 'Ihr spart')} {m(p.saved)}</span>}
    {offer.valid_until && <small>{t('Valid until', 'Gültig bis')} {offerDate(offer.valid_until, lang)}</small>}
  </div>;
}

type Props = {
  offer: CustomOffer; lang: Language; names: string; date: string; place: string; contact: string;
  needsDetails: boolean; sent: boolean; sending: boolean; error: string; whatsapp: string;
  onNames: (v: string) => void; onContact: (v: string) => void; onAccept: () => void; onFullGuide: () => void;
};

export default function FilmGuideOffer(p: Props) {
  const t = (en: string, de: string) => p.lang === 'en' ? en : de;
  const { offer } = p;
  const question = `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(t('Hi Hugo + Nanny! A question about our custom offer: ', 'Hi Hugo + Nanny! Eine Frage zu unserem persönlichen Angebot: '))}`;
  const meta = [p.date && offerDate(p.date, p.lang), p.place].filter(Boolean).join(' · ');
  return <section className="fg-chapter fg-single fg-offer"><div className="fg-copy">
    <span className="fg-label">{t('Your custom offer', 'Euer persönliches Angebot')}</span>
    <h1>{t('Hi', 'Hallo')} {p.names || t('you two', 'ihr zwei')}</h1>
    {meta && <p className="fg-fine">{meta}</p>}
    {offer.title && <h2>{offer.title}</h2>}
    {offer.intro && <p className="fg-lead">{offer.intro}</p>}
    <div className="fg-offer-details">
      {offer.hours && <span>{offer.hours} {offer.hours === 1 ? t('hour of filming', 'Stunde Filmen') : t('hours of filming', 'Stunden Filmen')}</span>}
      <span>{offer.crew === 'two' ? t('2 cameras', '2 Kameras') : t('1 camera', '1 Kamera')}</span>
    </div>
    {offer.includes && offer.includes.length > 0 && <><span className="fg-label">{t("What's included", 'Was enthalten ist')}</span><ul className="fg-points">{offer.includes.map((item, i) => <li key={i}><span>{item}</span></li>)}</ul></>}
    <OfferPrice offer={offer} lang={p.lang} />
    {p.sent ? <div className="fg-received" role="status"><Check size={28} /><h3>{t('Thank you!', 'Danke!')}</h3><p>{t("We'll get back to you within 48 hours to confirm your date.", 'Wir melden uns innerhalb von 48 Stunden, um euer Datum zu bestätigen.')}</p></div> : <>
      {p.needsDetails && <div className="fg-fields">
        <label className="fg-field"><span>{t('Your names *', 'Eure Namen *')}</span><input value={p.names} placeholder="Mira + Jonas" onChange={e => p.onNames(e.target.value)} /></label>
        <label className="fg-field"><span>{t('WhatsApp or email *', 'WhatsApp oder E-Mail *')}</span><input value={p.contact} onChange={e => p.onContact(e.target.value)} /></label>
      </div>}
      {p.error && <p className="fg-offer-error" role="alert">{p.error}</p>}
      <div className="fg-offer-actions">
        <Button className="fg-btn fg-finish" disabled={p.sending} onClick={p.onAccept}>{p.sending ? t('Sending…', 'Wird gesendet…') : t('Accept offer', 'Angebot annehmen')}</Button>
        <Button variant="outline" asChild><a href={question} target="_blank" rel="noopener noreferrer">{t('Ask us a question', 'Frage stellen')}</a></Button>
      </div>
    </>}
    {offer.allow_full_guide && <p className="fg-fine fg-offer-guide"><button type="button" onClick={p.onFullGuide}>{t('Want to explore all options? Open the full film guide', 'Alle Optionen entdecken? Zum vollständigen Film-Guide')}</button></p>}
  </div></section>;
}
