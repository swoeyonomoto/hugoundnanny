import { useLang } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const LogoHeader = () => {
  const { t } = useLang();
  return (
    <nav className="logo-header">
      <Link to="/about-us" className="logo-header-link">{t("Über uns", "About us")}</Link>
      <a href="/">
        <img src="/photos/logo-white.png" alt="hugo + nanny" className="logo-header-img" />
      </a>
      <a href="#contact" className="logo-header-link">{t("Kontakt", "Contact")}</a>
    </nav>
  );
};

export default LogoHeader;
