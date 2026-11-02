# W1 — Visual foundation and logo integration

Implemented on 2026-10-13. Scope authorized directly by the user; this milestone does not open the roadmap's sample-work phase or W2.

## Visual conventions

- The analyst's name is the primary identity in both navigation and the hero. RGB 420 is secondary, in the footer.
- Preserve the existing dark navy foundation and Barlow Condensed / Space Grotesk font pairing.
- `frontend/src/styles.css` is the source of truth for semantic color, font, page-gutter, and control-radius tokens. Tailwind maps semantic color names to these CSS variables, including opacity support. Use Tailwind's existing spacing scale for component spacing.
- Use flat surfaces, consistent slate borders, and green for actions and section labels. Do not reintroduce orange/cyan/violet accents, decorative pitch lines, grids, glows, or gradients outside the original logo artwork.
- Reuse `.page-container`, `.button`, `.button-primary`, `.button-secondary`, and `.nav-link`. Controls have 44px minimum height, visible keyboard outlines, and hover/active states.
- Primary buttons use navy text on green, including hover and pressed states. Calculated contrast ratios are 8.26:1 default, 10.81:1 hover, and 5.71:1 active (rounded; see verification output).
- Reduced-motion CSS disables smooth scrolling, transitions, and animations. Anchor scroll padding accounts for the wrapping sticky header.

## Logo

Source: `Logo rgb.png` at repository root, preserved unchanged (2000 × 2000).

Derivative: `frontend/public/images/brand/rgb-420.png`, lossless PNG cropped to rectangle x=48, y=748, width=1900, height=755. Only surrounding black padding is cropped; no artwork is redrawn, recolored, stretched, or made transparent. The black background remains. To reproduce on Windows, use System.Drawing Bitmap.Clone with that rectangle and save as PNG.

The footer renders the derivative at 112px wide with automatic height and explicit intrinsic dimensions, accessible alt text `RGB 420`, and no new navigation destination. This keeps it readable but subordinate to the analyst.

## Verification

- `npm run build`: TypeScript project build and production Vite build passed. The sandbox's first Vite attempt failed with Windows realpath EPERM; retry outside the sandbox passed.
- In-app browser inspected at actual CSS viewport widths 1280, 390, and 320px (the browser's scaling required adjusted viewport API inputs; actual widths were verified using innerWidth).
- document scrollWidth equaled clientWidth at all three widths: no horizontal overflow. Removed body's fixed minimum width to accommodate narrow viewports with scrollbars.
- Desktop and mobile screenshots inspected, including page top and footer. Both images loaded and logo lettering remained readable.
- Keyboard Tab produced a visible green outline; Enter activated the work link. Contact and work anchor destinations were verified. Existing home and mailto destinations preserved.
- Computed primary-button foreground/background verified. No new runtime errors; existing React Router v7 future-flag warnings remain.
- Reduced-motion rule inspected in source; OS reduced-motion emulation was not available through the browser controls used.
- No dependencies, content, routes, analysis pages, backend services, or product features added.

## Deferred

W2 homepage information architecture and subsequent decisions about published work remain untouched. Analysis pages, report viewers, samples, backend, databases, and tool features remain outside W1. Existing profile wording, work placeholder, external font loading, and React Router migration warnings remain for their appropriate future scope.
