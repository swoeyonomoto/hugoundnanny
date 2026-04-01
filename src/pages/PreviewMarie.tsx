import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang, LanguageProvider } from "@/contexts/LanguageContext";
import LogoHeader from "@/components/LogoHeader";
import LangBar from "@/components/LangBar";

const PreviewMarieInner = () => {
  const { t } = useLang();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://fast.wistia.com/player.js";
    script.async = true;
    document.head.appendChild(script);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/embed/83ovti5vtu.js";
    script2.async = true;
    script2.type = "module";
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="preview-page" style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
      {/* Header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 1.5rem" }}>
        <LogoHeader variant="black" />
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link
            to="/gang"
            style={{
              fontFamily: "'Ginora Sans Bold', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "0.65rem",
              color: "hsl(var(--foreground))",
              textDecoration: "none",
            }}
          >
            {t("ÜBER UNS", "ABOUT US")}
          </Link>
          <LangBar />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "8rem 1.5rem 4rem" }}>
        <p
          style={{
            fontFamily: "'Ginora Sans Bold', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: "0.75rem",
            color: "hsl(var(--muted-foreground))",
            marginBottom: "2.5rem",
          }}
        >
          {t("EXKLUSIVE VORSCHAU", "EXCLUSIVE PREVIEW")}
        </p>

        {/* Wistia Video */}
        <wistia-player media-id="83ovti5vtu" aspect="1.3333333333333333" />
      </div>
    </div>
  );
};

const PreviewMarie = () => (
  <LanguageProvider>
    <PreviewMarieInner />
  </LanguageProvider>
);

export default PreviewMarie;
