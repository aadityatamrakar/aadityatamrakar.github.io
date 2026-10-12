# aadityatamrakar.github.io

Personal portfolio of Aaditya Tamrakar: full stack engineer, machine learning and algorithmic trading projects, with every public repo since 2016 on an interactive timeline.

Live: https://aadityatamrakar.in (Cloudflare Pages, deploys from master)

## Stack

Plain HTML, CSS and JavaScript. No framework. Deployed by Cloudflare Pages from the `master` branch (build command: none, output directory: `/`). `_headers` and `_redirects` configure caching and the www redirect.

- `index.html` – page structure
- `assets/style.css` – design tokens and layout (two fonts: IBM Plex Mono for code, Rubik for prose)
- `assets/data.js` – all content: profile, journey, skills, projects, forks
- `assets/app.js` – rendering, filters, timeline, search, modal, live GitHub stats

## Build step (minify)

Pages load `assets/*.min.css` and `assets/*.min.js`. After editing any CSS/JS source run:

```sh
pip install rcssmin rjsmin
python3 scripts/build.py
```

SEO check: `python3 scripts/check-seo.py`

## Editing content

Everything shown on the page comes from `assets/data.js`. Add a project object there and it appears in the grid, the timeline and the category counts automatically. Star and fork counts refresh from the GitHub API on page load.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## License

MIT, see [LICENSE.md](LICENSE.md).
