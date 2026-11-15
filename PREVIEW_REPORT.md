# Preview Report — portfolio redesign

**Status:** ready for your review. Nothing has been published. Production (`main`, commit
`74f0205`) is untouched and the live site is unchanged.

- **Branch:** `portfolio-redesign`
- **Local preview:** <http://localhost:8000/home/> (served from the parent folder so the
  `/home/` path matches GitHub Pages; see "Running the preview" below)
- **Screenshots:** `docs/preview/` — desktop (1440px) and mobile (390px) for all 14 pages.
  Kept out of Git on purpose (8 MB, and the folder would otherwise be publicly served).

## Pages

| Page | Status | What changed |
|---|---|---|
| `index.html` | Redesigned | Hero with portrait, "currently" strip, profile snapshot with quick facts, two differentiated feature layouts plus a pair, role timeline and ledger, publication shelf, background |
| `work.html` | New | Filterable index of nine entries; shareable `?type=` URLs |
| `experience.html` | New | Interactive role timeline, detailed roles, affiliations |
| `publications.html` | New | Paper with copyable citation, books, research report, ten dated essays |
| `profile.html` | Rewritten | First-person bio, four work threads, "how I work", education, links |
| `research-finance.html` | Rebuilt | Publication layout; abstract verbatim; research questions; two interactive figures; findings table; BibTeX |
| `Bellevue-Housing.html` | Rebuilt | Friction-model explorer, seller's path, model weights, REET calculator, two evidence charts, method, findings, limits |
| `research-echoes.html` | Rebuilt | Cover and metadata; four-movement concept map; full description |
| `research-outsourcing.html` | Rebuilt | Cover and metadata; assistance-to-authority diagram; questions; writing-process disclosure |
| `synaperge.html` | Rebuilt | Timeline from Synaperge's published history; member pathway; programs; projects; role |
| `experience-dfdraw.html` | Rebuilt | Case study; operating-loop explorer; US–China office-hours chart |
| `FTTC.html` | Rebuilt | Layer model and diagnostic workflow explorers |
| `leadership-bellevue.html` | Rebuilt | District framework diagram; process; contribution |
| `aaai.html` | Rewritten | Presented as a membership |
| `404.html` | New | Works at any depth under `/home/` |

All original URLs are preserved.

## Major design changes

- Kept the identity (warm near-black, gold, Fraunces + Inter) and removed the effects that
  read as template or AI-generated: drifting blurred orbs, mouse parallax, grain overlay,
  radial gradients, pill tags, rounded cards, scroll-reveal animation.
- Editorial structure: hairline rules, numbered margin labels on section heads, catalogue
  style metadata, numbered figures with a stated *kind* on every caption.
- Different compositions for different content: publication page, research exhibit, book
  page with cover, case studies, ledger timelines.
- One design system replacing three conflicting style layers per page.

## Interactive functionality

| Feature | Where |
|---|---|
| Mobile menu (Escape closes it) | All pages |
| Reading progress bar, sticky contents with active section | Long pages |
| Back to top | All pages |
| Copy email; copy citation | Footer; HCII page; publications |
| Work filter with counts and live status | `work.html` |
| Explorer diagrams (buttons, arrow keys, or click the diagram) | 9 figures across 7 pages |
| View toggles | HCII problem diagram; DFDraw time zones |
| REET calculator (number input and slider) | Housing page |
| Chart tooltips on hover and keyboard focus | Charts and timelines |
| Expandable abstract, BibTeX, data tables | Research pages |

## Visualizations

| Figure | Page | Kind | Data source |
|---|---|---|---|
| Role timeline 2023–2026 | Home, Experience | Data (dates) | Dates on record; see audit for conflicts |
| Separate tools vs. one platform | HCII | Conceptual | — |
| Eight-stage method | HCII | Process | Published abstract; 8-app review from your notes |
| Business-model map | HCII | Product concept (original image) | FamilyPulse case study |
| Friction model, six channels | Housing | Conceptual framework | Housing exhibit |
| Seller's path | Housing | Hypothetical sequence | Interview/fieldwork themes |
| Friction Score weights | Housing | Model definition | Exhibit formula |
| Interview concern scores (n = 7) | Housing, Home | Coded qualitative data | Exhibit participation study |
| Open-house topic mentions (101) | Housing | Field observation | Exhibit fieldwork study |
| REET calculator | Housing | Arithmetic | State brackets as used in exhibit |
| Organizational timeline | Synaperge | Data (dates) | Synaperge "Our Story" and events |
| Member pathway | Synaperge | Conceptual | Documented programs |
| Operating loop | DFDraw | Conceptual | Role description |
| Office-hours overlap | DFDraw | Illustrative arithmetic | UTC offsets |
| Support layers; diagnostic workflow | UCLA Anderson | Conceptual; process | Role description |
| Plan framework | BSD | The district's framework | District strategic plan |
| Concept map | *Echoes* | Conceptual map | Book description |
| Assistance to authority | HCSRI | Conceptual | Book description |

Chart palette validated for colour-vision deficiency and contrast; every chart has a data
table or direct value labels, and no figure introduces a number absent from the sources.

