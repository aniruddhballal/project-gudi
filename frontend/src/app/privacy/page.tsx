import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/public-page";
import { getSiteContent } from "@/lib/site-content";
import { ShieldCheck } from "lucide-react";

export default async function PrivacyPage() {
  const { home: homeContent, privacy: privacyContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow="Legal" title={privacyContent.title} description={privacyContent.intro} />

      <article className="mx-auto max-w-5xl px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#eadfd2]">
          <div className="flex items-center gap-4 border-b border-[#eadfd2] bg-[#fbf2e6] px-6 py-5 sm:px-9"><ShieldCheck className="h-6 w-6 text-[#9d431f]" aria-hidden="true" /><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f3d1e]">Trust and privacy</p></div>
          <div className="space-y-10 p-6 sm:p-10">{privacyContent.sections.map((section) => <section key={section.title} className="border-b border-[#eadfd2] pb-8 last:border-0 last:pb-0"><h2 className="display-type text-3xl text-[#3b241c]">{section.title}</h2><div className="mt-4 space-y-4 text-base leading-8 text-stone-700">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div>
        </div>
        <p className="mt-6 text-sm leading-6 text-stone-500">This page preserves the public source policy text. It requires legal and product review before the revamped site is treated as the operative policy.</p>
      </article>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
