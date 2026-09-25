#!/usr/bin/env python3
"""Turn site_inventory.json into a concise revamp discovery report."""

from __future__ import annotations

import argparse
import json
import re
from urllib.parse import urlsplit
from collections import Counter
from pathlib import Path


def endpoint_candidates(pages: dict) -> list[str]:
    found = set()
    for page in pages.values():
        local = page.get("local_file")
        if not local:
            continue
        html = Path(local).read_text(encoding="utf-8", errors="ignore") if Path(local).exists() else ""
        for pattern in (r"(?:url|action)\s*[:=]\s*[\"']([^\"']+)", r"(?:open|href)\([^\n]*?[\"']([^\"']+\.php[^\"']*)"):
            for value in re.findall(pattern, html, flags=re.I):
                if ".php" in value and not value.startswith(("http://", "https://")):
                    found.add(value)
    return sorted(found)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("inventory", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    inv = json.loads(args.inventory.read_text(encoding="utf-8"))
    pages = inv["pages"]
    assets = inv["assets"]
    ok_pages = [p for p in pages.values() if p.get("status") == 200 and "html" in p.get("content_type", "")]
    failed_pages = [p for p in pages.values() if p.get("status") != 200]
    ok_assets = [a for a in assets.values() if a.get("status") == 200]
    same_origin_assets = [a for a in assets.values() if urlsplit(a.get("url", "")).netloc == "vasavipenugonda.com"]
    failed_assets = [a for a in same_origin_assets if a.get("status") != 200]
    type_counts = Counter((a.get("content_type", "").split(";", 1)[0] or "unknown") for a in ok_assets)
    external_domains = Counter()
    for p in pages.values():
        for item in p.get("links", []) + p.get("assets", []):
            url = item.get("url", "")
            if url and "vasavipenugonda.com" not in url:
                external_domains[url.split("/", 3)[2]] += 1
        for embed in p.get("embeds", []):
            url = embed.get("src", "")
            if url and "vasavipenugonda.com" not in url:
                external_domains[url.split("/", 3)[2]] += 1
    forms = Counter()
    embeds = Counter()
    for p in ok_pages:
        for form in p.get("forms", []):
            forms[form.get("action", "unknown")] += 1
        for embed in p.get("embeds", []):
            embeds[embed.get("tag", "unknown")] += 1
    lines = [
        "# Vasavi Penugonda Revamp — Discovery Report",
        "",
        f"Generated: {inv.get('generated_at', '')}",
        "",
        "## Inventory snapshot",
        "",
        f"- {len(ok_pages)} successful HTML pages captured; {len(failed_pages)} page-level failures.",
        f"- {len(assets)} unique asset references; {len(ok_assets)} downloaded successfully; {len(failed_assets)} same-origin assets failed or are unavailable.",
        f"- {sum(a.get('bytes', 0) for a in ok_assets) / 1024 / 1024:.1f} MB of downloaded assets is available in the assets folder.",
        "",
        "## Page routes",
        "",
        "| Route | Text chars | Headings | Asset refs | Forms | Embeds |",
        "|---|---:|---:|---:|---:|---:|",
    ]
    for p in ok_pages:
        route = p["url"].split("vasavipenugonda.com", 1)[-1] or "/"
        lines.append(f"| `{route}` | {len(p.get('text', '')):,} | {len(p.get('headings', []))} | {len(p.get('assets', []))} | {len(p.get('forms', []))} | {len(p.get('embeds', []))} |")
    lines += [
        "",
        "## Functional scope found",
        "",
        "- Information architecture: home, overview, news, newsletters, Vasavi Dham, story, trustees, photos, videos, contact, privacy, and donation hub.",
        "- Donation flows: Annadanam, Go-Shala, and e-Hundi; each collects donor name, 10-digit phone, and amount, then posts to a shared `donation_add.php` endpoint before redirecting to a payment URL.",
        "- Contact flow: client-side validation followed by JSON-like payload submission to `forms/contact.php`.",
        "- Newsletter subscription: email submission to `forms/subscribe.php`.",
        "- Media: photo galleries, 3 YouTube video embeds, Google Maps embeds, and externally hosted S3 images/PDFs.",
        "- Content-heavy sections: event cards, historic milestones, project descriptions, trustee profiles, gallery albums, news articles, and downloadable newsletters/documents.",
        "",
        "## Asset profile",
        "",
    ]
    for mime, count in type_counts.most_common():
        lines.append(f"- {mime}: {count}")
    lines += [
        "",
        "## Technical observations",
        "",
        "- Server: Apache with PHP 7.3.33 exposed in the response headers.",
        "- Frontend: server-rendered PHP/HTML using Bootstrap, jQuery 1.12.4, jQuery UI, Owl Carousel, Isotope, Venobox/Fancybox, Font Awesome, Remix Icon, Icofont, and template-derived CSS.",
        "- Current pages are largely hardcoded and share a repeated header/footer; the requested API-driven rebuild should introduce a content model and admin/editor workflow rather than simply porting markup.",
        "- The current sitemap contains legacy duplicates and stale/broken references, so URL mapping, redirects, SEO metadata, and asset QA belong in the migration plan.",
        "",
        "## Broken or risky references",
        "",
    ]
    for p in failed_pages:
        lines.append(f"- Page `{p['url']}` returned `{p.get('status')}`.")
    for a in failed_assets:
        lines.append(f"- Asset `{a['url']}` returned `{a.get('status')}`.")
    lines += [
        "",
        "## External services and endpoints",
        "",
    ]
    for domain, count in external_domains.most_common():
        lines.append(f"- `{domain}` ({count} references)")
    lines += [
        "",
        "## Recommended content entities for the rebuild",
        "",
        "1. Site settings / contact locations / social links",
        "2. Pages and reusable sections",
        "3. News articles and events",
        "4. Newsletters and downloadable documents",
        "5. Projects / milestones / timeline entries",
        "6. Trustees / team members",
        "7. Gallery albums and media items",
        "8. Donation programs and payment configuration",
        "9. Contact submissions and newsletter subscribers",
        "",
        "## Scope boundary",
        "",
        "This report inventories public responses only. It does not reveal the private database schema, admin panel, mail configuration, payment credentials, server logs, unpublished pages, or backend source code. Those need to be inspected with client-provided access before the final fixed quote.",
        "",
        "## Candidate implementation work packages",
        "",
        "- Discovery and information architecture",
        "- Design system and responsive UI redesign",
        "- API/backend/content model and admin workflow",
        "- Frontend implementation and page migration",
        "- Donation/payment and contact/newsletter integrations",
        "- Media/document migration and cleanup",
        "- SEO/redirects/accessibility/performance hardening",
        "- QA, deployment, handover, and post-launch warranty",
    ]
    result = "\n".join(lines) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(result, encoding="utf-8")
    else:
        print(result)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
