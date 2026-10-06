# CMS notes

## Requirements

- Non-developer organisation users need a simple admin UI.
- CRUD: gallery photos, videos, articles, and newsletters.
- RU-only: always-present site settings such as heading, organisation details, and location.
- Fixed website structure; editors cannot change schemas or layouts.
- Immediate publishing; no approval workflow or role hierarchy.
- Individual user accounts, with one shared editor permission set.
- Keep only the last 2–4 content changes with actor and timestamp.

## WordPress — current option

**Choosing it for:** A complete, easy-to-use CMS/backoffice for non-developer organisation users.

**Pricing:** Approximately **$40–50/month** for managed hosting plus custom fields. WordPress itself is free. Video storage/bandwidth is extra.

**Features:**

- Individual user login and one editor role.
- CRUD: gallery photos, videos, articles, newsletters.
- RU-only: site settings/options page.
- Media uploads and immediate publishing.
- Built-in revision history, limited to approximately 4 revisions.
- Custom content types and permissions to protect the site structure.
- Familiar WordPress admin dashboard; no separate custom CMS UI initially.

**Sources:** [WordPress roles](https://wordpress.org/documentation/article/roles-and-capabilities/) · [WordPress revisions](https://wordpress.org/documentation/article/revisions/) · [ACF Pro pricing](https://www.advancedcustomfields.com/pro/)

## Directus — next option

**Choosing it for:** A structured, ready-made CMS/backoffice with strong permissions and built-in activity/revision tracking.

**Pricing:** Self-hosted Core is **$0/month** with a 3-seat limit. Directus Cloud is **$99/month**. Eligible small organisations may qualify for free self-hosting through the Open Innovation Grant.

**Features:**

- Web admin UI, individual login, and one editor role.
- CRUD collections for gallery, articles, and newsletters.
- Singleton/site settings for RU-only data.
- Media library, immediate publishing, REST/GraphQL APIs.
- Activity log, revisions, and restore.
- Fixed schema and granular permissions.

**Trade-off:** More database-like than WordPress, so the interface needs careful configuration for non-developer users. Self-hosting also requires maintenance.

**Sources:** [Directus pricing](https://directus.com/pricing) · [Directus overview](https://directus.com/docs/getting-started/overview) · [Activity Log](https://docs.directus.io/user-guide/settings/activity-log) · [Revisions](https://docs.directus.io/reference/system/revisions)
