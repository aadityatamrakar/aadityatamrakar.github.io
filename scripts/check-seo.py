#!/usr/bin/env python3
"""SEO checker for the static site.

For every .html page under the repo (except docs/) it asserts that the head
carries a title, meta description, canonical link, og:title, og:image,
twitter:card and a JSON-LD script. It then parses sitemap.xml and feed.xml and
checks that every URL maps to an existing file (/blog/<slug>/ ->
blog/<slug>/index.html). Prints PASS/FAIL per page and exits non-zero on any
failure.

Usage: python3 scripts/check-seo.py [repo-root]
"""
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), ".."))
BASE = "https://aadityatamrakar.github.io"
SKIP_DIRS = {"docs", ".git", "node_modules"}

HEAD_CHECKS = [
    ("title", re.compile(r"<title>\s*([^<]+?)\s*</title>", re.I)),
    ("description", re.compile(r'<meta\s+name="description"\s+content="([^"]*)"', re.I)),
    ("canonical", re.compile(r'<link\s+rel="canonical"\s+href="(https?://[^"]+)"', re.I)),
    ("og:title", re.compile(r'<meta\s+property="og:title"\s+content="([^"]*)"', re.I)),
    ("og:image", re.compile(r'<meta\s+property="og:image"\s+content="(https?://[^"]+)"', re.I)),
    ("twitter:card", re.compile(r'<meta\s+name="twitter:card"\s+content="([^"]*)"', re.I)),
]
JSONLD_RE = re.compile(r'<script\s+type="application/ld\+json"\s*>(.*?)</script>', re.I | re.S)


def html_pages():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        rel = os.path.relpath(dirpath, ROOT)
        top = rel.split(os.sep)[0]
        if top in SKIP_DIRS:
            dirnames[:] = []
            continue
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for f in sorted(filenames):
            if f.endswith(".html"):
                yield os.path.relpath(os.path.join(dirpath, f), ROOT)


def check_page(rel):
    problems = []
    with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
        html = fh.read()
    head_end = html.lower().find("</head>")
    head = html[:head_end] if head_end != -1 else html
    for name, rx in HEAD_CHECKS:
        m = rx.search(head)
        if not m or not m.group(1).strip():
            problems.append(f"missing {name}")
            continue
        val = m.group(1).strip()
        if name == "title" and len(val) > 60:
            problems.append(f"title is {len(val)} chars (max 60)")
        if name == "description" and not (120 <= len(val) <= 160):
            problems.append(f"description is {len(val)} chars (want 120-160)")
        if name == "twitter:card" and val != "summary_large_image":
            problems.append(f"twitter:card is {val!r}")
    blocks = JSONLD_RE.findall(head)
    if not blocks:
        problems.append("missing JSON-LD script")
    else:
        for i, b in enumerate(blocks):
            try:
                json.loads(b)
            except ValueError as e:
                problems.append(f"JSON-LD block {i} does not parse: {e}")
    noindex = re.search(r'name="robots"\s+content="[^"]*noindex', head, re.I)
    if not noindex and len(re.findall(r"<h1[\s>]", html, re.I)) != 1:
        problems.append("expected exactly one <h1>")
    if "<main" not in html.lower():
        problems.append("missing <main>")
    size_kb = len(html.encode("utf-8")) / 1024
    if size_kb > 200:
        problems.append(f"page is {size_kb:.0f} KB (max 200)")
    return problems


def url_to_file(url):
    path = url[len(BASE):] if url.startswith(BASE) else url
    if not path.startswith("/"):
        return None
    if path.endswith("/"):
        path += "index.html"
    return path.lstrip("/")


def check_sitemap():
    problems = []
    p = os.path.join(ROOT, "sitemap.xml")
    if not os.path.exists(p):
        return ["sitemap.xml missing"], []
    try:
        tree = ET.parse(p)
    except ET.ParseError as e:
        return [f"sitemap.xml does not parse: {e}"], []
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [u.text.strip() for u in tree.getroot().findall("s:url/s:loc", ns)]
    if not urls:
        problems.append("sitemap.xml has no <loc> entries")
    for u in urls:
        rel = url_to_file(u)
        if rel is None or not os.path.exists(os.path.join(ROOT, rel)):
            problems.append(f"{u} -> {rel} does not exist")
    return problems, urls


def check_feed():
    problems = []
    p = os.path.join(ROOT, "feed.xml")
    if not os.path.exists(p):
        return ["feed.xml missing"]
    try:
        tree = ET.parse(p)
    except ET.ParseError as e:
        return [f"feed.xml does not parse: {e}"]
    items = tree.getroot().findall("channel/item")
    if not items:
        problems.append("feed.xml has no <item> entries")
    for it in items:
        for tag in ("title", "link", "guid", "pubDate", "description"):
            el = it.find(tag)
            if el is None or not (el.text or "").strip():
                problems.append(f"feed item missing <{tag}>")
        link = it.findtext("link", "").strip()
        rel = url_to_file(link)
        if rel is None or not os.path.exists(os.path.join(ROOT, rel)):
            problems.append(f"{link} -> {rel} does not exist")
    return problems


def main():
    failures = 0

    def report(label, problems):
        nonlocal failures
        if problems:
            failures += 1
            print(f"FAIL  {label}")
            for p in problems:
                print(f"      - {p}")
        else:
            print(f"PASS  {label}")

    for rel in html_pages():
        report(rel, check_page(rel))

    sm_problems, sm_urls = check_sitemap()
    report("sitemap.xml", sm_problems)
    report("feed.xml", check_feed())

    # Every indexable page should be in the sitemap too.
    sm_files = {url_to_file(u) for u in sm_urls}
    for rel in html_pages():
        with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
            head = fh.read(8000)
        if re.search(r'name="robots"\s+content="[^"]*noindex', head, re.I):
            continue
        if rel.replace(os.sep, "/") not in sm_files:
            failures += 1
            print(f"FAIL  {rel} is indexable but not in sitemap.xml")

    for name in ("robots.txt", "site.webmanifest", "assets/og.png"):
        report(name, [] if os.path.exists(os.path.join(ROOT, name)) else [f"{name} missing"])

    print(f"\n{'OK' if not failures else f'{failures} failure(s)'}")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
