# W4.1 — Visual case-study presentation

Implemented 2026-10-13 under explicit user authorization. W1–W3 passed independent audits according to the user. No commits. W4.2 is not started.

## Product boundary and presentation

This is Raúl García Bejarano's personal professional portfolio. Public entries are curated case studies demonstrating methodology, judgement and quality, with selected evidence and concise explanations. Complete PowerPoint reports are delivered privately outside this site. This instruction supersedes older README/W3 references to public complete reports and report viewers.

W1 navy tokens, fonts, restrained borders, green links/focus, mobile gutters and reduced-motion rules remain. W2 identity, portrait, navigation and section order remain. The W3 editorial template is reused, with shared figures and observation/commentary rendering. No dependencies or services added.

Ordered case studies use a 72rem maximum visual canvas and a 47.5rem prose measure (W3's 760px inner reading width). Legacy entries retain their 50rem article cap. Images use full available width and automatic height, with no crop or forced aspect ratio. Figures include sequential numbering in display order, captions, required alt text, optional source credit and match context. Captions are associated with figures through aria-labelledby. Commentary and evidence use consistent two-rem separation. Shared listing/featured entries allocate approximately 60% of desktop column width to the image and stack on mobile without cropping.

The 60–70% visual emphasis is an editorial target, not an enforced content ratio. Choose large selected visuals and concise commentary; assess each real entry before publication. Source credit alone does not establish permission to publish.

## Content contract and manual publication

The registry remains `frontend/src/features/analysis/content/analyses.ts`, intentionally empty. Existing W3 fields and draft filtering are preserved. New optional fields:

- `objective`: concise analysis objective shown with context/scope.
- Evidence `source` and `matchContext`: plain-text credit/context, displayed only when supplied. Existing `href` is a source reference, never a full report delivery mechanism.
- `sections`: ordered sections with unique lowercase hyphenated `id`, non-empty `title`, and non-empty `blocks`.
- Blocks: `{ kind: "text", text }`, `{ kind: "findings", items }`, `{ kind: "evidence", evidenceId }`, or `{ kind: "observation", observationId }`.

Omit `sections` to retain W3's findings → observations → evidence order. When supplied, sections replace that body; put selected findings in a findings block. Header/context, methodology, limitations and author/contact footer remain automatic. Refer to existing evidence/observation records rather than duplicate their content. Every supplied evidence and observation must appear once in sections; unknown/duplicate references and empty/unsupported blocks fail validation. This prevents hidden evidence and duplicate fragment IDs. Observations can link to figures wherever placed. No per-entry React page is needed.

For a real reviewed entry, an ordering might be:

```ts
sections: [
  { id: "selected-findings", title: "Hallazgos seleccionados", blocks: [
    { kind: "findings", items: reviewedFindings },
    { kind: "evidence", evidenceId: reviewedFigureId },
    { kind: "observation", observationId: reviewedObservationId },
  ] },
]
```

These variable names describe authoring structure, not sample tactical content. Add further sections/blocks for more figures, commentary or relevance. Use `methodology` and `limitations` for brief closing notes. Local images stay under `/analyses/<slug>/`; W3 canonical-path, file-existence, metadata, alt/caption and publication checks remain intact. Review accuracy, rights and source links manually before setting `published`.

Only image entries from the legacy `assets` array render publicly. PDF/PPTX/video types remain in the W3 contract for compatibility but have no public asset controls. Do not register complete reports or confidential drafts: client bundles are public. No viewer, complete report download or video player was added.

## Isolated fixtures and verification

`frontend/vite.fixture.config.mjs` explicitly injects labelled synthetic geometry/content into a separate development preview only. Its public directory is `scripts/fixtures/public`, outside production `public`; any fixture build goes to `dist-fixture`, never production `dist`. Run from frontend: `npm run dev -- --config vite.fixture.config.mjs` (port 4174). Do not deploy the fixture output. Normal build/dev does not load fixture content.

- Final `npm run build` passed TypeScript, publication validation (zero registry entries), and Vite production build. Initial sandbox build hit inherited Windows realpath EPERM; approved execution outside sandbox succeeded.
- `npm run test:publications`: 40 existing checks plus 13 ordered-section checks passed. Existing draft filtering, safe paths and metadata safeguards remain covered.
- Production home, empty portfolio, and unavailable analysis with malformed hash checked at measured 1280/390/320 CSS pixels: correct headings, no overflow.
- Isolated populated case study, index and featured homepage checked at all three widths: no overflow, no PDF/PPTX download links. Wide and portrait synthetic images loaded with descriptive accessible names and associated numbered captions.
- Case-study border-box widths: 1152/375/305px. Evidence widths: 1112/335/265px. Wide 1600×900 images rendered approximately 1112×625.5, 335×188.4, 265×149.1; portrait 600×800 images approximately 1112×1482.7, 335×446.7, 265×353.3. Integer DOM image dimensions round these values. Original aspect ratios are retained.
- Desktop and narrow visual screenshots inspected. Keyboard evidence-link Enter changed the fragment and retained link focus with the inherited 3px outline; settled figure top cleared the sticky header. Reading measure and legacy template checked separately.

## Files changed

Frontend: `src/features/analysis/types.ts`, `content/analyses.ts`, `components/AnalysisArticle.tsx`, `components/AnalysisEntry.tsx`, new `components/CaseStudySections.tsx`, `src/styles.css`, `scripts/test-publications.mjs`, new `vite.fixture.config.mjs`, and four labelled SVG fixtures under `scripts/fixtures/public/analyses/{w4-fixture,legacy-fixture}/` (wide/portrait).

Documentation: this note, engineering index, W3 architecture addendum, README, product roadmap and session log. All existing W1–W3 uncommitted work preserved.

## Limitations and deferred work

No authentic reviewed case study was supplied. Fixtures verify layout/behavior, not tactical accuracy, copyright, source reliability or real content balance. Deployed SPA fallback, cross-browser and screen-reader suites remain unverified. Existing Google Fonts and React Router future-flag warnings remain. Full reports stay private. Video presentation is deferred to separately authorized W4.2; no W4.2 work performed. Backend/CMS/API, client areas, commercial packages and RGB integrations remain excluded.

## W4.2 addendum (2026-10-13)

W4.1 passed independent audit with an image-loading warning, now resolved by W4.2. Native video evidence, known-dimension image reservation, accessible media error states and media publication checks are implemented. The historical W4.2 deferral above is superseded. See [W4.2 engineering note](w4-2-audiovisual-evidence.md). W5/W6 remain deferred; no commits.
