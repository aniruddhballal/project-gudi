# Penu frontend

The public Vasavi Penugonda Temple Trust website, built with Next.js, React, TypeScript, and Tailwind CSS.

The frontend reads all live page content, articles, videos, and media from the Payload backend. It does not contain a fallback content source.

## Requirements

- Node.js 20+
- pnpm 9+
- The backend running on `http://localhost:3000`

## Setup

From the repository root:

```bash
cd frontend
pnpm install
```

The default backend URL is `http://localhost:3000`. To use another URL, create `frontend/.env.local`:

```env
PAYLOAD_API_URL=http://localhost:3000
```

## Run locally

Start the backend first, then run the frontend in a second terminal:

```bash
cd frontend
pnpm exec next dev --port 3001
```

Open [http://localhost:3001](http://localhost:3001).

## Commands

```bash
pnpm dev          # default Next.js development server
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # lint the project
pnpm typecheck    # run TypeScript checks
pnpm test:e2e     # run Playwright tests
```

See [AGENTS.md](./AGENTS.md) for architecture and contribution rules.
