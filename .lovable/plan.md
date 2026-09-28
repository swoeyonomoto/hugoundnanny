# Refine the private gallery

## What will change
- Restyle `/gallery/:slug` with a clean white editorial canvas inspired by the Kinfolk reference.
- Replace the text-only Hugo & Nanny name with the existing brand logo.
- Rework the opening into a restrained split header: photograph on the left; couple name and date/location on the right at a smaller scale.
- Add a subtle scroll parallax transition between the opening and photo grid, with reduced-motion support.
- Replace the folder-card intro with a horizontal wedding-moment filter sourced automatically from each Dropbox folder. `Previews` appears first now; future folders extend the same navigation automatically.
- Open the first available folder by default so the page moves directly into a strict three-column Kinfolk-style image grid on desktop.
- Preserve selection, download tray, saved selections, lightbox, shop, basket, and inquiry checkout.
- Keep mobile polished with a single-column opening, horizontally scrollable filters, and a two-column image grid where three columns would be too narrow.

## Technical details
- Changes stay scoped to `.gallery-page` in `src/pages/Gallery.tsx` and `src/index.css`.
- Parallax uses a lightweight scroll value applied only to the opening media/text; no new dependency.
- Folder filters are generated from the existing Dropbox folder list and keep the selected state synchronized with the visible photos.
- Existing semantic gallery color variables will be adjusted to white, ink, pale gray, and a restrained accent.
