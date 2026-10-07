# Penu — Vasavi Penugonda Temple Trust website

Penu is a rebuild of the Vasavi Penugonda Temple Trust website. It replaces the original legacy public site with a modern Next.js frontend and adds a Payload CMS backoffice so non-developers can maintain the site's content.

The project is designed around a fixed website structure: CMS users can edit content inside the existing pages, but they cannot change the site's layout, routes, or design system.

## What the website includes

The public frontend currently contains:

- Home and overview pages
- Trust, temple, story, and Vasavi Dham information
- Donations, Annadanam, E-Hundi, and Go-Shala pages
- Photo and video galleries
- News and articles
- Newsletters and documents
- Trustee information
- Contact and location information
- Privacy page
- Migration tracker for the original site's page inventory

The original site's captured pages, assets, and content were used as the basis for the rebuild. The migration research and pricing history are kept in [`rnd/`](./rnd).

## CMS and content model

The backend is a Payload CMS application with a local SQLite database for development.

### Fixed page content

Existing page content is split into page-specific globals in the CMS, such as Home, About, Contact, News, Story, Trustees, and Donations. These records always exist and can only be updated.

### Repeatable content

Articles, videos, and media are collections. CMS users can create, edit, and delete these records.

### CMS behaviour

- All CMS users have the same access level.
- Changes are published immediately.
- There is no approval or rejection workflow.
- The website structure and frontend layout cannot be changed from the CMS.
- Page globals, articles, and videos keep up to four versions for basic recovery/history.

## Architecture

```text
CMS users
    ↓
Payload admin + API  ←→  SQLite database and uploaded media
    ↓
Next.js frontend
    ↓
Public website
```

The frontend reads its live page content, articles, videos, and media from the backend. It has no static content fallback, so the backend must be running during local development.

## Repository structure

- [`frontend/`](./frontend) — Next.js public website
- [`backend/`](./backend) — Payload CMS, authentication, API, database, and media uploads
- [`rnd/`](./rnd) — discovery captures, source inventory, pricing, planning notes, and utility scripts

## Run locally

Requirements: Node.js 20+ and pnpm 9+.

### Start the backend

```bash
cd backend
cp .env.example .env
pnpm install
pnpm seed:content
pnpm dev
```

Open the CMS at [http://localhost:3000/admin](http://localhost:3000/admin). On first run, create the initial CMS user.

### Start the frontend

In a second terminal:

```bash
cd frontend
pnpm install
pnpm exec next dev --port 3001
```

Open the public site at [http://localhost:3001](http://localhost:3001).

Start the backend before the frontend. The frontend reads live content from Payload at `http://localhost:3000`, while the frontend runs on `http://localhost:3001`. If the frontend starts first and takes port 3000, the backend will move to another port and the frontend will not connect automatically.

See [`frontend/README.md`](./frontend/README.md) and [`backend/README.md`](./backend/README.md) for detailed commands and environment configuration.

## Current project status

The frontend-to-CMS connection is implemented and tested locally. The current backend uses SQLite and local media storage for the proof of concept. Production deployment still requires a production database, durable media storage, backups, secrets, email, monitoring, and hosting configuration.
