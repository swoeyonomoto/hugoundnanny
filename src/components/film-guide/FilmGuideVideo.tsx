import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import reel from "@/assets/film-guide-reel.mp4.asset.json";

interface Props { caption?: string; intro?: boolean; start?: number; end?: number; soundLabel: string; }

export default function FilmGuideVideo({ caption, intro = false, start = 0, end, soundLabel }: Props) {
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
  }, [start, end]);
  return <div className={`${intro ? "fg-hero-reel" : "fg-frame"}${swapping ? " fg-swap" : ""}`}>
    <video ref={ref} src={reel.url} autoPlay muted={muted} loop playsInline preload="metadata"
      onLoadedMetadata={() => { if (ref.current) ref.current.currentTime = start; }}
      onTimeUpdate={() => { const video = ref.current; if (video && end && video.currentTime >= end) video.currentTime = start; }} />
    {!intro && <Button variant="ghost" className="fg-sound" aria-label={soundLabel} aria-pressed={!muted} onClick={() => setMuted(value => !value)}>{muted ? "♪" : "❚❚"}</Button>}
    {!intro && caption && <span className="fg-cap">{caption}</span>}
  </div>;
}