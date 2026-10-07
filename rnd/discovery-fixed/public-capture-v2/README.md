# Public capture v2

Generated on 2026-09-26 from the public site and the existing
`rnd/discovery-fixed/site_inventory.json` snapshot.

## What this pass adds

- Public `sitemap.xml` response
- Additional URLs discovered inside captured HTML, CSS, and JavaScript
- Public external stylesheets, scripts, fonts, images, and documents that
  responded successfully
- YouTube thumbnail metadata where the provider allowed it
- A complete capture manifest with status, content type, checksum, source, and
  local path information
- An unresolved-reference report for broken, blocked, unavailable, or
  reference-only resources

## Important boundaries

- YouTube videos are not downloaded; their embed URLs remain in the manifest.
- Google Maps embeds remain URL references.
- Forms were inventoried but never submitted.
- No login, admin route, database, server log, payment record, mail list, or
  private API was accessed.
- A 404 or 403 is preserved as evidence that the referenced public resource was
  unavailable to the capture process; it is not silently treated as missing
  from the inventory.

## Files

- `capture_manifest.json` — all references found by this pass and their results
- `unresolved_references.json` — resources not locally captured and why
- `metadata/sitemap.xml` — public sitemap response
- `assets/` — successfully captured external or newly discovered resources
- `youtube/` — public thumbnails that could be retrieved

The original page snapshots and same-origin asset archive remain in the parent
`rnd/discovery-fixed/` directory.
