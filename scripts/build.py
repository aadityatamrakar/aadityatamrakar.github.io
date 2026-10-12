#!/usr/bin/env python3
"""Minify CSS/JS into assets/*.min.* . Run after editing any asset: python3 scripts/build.py"""
import pathlib, sys
try:
    import rcssmin, rjsmin
except ImportError:
    sys.exit("pip install rcssmin rjsmin")
root = pathlib.Path(__file__).resolve().parent.parent / "assets"
for src in ["style.css", "blog.css"]:
    out = root / src.replace(".css", ".min.css")
    out.write_text(rcssmin.cssmin((root / src).read_text()))
    print(f"{src} -> {out.name} ({out.stat().st_size} B)")
for src in ["data.js", "app.js", "blog.js"]:
    out = root / src.replace(".js", ".min.js")
    out.write_text(rjsmin.jsmin((root / src).read_text()))
    print(f"{src} -> {out.name} ({out.stat().st_size} B)")

# Inline the minified stylesheet into index.html so the home page needs no CSS round trip.
index = root.parent / "index.html"
html = index.read_text()
start, end = "<!-- critical:start -->", "<!-- critical:end -->"
a, b = html.index(start) + len(start), html.index(end)
css = (root / "style.min.css").read_text()
html = html[:a] + "<style>" + css + "</style>" + html[b:]
index.write_text(html)
print(f"index.html <- inlined style.min.css ({len(css)} B)")
