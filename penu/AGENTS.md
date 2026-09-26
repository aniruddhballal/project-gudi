# Penu frontend instructions

This is the frontend for the Vasavi Penugonda temple website revamp. The backend, database, server, hosting, payment secrets, webhooks, and server-side business logic belong to the backend engineer. Do not invent or implement those responsibilities in this project.

## Stack

- Next.js App Router
- TypeScript with strict mode
- React
- Tailwind CSS v4 for styling
- shadcn/ui for reusable UI primitives, customised to the temple design system
- `next-intl` for interface translations and locale-aware routing
- React Hook Form + Zod for forms and client-side validation
- TanStack Query for admin dashboards, mutations, filters, and other interactive API-heavy views
- Native `fetch` for server-side data fetching where possible
- `next/image` for local and remote image rendering
- Lucide React for icons unless the design requires another icon set
- Playwright for end-to-end browser testing

## Product phases

1. V1: redesigned public website using typed local mock data. This is a real frontend implementation, not disposable static HTML.
2. V2: replace the mock data adapter with the backend engineer's APIs. Preserve the UI and loading, empty, error, validation, and permission states.
3. Admin frontend: login, role-aware navigation, payment/donation logs, content CRUD, media uploads, drafts, publishing, revisions, recovery, search, and filtering. The backend owns authentication, permissions, persistence, uploads, and payment processing.

## Architecture rules

- Build reusable components from data contracts, not page-specific hardcoded markup.
- Keep mock data and API data behind the same typed interfaces.
- Keep API calls in `src/lib/api/`; do not scatter URLs throughout components.
- Keep validation schemas in `src/lib/validation/` and shared domain types in `src/types/`.
- Use Server Components for public content unless interactivity requires a Client Component.
- Use Client Components only where necessary: forms, menus, galleries, filters, payment states, and admin interactions.
- Do not put Razorpay secrets, webhook handling, database queries, or backend credentials in this project.
- Do not add an authentication library until the backend authentication contract is agreed. Integrate with the backend's approved cookie/session or token flow.
- Do not duplicate the V1 and V2 applications. Change the data adapter, not the page implementation.
- Keep public and admin layouts separate. Split into separate deployable apps only if hosting or authentication requirements make that necessary.
- Confirm image storage, upload, pagination, filtering, locale, error, and permission response shapes with the backend engineer before finalising API hooks.

## Initial structure

```text
src/
  app/
    [locale]/
      (public)/
      admin/
  components/
    ui/
    public/
    admin/
  content/
    mock/
  lib/
    api/
    auth/
    i18n/
    validation/
  types/
```

The starter currently contains the wrapper and a source-page migration tracker. Add the route taxonomy after reviewing the captured site inventory and agreeing on the redesigned information architecture.

## Source page migration tracker

- `src/content/page-inventory.json` is the machine-readable tracker used by the starter page.
- `docs/page-inventory.md` is the human-readable checklist.
- The tracker currently contains 18 original endpoints: 17 reachable pages and 1 endpoint that returned 404.
- `discovery-fixed/site_inventory.json` remains the source crawl; captured source material is not the same as migrated Penu content.
- Update `contentStatus`, `imageStatus`, `videoAudioStatus`, `frontendStatus`, `apiStatus`, and `qaStatus` as work advances.
- Refresh the generated tracker with `python3 scripts/generate_penu_page_inventory.py`; existing progress statuses are preserved by URL.

## Quality requirements

- Responsive layouts for mobile, tablet, and desktop.
- Semantic HTML, keyboard navigation, visible focus states, useful alt text, and accessible form errors.
- Metadata, canonical URLs, Open Graph data, sitemap, robots rules, and redirect mapping where applicable.
- Loading, empty, error, not-found, and permission-denied states for API-backed screens.
- Browser testing with Chromium, Firefox, and WebKit before handover.
- Keep content, UI labels, and API fields typed; avoid `any` unless a boundary is explicitly documented.

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```
