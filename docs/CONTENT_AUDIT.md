# Content Audit

Audit of the portfolio as it stood on `main` at commit `74f0205` (2026-11-15), before the
`portfolio-redesign` work. Every page was read in full. External source material that the
existing pages link to was also reviewed so that new content could be grounded in documented
facts rather than invented.

## 1. Sources consulted

| Source | What it established |
|---|---|
| All HTML pages in the repository | Existing claims, wording, links, styling |
| `ORIGINAL index.html`, `111` (earlier drafts) | Earlier résumé-style figures (seminar count, project counts, coursework, budget context) |
| ORCID record `0009-0002-5215-9534` (public API) | Canonical titles and years: *Echoes in the Machine: Relevance Gravity of Generative AI* (2025); *Human-Centered, Sustainable, and Socially-Responsible Innovation* (2026); HCII chapter (2026) |
| Crossref record for DOI `10.1007/978-3-032-13164-5_2` | Authors Henglong Dang and Fang Ding; LNCS / *HCI International 2025 – Late Breaking Papers*; pp. 22–40; Springer Nature Switzerland; print ISBN 978-3-032-13163-8, eBook ISBN 978-3-032-13164-5 |
| `henglongdang.github.io/Bellevue-Housing/` (main, investigation, participation, fieldwork, data-lab, about) | Research questions, five-phase method, Jan–Jun 2026 timeline, 7 interviews with coded concern scores, 101 coded open-house topic mentions, Friction Score formula, explicit limits (modeled correlations, no control ZIP yet) |
| Synaperge website (home, about, courses, events) | Founding Aug 2023; first seminar Oct 2023 ("Innovation Across Borders"); Problem Lab Feb 2024; website Apr 2024; in-person retreat summer 2024 (35 members); 60+ active members by early 2025; logo summer 2025; dated events (Dec 2024, Feb 2025, Aug 2025); free Canvas course "Introduction to Artificial Intelligence and Innovative Reasoning"; stated partnership with DFDraw Lab |
| DFDraw Lab website | Independent brand and visual design studio serving US and China markets; published projects include FamilyPulse, CUHK Medical Center, Migu, ProStream |
| FamilyPulse case-study images (DFDraw Lab CDN) | Original research questions and business-model map for the HCII project |
| Medium RSS feed | Ten essays published April–September 2026, most in the *Design Bootcamp* publication |

## 2. Page-by-page findings

