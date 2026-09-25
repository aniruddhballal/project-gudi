# Vasavi Penugonda Revamp — Pricing Estimate V2

## Scope clarification

This is a substantially larger frontend engagement than the original estimate. The work is divided into three major deliverables:

1. A redesigned, hardcoded V1 public website
2. An API-driven V2 public website
3. A separate admin/CRM frontend for temple users

The backend engineer remains responsible for APIs, database, server, payment secrets, webhooks, hosting, and backend logic. The frontend scope still includes API coordination, data mapping, integration debugging, and handling loading, empty, error, and permission states.

## Frontend responsibilities

- Design and review the public website UI/UX
- Build and deploy the hardcoded V1 to the alternate domain
- Migrate the existing website content and media
- Rebuild and fix the functionality currently present on the website
- Integrate backend APIs for V2
- Integrate multilingual content
- Integrate Razorpay/payment flows on the frontend
- Integrate booking functionality
- Build the separate admin/CRM frontend
- Build authentication and role-based UI
- Build dashboards and payment/donation logs
- Build CRUD interfaces for website content and contact information
- Support media uploads, image cropping, drafts, publishing, revisions, deletion recovery, and search
- Handle responsive design, accessibility audits, SEO, redirects, browser testing, and handover

## Backend boundary

The following are outside the frontend implementation responsibility:

- API implementation
- Database design and management
- Server and hosting management
- Payment credentials and secrets
- Razorpay order creation and webhook processing
- Backend payment reconciliation logic
- Backend authentication and authorization logic
- Backend booking logic
- Backend deployment infrastructure

The frontend will still need to integrate these systems and coordinate with the backend engineer whenever API contracts, response structures, or business rules do not match the UI requirements.

## Recommended commercial position

- **Asking price:** ₹16,00,000 + GST, if applicable
- **Target closing price:** ₹14,50,000–₹15,00,000 + GST
- **Minimum price:** ₹12,50,000, only if booking is excluded and the admin scope is reduced
- **Third-party booking integration:** add approximately ₹1,00,000–₹2,00,000
- **Custom booking system:** add approximately ₹3,00,000–₹5,00,000

The previous ₹10,00,000 estimate is no longer appropriate because it did not fully account for the separate admin frontend, two public-site implementation passes, multilingual support, content migration, payment workflows, and booking uncertainty.

## Phase-wise pricing

| Phase | Scope | Amount |
|---|---|---:|
| 1 | Discovery, frontend architecture, UX direction, content planning | ₹1,50,000 |
| 2 | V1 redesigned static public website and content/media migration | ₹4,50,000 |
| 3 | V2 API integration, multilingual data, payments, and public flows | ₹3,00,000 |
| 4 | Admin/CRM frontend | ₹5,50,000 |
| 5 | QA, SEO, accessibility, deployment, documentation, and handover | ₹1,50,000 |
|  | **Total asking price** | **₹16,00,000** |

## Phase details

### Phase 1 — Discovery and frontend architecture

- Review the existing public website and captured inventory
- Finalise page taxonomy and frontend route structure
- Identify reusable page and component patterns
- Define the frontend data contracts required from the backend engineer
- Identify multilingual requirements
- Define public-site and admin-site navigation
- Map current URLs, redirects, broken content, and migration requirements
- Confirm design review and approval workflow with the temple representative

### Phase 2 — V1 redesigned static website

- Create the new visual direction and design system
- Build the public website with hardcoded frontend data
- Rebuild all currently functional public pages
- Repair visibly broken frontend functionality where possible
- Migrate current text, images, videos, PDFs, news, events, trustees, galleries, donations, and contact details
- Deploy the review version to the alternate domain
- Collect temple feedback and revise the UI before production approval
- Implement responsive behaviour and baseline accessibility, SEO, redirects, and browser compatibility

### Phase 3 — V2 API-driven public website

