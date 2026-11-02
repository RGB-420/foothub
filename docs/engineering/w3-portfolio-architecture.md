# W3 — Portfolio architecture and editorial analysis pages

Implemented on 2026-10-13 under explicit user authorization after W1/W2 passed independent audits. No commits created. W4 is not started.

## Routes and content architecture

- `/`: existing W2 homepage and native profile/work/contact anchors preserved.
- `/analisis`: editorial listing of published work, currently an honest empty state.
- `/analisis/:slug`: published analysis lookup and one reusable `AnalysisArticle`; absent and draft slugs receive an analysis-specific not-found page.
- `/*`: clear not-found page with working portfolio/home links.

The existing BrowserRouter remains. `RouteNavigation` moves focus to the page H1, updates the document title, scrolls new route transitions to the top, and handles evidence hash references. POP transitions retain browser scroll behavior; custom scroll-position restoration is not implemented. Native homepage links continue to navigate and scroll as before.

`features/analysis/types.ts` holds a small typed content contract. Required fields cover stable slug, publication status/date, title, summary, author, analysis type, context and observation scope. Executive findings, observations, interpretations, practical implications, evidence, methodology, limitations, preview and assets are optional. Empty optional sections do not render. Observations reference evidence by local IDs. Real images require descriptive alt text and captions. Assets are ordinary working links, not embedded viewers.

`features/analysis/content/analyses.ts` is the only registration source. Published entries are sorted by ISO publication date, newest first; featured work selects the first explicitly featured published entry, falling back to the latest publication. Drafts are excluded from listing, homepage and direct detail routes. The registry is intentionally empty: no fabricated reports, matches, findings, statistics or images were added.

The user explicitly requires manually maintained frontend content and no backend/API/database. This preserves the static-portfolio exception established in W1/W2 to the generic engineering manual's full-stack blueprint. No API clients, services, integration layers or new dependencies are needed.

## Design decisions

W1 tokens, navy surfaces, font pairing, green link/focus accents and W2 personal hierarchy are retained. Listing entries are editorial rows with borders rather than cards. The detail template uses a maximum 50rem width, readable line height and responsive images, with clear separation between observation, interpretation and implications. Evidence can be reached from observations. Raúl's name remains in navigation, portfolio attribution and contact; the existing secondary RGB logo and portrait assets are unchanged.

The homepage's unpublished message remains intact. A real portfolio navigation link is now available below it; this is not a placeholder report control. Published entries share `AnalysisEntry` between the homepage and listing.

## Manual publication workflow

1. Prepare a real reviewed analysis and its supporting material. Register an entry in `frontend/src/features/analysis/content/analyses.ts`, using the `Analysis` type. No report-specific component or route is needed.
2. Choose a unique lowercase hyphenated slug and keep it stable once shared. Supply a valid `YYYY-MM-DD` publication date, actual author, descriptive type, football context and scope. Explain the matches/periods/footage observed and the limits of conclusions. Use `draft` until ready; draft content is still bundled in the client, so never store confidential material here.
3. Add only relevant optional sections. Give observations and evidence unique IDs within the report; every `evidenceIds` reference must match a supplied evidence ID. Supply real captions/alt text, never illustrative evidence presented as observed play.
4. Copy manually managed files to `frontend/public/analyses/<slug>/` and reference them as `/analyses/<slug>/<filename>`. PDF, PPTX, images and video URLs use the `assets` array's kind/label/href fields. Evidence images and external references use `evidence`. Use only valid local paths or trusted HTTP(S) references, with permission to publish the material. Omit unavailable assets entirely.
5. Set `status: "published"` after review. Set `featured: true` on the desired homepage selection (at most one). If none is selected, the latest published analysis appears. The listing and detail route update from the same registry.
6. Run `npm run build` in `frontend`. It checks TypeScript, validates the publication registry and local file existence, then builds production assets. `npm run verify:publications` runs the content/file check alone; `npm run test:publications` exercises safe isolated validation fixtures. Check the listing, featured entry, direct detail URL, refresh, all evidence links and asset paths at desktop and mobile widths. Review content accuracy, external destinations and permission to publish manually before deployment.
7. Deploy the static build with the host configured to serve `index.html` for application routes while serving static assets normally. Rebuild/redeploy for each publication. No synchronization, imports or dependency on RGB Reports, RGB Video, RGB Data or other RGB applications exists.

## Files changed for W3

New frontend files:

- `frontend/src/app/RouteNavigation.tsx`
- `frontend/src/features/analysis/types.ts`
- `frontend/src/features/analysis/content/analyses.ts`
- `frontend/src/features/analysis/components/AnalysisEntry.tsx`
- `frontend/src/features/analysis/components/AnalysisArticle.tsx`
- `frontend/src/features/analysis/pages/AnalysisIndexPage.tsx`
- `frontend/src/features/analysis/pages/AnalysisDetailPage.tsx`
- `frontend/src/shared/components/NotFoundPage.tsx`

