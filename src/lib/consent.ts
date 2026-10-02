export type Consent = { analytics: boolean; marketing: boolean };
const KEY = "hn-consent-v1";
export const OPEN_SETTINGS_EVENT = "hn-open-cookie-settings";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export const getConsent = (): Consent | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v ? (JSON.parse(v) as Consent) : null;
  } catch {
    return null;
  }
};

const addScript = (src: string) => {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
};

let gaLoaded = false, clarityLoaded = false, metaLoaded = false;

const loadAnalytics = () => {
  if (!gaLoaded) {
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer!.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", "G-ZLTETCHDJ1", { anonymize_ip: true });
    addScript("https://www.googletagmanager.com/gtag/js?id=G-ZLTETCHDJ1");
  }
  if (!clarityLoaded) {
    clarityLoaded = true;
    const c = window as any;
    c.clarity = c.clarity || function () { (c.clarity.q = c.clarity.q || []).push(arguments); };
    addScript("https://www.clarity.ms/tag/w37cyu9vbh");
  }
};

const loadMeta = () => {
  if (metaLoaded || window.fbq) return;
  metaLoaded = true;
  const n: any = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
  addScript("https://connect.facebook.net/en_US/fbevents.js");
  n("init", "711556118500791");
  n("track", "PageView");
};

export const applyConsent = (c: Consent | null) => {
  if (!c) return;
  if (c.analytics) loadAnalytics();
  if (c.marketing) loadMeta();
};

export const saveConsent = (c: Consent) => {
  const prev = getConsent();
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* ignore */ }
  // Revoking an already-loaded tool requires a reload to unload it.
  if (prev && ((prev.analytics && !c.analytics) || (prev.marketing && !c.marketing))) {
    window.location.reload();
    return;
  }
  applyConsent(c);
};

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));

export const loadAllTracking = () => { loadAnalytics(); loadMeta(); };
