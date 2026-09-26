# Penu

Frontend wrapper for the Vasavi Penugonda temple website revamp.

The project is intentionally minimal. The implementation will proceed in two public-site passes:

- V1: redesigned frontend rendered from typed local mock data
- V2: the same frontend connected to the backend engineer's APIs

The frontend does not own the backend, database, hosting, payment secrets, webhooks, or server-side business logic.

Read [AGENTS.md](./AGENTS.md) before making changes. It contains the stack, architecture boundaries, and implementation rules for human and AI contributors.

The `/migration` page displays the original-site migration checklist from `src/content/page-inventory.json`. The source list and progress table are documented in [docs/page-inventory.md](./docs/page-inventory.md). The home page is the first endpoint rebuilt from the captured source content and assets.

## Start

```bash
pnpm install
pnpm dev
```
