import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero, SectionHeading } from "@/components/public-page";
import { getSiteContent } from "@/lib/site-content";
import { ArrowDownToLine, FileText } from "lucide-react";

export default async function NewsletterPage() {
  const { home: homeContent, newsletter: newsletterContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.newsletter;
  const localCount = newsletterContent.documents.filter((document) => document.local).length;

  return (
    <main data-page="newsletter" className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={newsletterContent.title} description={copy.description}><p className="mt-5 text-sm font-semibold text-amber-200">{localCount} of {newsletterContent.documents.length} {copy.countLabel}</p></PageHero>

      <section className="page-grid border-b border-[#dfd9cd] bg-[#f0ece2] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.archiveEyebrow} title={copy.archiveTitle} description={copy.archiveDescription} /><div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{newsletterContent.documents.map((document) => <article key={document.title} className="flex flex-col rounded-xl bg-white p-6 shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#e2ddd1]"><div className="flex items-center justify-between"><span className="rounded-full bg-[#f6f0e3] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#965b35]">{document.category}</span><FileText className="h-5 w-5 text-[#a86e38]" aria-hidden="true" /></div><h2 className="display-type mt-5 text-2xl text-[#203b35]">{document.title}</h2>{document.description && <p className="mt-3 text-sm leading-7 text-stone-600">{document.description}</p>}<div className="mt-auto pt-7"><a href={document.href} target="_blank" rel="noreferrer" className="group inline-flex items-center rounded-full bg-[#a44832] px-5 py-3 text-sm font-bold text-white hover:bg-[#7d3218]">{copy.download} <ArrowDownToLine className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" /></a>{!document.local && <p className="mt-3 text-xs leading-5 text-stone-400">{copy.externalNote}</p>}</div></article>)}</div></div>
      </section>

      <section className="bg-[#eee4d3] px-4 py-12 sm:px-8 lg:px-12 lg:py-16"><div className="mx-auto max-w-7xl rounded-xl border border-[#cdb98c] bg-[#eee7da]/70 p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c3c2e]">{copy.legacyEyebrow}</p><h2 className="display-type mt-3 text-3xl text-[#203b35]">{newsletterContent.announcement.title}</h2><p className="mt-3 text-sm text-[#4d5b52]">{newsletterContent.announcement.date}</p></div></section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
