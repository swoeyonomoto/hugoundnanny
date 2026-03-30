import { useEffect, useState } from "react";

interface LogoHeaderProps {
  variant?: "white" | "black" | "auto";
}

const DARK_SECTIONS = ["hero"]; // sections with dark backgrounds

const LogoHeader = ({ variant = "auto" }: LogoHeaderProps) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (variant !== "auto") return;

    const checkBackground = () => {
      const logoY = 40; // approximate vertical center of the logo
      const sections = document.querySelectorAll("section[id], .aboutus-hero");
      
      let onDark = false;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= logoY && rect.bottom >= logoY) {
          const id = section.getAttribute("id") || "";
          if (DARK_SECTIONS.includes(id)) {
            onDark = true;
          } else {
            // Check computed background color
            const bg = window.getComputedStyle(section).backgroundColor;
            if (bg) {
              const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
              if (match) {
                const brightness = (parseInt(match[1]) * 299 + parseInt(match[2]) * 587 + parseInt(match[3]) * 114) / 1000;
                if (brightness < 128) onDark = true;
              }
            }
          }
        }
      });

      // If no section found (e.g. between sections or at very top), check body/hero
      // Default to white logo at top of page (hero is dark)
      if (!document.querySelector("section[id], .aboutus-hero")) {
        onDark = true;
      }

      setIsDark(onDark);
    };

    checkBackground();
    window.addEventListener("scroll", checkBackground, { passive: true });
    return () => window.removeEventListener("scroll", checkBackground);
  }, [variant]);

  const forceVariant = variant !== "auto" ? variant : undefined;
  const showWhite = forceVariant ? forceVariant === "white" : isDark;
  const logoSrc = showWhite ? "/photos/logo-white.png" : "/photos/logo.png";

  return (
    <nav className="logo-header">
      <a href="/">
        <img
          src={logoSrc}
          alt="hugo + nanny"
          className="logo-header-img"
          style={{ transition: "opacity 0.3s ease" }}
        />
      </a>
    </nav>
  );
};

export default LogoHeader;
