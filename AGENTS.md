# Project architecture

- Scope page-specific visual systems beneath a page root class so shared sections and legacy pages remain unchanged.
- Keep gallery commerce as a no-payment request flow: temporary selections use browser storage and final requests go through Formspree, because payment is completed later by an emailed PayPal link.
