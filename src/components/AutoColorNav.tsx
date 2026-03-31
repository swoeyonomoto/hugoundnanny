import { ReactNode } from "react";
import { useDarkOverlap } from "@/hooks/useDarkOverlap";

interface AutoColorNavProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const AutoColorNav = ({ children, className = "", style }: AutoColorNavProps) => {
  const { containerRef, clipData } = useDarkOverlap();

  return (
    <div ref={containerRef} className={className} style={{ ...style }}>
      {/* White version (for dark backgrounds) */}
      <div style={{ clipPath: clipData.white, color: "#fff" }} className="auto-color-white">
        {children}
      </div>
      {/* Black version (for light backgrounds) */}
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
  );
};

export default AutoColorNav;
