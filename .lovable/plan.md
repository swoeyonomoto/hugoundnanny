# Editorial typography and layout consistency

## Changes
- Use the new gallery as the visual benchmark: clearer type hierarchy, calmer spacing, fine rules, stronger image-led composition, and fewer boxed treatments.
- Improve desktop and mobile font sizes, line lengths, line heights, and section spacing across the homepage, About, Gang, Thank You, and legal pages.
- Refine the homepage split so the text column feels intentionally composed on desktop and the mobile text remains comfortably readable without pushing the main action too far down.
- Bring shared headings, labels, body copy, forms, buttons, footer, testimonials, pricing, and FAQs into one consistent editorial scale.
- Preserve all copy, images, routes, functionality, the Asia page’s established composition, and the gallery’s current styling.

## Quality checks
- Review the homepage and representative content pages at desktop and mobile widths.
- Check that text wraps cleanly, controls remain visible, and no sections overlap.
- Confirm the preview builds without errors.

## Technical details
- Centralize shared spacing and typography values as semantic CSS variables.
- Apply changes through existing shared selectors, with page-specific exceptions where composition differs.
- Keep responsive sizing bounded rather than scaling continuously with viewport width.
