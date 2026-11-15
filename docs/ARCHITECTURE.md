# Architecture

A static, framework-free portfolio deployed by GitHub Pages from the root of the
production branch. No build step is needed to deploy: every page is complete,
committed HTML.

## Hosting and paths

- **Production URL:** `https://henglongdang.github.io/home/` — a *project* site, so the
  site lives under `/home/`, not at the domain root.
- **Publishing source:** GitHub Pages "deploy from branch", `main`, `/` (root). There is no
  `.github/workflows` directory and no custom domain (`CNAME`).
- **Relative links everywhere.** Pages link to `work.html`, `assets/css/main.css`, and so on,
  never `/work.html`. That makes the same files work at `/home/` in production and at any
  local path. The one exception is `404.html` (see below).
- **Case sensitivity.** GitHub Pages is case-sensitive. Existing mixed-case URLs
  (`Bellevue-Housing.html`, `FTTC.html`) are kept exactly to avoid breaking inbound links.

## Files

```text
home/
├── index.html                 Homepage
├── work.html                  Filterable index of all work
├── experience.html            Timeline + roles + affiliations
├── publications.html          Paper, books, report, essays
├── profile.html               About (kept URL)
├── research-finance.html      HCII 2025 paper
├── Bellevue-Housing.html      Housing Friction Index
├── research-echoes.html       Book: Echoes in the Machine
├── research-outsourcing.html  Book: Human-Centered ... Innovation
├── synaperge.html             Organization: Synaperge
├── experience-dfdraw.html     Employment: DFDraw Lab
├── FTTC.html                  Employment: UCLA Anderson
├── leadership-bellevue.html   Civic: BSD Strategic Plan Coalition
├── aaai.html                  Membership: AAAI
├── 404.html                   Not-found page (absolute /home/ paths)
├── ORIGINAL index.html        Legacy backup, noindex (candidate for deletion)
├── google284b90888274c00d.html  Search Console verification — do not remove
├── sitemap.xml, robots.txt
├── assets/
│   ├── css/main.css           Tokens, base type, layout, header/nav, footer, buttons, a11y
│   ├── css/components.css     Reusable components and page compositions
│   ├── js/site.js             Progressive enhancement for every page
│   ├── js/reet.js             Calculator on Bellevue-Housing.html only
│   └── images/                Portrait, book covers, project figures, logos, OG image
├── tools/partials.py          Stamps shared head/header/footer into pages
└── docs/                      Audit, architecture, design system, dev log, legacy notes
```

## Shared markup: `tools/partials.py`

Header, footer, and the shared `<head>` assets are defined once in
`tools/partials.py` and written into each page between marker comments:

```html
<!-- @head -->   ... <!-- /@head -->
<!-- @header --> ... <!-- /@header -->
<!-- @footer --> ... <!-- /@footer -->
```

The `<body>` tag tells the script which nav item is current:

```html
<body id="top" data-nav="work" data-current="page" data-progress>
```

| Attribute | Effect |
|---|---|
| `data-nav` | `work`, `experience`, `writing`, `about`, or `home` |
| `data-current="page"` | The page *is* that section's index: link gets `aria-current="page"`. Otherwise it gets `.is-section`. |
| `data-progress` | Adds the reading-progress bar (long pages). |

After editing a shared region, run `py tools/partials.py` (Python 3.8+, no dependencies).
`py tools/partials.py --check` exits non-zero if any page is stale. Pages are ordinary HTML
and can still be edited by hand; only the marked regions are overwritten.

## JavaScript: progressive enhancement

Every page is fully readable with JavaScript disabled. `site.js` adds behaviour:

| Module | Hooks | Without JS |
|---|---|---|
| Mobile nav | `.nav-toggle`, `#site-nav`; sets `html.nav-ready` | Nav links wrap under the name |
| Reading progress, back-to-top | `.progress`, `.to-top` | Hidden |
| Copy | `[data-copy]`, `[data-copy-target]` | Buttons hidden; text selectable |
| Contents scrollspy | `.toc a[href^="#"]` | Plain anchor list |
| Explorer | `[data-explorer]` with `.explorer__keys button[data-key]`, SVG `[data-key]`, `[data-panel]`; optional `data-dim` + `[data-for]` | All panels visible as a list |
| Views | `[data-views]` with `[data-view-btn]` and `[data-view]` | Default view shown; alternate described in text |
| Filter | `[data-filter]` with `[data-filter-value]` and `[data-tags]`; reads/writes `?type=` | Full list |
| Chart tooltips | `.chart-wrap .mark[data-tip]` | Values in labels and data tables |

`html.js` is set by a one-line inline script in `<head>` so that JS-only controls do not
flash before `site.js` loads. The mobile menu collapses only once `site.js` has set
`html.nav-ready`, so a failed script load cannot hide the navigation.

## Charts and diagrams

All charts and diagrams are hand-authored inline SVG — no charting library. Bar charts on
the housing page were generated from the documented values with a small script (kept out of
the repository; the values are visible in each chart's data table). Each chart has a title,
a figure caption stating its kind (conceptual, model definition, coded data, illustrative
arithmetic), and either direct value labels or a data table.

## SEO and metadata

- Canonical and Open Graph URLs use `https://henglongdang.github.io/home/...`.
- `assets/images/og-default.png` (1200×630) is the default social image; book pages use
  their covers.
- JSON-LD: `Person` (homepage), `ProfilePage` (about), `ScholarlyArticle` (HCII paper),
  `Book` (both books). No placeholder values.
- `robots.txt` under `/home/` is not read by crawlers (they request only the domain-root
  `/robots.txt`). Submit `sitemap.xml` through Google Search Console instead.

## `404.html`

GitHub Pages serves `404.html` for any missing path under the project, at any depth, so
relative paths would break. This one page uses absolute `/home/...` paths and is not
processed by `tools/partials.py`.

## Local preview

The site must be served from the *parent* folder so the URL path matches production:

```powershell
cd ..                       # the folder that contains home/
py -m http.server 8000 --bind 127.0.0.1
# open http://localhost:8000/home/
```

## Deployment

Merge the reviewed branch into `main` and push; GitHub Pages rebuilds automatically.
To roll back, revert the merge commit on `main` (the pre-redesign state is commit
`74f0205`).
