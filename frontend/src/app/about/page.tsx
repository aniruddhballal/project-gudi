import { ContentImage } from "@/components/content-image";
import { AimsList } from "@/components/aims-list";
import { ProjectJourney } from "@/components/project-journey";
import { PageHero, PrimaryLink, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import { CheckCircle2 } from "lucide-react";

export default async function AboutPage() {
  const { about: aboutContent, home: homeContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.about;
  return (
    <main data-page="about" className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow="About the Trust" title={aboutContent.title} description={aboutContent.introduction} />

      <section className="page-grid border-b border-[#dfd9cd] bg-[#f0ece2] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.aims.eyebrow} title={copy.aims.title} description={copy.aims.description} /><div className="mt-9"><AimsList aims={homeContent.aims} /></div></div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={copy.construction.eyebrow} title={copy.construction.title} description={copy.construction.description} />
          <div className="mt-9 space-y-6">
            {aboutContent.underConstruction.map((project, index) => {
              const imageOnRight = index % 2 === 1;

              return (
                <article key={project.title} className="grid overflow-hidden rounded-xl bg-[#f6f0e3] ring-1 ring-[#e2ddd1] lg:grid-cols-2">
                  <div className={`flex items-center justify-center p-5 sm:p-8 ${imageOnRight ? "lg:order-2" : "lg:order-1"}`}>
                    <ContentImage src={project.image ?? "/legacy/home/logo.png"} alt={project.title} className="h-auto max-h-[32rem] w-auto max-w-full object-contain" />
                  </div>
                  <div className={`flex flex-col justify-center border-t border-[#e2ddd1] p-7 sm:p-10 lg:border-t-0 ${imageOnRight ? "lg:order-1 lg:border-r" : "lg:order-2 lg:border-l"}`}>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#965b35]"><CheckCircle2 className="h-4 w-4" /> {copy.progressLabel}</p>
                    <h2 className="display-type mt-3 text-3xl text-[#203b35] sm:text-4xl">{project.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-stone-600">{project.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={copy.completed.eyebrow} title={copy.completed.title} />
          <ProjectJourney projects={aboutContent.projects} />
          <div className="mt-10 flex justify-center border-t border-[#dfd9cd] pt-8">
            <PrimaryLink href="/donations">{copy.completed.action}</PrimaryLink>
          </div>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
