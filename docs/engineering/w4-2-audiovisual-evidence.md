# W4.2 — Audiovisual evidence and media resilience

Implemented 2026-10-13 under explicit authorization after W1–W4.1 passed independent audits. Resolves the W4.1 image-loading warning. No commits; W5 and W6 are not started. This is Raúl García Bejarano's personal analyst portfolio; full PowerPoint reports remain privately delivered outside the site. The production registry is still empty.

## Content model and publication

Evidence retains IDs, labels, captions, source/match context, observation references and ordered section references. Add optional `video` to an evidence record with required `src`, `title`, and `description`; optional `width`, `height`, `poster`, and `captions: { src, srcLang, label }`. An evidence record cannot have both `image` and `video`; use `video.poster`. Evidence numbering remains sequential in editorial display order, including images and clips. Legacy W3 evidence and image-only entries remain valid.

Evidence images now accept optional `width` and `height`. Dimensions, when supplied for either media type, must be a positive integer pair matching the original media. Omit both when unknown; never guess a fixed ratio. Existing records need no migration. Video-only case studies should still use a separate image `preview` when a listing preview is wanted.

Copy short reviewed clips manually to `frontend/public/analyses/<slug>/`. Native evidence supports `.mp4` and `.webm` (case insensitive). Prefer MP4 with H.264/AAC or WebM with VP8/VP9 and Opus/Vorbis, subject to target-browser testing; container extensions alone do not guarantee decoder support. No transcode or processing pipeline is included. Posters accept PNG, JPEG, WebP, AVIF, GIF or SVG. Captions must use `.vtt` WebVTT with a descriptive label and a language tag such as `es` or `en-GB`. Use original video dimensions and a poster with the same composition/ratio. Caption spoken material accurately; describe relevant visual actions in the evidence commentary.

All video/poster/track paths use canonical unencoded `/analyses/<slug>/<file>` paths, including optional nested directories. Remote media, traversal, cross-analysis paths, encoded segments, backslashes, queries and fragments are rejected. Build-time validation checks every referenced local file is a regular file. Existing ID/reference, caption, section and publication checks still apply. Legacy `assets` remain compatible but do not become video players or report download controls.

Run `npm run verify:publications`, `npm run test:publications` and `npm run build` before publication. Review tactical accuracy, permissions, actual playback, subtitles and decoder support manually. The validator checks paths/extensions/metadata and existence, not codec bytes, caption syntax, rights or football claims. No runtime schema library or new dependency was added.

## Rendering and failure behavior

The shared `EvidenceFigure` serves both W3 and ordered case studies. Videos use native HTML5 `controls`, `playsInline` and `preload="none"`; autoplay and loop are absent. Pause, seek, volume and fullscreen belong to browser controls. The title supplies the accessible name; description and numbered caption supply context. The optional track is a native captions track. No metadata event claims playback success.

Images remain lazy loaded, full width and automatic height. Known original dimensions reserve space before loading. On image `error`, the broken image element is replaced with a visible `role="status"` message and its description. Native video `error` similarly replaces unavailable/unsupported video with a status message and description. Captions, source context, numbering, IDs and observation links remain visible. With preload disabled, video failure is normally discovered after the visitor requests playback. Network stalls alone are not misreported as permanent failure.

Failure areas retain the supplied aspect ratio where space permits. At narrow widths the minimum readable fallback height can exceed the ratio to fit text; no existing image/video is stretched or cropped. Missing dimensions use a readable minimum height. Fallback width is explicitly constrained after browser testing caught aspect-ratio/min-height expansion at 320px. Media state resets when evidence/media properties change.

## Isolated fixtures and verification

`vite.fixture.config.mjs` extends the existing isolated preview on port 4174. Synthetic geometry, test patterns, invalid bytes and deliberately missing references exist only in this preview; no tactical claims or production publications were introduced. The production build does not include these assets or fixture entries. Fixture output remains `dist-fixture`, never deploy it. The WebM clip was generated locally using FFmpeg solely as a test asset, not an application pipeline.

- TypeScript project checks passed; production build and publication validation passed (zero registered entries). Vite needed the same approved execution outside the Windows sandbox realpath restriction as earlier milestones.
- Automated publication tests passed: 40 W3 assertions, 13 W4.1 assertions and 22 new media assertions (75 total). New tests cover MP4/WebM acceptance, descriptions, dimension pairs, incompatible image/video fields, unsafe/local paths, unsupported extensions and missing video/poster/track files independently.
- In-app Chromium preview: original three-second WebM actually played to its end (`currentTime=3`, `ended=true`, `readyState=4`); the final twelve-second fixture played and keyboard Space paused at approximately 6.8 seconds. This proves playback beyond metadata. No autoplay/loop; `preload=none` and native controls confirmed in DOM. Keyboard evidence-link Enter, video keyboard playback and the 3px focus outline checked. ArrowRight interaction did not conclusively establish seeking, so timeline seeking remains a manual browser-control check.
- Poster visibly rendered before playback. Caption track loaded (`readyState=2`). Subtitle timing/rendering across browsers is not certified. Missing image, missing video and allowed-extension video with invalid bytes produced explicit status fallbacks through real load/error events, retaining descriptions and captions.
- Ordered fixture, legacy image-only fixture and fixture index checked at 1280/390/320 CSS pixels. Final ordered media widths were 1112/335/265px; 16:9 media heights 625.5/188.44/149.06px; portrait heights 1482.66/446.66/353.33px. Fallback rectangles stayed within figures at all widths; narrow video fallbacks use a readable 160px minimum. `scrollWidth` equalled `clientWidth`: no horizontal overflow. Desktop poster and 320px fallback screenshots inspected.
- Production home, empty portfolio, unknown analysis with malformed hash and not-found routes checked at all three widths: expected headings and no overflow. Identity, portrait, logo, contact and empty publication state retained. An initial fixture-only shared-reference mistake was corrected before final checks; no production registry changes.
- Whitespace/diff checks passed. Existing LF/CRLF Git notices are not whitespace errors.

## Files changed and remaining limits

Frontend: `src/features/analysis/types.ts`, `components/CaseStudySections.tsx`, `content/analyses.ts`, `src/styles.css`, `scripts/test-publications.mjs`, `vite.fixture.config.mjs`, and three new fixture assets (`clip.webm`, `captions.vtt`, `unsupported.mp4`) under `scripts/fixtures/public/analyses/w4-fixture/`.

Documentation: this note, engineering index, W3/W4.1 addenda, README, roadmap and session log. Existing uncommitted milestone work is preserved.

MP4/H.264 playback, audible volume (fixture has no audio), fullscreen activation, conclusive seeking, cross-browser/mobile-device and screen-reader suites remain unverified. Native controls expose these features subject to browser capabilities. No authentic reviewed case study or deployed hosting was supplied; editorial quality, rights and deployed routing remain manual checks. Existing font/router warnings remain outside this milestone.

W5 and W6 remain deferred, pending their own authorization and scope. No backend, CMS, uploads, report viewers/downloads, custom media controls, RGB integrations, client areas or pricing were implemented. Stop after W4.2.
