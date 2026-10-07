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

## Commands

```bash
pnpm dev             # development server on port 3000
pnpm build           # production build
pnpm start           # serve the production build
pnpm seed:content    # seed/update local content and media
pnpm generate:types  # regenerate Payload TypeScript types
pnpm lint            # lint the project
```

## Environment

`.env.example` contains the local SQLite, Payload secret, and public frontend URL settings. Never commit `.env` or production secrets.
