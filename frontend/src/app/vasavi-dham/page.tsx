import { ContentImage } from "@/components/content-image";
import { AimsExplorer } from "@/components/aims-explorer";
import { PageHero, PrimaryLink, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import { CheckCircle2, Landmark } from "lucide-react";

export default async function VasaviDhamPage() {
  const { home: homeContent, vasaviDham: vasaviDhamContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow="Trust and facilities" title={vasaviDhamContent.title} description={vasaviDhamContent.description} />

      <section className="page-grid border-b border-[#e8ddd0] bg-[#f3eee6] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="The Trust" title="A shared foundation" description="The same aims guide the facilities, projects, and service that make Vasavi Dham a living centre for the community." /><div className="mt-9"><AimsExplorer aims={homeContent.aims} /></div></div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Featured facilities" title="Spaces made for devotion and gathering" />
          <div className="mt-9 grid gap-6 lg:grid-cols-3">
            {vasaviDhamContent.featured.map((project) => (
              <article key={project.title} className="overflow-hidden rounded-[1.5rem] bg-[#fbf2e6] ring-1 ring-[#eadfd2]">
                <div className="flex items-center justify-center border-b border-[#eadfd2] p-5 sm:p-6"><ContentImage src={project.image} alt={project.title} className="h-auto max-h-[24rem] w-auto max-w-full object-contain" /></div>
                <div className="p-6"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a45826]"><Landmark className="h-4 w-4" /> Vasavi Dham</p><h2 className="display-type mt-3 text-2xl text-[#3b241c]">{project.title}</h2><p className="mt-3 text-sm leading-7 text-stone-600">{project.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Completed projects" title="A journey built over time" />
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {vasaviDhamContent.projects.map((project) => <article key={project.title} className="grid gap-5 rounded-2xl bg-white p-5 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#eadfd2] sm:grid-cols-[12rem_1fr] sm:items-center"><div className="flex items-center justify-center rounded-xl bg-[#fbf2e6] p-3"><ContentImage src={project.image} alt={project.title} className="h-auto max-h-48 w-auto max-w-full object-contain" /></div><div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a45826]"><CheckCircle2 className="h-4 w-4" /> {project.date}</p><h3 className="display-type mt-2 text-2xl text-[#3b241c]">{project.title}</h3></div></article>)}
          </div>
          <div className="mt-9"><PrimaryLink href="/contact">Plan your visit</PrimaryLink></div>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
