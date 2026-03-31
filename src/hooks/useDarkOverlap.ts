import { useEffect, useState, useRef, useCallback } from "react";

const DEFAULT_DARK_SELECTORS = "#hero, .films, .photos, .about-img, .home-video-sticky, .home-video-inner";

type ClipData = { white: string; black: string };

export const useDarkOverlap = (darkSelectors: string = DEFAULT_DARK_SELECTORS) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clipData, setClipData] = useState<ClipData>({
    white: "inset(0 0 100% 0)",
    black: "inset(0 0 0 0)",
  });

  const update = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const top = rect.top;
    const h = rect.height;
    if (h === 0) return;

    const darkEls = document.querySelectorAll(darkSelectors);
    type Band = { top: number; bottom: number };
    const darkBands: Band[] = [];

    darkEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom > top && r.top < top + h) {
        darkBands.push({
          top: Math.max(0, ((r.top - top) / h) * 100),
          bottom: Math.min(100, ((r.bottom - top) / h) * 100),
        });
      }
    });

    if (darkBands.length === 0) {
      let aboveDark = false;
      darkEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= top && r.bottom >= top + h) aboveDark = true;
      });
      if (aboveDark) {
        setClipData({ white: "inset(0 0 0 0)", black: "inset(100% 0 0 0)" });
      } else {
        setClipData({ white: "inset(0 0 100% 0)", black: "inset(0 0 0 0)" });
      }
      return;
    }

    darkBands.sort((a, b) => a.top - b.top);
    const merged: Band[] = [darkBands[0]];
    for (let i = 1; i < darkBands.length; i++) {
      const last = merged[merged.length - 1];
      if (darkBands[i].top <= last.bottom) {
        last.bottom = Math.max(last.bottom, darkBands[i].bottom);
      } else {
        merged.push(darkBands[i]);
      }
    }

    const band = merged[0];
    if (band.top <= 0 && band.bottom >= 100) {
      setClipData({ white: "inset(0 0 0 0)", black: "inset(100% 0 0 0)" });
    } else if (band.top <= 0) {
      const lightStart = band.bottom;
      setClipData({
        white: `inset(0 0 ${100 - lightStart}% 0)`,
        black: `inset(${lightStart}% 0 0 0)`,
      });
    } else if (band.bottom >= 100) {
      const darkStart = band.top;
      setClipData({
        white: `inset(${darkStart}% 0 0 0)`,
        black: `inset(0 0 ${100 - darkStart}% 0)`,
      });
    } else {
      setClipData({ white: "inset(0 0 100% 0)", black: "inset(0 0 0 0)" });
    }
  }, [darkSelectors]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return { containerRef, clipData };
};
