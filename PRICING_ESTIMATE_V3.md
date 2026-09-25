# Vasavi Penugonda Revamp — Pricing Estimate V3

## Important interpretation of Lalith's reference

The WhatsApp message in `lalith-pricing-test.md` describes a different subscription/video product. It is not the Vasavi scope, and its 11-week timeline is not being used as the Vasavi deadline.

It is useful only as a reference for:

- Splitting work into feature phases
- Creating payment gates after meaningful deliverables
- Keeping testing, deployment, training, and signoff as a separate final phase

The Vasavi roadmap below is based on the actual Vasavi requirements, the public-site discovery, the frontend-only responsibility, the backend dependency, and part-time availability.

## Actual frontend scope

The frontend engagement contains three connected deliverables:

1. A redesigned and hardcoded V1 public website
2. An API-driven V2 public website
3. A separate admin/CRM frontend for temple users

### Public V1

- Rebuild the current public website with a new UI, UX, and component system
- Deploy V1 to the alternate domain for temple review
- Migrate the visible content and media from the current site
- Rebuild current pages and visibly broken frontend functionality
- Include responsive layouts, accessibility, SEO metadata, redirects, and browser testing
- Support the agreed launch languages in the static version

### Public V2

- Replace hardcoded content with backend API responses
- Integrate pages, articles, news, events, documents, projects, trustees, galleries, images, videos, contact details, and donation content
- Add loading, empty, error, unavailable, and permission-aware UI states
- Integrate multilingual API data
- Integrate Razorpay/payment screens using backend-provided contracts
- Integrate the booking provider or booking APIs once confirmed
- Coordinate with the backend engineer when response structures and frontend requirements do not match

### Admin/CRM frontend

- Login and logout screens
- Two initial user types: temple users and a higher-level administrator
- Role-aware navigation and protected routes
- Dashboard and operational views
- Payment/donation logs with transaction status and devotee details
- CRUD for news, articles, events, images, photos, videos, documents, projects, trustees, and contact information
- Media upload and image cropping
- Drafts, publishing, edits, revisions, deletion recovery, search, filtering, sorting, and pagination
- Multilingual content editing where supported by the backend
- Responsive admin UI and browser testing

## Backend boundary

The backend engineer owns:

- API implementation
- Database and data model implementation
- Server and hosting infrastructure
- Authentication and authorization logic
- Razorpay secrets, order creation, webhooks, and backend payment processing
- Booking logic and third-party server integrations
- Backend deployment

The frontend scope still includes API contract coordination, data mapping, integration debugging, frontend validation, payment and booking UI states, and regression testing.

## Market basis

Current India-focused 2026 market references place:

- React/Next.js frontend work around ₹800–₹2,000 per hour in one published rate guide
- Dedicated React developers around ₹80,000–₹2,00,000 per month
- API-integrated web applications around ₹2,00,000–₹8,00,000
- Simple admin dashboards around ₹80,000–₹2,50,000
- Larger multi-role web applications with integrations around ₹8,00,000–₹18,00,000 before separating backend and frontend responsibilities

These are market anchors rather than guarantees. The Vasavi frontend scope is larger than a normal marketing website because it combines a redesigned public website, a second API-integration pass, multilingual content, payment/booking flows, and a role-based admin application.

Sources used as market references:

