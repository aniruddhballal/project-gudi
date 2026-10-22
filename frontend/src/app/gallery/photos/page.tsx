import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero, SectionHeading } from "@/components/public-page";
import { getSiteContent } from "@/lib/site-content";
import { Images, Upload } from "lucide-react";

export default async function PhotosPage() {
  const { home: homeContent, photos: photosContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.photos;
  return (
    <main id="main-content" className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={photosContent.title} description={copy.description} />

      <section className="page-grid border-b border-[#dfd9cd] bg-[#f0ece2] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.albumsEyebrow} title={copy.albumsTitle} description={copy.albumsDescription} /><div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{photosContent.albums.map((album) => <article key={album.title} className="rounded-xl bg-white p-6 shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#e2ddd1]"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f0e3] text-[#a44832] ring-1 ring-[#e2ddd1]" aria-hidden="true"><Images className="h-6 w-6" /></div><h2 className="display-type mt-5 text-2xl text-[#203b35]">{album.title}</h2><p className="mt-3 text-sm font-bold text-[#965b35]">{album.photoCount} {copy.photoLabel}</p><p className="mt-3 text-sm leading-6 text-stone-500">{copy.unavailable}</p></article>)}</div></div>
      </section>

      <section className="bg-[#eee4d3] px-4 py-12 sm:px-8 lg:px-12 lg:py-16"><div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-xl border border-[#cdb98c] bg-[#eee7da]/70 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c3c2e]">{copy.nextEyebrow}</p><h2 className="display-type mt-2 text-3xl text-[#203b35]">{copy.nextTitle}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#4d5b52]">{copy.nextDescription}</p></div><Upload className="h-8 w-8 text-[#a44832]" aria-hidden="true" /></div></section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
