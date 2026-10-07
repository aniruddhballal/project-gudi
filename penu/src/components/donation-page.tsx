import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/site-content";

type DonationPageProps = {
  title: string;
  eyebrow: string;
  image: string;
  formType: string;
  paragraphs: readonly string[];
  highlight?: string;
  sectionTitle?: string;
};

export async function DonationPage({
  title,
  eyebrow,
  image,
  formType,
  paragraphs,
  highlight,
  sectionTitle,
}: DonationPageProps) {
  const { home: homeContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-14 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{title}</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 sm:p-8">
          <Image src={image} alt={title} width={1000} height={620} className="mb-8 h-auto max-h-[28rem] w-full rounded-xl object-cover" />
          {highlight && <p className="rounded-xl bg-amber-50 p-5 text-lg font-semibold leading-8 text-amber-950 ring-1 ring-amber-100">{highlight}</p>}
          {sectionTitle && <h2 className="mt-8 text-2xl font-semibold">{sectionTitle}</h2>}
          <div className="space-y-5 pt-5 text-base leading-8 text-stone-700">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 sm:p-8">
          <h2 className="text-2xl font-semibold">Make a donation</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">Enter your details below to continue with the {title} donation journey.</p>
          <form className="mt-6 space-y-4">
            <input type="hidden" name="type" value={formType} />
            <label className="block text-sm font-medium text-stone-700">
              Name
              <input name="name" minLength={5} required className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5" placeholder="Your full name" />
            </label>
            <label className="block text-sm font-medium text-stone-700">
              Phone number
              <input name="phone" inputMode="numeric" pattern="[0-9]{10}" required className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5" placeholder="10-digit phone number" />
            </label>
            <label className="block text-sm font-medium text-stone-700">
              Donation amount (₹)
              <input name="amount" inputMode="decimal" min="1" required className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2.5" placeholder="Enter amount" />
            </label>
            <button type="button" className="w-full rounded-lg bg-amber-800 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-900">Continue to payment</button>
          </form>
          <p className="mt-4 text-xs leading-5 text-stone-500">Payment creation, provider checkout, confirmation, and donor records will be connected when the backend API is available.</p>
        </aside>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl justify-between gap-4">
          <p>{homeContent.siteTitle}</p>
          <Link href="/donations" className="hover:text-stone-900">All donations</Link>
        </div>
      </footer>
    </main>
  );
}
