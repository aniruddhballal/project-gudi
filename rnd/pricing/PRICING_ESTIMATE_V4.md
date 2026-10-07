# Vasavi Penugonda Revamp — Total Project Estimate V4

## Purpose

This version estimates the total project expense across both engineers:

- Frontend: Aniruddh
- Backend/API/platform: Lalith

Lalith's `../lalith-pricing-test.md` is treated as reference material only. Its 11-week schedule belongs to a different subscription/video project. It is used here only as inspiration for phase gates, milestone payments, testing, deployment, training, and signoff.

The Vasavi project is not being forced into an 11-week deadline.

## Project scope split

### Frontend — Aniruddh

#### V1 public website

- Redesigned public-facing UI/UX
- Hardcoded frontend implementation
- Alternate-domain deployment for temple review
- Migration of current visible content and media
- Rebuild of existing pages and visible broken functionality
- Responsive design, accessibility, SEO, redirects, and browser testing

#### V2 public website

- API-driven content and media rendering
- Loading, empty, error, retry, and unavailable states
- Multilingual content integration
- Public donation and payment flows
- Booking UI/integration once the provider or API is confirmed
- API coordination and integration debugging with Lalith

#### Admin/CRM frontend

- Login/logout and protected routes
- Temple-user and administrator experiences
- Dashboard views
- Payment/donation log screens
- CRUD interfaces for news, articles, events, media, documents, projects, trustees, galleries, and contact data
- Image uploads and cropping
- Drafts, publishing, revisions, deletion recovery, search, filtering, sorting, and pagination
- Multilingual content editing where supported by the backend

### Backend — Lalith

- Backend architecture and API design
- Database schema, migrations, and data storage
- Public content APIs
- Admin/CRM APIs
- Authentication and role-based authorization
- Temple-user and administrator permissions
- Payment order handling, Razorpay secrets, webhooks, payment state, and donation records
- Payment log, refund, receipt, reconciliation, and export services where approved
- Media/document storage and upload APIs
- Multilingual data model and content APIs
- Search, filtering, pagination, audit history, revision, publishing, and recovery services
- Booking integration or custom booking backend, depending on the final decision
- Server, hosting, deployment, monitoring, backups, security, and documentation

## Market basis

Current India-focused 2026 market references provide these broad anchors:

- React/Next.js frontend work: approximately ₹800–₹2,000/hour in one published rate guide
- Dedicated React developers: approximately ₹80,000–₹2,00,000/month
- Backend developers: approximately ₹600–₹3,000/hour for domestic Indian freelance work in one published benchmark
- API integration: approximately ₹40,000–₹1,50,000 for a single integration, with larger integration platforms priced materially higher
- Mid-complexity web applications with multiple roles and payment/API integrations: approximately ₹8,00,000–₹18,00,000 for the application before separating the two engineering workstreams
- Growth-tier custom web applications with multiple users, permissions, integrations, and reports: approximately ₹15,00,000–₹40,00,000

Sources used as market references:

