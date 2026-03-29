

## Plan: Use custom thumbnails for film cards

### What changes
1. **Download 3 photos** from Dropbox to `public/photos/` as `dario-marie-thumb.jpg`, `eddie-mel-thumb.jpg`, `toni-freddi-thumb.jpg`
2. **Update `films` array** in `Work.tsx` — add a `thumb` field to each film entry pointing to the local image instead of the Wistia swatch URL
3. **Update the `<img>` tag** in the film card to use `f.thumb` instead of the Wistia swatch URL
4. **Hover effect** — already exists (`.film:hover .film-bg { transform: scale(1.04) }`), so the smooth scale on hover is already handled

### Files
- `public/photos/dario-marie-thumb.jpg` (new — downloaded)
- `public/photos/eddie-mel-thumb.jpg` (new — downloaded)
- `public/photos/toni-freddi-thumb.jpg` (new — downloaded)
- `src/components/sections/Work.tsx` — update `films` data and `<img src>`

