import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang, LanguageProvider } from "@/contexts/LanguageContext";
import LogoHeader from "@/components/LogoHeader";
import AutoColorNav from "@/components/AutoColorNav";
import LangBar from "@/components/LangBar";

const PreviewVideoInner = () => {
  const { t } = useLang();

  useEffect(() => {
    // Load Wistia player script
    const script = document.createElement("script");
    script.src = "https://fast.wistia.com/embed/medias/1tt9dtcb3n.jsonp";
    script.async = true;
    document.head.appendChild(script);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script2.async = true;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="preview-page" style={{ minHeight: "100vh", background: "hsl(var(--background))" }}>
      {/* Header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 2rem" }}>
        <LogoHeader variant="black" />
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link
            to="/gang"
            className="nav-link"
            style={{
              fontFamily: "'Ginora Sans Bold', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "0.85rem",
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
            marginBottom: "0.5rem",
          }}
        >
          {t("EXKLUSIVE VORSCHAU", "EXCLUSIVE PREVIEW")}
        </p>
        <h1
          style={{
            fontFamily: "'Libre Caslon Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: "2.5rem",
            color: "hsl(var(--foreground))",
          }}
        >
          {t("Euer Film.", "Your film.")}
        </h1>

        {/* Wistia Video */}
        <div
          className="wistia_responsive_padding"
          style={{ padding: "56.25% 0 0 0", position: "relative" }}
        >
          <div
            className="wistia_responsive_wrapper"
            style={{ height: "100%", left: 0, position: "absolute", top: 0, width: "100%" }}
          >
            <div
              className="wistia_embed wistia_async_1tt9dtcb3n seo=true videoFoam=true"
              style={{ height: "100%", position: "relative", width: "100%" }}
            >
              <div
                className="wistia_swatch"
                style={{
                  height: "100%",
                  left: 0,
                  opacity: 0,
                  overflow: "hidden",
                  position: "absolute",
                  top: 0,
                  transition: "opacity 200ms",
                  width: "100%",
                }}
              >
                <img
                  src="https://fast.wistia.com/embed/medias/1tt9dtcb3n/swatch"
                  style={{ filter: "blur(5px)", height: "100%", objectFit: "contain", width: "100%" }}
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviewVideo = () => (
  <LanguageProvider>
    <PreviewVideoInner />
  </LanguageProvider>
);

export default PreviewVideo;