- [ITSolvez — India software development hourly rates](https://itsolvez.com/blog/software-development-hourly-rates-india)
- [FreelanceRateIndia — backend developer rates](https://freelancerateindia.com/calculator/freelance-rate/backend-developer)
- [NexaEx — API development and integration costs](https://nexaex.in/blog/api-development-integration-cost-india)
- [Selyst — India web application cost ranges](https://www.selyst.com/en-in/articles/services/web-application-development-costs-india-2026/)
- [ITD GrowthLabs — custom web application cost and timelines](https://itdgrowthlabs.com/faqs/web-app-development.php)

These are market anchors, not fixed tariffs. The final price depends on actual API complexity, the number of languages, payment requirements, booking scope, traffic, security expectations, and the quality of the backend specification.

## Recommended engineering prices

### Frontend — Aniruddh

**Recommended quote: ₹15,00,000 + GST, if applicable**

This is the V3 frontend estimate for V1, V2, the admin frontend, migration, UX/UI, QA, SEO, accessibility, API integration, and handover. It excludes a custom booking product.

### Backend — Lalith

**Recommended core backend quote: ₹15,00,000 + GST, if applicable**

This assumes Lalith is building the backend/API/platform for:

- The public website content APIs
- The admin/CRM APIs
- Authentication and two role types
- Database and migrations
- Content, media, document, and multilingual services
- Razorpay/payment processing and donation records
- Payment logs and approved reporting functions
- Deployment, security, backups, monitoring, and documentation

This is a market-aligned midpoint for a multi-role, API-driven web application with payment integration. It is not a price for only a few REST endpoints.

## Core total project expense

| Workstream | Engineer | Recommended amount |
|---|---|---:|
| Public V1, public V2, admin frontend, migration, UI/UX, QA, handover | Aniruddh | ₹15,00,000 |
| APIs, database, authentication, CMS services, payments, media, deployment, backend QA | Lalith | ₹15,00,000 |
| **Core project build total** |  | **₹30,00,000 + GST** |

### Recommended commercial range

- Reasonable core project range: **₹27,00,000–₹34,00,000 + GST**
- Recommended proposal total: **₹30,00,000 + GST**
- Avoid quoting below **₹25,00,000** unless major modules are explicitly deferred

The ₹30,00,000 recommendation is not an agency-premium quote for an enterprise platform. It is a two-engineer build budget for two public-site implementations plus a separate content/admin system, with payment integration and production delivery.

## Backend phase-wise pricing

| Backend phase | Scope | Amount |
|---|---|---:|
| 1 | Architecture, database plan, API contract, content model, environments | ₹1,50,000 |
| 2 | Public APIs, content entities, media/documents, migration services | ₹4,00,000 |
| 3 | Authentication, roles, permissions, admin APIs, CRUD services | ₹2,50,000 |
| 4 | Razorpay, donations, webhooks, payment states, logs, reporting foundation | ₹2,50,000 |
| 5 | Multilingual data, search, revisions, publishing, recovery, audit support | ₹1,50,000 |
| 6 | Deployment, security, backups, monitoring, documentation, coordination buffer | ₹3,00,000 |
|  | **Core backend total** | **₹15,00,000** |

The backend amount assumes that booking is either deferred or handled as a separately priced integration.

## Booking additions

Booking is not included in the ₹30,00,000 core total because its scope is unknown.

### Third-party booking integration

| Workstream | Additional amount |
|---|---:|
| Frontend booking screens and integration | ₹1,00,000–₹2,00,000 |
| Backend booking integration, mapping, webhooks, and error handling | ₹1,00,000–₹1,50,000 |
| **Total third-party booking addition** | **₹2,00,000–₹3,50,000** |

Expected total with third-party booking: **₹32,00,000–₹33,50,000 + GST**.

### Custom booking system

| Workstream | Additional amount |
|---|---:|
| Frontend booking product | ₹2,50,000–₹4,00,000 |
| Backend booking product, availability, reservations, and operational APIs | ₹3,50,000–₹5,00,000 |
| **Total custom booking addition** | **₹6,00,000–₹9,00,000** |

Expected total with a custom booking system: **₹36,00,000–₹39,00,000 + GST**.

This excludes any third-party booking software licence, hotel inventory provider, payment fees, SMS, email, or WhatsApp charges.

## Shared milestone payment plan

The client should pay against accepted project milestones, not against an arbitrary 11-week calendar. The following model keeps both engineers funded as their work progresses:

| Milestone | Frontend share | Backend share | Combined payment |
|---|---:|---:|---:|
| 1. Discovery, architecture, data/API plan | ₹2,25,000 | ₹2,25,000 | ₹4,50,000 (15%) |
| 2. V1 public website and backend foundation | ₹3,75,000 | ₹3,75,000 | ₹7,50,000 (25%) |
| 3. V2 API-driven website and payment foundations | ₹3,75,000 | ₹3,75,000 | ₹7,50,000 (25%) |
| 4. Admin frontend and admin backend services | ₹3,75,000 | ₹3,75,000 | ₹7,50,000 (25%) |
| 5. QA, deployment, training, documentation, handover | ₹1,50,000 | ₹1,50,000 | ₹3,00,000 (10%) |
| **Total** | **₹15,00,000** | **₹15,00,000** | **₹30,00,000 (100%)** |

Each milestone should have:

- A written feature list
- API dependencies and acceptance criteria
- A maximum number of review rounds
- A definition of what constitutes signoff
- A change-request process

## Monthly alternative

Fixed milestone pricing is preferable for the core project. If the client wants an open-ended part-time arrangement, use separate monthly retainers:

- Frontend: **₹1,00,000/month** for approximately 15–20 hours/week
- Backend: **₹1,20,000–₹1,50,000/month** for approximately 15–20 hours/week
- Combined engineering budget: **₹2,20,000–₹2,50,000/month**
- Minimum commitment: 3 months

The monthly model should include a prioritised backlog and a clear monthly capacity. Unused hours should not automatically roll over. New features, custom booking, and major API redesigns should be estimated separately.

## Roadmap and realistic timeline

The project is part-time and does not have an 11-week deadline.

### Stage 0 — Joint discovery and planning

**2–4 calendar weeks**

- Confirm public routes, admin modules, languages, payment requirements, and booking scope
- Finalise frontend and backend ownership
- Define content entities and API contracts
- Agree on environments, review workflow, and milestone acceptance

### Stage 1 — V1 public website

**12–18 calendar weeks part-time**

- Frontend redesign and implementation
- Content/media migration
- Alternate-domain deployment
- Temple review and revisions
- Responsive, accessibility, SEO, redirect, and browser work

Lalith can build the backend foundation and data model in parallel, but V1 can remain hardcoded for review.

### Stage 2 — V2 API-driven public website

**8–14 calendar weeks part-time**

- Backend public APIs and frontend integration
- Multilingual responses
- Public donations/payment flows
- Media/document delivery
- Booking integration if approved
- Loading/error/empty states and regression testing

### Stage 3 — Admin/CRM system

**12–18 calendar weeks part-time**

- Backend auth, roles, permissions, CRUD, media, revisions, publishing, and payment services
- Frontend admin screens, protected routes, dashboards, forms, tables, logs, and responsive UI
- Joint integration testing

### Stage 4 — Stabilization and handover

**4–6 calendar weeks**

- Payment and booking testing
- Accessibility and browser checks
- Security and deployment checks
- Training, documentation, signoff, and warranty handover

### Overall calendar estimate

Because both engineers can work in parallel:

- At 10–18 hours/week each: approximately **38–60 calendar weeks**, or 9–14 months
- At 20–30 hours/week each: approximately **24–36 calendar weeks**, or 6–9 months
- Custom booking may add another **6–12 calendar weeks**, depending on requirements and third-party dependencies

The timeline depends on API readiness, decisions from the temple team, content approval, payment-provider access, and booking-provider documentation.

## Recurring and third-party costs

These are not engineering fees and should be paid directly by the client or added as pass-through expenses:

- Cloud hosting and managed database
- Object/media storage and CDN
- Domain and SSL, if not already covered
- Transaction fees charged by Razorpay or another payment provider
- Email/SMS/WhatsApp provider charges
- Third-party booking software or inventory-provider fees
- Monitoring, logging, backup, and security tools
- Any paid fonts, stock imagery, or translation services

Set aside an initial infrastructure allowance of approximately **₹50,000–₹1,50,000** for setup and a recurring operational allowance of approximately **₹5,000–₹25,000/month**, excluding payment transaction fees and booking-software licences. Lalith should validate these figures against the selected hosting architecture.

## Change requests

Re-estimate if the client adds:

- More launch languages than agreed
- Devotee accounts or public user login
- Refunds, receipts, reconciliation, or financial reporting beyond the agreed payment logs
- SMS, WhatsApp, email automation, or notification centres
- Custom booking instead of third-party booking
- Analytics dashboards or donor CRM features
- More public pages or content types than the approved backlog
- Major API contract changes after integration begins
- Additional review rounds or content entry beyond the migration baseline

## Final recommendation

For the current known scope, quote the project as:

- **Aniruddh/frontend:** ₹15,00,000 + GST
- **Lalith/backend:** ₹15,00,000 + GST
- **Core combined build:** **₹30,00,000 + GST**
- **With third-party booking:** approximately ₹32,00,000–₹33,50,000 + GST
- **With custom booking:** approximately ₹36,00,000–₹39,00,000 + GST

Use milestone payments for the core build. Use monthly retainers only if the client refuses to lock the backlog or if the API and booking requirements remain open-ended.
