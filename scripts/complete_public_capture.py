#!/usr/bin/env python3
"""Complete the public Vasavi capture without requiring private access.

This pass builds on discovery-fixed/site_inventory.json. It:

* scans captured HTML, CSS, and JavaScript for additional absolute/CSS URLs;
* downloads public external images, documents, stylesheets, scripts, and fonts;
* records YouTube oEmbed metadata and public thumbnails without downloading
  hosted video files;
* stores robots.txt and sitemap.xml;
* writes a manifest and an unresolved-reference report.

It never submits forms, follows authenticated routes, or attempts to access
server logs, databases, payment records, or admin systems.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import mimetypes
import re
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ABSOLUTE_URL_RE = re.compile(r"https?://[^\s\"'<>]+", re.IGNORECASE)
CSS_URL_RE = re.compile(r"url\(\s*['\"]?([^)'\"\s]+)", re.IGNORECASE)
YOUTUBE_ID_RE = re.compile(r"youtube\.com/embed/([A-Za-z0-9_-]+)", re.IGNORECASE)
DOWNLOADABLE_EXTENSIONS = {
    ".avif",
    ".bmp",
    ".css",
    ".doc",
    ".docx",
    ".eot",
    ".gif",
    ".ico",
    ".jpeg",
    ".jpg",
    ".js",
    ".json",
    ".m4a",
    ".m4v",
    ".mp3",
    ".mp4",
    ".ogg",
    ".pdf",
    ".png",
    ".ppt",
    ".pptx",
    ".svg",
    ".ttf",
    ".txt",
    ".wav",
    ".webm",
    ".woff",
    ".woff2",
    ".xls",
    ".xlsx",
    ".xml",
    ".zip",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def safe_name(url: str, fallback_ext: str = "") -> str:
    parsed = urllib.parse.urlsplit(url)
    raw = urllib.parse.unquote(parsed.netloc + parsed.path)
    raw = raw.strip("/") or "resource"
    raw = re.sub(r"[^A-Za-z0-9._-]+", "_", raw)
    suffix = Path(urllib.parse.urlsplit(url).path).suffix.lower()
    if not suffix and fallback_ext:
        suffix = fallback_ext
    digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:12]
    return f"{raw[:150]}--{digest}{suffix}"


def clean_url(raw: str, base_url: str | None = None) -> str | None:
    raw = raw.strip().strip("'\"")
    if not raw or raw.startswith(("#", "data:", "blob:", "javascript:", "mailto:", "tel:")):
        return None
    url = urllib.parse.urljoin(base_url or "", raw)
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme.lower() not in {"http", "https"} or not parsed.netloc:
        return None
    return urllib.parse.urlunsplit(
        (
            parsed.scheme.lower(),
            parsed.netloc.lower(),
            parsed.path or "/",
            parsed.query,
            "",
        )
    )


def is_youtube(url: str) -> bool:
    return "youtube.com/embed/" in url.lower() or "youtu.be/" in url.lower()


def youtube_id(url: str) -> str | None:
    match = YOUTUBE_ID_RE.search(url)
    if match:
        return match.group(1)
    parsed = urllib.parse.urlsplit(url)
    if parsed.netloc.lower() == "youtu.be":
        return parsed.path.strip("/") or None
    return None


def is_map_embed(url: str) -> bool:
    return urllib.parse.urlsplit(url).netloc.lower() in {"www.google.com", "google.com"} and "/maps/" in url.lower()


class Capture:
    def __init__(self, inventory: Path, output: Path, insecure: bool, delay: float, max_bytes: int):
        self.inventory_path = inventory
        self.output = output
        self.delay = delay
        self.max_bytes = max_bytes
        context = ssl._create_unverified_context() if insecure else ssl.create_default_context()
        self.opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=context))
        self.opener.addheaders = [("User-Agent", "PenuRevampPublicCapture/1.0")]
        self.inventory = json.loads(inventory.read_text(encoding="utf-8"))
        self.base_url = self.inventory["base_url"]
        self.origin = urllib.parse.urlsplit(self.base_url).netloc.lower()
        self.refs: dict[str, dict] = {}
        self.results: dict[str, dict] = {}
        self.output.mkdir(parents=True, exist_ok=True)
        (self.output / "assets").mkdir(exist_ok=True)
        (self.output / "metadata").mkdir(exist_ok=True)
        (self.output / "youtube").mkdir(exist_ok=True)

    def add_ref(self, url: str | None, source: str, kind: str):
        if not url:
            return
        record = self.refs.setdefault(url, {"url": url, "sources": [], "kinds": []})
        if source not in record["sources"]:
            record["sources"].append(source)
        if kind not in record["kinds"]:
            record["kinds"].append(kind)

    def fetch(self, url: str) -> tuple[bytes, dict]:
        started = time.time()
        try:
            request = urllib.request.Request(url, headers={"Accept": "*/*"})
            with self.opener.open(request, timeout=45) as response:
                body = response.read(self.max_bytes + 1)
                headers = {key.lower(): value for key, value in response.headers.items()}
                return body, {
                    "status": response.status,
                    "resolved_url": response.geturl(),
                    "content_type": headers.get("content-type", ""),
                    "headers": headers,
                    "bytes": len(body),
                    "elapsed_ms": round((time.time() - started) * 1000),
                }
        except urllib.error.HTTPError as error:
            body = error.read(self.max_bytes + 1)
            return body, {
                "status": error.code,
                "resolved_url": error.geturl(),
                "content_type": error.headers.get("content-type", ""),
                "headers": {key.lower(): value for key, value in error.headers.items()},
                "bytes": len(body),
                "error": str(error),
                "elapsed_ms": round((time.time() - started) * 1000),
            }
        except Exception as error:  # pragma: no cover - network-dependent
            return b"", {
                "status": None,
                "resolved_url": url,
                "content_type": "",
                "headers": {},
                "bytes": 0,
                "error": repr(error),
                "elapsed_ms": round((time.time() - started) * 1000),
            }

    def scan_captured_sources(self):
        for page in self.inventory.get("pages", {}).values():
            local_file = page.get("local_file")
            if not local_file:
                continue
            path = self.inventory_path.parent / local_file
            if not path.is_file():
                continue
            text = path.read_text(encoding="utf-8", errors="replace")
            source_url = page.get("url", self.base_url)
            for raw in ABSOLUTE_URL_RE.findall(text):
                self.add_ref(clean_url(raw), local_file, "absolute-source-url")
            for raw in CSS_URL_RE.findall(text):
                self.add_ref(clean_url(raw, source_url), local_file, "css-url")

        local_to_url = {
            record.get("local_file"): url
            for url, record in self.inventory.get("assets", {}).items()
            if record.get("local_file")
        }
        for path in (self.inventory_path.parent / "assets").rglob("*"):
            if not path.is_file() or path.suffix.lower() not in {".css", ".js", ".mjs", ".html"}:
                continue
            relative = str(path.relative_to(self.inventory_path.parent))
            source_url = local_to_url.get(relative)
            if not source_url:
                continue
            text = path.read_text(encoding="utf-8", errors="replace")
            for raw in ABSOLUTE_URL_RE.findall(text):
                self.add_ref(clean_url(raw), relative, "nested-absolute-url")
            for raw in CSS_URL_RE.findall(text):
                self.add_ref(clean_url(raw, source_url), relative, "nested-css-url")

    def seed_existing(self):
        for page in self.inventory.get("pages", {}).values():
            local_file = page.get("local_file", "")
            for item in page.get("assets", []):
                self.add_ref(item.get("url"), local_file or page.get("url", ""), item.get("kind", "page-asset"))
            for item in page.get("links", []):
                url = item.get("url")
                if url and Path(urllib.parse.urlsplit(url).path).suffix.lower() in DOWNLOADABLE_EXTENSIONS:
                    self.add_ref(url, local_file or page.get("url", ""), item.get("kind", "page-link"))
        for url, record in self.inventory.get("assets", {}).items():
            for ref in record.get("refs", []):
                self.add_ref(url, ref.get("raw", "") or url, ref.get("kind", "inventory-asset"))

    def store_response(self, url: str, body: bytes, info: dict, folder: str = "assets") -> dict:
        result = {"url": url, **info}
        if len(body) > self.max_bytes:
            result["too_large"] = True
            return result
        if body and info.get("status") == 200:
            content_type = info.get("content_type", "").split(";", 1)[0].strip()
            suffix = Path(urllib.parse.urlsplit(url).path).suffix.lower()
            if not suffix:
                suffix = mimetypes.guess_extension(content_type) or ""
            path = self.output / folder / safe_name(url, suffix)
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(body)
            result.update({
                "local_file": str(path.relative_to(self.output)),
                "sha256": hashlib.sha256(body).hexdigest(),
            })
        return result

    def capture_metadata_file(self, url: str, filename: str):
        body, info = self.fetch(url)
        path = self.output / "metadata" / filename
        if info.get("status") == 200 and body:
            path.write_bytes(body)
        self.results[url] = {"url": url, **info, "local_file": str(path.relative_to(self.output)) if path.exists() else None}

    def capture_youtube(self, url: str) -> dict:
        video_id = youtube_id(url)
        result = {"url": url, "kind": "youtube-embed", "video_id": video_id}
        if not video_id:
            result["error"] = "Could not identify the YouTube video ID."
            return result
        oembed_url = "https://www.youtube.com/oembed?url=" + urllib.parse.quote(url, safe="") + "&format=json"
        body, info = self.fetch(oembed_url)
        result["oembed"] = info
        if info.get("status") == 200 and body:
            path = self.output / "youtube" / f"{video_id}.json"
            path.write_bytes(body)
            result["oembed_local_file"] = str(path.relative_to(self.output))
        thumbnail_url = f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"
        thumbnail_body, thumbnail_info = self.fetch(thumbnail_url)
        thumbnail_result = self.store_response(thumbnail_url, thumbnail_body, thumbnail_info, "youtube")
        result["thumbnail"] = thumbnail_result
        return result

    def should_download(self, url: str, info: dict) -> bool:
        host = urllib.parse.urlsplit(url).netloc.lower()
        if is_youtube(url) or host in {"www.youtube.com", "youtube.com", "www.google.com", "google.com"}:
            return False
        extension = Path(urllib.parse.urlsplit(url).path).suffix.lower()
        content_type = info.get("content_type", "").lower()
        return extension in DOWNLOADABLE_EXTENSIONS or any(
            marker in content_type for marker in ("image/", "audio/", "video/", "font/", "javascript", "text/css", "application/pdf")
        )

    def run(self):
        self.seed_existing()
        self.scan_captured_sources()
        self.capture_metadata_file(
            urllib.parse.urljoin(self.base_url, "/robots.txt"), "robots.txt"
        )
        self.capture_metadata_file(
            urllib.parse.urljoin(self.base_url, "/sitemap.xml"), "sitemap.xml"
        )

        existing_assets = self.inventory.get("assets", {})
        for url, ref in sorted(self.refs.items()):
            if urllib.parse.urlsplit(url).netloc.lower() == self.origin:
                existing = existing_assets.get(url, {})
                if existing.get("status") == 404 or existing.get("local_file"):
                    continue
            if is_youtube(url):
                self.results[url] = self.capture_youtube(url)
                time.sleep(self.delay)
                continue
            if is_map_embed(url):
                self.results[url] = {
                    "url": url,
                    "kind": "google-maps-embed",
                    "status": "reference-only",
                    "reason": "Interactive map embed; URL retained instead of downloading provider HTML.",
                }
                continue
            body, info = self.fetch(url)
            if self.should_download(url, info):
                result = self.store_response(url, body, info)
            else:
                result = {"url": url, **info, "status": info.get("status"), "reason": "reference-only or unsupported resource type"}
            result["sources"] = ref["sources"]
            result["kinds"] = ref["kinds"]
            self.results[url] = result
            time.sleep(self.delay)

        unresolved = []
        for url, record in self.inventory.get("assets", {}).items():
            if record.get("status") == 404 or not record.get("local_file"):
                unresolved.append({
                    "url": url,
                    "status": record.get("status"),
                    "error": record.get("error"),
                    "reason": "Existing same-origin 404 or external reference not downloaded by the original crawler.",
                    "refs": record.get("refs", []),
                })
        for url, result in self.results.items():
            if not result.get("local_file") and result.get("status") not in {200, "reference-only"}:
                unresolved.append(result)

        manifest = {
            "generated_at": now_iso(),
            "base_url": self.base_url,
            "source_inventory": str(self.inventory_path),
            "reference_count_after_source_scan": len(self.refs),
            "results": self.results,
        }
        (self.output / "capture_manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
        (self.output / "unresolved_references.json").write_text(json.dumps(unresolved, indent=2, ensure_ascii=False), encoding="utf-8")
        print(json.dumps({
            "output": str(self.output),
            "references_after_scan": len(self.refs),
            "captured_results": len(self.results),
            "local_files": sum(1 for item in self.results.values() if item.get("local_file")),
            "unresolved": len(unresolved),
        }, indent=2))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--inventory", default="discovery-fixed/site_inventory.json")
    parser.add_argument("--out", default="discovery-fixed/public-capture-v2")
    parser.add_argument("--delay", type=float, default=0.25)
    parser.add_argument("--insecure", action="store_true")
    parser.add_argument("--max-asset-mb", type=int, default=50)
    args = parser.parse_args()
    Capture(
        Path(args.inventory),
        Path(args.out),
        args.insecure,
        args.delay,
        args.max_asset_mb * 1024 * 1024,
    ).run()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