### `index.html` (homepage)
- **Content:** hero, philosophy, five project cards, four experience entries, writing, background, contact.
- **Problems**
  - Generic hero label ("Systems Thinker · Innovator · Strategic Futurist") and slogan-style headline.
  - Decorative effects the brief rules out: blurred floating orbs (`.ambient`) animated forever, mouse-parallax listener, grain overlay, radial-gradient background.
  - Book subtitles contradict the book pages and ORCID (see §3).
  - *Echoes* card mentions "information warfare", which is not in the book. ("Synthetic consensus" *is* one of the book's glossary concepts, introduced in Chapter 4 — confirmed from the manuscript in revision 2.)
  - AAAI membership presented inside "Research & publications" as if it were a research output.
  - Invented-sounding pull quote ("The best interface is legible, deliberate, and ethically intelligible.") with no source.
  - No email or direct contact; only LinkedIn.
  - Inline `style=""` attributes on links; heading levels skip; `.last-updated` text is near-invisible (#1b1916 on #11100f).
- **Decision:** rebuild around a clear hero, quick facts, differentiated selected-work layouts, a chronological experience ledger with a timeline chart, a publication shelf, compact background, and real contact links.

### `profile.html`
- **Content:** long third-person bio, profile links.
- **Problems**
  - Third-person, buzzword-heavy ("system-minded leader", "meticulously aligned", "practical philosopher of technology").
  - States the DFDraw title as "Director of Organizational Strategy", which conflicts with every other page.
  - States Synaperge has "more than 60 members"; other pages say 56.
  - Portrait embedded as a ~75 KB base64 string; unstyled light theme overridden by a second "technical dark" theme overridden by the shared stylesheet with `!important`.
- **Decision:** rewrite in first person with concrete detail; add how-I-work section, education, certifications, languages, and a profile-link list.

### `research-finance.html` (HCII 2025)
- **Content:** abstract, feature list, role, five externally hosted images, citation.
- **Problems**
  - "My Role" paragraph is duplicated almost verbatim.
  - "View detailed report" (`dfdrawlab.com/ux/ux-familypulse`) returns **HTTP 403 / S3 AccessDenied** — broken.
  - Feature list claims "measured improvement… reduced management friction" — the abstract reports satisfaction scores, not a measured reduction in friction.
  - Abstract gives N = 342 survey and N = 35 interviews; the older résumé (`ORIGINAL index.html`) says "24 usability interviews". These may describe different study phases — **unresolved**.
  - Older résumé says the comparative analysis covered eight existing apps. The camera-ready paper reports a heuristic evaluation of four (Mint, PocketSmith, Spendee, YNAB); the paper is used.
  - All images hot-linked to a third-party CDN; a 3 MB GIF loads on the page.
- **Decision:** publication-style page; keep abstract verbatim; add research questions (transcribed from the original project slide), methodology process diagram, fragmented-vs-integrated interactive diagram (labeled conceptual), reported-figures table that keeps the two satisfaction measures on their own scales, full citation with copy button. Images stored locally.

### `Bellevue-Housing.html`
- **Content:** hero metrics, overview, motivating question, "pressure stack", full abstract, participation, findings.
- **Problems**
  - The "pressure stack" bars (74, 61, 42, 31, 21) are **modeled index values** from the external exhibit, shown here with no label, units, or caveat — a reader would take them as measurements. Removed.
  - Excessive `!important` overrides to undo the shared stylesheet; section kickers describe the layout ("Cards separate each contribution…") rather than the content.
- **Decision:** systems-framework page with an interactive friction model, the documented Friction Score weighting (shown as model definition), a REET arithmetic calculator, the two documented evidence charts (interview concern scores, open-house topic mentions) with caveats, method phases, timeline, findings, and limits.

### `research-echoes.html`
- **Content:** cover (hot-linked from Amazon), long synopsis in a `white-space: pre-line` block.
- **Problems:** no publication metadata (year, pages, ISBN) on the page; synopsis is one wall of text.
- **Decision:** cover-and-metadata layout; the synopsis's four movements become an interactive concept map whose definitions are taken from the synopsis itself.

### `research-outsourcing.html`
- **Content:** cover, four central questions, "living proof of concept" note, audience.
- **Problems:** no metadata on page; marketing copy ("In a stunning meta-cognitive twist"); title pill reads "Book 2: Human-Centered".
- **Decision:** cover-and-metadata layout; central questions; a conceptual "assistance → authority" diagram built only from the book description's own terms; the human–AI writing-process disclosure kept, stated plainly.

### `experience-dfdraw.html`
- **Content:** studio description, role bullets, three project cards using `image.thum.io` live screenshots.
- **Problems**
  - Start date "Apr 2025" conflicts with homepage and earlier résumé ("2024").
  - Screenshot service is an unreliable third-party dependency and shows the studio's pages, not the author's work.
  - Generic phrasing ("enforce operational discipline", "ensuring consistent mission execution").
- **Decision:** case study with studio context, responsibilities, an operating-loop diagram, a US–China working-hours overlap chart (arithmetic, labeled illustrative), and documented outcomes only.

### `synaperge.html`
- **Content:** mission statement, five role bullets.
- **Problems:** "56-member" vs profile's "more than 60"; end date "Present" vs homepage "09/2026"; the AI Ethics course, seminars, and projects are not described concretely.
- **Decision:** organization history timeline built from Synaperge's published history; discussion-to-project pathway diagram; programs; incubated projects; role.

### `FTTC.html` (UCLA Anderson)
- **Content:** role, four capability cards, an SVG with a cyan/yellow gradient palette foreign to the site.
- **Decision:** keep the accurate role description; replace the diagram with an interactive diagnostic workflow and a layered "where problems live" model; no confidential or institution-specific procedures.

### `leadership-bellevue.html`
- **Content:** coalition role, district plan pillars, process, annual plan links.
- **Problems:** missing `<main>` landmark; earlier résumé details (student voice, qualitative measures, budget context) not carried over.
- **Decision:** civic-participation page that clearly separates the district's plan from the author's contribution as one coalition representative.

### `aaai.html`
- **Content:** membership note; claims "My books under Synaperge" are developed through AAAI scholarship.
- **Problems:** listed as research on the homepage; the books are self-published, not "under Synaperge"; back link points to a non-existent `#activities` anchor.
- **Decision:** a short, accurate membership page placed under Experience → Affiliations, not Research.

### Repository-level
- `sitemap.xml`, `robots.txt`, `public/*`, and every canonical / `og:` tag use the placeholder `https://yourdomain.com`.
- `sitemap.xml` lists `ORIGINAL index.html` (a backup with a space in its name).
- `public/og-image.svg` describes the author as "Frontend Engineer" — inaccurate; SVG is also not accepted by most social previews.
- Three stacked style layers per subpage (original light theme → "technical dark" override → `unified-subpage-theme.css` with ~60 `!important`).
- `5.19.2026 Portfolio Architecture.txt` describes a "Safety/Filtering Module" and other code that does not exist in the repository; superseded by `docs/ARCHITECTURE.md`.
- `robots.txt` placed under `/home/` is not read by crawlers (they only request `/robots.txt` at the domain root); the sitemap must be submitted through Search Console instead.

## 3. Conflicts and how they were resolved

| Topic | Conflicting statements | Used on redesigned site | Basis |
|---|---|---|---|
| *Echoes* subtitle | "Relevance Gravity of Generative AI" (book page, cover, ORCID) vs "Information Warfare and Reality Collapse in the Post-Truth Age" (homepage) | **Relevance Gravity of Generative AI** | Cover image and ORCID |
| HCSRI subtitle | "Agency, Judgment, and Design Choices in Algorithmic Systems" (book page, cover) vs "Strategic Leadership in the Age of AI and Global Outsourcing" (homepage) | **Agency, Judgment, and Design Choices in Algorithmic Systems** | Cover image and Amazon listing |
| HCSRI year | "2025 — 2026" (old résumé) | **2026** | ORCID |
| DFDraw title | "Strategic Operations Lead" (homepage, DFDraw page, résumé) vs "Director of Organizational Strategy" (profile) | **Strategic Operations Lead** | Majority of sources — **please verify** |
| DFDraw start | "2024" (homepage, résumé) vs "Apr 2025" (DFDraw page) | **2024** | Most recent homepage edit — **please verify** |
| Synaperge members | 56 (homepage, Synaperge page, résumé) vs 60+ (profile, Synaperge "Our Story") | **"over 60 active members by early 2025", attributed to Synaperge's published history** | Organization's own record — **please verify which figure you prefer** |
| Synaperge end date | "09/2026" (homepage) vs "Present" (Synaperge page) | **Aug 2023 – Sep 2026** | Most recent homepage edit — **please verify** |
| HCII interviews | N = 35 (published abstract) vs 24 usability interviews (old résumé) | **N = 35 interviews, N = 342 survey** from the abstract; résumé figure not used | Published abstract — **please verify whether 24 refers to usability-testing sessions** |

## 4. Open questions for the author

1. UCLA degree status and expected/actual graduation year (the site shows the degree without a year).
2. The DFDraw title and start date (see table).
3. ~~Personal email on the site~~ — resolved in revision 2: the site shows `hldang[at]ucla[dot]edu` only, with no `mailto:` link; the copy button assembles the address in JavaScript. The personal email and a phone number were also redacted from the legacy backup and draft files.
4. ~~"Eight existing apps"~~ — resolved: replaced with the paper's four-app heuristic evaluation.
5. ~~"$20M district budget deficit"~~ — resolved: removed. The page now cites the approved 2025–26 annual plan (fund balance target from −$5M to at least −$3M; "budget constraints and staffing reductions").
6. Whether the Synaperge seminar count (7, old résumé) is still current.
7. Whether `ORIGINAL index.html` should be deleted. It is kept, marked `noindex`, and removed from the sitemap. Its `<head>` contains an injected school web-filter script ("LS Filter", which posts to a non-existent `/…/log_flag` path) captured when the page was saved — another reason to delete it.
8. Whether the youth AI ethics course you planned is the Canvas course *Introduction to Artificial Intelligence and Innovative Reasoning*; the redesign presents them separately.
9. The REET calculator uses the Washington state brackets from your exhibit (in effect from January 2023). Confirm they are current.
10. New prose written in your voice — profile sections, DFDraw operating-loop descriptions, UCLA Anderson workflow descriptions — describes your work in general terms and should be checked for accuracy and tone.
11. The "seven seminars" figure (old résumé) is used on the Synaperge page.

## 5. Revision 2 (author feedback and primary sources)

Author requests: list UCLA as the only school; show only `hldang[at]ucla[dot]edu`; restore the previous
name typography; list languages without proficiency labels; drop the "Published" and "Operations" quick facts;
emphasize statistics, data science, and business analytics.

New primary sources (read locally, not added to the repository):

| Source | Used for |
|---|---|
| HCII camera-ready paper (PDF) and conference slides | Survey design (28 items, 331 complete), demographics, ANOVA, Pearson r, EFA, feature ratings, heuristic review, formative testing, 16-person evaluation (SUS, completion, time, errors), limitations; wireframe, high-fidelity, and user-flow figures |
| BSD coalition slides, notes, goals-and-measures drafts, 2025–26 annual plan, coalition web page | Coalition charge, formation, composition (41), meeting timeline, root causes, measurement blend, focus goals; final targets taken from the *published* plan, not the drafts |
| *Echoes* manuscript, outline, back-cover blurb | Table of contents with page numbers, preface quotation, 32-concept glossary with formal definitions, 62-source bibliography |

Corrections made from these sources:

- The HCII "84.2" is a System Usability Scale score (n = 16); "2.7/5" is a survey Likert mean (SD 1.1).
- BSD role described as "coalition member" (October 2024 – May 2025), matching the district roster; the plan
  period is 2024–2030 in the published version.
- UCLA described in the present tense ("I study…"), with no graduation year.

Remaining for the author to confirm: the HCII "My role" sentence that you led the data analysis (the paper lists two
authors without a contribution statement), and the profile's "Business analytics" description.

## 6. Content principles applied

- **Separation of kinds of work.** Peer-reviewed research, books, independent research, employment, organizational leadership, civic participation, and memberships are labeled as such everywhere.
- **Measured vs conceptual.** Every diagram states whether it is conceptual, a model definition, illustrative arithmetic, or documented data. Charts show only figures that appear in a cited source, with n, units, and source.
- **No new numbers.** No metrics, percentages, or outcomes were introduced that are not present in the repository or the linked primary sources.
- **Original wording preserved where accurate.** The HCII abstract and the Housing Friction abstract are reproduced verbatim; book descriptions are condensed, not re-interpreted.
