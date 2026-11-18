# Penu backend

The Payload CMS backend for the Vasavi Penugonda Temple Trust website.

It provides:

- Admin UI and authentication
- Page-specific editable content globals
- Articles and videos
- Media uploads
- SQLite database for local development
- REST and GraphQL APIs consumed by the frontend
- Limited content history through Payload versions

## Requirements

- Node.js 20+
- pnpm 9+

## Setup

From the repository root:

```bash
cd backend
cp .env.example .env
pnpm install
pnpm seed:content
```

`seed:content` creates the local SQLite database, imports the captured media, and seeds the current website content. The database and uploaded media are local ignored files.

## Run locally

```bash
cd backend
pnpm dev
```

Open the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin). Create the first user there.

The backend API is available at [http://localhost:3000/api](http://localhost:3000/api).

## CMS organization

- `Pages` — editable content grouped by frontend page
- `Content` — articles, videos, and media
- `Settings` — site-wide settings
- `Access` — CMS users

## Editing the redesigned website

- **Settings > Site Settings > Navigation** controls the Explore groups, their order, link labels, desktop shortcuts, and menu button labels. Page paths must refer to existing routes; adding a menu item does not create a page. The Interface copy tab remains available for the other UI labels.
- **Pages > Home Page** separates the introduction, Trust and people, visitor links and contacts, photos, and event content into tabs. The public hero heading has its own field; the Trust's full name is preserved separately.
- **Pages > Photos Page** lets editors choose each album's cover, alt text, optional title, and actual photographs with captions. Existing covers are marked illustrative because they were selected from the homepage photographs rather than verified event albums. The final standalone image remains untitled. Legacy photo counts are retained as read-only source metadata; the public count uses actual attached photographs.
- **Pages > About / Vasavi Dham** retains each project's displayed date and adds date precision plus known year/month/day fields for timeline grouping. Choose "Date not known" for undated projects; do not invent dates. The displayed historical date remains the public wording, so update it alongside structured date parts when correcting a date.

## Upgrading an existing database

Stop the backend before upgrading and keep a database backup. Do not run the content seed over an edited database.

```bash
cd backend
pnpm upgrade:editorial
```

The upgrade handles the existing SQLite development database explicitly, avoiding development schema sync while changing album fields. It saves a SQLite backup before applying the schema and a JSON snapshot before populating new content fields. Both live in ignored `.cms-backups/`. It preserves source text, creates explicit cover relations, and populates only known project date parts. Running it again preserves saved editorial choices.

On a database managed by Payload migrations, apply `pnpm payload migrate` first, then run `pnpm upgrade:editorial` to populate the new fields. Do not apply the initial migration over an existing development database. Fresh local installations can continue using `seed:content`, which now seeds the structured fields too.

To recover a local upgrade, stop the backend and restore the saved database together with the matching application version. The JSON snapshot is a content reference, not a replacement for the full database backup. Uploaded media is unchanged by this upgrade.

## Commands

```bash
pnpm dev             # development server on port 3000
pnpm build           # production build
pnpm start           # serve the production build
pnpm seed:content    # seed/update local content and media
pnpm generate:types  # regenerate Payload TypeScript types
pnpm upgrade:editorial # safely populate redesigned CMS fields
pnpm lint            # lint the project
```

## Environment

`.env.example` contains the local SQLite, Payload secret, and public frontend URL settings. Never commit `.env` or production secrets.
