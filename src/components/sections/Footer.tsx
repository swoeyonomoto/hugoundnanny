import { useLang } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer>
      <div className="f-main">
        <a href="/"><img src="/photos/logo.png" alt="hugo + nanny" className="f-logo-img" /></a>
        <div className="f-links">
          <Link to="/imprint">{t("Impressum", "Imprint")}</Link>
          <a href="#">{t("Datenschutz", "Privacy")}</a>
          <a href="https://www.instagram.com/hugoundnanny" target="_blank" rel="noopener noreferrer">@hugoundnanny</a>
        </div>
        <span className="f-copy">© 2025 Hugo & Nanny</span>
      </div>
    </footer>
  );
};

export default Footer;
