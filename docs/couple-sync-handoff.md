# Automatic couple synchronization - pending integration

## Current boundary
The main website uses Supabase `trfmpmwkkzdemcbutbuk`. Couple Decks uses a separate backend and cannot be modified from this project. The existing project requirement prohibits backend resource changes here. No automatic synchronization is enabled by this admin update.

## Implement from the Couple Decks project
Use the existing Film Guide lead ID as the stable external couple identifier, never a name or editable URL token. Link a deck explicitly to its Film Guide lead rather than matching names. Obtain the current authorized lead snapshot through a secure server-side integration, not a public lead query or browser-held service credential. Verify existing authorization and integration capabilities before choosing a transport; request permission before creating backend resources.

The synchronized snapshot must include names, date, location, contact, saved answers, `estimate_eur`, `package_hint`, discount, initial display currency, and `updated_at`. Synchronize the actual chosen coverage, crew, included films and extras, not merely a similarly named package. Keep EUR as the stored monetary basis. Refresh before previewing or sharing a proposal and show a stale/unavailable state instead of silently using unrelated Decks defaults.

Decks currently has independent package prices and a travel-excluded footnote. For linked Film Guide offers, replace those with the saved Film Guide selection and its travel/accommodation-included terms. Discounts and rounding must match the Film Guide. Decide with the owner how later price changes affect already-issued proposals; do not silently rewrite historical offers.

Validate with one authorized real couple: update the guide, read the saved lead, refresh its linked Deck, and verify names, selection, discount, currency and totals agree. No private source-project records were read or copied during this investigation.