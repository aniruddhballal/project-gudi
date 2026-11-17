# Homepage content preservation checklist

Baseline: the homepage at commit `8585d32`, before the homepage revamp. The authoritative runtime content remains the existing Payload API through `getSiteContent()`; `backend/src/content/home.ts` and `backend/src/content/site-copy.ts` provide the seed reference. This document records presentation requirements, not permission to edit source content.

Checked boxes below record the completed implementation review. Text remains sourced from the existing data without rewriting names, dates, spelling, punctuation, paragraph boundaries, or the Kannada message. Layout, order, and accessible disclosures have changed. The four fields listed as previously unrendered remain unrendered; their checked boxes mean the data was retained, not that a new homepage section was added.

## Main content

- [x] `home.siteTitle`: retain the full Trust name wherever identity is presented. The original homepage repeated it in the hero text, hero image caption, and footer.
- [x] `home.description`: retain the complete Trust purpose paragraph, with the existing `/about` destination and `copy.home.trustCta`.
- [x] All five `home.heroSlides`: retain every entry's image, title, description, and destination. Changing which slide receives the largest visual treatment is allowed.

| Baseline entry | Exact seed title | Destination | Seed media |
| --- | --- | --- | --- |
| 1 | Vasavi Penugonda Trust | `/overview` | `/legacy/home/hero/1.jpg` |
| 2 | Vasavidham | `/vasavi-dham` | `/legacy/home/hero/vasavi5.jpg` |
| 3 | Story of Vasavi Kanyakaparameshwari | `/story` | `/legacy/home/hero/3.jpg` |
| 4 | Seva details | `/donations` | `/legacy/home/hero/vasaviFull.jpg` |
| 5 | Trustees | `/trustees` | `/legacy/home/hero/vasaviFull1.jpg` |

- [x] Preserve the existing hero description: “A place of devotion, history, and community.”
- [x] Preserve the Vasavidham description, including “world’s tallest 90 ft. Panchaloha idol of Matha Vasavi.”
- [x] Preserve the Story description: “The divine story of Goddess Vasavi Kanyakaparameshwari.”
- [x] Preserve the Seva description: “Donate to Sevas to help bring Vasavi Dham to life.”
- [x] Preserve the Trustees description: “Details of the Vasavi Penugonda Trust’s office bearers.”
- [x] Retain the hero action (`copy.home.heroCta`) and visitor action (`copy.home.visitCta`, `/contact`).
- [x] `home.president.image`: retain the portrait and meaningful alternative text.
- [x] `home.president.kannada`: retain all five paragraphs, in their original order and original Kannada script.
- [x] `home.president.english`: retain all five paragraphs, in their original order, including the salutation and signature.
- [x] Retain president name and role from `copy.home.presidentName` and `copy.home.presidentRole`.
- [x] Retain the existing bilingual labels “ಕನ್ನಡ” and “English”, plus the introductory sentence “A message in Kannada and English.”
- [x] `home.event.name`: retain its exact text, including the unusual date range. The seed reads “19.07.2024 to 21.02.2024 - Guru Pournima Celebrations”. Do not silently repair dates, claim the event is current, or invent a replacement event.
- [x] `home.event.bulletinHref`: preserve the existing PDF action, with safe external-link behavior. Seed destination: `/legacy/home/documents/bulletin-7-2021.pdf`.
- [x] All four `home.majorLinks`: retain labels and destinations: Vasavidham → `/vasavi-dham`; Gallery → `/gallery/photos`; Donation → `/donations`; Contact Us → `/contact`.
- [x] Retain the introductory sentence “Explore the Trust, its history, places, and ways to take part.”
- [x] All 15 `home.greatSouls`: retain portraits, full names, every supplied role, and both supplied biographies. Do not discard people who lack a role or biography.

| # | Exact seed person name | Portrait | Additional text to preserve |
| --- | --- | --- | --- |
| 1 | LATE S. RAMA MURTHY, BANGALORE | `im1.jpg` | Role and complete biography |
| 2 | Dr. P.N. Govindarajulu | `im2.jpg` | Role and complete biography |
| 3 | Sri Konijeti Rosaiah | `im3.jpg` | Role |
| 4 | Sri D H Shankara Murthy | `im4.jpg` | Role |
| 5 | Sri G Mallikarjuna Rao | `im5.jpg` | Role |
| 6 | Sri K R Pradeep | `im6.jpg` | Role |
| 7 | Dr. Ramesh Makam | `im7.jpg` | Role |
| 8 | Dr. Saraswati Ramesh | `im8.jpg` | Role |
| 9 | Sri B K Manjunath | `im9.jpg` | Role |
| 10 | Sri Kotla Prasad Rao | `im10.jpg` | Name |
| 11 | Sri Vasanad Premnath Gopal | `im12.jpg` | Name |
| 12 | Sri D V Manjunath | `im13.jpg` | Role |
| 13 | Sri Satish | `im14.jpg` | Role |
| 14 | Sri Nagendra Kumar | `im15.jpg` | Role |
| 15 | Sri K S V Raja | `im16.jpg` | Role |

