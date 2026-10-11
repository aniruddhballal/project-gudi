import { ContentImage } from "@/components/content-image";
import { AimsList } from "@/components/aims-list";
import { PageHero, PrimaryLink, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import { CheckCircle2 } from "lucide-react";

export default async function AboutPage() {
  const { about: aboutContent, home: homeContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow="About the Trust" title={aboutContent.title} description={aboutContent.introduction} />

      <section className="page-grid border-b border-[#e8ddd0] bg-[#f3eee6] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="The Trust" title="A place with a purpose" description="The Trust exists to nurture faith, service, community, and the future of Vasavi Penugonda." /><div className="mt-9"><AimsList aims={homeContent.aims} /></div></div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Projects under construction" title="Building Vasavi Shanthi Dham" description="A sacred place grows through patient work, shared service, and the generosity of devotees." />
          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            {aboutContent.underConstruction.map((project) => (
              <article key={project.title} className="overflow-hidden rounded-[1.5rem] bg-[#fbf2e6] ring-1 ring-[#eadfd2]">
                <div className="flex items-center justify-center border-b border-[#eadfd2] p-5 sm:p-7">
                  <ContentImage src={project.image ?? "/legacy/home/logo.png"} alt={project.title} className="h-auto max-h-[26rem] w-auto max-w-full object-contain" />
                </div>
                <div className="p-7 sm:p-9">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a45826]"><CheckCircle2 className="h-4 w-4" /> In progress</p>
                  <h2 className="display-type mt-3 text-3xl text-[#3b241c]">{project.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-stone-600">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Completed projects" title="The Vasavi Dham journey" />
          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {aboutContent.projects.map((project, index) => (
              <article key={`${project.date}-${project.title}`} className="grid gap-5 rounded-2xl bg-white p-5 shadow-[0_12px_35px_rgba(78,42,24,0.06)] ring-1 ring-[#eadfd2] sm:grid-cols-[10rem_1fr] sm:items-start">
                <div className="flex min-h-32 items-center justify-center rounded-xl bg-[#fbf2e6] p-3">
                  {project.image ? <ContentImage src={project.image} alt={project.title} className="h-auto max-h-40 w-auto max-w-full object-contain" /> : <p className="text-center text-xs text-stone-500">Original image unavailable</p>}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a45826]">{project.date}</p>
                  <h3 className="display-type mt-2 text-2xl text-[#3b241c]">{index + 1}. {project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
          <PrimaryLink href="/donations">Support the next chapter</PrimaryLink>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
