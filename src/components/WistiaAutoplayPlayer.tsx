import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type WistiaPlayerElement = HTMLElement & {
  captionsEnabled?: boolean;
  inFullscreen?: boolean;
  muted?: boolean;
  volume?: number;
  requestFullscreen?: () => Promise<void> | void;
  cancelFullscreen?: () => Promise<void> | void;
  _wistiaApi?: {
    volume: (level: number) => void;
  };
};

interface WistiaAutoplayPlayerProps {
  aspect?: string;
  className?: string;
  mediaId: string;
  style?: CSSProperties;
}

const WistiaAutoplayPlayer = forwardRef<WistiaPlayerElement, WistiaAutoplayPlayerProps>(
  ({ mediaId, aspect, className, style }, ref) => {
    const innerRef = useRef<WistiaPlayerElement | null>(null);

    useImperativeHandle(ref, () => innerRef.current as WistiaPlayerElement);

    // Load the media-specific embed script dynamically
    useEffect(() => {
      const playerScriptId = "wistia-player-js";
      if (!document.getElementById(playerScriptId)) {
        const playerScript = Object.assign(document.createElement("script"), {
          id: playerScriptId,
          src: "https://fast.wistia.com/player.js",
          async: true,
        });
        document.head.appendChild(playerScript);
      }

      const scriptId = `wistia-embed-${mediaId}`;
      if (!document.getElementById(scriptId)) {
        const s = Object.assign(document.createElement("script"), {
          id: scriptId,
          src: `https://fast.wistia.com/embed/${mediaId}.js`,
          async: true,
          type: "module",
        });
        document.head.appendChild(s);
      }
    }, [mediaId]);

    return (
      <wistia-player
        ref={innerRef}
        media-id={mediaId}
        aspect={aspect ?? "1.7777777777777777"}
        autoplay
        muted
        loop
        playsinline
        silent-autoplay="allow"
        className={className}
        style={style}
      />
    );
  }
);

WistiaAutoplayPlayer.displayName = "WistiaAutoplayPlayer";

export default WistiaAutoplayPlayer;