Modified frontend files: `src/app/App.tsx`, `src/app/routes.tsx`, `src/features/home/components/FeaturedWork.tsx`, `src/styles.css` (all within `frontend`).

Documentation: this note, `docs/engineering/index.md`, `docs/product/PRODUCT_ROADMAP.md`, `docs/product/SESSION_LOG.md`, and `README.md`. Earlier uncommitted W1/W2 work is preserved.

## Verification and limitations

- `npm run build` passed TypeScript project checks and Vite production build. The sandbox initially produced the inherited Windows realpath EPERM failure; an approved build outside the sandbox succeeded.
- Production preview served locally; the initial sandbox preview was unreachable, so the approved external preview was used for browser verification.
- Browser checked `/`, `/analisis`, `/analisis/desconocido`, and `/no-existe` at measured 1280, 390 and 320 CSS pixels. Each displayed the expected H1; scrollWidth equaled clientWidth for all 12 checks. Home client widths exclude a 15px scrollbar; the shorter routes use the full width.
- Direct route loading and refresh verified. Homepage → portfolio → browser back → browser forward returned the correct content. Keyboard Tab showed the inherited 3px green outline and Enter activated the return-home link.
- Homepage section order, native profile/work/contact anchors, mailto destination, portrait and secondary logo checked. No report or evidence content appears in empty states.
- The populated detail/featured/list variants are typechecked and reviewed in source, but cannot be visually verified with a real report until one is supplied. No artificial publication was added to exercise them. Before the first publication, verify all populated sections and evidence hash navigation at the three widths.
- Browser verification covers the local Vite production preview's SPA fallback. No production hosting configuration exists here, so deployed deep-link refresh and HTTP 404 status behavior cannot be verified. Client not-found pages use the SPA response status.
- External Google Fonts and existing React Router migration warnings remain inherited limitations. No new package dependencies or links to internal RGB application services were introduced.
- Final `git diff --check` passed. The final browser console check returned no warning/error entries. Existing uncommitted W1/W2 files were not reset and no commits were created.

## Deferred to W4

Presentation display, PDF viewers, video players and PowerPoint rendering are not implemented. The optional manually managed asset references leave room for complete presentations without coupling publication to authoring software. W4 requires separate authorization.

## W3.1 — Stabilization after failed independent W3 audit (2026-10-13)

The audit findings supplied in the W3.1 user instruction supersede W3's earlier completion claim: malformed fragments were a blocker, with warnings for reading width, publication safeguards, and fragment metadata/focus. This stabilization changes no product scope. No commits or W4 work.

### Causes and fixes

- `RouteNavigation.tsx` decoded arbitrary hashes without catching `URIError`. Decoding is now guarded; malformed and unknown IDs use the same harmless fallback. Valid and percent-encoded evidence IDs still scroll normally.
- The hash early return skipped metadata and H1 focus. Titles now update before fragment handling. H1 focus uses `preventScroll` only on initial mount/pathname changes. Same-page hash changes leave focus alone; unknown/malformed same-page hashes leave scroll alone. New PUSH routes without a valid target scroll to top. POP routes without a valid target retain native browser scroll behavior. Valid targets retain anchor scrolling. No routing abstraction or custom scroll restoration was added.
- `.page-container` followed `.editorial-article` at equal specificity and replaced 50rem with 72rem. `.page-container.editorial-article` now wins explicitly. The article's existing class composition requires no component change. Shared centering and responsive gutters remain intact. The 50rem convention is the article's border-box maximum, including two 20px gutters (760px text width at a 16px root font).
- The registry had only TypeScript types and manual checks. `validateAnalyses` now reports entry index/slug and field-specific errors for duplicate or unsafe slugs, unsupported statuses, impossible/non-ISO dates, empty required metadata, duplicate/unsafe evidence and observation IDs, broken/duplicate evidence references, empty labels/captions/alt text, unsupported asset kinds, unsafe references, and multiple featured publications. Development module evaluation validates edits immediately. The build verifier uses the existing TypeScript compiler to load the registry and additionally checks that each local reference is an existing regular file under `public`.

Local images must use canonical unencoded `/analyses/<slug>/<file>` paths. Local assets and evidence references use the same rule; nested directories are allowed. Traversal, backslashes, encoded paths, queries/fragments on local paths, protocol-relative URLs, script/data schemes, and cross-report local references fail. Asset/evidence hyperlinks may also use HTTP(S) URLs without credentials. External availability and trust still require editorial review. All registered entries, including drafts, must satisfy the content contract; unfinished work can remain outside the registry. Only explicit `published` entries feed the existing listing, featured selection and detail lookup. Draft exclusion is unchanged and tested; client bundles are not confidential storage.

