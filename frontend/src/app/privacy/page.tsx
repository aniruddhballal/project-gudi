import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/site-content";

export default async function PrivacyPage() {
  const { home: homeContent, privacy: privacyContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Legal</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold sm:text-5xl">{privacyContent.title}</h1>
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

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl justify-between gap-4">
          <p>{homeContent.siteTitle}</p>
          <Link href="/" className="hover:text-stone-900">Back to home</Link>
        </div>
      </footer>
    </main>
  );
}
