import Image from "next/image";
import Link from "next/link";

import { homeContent } from "@/content/home";
import { newsContent } from "@/content/news";

export default function NewsPage() {
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
            <span className="font-semibold text-amber-800">News</span>
            <Link href="/newsletter" className="hover:text-amber-800">Newsletter</Link>
            <Link href="/migration" className="text-stone-400 hover:text-stone-700">Migration tracker</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Updates</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{newsContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">News and historical updates carried over from the original public website.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {newsContent.items.map((item) => (
            <article id={`article-${item.id}`} key={item.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
              <div className="relative flex aspect-[16/9] items-center justify-center bg-stone-100">
                {item.image ? (
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                ) : (
                  <div className="px-6 text-center text-sm text-stone-500">Original article image unavailable in the public capture.</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{item.date}</p>
                <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.summary}</p>
                {item.details.length > 0 && (
                  <details className="mt-4 text-sm text-stone-600">
                    <summary className="cursor-pointer font-semibold text-amber-800">Read more</summary>
                    <div className="mt-3 space-y-3 leading-7">
                      {item.details.map((detail) => <p key={detail}>{detail}</p>)}
                    </div>
                  </details>
                )}
                <div className="mt-auto pt-5">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-amber-800 hover:text-amber-950">Open attached item →</a>
                  ) : item.sourceImage ? (
                    <p className="text-xs leading-5 text-stone-400">Legacy image source: {item.sourceImage}</p>
                  ) : (
                    <p className="text-xs text-stone-400">Legacy article id: {item.id}; full detail endpoint was not captured.</p>
                  )}
                </div>
              </div>
            </article>
          ))}
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
