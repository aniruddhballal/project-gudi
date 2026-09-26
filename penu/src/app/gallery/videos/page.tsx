import Image from "next/image";
import Link from "next/link";

import { homeContent } from "@/content/home";
import { videosContent } from "@/content/videos";

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/legacy/home/logo.png" alt="Vasavi Penugonda Trust" width={100} height={60} />
            <span className="max-w-56 text-sm font-semibold leading-tight">{homeContent.siteTitle}</span>
          </Link>
          <nav className="ml-auto flex flex-wrap gap-4 text-sm text-stone-600" aria-label="Page navigation">
            <Link href="/" className="hover:text-amber-800">Home</Link>
            <Link href="/overview" className="hover:text-amber-800">Overview</Link>
            <Link href="/gallery/photos" className="hover:text-amber-800">Photos</Link>
            <span className="font-semibold text-amber-800">Videos</span>
            <Link href="/migration" className="text-stone-400 hover:text-stone-700">Migration tracker</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Gallery</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{videosContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">Videos preserved from the original public gallery, embedded from the source YouTube URLs.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-2 lg:px-12">
        {videosContent.videos.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
            <div className="aspect-video bg-stone-900">
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${video.id}`} title={video.title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold leading-7 text-stone-700">{video.title}</p>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-amber-800 hover:text-amber-950">Open on YouTube</a>
            </div>
          </article>
        ))}
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
