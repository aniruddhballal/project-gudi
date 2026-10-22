import { ContentImage } from "@/components/content-image";
import { PageHero, PrimaryLink, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import { BookOpen, CheckCircle2 } from "lucide-react";

export default async function StoryPage() {
  const { home: homeContent, story: storyContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.story;
  return (
    <main className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={storyContent.title} description={copy.description} />

      <section className="px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-xl bg-[#183a34] p-6 text-white shadow-[0_18px_50px_rgba(78,42,24,0.12)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300"><BookOpen className="h-4 w-4" /> {copy.publicationEyebrow}</p><h2 className="display-type mt-2 text-3xl">{storyContent.publication.title}</h2><p className="mt-2 text-sm text-[#f5e5d5]">{storyContent.publication.note}</p></div>
          <PrimaryLink href={storyContent.publication.href} external>{copy.openPublication}</PrimaryLink>
        </div>
      </section>

      <section className="page-grid border-y border-[#dfd9cd] bg-[#f0ece2] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-14">
          <div className="flex items-center justify-center rounded-xl bg-[#f6f0e3] p-5 ring-1 ring-[#e2ddd1] sm:p-8"><ContentImage src={storyContent.coverImage ?? "/legacy/story/1.png"} alt={copy.coverAlt} className="h-auto max-h-[36rem] w-auto max-w-full rounded-xl object-contain" /></div>
          <div className="rounded-xl bg-white p-7 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#e2ddd1] sm:p-9"><SectionHeading eyebrow={copy.beginningEyebrow} title={copy.beginningTitle} /><div className="mt-7 space-y-5 text-base leading-8 text-stone-700">{storyContent.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl"><SectionHeading eyebrow={copy.historicEyebrow} title={copy.historicTitle} /><div className="mt-8 space-y-5">{storyContent.historicEvents.map((paragraph, index) => <article key={paragraph} className="flex gap-4 rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(78,42,24,0.05)] ring-1 ring-[#e2ddd1] sm:p-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dfbd7a] text-sm font-bold text-[#203b35]">{String(index + 1).padStart(2, "0")}</span><p className="text-sm leading-7 text-stone-700">{paragraph}</p></article>)}</div></div>
      </section>

      <section className="bg-[#eee4d3] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.narrativeEyebrow} title={copy.narrativeTitle} /><div className="mt-9 space-y-6">{storyContent.narrative.map((chapter, index) => <article key={chapter.image} className="grid gap-6 rounded-xl bg-[#eee7da]/80 p-5 ring-1 ring-[#cdb98c] sm:grid-cols-[minmax(0,18rem)_1fr] sm:items-center sm:p-7"><div className="flex items-center justify-center rounded-xl bg-[#f6f0e3] p-4"><ContentImage src={chapter.image} alt={copy.chapterAlt} className="h-auto max-h-72 w-auto max-w-full object-contain" /></div><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#965b35]"><CheckCircle2 className="h-4 w-4" /> {copy.chapterLabel} {String(index + 1).padStart(2, "0")}</p><p className="mt-4 text-base font-semibold leading-8 text-[#4d5b52]">{chapter.text}</p></div></article>)}</div></div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-4xl rounded-xl bg-white p-7 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#e2ddd1] sm:p-10"><p className="text-base leading-8 text-stone-700">{storyContent.closing}</p><div className="mt-7"><PrimaryLink href="/donations">{copy.closingAction}</PrimaryLink></div></div></section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
