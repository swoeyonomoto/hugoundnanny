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
  }
}
