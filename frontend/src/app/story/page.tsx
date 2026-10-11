import { ContentImage } from "@/components/content-image";
import { PageHero, PrimaryLink, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import { BookOpen, CheckCircle2 } from "lucide-react";

export default async function StoryPage() {
  const { home: homeContent, story: storyContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow="History and devotion" title={storyContent.title} description="A story of courage, devotion, and the enduring place of Vasavi Maatha in the community." />

      <section className="px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[1.5rem] bg-[#2c1916] p-6 text-white shadow-[0_18px_50px_rgba(78,42,24,0.12)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300"><BookOpen className="h-4 w-4" /> Read the publication</p><h2 className="display-type mt-2 text-3xl">{storyContent.publication.title}</h2><p className="mt-2 text-sm text-[#f5e5d5]">{storyContent.publication.note}</p></div>
          <PrimaryLink href={storyContent.publication.href} external>Open publication</PrimaryLink>
        </div>
      </section>

      <section className="page-grid border-y border-[#e8ddd0] bg-[#f3eee6] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-14">
          <div className="flex items-center justify-center rounded-[1.5rem] bg-[#fbf2e6] p-5 ring-1 ring-[#eadfd2] sm:p-8"><ContentImage src={storyContent.coverImage ?? "/legacy/story/1.png"} alt="Vasavi story illustration" className="h-auto max-h-[36rem] w-auto max-w-full rounded-xl object-contain" /></div>
          <div className="rounded-[1.5rem] bg-white p-7 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#eadfd2] sm:p-9"><SectionHeading eyebrow="The beginning" title="A story carried across generations" /><div className="mt-7 space-y-5 text-base leading-8 text-stone-700">{storyContent.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl"><SectionHeading eyebrow="Vasavi Maatha&apos;s historic events" title="Moments that shaped the story" /><div className="mt-8 space-y-5">{storyContent.historicEvents.map((paragraph, index) => <article key={paragraph} className="flex gap-4 rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(78,42,24,0.05)] ring-1 ring-[#eadfd2] sm:p-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5c66b] text-sm font-bold text-[#3b241c]">{String(index + 1).padStart(2, "0")}</span><p className="text-sm leading-7 text-stone-700">{paragraph}</p></article>)}</div></div>
      </section>

      <section className="bg-[#ead6b4] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Goddess Vasavi&apos;s story" title="A chapter-by-chapter telling" /><div className="mt-9 space-y-6">{storyContent.narrative.map((chapter, index) => <article key={chapter.image} className="grid gap-6 rounded-[1.5rem] bg-[#f8edda]/80 p-5 ring-1 ring-[#d6b681] sm:grid-cols-[minmax(0,18rem)_1fr] sm:items-center sm:p-7"><div className="flex items-center justify-center rounded-xl bg-[#fbf2e6] p-4"><ContentImage src={chapter.image} alt="Illustration from the story of Goddess Vasavi" className="h-auto max-h-72 w-auto max-w-full object-contain" /></div><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a45826]"><CheckCircle2 className="h-4 w-4" /> Chapter {String(index + 1).padStart(2, "0")}</p><p className="mt-4 text-base font-semibold leading-8 text-[#634a3c]">{chapter.text}</p></div></article>)}</div></div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-4xl rounded-[1.5rem] bg-white p-7 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#eadfd2] sm:p-10"><p className="text-base leading-8 text-stone-700">{storyContent.closing}</p><div className="mt-7"><PrimaryLink href="/donations">Carry the story forward</PrimaryLink></div></div></section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
