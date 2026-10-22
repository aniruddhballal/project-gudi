import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContentImage } from "@/components/content-image";
import { DonationForm } from "@/components/donation-form";
import { getSiteContent } from "@/lib/site-content";
import { ArrowDown, CheckCircle2, HeartHandshake, Sparkles } from "lucide-react";

type DonationPageProps = {
  title: string;
  eyebrow: string;
  image: string | null;
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
  const { home: homeContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.donationDetail;
  const imageFrameClass = formType === "eHundi" ? "bg-[#142b27]" : "bg-[#ead8bd]";

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#183a34] px-4 pb-10 pt-10 text-white sm:px-8 lg:px-12 lg:pb-14 lg:pt-14">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border-[34px] border-[#e9b86d]/10" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-300"><Sparkles className="h-4 w-4" /> {eyebrow}</p>
            <h1 id="page-content" className="display-type mt-4 max-w-xl text-5xl leading-[0.98] sm:text-6xl">{title} {copy.heroSuffix}</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#f5e5d5]">{copy.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#f5e5d5]">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-300" /> {copy.supportLabel}</span>
              <span className="inline-flex items-center gap-2"><HeartHandshake className="h-4 w-4 text-amber-300" /> {copy.offeringLabel}</span>
            </div>
          </div>
          <div className={`relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl ${imageFrameClass} shadow-[0_24px_70px_rgba(0,0,0,0.24)]`}>
            <ContentImage src={image} alt={title} className="h-auto max-h-[38rem] w-full object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/5" />
            <p className="absolute bottom-5 left-5 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur sm:bottom-7 sm:left-7">{copy.imageLabel}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#eee4d3] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border-[28px] border-[#f7e7c8]/60" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8c3c2e]">{copy.whyEyebrow}</p>
            <h2 className="display-type mt-3 max-w-lg text-4xl leading-tight text-[#203b35] sm:text-5xl">{copy.whyTitle}</h2>
            <div className="mt-8 space-y-4 text-sm leading-7 text-[#4d5b52]">
              {paragraphs.slice(0, 3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {sectionTitle && <div className="mt-8 rounded-2xl border border-[#cdb98c] bg-[#eee7da]/70 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c3c2e]">{sectionTitle}</p>
              {highlight && <p className="mt-3 text-sm font-semibold leading-6 text-[#5d2c19]">{highlight}</p>}
            </div>}
          </div>
          <div>
            <DonationForm formType={formType} title={title} copy={copy} />
            <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs font-semibold text-[#4d5b52]"><ArrowDown className="h-4 w-4" /> {copy.privacyNote}</p>
          </div>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
