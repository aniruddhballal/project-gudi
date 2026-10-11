import Link from "next/link";

import { ContentImage } from "@/components/content-image";
import { PageHero, PrimaryLink, SectionHeading, SecondaryLink } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import { CalendarDays, CheckCircle2, MapPin, PlayCircle } from "lucide-react";

export default async function OverviewPage() {
  const { home: homeContent, overview: overviewContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.overview;
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={overviewContent.title} description={copy.description} />

      <section className="page-grid border-b border-[#e8ddd0] bg-[#f3eee6] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="flex items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#fbf2e6] p-5 shadow-[0_18px_50px_rgba(78,42,24,0.08)] ring-1 ring-[#eadfd2] sm:p-8">
            <ContentImage src={overviewContent.heroImage ?? "/legacy/overview/top.png"} alt={copy.heroAlt} className="h-auto max-h-[34rem] w-auto max-w-full object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a45826]">{copy.activityEyebrow}</p>
            <h2 className="display-type mt-3 text-4xl leading-tight text-[#3b241c] sm:text-5xl">{overviewContent.activity.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">{copy.activityDescription}</p>
            <div className="mt-7 flex flex-wrap gap-3"><PrimaryLink href={overviewContent.activity.donationHref} external>{copy.donate}</PrimaryLink><SecondaryLink href="/about">{copy.learn}</SecondaryLink></div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={copy.eventsEyebrow} title={copy.eventsTitle} />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {overviewContent.events.map((event) => <article key={event.title} className="rounded-[1.5rem] bg-[#fbf2e6] p-6 ring-1 ring-[#eadfd2]"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a45826]"><CalendarDays className="h-4 w-4" /> {event.date}</p><h3 className="display-type mt-3 text-2xl text-[#3b241c]">{event.title}</h3><p className="mt-2 text-sm font-semibold text-[#9d431f]">{event.location}</p><p className="mt-4 text-sm leading-7 text-stone-600">{event.description}</p><p className="mt-5 text-xs leading-5 text-stone-400">{copy.eventsUnavailable}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#ead6b4] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-14">
          <SectionHeading eyebrow={overviewContent.story.eyebrow} title={overviewContent.story.title} description={copy.storyDescription} />
          <div className="rounded-[1.5rem] border border-[#d6b681] bg-[#f8edda]/70 p-7 sm:p-9"><div className="space-y-5 text-base leading-8 text-[#634a3c]">{overviewContent.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-7"><SecondaryLink href="/story">{copy.storyAction}</SecondaryLink></div></div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="flex items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#fbf2e6] p-5 ring-1 ring-[#eadfd2] sm:p-8"><ContentImage src={overviewContent.donation.image} alt={copy.donationAlt} className="h-auto max-h-[30rem] w-auto max-w-full object-contain" /></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a45826]">{copy.supportEyebrow}</p><h2 className="display-type mt-3 text-4xl text-[#3b241c] sm:text-5xl">{overviewContent.donation.title}</h2><p className="mt-5 text-base leading-8 text-stone-600">{copy.supportDescription}</p><div className="mt-7"><PrimaryLink href={overviewContent.donation.href} external>{copy.donate}</PrimaryLink></div></div>
        </div>
      </section>

      <section className="bg-[#ead6b4] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow={copy.mapEyebrow} title={overviewContent.map.title} /><a href={overviewContent.map.directions} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center rounded-full bg-[#f5c66b] px-5 py-3 text-sm font-bold text-[#2c1916] hover:bg-white">{copy.directions} <MapPin className="ml-2 h-4 w-4" /></a></div><div className="mt-8 overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]"><iframe title={copy.mapTitle} src={overviewContent.map.embed} className="h-[28rem] w-full border-0" loading="lazy" allowFullScreen /></div></div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow={copy.videosEyebrow} title={copy.videosTitle} /><Link href="/gallery/videos" className="text-sm font-bold text-[#9d431f] hover:text-[#6e2c17]">{copy.videosAction} <span aria-hidden="true">→</span></Link></div><div className="mt-9 grid gap-6 lg:grid-cols-3">{overviewContent.videos.map((video) => <article key={video.title} className="overflow-hidden rounded-[1.5rem] bg-[#fbf2e6] ring-1 ring-[#eadfd2]">{video.youtubeEmbed ? <iframe title={video.title} src={video.youtubeEmbed} className="aspect-video w-full border-0" loading="lazy" allowFullScreen /> : video.videoSrc ? <video className="aspect-video w-full bg-black object-contain" controls poster={video.thumbnail ?? undefined} src={video.videoSrc} /> : <div className="flex aspect-video items-center justify-center bg-[#eadfd2] text-sm text-stone-500">{copy.unavailableVideo}</div>}<div className="p-5"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a45826]"><PlayCircle className="h-4 w-4" /> {copy.videoLabel}</div><h3 className="mt-3 text-lg font-semibold text-[#3b241c]">{video.title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{video.description}</p></div></article>)}</div></div>
      </section>

      <section className="page-grid border-y border-[#e8ddd0] bg-[#f3eee6] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.newsEyebrow} title={copy.newsTitle} /><div className="mt-9 grid gap-5 lg:grid-cols-3">{overviewContent.news.map((item) => <article key={item.title} className="rounded-[1.5rem] bg-white p-6 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#eadfd2]"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a45826]"><CheckCircle2 className="h-4 w-4" /> {copy.newsLabel}</p><h3 className="display-type mt-3 text-2xl text-[#3b241c]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p><a href={item.href} target={item.href.endsWith(".pdf") ? "_blank" : undefined} rel={item.href.endsWith(".pdf") ? "noreferrer" : undefined} className="mt-5 inline-flex text-sm font-bold text-[#9d431f] hover:text-[#6e2c17]">{copy.newsAction} <span aria-hidden="true" className="ml-2">→</span></a></article>)}</div><div className="mt-8"><SecondaryLink href="/news">{copy.allNews}</SecondaryLink></div></div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"><div className="flex items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#fbf2e6] p-5 ring-1 ring-[#eadfd2] sm:p-8"><ContentImage src={overviewContent.about.image} alt={copy.aboutAlt} className="h-auto max-h-[30rem] w-auto max-w-full object-contain" /></div><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a45826]">{overviewContent.about.title}</p><h2 className="display-type mt-3 text-4xl text-[#3b241c] sm:text-5xl">{copy.aboutHeading}</h2><p className="mt-5 text-base leading-8 text-stone-600">{overviewContent.about.text}</p><div className="mt-7"><SecondaryLink href="/about">{copy.aboutAction}</SecondaryLink></div></div></div></section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
