import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type WistiaPlayerElement = HTMLElement & {
  _wistiaApi?: {
    volume: (level: number) => void;
  };
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  silentAutoPlay?: string;
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

    useEffect(() => {
      if (!innerRef.current) return;

      Object.assign(innerRef.current, {
        autoplay: true,
        muted: true,
        playsinline: true,
        loop: true,
        silentAutoPlay: "allow",
      });
    }, [mediaId]);

    return (
      <wistia-player
        ref={innerRef}
        media-id={mediaId}
        aspect={aspect}
        autoplay
        muted
        loop
        playsinline
        silentAutoPlay="allow"
        className={className}
        style={style}
      />
    );
  }
);

WistiaAutoplayPlayer.displayName = "WistiaAutoplayPlayer";

export default WistiaAutoplayPlayer;