- Replace hardcoded content with backend API responses
- Integrate pages, news, events, documents, projects, trustees, galleries, videos, contact details, and donation content
- Implement loading, empty, error, and unavailable-content states
- Integrate multilingual content returned by the backend
- Integrate Razorpay-related frontend flows using backend-provided contracts
- Integrate booking functionality once the provider or backend contract is confirmed
- Coordinate with the backend engineer on mismatched response structures or missing fields
- Regression-test the public website against the V1 experience

### Phase 4 — Admin/CRM frontend

- Login and logout screens
- Role-aware navigation and protected frontend routes
- Temple-user and super-admin experiences
- Dashboard and operational summaries
- Donation/payment logs
- Payment state, transaction detail, devotee information, and payment history views
- CRUD interfaces for news articles, images, photos, videos, events, documents, projects, trustees, contact details, and other public content
- Media upload and image cropping interfaces
- Draft and published states
- Publishing controls
- Editing and revision interfaces
- Deletion recovery interfaces
- Search, filtering, pagination, and sorting
- Multilingual content editing interfaces where supported by the backend
- Responsive admin UI and browser testing

The exact admin price assumes that the backend engineer supplies the required authentication, permissions, CRUD, media, revision, publishing, and payment-log APIs.

### Phase 5 — QA, deployment, and handover

- Cross-browser testing
- Responsive testing across desktop, tablet, and mobile breakpoints
- Accessibility audit and fixes
- SEO metadata and redirect checks
- API integration regression testing
- Payment and booking flow testing using sandbox/test environments where available
- Client review fixes within the agreed review rounds
- Production handover
- Frontend documentation and setup instructions
- Minimal post-handover support for defects

## Timeline

Because the project is expected to be undertaken part-time:

| Workstream | Estimated duration |
|---|---:|
| V1 static website | 10–14 weeks |
| API-driven V2 | 8–12 weeks |
| Admin frontend | 12–18 weeks |
| Final QA and handover | 3–5 weeks |

### Overall estimate

- At approximately 10–18 hours per week: **32–45 calendar weeks**
- At approximately 20–30 hours per week: **22–30 calendar weeks**
- Full-time work could reduce this further, but the project remains dependent on backend readiness, content decisions, API stability, and temple review cycles.

Because there is no fixed launch deadline, the project should not be promised as a short fixed-duration build.

## Recommended engagement model

A phase-based contract or monthly retainer is safer than an unlimited fixed-fee commitment because the booking, payment, multilingual, and admin requirements are not fully specified.

Suggested part-time retainer range:

**₹80,000–₹1,20,000 per month**, depending on the agreed weekly availability and priority of deliverables.

Each phase should have:

- A defined scope
- A maximum number of review rounds
- A list of API dependencies
- A target completion window
- A change-request process
- A clear acceptance condition

## Information still required before the final fixed quote

1. Which languages are required at launch, and who provides the translations?
2. Is booking a third-party integration or a custom system?
3. Is frontend deployment and CI/CD handled by the backend engineer, or must it be configured as part of this work?
4. Which admin content types must be editable at launch?
5. Does payment management include refunds, receipts, exports, reconciliation, and webhook history, or only displaying payment records?
6. Is V1 expected to be fully production-ready, or primarily a review/staging version before V2?
7. How many review rounds should be included for the temple approver?

## Exclusions

Unless explicitly added through a change request, this estimate excludes:

- Backend/API implementation
- Database and server work
- Hosting and infrastructure management
- Payment-provider fees
- Custom booking-system backend logic
- Translation services
- New photography or video production
- Mobile applications
- CRM/ERP integrations beyond the specified admin frontend
- Ongoing marketing or SEO retainers
- Long-term maintenance beyond minimal defect support
- Unlimited revisions or open-ended feature additions

## Commercial recommendation

Present the project to the client as a staged frontend programme rather than a single website redesign. The recommended opening position is **₹16,00,000 + GST**, with the booking system and any major new functionality priced separately after its requirements are confirmed.
