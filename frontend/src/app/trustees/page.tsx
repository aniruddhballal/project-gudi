import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/site-content";
import type { Trustee } from "@/content/trustees";

function TrusteeCard({ trustee }: { trustee: Trustee }) {
  return (
    <article className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-amber-50 text-center text-xs text-amber-800 ring-1 ring-amber-100">
        {trustee.image ? <Image src={trustee.image} alt={trustee.name} width={240} height={240} className="h-full w-full object-cover" /> : "Portrait unavailable"}
      </div>
      <div>
        <h2 className="text-lg font-semibold">{trustee.name}</h2>
        <p className="mt-1 text-sm font-semibold text-amber-700">{trustee.role}</p>
        <p className="mt-3 text-sm leading-6 text-stone-600">{trustee.description}</p>
      </div>
    </article>
  );
}

export default async function TrusteesPage() {
  const { home: homeContent, trustees: trusteesContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Leadership</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{trusteesContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">The patron and executive committee listings preserved from the original public site.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-semibold">Patrons</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">{trusteesContent.patrons.map((trustee) => <TrusteeCard key={`${trustee.name}-${trustee.role}`} trustee={trustee} />)}</div>
        <h2 className="mt-14 text-3xl font-semibold">Executive Committee</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">{trusteesContent.executive.map((trustee, index) => <TrusteeCard key={`${trustee.name}-${trustee.role}-${index}`} trustee={trustee} />)}</div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl justify-between gap-4">
          <p>{homeContent.siteTitle}</p>
          <Link href="/" className="hover:text-stone-900">Back to home</Link>
        </div>
      </footer>
    </main>
  );
}
