#!/usr/bin/env python3
"""Generate the Penu page tracker from the captured public-site inventory."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = ROOT / "discovery-fixed" / "site_inventory.json"
DEFAULT_JSON_OUTPUT = ROOT / "penu" / "src" / "content" / "page-inventory.json"
DEFAULT_MARKDOWN_OUTPUT = ROOT / "penu" / "docs" / "page-inventory.md"


PAGE_METADATA = {
    "/": {
        "key": "home",
        "name": "Home",
        "area": "public",
        "suggestedRoute": "/",
        "notes": "Primary public homepage.",
    },
    "/index.html": {
        "key": "legacy-index-html",
        "name": "Legacy index.html endpoint",
        "area": "legacy endpoint",
        "suggestedRoute": "/",
        "notes": "Original crawl returned 404; decide redirect or retirement.",
    },
    "/index.php": {
        "key": "legacy-index-php",
        "name": "Legacy index.php homepage",
        "area": "legacy endpoint",
        "suggestedRoute": "/",
        "notes": "Appears to duplicate the root homepage; preserve as a redirect candidate.",
    },
    "/overview.php": {
        "key": "overview",
        "name": "Overview",
        "area": "public",
        "suggestedRoute": "/overview",
        "notes": "Overview page with embedded map/location content.",
    },
    "/news.php": {
        "key": "news",
        "name": "News",
        "area": "public",
        "suggestedRoute": "/news",
        "notes": "News listing and legacy article links/content.",
    },
    "/news-letter.php": {
        "key": "newsletter",
        "name": "Newsletter",
        "area": "public",
        "suggestedRoute": "/newsletter",
        "notes": "Newsletter/document listing.",
    },
    "/vasavidham.php": {
        "key": "vasavi-dham",
        "name": "Vasavi Dham",
        "area": "public",
        "suggestedRoute": "/vasavi-dham",
        "notes": "Trust and Dham information, projects, and facilities.",
    },
    "/story.php": {
        "key": "story",
        "name": "Story of Goddess Vasavi",
        "area": "public",
        "suggestedRoute": "/story",
        "notes": "Story, historic events, and downloadable publication content.",
    },
    "/donation_annadanam.php": {
        "key": "donation-annadanam",
        "name": "Annadanam donation",
        "area": "donations",
        "suggestedRoute": "/donations/annadanam",
        "notes": "Donation information and payment journey candidate.",
    },
    "/donation_goshala.php": {
        "key": "donation-goshala",
        "name": "Go-Shala donation",
        "area": "donations",
        "suggestedRoute": "/donations/goshala",
        "notes": "Donation information and payment journey candidate.",
    },
    "/donation_ehundi.php": {
        "key": "donation-ehundi",
        "name": "E-Hundi donation",
        "area": "donations",
        "suggestedRoute": "/donations/e-hundi",
        "notes": "Donation information and payment journey candidate.",
    },
    "/team.php": {
        "key": "trustees",
        "name": "Trustees",
        "area": "public",
        "suggestedRoute": "/trustees",
        "notes": "Trustee and executive member listings.",
    },
    "/photos.php": {
        "key": "photos",
        "name": "Photos",
        "area": "gallery",
        "suggestedRoute": "/gallery/photos",
        "notes": "Photo albums and gallery media.",
    },
    "/videos.php": {
        "key": "videos",
        "name": "Videos",
        "area": "gallery",
        "suggestedRoute": "/gallery/videos",
        "notes": "Video embeds and video gallery media.",
    },
    "/contact.php": {
        "key": "contact",
        "name": "Contact",
        "area": "public",
        "suggestedRoute": "/contact",
        "notes": "Contact details, map/location content, and contact form candidate.",
    },
    "/donations.php": {
        "key": "donations",
        "name": "Donations landing page",
        "area": "donations",
        "suggestedRoute": "/donations",
        "notes": "General donations landing page.",
    },
    "/about.php": {
        "key": "about",
        "name": "About",
        "area": "public",
        "suggestedRoute": "/about",
        "notes": "Trust, Dham, objectives, construction, and completed projects; original /images/* refs returned 404 and recovered matching assets are used where available.",
    },
    "/privacy.php": {
        "key": "privacy",
        "name": "Privacy policy",
        "area": "legal",
        "suggestedRoute": "/privacy",
        "notes": "Legal/privacy content requiring review before publication.",
    },
}

TRACKED_STATUSES = {
    "not-started": "Not started",
    "in-progress": "In progress",
    "ready-for-review": "Ready for review",
    "complete": "Complete",
    "not-applicable": "Not applicable",
}


def is_done(status: str) -> bool:
    return status in {"complete", "not-applicable"}


def build_manifest(source: Path, existing: dict | None = None) -> dict:
    source = source.resolve()
    inventory = json.loads(source.read_text(encoding="utf-8"))
    existing_pages = {
        page["originalUrl"]: page
        for page in (existing or {}).get("pages", [])
        if page.get("originalUrl")
    }
    progress_fields = (
        "contentStatus",
        "imageStatus",
        "videoAudioStatus",
        "frontendStatus",
        "apiStatus",
        "qaStatus",
    )
    pages = []

    for url, captured in inventory["pages"].items():
        path = urlparse(url).path or "/"
        metadata = PAGE_METADATA.get(
            path,
            {
                "key": path.strip("/").replace("/", "-") or "home",
                "name": path,
                "area": "unclassified",
                "suggestedRoute": "TBD",
                "notes": "Review and classify this discovered endpoint.",
            },
        )
        previous = existing_pages.get(url, {})
        page = {
            **metadata,
            "originalUrl": url,
            "originalPath": path,
            "sourceStatus": "captured" if captured["status"] == 200 else "not-found",
            "sourceHttpStatus": captured["status"],
            "sourceCaptureFile": captured.get("local_file"),
            "sourceBytes": captured.get("bytes", 0),
            "assetReferenceCount": len(captured.get("assets", [])),
            "sameOriginAssetReferenceCount": sum(
                asset.get("url", "").startswith(inventory["origin"])
                for asset in captured.get("assets", [])
            ),
            "embedCount": len(captured.get("embeds", [])),
            "formCount": len(captured.get("forms", [])),
        }
        page.update(
            {
                field: previous.get(field, "not-started")
                for field in progress_fields
            }
        )
        pages.append(
            page
        )

    pages.sort(key=lambda page: (page["originalPath"] != "/", page["originalPath"]))

    summary = {
        "totalEndpoints": len(pages),
        "reachableEndpoints": sum(page["sourceStatus"] == "captured" for page in pages),
        "notFoundEndpoints": sum(page["sourceStatus"] == "not-found" for page in pages),
        "contentComplete": sum(is_done(page["contentStatus"]) for page in pages),
        "imagesComplete": sum(is_done(page["imageStatus"]) for page in pages),
        "videoAudioComplete": sum(is_done(page["videoAudioStatus"]) for page in pages),
        "frontendComplete": sum(is_done(page["frontendStatus"]) for page in pages),
        "apiComplete": sum(is_done(page["apiStatus"]) for page in pages),
        "qaComplete": sum(is_done(page["qaStatus"]) for page in pages),
    }

    try:
        source_inventory = str(source.relative_to(ROOT))
    except ValueError:
        source_inventory = str(source)

    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourceInventory": source_inventory,
        "sourceGeneratedAt": inventory.get("generated_at"),
        "sourceBaseUrl": inventory["base_url"],
        "statusDefinitions": TRACKED_STATUSES,
        "summary": summary,
        "pages": pages,
    }


def status_cell(status: str) -> str:
    return {
        "not-started": "⬜",
        "in-progress": "🟡",
        "ready-for-review": "🔍",
        "complete": "✅",
        "not-applicable": "—",
    }.get(status, status)


def build_markdown(manifest: dict) -> str:
    summary = manifest["summary"]
    lines = [
        "# Original public page inventory",
        "",
        "Generated from `discovery-fixed/site_inventory.json`. This is the migration and implementation tracker for the Penu frontend.",
        "",
        f"- Original endpoints discovered: **{summary['totalEndpoints']}**",
        f"- Reachable source endpoints: **{summary['reachableEndpoints']}**",
        f"- Source endpoints returning 404: **{summary['notFoundEndpoints']}**",
        f"- Content complete: **{summary['contentComplete']}/{summary['totalEndpoints']}**",
        f"- Images complete: **{summary['imagesComplete']}/{summary['totalEndpoints']}**",
        f"- Video/audio complete: **{summary['videoAudioComplete']}/{summary['totalEndpoints']}**",
        f"- Frontend implementation complete: **{summary['frontendComplete']}/{summary['totalEndpoints']}**",
        f"- API integration complete: **{summary['apiComplete']}/{summary['totalEndpoints']}**",
        f"- QA complete: **{summary['qaComplete']}/{summary['totalEndpoints']}**",
        "",
        "Status columns track the new Penu frontend. Source capture means the old public endpoint was crawled; it does not mean the content has already been migrated into Penu.",
        "",
        "| # | Original URL | Suggested Penu route | Area | Source | Content | Images | Video/audio | UI | API | QA | Source refs | Notes |",
        "|---:|---|---|---|---|---|---|---|---|---|---|---:|---|",
    ]

    for index, page in enumerate(manifest["pages"], 1):
        lines.append(
            "| {index} | `{url}` | `{route}` | {area} | {source} ({http}) | {content} | {images} | {video} | {ui} | {api} | {qa} | {refs} | {notes} |".format(
                index=index,
                url=page["originalUrl"],
                route=page["suggestedRoute"],
                area=page["area"],
                source="✅" if page["sourceStatus"] == "captured" else "❌",
                http=page["sourceHttpStatus"],
                content=status_cell(page["contentStatus"]),
                images=status_cell(page["imageStatus"]),
                video=status_cell(page["videoAudioStatus"]),
                ui=status_cell(page["frontendStatus"]),
                api=status_cell(page["apiStatus"]),
                qa=status_cell(page["qaStatus"]),
                refs=page["assetReferenceCount"],
                notes=page["notes"],
            )
        )

    lines.extend(
        [
            "",
            "## How to update progress",
            "",
            "Update the status fields in `src/content/page-inventory.json`, then run:",
            "",
            "```bash",
            "python3 scripts/generate_penu_page_inventory.py",
            "```",
            "",
            "When the source inventory is intentionally refreshed, regenerate this file and review any newly discovered URLs before implementation.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--json-output", type=Path, default=DEFAULT_JSON_OUTPUT)
    parser.add_argument("--markdown-output", type=Path, default=DEFAULT_MARKDOWN_OUTPUT)
    args = parser.parse_args()

    source = args.source.resolve()
    existing = None
    if args.json_output.exists():
        existing = json.loads(args.json_output.read_text(encoding="utf-8"))
    manifest = build_manifest(source, existing)
    args.json_output.parent.mkdir(parents=True, exist_ok=True)
    args.markdown_output.parent.mkdir(parents=True, exist_ok=True)
    args.json_output.write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    args.markdown_output.write_text(build_markdown(manifest), encoding="utf-8")
    print(f"Generated {args.json_output}")
    print(f"Generated {args.markdown_output}")


if __name__ == "__main__":
    main()
