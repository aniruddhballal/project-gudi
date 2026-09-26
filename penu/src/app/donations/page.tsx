import Image from "next/image";
import Link from "next/link";

import { donationsContent } from "@/content/donations";
import { homeContent } from "@/content/home";

export default function DonationsPage() {
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
            <Link href="/about" className="hover:text-amber-800">About</Link>
            <span className="font-semibold text-amber-800">Donations</span>
            <Link href="/contact" className="hover:text-amber-800">Contact</Link>
            <Link href="/migration" className="text-stone-400 hover:text-stone-700">Migration tracker</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Support the kshetram</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{donationsContent.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-amber-50">{donationsContent.intro}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-12">
        {donationsContent.options.map((option) => (
          <article key={option.title} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
            <Image src={option.image} alt={option.title} width={900} height={560} className="h-56 w-full object-cover" />
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl font-semibold">{option.title}</h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">{option.description}</p>
              <Link href={option.href} className="mt-6 inline-flex w-fit rounded-lg bg-amber-800 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-900">
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

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl justify-between gap-4">
          <p>{homeContent.siteTitle}</p>
          <Link href="/" className="hover:text-stone-900">Back to home</Link>
        </div>
      </footer>
    </main>
  );
}
