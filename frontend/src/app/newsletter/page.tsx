import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero, SectionHeading } from "@/components/public-page";
import { getSiteContent } from "@/lib/site-content";
import { ArrowDownToLine, FileText } from "lucide-react";

export default async function NewsletterPage() {
  const { home: homeContent, newsletter: newsletterContent } = await getSiteContent();
  const localCount = newsletterContent.documents.filter((document) => document.local).length;

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow="Public documents" title={newsletterContent.title} description="Bulletins, election documents, invitations, programme information, and other downloadable material from the original site."><p className="mt-5 text-sm font-semibold text-amber-200">{localCount} of {newsletterContent.documents.length} documents are stored locally from the public capture.</p></PageHero>

      <section className="page-grid border-b border-[#e8ddd0] bg-[#f3eee6] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Browse the archive" title="Documents from the Trust" description="Keep the important dates, notices, and public records close at hand." /><div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{newsletterContent.documents.map((document) => <article key={document.title} className="flex flex-col rounded-[1.5rem] bg-white p-6 shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#eadfd2]"><div className="flex items-center justify-between"><span className="rounded-full bg-[#fbf2e6] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a45826]">{document.category}</span><FileText className="h-5 w-5 text-[#b96d3b]" aria-hidden="true" /></div><h2 className="display-type mt-5 text-2xl text-[#3b241c]">{document.title}</h2>{document.description && <p className="mt-3 text-sm leading-7 text-stone-600">{document.description}</p>}<div className="mt-auto pt-7"><a href={document.href} target="_blank" rel="noreferrer" className="group inline-flex items-center rounded-full bg-[#9d431f] px-5 py-3 text-sm font-bold text-white hover:bg-[#7d3218]">Download PDF <ArrowDownToLine className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" /></a>{!document.local && <p className="mt-3 text-xs leading-5 text-stone-400">Original external storage link retained; file was not available in the capture.</p>}</div></article>)}</div></div>
      </section>

      <section className="bg-[#ead6b4] px-4 py-12 sm:px-8 lg:px-12 lg:py-16"><div className="mx-auto max-w-7xl rounded-[1.5rem] border border-[#d6b681] bg-[#f8edda]/70 p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f3d1e]">Legacy announcement</p><h2 className="display-type mt-3 text-3xl text-[#3b241c]">{newsletterContent.announcement.title}</h2><p className="mt-3 text-sm text-[#634a3c]">{newsletterContent.announcement.date}</p></div></section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
