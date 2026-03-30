import { useEffect, useState, useRef, useCallback } from "react";

interface LogoHeaderProps {
  variant?: "white" | "black" | "auto";
}

const DARK_SELECTORS = "#hero";

const LogoHeader = ({ variant = "auto" }: LogoHeaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clipPercent, setClipPercent] = useState(0); // 0 = fully white, 100 = fully black

  const update = useCallback(() => {
    if (variant !== "auto" || !containerRef.current) return;

    const logoRect = containerRef.current.getBoundingClientRect();
    const logoTop = logoRect.top;
    const logoBottom = logoRect.bottom;

    // Find the bottom edge of dark sections
    const darkSections = document.querySelectorAll(DARK_SELECTORS);
    let boundaryY: number | null = null;

    darkSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // If the dark section's bottom edge is within or near the logo
      if (rect.bottom >= logoTop && rect.top <= logoBottom) {
        boundaryY = rect.bottom;
      }
    });

    if (boundaryY === null) {
      // Logo is either fully in dark or fully in light
      // Check if we're inside a dark section
      let insideDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= logoTop && rect.bottom >= logoBottom) {
          insideDark = true;
        }
      });
      setClipPercent(insideDark ? 0 : 100);
    } else {
      // Boundary crosses the logo — calculate percentage
      const pct = ((boundaryY - logoTop) / (logoBottom - logoTop)) * 100;
      setClipPercent(Math.max(0, Math.min(100, 100 - pct)));
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

  // Forced variant (About Us page)
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
        {/* White logo (visible over dark backgrounds) */}
        <img
          src="/photos/logo-white.png"
          alt="hugo + nanny"
          className="logo-header-img"
          style={{
            clipPath: `inset(0 0 ${clipPercent}% 0)`,
            display: "block",
          }}
        />
        {/* Black logo (visible over light backgrounds) */}
        <img
          src="/photos/logo.png"
          alt=""
          className="logo-header-img"
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(${100 - clipPercent}% 0 0 0)`,
          }}
        />
      </a>
    </nav>
  );
};

export default LogoHeader;
