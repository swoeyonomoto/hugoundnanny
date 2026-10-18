# Project architecture

- Scope page-specific visual systems beneath a page root class so shared sections and legacy pages remain unchanged.
- Keep gallery commerce as a no-payment request flow: temporary selections use browser storage and final requests go through Formspree, because payment is completed later by an emailed PayPal link.
- Keep gallery administration behind Supabase Auth and a server-enforced separate admin role; public gallery pages only read active gallery configuration.
- Store editable gallery and print-product presentation data in Supabase; use bundled assets only as visual fallbacks so admin changes remain authoritative.
- Pair Cormorant Garamond Light headlines with Inter body text on all public pages, while preserving independently scoped Asia and gallery compositions and the admin typography.
- Keep Film Guide presentation in dedicated components and page-scoped styles; its reference typography is an intentional isolated exception so existing public pages remain unchanged.
- Keep Film Guide answer transitions and pricing in pure tested functions, with configurable settings independent of presentation; this prevents summary, confirmation and handoff totals from diverging.
- Keep Film Guide bilingual chapter copy in a dedicated data module and render only supported italic/bold markers as React elements; this preserves the supplied wording without unsafe HTML or pricing changes.
- Keep public Film Guide persistence behind existing start/load/save/send functions and token-scoped local recovery; never query private leads from public pages because tokens must not bypass server validation.
- Use the existing Film Guide admin RPC before rendering admin tools and rely on existing RLS for all table and storage operations; UI checks alone never authorize access.
- Pass loaded settings through every Film Guide calculation, summary and handoff, and resolve clips from public configuration with bundled fallbacks; admin edits must remain authoritative.
- Keep Clarity initialization and lifecycle scoped to the public Film Guide with a server-verified non-admin session; admin and unrelated pages must not record guide activity.
