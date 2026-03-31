import { useLang } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer>
      <a href="/"><img src="/photos/logo.png" alt="hugo + nanny" className="f-logo-img" /></a>
      <div className="f-links">
        <a href="#">{t("Impressum", "Imprint")}</a>
        <a href="#">{t("Datenschutz", "Privacy")}</a>
        <a href="https://www.instagram.com/hugoundnanny" target="_blank" rel="noopener noreferrer">@hugoundnanny</a>
      </div>
      <span className="f-copy">© 2025 Hugo & Nanny</span>
    </footer>
  );
};

export default Footer;