## Testing performed

| Test | Method | Result |
|---|---|---|
| Layout at 1440, 1280, 1024, 768, 390, 360px | Headless Chrome via DevTools protocol, all 15 pages × 6 widths (90 runs) | **Pass** after fix. First run found horizontal overflow on three pages at 360/390px (grid tracks sized to wide SVGs); fixed and re-tested |
| Images load | Same sweep, eager-loading all images | Pass — no broken images |
| Heading hierarchy, single `<h1>` | Same sweep | Pass |
| Duplicate IDs, unlabeled controls | Same sweep | Pass |
| Console errors | Same sweep | Pass (none) |
| Internal links | All `href`s collected in the sweep resolve locally | Pass |
| External links (60) | `curl` with browser user agent | Pass except: LinkedIn (999) and Crunchbase (403) block automated requests — open fine in a browser; three new pages 404 on production until published (expected). Fixed one link that was already broken in production (BSD annual plan) |
| Explorers, views, filter, calculator, menu | Scripted clicks, arrow keys, input events | Pass — calculator output matches hand-computed values ($41,638 at $2M; $15,075 at $900k) |
| Filter deep link | `work.html?type=leadership` | Pass |
| Keyboard navigation and focus | Real Tab key events | Pass — skip link first, logical order, 2px gold focus ring on every stop |
| No-JavaScript fallback | Scripts disabled | Pass — nav visible, all panels readable, JS-only controls hidden |
| Reduced motion | CSS review | Smooth scroll and transitions disabled under `prefers-reduced-motion` |
| Contrast | Token calculation | Body 7.8:1+, metadata 5.6:1, gold 9.2:1 on the page background |
| Shared markup in sync | `py tools/partials.py --check` | Pass |
| Placeholders, inline styles, `!important` | grep | No `yourdomain.com`; 0 inline styles; 4 justified `!important` (utility, reduced motion, print) |

## Navigation and functionality checklist

- [x] Every page reachable from primary navigation or the page it belongs to
- [x] Every nav item points to the correct page; current section underlined
- [x] Breadcrumbs on every detail page
- [x] Previous/next links on detail pages
- [x] All images load (portrait, two covers, two FamilyPulse figures, logo, favicon)
- [x] All interactive figures respond to mouse, touch, and keyboard
- [x] Filter, calculator, copy buttons, menu, back-to-top work
- [x] Old anchors `index.html#about` and `#research` still resolve
- [x] No horizontal scrolling at any tested width (figures scroll inside their own frames)
- [x] Footer contact on every page

## Content that needs your verification

These are listed in detail in `docs/CONTENT_AUDIT.md` §3–4.

1. **DFDraw title and start date** — used "Strategic Operations Lead", "2024". The old profile
   said "Director of Organizational Strategy"; the DFDraw page said "Apr 2025".
2. **Synaperge membership and dates** — used "over 60 active members by early 2025"
   (Synaperge's own history) rather than 56; end date Sep 2026.
3. **Publishing your email** (`danghenglong@gmail.com`) in the footer of every page. It was
   not on the live site before. One line in `tools/partials.py` removes it everywhere.
4. **UCLA degree status/year** — shown without a year.
5. **"Eight existing apps"** in the HCII method (from your old résumé, not the abstract).
6. **"$20 million budget deficit"** context on the BSD page (from your old résumé).
7. **REET brackets** — the calculator uses the 2023 Washington thresholds from your exhibit,
   with a caveat. Confirm they are still current.
8. **Newly written prose in your voice** — the profile ("In brief", "Running things"), the
   DFDraw operating-loop descriptions, and the UCLA Anderson workflow descriptions describe
   your work in general terms I wrote. Please read them for accuracy and tone.
9. **Synaperge course** — whether the youth AI ethics course you planned is the same as the
   Canvas course *Introduction to Artificial Intelligence and Innovative Reasoning*. The page
   presents them separately.

## Known issues and limitations

- Three new pages (`work`, `experience`, `publications`) will 404 on the live site until
  publication; their canonical URLs are already correct.
- `robots.txt` cannot take effect for a project site (crawlers only read the domain root);
  submit `sitemap.xml` in Google Search Console after publishing.
- `ORIGINAL index.html` still contains an injected school web-filter script from when it was
  saved. It is now `noindex`; I recommend deleting the file.
- Essay list is the ten most recent from Medium's feed at build time; it does not update
  automatically.
- Fonts load from Google Fonts; if blocked, system serif/sans fallbacks are used.
- The UCLA Anderson logo is shown on a light plate; confirm you are comfortable displaying
  the institution's logo.

## Running the preview

The preview server is running now. To restart it later:

```powershell
cd C:\Users\dangh\OneDrive\Documents\GitHub
py -m http.server 8000 --bind 127.0.0.1
```

Then open <http://localhost:8000/home/>.

## Publishing (only after your explicit approval)

Not done. When you approve, the steps will be: confirm `main` is still the Pages source,
review the diff against `74f0205`, merge `portfolio-redesign` into `main`, push, and verify
the live site. Rollback is a single revert of the merge commit.
