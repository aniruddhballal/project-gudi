import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";

export default async function PrivacyPage() {
  const { home: homeContent, privacy: privacyContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="bg-[#2c1916] px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Legal</p>
          <h1 className="display-type mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">{privacyContent.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-amber-50">{privacyContent.intro}</p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-8 lg:px-12">
        <div className="space-y-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 sm:p-10">
          {privacyContent.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold text-stone-900">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-stone-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-stone-500">This page preserves the public source policy text. It requires legal and product review before the revamped site is treated as the operative policy.</p>
      </article>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
