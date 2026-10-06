# Penu backoffice / content management research

Research snapshot: 2026-10-06. Prices and product limits can change; confirm the final quote before presenting it to the organisation. Prices below are in USD and exclude tax, hosting outside the platform, storage, email, backups, and implementation time.

## Agreed requirements

- The public website's design, layout, SEO, routes, and component structure are fixed after launch.
- Organisation users can edit content inside the existing structure; they cannot create new page structures or change the site schema from the UI.
- CRUD collections:
  - Gallery photos.
  - Gallery videos and their metadata/embeds.
  - Newsletters.
  - Articles/news posts.
- RU-only singleton/global content: values that must always exist, such as the site heading, organisation information, Google/physical location, contact details, and similar site settings. These can be updated, but cannot be created or deleted.
- Updates publish immediately. No draft, approval, rejection, or editorial hierarchy is required for V1.
- Keep individual user accounts even if every user has the same permission set. A shared password would make it impossible to know who changed content or revoke one person's access.
- Keep a short history of the last 2–4 changes per item/record, including who changed it, what changed, and when. Older history should be deleted or compacted. This is a rollback/safety feature, not a permanent compliance archive.
- The media history requirement should be defined separately: retain old metadata/reference snapshots, but do not automatically duplicate large video files forever unless rollback of the binary asset is required.

## Recommended architecture

- Treat this as a headless CMS/backoffice, not a CRM.
- Use an admin URL such as `admin.example.org` or `cms.example.org`; keep it separate from the public site URL. It does not need to be a second public-facing website.
- The public Next.js site reads published content from the CMS/API. The admin UI writes to the CMS/API.
- A separate deployment/service is preferred for the CMS because it isolates admin authentication, database access, uploads, backups, and operational failures. The public and admin frontends can still live in the same repository if that is convenient.
- Do not build password hashing, sessions, password reset, email verification, or brute-force protection from scratch. Use the CMS's built-in auth or a mature identity provider. Restrict access using an approved organisation email domain, an explicit allowlist, or an organisation-managed Google/Microsoft login.
- Start with one `editor` permission set, not multiple roles. Still enforce permissions on the backend/API; hiding buttons in the UI is not security.
- Model site-wide values as a CMS “singleton”/global, and model galleries/articles/newsletters as collections. This directly enforces CRUD versus RU-only behaviour.
- Configure the public API to expose only published/readable content and keep the admin API credentials server-side.

## Options and price comparison

| Option | Current software/platform price | Auth, content, and history fit | Main trade-off |
|---|---:|---|---|
| **Directus self-hosted** | Core: $0, with limits of 3 seats, 25 collections, and 5 flows; infrastructure is extra. Directus Cloud hosting is listed as a $99/month add-on for Core/Team. Eligible small organisations may qualify for the Open Innovation Grant: free self-hosted, or $99/month cloud hosting. | Strong fit. Provides a web Data Studio, auth, REST/GraphQL APIs, media/file management, granular permissions, Activity Log, item revisions, and revert. Its current Core limits are likely enough for this content model. | Need to operate the server, database, object storage, backups, and upgrades if self-hosted. Confirm the organisation qualifies for the grant/license terms. |
| **Payload self-hosted** | Open-source core: $0; hosting, database, object storage, email, and operations are extra. Payload Cloud deployment is currently paused for new projects, so do not base the plan on Cloud pricing. | Very strong fit for a TypeScript/Next.js developer. It provides an admin panel, built-in authentication, field/collection/global access control, uploads, REST/GraphQL/local APIs, and versions. `maxPerDoc` can cap stored versions, and versions can be enabled without drafts so changes publish immediately. | More engineering and backend ownership than Directus. The backend engineer must configure deployment, backups, uploads, auth policy, and cleanup correctly. |
| **Strapi self-hosted** | Community edition: $0, MIT-licensed, self-hosted. Strapi Cloud hosting starts at $35/month. CMS Growth is $45/month and includes Content History; Enterprise includes Audit Logs. Cloud hosting and CMS feature licensing are separate. | Good CMS/editor experience, media library, REST/GraphQL, RBAC, and content modelling. Content History retains versions for 14 days on Growth. | The exact requirement is split across paid tiers: Content History is Growth, while searchable Audit Logs are Enterprise. Community self-hosting is cheap but does not provide the complete requested history/audit experience out of the box. |
| **Sanity hosted** | Free: $0, up to 20 seats, 2 roles, public datasets, and 3-day history. Growth: $15/seat/month, private datasets, and 90-day history. Full audit trail/History API is Enterprise/custom. | Excellent managed editor and media/content modelling. Immediate publishing is easy. | It is vendor-hosted and the full audit trail is not available on Free/Growth. The free plan's public-dataset limitation may not suit private organisational content. |
| **Build a custom backoffice/backend** | No CMS licence fee; infrastructure and third-party auth/storage costs are extra. Total cost is mostly development, testing, security, maintenance, backups, and future support. | Exact fit is possible: one editor permission set, collections, RU-only globals, immediate publishing, and exactly four retained versions per record. | Highest implementation and long-term responsibility. Building the admin screens is manageable; securely building and maintaining auth, uploads, audit history, rate limiting, backups, and recovery is the expensive part. |

