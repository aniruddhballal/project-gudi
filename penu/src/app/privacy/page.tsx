import Image from "next/image";
import Link from "next/link";

import { homeContent } from "@/content/home";
import { privacyContent } from "@/content/privacy";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/legacy/home/logo.png" alt="Vasavi Penugonda Trust" width={100} height={60} />
            <span className="max-w-56 text-sm font-semibold leading-tight">{homeContent.siteTitle}</span>
          </Link>
          <nav className="ml-auto flex flex-wrap gap-4 text-sm text-stone-600" aria-label="Page navigation">
            <Link href="/" className="hover:text-amber-800">Home</Link>
            <Link href="/contact" className="hover:text-amber-800">Contact</Link>
            <span className="font-semibold text-amber-800">Privacy</span>
            <Link href="/migration" className="text-stone-400 hover:text-stone-700">Migration tracker</Link>
          </nav>
        </div>
      </header>

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
