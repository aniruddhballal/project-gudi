import { ContentImage } from "@/components/content-image";
import { PageHero, SectionHeading } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import type { Trustee } from "@/content/trustees";
import { HeartHandshake } from "lucide-react";

function TrusteeCard({ trustee }: { trustee: Trustee }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#eadfd2]">
      <div className="flex min-h-48 items-center justify-center border-b border-[#eadfd2] bg-[#fbf2e6] p-5">
        {trustee.image ? <ContentImage src={trustee.image} alt={trustee.name} className="h-auto max-h-64 w-auto max-w-full object-contain" /> : <p className="text-xs text-stone-500">Portrait unavailable</p>}
      </div>
      <div className="p-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a45826]"><HeartHandshake className="h-4 w-4" /> Trust leadership</p>
        <h2 className="display-type mt-3 text-2xl text-[#3b241c]">{trustee.name}</h2>
        <p className="mt-1 text-sm font-semibold text-[#9d431f]">{trustee.role}</p>
        <p className="mt-4 text-sm leading-7 text-stone-600">{trustee.description}</p>
      </div>
    </article>
  );
}

export default async function TrusteesPage() {
  const { home: homeContent, trustees: trusteesContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow="Leadership" title={trusteesContent.title} description="Meet the patrons and executive committee who continue to guide the work of Vasavi Penugonda." />

      <section className="page-grid border-b border-[#e8ddd0] bg-[#f3eee6] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="People behind the seva" title="Service is carried by people." description="The Trust's leadership listings are preserved from the original public site and presented here with gratitude." />
          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            {trusteesContent.patrons.map((trustee) => <TrusteeCard key={`${trustee.name}-${trustee.role}`} trustee={trustee} />)}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Executive committee" title="The team serving day to day" />
          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trusteesContent.executive.map((trustee, index) => <TrusteeCard key={`${trustee.name}-${trustee.role}-${index}`} trustee={trustee} />)}
          </div>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
