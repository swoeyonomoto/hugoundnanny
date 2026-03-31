import { useEffect, useState, useRef, useCallback } from "react";

interface LogoHeaderProps {
  variant?: "white" | "black" | "auto";
}

// Selectors for elements with dark backgrounds where white logo is needed
const DARK_SELECTORS = "#hero, .films, .photos, .about-img, .home-video-sticky, .home-video-inner";

const LogoHeader = ({ variant = "auto" }: LogoHeaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clipData, setClipData] = useState<{ white: string; black: string }>({
    white: "inset(0 0 0 0)",
    black: "inset(100% 0 0 0)",
  });

  const update = useCallback(() => {
    if (variant !== "auto" || !containerRef.current) return;

    const logoRect = containerRef.current.getBoundingClientRect();
    const logoTop = logoRect.top;
    const logoH = logoRect.height;
    if (logoH === 0) return;

    const darkEls = document.querySelectorAll(DARK_SELECTORS);

    // Collect all dark regions that overlap the logo vertically
    type Band = { top: number; bottom: number };
    const darkBands: Band[] = [];

    darkEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      // Only care if it overlaps the logo's vertical range
      if (r.bottom > logoTop && r.top < logoTop + logoH) {
        darkBands.push({
          top: Math.max(0, ((r.top - logoTop) / logoH) * 100),
          bottom: Math.min(100, ((r.bottom - logoTop) / logoH) * 100),
        });
      }
    });

    if (darkBands.length === 0) {
      // Fully in light → show black logo
      // Check if logo is above first dark section (still in dark area)
      let aboveDark = false;
      darkEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= logoTop && r.bottom >= logoTop + logoH) {
          aboveDark = true;
        }
      });
      if (aboveDark) {
        setClipData({ white: "inset(0 0 0 0)", black: "inset(100% 0 0 0)" });
      } else {
        setClipData({ white: "inset(0 0 100% 0)", black: "inset(0 0 0 0)" });
      }
      return;
    }

    // Merge overlapping bands
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

    // For simplicity with clip-path, use the primary dark band
    // If the dark region covers the full logo height
    const band = merged[0];
    if (band.top <= 0 && band.bottom >= 100) {
      setClipData({ white: "inset(0 0 0 0)", black: "inset(100% 0 0 0)" });
    } else if (band.top <= 0) {
      // Dark on top, light on bottom
      const lightStart = band.bottom;
      setClipData({
        white: `inset(0 0 ${100 - lightStart}% 0)`,
        black: `inset(${lightStart}% 0 0 0)`,
      });
    } else if (band.bottom >= 100) {
      // Light on top, dark on bottom
      const darkStart = band.top;
      setClipData({
        white: `inset(${darkStart}% 0 0 0)`,
        black: `inset(0 0 ${100 - darkStart}% 0)`,
      });
    } else {
      // Dark band in the middle — rare case, just show black
      setClipData({ white: "inset(0 0 100% 0)", black: "inset(0 0 0 0)" });
    }
  }, [variant]);

  useEffect(() => {
    if (variant !== "auto") return;
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [variant, update]);

  if (variant !== "auto") {
    const logoSrc = variant === "white" ? "/photos/logo-white.png" : "/photos/logo.png";
    return (
      <nav className="logo-header">
        <a href="/">
          <img src={logoSrc} alt="hugo + nanny" className="logo-header-img" />
        </a>
      </nav>
    );
  }

  return (
    <nav className="logo-header" ref={containerRef}>
      <a href="/" style={{ position: "relative", display: "block" }}>
        <img
          src="/photos/logo-white.png"
          alt="hugo + nanny"
          className="logo-header-img"
          style={{ clipPath: clipData.white, display: "block" }}
        />
        <img
          src="/photos/logo.png"
          alt=""
          className="logo-header-img"
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: clipData.black,
          }}
        />
      </a>
    </nav>
  );
};

export default LogoHeader;