Portrait prefix: `/legacy/home/people/`. Runtime media URLs may be normalized by the existing data adapter; keep those adapter-provided URLs.

- [x] All eight `home.gallery` items: preserve images and their existing alternative text. Seed files: `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`, `8.jpg`, `9.jpg`, `10.jpg` under `/legacy/home/gallery/`.
- [x] Retain the full-gallery destination `/gallery/photos` and `copy.home.galleryCta`.
- [x] Both `home.contact` records: preserve names and every address/phone/mobile line. Trust Head Office has four lines; Vasavi Shanthi Dham has five.
- [x] Retain the visitor action to `/contact`; do not substitute the Bangalore office address for the Penugonda temple address.
- [x] Retain newsletter heading, description, email placeholder/label, Subscribe action, and existing backend-connection note. Do not claim subscription delivery is implemented.

## All homepage copy fields

These fields are rendered by the baseline homepage; retain their wording even if their positions change.

- [x] Hero: `heroEyebrow`, `heroCta`.
- [x] Exploration: `exploreEyebrow`, `exploreTitle`, `exploreDescription`.
- [x] Trust: `trustEyebrow`, `trustTitle`, `trustCta`.
- [x] President: `presidentEyebrow`, `presidentTitle`, `presidentName`, `presidentRole`.
- [x] Event: `eventEyebrow`, `eventCta`.
- [x] Further paths: `furtherEyebrow`, `furtherTitle`, `furtherCta`.
- [x] People: `soulsEyebrow`, `soulsTitle`, `soulsDescription`.
- [x] Gallery: `galleryEyebrow`, `galleryTitle`, `galleryCta`.
- [x] Visit: `visitEyebrow`, `visitTitle`, `visitCta`.
- [x] Newsletter: `newsletterEyebrow`, `newsletterTitle`, `newsletterDescription`, `newsletterPlaceholder`, `newsletterCta`, `newsletterNote`.
- [x] Baseline generated sequence labels: four featured-item numbers and four “Path” numbers. These are navigation/presentation helpers rather than temple source content; preserving every existing entry is mandatory even if numbering changes.

## Shared navigation and footer

- [x] Retain `siteSettings.siteTitle` and `siteSettings.logo`.
- [x] Header: preserve topbar label, Plan Your Visit destination `/contact`, Home, Story `/story`, Trustees `/trustees`, Contact the Trust `/contact`, and all supplied menu groups/items.
- [x] Menu coverage: `/overview`, `/news`, `/newsletter`, `/about`, `/vasavi-dham`, `/donations`, `/donations/annadanam`, `/donations/goshala`, `/donations/e-hundi`, `/gallery/photos`, `/gallery/videos`.
- [x] Preserve a working “Skip to content” destination and accessible mobile menu controls; retain open/close labels from the data.
- [x] Footer: retain eyebrow, tagline, full Trust identity, all Explore/Connect labels and links, copyright, and community note.
- [x] Footer destination coverage: `/overview`, `/story`, `/gallery/photos`, `/news`, `/donations`, `/contact`, `/privacy`.

## Data present but not rendered on the baseline homepage

These fields existed but were not rendered on the baseline homepage. Their data and contracts remain unchanged. None was newly added to the homepage during this revamp; the checks below confirm retention only.

- [x] `home.aims`: nine complete aims, including their emphasis fields; the `/about` page currently renders this collection.
- [x] `home.email`: `vasavipenugonda@gmail.com` in the seed; available for promotion without rewriting.
- [x] `home.president.title`: “President’s Message to Devotees” in the seed; the baseline uses SiteCopy heading fields instead.
- [x] `home.event.title`: “Upcoming Events” in the seed; the baseline uses `copy.home.eventEyebrow` instead.

## Recommended hierarchy using existing content only

