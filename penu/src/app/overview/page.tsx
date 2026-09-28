import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { homeContent } from "@/content/home";
import { overviewContent } from "@/content/overview";

export default function OverviewPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Overview</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{overviewContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">Activities, events, story, route map, videos, news, and Trust information captured from the original endpoint.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12">
        <div className="grid gap-6 overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="relative min-h-56 overflow-hidden rounded-xl bg-stone-100">
            <Image src="/legacy/overview/top.png" alt="Vasavi Rishi Gothra Suvarna Mandir" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Overview of Activities</p>
            <h2 className="mt-3 text-2xl font-semibold">{overviewContent.activity.title}</h2>
            <a href={overviewContent.activity.donationHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">Donate Now</a>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Upcoming events" title="Events at Vasavi Dham" />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {overviewContent.events.map((event) => (
              <article key={event.title} className="rounded-2xl bg-stone-50 p-5 ring-1 ring-stone-200">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{event.date}</p>
                <h3 className="mt-3 text-xl font-semibold">{event.title}</h3>
                <p className="mt-1 text-sm font-medium text-stone-500">{event.location}</p>
                <p className="mt-4 text-sm leading-7 text-stone-600">{event.description}</p>
                <p className="mt-4 text-xs text-stone-400">Original event artwork was not available in the public capture.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-8 lg:px-12">
        <SectionHeading eyebrow={overviewContent.story.eyebrow} title={overviewContent.story.title} />
        <div className="mt-6 space-y-5 text-sm leading-8 text-stone-600">
          {overviewContent.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <Link href="/story" className="mt-6 inline-block text-sm font-semibold text-amber-800 hover:text-amber-950">Know more about Vasavi Mata →</Link>
      </section>

      <section className="bg-amber-50 px-4 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-64 overflow-hidden rounded-2xl bg-white">
            <Image src={overviewContent.donation.image} alt="Vasavi Dham donation" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Support the project</p>
            <h2 className="mt-3 text-3xl font-semibold">{overviewContent.donation.title}</h2>
            <a href={overviewContent.donation.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">Donate Now</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="Find the route of this holy place" title={overviewContent.map.title} />
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
          <iframe title="Route to Vasavi Penugonda Trust" src={overviewContent.map.embed} className="h-[28rem] w-full border-0" loading="lazy" allowFullScreen />
        </div>
        <a href={overviewContent.map.directions} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">Get Directions</a>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Latest videos" title="Watch and learn" />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {overviewContent.videos.map((video) => (
              <article key={video.title} className="overflow-hidden rounded-2xl bg-stone-50 ring-1 ring-stone-200">
                {video.youtubeEmbed ? (
                  <iframe title={video.title} src={video.youtubeEmbed} className="aspect-video w-full border-0" loading="lazy" allowFullScreen />
                ) : video.videoSrc ? (
                  <video className="aspect-video w-full bg-black object-cover" controls poster={video.thumbnail ?? undefined} src={video.videoSrc} />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-stone-200 text-sm text-stone-500">Video source unavailable</div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{video.description}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/gallery/videos" className="mt-6 inline-block text-sm font-semibold text-amber-800 hover:text-amber-950">View more videos →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="News & update" title="Latest information" />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {overviewContent.news.map((item) => (
            <article key={item.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">News &amp; Update</p>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
              <a href={item.href} target={item.href.endsWith(".pdf") ? "_blank" : undefined} rel={item.href.endsWith(".pdf") ? "noreferrer" : undefined} className="mt-4 inline-block text-sm font-semibold text-amber-800 hover:text-amber-950">Open item →</a>
            </article>
          ))}
        </div>
        <Link href="/news" className="mt-6 inline-block text-sm font-semibold text-amber-800 hover:text-amber-950">View more news &amp; updates →</Link>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-64 overflow-hidden rounded-2xl bg-stone-100">
            <Image src={overviewContent.about.image} alt="Vasavi Dham" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{overviewContent.about.title}</p>
            <h2 className="mt-3 text-3xl font-semibold">Vasavi Dham</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">{overviewContent.about.text}</p>
            <Link href="/about" className="mt-5 inline-block rounded-lg bg-amber-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">Know more about Vasavi Dham?</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl justify-between gap-4">
          <p>{homeContent.siteTitle}</p>
          <Link href="/" className="hover:text-stone-900">Back to home</Link>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