### What the prices mean in practice

- “$0 software” does not mean $0 total cost. A production deployment still needs compute, database, object storage/CDN for photos and videos, email delivery, backups, monitoring, and maintenance.
- For this small/simple workflow, a self-hosted Directus or Payload deployment is likely the lowest recurring software-cost route.
- Directus is the quickest route to a ready-made backoffice with activity/revision features.
- Payload is the best fit if the organisation wants the backend and admin experience to be deeply code-owned in the TypeScript/Next.js ecosystem.
- Strapi is worth considering only if its editor experience is preferred and the organisation accepts the extra Growth/Enterprise licensing needed for the required history/audit features.
- Sanity is attractive when managed hosting and a polished editor matter more than ownership of the backend and full auditability.

## Provisional recommendation

Evaluate these two first:

1. **Directus self-hosted/Core** for the fastest complete backoffice with built-in media management, permissions, activity records, revisions, and revert.
2. **Payload self-hosted** if we want the backend to remain a first-class TypeScript/Next.js codebase and are comfortable owning more infrastructure and implementation.

Do not build a custom CMS/auth system just to avoid a subscription. Build custom only if the organisation requires a highly branded editor, a non-standard content workflow, or backend behaviour that these systems cannot model cleanly.

## Content model to validate in a proof of concept

- `site_settings` — singleton/global; RU-only; heading, organisation name, location, Google Maps URL/coordinates, contact details, social links, SEO defaults.
- `gallery_items` — collection; CRUD; type `photo | video`, title/caption, alt text, media reference/embed URL, thumbnail, sort order, visibility/published flag if needed.
- `articles` — collection; CRUD; title, slug, excerpt, body, cover image, author/byline, publication date, SEO fields.
- `newsletters` — collection; CRUD; title, issue/date, summary, document/link or body, cover image, download URL.
- `media_assets` — either the CMS's media library or a controlled collection; define upload limits, allowed formats, size limits, alt text, and deletion behaviour.
- `content_revisions`/platform versions — retain at most 4 snapshots per item or field, including actor, timestamp, before/after or delta, and restore action. Add an automated cleanup job if the chosen platform only supports time-based retention.

## Backoffice behaviour

- Login page on the admin subdomain.
- Individual organisation user accounts; no shared credential.
- One editor permission set initially.
- CRUD screens for gallery, articles, newsletters, and media.
- Edit-only screens for singleton/site settings; no create/delete controls and backend validation that rejects those operations.
- Save/publish immediately after a successful update.
- Confirmation before destructive deletes.
- Show the last 2–4 revisions and allow restore where supported.
- Display change actor and timestamp.
- Search, filtering, pagination, empty states, upload progress, validation errors, permission-denied state, and failed-save recovery.
- Keep the admin UI and public website layouts separate even if they share a repository.

## Implementation TODO

- [ ] Confirm approximate number of editors and whether they use a common organisation email domain.
- [ ] Confirm whether photos/videos need an external object store/CDN and the expected monthly storage/bandwidth.
- [ ] Run a small Directus and Payload proof of concept using the content model above.
- [ ] Verify each candidate can enforce RU-only globals at the API/database layer.
- [ ] Verify immediate publish behaviour with the Next.js public site and cache invalidation/revalidation.
- [ ] Verify media upload limits, video handling, CDN delivery, and deletion/recovery behaviour.
- [ ] Verify four-version retention and restore behaviour; add cleanup if retention is time-based rather than count-based.
- [ ] Decide whether organisation login means email allowlist, Google/Microsoft login, or another identity provider.
- [ ] Agree the admin hostname, deployment boundary, database, storage, backup, monitoring, and incident-recovery plan.
- [ ] Document the content/API contracts before integrating the current frontend. The existing repository instructions already place authentication, persistence, uploads, permissions, and server-side business logic with the backend.
- [ ] Do not add an authentication library to this frontend until the backend authentication contract is agreed.

## Sources

- [Directus pricing and limits](https://directus.com/pricing)
- [Directus overview and self-hosting](https://directus.com/docs/getting-started/overview)
- [Directus Activity Log](https://docs.directus.io/user-guide/settings/activity-log)
- [Directus revisions](https://docs.directus.io/reference/system/revisions)
- [Payload overview](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Payload authentication](https://payloadcms.com/docs/authentication/overview)
- [Payload access control](https://payloadcms.com/docs/access-control/overview)
- [Payload versions and `maxPerDoc`](https://payloadcms.com/docs/versions/overview)
- [Payload Cloud status](https://payloadcms.com/cloud-pricing)
- [Strapi CMS pricing](https://strapi.io/pricing-cms)
- [Strapi Cloud pricing](https://strapi.io/pricing-cloud)
- [Strapi self-hosting](https://strapi.io/hosting)
- [Strapi Content History](https://docs.strapi.io/cms/features/content-history)
- [Strapi Audit Logs](https://docs-v5.strapi.io/cms/features/audit-logs)
- [Sanity pricing](https://www.sanity.io/pricing)
- [Sanity history retention](https://www.sanity.io/docs/user-guides/history-experience)
