# Vasavi Penugonda Revamp — Discovery Report

Generated: 2026-09-25T08:15:23.246640+00:00

## Inventory snapshot

- 17 successful HTML pages captured; 1 page-level failures.
- 183 unique asset references; 114 downloaded successfully; 45 same-origin assets failed or are unavailable.
- 64.1 MB of downloaded assets is available in the assets folder.

## Page routes

| Route | Text chars | Headings | Asset refs | Forms | Embeds |
|---|---:|---:|---:|---:|---:|
| `/` | 5,884 | 13 | 70 | 1 | 0 |
| `/index.php` | 5,884 | 13 | 70 | 1 | 0 |
| `/overview.php` | 4,696 | 31 | 60 | 1 | 4 |
| `/news.php` | 3,422 | 16 | 55 | 1 | 0 |
| `/news-letter.php` | 3,121 | 24 | 46 | 1 | 0 |
| `/vasavidham.php` | 9,983 | 30 | 66 | 1 | 0 |
| `/story.php` | 7,717 | 10 | 58 | 1 | 0 |
| `/donation_annadanam.php` | 2,030 | 8 | 46 | 2 | 0 |
| `/donation_goshala.php` | 2,428 | 7 | 47 | 2 | 0 |
| `/donation_ehundi.php` | 2,367 | 7 | 46 | 2 | 0 |
| `/team.php` | 9,761 | 42 | 80 | 1 | 0 |
| `/photos.php` | 1,188 | 13 | 45 | 1 | 0 |
| `/videos.php` | 1,249 | 6 | 48 | 1 | 3 |
| `/contact.php` | 1,119 | 9 | 46 | 2 | 1 |
| `/donations.php` | 1,892 | 7 | 48 | 1 | 0 |
| `/about.php` | 10,430 | 32 | 58 | 1 | 0 |
| `/privacy.php` | 4,839 | 6 | 36 | 1 | 0 |

## Functional scope found

- Information architecture: home, overview, news, newsletters, Vasavi Dham, story, trustees, photos, videos, contact, privacy, and donation hub.
- Donation flows: Annadanam, Go-Shala, and e-Hundi; each collects donor name, 10-digit phone, and amount, then posts to a shared `donation_add.php` endpoint before redirecting to a payment URL.
- Contact flow: client-side validation followed by JSON-like payload submission to `forms/contact.php`.
- Newsletter subscription: email submission to `forms/subscribe.php`.
- Media: photo galleries, 3 YouTube video embeds, Google Maps embeds, and externally hosted S3 images/PDFs.
- Content-heavy sections: event cards, historic milestones, project descriptions, trustee profiles, gallery albums, news articles, and downloadable newsletters/documents.

## Asset profile

- image/jpeg: 39
- image/png: 36
- text/javascript: 15
- text/css: 13
- application/pdf: 10
- image/gif: 1

## Technical observations

- Server: Apache with PHP 7.3.33 exposed in the response headers.
- Frontend: server-rendered PHP/HTML using Bootstrap, jQuery 1.12.4, jQuery UI, Owl Carousel, Isotope, Venobox/Fancybox, Font Awesome, Remix Icon, Icofont, and template-derived CSS.
- Current pages are largely hardcoded and share a repeated header/footer; the requested API-driven rebuild should introduce a content model and admin/editor workflow rather than simply porting markup.
- The current sitemap contains legacy duplicates and stale/broken references, so URL mapping, redirects, SEO metadata, and asset QA belong in the migration plan.

## Broken or risky references

- Page `https://vasavipenugonda.com/index.html` returned `404`.
- Asset `https://vasavipenugonda.com/assets/images/photos/16x9/7.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/vasavipenugonda.com/images/photos/Vasavi1.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/1.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/2.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/6.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/10.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/11` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/12.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/13.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/14.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/15.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/16.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/17.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/18.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/19.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/20.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/21.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/22.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/23.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/24.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/25.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/26.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/assets/img/team/27.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/images/about_img.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/images/Gotramandir_external.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/images/VIP_Block.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/images/2004.gif` returned `404`.
- Asset `https://vasavipenugonda.com/images/9_February_2005.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/31_January_2006.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/March_2006.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/7_May_2006_(2).png` returned `404`.
- Asset `https://vasavipenugonda.com/images/7_May_2006.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/7_May_2006_(4).png` returned `404`.
- Asset `https://vasavipenugonda.com/images/7_May_2006_(3).png` returned `404`.
- Asset `https://vasavipenugonda.com/images/16_September_2006.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/Jan_21_2007.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/Jan_2007.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/21_July_2007.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/10_September_2008_(2).png` returned `404`.
- Asset `https://vasavipenugonda.com/images/10_September_2008.png` returned `404`.
- Asset `https://vasavipenugonda.com/images/10_September_2008_(3).png` returned `404`.
- Asset `https://vasavipenugonda.com/images/Feb2009.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/images/hostel.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/images/tank.jpg` returned `404`.
- Asset `https://vasavipenugonda.com/images/solar.jpg` returned `404`.

## External services and endpoints

- `code.jquery.com` (34 references)
- `cdnjs.cloudflare.com` (18 references)
- `madzz-dev-bucket.s3.amazonaws.com` (18 references)
- `vs-infotech.co.in` (17 references)
- `fonts.googleapis.com` (17 references)
- `ajax.googleapis.com` (17 references)
- `www.youtube.com` (8 references)
- `www.google.com` (4 references)
- `vasavi-bucket.s3.amazonaws.com` (4 references)
- `www.instamojo.com` (2 references)
- `goo.gl` (1 references)

## Recommended content entities for the rebuild

1. Site settings / contact locations / social links
2. Pages and reusable sections
3. News articles and events
4. Newsletters and downloadable documents
5. Projects / milestones / timeline entries
6. Trustees / team members
7. Gallery albums and media items
8. Donation programs and payment configuration
9. Contact submissions and newsletter subscribers

## Scope boundary

This report inventories public responses only. It does not reveal the private database schema, admin panel, mail configuration, payment credentials, server logs, unpublished pages, or backend source code. Those need to be inspected with client-provided access before the final fixed quote.

## Candidate implementation work packages

- Discovery and information architecture
- Design system and responsive UI redesign
- API/backend/content model and admin workflow
- Frontend implementation and page migration
- Donation/payment and contact/newsletter integrations
- Media/document migration and cleanup
- SEO/redirects/accessibility/performance hardening
- QA, deployment, handover, and post-launch warranty
