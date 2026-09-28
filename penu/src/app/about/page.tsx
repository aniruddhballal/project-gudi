import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { aboutContent } from "@/content/about";
import { homeContent } from "@/content/home";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">About</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{aboutContent.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-amber-50">{aboutContent.introduction}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">The trust</p>
          <h2 className="mt-3 text-3xl font-semibold">Aims &amp; objectives of the Trust</h2>
        </div>
        <ol className="space-y-3 text-sm leading-7 text-stone-600">
          {homeContent.aims.map((aim, index) => <li key={aim}><span className="mr-3 font-semibold text-amber-800">{index + 1}.</span>{aim}</li>)}
        </ol>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Projects under construction" title="Building Vasavi Shanthi Dham" />
          <div className="mt-8 space-y-8">
            {aboutContent.underConstruction.map((project, index) => (
              <ProjectFeature key={project.title} project={project} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="Completed projects" title="The Vasavi Dham journey" />
        <div className="mt-8 space-y-5">
          {aboutContent.projects.map((project, index) => (
            <article key={`${project.date}-${project.title}`} className="grid gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200 sm:grid-cols-[9rem_1fr]">
              <div className="relative min-h-36 overflow-hidden rounded-xl bg-stone-100">
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill sizes="9rem" className="object-cover" />
                ) : (
                  <div className="flex h-full min-h-36 items-center justify-center p-4 text-center text-xs text-stone-500">Original image unavailable</div>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{project.date}</p>
                <h3 className="mt-2 text-xl font-semibold">{index + 1}. {project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{homeContent.siteTitle}</p>
          <Link href="/" className="hover:text-stone-900">Back to home</Link>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function ProjectFeature({
  project,
  reverse,
}: {
  project: (typeof aboutContent.underConstruction)[number];
  reverse: boolean;
}) {
  return (
    <article className={`grid gap-6 rounded-2xl border border-stone-200 p-5 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="relative min-h-64 overflow-hidden rounded-xl bg-stone-100">
        <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold">{project.title}</h3>
        <p className="mt-4 text-sm leading-7 text-stone-600">{project.description}</p>
      </div>
    </article>
  );
}
