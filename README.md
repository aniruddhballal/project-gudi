# Penu website project

The Vasavi Penugonda Temple Trust website project. It contains the public website, its Payload CMS backend, and the supporting research material.

## Repository structure

- [`frontend/`](./frontend) — Next.js public website
- [`backend/`](./backend) — Payload CMS, API, authentication, SQLite database, and media uploads
- [`rnd/`](./rnd) — discovery captures, pricing, planning notes, and utility scripts

## Run locally

Requirements: Node.js 20+ and pnpm 9+.

### 1. Start the backend

```bash
cd backend
cp .env.example .env
pnpm install
pnpm seed:content
pnpm dev
```

Open the CMS at [http://localhost:3000/admin](http://localhost:3000/admin) and create the first user.

### 2. Start the frontend

In a second terminal:

```bash
cd frontend
pnpm install
pnpm exec next dev --port 3001
```

Open the website at [http://localhost:3001](http://localhost:3001).

The frontend reads live content from the backend at `http://localhost:3000`. See each folder's README for detailed setup and development commands.
