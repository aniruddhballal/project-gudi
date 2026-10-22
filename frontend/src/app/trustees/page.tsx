import { ContentImage } from "@/components/content-image";
import { PageHero, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import type { Person, SiteCopy } from "@/lib/site-content-types";
import { HeartHandshake } from "lucide-react";

function TrusteeCard({ trustee, copy }: { trustee: Person; copy: SiteCopy["pages"]["trustees"] }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#e2ddd1]">
      <div className="flex min-h-48 items-center justify-center border-b border-[#e2ddd1] bg-[#f6f0e3] p-5">
        {trustee.image ? <ContentImage src={trustee.image} alt={trustee.name} className="h-auto max-h-64 w-auto max-w-full object-contain" /> : <p className="text-xs text-stone-500">{copy.portraitUnavailable}</p>}
      </div>
      <div className="p-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#965b35]"><HeartHandshake className="h-4 w-4" /> {copy.leadershipLabel}</p>
        <h2 className="display-type mt-3 text-2xl text-[#203b35]">{trustee.name}</h2>
        <p className="mt-1 text-sm font-semibold text-[#a44832]">{trustee.role}</p>
        <p className="mt-4 text-sm leading-7 text-stone-600">{trustee.description}</p>
      </div>
    </article>
  );
}

export default async function TrusteesPage() {
  const { home: homeContent, trustees: trusteesContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.trustees;
  return (
    <main data-page="trustees" className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={trusteesContent.title} description={copy.description} />

      <section className="page-grid border-b border-[#dfd9cd] bg-[#f0ece2] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={copy.patronsEyebrow} title={copy.patronsTitle} description={copy.patronsDescription} />
          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            {trusteesContent.patrons.map((trustee) => <TrusteeCard key={`${trustee.name}-${trustee.role}`} trustee={trustee} copy={copy} />)}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={copy.executiveEyebrow} title={copy.executiveTitle} />
          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trusteesContent.executive.map((trustee, index) => <TrusteeCard key={`${trustee.name}-${trustee.role}-${index}`} trustee={trustee} copy={copy} />)}
          </div>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
