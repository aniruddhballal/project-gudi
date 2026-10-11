import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero, SectionHeading } from "@/components/public-page";
import { getGalleryVideos, getSiteContent } from "@/lib/site-content";
import { ArrowRight, PlayCircle } from "lucide-react";

export default async function VideosPage() {
  const { home: homeContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.videos;
  const videos = await getGalleryVideos();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <section className="page-grid border-b border-[#e8ddd0] bg-[#f3eee6] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.sectionEyebrow} title={copy.sectionTitle} description={copy.sectionDescription} /><div className="mt-9 grid gap-6 md:grid-cols-2">{videos.map((video) => <article key={video.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#eadfd2]"><div className="aspect-video bg-[#2c1916]"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${video.id}`} title={video.title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div><div className="p-6"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a45826]"><PlayCircle className="h-4 w-4" /> {copy.sourceLabel}</p><h2 className="display-type mt-3 text-2xl text-[#3b241c]">{video.title}</h2><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center text-sm font-bold text-[#9d431f] hover:text-[#6e2c17]">{copy.open} <ArrowRight className="ml-2 h-4 w-4" /></a></div></article>)}</div></div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
