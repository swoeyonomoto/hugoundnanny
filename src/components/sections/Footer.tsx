import { useLang } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer>
      <div className="f-main">
        <div className="f-links">
          <Link to="/imprint">{t("Impressum", "Imprint")}</Link>
          <Link to="/privacy">{t("Datenschutz", "Privacy")}</Link>
          <a href="https://www.instagram.com/hugoundnanny" target="_blank" rel="noopener noreferrer">@hugoundnanny</a>
        </div>
        <a href="/" className="f-logo-wrap"><img src="/photos/logo.png" alt="hugo + nanny" className="f-logo-img" /></a>
      </div>
    </footer>
  );
};

export default Footer;
