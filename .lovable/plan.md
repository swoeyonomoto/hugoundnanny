# Gallery shop request flow

## What I’ll build
- Restyle `/gallery/:slug` with Nigel John’s slim sticky search/filter/navigation header and controls, Kinfolk’s image-led gallery composition, and Hugo & Nanny branding.
- Add a shop section modeled on the publicly visible reference catalogue: Dibond Prints, Hardcover Books, and Acrylic Prints, including its restrained three-card presentation.
- Use original Hugo & Nanny product mockups rather than copying another photographer’s copyrighted image files.
- Let couples add products, adjust options and quantities, and attach selected gallery photos.
- Show a persistent bag with item totals and a clear grand total.
- Replace payment with a checkout-style request form sent to the existing inquiry inbox.
- After submission, confirm that Hugo & Nanny will reply within hours with the final details and a PayPal payment link.
- Present the book designer as “Coming soon” for now.

## Order details
- Include the couple/gallery name, products, quantities, options, selected Dropbox photo filenames, total, customer name, and email.
- Keep all images in Dropbox; the request stores or sends references only.
- No Shopify, paid shop platform, account system, or online payment integration.

## Technical details
- Keep the experience inside the existing gallery page and scope all new styling beneath `.gallery-page`.
- Reuse the current Formspree destination for order requests.
- Preserve gallery browsing, masonry view, selection, lightbox, and downloads.
- The reference does not expose prices publicly, so use clearly marked provisional prices until Joel supplies the exact amounts; never invent hidden reference pricing.
- Verify the complete flow on mobile and desktop, including totals, form validation, and submission state.
