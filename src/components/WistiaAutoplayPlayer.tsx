import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type WistiaPlayerElement = HTMLElement & {
  captionsEnabled?: boolean;
  inFullscreen?: boolean;
  muted?: boolean;
  paused?: boolean;
  silentAutoplay?: boolean | string;
  volume?: number;
  mute?: () => void;
  play?: () => Promise<void> | void;
  unmute?: () => void;
  updateEmbedOptions?: (options: Record<string, unknown>) => void;
  requestFullscreen?: () => Promise<void> | void;
  cancelFullscreen?: () => Promise<void> | void;
  deprecatedApiDoNotUse?: {
    mute?: () => void;
    unmute?: () => void;
    time?: (seconds: number) => void;
    volume?: (level: number) => void;
  };
  _wistiaApi?: {
    mute?: () => void;
    play?: () => Promise<void> | void;
    state?: () => string;
    time?: (seconds: number) => void;
    unmute?: () => void;
    updateEmbedOptions?: (options: Record<string, unknown>) => void;
    volume: (level: number) => void;
  };
  time?: (seconds: number) => void;
};

interface WistiaAutoplayPlayerProps {
  aspect?: string;
  className?: string;
  mediaId: string;
  startMuted?: boolean;
  onAutoplayBlocked?: () => void;
  onPlaybackStarted?: () => void;
  style?: CSSProperties;
}

const WistiaAutoplayPlayer = forwardRef<WistiaPlayerElement, WistiaAutoplayPlayerProps>(
  ({ mediaId, aspect, className, startMuted = true, onAutoplayBlocked, onPlaybackStarted, style }, ref) => {
    const innerRef = useRef<WistiaPlayerElement | null>(null);
    const onAutoplayBlockedRef = useRef(onAutoplayBlocked);
    const onPlaybackStartedRef = useRef(onPlaybackStarted);
    const startMutedRef = useRef(startMuted);

    onAutoplayBlockedRef.current = onAutoplayBlocked;
    onPlaybackStartedRef.current = onPlaybackStarted;

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

    useEffect(() => {
      const player = innerRef.current;
      if (!player) return;
      let cancelled = false;
      let fallbackTimer: number | undefined;

      player.setAttribute("playbar", "false");
      player.setAttribute("controls-visible-on-load", "false");
      player.setAttribute("small-play-button", "false");
      player.setAttribute("big-play-button", "false");
      player.setAttribute("fullscreen-button", "false");
      player.setAttribute("volume-control", "false");
      player.setAttribute("settings-control", "false");

      const markPlaying = () => {
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        onPlaybackStartedRef.current?.();
      };

      const attemptAutoplay = async () => {
        player.muted = true;
        player.volume = 0;
        player.mute?.();
        player.deprecatedApiDoNotUse?.mute?.();
        player._wistiaApi?.mute?.();
        player._wistiaApi?.volume(0);
        try {
          const result = player.play?.() ?? player._wistiaApi?.play?.();
          await result;
        } catch {
          if (!cancelled) onAutoplayBlockedRef.current?.();
        }
      };

      const checkPlayback = () => {
        const isPlaying = player.paused === false || player._wistiaApi?.state?.() === "playing";
        if (isPlaying) markPlaying();
        else onAutoplayBlockedRef.current?.();
      };

      player.addEventListener("play", markPlaying);
      player.addEventListener("playing", markPlaying);
      player.addEventListener("canplay", attemptAutoplay);
      void customElements.whenDefined("wistia-player").then(() => {
        if (cancelled) return;
        void attemptAutoplay();
        fallbackTimer = window.setTimeout(checkPlayback, 2400);
      });

      return () => {
        cancelled = true;
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        player.removeEventListener("play", markPlaying);
        player.removeEventListener("playing", markPlaying);
        player.removeEventListener("canplay", attemptAutoplay);
      };
    }, [mediaId]);

    return (
      <wistia-player
        ref={innerRef}
        media-id={mediaId}
        aspect={aspect ?? "1.7777777777777777"}
        autoplay
        loop
        playsinline
        silent-autoplay="allow"
        big-play-button="false"
        className={className}
        style={style}
      />
    );
  }
);

WistiaAutoplayPlayer.displayName = "WistiaAutoplayPlayer";

export default WistiaAutoplayPlayer;