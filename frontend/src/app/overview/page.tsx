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
    <main id="main-content" className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={overviewContent.title} description={copy.description} />

      <section className="page-grid border-b border-[#dfd9cd] bg-[#f0ece2] px-4 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex w-fit max-w-full items-center justify-center rounded-full bg-[#f6f0e3]/80 px-8 py-4 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#e2ddd1] sm:px-12 sm:py-5">
            <ContentImage src={overviewContent.heroImage ?? "/legacy/overview/top.png"} alt="" className="h-auto w-[min(18rem,60vw)] max-w-full object-contain" />
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#965b35]">{copy.activityEyebrow}</p>
          <h2 className="display-type mx-auto mt-3 max-w-4xl text-4xl leading-tight text-[#203b35] sm:text-5xl lg:text-6xl">{overviewContent.activity.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600">{copy.activityDescription}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3"><PrimaryLink href={overviewContent.activity.donationHref} external>{copy.donate}</PrimaryLink><SecondaryLink href="/about">{copy.learn}</SecondaryLink></div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={copy.eventsEyebrow} title={copy.eventsTitle} />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {overviewContent.events.map((event) => <article key={event.title} className="rounded-xl bg-[#f6f0e3] p-6 ring-1 ring-[#e2ddd1]"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#965b35]"><CalendarDays className="h-4 w-4" /> {event.date}</p><h3 className="display-type mt-3 text-2xl text-[#203b35]">{event.title}</h3><p className="mt-2 text-sm font-semibold text-[#a44832]">{event.location}</p><p className="mt-4 text-sm leading-7 text-stone-600">{event.description}</p><p className="mt-5 text-xs leading-5 text-stone-400">{copy.eventsUnavailable}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#eee4d3] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-4xl text-center"><SectionHeading eyebrow={overviewContent.story.eyebrow} title={overviewContent.story.title} description={copy.storyDescription} /></div>
          <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-[#cdb98c] bg-[#eee7da]/70 p-7 sm:p-9"><div className="space-y-5 text-base leading-8 text-[#4d5b52]">{overviewContent.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-7"><SecondaryLink href="/story">{copy.storyAction}</SecondaryLink></div></div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="flex items-center justify-center overflow-hidden rounded-xl bg-[#f6f0e3] p-5 ring-1 ring-[#e2ddd1] sm:p-8"><ContentImage src={overviewContent.donation.image} alt={copy.donationAlt} className="h-auto max-h-[30rem] w-auto max-w-full object-contain" /></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#965b35]">{copy.supportEyebrow}</p><h2 className="display-type mt-3 text-4xl text-[#203b35] sm:text-5xl">{overviewContent.donation.title}</h2><p className="mt-5 text-base leading-8 text-stone-600">{copy.supportDescription}</p><div className="mt-7"><PrimaryLink href={overviewContent.donation.href} external>{copy.donate}</PrimaryLink></div></div>
        </div>
      </section>

      <section className="bg-[#eee4d3] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow={copy.mapEyebrow} title={overviewContent.map.title} /><a href={overviewContent.map.directions} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center rounded-full bg-[#dfbd7a] px-5 py-3 text-sm font-bold text-[#183a34] hover:bg-white">{copy.directions} <MapPin className="ml-2 h-4 w-4" /></a></div><div className="mt-8 overflow-hidden rounded-xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]"><iframe title={copy.mapTitle} src={overviewContent.map.embed} className="h-[28rem] w-full border-0" loading="lazy" allowFullScreen /></div></div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow={copy.videosEyebrow} title={copy.videosTitle} /><Link href="/gallery/videos" className="text-sm font-bold text-[#a44832] hover:text-[#6e2c17]">{copy.videosAction} <span aria-hidden="true">→</span></Link></div><div className="mt-9 grid gap-6 lg:grid-cols-3">{overviewContent.videos.map((video) => <article key={video.title} className="overflow-hidden rounded-xl bg-[#f6f0e3] ring-1 ring-[#e2ddd1]">{video.youtubeEmbed ? <iframe title={video.title} src={video.youtubeEmbed} className="aspect-video w-full border-0" loading="lazy" allowFullScreen /> : video.videoSrc ? <video className="aspect-video w-full bg-black object-contain" controls poster={video.thumbnail ?? undefined} src={video.videoSrc} /> : <div className="flex aspect-video items-center justify-center bg-[#e2ddd1] text-sm text-stone-500">{copy.unavailableVideo}</div>}<div className="p-5"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#965b35]"><PlayCircle className="h-4 w-4" /> {copy.videoLabel}</div><h3 className="mt-3 text-lg font-semibold text-[#203b35]">{video.title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{video.description}</p></div></article>)}</div></div>
      </section>

      <section className="page-grid border-y border-[#dfd9cd] bg-[#f0ece2] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.newsEyebrow} title={copy.newsTitle} /><div className="mt-9 grid gap-5 lg:grid-cols-3">{overviewContent.news.map((item) => <article key={item.title} className="rounded-xl bg-white p-6 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#e2ddd1]"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#965b35]"><CheckCircle2 className="h-4 w-4" /> {copy.newsLabel}</p><h3 className="display-type mt-3 text-2xl text-[#203b35]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p><a href={item.href} target={item.href.endsWith(".pdf") ? "_blank" : undefined} rel={item.href.endsWith(".pdf") ? "noreferrer" : undefined} className="mt-5 inline-flex text-sm font-bold text-[#a44832] hover:text-[#6e2c17]">{copy.newsAction} <span aria-hidden="true" className="ml-2">→</span></a></article>)}</div><div className="mt-8"><SecondaryLink href="/news">{copy.allNews}</SecondaryLink></div></div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"><div className="flex items-center justify-center overflow-hidden rounded-xl bg-[#f6f0e3] p-5 ring-1 ring-[#e2ddd1] sm:p-8"><ContentImage src={overviewContent.about.image} alt={copy.aboutAlt} className="h-auto max-h-[30rem] w-auto max-w-full object-contain" /></div><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#965b35]">{overviewContent.about.title}</p><h2 className="display-type mt-3 text-4xl text-[#203b35] sm:text-5xl">{copy.aboutHeading}</h2><p className="mt-5 text-base leading-8 text-stone-600">{overviewContent.about.text}</p><div className="mt-7"><SecondaryLink href="/about">{copy.aboutAction}</SecondaryLink></div></div></div></section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
