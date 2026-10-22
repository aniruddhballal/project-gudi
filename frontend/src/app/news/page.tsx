import { ContentImage } from "@/components/content-image";
import { PageHero, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getNewsItems, getSiteContent } from "@/lib/site-content";
import { ArrowRight, Newspaper } from "lucide-react";

function formatNewsDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

export default async function NewsPage() {
  const { home: homeContent, news: newsContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.news;
  const newsItems = await getNewsItems();
  return (
    <main className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={newsContent.title} description={copy.description} />

      <section className="page-grid border-b border-[#dfd9cd] bg-[#f0ece2] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl"><SectionHeading eyebrow={copy.sectionEyebrow} title={copy.sectionTitle} description={copy.sectionDescription} /></div>
          <div className="mt-9 divide-y divide-[#e2ddd1] overflow-hidden rounded-xl bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#e2ddd1]">
            {newsItems.map((item) => <article id={`article-${item.id}`} key={item.id} className="flex flex-col gap-5 p-6 sm:flex-row sm:gap-8 sm:p-8">
              <div className="flex shrink-0 items-start gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#965b35] sm:w-32 sm:flex-col sm:gap-1"><Newspaper className="h-4 w-4" /><time dateTime={item.date}>{formatNewsDate(item.date)}</time></div>
              <div className="min-w-0 flex-1"><h2 className="display-type text-2xl text-[#203b35] sm:text-3xl">{item.title}</h2><p className="mt-3 text-sm leading-7 text-stone-600">{item.summary}</p>{item.details.length > 0 && <details className="mt-4 text-sm text-stone-600"><summary className="cursor-pointer font-semibold text-[#a44832]">{copy.readMore}</summary><div className="mt-3 space-y-3 leading-7">{item.details.map((detail) => <p key={detail}>{detail}</p>)}</div></details>}{item.href && <a href={item.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center text-sm font-bold text-[#a44832] hover:text-[#6e2c17]">{copy.openItem} <ArrowRight className="ml-2 h-4 w-4" /></a>}</div>
              {item.image && <div className="flex w-fit shrink-0 items-center justify-center self-start rounded-xl bg-[#f6f0e3] p-3 ring-1 ring-[#e2ddd1] sm:w-40"><ContentImage src={item.image} alt={item.title} className="h-auto max-h-32 w-auto max-w-full object-contain" /></div>}
            </article>)}
          </div>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
