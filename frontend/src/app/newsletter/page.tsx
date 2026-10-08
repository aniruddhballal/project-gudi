import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";

export default async function NewsletterPage() {
  const { home: homeContent, newsletter: newsletterContent } = await getSiteContent();
  const localCount = newsletterContent.documents.filter((document) => document.local).length;

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="bg-[#2c1916] px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Public documents</p>
          <h1 className="display-type mt-4 text-5xl leading-tight sm:text-6xl">{newsletterContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">Bulletins, election documents, invitations, programme information, and other downloadable material from the original site.</p>
          <p className="mt-4 text-sm text-amber-200">{localCount} of {newsletterContent.documents.length} documents are stored locally from the public capture.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {newsletterContent.documents.map((document) => (
            <article key={document.title} className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{document.category}</p>
              <h2 className="mt-3 text-xl font-semibold">{document.title}</h2>
              {document.description && <p className="mt-3 text-sm leading-7 text-stone-600">{document.description}</p>}
              <div className="mt-auto pt-6">
                <a href={document.href} target="_blank" rel="noreferrer" className="inline-flex rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                  Download PDF
                </a>
                {!document.local && <p className="mt-3 text-xs leading-5 text-stone-400">Original external storage link retained; file was not available in the capture.</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-100">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Legacy announcement</p>
          <h2 className="mt-3 text-2xl font-semibold">{newsletterContent.announcement.title}</h2>
          <p className="mt-3 text-sm text-stone-500">{newsletterContent.announcement.date}</p>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
