import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { homeContent } from "@/content/home";
import { storyContent } from "@/content/story";

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">History and devotion</p>
          <h1 className="mt-3 max-w-5xl text-4xl font-semibold sm:text-5xl">{storyContent.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12">
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-stone-200 sm:p-8">
          <a href={storyContent.publication.href} target="_blank" rel="noreferrer" className="inline-flex rounded-lg bg-amber-800 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-900">{storyContent.publication.title}</a>
          <p className="mt-3 text-sm text-stone-500">{storyContent.publication.note}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-8 lg:px-12">
        <Image src="/legacy/story/1.png" alt="Vasavi story illustration" width={1200} height={700} className="mx-auto max-h-[32rem] w-auto rounded-2xl object-contain" />
        <div className="mt-10 space-y-5 text-base leading-8 text-stone-700">
          {storyContent.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <h2 className="mt-14 text-3xl font-semibold">Vasavi Maatha&apos;s Historic Events</h2>
        <div className="mt-6 space-y-5 text-base leading-8 text-stone-700">
          {storyContent.historicEvents.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <h2 className="mt-14 text-3xl font-semibold">Goddess Vasavi&apos;s Story</h2>
        <div className="mt-8 space-y-8">
          {storyContent.narrative.map((chapter) => (
            <article key={chapter.image} className="grid gap-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-center sm:p-6">
              <Image src={chapter.image} alt="Illustration from the story of Goddess Vasavi" width={500} height={500} className="mx-auto max-h-64 w-full object-contain" />
              <p className="text-sm font-semibold leading-7 text-stone-700">{chapter.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-12 text-base leading-8 text-stone-700">{storyContent.closing}</p>
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
