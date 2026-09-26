import Image from "next/image";
import Link from "next/link";

import { homeContent } from "@/content/home";
import { vasaviDhamContent } from "@/content/vasavi-dham";

export default function VasaviDhamPage() {
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
            <Link href="/about" className="hover:text-amber-800">About</Link>
            <span className="font-semibold text-amber-800">Vasavi Dham</span>
            <Link href="/donations" className="hover:text-amber-800">Donations</Link>
            <Link href="/migration" className="text-stone-400 hover:text-stone-700">Migration tracker</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Trust and facilities</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{vasaviDhamContent.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-amber-50">{vasaviDhamContent.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-semibold">Aims &amp; objectives of the Trust</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {homeContent.aims.map((aim, index) => <li key={aim} className="rounded-xl bg-white p-5 text-sm leading-7 shadow-sm ring-1 ring-stone-200"><span className="mr-2 font-semibold text-amber-800">{index + 1}.</span>{aim}</li>)}
        </ol>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold">Featured facilities</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {vasaviDhamContent.featured.map((project) => <article key={project.title} className="overflow-hidden rounded-2xl bg-stone-50 ring-1 ring-stone-200"><Image src={project.image} alt={project.title} width={800} height={520} className="h-56 w-full object-cover" /><div className="p-6"><h3 className="text-xl font-semibold">{project.title}</h3><p className="mt-4 text-sm leading-7 text-stone-600">{project.description}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-semibold">Completed Projects</h2>
        <div className="mt-8 space-y-5">
          {vasaviDhamContent.projects.map((project) => <article key={project.title} className="grid gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200 sm:grid-cols-[12rem_1fr] sm:items-center"><Image src={project.image} alt={project.title} width={300} height={220} className="mx-auto h-36 w-full rounded-xl object-contain" /><div><h3 className="text-xl font-semibold">{project.title}</h3><p className="mt-2 text-sm font-semibold text-amber-700">{project.date}</p></div></article>)}
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl justify-between gap-4"><p>{homeContent.siteTitle}</p><Link href="/" className="hover:text-stone-900">Back to home</Link></div></footer>
    </main>
  );
}
