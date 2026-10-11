import { ContentImage } from "@/components/content-image";
import { PageHero, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getNewsItems, getSiteContent } from "@/lib/site-content";
import { ArrowRight, Newspaper } from "lucide-react";

export default async function NewsPage() {
  const { home: homeContent, news: newsContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.news;
  const newsItems = await getNewsItems();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={newsContent.title} description={copy.description} />

      <section className="page-grid border-b border-[#e8ddd0] bg-[#f3eee6] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.sectionEyebrow} title={copy.sectionTitle} description={copy.sectionDescription} /><div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{newsItems.map((item) => <article id={`article-${item.id}`} key={item.id} className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#eadfd2]"><div className="flex items-center justify-center overflow-hidden border-b border-[#eadfd2] bg-[#fbf2e6] p-5">{item.image ? <ContentImage src={item.image} alt={item.title} className="h-auto max-h-[22rem] w-auto max-w-full object-contain" /> : <div className="flex min-h-40 items-center justify-center text-center text-sm text-stone-500">{copy.unavailableImage}</div>}</div><div className="flex flex-1 flex-col p-6"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a45826]"><Newspaper className="h-4 w-4" /> {item.date}</p><h2 className="display-type mt-3 text-2xl text-[#3b241c]">{item.title}</h2><p className="mt-3 text-sm leading-7 text-stone-600">{item.summary}</p>{item.details.length > 0 && <details className="mt-4 text-sm text-stone-600"><summary className="cursor-pointer font-semibold text-[#9d431f]">{copy.readMore}</summary><div className="mt-3 space-y-3 leading-7">{item.details.map((detail) => <p key={detail}>{detail}</p>)}</div></details>}<div className="mt-auto pt-6">{item.href ? <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-bold text-[#9d431f] hover:text-[#6e2c17]">{copy.openItem} <ArrowRight className="ml-2 h-4 w-4" /></a> : item.sourceImage ? <p className="text-xs leading-5 text-stone-400">{copy.sourceLabel}: {item.sourceImage}</p> : <p className="text-xs text-stone-400">Legacy article id: {item.id}; {copy.missingDetail}</p>}</div></div></article>)}</div></div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
