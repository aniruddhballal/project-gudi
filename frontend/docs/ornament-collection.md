# Public-page ornament collection

All sixteen ornaments are original SVG drawings. The Contact lotus and upright Vasavi Dham lotus retain the previously approved silhouettes. Other pages use different constructions, rather than small petal-count variations.

| Route | SVG | Composition |
| --- | --- | --- |
| `/` | `public/ornaments/home.svg` | Welcome bloom |
| `/overview` | `public/ornaments/overview.svg` | Woven compass |
| `/about` | `public/ornaments/about.svg` | Stepped sanctuary |
| `/vasavi-dham` | `public/ornaments/vasavi-dham.svg` | Upright lotus |
| `/story` | `public/ornaments/story.svg` | Vine medallion |
| `/donations` | `public/ornaments/donations.svg` | Offering garland |
| `/donations/annadanam` | `public/ornaments/annadanam.svg` | Grain wreath |
| `/donations/e-hundi` | `public/ornaments/e-hundi.svg` | Woven diamond flower |
| `/donations/goshala` | `public/ornaments/goshala.svg` | Leaf wheel |
| `/gallery/photos` | `public/ornaments/photos.svg` | Iris blossom |
| `/gallery/videos` | `public/ornaments/videos.svg` | Turning scroll |
| `/news` | `public/ornaments/news.svg` | Sunburst medallion |
| `/newsletter` | `public/ornaments/newsletter.svg` | Four-scroll blossom |
| `/trustees` | `public/ornaments/trustees.svg` | Linked floral circle |
| `/contact` | `public/ornaments/contact.svg` | Layered lotus |
| `/privacy` | `public/ornaments/privacy.svg` | Interlaced seal |

The collection can be browsed at `/ornaments/index.html`. Route assignments live in `src/app/ornaments.css`. Shared page banners use `--banner-art`; custom home/donation heroes consume the same variable. The three donation detail pages are distinguished by `data-seva`. No source content, labels, destinations or media are changed.

## Visual references

- [Layered lotus mandala](https://tattvaayoga.com/yoga-retreat-in-rishikesh-india/): petal layering, fine nested borders and dotted edges.
- [Woven muggulu / rangoli](https://in.pinterest.com/pin/muggulu--8162843067014515/): looping arms, interlacing and floral tips.

Reference images are not included in the site. All shipped artwork is code-native SVG with no scripts, external resources, raster dependencies or animation. Banner ornaments remain hidden at narrower widths when that is needed to preserve reading space.

No tests or builds were run, following the user's instruction.
