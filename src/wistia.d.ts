declare namespace JSX {
  interface IntrinsicElements {
    "wistia-player": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "media-id"?: string;
        aspect?: string;
        autoplay?: boolean;
        muted?: boolean;
        loop?: boolean;
        playsinline?: boolean;
        "silent-autoplay"?: string;
        playbar?: string;
        "controls-visible-on-load"?: string;
        "small-play-button"?: string;
        "fullscreen-button"?: string;
        "volume-control"?: string;
        "settings-control"?: string;
      },
      HTMLElement
    >;
    "mux-player": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "playback-id"?: string;
        autoplay?: boolean | string;
        loop?: boolean;
        muted?: boolean;
        playsinline?: boolean;
        preload?: string;
        "stream-type"?: string;
        "default-hidden-captions"?: boolean;
        [key: string]: any;
      },
      HTMLElement
    >;
  }
}
