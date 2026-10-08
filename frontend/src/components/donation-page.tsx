import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContentImage } from "@/components/content-image";
import { getSiteContent } from "@/lib/site-content";
import { ChevronRight } from "lucide-react";

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
  const imageFrameClass = title === "E-Hundi" ? "bg-black" : "bg-white";
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <article className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_50px_rgba(78,42,24,0.08)] ring-1 ring-[#eadfd2] lg:rounded-l-none lg:rounded-r-[1.5rem]">
            <div>
              <div className="grid items-start lg:grid-cols-[max-content_minmax(0,1fr)] lg:items-stretch">
                <div className={`relative flex w-full items-stretch justify-start ${imageFrameClass} lg:h-full`}>
                  <div className="relative flex h-full min-h-full w-fit max-w-full flex-col self-stretch">
                    <ContentImage src={image} alt={title} className="block h-full min-h-full w-auto max-w-full object-contain" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">{eyebrow}</p>
                      <h1 className="display-type mt-3 text-4xl leading-tight sm:text-5xl">{title}</h1>
                    </div>
                  </div>
                </div>
                <div className="min-w-0 px-6 py-8 text-lg leading-8 text-stone-700 sm:px-8 sm:py-12 lg:pl-8 lg:pr-10">
                  {sectionTitle && <h2 className="display-type text-3xl leading-tight text-[#3b241c] sm:text-4xl">{sectionTitle}</h2>}
                  <div className="space-y-4 pt-5">
                    {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ead6b4] px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border-[28px] border-[#f7e7c8]/60" />
        <div className="pointer-events-none absolute -bottom-40 left-[38%] h-96 w-96 rounded-full bg-[#f3d8a6]/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-14">
          <div className="relative flex min-h-full flex-col justify-center overflow-hidden rounded-[1.75rem] border border-[#d6b681] bg-[#f8edda]/65 px-7 py-8 sm:px-9 sm:py-10 lg:px-10">
            <span aria-hidden="true" className="display-type pointer-events-none absolute -bottom-8 -right-5 text-[9rem] font-bold uppercase leading-none text-[#8f3d1e]/[0.06]">Seva</span>
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8f3d1e]">Support this seva</p>
              <h2 className="display-type mt-3 text-4xl text-[#3b241c] sm:text-5xl">Make a donation</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#634a3c]">Enter your details below to continue with the {title} donation journey.</p>
              {highlight && <div className="mt-8 border-t border-[#d6b681] pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f3d1e]">Impact so far</p>
                <p className="mt-3 max-w-lg text-base font-semibold leading-7 text-[#5d2c19] sm:text-lg">{highlight}</p>
              </div>}
            </div>
          </div>
          <form className="grid w-full gap-4 rounded-[1.75rem] bg-white p-6 shadow-[0_18px_50px_rgba(78,42,24,0.1)] ring-1 ring-[#dfc89f] sm:p-8 lg:max-w-xl lg:justify-self-end">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f3d1e]">Donation details</p>
                <p className="mt-1 text-sm text-stone-500">A few details to get started.</p>
              </div>
            </div>
            <input type="hidden" name="type" value={formType} />
            <label className="block text-sm font-medium text-stone-700">Name<input name="name" minLength={5} required className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3" placeholder="Your full name" /></label>
            <label className="block text-sm font-medium text-stone-700">Phone number<input name="phone" inputMode="numeric" pattern="[0-9]{10}" required className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3" placeholder="10-digit phone number" /></label>
            <label className="block text-sm font-medium text-stone-700">Donation amount (₹)<input name="amount" inputMode="decimal" min="1" required className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3" placeholder="Enter amount" /></label>
            <button type="button" className="inline-flex items-center justify-center rounded-xl bg-[#8f3d1e] px-4 py-3 text-sm font-bold text-white hover:bg-[#6e2c17]">Continue to payment <ChevronRight aria-hidden="true" className="ml-2 h-4 w-4" /></button>
            <p className="text-xs leading-5 text-stone-500">Payment creation, provider checkout, confirmation, and donor records will be connected when the backend API is available.</p>
          </form>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
