import Link from "next/link";

import { ContentImage } from "@/components/content-image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";
import type { DonationOption } from "@/content/donations";
import { ArrowRight, CheckCircle2, HeartHandshake, Landmark, Utensils } from "lucide-react";

function DonationCopy({ option }: { option: DonationOption }) {
  const details = option.title === "Annadanam"
    ? { label: "Feed a pilgrim", detail: "Meals served with dignity", icon: Utensils }
    : option.title === "Go Shala"
      ? { label: "Care for Gau Mata", detail: "Shelter, food, and wellbeing", icon: HeartHandshake }
      : { label: "Build the kshetram", detail: "Support the sacred shrine", icon: Landmark };
  const Icon = details.icon;

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col p-7 sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#a45826]">Vasavi Penugonda seva</p>
        <Icon className="h-5 w-5 text-[#b96d3b]" aria-hidden="true" />
      </div>
      <h2 className="display-type mt-3 text-4xl text-[#3b241c]">{option.title}</h2>
      <p className="mt-2 text-sm font-semibold text-[#8f3d1e]">{details.label}</p>
      <p className="mt-4 text-base leading-8 text-stone-600">{option.description}</p>
      <div className="mt-auto pt-6">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-stone-500"><CheckCircle2 className="h-4 w-4 text-[#a45826]" /> {details.detail}</div>
        <Link href={option.href} className="group inline-flex w-fit items-center rounded-full bg-[#8f3d1e] px-5 py-3 text-sm font-bold text-white hover:bg-[#6e2c17]">
          Explore this seva <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default async function DonationsPage() {
  const { donations: donationsContent, home: homeContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#2c1916] px-4 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full border-[34px] border-[#e9b86d]/10" />
        <div className="mx-auto max-w-7xl">
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Support the kshetram</p>
              <h1 className="display-type mt-4 max-w-3xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Give where your heart is called.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-amber-50">{donationsContent.intro}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">A little goes a long way</p>
              <p className="display-type mt-3 text-4xl text-white">Choose a seva that feels meaningful to you.</p>
              <p className="mt-4 text-sm leading-6 text-[#f5e5d5]">From feeding pilgrims to caring for cows and building the shrine, every contribution becomes part of the kshetram&apos;s story.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a45826]">Choose your seva</p>
            <h2 className="display-type mt-2 text-4xl text-[#3b241c] sm:text-5xl">Offer with purpose</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-stone-500">Select a cause below to learn how your donation supports the daily life and future of Vasavi Penugonda.</p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          {donationsContent.options.filter((option) => option.title !== "Go Shala").map((option) => (
            <article key={option.title} className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#eadfd2]">
              <div className="flex min-h-[18rem] items-center justify-center overflow-hidden border-b border-[#eadfd2] bg-[#fbf2e6]">
                <ContentImage src={option.image} alt={option.title} className="h-full max-h-[25rem] w-full object-cover transition duration-500 hover:scale-[1.03]" />
              </div>
              <DonationCopy option={option} />
            </article>
          ))}
        </div>

        {donationsContent.options.filter((option) => option.title === "Go Shala").map((option) => (
          <article key={option.title} className="grid overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 ring-[#eadfd2] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-stretch">
            <div className="flex min-h-[18rem] items-center justify-center overflow-hidden border-b border-[#eadfd2] bg-[#fbf2e6] lg:min-h-0 lg:border-b-0 lg:border-r">
              <ContentImage src={option.image} alt={option.title} className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
            </div>
            <DonationCopy option={option} />
          </article>
        ))}
      </section>

      <section className="border-y border-[#eadfd2] bg-[#fbf2e6] px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a45826]">How it works</p>
            <h2 className="display-type mt-2 text-4xl text-[#3b241c]">A clear path from intention to offering.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Choose the seva that speaks to you", "Share a few details and your offering", "Complete secure payment and receive confirmation"].map((step, index) => (
              <div key={step} className="rounded-2xl bg-white p-5 ring-1 ring-[#eadfd2]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#9d431f] text-sm font-bold text-white">{index + 1}</span>
                <p className="mt-4 text-base font-semibold leading-6 text-[#3b241c]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white px-4 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Need help with your offering?</p>
            <h2 className="mt-2 text-2xl font-semibold">The Trust team is here for you.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Payment processing, receipts, and donor records will be connected through the backend API.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:border-amber-700 hover:text-amber-800">Contact the Trust <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
