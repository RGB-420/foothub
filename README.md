# Foothub

Foothub is a football analysis portfolio in progress.

The website is a personal professional portfolio for Raúl García Bejarano, an independent football tactical analyst. Curated public case studies demonstrate his methodology, judgement and quality of work. Complete PowerPoint reports are delivered privately outside the website.

## Product Direction

The portfolio is being built around one core idea:

> Provide useful football information first, then use the profile as professional context.

The expected visitor is not a generic recruiter. The internal target user is a coach or coaching staff member from a small or medium-sized club, often without a dedicated analysis department. The public wording remains broader and speaks to clubs and coaching staffs.

The home page is meant to support trust, context, and contact. The main long-term value will come from analysis pages and tactical reports that help clubs understand opponents, prepare matches, or evaluate the analyst's way of working.

## Current Status

The project currently includes:

- Product documentation and roadmap.
- Engineering documentation.
- A first React/Vite/Tailwind frontend.
- A first version of the professional identity section.
- Configurable profile content and profile image.

W3 provides `/analisis`, `/analisis/:slug`, a reusable editorial template and not-found routes. No analyses are published yet. W1–W3 passed independent audits. W4.1 passed independent audit. W4.2 native video and media resilience are implemented; W5 and W6 remain deferred.

Analysis registration lives in `frontend/src/features/analysis/content/analyses.ts`. See [W3 architecture and manual publication](docs/engineering/w3-portfolio-architecture.md) for the content contract, assets, checks and static-host SPA fallback requirement. The portfolio operates independently of other RGB 420 applications.

## Repository Structure

```text
docs/
  engineering/        Engineering principles, architecture notes, and examples
  product/            Product vision, principles, roadmap, and session log

frontend/
  public/             Static assets
  src/
    app/              App shell and routing
    features/home/    Home page content and components
    shared/           Shared UI/config
```

## Frontend

The frontend is built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

Run it locally:

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
cd frontend
npm run build
```

## Editable Content

The main profile content lives in:

```text
frontend/src/features/home/content/profileContent.ts
```

The profile image lives in:

```text
frontend/public/images/profile/profile-photo.jpg
```

## Product Workflow

The project is managed through small product phases. Each phase is documented before moving to the next one.

Key documents:

- `docs/product/product-vision.md`
- `docs/product/product-principles.md`
- `docs/product/PRODUCT_ROADMAP.md`
- `docs/product/SESSION_LOG.md`

The roadmap is the source of truth for the current product phase and next approved step.

## Future Ideas

Future evolutions may include:

- Web-based tactical reports.
- Organized analysis library.
- Shareable pages for specific opponent/team reports.
- International language support.
- Analytics for report views and engagement.
- More advanced visual identity and report formats, possibly designed in Figma.

These are intentionally outside the first portfolio MVP unless the roadmap brings them into scope.

## W4.1 case-study presentation

The current portfolio demonstrates Raúl García Bejarano's methodology, judgement and work quality through curated public case studies. Complete PowerPoint reports are delivered privately outside the website. This supersedes the older full-report product direction above.

W4.1 adds ordered editorial sections, prominent responsive figures with original aspect ratios, numbered captions and optional source/match context. No work is published: the production registry remains empty. See [W4.1 engineering and verification](docs/engineering/w4-1-case-study-presentation.md). W4.2 adds native video evidence and accessible media failure states; no commits created. See [W4.2 engineering and verification](docs/engineering/w4-2-audiovisual-evidence.md).
