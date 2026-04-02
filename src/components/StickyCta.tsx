import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const StickyCta = () => {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const intro = document.querySelector(".intro-text-section");
      if (intro) {
        const rect = intro.getBoundingClientRect();
        setShow(rect.top < window.innerHeight * 0.66);
      } else {
        setShow(window.scrollY > window.innerHeight * 0.3);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#contact" className={`sticky-cta ${show ? "show" : ""}`}>
      {t("Let's get rolling ♥", "Let's get rolling ♥")}
    </a>
  );
};

export default StickyCta;
