"""Stamp the shared head assets, header and footer into every page.

The site is plain static HTML served by GitHub Pages, so there is no build
step at deploy time. Shared markup lives here once; this script rewrites the
regions between marker comments in each page:

    <!-- @head -->   ... <!-- /@head -->
    <!-- @header --> ... <!-- /@header -->
    <!-- @footer --> ... <!-- /@footer -->

Each page declares its navigation section on <body>:

    <body id="top" data-nav="work" data-progress>

    data-nav       work | experience | writing | about | home
    data-current   "page" when the page *is* the section index (adds
                   aria-current="page"); otherwise the link is marked as the
                   current section only.
    data-progress  present on long-form pages: adds the reading-progress bar.

Usage (from the repository root, Python 3.8+, no dependencies):

    py tools/partials.py          # rewrite pages in place
    py tools/partials.py --check  # exit 1 if any page is out of date
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP = {"ORIGINAL index.html", "google284b90888274c00d.html"}

HEAD = """<!-- @head -->
  <meta name="theme-color" content="#12110f">
  <link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&amp;family=Inter:wght@400;500;600&amp;display=swap">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <script>document.documentElement.classList.add("js");</script>
  <script src="assets/js/site.js" defer></script>
  <!-- /@head -->"""

NAV = [
    ("work", "work.html", "Work"),
    ("experience", "experience.html", "Experience"),
    ("writing", "publications.html", "Writing"),
    ("about", "profile.html", "About"),
]

FOOTER = """<!-- @footer -->
  <footer class="site-footer" id="contact">
    <div class="wrap">
      <div class="contact">
        <div>
          <p class="label">Contact</p>
          <h2>Write to me directly.</h2>
          <p>I am glad to hear about research collaborations, roles in data, product, or technology operations, and questions about anything on this site.</p>
          <div class="email-line">
            <a href="mailto:danghenglong@gmail.com">danghenglong@gmail.com</a>
            <button class="copy-button" type="button" data-copy="danghenglong@gmail.com" data-status="copy-status">Copy address</button>
            <span id="copy-status" class="copy-status" role="status"></span>
          </div>
        </div>
        <div>
          <p class="label">Elsewhere</p>
          <ul class="elsewhere">
            <li><a href="https://www.linkedin.com/in/henglongdang/" rel="noopener" data-external>LinkedIn</a></li>
            <li><a href="https://scholar.google.com/citations?user=D06-T50AAAAJ&amp;hl=en" rel="noopener" data-external>Google Scholar</a></li>
            <li><a href="https://orcid.org/0009-0002-5215-9534" rel="noopener" data-external>ORCID</a></li>
            <li><a href="https://medium.com/@henglongdang" rel="noopener" data-external>Medium</a></li>
            <li><a href="https://www.crunchbase.com/person/henglong-dang" rel="noopener" data-external>Crunchbase</a></li>
            <li><a href="https://www.f6s.com/henglongdang" rel="noopener" data-external>F6S</a></li>
          </ul>
        </div>
      </div>
      <div class="colophon">
        <p>&copy; 2026 Henglong Dang</p>
        <p>Set in Fraunces and Inter. A static site on GitHub Pages &middot; <a href="https://github.com/henglongdang/home" rel="noopener">source</a></p>
        <p><a href="#top">Back to top</a></p>
      </div>
    </div>
  </footer>
  <a class="to-top" href="#top" aria-label="Back to top"><span aria-hidden="true">&uarr;</span></a>
  <!-- /@footer -->"""


def header(nav: str, is_index: bool, progress: bool) -> str:
    items = []
    for key, href, label in NAV:
        attr = ""
        if key == nav:
            attr = ' aria-current="page"' if is_index else ' class="is-section"'
        items.append(f'          <li><a href="{href}"{attr}>{label}</a></li>')
    items.append('          <li><a href="#contact">Contact</a></li>')
    bar = '\n    <div class="progress" aria-hidden="true"></div>' if progress else ""
    return (
        "<!-- @header -->\n"
        '  <a class="skip-link" href="#main">Skip to content</a>\n'
        '  <header class="site-header">\n'
        '    <div class="wrap site-header__inner">\n'
        '      <a class="brand" href="index.html">Henglong Dang</a>\n'
        '      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">'
        '<span class="nav-toggle__bars" aria-hidden="true"></span>Menu</button>\n'
        '      <nav id="site-nav" class="site-nav" aria-label="Primary">\n'
        "        <ul>\n" + "\n".join(items) + "\n        </ul>\n"
        "      </nav>\n"
        f"    </div>{bar}\n"
        "  </header>\n"
        "  <!-- /@header -->"
    )


def region(name: str) -> re.Pattern:
    return re.compile(rf"<!-- @{name} -->.*?<!-- /@{name} -->", re.S)


def render(text: str) -> str:
    body = re.search(r"<body([^>]*)>", text)
    attrs = body.group(1) if body else ""
    nav_m = re.search(r'data-nav="([a-z]+)"', attrs)
    nav = nav_m.group(1) if nav_m else ""
    is_index = 'data-current="page"' in attrs
    progress = "data-progress" in attrs
    text = region("head").sub(lambda _: HEAD, text)
    text = region("header").sub(lambda _: header(nav, is_index, progress), text)
    text = region("footer").sub(lambda _: FOOTER, text)
    return text


def main() -> int:
    check = "--check" in sys.argv
    stale = []
    for page in sorted(ROOT.glob("*.html")):
        if page.name in SKIP:
            continue
        original = page.read_text(encoding="utf-8")
        if "<!-- @header -->" not in original:
            continue
        updated = render(original)
        if updated != original:
            stale.append(page.name)
            if not check:
                page.write_text(updated, encoding="utf-8", newline="\n")
    if check:
        if stale:
            print("Out of date:", ", ".join(stale))
            return 1
        print("All pages up to date.")
        return 0
    print("Updated:", ", ".join(stale) if stale else "nothing to change")
    return 0


if __name__ == "__main__":
    sys.exit(main())
