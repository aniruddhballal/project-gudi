# Penu - Vasavi Penugonda Temple Trust website

Penu is a rebuild of the Vasavi Penugonda Temple Trust website, with a Next.js public frontend and a Payload CMS for maintaining the existing temple content.

CMS editors manage content within the available page fields and collections. Developers control the page structure, navigation, layouts, and design in code. The UI revamp preserves the source material while reorganising how visitors discover the temple, plan a visit, and explore seva.

## Public website

The public routes cover:

- Home and overview
- About the Trust, Vasavi Dham, and the story of Vasavi Mata
- Donations, Annadanam, E-Hundi, and Go Shala
- Photo and video galleries
- News, newsletters, and downloadable documents
- Trustees, contact details, locations, and privacy

The current interface includes a sticky header with a grouped Explore directory, a rebuilt homepage, responsive typography, and a distinct SVG ornament for each public page. The homepage photo collection uses masonry columns; the Photos page uses aligned album-cover cards. Vasavi Dham's completed projects are grouped into a year-by-year timeline, with undated projects kept separate.

The migration tracker at `/migration` records the original site's page inventory. Research captures, source assets, and planning material live in [`rnd/`](./rnd).

## Architecture and content

```text
CMS editors
    |
Payload admin and API -- SQLite and local media uploads
    |
Next.js public frontend
    |
Visitors
```

The frontend reads live page content, interface copy, articles, videos, and media from Payload through [`frontend/src/lib/site-content.ts`](./frontend/src/lib/site-content.ts). It has no static content fallback: the backend must be available to render the public pages.

Seed content and the editable copy dictionary live in [`backend/src/content/`](./backend/src/content/). The frontend contains typed API contracts and presentation logic. Local SVG ornaments are presentation assets rather than CMS content.

### CMS behaviour

- Page-specific globals hold editable content for the existing pages and site settings.
- Articles, videos, and media are repeatable collections.
- Authenticated CMS users share the same access level; changes publish immediately without an approval workflow.
- Page content, articles, and videos retain up to four versions for basic recovery.
- CMS editors cannot change routes or layouts; those changes belong in the frontend code.

### Current integration limits

- Payment processing, receipts, and donor records are not connected to the donation UI.
- Newsletter delivery and contact-form submission are not implemented.
- The captured Photos page supplied seven album names without album image payloads. Existing temple photos are used as illustrative covers, not verified records of those specific events. The eighth photo is untitled.
- The development backend uses SQLite and local media files. Production database/storage decisions, backups, secrets, email, monitoring, and hosting configuration remain deployment work.

## Repository structure

| Directory | Purpose |
| --- | --- |
| [`frontend/`](./frontend) | Next.js public website, UI components, styles, and browser checks |
| [`backend/`](./backend) | Payload CMS, users, content API, database configuration, media, and seed scripts |
| [`rnd/`](./rnd) | Legacy-site captures, discovery inventory, planning, and utility scripts |

The frontend and backend have separate dependencies and lockfiles. Install and run each from its own directory.

## Run locally

The backend declares Node.js `>=20.18.1` and supports pnpm 9, 10, or 11; see [`backend/package.json`](./backend/package.json) for its engine constraints.

### Backend

Copy [`backend/.env.example`](./backend/.env.example) to `backend/.env` and set `PAYLOAD_SECRET` to a long random value. The example uses a local SQLite database and the frontend URL `http://localhost:3001`.

From the repository root:

```bash
cd backend
pnpm install
pnpm seed:content
pnpm dev
```

Seed a fresh local environment before opening the site. Running `seed:content` again updates existing seeded content; it is not a routine startup step for an edited CMS database.

Open [http://localhost:3000/admin](http://localhost:3000/admin) and create the initial CMS user. The local database and uploaded media are ignored by Git.

### Frontend

In a second terminal, from the repository root:

```bash
cd frontend
pnpm install
pnpm exec next dev --port 3001
```

Open [http://localhost:3001](http://localhost:3001).

The frontend defaults to Payload at `http://localhost:3000`. To use another backend, set `PAYLOAD_API_URL` in `frontend/.env.local`:

```env
PAYLOAD_API_URL=http://localhost:3000
```

Keep the ports explicit: backend on 3000, frontend on 3001. Starting the frontend with plain `pnpm dev` can occupy port 3000 and prevent the default backend connection from working as intended.

## Design and implementation notes

- [Homepage content-preservation checklist](./frontend/docs/homepage-content-audit.md)
- [Unique ornament collection and visual references](./frontend/docs/ornament-collection.md) - browse the artwork locally at [the collection page](http://localhost:3001/ornaments/index.html)
- [Completed-projects timeline: data analysis and layout](./frontend/docs/completed-projects-timeline.md)
- [Legacy page inventory](./frontend/docs/page-inventory.md)
- [Frontend setup and commands](./frontend/README.md)
- [Backend setup and commands](./backend/README.md)

See [`frontend/AGENTS.md`](./frontend/AGENTS.md) and [`backend/AGENTS.md`](./backend/AGENTS.md) for development instructions in each application.

## Verification status

Playwright coverage exists for public routes, responsive layouts, content preservation, and key interactions. Recent UI iterations have not had a fresh full verification run; an earlier successful run does not establish that the latest branch passes. Review the application READMEs for the available lint, TypeScript, test, and build commands when verification resumes.

README reviewed against the repository on 17 November 2026.

The CMS now includes structured navigation, homepage editing tabs, explicit photo-album covers and photographs, and project date precision. See [backend editing and upgrade instructions](backend/README.md#editing-the-redesigned-website) before updating an existing database.
