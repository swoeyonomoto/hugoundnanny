# Roadmap

## Unified admin
- [x] Repair uploaded film-guide-save custom-token validation; deployed only that function, 10 server tests pass, real Joey + Seli browser flow saves and reloads furthest_step=5 / crew with EUR and 35% preserved. Authenticated admin view remains unverified as noted below.
- [x] Prevent failed custom links from silently opening blank guides or creating duplicate couple records; verify Joey + Seli's EUR/35% configuration in recovery tests.
- [x] Repair custom-token resolution in deployed film-guide-load with user authorization and supplied source; real Sheetal and Joey links load saved names, Joey EUR and 35% visible; three server validation tests pass.
- [x] Redesign the admin workspace with fast couple/package/price lookup and clear tool navigation.
- [x] Prefill admin-created couple names in the public guide, including local recovery; controlled public browser flow and concrete tests pass.
- [x] Add easy gallery link copying and move account settings to their own view.
- [ ] Automatic Decks synchronization: blocked by required changes in the separate Decks project and the existing no-backend-changes restriction; document the integration handoff.
- [x] Verify updated admin presentation with isolated sample records: search, couple details, gallery clipboard link, account view and mobile overflow; 81 tests pass.
- [x] Verify real couple prefill through public custom links for Sheetal + Amal and Joey + Seli.
- [ ] Verify real admin edits: authenticated editing flow not yet exercised; public saved settings successfully load.

## Film Guide
- [x] Replace final WhatsApp/email handoff with Finish and a saved 48-hour confirmation; real test guide completed and receipt survived reload; 80 frontend and 13 server tests pass.
- [x] Notify admin on completion through existing Formspree inquiry inbox; live completion returned notified=true (provider accepted), email arrival in owner's mailbox remains unverified. Completion labels and reset timestamp updated without schema changes.
- [x] Preserve the saved admin discount when resuming a personal link and show it in the bottom estimate from the beginning; 77 tests pass and controlled 40% recovery/day-change checks pass. Real saved discounts are currently zero; signed-in admin verification remains blocked as below.
- [x] Clarify coverage, couple-shoot time and included films in the live overview; add a visible overview button beside the price with a gentle periodic nudge.
- [x] Refine guide layout using Asia inspiration; default new visits to English.
- [x] Default public currency to HKD with a two-way EUR calculator; keep saved estimates in EUR.
- [x] Include all couple-shoot lengths in every package and rewrite family/friends statements.
- [x] Test prices, language and conversion; verify the updated public flow and layouts.
- [x] Confirm Part 4 uses only the existing external Supabase and hugoundnanny storage, never Lovable Cloud.
- [x] Respect the already-tested backend: connect frontend only, with no backend resource changes.
- [x] Build Part 4: private saved leads, personal links and resilient autosave.
- [x] Build Part 4: admin leads, funnel, editable settings and clips.
- [x] Verify Part 4 anonymous access restrictions, cross-device resume, send-before-handoff and guide-only Clarity initialization.
- [ ] Verify signed-in admin editing and clip uploads: blocked by external Supabase without an available authenticated browser session.
- [ ] Verify video playback: configured reel URL fails in sandbox; bundled asset URLs remain pending in local preview.
- [x] Build Part 3: exact bilingual chapter copy, descriptions, labels and emphasis.
- [x] Verify Part 3 on desktop and mobile while preserving Part 2 pricing and answers.
- [x] Build Part 2: pricing, answer rules, reduce confirmation, summary and contact handoff.
- [x] Verify Part 2 calculations and complete the guide on desktop and mobile.
- [x] Build Part 1: isolated reference design, both Film Guide routes, chapter navigation and reusable presentation controls.
- [x] Verify Part 1 on desktop and mobile without changing existing pages.

- [x] Preserve the current version as the rollback point in project History before the site-wide typography refinement.
- [x] Align public-page typography and spacing with the gallery’s editorial visual system across desktop and mobile.
- [x] Use Cormorant Garamond Light for headlines across all public pages.
- [x] Redesign the client gallery using Nigel John’s header, filters, and navigation with Kinfolk’s image layout and folder overview.
- [x] Add hover image controls and animate selected photos into a persistent bottom tray.
- [x] Let couples download the tray selection.
- [x] Let couples temporarily save a named selection with an optional note and a clear temporary-storage notice.
- [x] Add a shop-like catalogue for Dibond Prints, Hardcover Books, and Acrylic Prints.
- [x] Support both flows: shop from the current photo selection, or choose a product first and then assign photos.
- [x] Let couples configure quantities/options and add product-photo combinations to the basket.
- [x] Show an order summary and total, then submit it to the existing inquiry inbox.
- [x] Confirm that payment follows later by emailed PayPal link.
- [x] Show the book designer as coming soon.
- [x] Refine the gallery with a white editorial split header, brand logo, subtle parallax, Dropbox folder filters, and a three-column image grid.
## Gallery improvements
- [x] Make highlights and gallery display copy configurable.
- [x] Simplify the folder filter styling.
- [x] Use faster Dropbox thumbnails while preserving original downloads.
- [x] Package multi-image downloads as one ZIP.
- [ ] Add gallery-specific share title, URL, and cover image metadata for WhatsApp (separate earlier request; not in this frontend-only Part 4 scope).
- [x] Expand the shop with Prints, Print Pack, Frames, Canvas, Deckled Prints, Metal Prints, Dibond Prints, Everyday Albums, Hardcover Books, and Lay Flat Albums.
- [x] Add product detail views with editable descriptions and preview images.
- [x] Add product flow: choose size, select photos, calculate quantity-based totals.
- [x] Keep album configurators marked coming soon.
- /admin -> Couple-Deck-Creator, Film Guide, Galerie
- [x] /admin als zentrale Übersicht: Film Guide, Galerie, Decks-Admin und Planner-Admin (externe Projekte, eigene Backends) verlinken.
- [x] Film Guide: Fortschritt des Test-Couples (Sheetal + Amal, 4/11) zurückgesetzt.
- [x] Film Guide: Admin legt pro Couple fest, ob EUR oder HKD zuerst angezeigt wird (78 Tests, Build OK).
