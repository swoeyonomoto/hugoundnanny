import { useLang } from "@/contexts/LanguageContext";

const LangBar = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-bar">
      <button
        className={`lang-btn ${lang === "de" ? "active" : ""}`}
        onClick={() => setLang("de")}
      >
        DE
      </button>
      <button
        className={`lang-btn ${lang === "en" ? "active" : ""}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
};

export default LangBar;
