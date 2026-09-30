# Reliable mobile autoplay for the Asia video

## What will change
- Strengthen the muted inline autoplay setup for the Wistia header film on phones and tablets.
- Retry playback through Wistia's player API once the player is ready.
- If a browser still blocks autoplay, replace Wistia's large default button with one minimal custom play control.
- Keep the existing sound, captions, fullscreen behavior, and desktop presentation unchanged.

## Verification
- Check the Asia header at mobile and desktop sizes.
- Confirm the native oversized Wistia play button does not appear.
- Confirm the fallback starts playback when tapped and the preview remains error-free.
