#!/usr/bin/env python3
"""Inventory and optionally download the public surface of a website.

Standard-library only. The target site currently presents a self-signed TLS
certificate, so this script supports --insecure for discovery work. Use that
flag only when you trust the target and verify the host name yourself.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import mimetypes
import os
import posixpath
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from pathlib import Path


PAGE_EXTENSIONS = {"", ".html", ".htm", ".php", ".asp", ".aspx", ".jsp"}
ASSET_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico", ".bmp", ".avif",
    ".mp4", ".webm", ".mov", ".avi", ".m4v", ".mp3", ".wav", ".ogg",
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".zip",
    ".css", ".js", ".json", ".xml", ".txt", ".woff", ".woff2", ".ttf", ".eot",
}
SKIP_SCHEMES = {"mailto", "tel", "javascript", "data", "blob"}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def canonical_url(raw: str, base: str | None = None) -> str | None:
    if base:
        raw = urllib.parse.urljoin(base, raw)
    raw = raw.strip()
    if not raw:
        return None
    parsed = urllib.parse.urlsplit(raw)
    if parsed.scheme.lower() in SKIP_SCHEMES:
        return None
    if parsed.scheme.lower() not in {"http", "https"}:
        return None
    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()
    path = parsed.path or "/"
    trailing_slash = path.endswith("/")
    path = posixpath.normpath(re.sub(r"/{2,}", "/", path))
    if path == ".":
        path = "/"
    if trailing_slash and path != "/":
        path += "/"
    # Legacy filenames on this site contain spaces and parentheses. urllib's
    # opener rejects raw spaces, so normalize them while keeping existing
    # percent-escapes intact.
    path = urllib.parse.quote(urllib.parse.unquote(path), safe="/%:@-._~!$&'()*+,;=")
    query = urllib.parse.quote(urllib.parse.unquote(parsed.query), safe="/?&=:@-._~!$'()*+,;[]%")
    # Fragments do not identify a separate server resource.
    return urllib.parse.urlunsplit((scheme, netloc, path, query, ""))


def ext(url: str) -> str:
    return Path(urllib.parse.urlsplit(url).path).suffix.lower()


def same_origin(url: str, origin: str) -> bool:
    return urllib.parse.urlsplit(url).netloc.lower() == urllib.parse.urlsplit(origin).netloc.lower()


def is_probable_page(url: str, content_type: str = "") -> bool:
    path_ext = ext(url)
    if "html" in content_type.lower() or "xhtml" in content_type.lower():
        return True
    return path_ext in PAGE_EXTENSIONS


def safe_name(url: str, fallback_ext: str = "") -> str:
    parsed = urllib.parse.urlsplit(url)
    raw = (parsed.netloc + parsed.path + ("?" + parsed.query if parsed.query else ""))
    raw = urllib.parse.unquote(raw).strip("/") or "home"
    raw = re.sub(r"[^A-Za-z0-9._-]+", "_", raw)
    digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:10]
    suffix = Path(raw).suffix
    if not suffix and fallback_ext:
        suffix = fallback_ext
    return f"{raw[:150]}--{digest}{suffix}"


class PageParser(HTMLParser):
    """Extract content and topology without requiring BeautifulSoup."""

    def __init__(self, page_url: str):
        super().__init__(convert_charrefs=True)
        self.page_url = page_url
        self.title = ""
        self.meta: list[dict] = []
        self.headings: list[dict] = []
        self.links: list[dict] = []
        self.assets: list[dict] = []
        self.forms: list[dict] = []
        self.embeds: list[dict] = []
        self.json_ld: list[str] = []
        self.text_parts: list[str] = []
        self._stack: list[str] = []
        self._skip_depth = 0
        self._title_depth = 0
        self._heading: dict | None = None
        self._form: dict | None = None
        self._script_type = ""
        self._script_text: list[str] = []

    def _add_ref(self, kind: str, raw: str | None, attrs: dict, text: str = ""):
        if not raw:
            return
        url = canonical_url(raw, self.page_url)
        item = {"kind": kind, "raw": raw, "url": url, "text": text.strip()}
        for key in ("alt", "title", "rel", "type", "width", "height", "loading", "poster", "target"):
            if attrs.get(key) is not None:
                item[key] = attrs[key]
        if kind == "asset":
            self.assets.append(item)
        else:
            self.links.append(item)

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        tag = tag.lower()
        self._stack.append(tag)
        if tag in {"script", "style", "noscript", "template", "svg"}:
            self._skip_depth += 1
        if tag == "title":
            self._title_depth += 1
        if tag == "meta":
            self.meta.append({k: v for k, v in d.items() if v is not None})
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"} and self._skip_depth == 0:
            self._heading = {"level": int(tag[1]), "text": ""}
        if tag == "a":
            self._add_ref("link", d.get("href"), d, "")
            if self.links:
                self.links[-1]["_open"] = True
        if tag in {"img", "script", "iframe", "embed", "source", "track", "video", "audio", "input"}:
            raw = d.get("src") or d.get("data-src") or d.get("data-lazy-src") or d.get("poster")
            if tag == "input":
                raw = None
            self._add_ref("asset", raw, d)
            if d.get("srcset"):
                for candidate in d["srcset"].split(","):
                    candidate_url = candidate.strip().split()[0]
                    self._add_ref("asset", candidate_url, {"srcset": d["srcset"]})
        if tag == "link" and d.get("href"):
            self._add_ref("asset" if d.get("rel", "").lower() != "canonical" else "link", d.get("href"), d)
        if tag == "form":
            self._form = {"action": canonical_url(d.get("action", self.page_url), self.page_url), "method": d.get("method", "get").upper(), "controls": []}
            self.forms.append(self._form)
        if self._form is not None and tag in {"input", "select", "textarea", "button"}:
            self._form["controls"].append({k: v for k, v in d.items() if v is not None})
        if tag in {"iframe", "video", "audio", "embed"}:
            self.embeds.append({"tag": tag, **{k: v for k, v in d.items() if v is not None}})
        if tag == "script":
            self._script_type = d.get("type", "")
            self._script_text = []

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag == "a":
            for item in reversed(self.links):
                if item.pop("_open", False):
                    item["text"] = item.get("text", "").strip()
                    break
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"} and self._heading is not None:
            if self._heading["text"].strip():
                self.headings.append({"level": self._heading["level"], "text": re.sub(r"\s+", " ", self._heading["text"]).strip()})
            self._heading = None
        if tag == "title":
            self._title_depth = max(0, self._title_depth - 1)
        if tag == "script" and self._script_type.lower() == "application/ld+json":
            value = "".join(self._script_text).strip()
            if value:
                self.json_ld.append(value)
            self._script_type = ""
        if tag in {"script", "style", "noscript", "template", "svg"}:
            self._skip_depth = max(0, self._skip_depth - 1)
        if self._stack:
            self._stack.pop()

    def handle_data(self, data):
        if self._script_type:
            self._script_text.append(data)
        if self._title_depth:
            self.title += data
        if self._heading is not None:
            self._heading["text"] += data
        if self._skip_depth == 0:
            clean = re.sub(r"\s+", " ", data).strip()
            if clean:
                self.text_parts.append(clean)
        # Capture visible anchor text and preserve it on the most recent open anchor.
        for item in reversed(self.links):
            if item.get("_open"):
                item["text"] = (item.get("text", "") + " " + data).strip()
                break

    def result(self) -> dict:
        links = []
        for item in self.links:
            clean = {k: v for k, v in item.items() if k != "_open"}
            links.append(clean)
        return {
            "title": re.sub(r"\s+", " ", self.title).strip(),
            "meta": self.meta,
            "headings": self.headings,
            "text": re.sub(r"\s+", " ", " ".join(self.text_parts)).strip(),
            "links": links,
            "assets": self.assets,
            "forms": self.forms,
            "embeds": self.embeds,
            "json_ld": self.json_ld,
        }


class SiteCrawler:
    def __init__(self, base_url: str, out_dir: Path, delay: float, insecure: bool, download_assets: bool, max_asset_bytes: int):
        self.base_url = canonical_url(base_url) or base_url
        self.origin = self.base_url
        self.out_dir = out_dir
        self.delay = delay
        self.download_assets = download_assets
        self.max_asset_bytes = max_asset_bytes
        self.context = ssl._create_unverified_context() if insecure else ssl.create_default_context()
        self.opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=self.context))
        self.opener.addheaders = [("User-Agent", "PenuRevampDiscovery/1.0 (+authorized site inventory)")]
        self.pages: dict[str, dict] = {}
        self.asset_urls: dict[str, dict] = {}
        self.queue: list[str] = []
        self.seen: set[str] = set()

    def fetch(self, url: str) -> tuple[bytes, dict]:
        req = urllib.request.Request(url, headers={"Accept": "text/html,application/xhtml+xml,application/xml,application/pdf,*/*;q=0.8"})
        started = time.time()
        try:
            with self.opener.open(req, timeout=45) as response:
                body = response.read(self.max_asset_bytes + 1)
                headers = {k.lower(): v for k, v in response.headers.items()}
                return body, {"status": response.status, "url": response.geturl(), "headers": headers, "elapsed_ms": round((time.time() - started) * 1000)}
        except urllib.error.HTTPError as e:
            body = e.read(self.max_asset_bytes + 1)
            return body, {"status": e.code, "url": e.geturl(), "headers": {k.lower(): v for k, v in e.headers.items()}, "error": str(e), "elapsed_ms": round((time.time() - started) * 1000)}
        except Exception as e:
            return b"", {"status": None, "url": url, "headers": {}, "error": repr(e), "elapsed_ms": round((time.time() - started) * 1000)}

    def seed_sitemap(self):
        sitemap = canonical_url(urllib.parse.urljoin(self.base_url, "/sitemap.xml"))
        body, info = self.fetch(sitemap)
        if info.get("status") != 200:
            return {"url": sitemap, "status": info.get("status"), "error": info.get("error")}
        found = []
        try:
            root = ET.fromstring(body)
            found = [canonical_url(node.text or "") for node in root.iter() if node.tag.rsplit("}", 1)[-1] == "loc"]
        except ET.ParseError as e:
            return {"url": sitemap, "status": info.get("status"), "error": f"invalid XML: {e}"}
        for url in found:
            if not url or not same_origin(url, self.origin):
                continue
            if is_probable_page(url):
                if url not in self.seen:
                    self.queue.append(url)
            else:
                self.add_asset({"kind": "sitemap", "raw": url, "url": url, "text": ""})
        return {"url": sitemap, "status": info.get("status"), "count": len(found), "seeded": len(self.queue)}

    def add_asset(self, item: dict):
        url = item.get("url")
        if not url:
            return
        record = self.asset_urls.setdefault(url, {"url": url, "refs": []})
        ref = {k: v for k, v in item.items() if k != "url"}
        if ref not in record["refs"]:
            record["refs"].append(ref)

    def crawl_page(self, url: str):
        body, info = self.fetch(url)
        content_type = info.get("headers", {}).get("content-type", "")
        entry = {"url": url, "fetched_at": now_iso(), **info, "content_type": content_type, "bytes": len(body)}
        if body and is_probable_page(url, content_type):
            try:
                text = body.decode(info.get("headers", {}).get("content-type", "").split("charset=")[-1].split(";")[0].strip() or "utf-8", errors="replace")
                parser = PageParser(info.get("url", url))
                parser.feed(text)
                parsed = parser.result()
                entry.update(parsed)
                page_path = self.out_dir / "pages" / safe_name(url, ".html")
                page_path.parent.mkdir(parents=True, exist_ok=True)
                page_path.write_text(text, encoding="utf-8")
                entry["local_file"] = str(page_path.relative_to(self.out_dir))
                for asset in parsed["assets"]:
                    self.add_asset(asset)
                for link in parsed["links"]:
                    linked = link.get("url")
                    if linked and same_origin(linked, self.origin):
                        if is_probable_page(linked) and linked not in self.seen:
                            self.queue.append(linked)
                        elif ext(linked) in ASSET_EXTENSIONS:
                            self.add_asset({"kind": "link", "raw": link.get("raw"), "url": linked, "text": link.get("text", "")})
            except Exception as e:
                entry["parse_error"] = repr(e)
        self.pages[url] = entry

    def download_asset(self, url: str, record: dict):
        body, info = self.fetch(url)
        record.update({"fetched_at": now_iso(), **info, "bytes": len(body)})
        content_type = info.get("headers", {}).get("content-type", "")
        record["content_type"] = content_type
        if len(body) > self.max_asset_bytes:
            record["too_large"] = True
            return
        if body and info.get("status") == 200:
            suffix = ext(url) or mimetypes.guess_extension(content_type.split(";")[0]) or ""
            path = self.out_dir / "assets" / safe_name(url, suffix)
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(body)
            record["local_file"] = str(path.relative_to(self.out_dir))
            record["sha256"] = hashlib.sha256(body).hexdigest()

    def run(self):
        self.out_dir.mkdir(parents=True, exist_ok=True)
        sitemap_info = self.seed_sitemap()
        if self.base_url not in self.seen:
            self.queue.insert(0, self.base_url)
        while self.queue:
            url = self.queue.pop(0)
            if url in self.seen:
                continue
            self.seen.add(url)
            print(f"[page {len(self.seen)}] {url}", file=sys.stderr)
            self.crawl_page(url)
            time.sleep(self.delay)
        # Keep only same-origin asset downloads by default; external assets remain inventoried.
        assets = {u: r for u, r in self.asset_urls.items() if same_origin(u, self.origin)}
        if self.download_assets:
            for index, (url, record) in enumerate(assets.items(), 1):
                print(f"[asset {index}/{len(assets)}] {url}", file=sys.stderr)
                self.download_asset(url, record)
                time.sleep(self.delay)
        summary = {
            "generated_at": now_iso(),
            "base_url": self.base_url,
            "origin": self.origin,
            "sitemap": sitemap_info,
            "page_count": len(self.pages),
            "asset_reference_count": len(self.asset_urls),
            "same_origin_asset_count": len(assets),
            "downloaded_assets": self.download_assets,
            "pages": self.pages,
            "assets": self.asset_urls,
        }
        (self.out_dir / "site_inventory.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")
        # Smaller review-friendly index.
        index = []
        for page in self.pages.values():
            index.append({k: page.get(k) for k in ("url", "status", "content_type", "bytes", "title", "headings", "local_file", "error", "parse_error")})
        (self.out_dir / "page_index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
        print(json.dumps({"pages": len(self.pages), "asset_refs": len(self.asset_urls), "same_origin_assets": len(assets), "output": str(self.out_dir)}, indent=2))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="https://vasavipenugonda.com/", help="Site root")
    parser.add_argument("--out", default="discovery", help="Output directory")
    parser.add_argument("--delay", type=float, default=0.25, help="Seconds between requests")
    parser.add_argument("--insecure", action="store_true", help="Accept the current self-signed TLS certificate")
    parser.add_argument("--download-assets", action="store_true", help="Download same-origin images, media, documents, CSS and JS")
    parser.add_argument("--max-asset-mb", type=int, default=50, help="Skip individual responses larger than this")
    args = parser.parse_args()
    crawler = SiteCrawler(args.base_url, Path(args.out), args.delay, args.insecure, args.download_assets, args.max_asset_mb * 1024 * 1024)
    crawler.run()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
