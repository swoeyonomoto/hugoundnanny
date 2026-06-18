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
      <p className="f-legal">
        {t(
          "Hugo & Nanny ist eine Marke der FEELSLIKE HOLIDAY LIMITED, Hong Kong Company No. 78830813.",
          "Hugo & Nanny is a wedding photography and film brand operated by FEELSLIKE HOLIDAY LIMITED, Hong Kong Company No. 78830813."
        )}
      </p>
    </footer>
  );
};

export default Footer;
