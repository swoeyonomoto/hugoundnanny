export type MuxPlayerElement = HTMLElement & {
  muted: boolean;
  pause?: () => void;
  play?: () => Promise<void> | void;
};

const ensureMuxPlayerDefined = async () => {
  if (!customElements.get("mux-player")) {
    await customElements.whenDefined("mux-player");
  }
};

export const playMuxPlayer = async (player: MuxPlayerElement | null) => {
  if (!player) return;

  await ensureMuxPlayerDefined();

  try {
    await player.play?.();
  } catch {
    // Ignore autoplay timing rejections and let the browser retry when ready.
  }
};

export const pauseMuxPlayer = async (player: MuxPlayerElement | null) => {
  if (!player) return;

  await ensureMuxPlayerDefined();
  player.pause?.();
};

export const isElementMostlyVisible = (element: Element, threshold = 0.6) => {
  const rect = element.getBoundingClientRect();
  if (!rect.height) return false;

  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  return visibleHeight / rect.height >= threshold;
};