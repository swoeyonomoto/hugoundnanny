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
      },
      HTMLElement
    >;
    "mux-player": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "playback-id"?: string;
        autoplay?: boolean | string;
        loop?: boolean;
        muted?: boolean;
        "stream-type"?: string;
        "default-hidden-captions"?: boolean;
      },
      HTMLElement
    >;
  }
}
