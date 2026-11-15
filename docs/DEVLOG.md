# Development Log — portfolio redesign

Branch: `portfolio-redesign`, created from `main` at `74f0205` on 2026-11-15.
Production (`main`) was not modified at any point.

## 1. Inventory

- Working tree clean on `main`; no `.github/workflows`, no `CNAME`. GitHub Pages deploys
  from the root of `main` (classic branch publishing) at `/home/`.
- Read every HTML page in full, plus `ORIGINAL index.html` and the draft `111`, which
  carried older résumé figures.
- Consulted primary sources linked from the site to ground new content: ORCID and Crossref
  (publication metadata), the Housing Friction Index exhibit (method, data, limits), the
  Synaperge website (history, events, course), the DFDraw Lab website (studio context), the
  FamilyPulse case-study images (research questions, business model), and the Medium RSS
  feed (essay titles and dates).
- Findings recorded in `docs/CONTENT_AUDIT.md`, including eight factual conflicts between
  pages and how each was resolved.

**Decision:** keep every existing URL, including mixed-case `Bellevue-Housing.html` and
`FTTC.html`, because GitHub Pages is case-sensitive and inbound links may exist.

## 2. Design system

- Kept the identity (warm near-black, gold, Fraunces + Inter) and removed the effects that
  read as generated: blurred orbs, parallax, grain, gradients, pills, rounded cards.
- Replaced three conflicting style layers per page with two shared stylesheets.
- Validated the chart palette with the dataviz validator. The first candidates (muted
  gold/slate) failed the chroma floor and lightness band; settled on `#ba8538` / `#4f88c6`,
  which pass all checks on the dark surface.

**Decision:** no build pipeline. Shared header/footer are stamped by a tiny Python script
and committed, so GitHub Pages still serves plain files.

## 3. Pages

Built in this order: homepage, HCII paper, Housing Friction Index, Synaperge, DFDraw Lab,
UCLA Anderson, BSD coalition, AAAI, two book pages, profile, work index, experience,
publications, 404.

Accuracy decisions made while writing:

- **HCII figures.** The two satisfaction measures (2.7 / 5 and 84.2 / 100) are on different
  instruments. They are shown in a table with their scales and an explicit note, never on a
  shared axis or as a before/after.
- **Housing data.** Only values the source exhibit documents as coded or arithmetic are
  charted (interview concern means, open-house topic counts, model weights). The modeled
  correlation matrix and ZIP scores are described in the limits section, not charted.
- **REET calculator.** Uses the state brackets from the source exhibit with a visible
  caveat that thresholds change and must be verified.
- **Synaperge.** Membership stated as "over 60 active members by early 2025", attributed to
  the organization's history page, instead of choosing silently between 56 and 60+.
- **Removed invented content** caught during self-review: an anecdote about "five apps on a
  household's phone"; a causal link between leaving Synaperge and joining UCLA Anderson; a
  claim that DFDraw handoffs "mostly" cross a 15–16 hour gap; a claim about who holds design
  credit for studio projects.

## 4. Problems encountered and fixes

| Problem | Fix |
|---|---|
| Browser-default `<figure>` margins shrank feature visuals on the homepage | `figure { margin: 0 }` in the base layer |
| Bar charts scaled up without limit inside wide frames (20px+ labels) | `max-width: 37rem` on non-timeline charts |
| Friction-model SVG had a loose viewBox; labels rendered ~10px | Tightened the viewBox to the drawn content |
| If `site.js` failed, the `.js` class alone would have collapsed the mobile menu with no way to open it | Menu collapses only after `site.js` sets `html.nav-ready` |
| Inline `style=""` attributes slipped into several pages | Replaced with named classes; alternate SVG views hidden by class |
| QA script hung waiting on lazy images that never load off-screen | Force eager loading with a 5s cap |
| `strategicplan.bsd405.org/2024-2025-annual-plan` returns 404 (already broken in production) | Linked the district's current `/annual-plan` |
| `dfdrawlab.com/ux/ux-familypulse` returns S3 Access Denied | Link removed; figures stored locally with credit |
| `ORIGINAL index.html` contains an injected school web-filter script ("LS Filter") | Marked `noindex`, excluded from sitemap and robots; recommended for deletion |

## 5. Testing

See `PREVIEW_REPORT.md` for the full checklist and results.

## 6. Revision 2

- Read the HCII camera-ready PDF and slides, the BSD coalition documents, and the *Echoes* manuscript with PyMuPDF
  in a throwaway virtual environment in the scratch folder (nothing installed into the project or global Python).
- Charts were generated from the numbers in those sources by a small script, then injected into the pages as static
  SVG. Figures from the paper were rendered from the PDF's figure regions at 330 dpi and saved as JPEG.
- Glossary entries were parsed from the manuscript's Appendix A, preserving the book's wording.
- Draft BSD goals (April 2025) were read but not published; targets come from the published plan and the approved
  2025–26 annual plan.
- Found and removed a phone number in `ORIGINAL index.html`'s contact links, alongside the personal email.
- The partials tool now inserts the UCLA address as text and the nav gains a Methods item.
