import { ReactNode } from "react";
import { useDarkOverlap } from "@/hooks/useDarkOverlap";

interface AutoColorNavProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  darkSelectors?: string;
}

const AutoColorNav = ({ children, className = "", style, darkSelectors }: AutoColorNavProps) => {
  const { containerRef, clipData } = useDarkOverlap(darkSelectors);

  return (
    <div ref={containerRef} className={className} style={{ ...style }}>
      <div style={{ position: "relative" }}>
        <div style={{ clipPath: clipData.white, color: "#fff" }} className="auto-color-white">
          {children}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            clipPath: clipData.black,
            color: "#111",
          }}
          className="auto-color-black"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AutoColorNav;
