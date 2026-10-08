import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContentImage } from "@/components/content-image";
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
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <article className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_50px_rgba(78,42,24,0.08)] ring-1 ring-[#eadfd2]">
            <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-12">
              <div className="text-base leading-7 text-stone-700">
                <div className="grid items-start gap-10 lg:grid-cols-2">
                  <div className="relative mb-8 w-full overflow-hidden rounded-2xl bg-[#2c1916] lg:mb-0">
                    <ContentImage src={image} alt={title} className="mx-auto h-auto max-h-[48rem] w-full object-contain" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">{eyebrow}</p>
                      <h1 className="display-type mt-3 text-4xl leading-tight sm:text-5xl">{title}</h1>
                    </div>
                  </div>
                  <div className="min-w-0">
                    {sectionTitle && <h2 className="display-type text-3xl leading-tight text-[#3b241c] sm:text-4xl">{sectionTitle}</h2>}
                    <div className="space-y-4 pt-5">
                      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    {highlight && <p className="mt-10 border-l-4 border-[#e4b34e] bg-[#fff8e7] px-5 py-4 text-lg font-bold leading-8 text-[#5d2c19]">{highlight}</p>}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#ead6b4] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8f3d1e]">Support this seva</p>
            <h2 className="display-type mt-3 text-4xl text-[#3b241c] sm:text-5xl">Make a donation</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#634a3c]">Enter your details below to continue with the {title} donation journey.</p>
          </div>
          <form className="grid w-full gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#dfc89f] sm:p-7 lg:max-w-xl lg:justify-self-end">
            <input type="hidden" name="type" value={formType} />
            <label className="block text-sm font-medium text-stone-700">Name<input name="name" minLength={5} required className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3" placeholder="Your full name" /></label>
            <label className="block text-sm font-medium text-stone-700">Phone number<input name="phone" inputMode="numeric" pattern="[0-9]{10}" required className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3" placeholder="10-digit phone number" /></label>
            <label className="block text-sm font-medium text-stone-700">Donation amount (₹)<input name="amount" inputMode="decimal" min="1" required className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-3" placeholder="Enter amount" /></label>
            <button type="button" className="rounded-xl bg-[#8f3d1e] px-4 py-3 text-sm font-bold text-white hover:bg-[#6e2c17]">Continue to payment <span aria-hidden="true" className="ml-2">→</span></button>
            <p className="text-xs leading-5 text-stone-500">Payment creation, provider checkout, confirmation, and donor records will be connected when the backend API is available.</p>
          </form>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
