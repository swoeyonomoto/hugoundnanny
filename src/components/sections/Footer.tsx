import { useLang } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer>
      <span className="f-logo">hugo + nanny</span>
      <div className="f-links">
        <a href="#">{t("Impressum", "Imprint")}</a>
        <a href="#">{t("Datenschutz", "Privacy")}</a>
        <a href="#">Instagram</a>
      </div>
      <span className="f-copy">© 2025 Hugo & Nanny</span>
    </footer>
  );
};

export default Footer;