### Files changed for W3.1

- `frontend/src/app/RouteNavigation.tsx`
- `frontend/src/styles.css`
- `frontend/src/features/analysis/content/analyses.ts`
- `frontend/package.json`
- `frontend/scripts/verify-publications.mjs` (new)
- `frontend/scripts/test-publications.mjs` (new)
- `docs/engineering/w3-portfolio-architecture.md`
- `docs/product/SESSION_LOG.md`

### Verification

- TypeScript project checks and production build passed. The initial sandbox Vite build hit the inherited Windows realpath EPERM; the approved external build passed. No dependencies were added. Publication validation passed with zero registered entries.
- `npm run test:publications`: 40 assertions passed using in-memory synthetic entries. Tests cover valid/empty registries, leap dates, invalid dates/slugs/status/metadata, duplicate IDs and references, missing evidence, unsafe paths/URLs, missing local files, multiple featured entries, publication sorting, featured selection and draft-only exclusion. Fixtures never modify the registry.
- Production preview checked `/`, `/analisis#%`, `/analisis/#unknown`, `/analisis/desconocido#%` and `/no-existe` at actual 1280, 390 and 320 CSS pixels (15 route/viewport checks). Correct content/title/H1 focus, no horizontal overflow, honest empty portfolio, no fabricated work. Direct reload with malformed hash passed. Production console contained no errors.
- Native work/profile/contact links and hash history checked; targets scrolled visibly with sticky-header clearance. Home → portfolio → back → forward updated content/title and H1 focus. Keyboard Tab exposed the inherited 3px outline; Enter activated the return-home route. Portrait/logo loaded, contact remains `mailto:info@rgb-420.com`, and homepage order/identity remain intact.
- A separate temporary Vite configuration injected clearly labelled synthetic report/draft entries only into an isolated build on a separate local port. The production registry and production output stayed empty. Populated listing, homepage feature and all article sections were inspected. Draft title was absent from homepage/listing and draft direct URL returned the analysis not-found page. Temporary config/output were removed after verification.
- Browser computed article border-box widths: 800px at 1280, 375px at 390, and 305px at 320. Computed `max-width` was 800px and both gutters 20px throughout; mobile widths account for the 15px scrollbar. Text widths were 760/335/265px. No article/list overflow. Clearly labelled synthetic evidence image loaded at 760/335/265px. Desktop/mobile screenshots and narrow evidence/section layout were inspected.
- Isolated report direct valid hash, encoded `#evidence-%6Fne`, malformed `#%`, unknown hash and refresh checked. Route transitions with fragments updated title and focused H1. Keyboard Enter on the evidence link scrolled to evidence while retaining link focus and its 3px outline. Same-report invalid fragments retained scroll/focus; hash back/forward worked. An initial copied draft fixture image pointed at the other fixture's folder and was correctly rejected by validation; the isolated draft fixture was corrected before the final successful checks.
- Final whitespace check passed. Existing W1/W2 uncommitted work was preserved.

### Remaining limitations and independent re-verification

W3.1 awaits independent audit; locally passing checks are not an independent sign-off. Re-verify all four reported findings, especially native history/focus interaction and the computed 50rem cap. Real report imagery, editorial accuracy, publication rights and external asset destinations require review before the first publication. Synthetic assets cannot establish those facts. Deployed SPA fallback/HTTP status behavior remains unverified without hosting. Browser checks used the in-app browser, not a cross-browser or screen-reader suite; OS reduced-motion behavior was not emulated. Existing external fonts and React Router migration warnings remain. W4 is deferred.

## W4.1 — Superseding presentation guidance (2026-10-13)

W1–W3 passed independent audits as confirmed by the user. Public entries now represent curated professional case studies; complete reports are delivered privately outside the website. Older asset/viewer guidance above is historical. See [W4.1 presentation and publication contract](w4-1-case-study-presentation.md) for ordered sections, numbered figures, image/source context, isolated fixtures and verification. No W4.2 work.

## W4.2 media publication addendum (2026-10-13)

For public short clips use evidence.video, with a local MP4/WebM source, title and description, optional original dimensions, local poster and WebVTT captions. Use evidence.image width/height to reserve known original image space. Legacy entries remain valid; assets do not become public report controls. The older full-report/video deferral guidance is superseded by [W4.2 audiovisual evidence](w4-2-audiovisual-evidence.md), which documents accepted formats, validation, browser checks and limitations.
