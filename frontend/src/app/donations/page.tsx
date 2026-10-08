import Link from "next/link";

import { ContentImage } from "@/components/content-image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";

export default async function DonationsPage() {
  const { donations: donationsContent, home: homeContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="bg-[#2c1916] px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Support the kshetram</p>
          <h1 className="display-type mt-4 text-5xl leading-tight sm:text-6xl">{donationsContent.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-amber-50">{donationsContent.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-8 lg:px-12">
        {donationsContent.options.map((option) => (
          <article key={option.title} className="grid overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-stone-200 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex items-center justify-center bg-[#2c1916] p-6 sm:p-10">
              <ContentImage src={option.image} alt={option.title} className="h-auto max-h-[34rem] w-auto max-w-full object-contain" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#a45826]">Vasavi Penugonda seva</p>
              <h2 className="display-type mt-3 text-4xl text-[#3b241c]">{option.title}</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">{option.description}</p>
              <Link href={option.href} className="mt-7 inline-flex w-fit rounded-full bg-[#8f3d1e] px-5 py-3 text-sm font-bold text-white hover:bg-[#6e2c17]">
                View donation details
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-stone-200 bg-white px-4 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Donation integration</p>
            <h2 className="mt-2 text-2xl font-semibold">Payment processing will be connected through the backend API.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">This frontend migration preserves the original donation journeys and content. Provider checkout, payment status, receipts, and donor records remain pending backend coordination.</p>
          </div>
          <Link href="/contact" className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:border-amber-700 hover:text-amber-800">Contact the trust</Link>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
