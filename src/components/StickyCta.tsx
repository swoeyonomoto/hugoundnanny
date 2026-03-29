import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

const StickyCta = () => {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#contact" className={`sticky-cta ${show ? "show" : ""}`}>
      {t("Let's get rolling ♥", "Let's get rolling ♥")}
    </a>
  );
};

export default StickyCta;
