# Changelog

## [Unreleased] — revision 2, November 2026

### Added
- `methods.html` (Data and methods): methods-by-project matrix and twelve-method explorer; nav item; homepage section.
- HCII page: sample, statistical analysis (ANOVA, correlation, EFA, feature ratings), qualitative findings,
  design mapping, evaluation; 11 new charts and figures; wireframe, high-fidelity, and user-flow images.
- BSD page: coalition composition chart, meeting timeline, measurement-blend explorer, absenteeism targets chart.
- *Echoes* page: page-structure chart, chapter explorer, concepts-by-chapter chart, filterable 32-term glossary.

### Changed
- Name typography restored to the previous site (Fraunces 700 for the name; uppercase Inter in the header).
- Copy and facts rebalanced toward statistics, data science, and business analytics.
- Contact shown as `hldang[at]ucla[dot]edu`; copy button assembles the address in script.
- Languages listed without proficiency labels.
- BSD role, dates, and plan period corrected from district documents.

### Removed
- The non-UCLA coursework entry; the personal email and a phone number (including in legacy files).
- The unsupported "eight apps" and "$20M deficit" claims.

## [Unreleased] — `portfolio-redesign` branch, November 2026

A full redesign and content rebuild. Preview only; not yet published.

### Added

- **New pages:** `work.html` (filterable index), `experience.html` (timeline, roles,
  affiliations), `publications.html` (paper, books, report, essays), `404.html`.
- **Design system:** `assets/css/main.css` (tokens, type, layout, navigation, footer) and
  `assets/css/components.css` (shared components and page compositions).
- **Shared markup tool:** `tools/partials.py` stamps head assets, header, and footer into
  every page; `--check` flags stale pages.
- **Interactive components** (vanilla JS, progressive enhancement): mobile navigation,
  reading progress, back-to-top, copy email and citations, contents scrollspy, explorer
  diagrams, view toggles, work filtering with shareable `?type=` URLs, chart tooltips.
- **Visualizations** (inline SVG, no library):
  - Homepage and Experience: role timeline 2023–2026.
  - HCII paper: separate-tools vs integrated-platform toggle; eight-stage method explorer.
  - Housing Friction Index: friction-model explorer; hypothetical seller's path; Friction
    Score weights; REET calculator; interview concern scores (n = 7); open-house topic
    mentions (101).
  - Synaperge: organizational timeline from its published history; member pathway.
  - DFDraw Lab: operating-loop explorer; US–China office-hours overlap (daylight/standard).
  - UCLA Anderson: support-layer model; diagnostic workflow.
  - BSD coalition: the district's plan framework.
  - Books: *Echoes* concept map (four movements); assistance-to-authority diagram.
- **Content:** research questions transcribed from the original HCII proposal; full
  citation and BibTeX; Synaperge history and programs; housing method, timeline, limits.
- **Metadata:** production canonical/OG URLs, per-page descriptions, 1200×630 PNG social
  image, JSON-LD (`Person`, `ProfilePage`, `ScholarlyArticle`, `Book`), favicon.
- **Docs:** `docs/CONTENT_AUDIT.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`,
  `docs/DEVLOG.md`, `PREVIEW_REPORT.md`.

### Changed

- Every page rewritten on the shared system; URLs unchanged.
- Profile rewritten in first person with concrete detail.
- Book subtitles corrected to match covers and ORCID.
- AAAI membership moved from Research to Experience → Affiliations and described as a
  membership.
- Book covers and FamilyPulse figures stored locally instead of hot-linked.
- Portrait moved to `assets/images/portrait.jpg` (no longer base64-embedded in a page).
- Sitemap rebuilt with real URLs; `ORIGINAL index.html` removed from it and marked `noindex`.

### Removed

- Floating blurred orbs, mouse-parallax listener, grain overlay, and radial-gradient
  backgrounds.
- `unified-subpage-theme.css` and per-page "technical dark" override blocks (~60
  `!important` declarations).
- Unlabeled modeled scores on the housing page presented as if measured.
- Unsourced pull quote on the homepage.
- `image.thum.io` live screenshots on the DFDraw page.
- `public/` (placeholder sitemap/robots and an OG image describing the author as a
  "Frontend Engineer").

### Fixed

- `yourdomain.com` placeholders in every canonical, OG, sitemap, and robots entry.
- Broken links: DFDraw FamilyPulse case study (403), BSD annual plan (404), AAAI back link
  to a non-existent `#activities` anchor.
- Duplicated "My Role" paragraph on the HCII page.
- Missing `<main>` landmarks, skipped heading levels, near-invisible "last updated" text.
- Old homepage anchors `#about` and `#research` still resolve.
