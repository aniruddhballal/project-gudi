# Original public page inventory

Generated from `discovery-fixed/site_inventory.json`. This is the migration and implementation tracker for the Penu frontend.

- Original endpoints discovered: **18**
- Reachable source endpoints: **17**
- Source endpoints returning 404: **1**
- Content complete: **14/18**
- Images complete: **11/18**
- Video/audio complete: **13/18**
- Frontend implementation complete: **14/18**
- API integration complete: **0/18**
- QA complete: **0/18**

Status columns track the new Penu frontend. Source capture means the old public endpoint was crawled; it does not mean the content has already been migrated into Penu.

| # | Original URL | Suggested Penu route | Area | Source | Content | Images | Video/audio | UI | API | QA | Source refs | Notes |
|---:|---|---|---|---|---|---|---|---|---|---|---:|---|
| 1 | `https://vasavipenugonda.com/` | `/` | public | ✅ (200) | ✅ | ✅ | — | ✅ | ⬜ | 🔍 | 70 | Primary public homepage. |
| 2 | `https://vasavipenugonda.com/about.php` | `/about` | public | ✅ (200) | ✅ | 🔍 | — | ✅ | ⬜ | 🔍 | 58 | Trust, Dham, objectives, construction, and completed projects; original /images/* refs returned 404 and recovered matching assets are used where available. |
| 3 | `https://vasavipenugonda.com/contact.php` | `/contact` | public | ✅ (200) | ✅ | — | — | ✅ | ⬜ | 🔍 | 46 | Contact details, map/location content, and contact form candidate. |
| 4 | `https://vasavipenugonda.com/donation_annadanam.php` | `/donations/annadanam` | donations | ✅ (200) | ✅ | ✅ | — | ✅ | ⬜ | 🔍 | 46 | Donation information and payment journey candidate. |
| 5 | `https://vasavipenugonda.com/donation_ehundi.php` | `/donations/e-hundi` | donations | ✅ (200) | ✅ | ✅ | — | ✅ | ⬜ | 🔍 | 46 | Donation information and payment journey candidate. |
| 6 | `https://vasavipenugonda.com/donation_goshala.php` | `/donations/goshala` | donations | ✅ (200) | ✅ | ✅ | — | ✅ | ⬜ | 🔍 | 47 | Donation information and payment journey candidate. |
| 7 | `https://vasavipenugonda.com/donations.php` | `/donations` | donations | ✅ (200) | ✅ | ✅ | — | ✅ | ⬜ | 🔍 | 48 | General donations landing page. |
| 8 | `https://vasavipenugonda.com/index.html` | `/` | legacy endpoint | ❌ (404) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0 | Original crawl returned 404; decide redirect or retirement. |
| 9 | `https://vasavipenugonda.com/index.php` | `/` | legacy endpoint | ✅ (200) | ✅ | ✅ | — | ✅ | ⬜ | 🔍 | 70 | Appears to duplicate the root homepage; preserve as a redirect candidate. |
| 10 | `https://vasavipenugonda.com/news-letter.php` | `/newsletter` | public | ✅ (200) | ✅ | — | — | ✅ | ⬜ | 🔍 | 46 | Newsletter/document listing; 9 public documents were captured locally and the remaining external-storage links are retained for review. |
| 11 | `https://vasavipenugonda.com/news.php` | `/news` | public | ✅ (200) | ✅ | 🔍 | — | ✅ | ⬜ | 🔍 | 55 | News listing and legacy article links/content; several article detail routes and external thumbnails were not independently captured. |
| 12 | `https://vasavipenugonda.com/overview.php` | `/overview` | public | ✅ (200) | ✅ | 🔍 | 🔍 | ✅ | ⬜ | 🔍 | 60 | Overview page with activities, events, map, videos, news, and donation content; several original external event/video thumbnails were unavailable in the public capture. |
| 13 | `https://vasavipenugonda.com/photos.php` | `/gallery/photos` | gallery | ✅ (200) | ✅ | — | — | ✅ | ⬜ | 🔍 | 45 | Seven photo album shells were exposed by the original page, all reporting 0 Photos; no album image payloads were available in the public capture. |
| 14 | `https://vasavipenugonda.com/privacy.php` | `/privacy` | legal | ✅ (200) | ✅ | — | — | ✅ | ⬜ | 🔍 | 36 | Legal/privacy content requiring review before publication. |
| 15 | `https://vasavipenugonda.com/story.php` | `/story` | public | ✅ (200) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 58 | Story, historic events, and downloadable publication content. |
| 16 | `https://vasavipenugonda.com/team.php` | `/trustees` | public | ✅ (200) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 80 | Trustee and executive member listings. |
| 17 | `https://vasavipenugonda.com/vasavidham.php` | `/vasavi-dham` | public | ✅ (200) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 66 | Trust and Dham information, projects, and facilities. |
| 18 | `https://vasavipenugonda.com/videos.php` | `/gallery/videos` | gallery | ✅ (200) | ✅ | — | ✅ | ✅ | ⬜ | 🔍 | 48 | Video embeds and video gallery media. |

## How to update progress

Update the status fields in `src/content/page-inventory.json`, then run:

```bash
python3 scripts/generate_penu_page_inventory.py
```

When the source inventory is intentionally refreshed, regenerate this file and review any newly discovered URLs before implementation.
