# Project architecture

- Scope page-specific visual systems beneath a page root class so shared sections and legacy pages remain unchanged.
- Keep gallery commerce as a no-payment request flow: temporary selections use browser storage and final requests go through Formspree, because payment is completed later by an emailed PayPal link.
- Keep gallery administration behind Supabase Auth and a server-enforced separate admin role; public gallery pages only read active gallery configuration.
- Store editable gallery and print-product presentation data in Supabase; use bundled assets only as visual fallbacks so admin changes remain authoritative.
