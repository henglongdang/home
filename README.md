# henglongdang.github.io/home

Personal portfolio of Henglong Dang: research, writing, and operations work.
Live at **<https://henglongdang.github.io/home/>**.

A static site — plain HTML, CSS, and a little vanilla JavaScript — published by GitHub
Pages from the root of `main`. No framework, no build step, no backend.

## Preview locally

Serve the folder *above* this repository so the path matches production (`/home/`):

```powershell
cd ..
py -m http.server 8000 --bind 127.0.0.1
```

Then open <http://localhost:8000/home/>.

## Editing

- Page content lives in the `.html` files at the root.
- Shared header, footer, and head assets live in `tools/partials.py`. After changing them,
  run `py tools/partials.py`.
- Styles: `assets/css/main.css` (tokens, base, layout) and `assets/css/components.css`.

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — structure, paths, scripts, deployment
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — colour, type, components, conventions
- [docs/CONTENT_AUDIT.md](docs/CONTENT_AUDIT.md) — content review and open questions
- [docs/DEVLOG.md](docs/DEVLOG.md) — development log
- [CHANGELOG.md](CHANGELOG.md)