- [ITSolvez — India software development hourly rates](https://itsolvez.com/blog/software-development-hourly-rates-india)
- [Raafi Infotech — React development cost ranges in India](https://www.raafiinfotech.com/blog/reactjs-development-services-india-costs-use-cases-2026)
- [Selyst — India web application cost ranges](https://www.selyst.com/en-in/articles/services/web-application-development-costs-india-2026/)
- [The Mediaverse — India website redesign and CMS pricing](https://www.themediaverse.in/digital-marketing/blog/website-redesign-cost-india-vs-new-build)

## Effort basis

Estimated frontend effort, excluding backend implementation:

| Workstream | Estimated effort |
|---|---:|
| Discovery, architecture, content model coordination, and UX direction | 30–45 hours |
| V1 design, public frontend, migration, and static deployment | 180–240 hours |
| V2 API integration, multilingual data, payments, and public flows | 120–180 hours |
| Admin/CRM frontend | 180–260 hours |
| QA, SEO, accessibility, browser testing, handover | 60–80 hours |
| Backend coordination, reviews, meetings, and integration rework | 40–60 hours |
| **Total estimated frontend effort** | **610–865 hours** |

The estimate assumes the backend engineer provides usable API documentation, test responses, authentication contracts, payment contracts, and stable environments. API delays or repeated backend redesigns can extend the calendar duration.

## Recommended price

### Core frontend programme

**Ask: ₹15,00,000 + GST, if applicable**

This is the market-aligned fixed price for the defined frontend programme, excluding a custom booking system.

Recommended negotiation position:

- Opening ask: **₹15,00,000 + GST**
- Reasonable closing range: **₹13,50,000–₹14,50,000 + GST**
- Minimum: **₹12,00,000**, only if the client removes or defers major admin features, multilingual editing, or booking work

This price is based on approximately 610–865 hours, a blended freelance frontend rate, client review overhead, coordination with the backend engineer, and a controlled project-risk buffer. It is materially above a simple website quote but below pricing for a full agency-built web platform because backend, database, infrastructure, and server-side payment work are excluded.

### Booking add-on

Booking should not be silently included in the ₹15,00,000 core price until its scope is known.

- Third-party booking integration: **add ₹1,00,000–₹2,00,000**
- Custom booking frontend and workflow: **add ₹2,50,000–₹4,00,000**
- Full custom booking product with substantial backend coordination: price separately after requirements

### Post-handover support

Minimal defect support is included for the agreed warranty period. Ongoing frontend maintenance should be separate:

- Part-time maintenance retainer: **₹80,000–₹1,20,000 per month**
- Or bill additional work at the agreed hourly rate after handover

## Milestones and payment schedule

Use milestone payments rather than copying Lalith's exact percentages. The final 30% payment in his reference is too heavily weighted toward the end for a long frontend engagement.

| Milestone | Deliverable | % | Amount |
|---|---|---:|---:|
| Advance / Phase 0 | Discovery, architecture, route map, UX direction, API dependency plan | 15% | ₹2,25,000 |
| Phase 1 | V1 redesigned public website, migrated content, alternate-domain deployment | 25% | ₹3,75,000 |
| Phase 2 | V2 API-driven public website, multilingual integration, public payment/booking UI | 25% | ₹3,75,000 |
| Phase 3 | Admin/CRM frontend with auth UI, roles, logs, CRUD, media, publishing, revisions | 25% | ₹3,75,000 |
| Phase 4 | QA, accessibility, SEO, browser testing, production handover, training/documentation | 10% | ₹1,50,000 |
| **Total** |  | **100%** | **₹15,00,000** |

Payment should be released when each milestone is accepted, not merely when a calendar month ends. Each milestone should have a written list of included features and a maximum number of review rounds.

## Roadmap and realistic timeline

The following is a part-time roadmap. It is not an 11-week commitment.

### Phase 0 — Discovery and frontend foundation

**Estimated duration: 2–4 calendar weeks**

- Finalise page and content taxonomy
- Review the existing crawl and broken references
- Decide the frontend stack and project structure
- Define public and admin route maps
- Agree on launch languages
- Define API data requirements with Lalith
- Define the review/approval process with the temple representative
- Establish the alternate-domain development environment

### Phase 1 — V1 public website

**Estimated duration: 12–18 calendar weeks part-time**

- Create the visual direction and reusable design system
- Build public page templates and components
- Migrate current text, images, videos, documents, news, events, trustees, galleries, donations, and contact information
- Repair broken frontend links and visible interactions
- Implement responsive layouts and accessibility basics
- Add SEO metadata and redirect planning
- Deploy to the alternate domain
- Collect temple feedback and complete agreed review rounds

### Phase 2 — V2 API-driven public website

**Estimated duration: 8–14 calendar weeks part-time**

- Replace static data with API responses
- Integrate content, media, documents, galleries, news, events, and contact data
- Implement multilingual API data
- Integrate payment and donation flows
- Integrate booking provider/API if included
- Implement loading, empty, error, and retry states
- Complete integration regression testing

### Phase 3 — Admin/CRM frontend

**Estimated duration: 12–18 calendar weeks part-time**

- Authentication and protected routes
- Temple-user and administrator experiences
- Dashboard and payment/donation logs
- Content CRUD
- Media uploads and image cropping
- Draft, publishing, revision, recovery, search, filtering, and pagination flows
- Multilingual content editing where supported by the API
- Responsive and browser testing

### Phase 4 — QA, stabilization, and handover

**Estimated duration: 4–6 calendar weeks part-time**

- Cross-browser testing
- Responsive testing
- Accessibility fixes
- SEO and redirect validation
- Payment/booking sandbox testing
- Client acceptance fixes
- Production handover
- Documentation and basic training
- Minimal warranty support

### Overall calendar estimate

- At approximately 10–18 hours per week: **38–60 calendar weeks**, approximately 9–14 months
- At approximately 20–30 hours per week: **24–36 calendar weeks**, approximately 6–9 months
- The backend engineer's API readiness and the temple review cycle can extend the calendar duration without necessarily increasing the agreed price, unless the scope changes.

## Monthly alternative

If the client cannot agree to a fixed scope, use a monthly engagement instead of an unlimited fixed project:

- **₹1,00,000 per month** for approximately 15–20 hours per week
- Minimum commitment: 3 months
- Work prioritised from a mutually agreed backlog
- Unused hours do not roll over unless agreed in writing
- New features, custom booking work, and major redesigns consume the monthly allocation
- Review the backlog and remaining estimate at the end of each month

The fixed milestone model is preferable for the defined Vasavi scope. The monthly model is safer if the temple continues adding features or the backend API is not yet stable.

## Change-request rules

The following should trigger a revised estimate:

- Adding or removing launch languages
- Adding custom booking instead of third-party integration
- Adding devotee accounts or public user login
- Adding refunds, receipts, reconciliation, exports, or financial reports beyond the agreed payment-log UI
- Adding notifications, SMS, WhatsApp, email automation, or analytics dashboards
- Adding new public sections beyond the current site and approved backlog
- Changes to the approved design after signoff
- Repeated API contract changes after frontend integration begins
- More review rounds than agreed
- Content entry or translation work beyond the captured migration baseline

## Exclusions

- Backend/API implementation
- Database design and management
- Server, hosting, and infrastructure work
- Payment secrets, Razorpay order creation, webhooks, and backend reconciliation
- Backend authentication and authorization logic
- Backend booking logic
- Translation services unless separately agreed
- New photography or video production
- Mobile applications
- CRM/ERP integrations not listed in the approved scope
- Ongoing marketing or SEO retainers
- Unlimited revisions
- Long-term maintenance beyond the agreed warranty

## Final recommendation

Quote the core frontend programme at **₹15,00,000 + GST**, split into the five milestones above. Treat Lalith's 11-week demo only as inspiration for phase/payment structure, not as the Vasavi timeline.

Keep booking outside the core price until the third-party software and user journey are documented. If the project remains open-ended, use the ₹1,00,000/month model with a three-month minimum and revisit the roadmap monthly.