1. Establish the actual place through the existing temple imagery and Trust identity. Give the existing Vasavidham / 90 ft. idol content enough scale to communicate what makes this destination distinctive.
2. Offer clear paths into visiting, learning the story, and participating through seva. The baseline places contact near the end and renders seva as one modest row, despite both being important visitor actions already represented in the content.
3. Bring the Trust's purpose close to those paths. Keep the exact purpose paragraph rather than inventing new claims, visitor statistics, opening hours, or religious facts.
4. Present existing notices/bulletins as a distinct, easily found item. Keep their exact source dates; do not imply dates have been verified or refreshed.
5. Use the gallery as evidence of the place, not a decorative afterthought. Preserve every image and its alt text.
6. Preserve the full president message and all Great Souls, while using clear reading layouts or accessible disclosures to avoid forcing visitors past long text before finding practical information.
7. Finish with the complete addresses and newsletter material, with a visitor route available much earlier as well.

## Implemented section mapping

| New section/component | Existing content preserved | Structural change |
| --- | --- | --- |
| `.home-hero` | First hero slide, its image/title/description/destination, hero eyebrow/action, visit action, full Trust identity and caption | Large image-led introduction; visit action remains available immediately |
| `.home-wayfinding` | All four major links, further-path headings/action, existing explanatory sentence | Moved from below the message/event to immediately after the hero |
| `#home-explore` / `.home-discovery` | Remaining four hero-slide records, exploration headings and description | Larger image features replace the compact list; every entry remains linked |
| `.home-purpose` | Complete Trust purpose paragraph, headings, `/about` action | Dedicated purpose section |
| `.home-bulletin` | Exact existing event name, date text, eyebrow, PDF destination and action | Distinct bulletin strip before the gallery; no event data correction |
| `.home-gallery-section` | All eight gallery images and alt texts, headings, full-gallery action | Gallery moved before the long messages and people; one existing image receives a wider presentation |
| `.home-message-section` | President portrait/name/role, bilingual introduction, all five Kannada and five English paragraphs | Two native `details` reading panels, both open initially, with `lang="kn"` and `lang="en"` |
| `.home-people-section` | All 15 people, every supplied role, both biographies, all portraits, headings/description | First two biography-bearing people receive larger articles; remaining 13 stay in the community grid |
| `.home-visit` | Both complete address records, headings, visitor action | Dedicated contact area; the early hero/wayfinding visitor paths provide faster access |
| `HomeNewsletter` | Every newsletter heading, description, label, placeholder, action, and integration note | Separate newsletter section; valid submission stays on the page and announces the existing note through a status message |
| `SiteHeader` / `SiteFooter` with `appearance="home"` | Existing identity, labels, menu items, routes, footer text and copyright | Homepage-specific appearance; content remains data-driven |

The new scroll cue to `#home-explore` is a navigation affordance labelled with the existing exploration eyebrow. No temple facts, opening hours, attendance figures, event replacements, or delivery claims were invented.

## Verification record

- [x] Baseline page, shared header/footer, data types, adapter, seed content, and seed SiteCopy inspected.
- [x] New implementation mapped against every item above.
- [x] Runtime text, collection entries, media paths, and required destinations compared with the redesigned rendering by `tests/homepage.spec.ts`; source text matching normalizes whitespace, while code inspection confirms unchanged field/paragraph rendering.
- [x] Every existing homepage destination and bulletin action retained; header/footer route coverage additionally confirmed in source inspection.
- [x] Responsive homepage checks cover 320, 390, 768, and 1440px widths without horizontal overflow. The implementation owner also captured desktop and mobile screenshots; text and image styles were inspected for clipping in this audit.
- [x] Full Kannada and English messages remain inside native `details`/`summary` controls, with no custom keyboard handling that suppresses native access. Both panels start open; browser QA verifies closing and reopening the English panel. A separate keyboard-only disclosure interaction is not asserted by the test suite.
- [x] Newsletter retains its existing integration limitation without falsely claiming a successful subscription; valid submission prevents navigation and exposes the same existing note as a status message. Email remains required and uses native email validation.

Source-content files, Payload schemas, seed records, data adapter contracts, and other routes must not be changed solely to fit the new presentation.

Final browser verification: all four homepage checks and all five existing public-site checks passed in Chromium, Firefox, and WebKit (27 cases). One WebKit route traversal was interrupted by a development reload during formatting and passed on an isolated rerun. Additional visual checks covered 320, 390, 768, 1024, 1280, and 1440px; mobile navigation and footer link targets were enlarged. This document does not assert that a backend subscription API, payment integration, or new content migration was completed.
