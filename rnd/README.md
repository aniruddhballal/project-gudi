# Penu R&D

This folder contains research and planning material for the Vasavi Penugonda Temple Trust revamp.

## Contents

- `discovery-fixed/` — captured source pages and assets
- `pricing/` — project pricing estimates
- `prompts/` — research and planning prompts
- `scripts/` — discovery and inventory utilities
- `lalith-pricing-test.md` — reference pricing material

The working applications are kept separately in `frontend/` and `backend/`.

## Run the public-site inventory

The current site presents a self-signed TLS certificate. If you have confirmed that the domain is the intended client site, run:

```bash
python3 rnd/scripts/scrape_site.py \
  --base-url https://vasavipenugonda.com/ \
  --out rnd/discovery \
  --insecure \
  --download-assets
```

The script uses the public sitemap plus discovered same-origin links. It stores:

- `discovery/site_inventory.json`: full page and asset inventory, metadata, links, forms, embeds, and response details
- `discovery/page_index.json`: compact page-level review index
- `discovery/pages/`: raw HTML snapshots
- `discovery/assets/`: same-origin images, media, documents, CSS, JavaScript, and other referenced files when downloaded

External CDN assets are recorded in the inventory but are not downloaded. The script does not attempt to access private backend data, server logs, admin routes, databases, or POST actions.

## Useful review commands

```bash
python3 -m json.tool rnd/discovery/page_index.json | less
rg -n 'title|headings|forms|embeds|json_ld' rnd/discovery/site_inventory.json
find rnd/discovery/assets -type f | sort
```

The discovery output is an input to the next phase: content model, page taxonomy, feature backlog, migration strategy, technical architecture, timeline, and pricing estimate.
