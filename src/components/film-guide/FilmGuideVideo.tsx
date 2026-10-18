import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import reel from "@/assets/film-guide-reel.mp4.asset.json";
import poster from "@/assets/film-guide-poster.jpg.asset.json";
import webm from "@/assets/film-guide-reel.webm.asset.json";

interface Props { caption?: string; intro?: boolean; start?: number; end?: number; soundLabel: string; src?: string; }

export default function FilmGuideVideo({ caption, intro = false, start = 0, end, soundLabel, src }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [swapping, setSwapping] = useState(false);
  useEffect(() => {
    setSwapping(true);
    const timer = window.setTimeout(() => {
      const video = ref.current;
      if (video) { video.currentTime = start; void video.play().catch(() => {}); }
      setSwapping(false);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [start, end, src]);
  return <div className={`${intro ? "fg-hero-reel" : "fg-frame"}${swapping ? " fg-swap" : ""}`}>
    <video key={src || reel.url} ref={ref} poster={poster.url} autoPlay muted={muted} loop playsInline preload="metadata"
      onLoadedMetadata={() => { if (ref.current) ref.current.currentTime = start; }}
      onTimeUpdate={() => { const video = ref.current; if (video && end && video.currentTime >= end) video.currentTime = start; }}>
      {src ? <source src={src} /> : <><source src={webm.url} type="video/webm" /><source src={reel.url} type="video/mp4" /></>}
    </video>
    {!intro && <Button variant="ghost" className="fg-sound" aria-label={soundLabel} aria-pressed={!muted} onClick={() => setMuted(value => !value)}>{muted ? "♪" : "❚❚"}</Button>}
    {!intro && caption && <span className="fg-cap">{caption}</span>}
  </div>;
}