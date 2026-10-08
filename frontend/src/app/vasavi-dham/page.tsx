import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";

export default async function VasaviDhamPage() {
  const { home: homeContent, vasaviDham: vasaviDhamContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="bg-[#2c1916] px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Trust and facilities</p>
          <h1 className="display-type mt-4 text-5xl leading-tight sm:text-6xl">{vasaviDhamContent.title}</h1>
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

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
