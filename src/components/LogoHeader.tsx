import { useLang } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface LogoHeaderProps {
  variant?: "white" | "black";
}

const LogoHeader = ({ variant = "white" }: LogoHeaderProps) => {
  const logoSrc = variant === "black" ? "/photos/logo.png" : "/photos/logo-white.png";
  return (
    <nav className="logo-header">
      <a href="/">
        <img src={logoSrc} alt="hugo + nanny" className="logo-header-img" />
      </a>
    </nav>
  );
};

export default LogoHeader;
