# Asia video fullscreen and captions

## What will change
- Add a fullscreen control beside the sound control in the `/asia` header.
- Open the Wistia film itself in fullscreen so the headline, navigation, overlay, and page controls disappear while watching.
- Add a CC control that toggles captions supplied through the Wistia video settings.
- Keep autoplay muted and preserve the existing mobile and desktop header layout.

## Quality checks
- Verify fullscreen enter/exit and caption toggling on mobile and desktop.
- Confirm the film continues playing during the transition and the preview builds cleanly.

## Technical details
- Use Wistia's player API for fullscreen and captions, with browser fullscreen as a safe fallback.
- Show clear active states and accessible labels for both controls.
