# Design System

An evolution of the site's existing identity — warm near-black ground, muted gold, serif
headlines, sans-serif text — executed with more restraint and consistency. The reference
points are an independent editorial publication and a research archive, not a product
landing page.

## Principles

1. **Content first, decoration never.** No gradient blobs, glows, glass, grain overlays, or
   ambient animation. Visual interest comes from type, proportion, rules, and real material
   (covers, figures, charts).
2. **Rules instead of cards.** Sections and lists are separated by hairlines, not rounded
   boxes. Panels are used only when content needs a frame (figures, calculator, citations).
3. **Vary the composition, keep the language.** The paper, the housing model, the books,
   and the case studies each get a layout that suits them, built from the same tokens and
   components.
4. **Say what a picture is.** Every figure carries a kind label: *Conceptual diagram*,
   *Model definition*, *Coded qualitative data*, *Illustrative arithmetic*, and so on.
5. **Work without JavaScript, then improve with it.**

## Colour

| Token | Value | Use |
|---|---|---|
| `--paper` | `#12110f` | Page background |
| `--paper-raised` | `#181613` | Alternating bands, figure and chart surface |
| `--surface` | `#1f1c18` | Active states, inset panels |
| `--paper-sunk` | `#0d0c0b` | Footer |
| `--ink` | `#ede7dc` | Headings, primary text |
| `--ink-soft` | `#b8ae9f` | Body text on dense pages, secondary text |
| `--ink-faint` | `#958b7d` | Metadata, captions (5.6:1 on `--paper`) |
| `--gold` | `#d4b07a` | Accent text, active markers, focus ring (9.2:1) |
| `--gold-strong` | `#e6c48f` | Hover |
| `--bronze` | `#8c7048` | Link underlines, warm rules |
| `--rule` / `--rule-strong` | ink at 11% / 24% | Hairlines |

All text tokens meet WCAG AA on every background token.

### Chart palette

Validated with the dataviz palette checker against `#181613` (dark mode): lightness band,
chroma floor, colour-vision-deficiency separation (ΔE ≥ 20), and contrast all pass.

| Token | Value | Role |
|---|---|---|
| `--viz-1` | `#ba8538` | Primary series (bronze) |
| `--viz-2` | `#4f88c6` | Second series or highlighted category (steel) |
| `--viz-grid` | ink at 10% | Gridlines (solid, never dashed) |

Single-series charts use `--viz-1` only. `--viz-2` either marks a second category (with a
legend) or highlights one bar whose significance the caption explains.

## Typography

- **Display and headings:** Fraunces (variable, optical size, weights 300–600, italic).
  Weight 400 by default — lighter than the previous 700, which read as heavy at size.
- **Text and interface:** Inter 400/500/600.
- **Numbers:** tabular figures only where numbers align in columns (tables, axes, dates).
  Stat figures use proportional sans, never the serif.

| Token | Size |
|---|---|
| `--text-display` | clamp(2.8rem → 6rem) — page titles, homepage name |
| `--text-2xl` | clamp(2.2rem → 3.6rem) — long titles, contact heading |
| `--text-xl` | clamp(1.7rem → 2.5rem) — section headings |
| `--text-lg` | clamp(1.3rem → 1.6rem) — sub-headings, ledger titles |
| `--text-md` | 1.1875rem — lede, dek |
| `--text-base` | 1.0625rem — body |
| `--text-sm` / `--text-xs` | 0.875 / 0.75rem — metadata, labels |

The uppercase tracked `.label` style is the only "eyebrow" treatment, used once per block.

## Space and layout

- Spacing scale `--space-1` … `--space-8` (0.25rem → 4.5rem); `--space-section` for
  vertical section rhythm.
- `.wrap`: max 75rem content width plus a fluid gutter (`--gutter`, 1rem → 2.75rem).
- `--measure`: 40rem for running text.
- **Journal grid:** on wide screens, section heads put a numbered label in an 11rem margin
  column beside the heading (`.section-head`).
- Long pages use a 12rem sticky contents column (`.toc`) from 70rem up.

## Components

| Component | Class | Notes |
|---|---|---|
| Page head | `.page-head`, `.meta` | Breadcrumb, kind label, title, dek, catalogue-style metadata |
| Section head | `.section-head`, `.section-no` | Numbered margin label |
| Ledger | `.ledger`, `.ledger__row` | Chronological rows: date column, title, body, optional aside |
| Work index | `.filter-bar`, `.work-list`, `.work-item` | Filter buttons use `aria-pressed` |
| Figure | `.figure`, `.figure__frame`, `.fig-no`, `.fig-kind` | Numbered caption with kind label |
| Explorer | `.explorer`, `.explorer__keys`, `.explorer__panel` | Buttons drive one visible panel; SVG nodes mirror the selection |
| View switch | `.segmented` | Alternate renderings of one diagram |
| Steps | `.steps`, `.steps--row` | Numbered process; vertical by default |
| Questions | `.questions` | Research questions with method notes |
| Citation | `.citation`, `.copy-button` | Gold rule, copy-to-clipboard |
| Publication entry | `.pub-entry` | Year column, optional cover |
| Stat figures | `.figures` | Used sparingly, always sourced |
| Charts | `.chart`, `.mark`, `.bar`, `.data-table` | Bars ≤ 24px with 4px rounded data end; values at tip |
| Note | `.note` | Disclosures, caveats, limits |
| Disclosure | `.disclosure` | `<details>` for supplementary material |
| Calculator | `.calc` | Static table fallback in `<noscript>` |

## Interaction

- Transitions are 180ms colour/border changes only; no entrance animations, no parallax.
- Focus: 2px gold outline, 3px offset, on every interactive element.
- `prefers-reduced-motion` disables smooth scrolling and transitions.
- Minimum touch target 2.5–2.75rem on buttons and filters.

## Writing conventions

- First person on the author's own pages; plain statements over adjectives.
- Every number states its scale and source. Modeled and conceptual material is labeled.
- Kinds of work are named consistently: *peer-reviewed paper*, *book*, *independent
  research*, *employment*, *organization*, *civic participation*, *membership*.
