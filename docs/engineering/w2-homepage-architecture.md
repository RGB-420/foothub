# W2 — Homepage information architecture

Implemented on 2026-10-13 under the user's explicit W2 scope, after W1 passed independent audit. W3 is not started.

## Structure and responsibilities

Files changed in W2 (pre-existing W1 changes remain untouched outside this list):

- `frontend/index.html`
- `frontend/src/styles.css`
- `frontend/src/shared/components/Navbar.tsx`
- `frontend/src/shared/config/navigation.ts`
- `frontend/src/features/home/content/profileContent.ts`
- `frontend/src/features/home/pages/HomePage.tsx`
- `frontend/src/features/home/components/HeroProfile.tsx`
- `frontend/src/features/home/components/ProfileSummary.tsx`
- `frontend/src/features/home/components/FeaturedWork.tsx` (new)
- `frontend/src/features/home/components/Methodology.tsx` (new)
- `frontend/src/features/home/components/Contact.tsx` (new)
- `docs/product/PRODUCT_ROADMAP.md`
- `docs/product/SESSION_LOG.md`
- `docs/engineering/w2-homepage-architecture.md` (new)

The single `/` route composes these sections in order:

1. `HeroProfile`: compact personal introduction with name, independent tactical analyst role, existing portrait, first-person focus, and work/contact anchors.
2. `FeaturedWork`: editorial unpublished-work state, immediately after the introduction.
3. `Methodology`: observation, tactical interpretation, evidence, and reporting as an ordered list.
4. `ProfileSummary`: existing training, exercises, and Barcelona context, without repeating the introduction.
5. `Contact`: direct email, collaboration availability, and the existing optional LinkedIn behavior.

Copy and workflow steps live in `features/home/content/profileContent.ts`. Components remain local to the home feature. No new routes, dependencies, services, databases, or report viewer.

## Editorial decisions

- Follow W1's CSS tokens, navy surfaces, green accents, typography, buttons, borders, focus outlines, and reduced-motion rule. Shared section labels and headings live in the existing stylesheet.
- Reduce the desktop name from 96px to 48px and mobile name from 48px to 30px. The portrait occupies the introduction's first row on mobile rather than appearing after the copy and buttons; it stays larger alongside the introduction on desktop.
- Keep the existing footer and RGB 420 logo unchanged. The analyst remains the primary identity.
- The user specifies an independent tactical analyst identity; existing documentation supplies the honest training context. Do not invent qualifications, professional achievements, client work, integrations, or a mature proven methodology.
- Use natural Spanish with proper accents. Metadata now identifies the analyst by name and describes the actual homepage.

## Featured work and publication boundary

No publishable analysis exists in the repository. `FeaturedWork` therefore states **Sin muestra publicada**, describes future report context in the future tense, and contains no image, match, statistics, findings, report URL, button, or focusable placeholder.

The two-column editorial composition reserves the leading area for a future supplied tactical image and the adjacent column for a real report title, context, and findings supported by evidence. It stacks on mobile. The current left area is a publication-status message, not a simulated screenshot. No data model, populated variant, or report interaction is implemented in W2; those require supplied real work and later authorization.

## Navigation

- Analyst-name home link has a 44px minimum height. A native `/` link reliably returns to the introduction after navigating between sections.
- The simple three-item navigation remains. `Perfil` now targets `/#profile`; `Trabajos` and `Contacto` retain `/#work` and `/#contact`.
- Introduction CTAs retain `#work` and `#contact`. Contact retains `mailto:info@rgb-420.com`.
- Sections have explicit heading associations; heading hierarchy is one H1, section H2s, and workflow H3s. Work has no fake report actions.

## Verification

- TypeScript project checks and Vite production build via `npm run build` passed.
- In-app browser inspected at measured CSS viewport widths 1280, 390, and 320px. No horizontal overflow: scrollWidth equaled clientWidth (1265, 375, and 305px respectively, accounting for scrollbars).
- Analyst name and professional role visible immediately. Portrait loaded, fully visible near the top on mobile: y=145px, 88 × 110px at both mobile widths. Desktop portrait: 240 × 300px.
- Name-link target measured 44px. Keyboard Tab exposed a 3px focus outline and Enter activated the work link.
- Work, profile, and contact anchors checked; section offsets respect the sticky header. Name link and mailto destination checked.
- DOM order confirmed introduction → work → methodology → profile → contact. Featured work contains zero links and zero images.
- Desktop and mobile screenshots reviewed for hierarchy, wrapping, portrait, lower sections, and footer.
- Both logo SHA256 hashes match the pre-W2 values. Existing React Router migration warnings remain; no new runtime errors found.
- `git diff --check` passed. No commits created.

## Limitations and deferred work

The featured area cannot show a real title, tactical image, or findings until a publishable sample is supplied. Training context has no named qualification or unverified course progress. LinkedIn remains unset. External Google Fonts loading and React Router migration warnings remain inherited limitations.

W3, real analysis publication, report viewers, new routes, integrations, services, databases, and product features are deferred. This milestone does not approve or implement those changes.
