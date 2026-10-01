import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { applyConsent, getConsent, saveConsent, OPEN_SETTINGS_EVENT } from "@/lib/consent";

const CookieBanner = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (c) {
      applyConsent(c);
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
    } else setOpen(true);
    const onOpen = () => { setOpen(true); setSettings(true); };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  if (!open) return null;
  const done = (a: boolean, m: boolean) => { saveConsent({ analytics: a, marketing: m }); setOpen(false); setSettings(false); };

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie settings">
      <p className="cookie-text">
        We use cookies for analytics (Google Analytics, Microsoft Clarity) and advertising (Meta Pixel) only if you agree.
        You can change your choice at any time. <Link to="/privacy">Privacy Policy</Link>
      </p>
      {settings && (
        <div className="cookie-options">
          <label><input type="checkbox" checked disabled /> Necessary (always on)</label>
          <label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Analytics - Google Analytics, Microsoft Clarity</label>
          <label><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /> Marketing - Meta Pixel</label>
        </div>
      )}
      <div className="cookie-actions">
        <button type="button" className="cookie-btn" onClick={() => done(false, false)}>Decline</button>
        {settings ? (
          <button type="button" className="cookie-btn" onClick={() => done(analytics, marketing)}>Save</button>
        ) : (
          <button type="button" className="cookie-btn" onClick={() => setSettings(true)}>Settings</button>
        )}
        <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => done(true, true)}>Accept</button>
      </div>
    </div>
  );
};

export default CookieBanner;
