import Link from "next/link";

import { ContentImage } from "@/components/content-image";
import { PrimaryLink, SectionHeading, SecondaryLink } from "@/components/public-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/site-content";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

export default async function HomePage() {
  const { home: homeContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy;
  const [hero, ...featuredSlides] = homeContent.heroSlides;
  const people = homeContent.greatSouls;

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#20332e]">
      <SiteHeader />

      <section className="overflow-hidden border-b border-[#d9d2c4] bg-[#f0ece2] px-4 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14">
          <div className="order-2 pb-3 lg:order-1 lg:py-8">
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8c3c2e]"><span className="h-px w-8 bg-[#a86e38]" />{copy.home.heroEyebrow}</p>
            <h1 id="page-content" className="display-type mt-5 max-w-2xl text-5xl leading-[1.02] text-[#183a34] sm:text-6xl lg:text-[5.25rem]">{hero.title}</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#4d5b52] sm:text-lg">{hero.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"><PrimaryLink href={hero.href}>{copy.home.heroCta}</PrimaryLink><Link href="/contact" className="inline-flex items-center text-sm font-bold text-[#203b35] underline decoration-[#bd9458] decoration-2 underline-offset-4 hover:text-[#8c3c2e]">{copy.home.visitCta}<ArrowRight className="ml-2 h-4 w-4" /></Link></div>
            <p className="mt-10 border-t border-[#d9d2c4] pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#697369]">{homeContent.siteTitle}</p>
          </div>
          <div className="order-1 relative min-h-[19rem] overflow-hidden border border-[#d5c6a9] bg-[#e7dfd0] p-3 sm:min-h-[26rem] sm:p-5 lg:order-2 lg:min-h-[34rem]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-5 border border-white/65 sm:inset-7" />
            <ContentImage src={hero.image} alt={hero.title} className="relative h-full min-h-[18rem] w-full object-contain sm:min-h-[24rem] lg:min-h-[32rem]" />
            <span className="absolute bottom-5 left-5 bg-[#f8f6f1]/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#203b35] sm:bottom-8 sm:left-8">{homeContent.siteTitle}</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <SectionHeading eyebrow={copy.home.exploreEyebrow} title={copy.home.exploreTitle} description={copy.home.exploreDescription} />
            <div className="divide-y divide-[#ded7c9] border-y border-[#ded7c9]">
              {featuredSlides.map((slide, index) => <Link key={slide.image} href={slide.href} className="group grid gap-4 py-4 sm:grid-cols-[3rem_7rem_1fr_auto] sm:items-center sm:py-5"><span className="display-type text-2xl text-[#b08a51]">{String(index + 1).padStart(2, "0")}</span><div className="flex h-20 items-center justify-center overflow-hidden bg-[#eee9dd] p-2"><ContentImage src={slide.image} alt={slide.title} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]" /></div><div><h2 className="display-type text-2xl text-[#203b35] group-hover:text-[#8c3c2e]">{slide.title}</h2><p className="mt-1 text-sm leading-6 text-[#58645c]">{slide.description}</p></div><ArrowRight className="hidden h-5 w-5 text-[#a44832] transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true" /></Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="page-grid border-y border-[#dfd9cd] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div><SectionHeading eyebrow={copy.home.trustEyebrow} title={copy.home.trustTitle} description={homeContent.description} /></div>
          <div className="flex flex-col items-start gap-5 lg:items-end"><SecondaryLink href="/about">{copy.home.trustCta}</SecondaryLink></div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow={copy.home.presidentEyebrow} title={copy.home.presidentTitle} /><p className="max-w-sm text-sm leading-6 text-[#58645c]">A message in Kannada and English.</p></div>
          <div className="grid overflow-hidden border border-[#d9d2c4] bg-[#f2eee5] lg:grid-cols-[0.65fr_1fr_1fr]">
            <div className="flex flex-col border-b border-[#d9d2c4] lg:border-b-0 lg:border-r"><div className="flex flex-1 items-center justify-center bg-[#e8e0d2] p-5"><ContentImage src={homeContent.president.image} alt={copy.home.presidentName} className="h-auto max-h-[25rem] w-auto max-w-full object-contain" /></div><div className="p-5"><p className="text-sm font-bold text-[#203b35]">{copy.home.presidentName}</p><p className="mt-1 text-xs text-[#58645c]">{copy.home.presidentRole}</p></div></div>
            <MessageColumn title="ಕನ್ನಡ" paragraphs={homeContent.president.kannada} /><MessageColumn title="English" paragraphs={homeContent.president.english} />
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9d2c4] bg-[#eee4d3] px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c3c2e]"><CalendarDays className="h-4 w-4" />{copy.home.eventEyebrow}</p><h2 className="display-type mt-2 text-2xl text-[#203b35] sm:text-3xl">{homeContent.event.name}</h2></div><a href={homeContent.event.bulletinHref} target="_blank" rel="noreferrer" className="inline-flex w-fit shrink-0 items-center border border-[#a44832] px-4 py-3 text-sm font-bold text-[#8c3c2e] hover:bg-[#a44832] hover:text-white">{copy.home.eventCta}<ArrowRight className="ml-2 h-4 w-4" /></a></div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow={copy.home.furtherEyebrow} title={copy.home.furtherTitle} /><p className="max-w-md text-sm leading-7 text-[#58645c]">Explore the Trust, its history, places, and ways to take part.</p></div><div className="mt-8 grid border-t border-[#ded7c9] sm:grid-cols-2 lg:grid-cols-4">{homeContent.majorLinks.map((link, index) => <Link key={link.href} href={link.href} className="group border-b border-[#ded7c9] py-5 pr-4 sm:border-r sm:px-5 sm:first:pl-0 lg:border-b-0 lg:last:border-r-0"><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a86e38]">Path {String(index + 1).padStart(2, "0")}</span><h2 className="display-type mt-3 text-2xl text-[#203b35] group-hover:text-[#8c3c2e]">{link.label}</h2><span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-[0.12em] text-[#8c3c2e]">{copy.home.furtherCta}<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div>
      </section>

      <section className="bg-[#f0ece2] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><SectionHeading eyebrow={copy.home.soulsEyebrow} title={copy.home.soulsTitle} description={copy.home.soulsDescription} />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{people.map((person) => <article key={person.name} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-[#d9d2c4] py-5 sm:grid-cols-[8rem_1fr]"><div className="flex h-32 w-[6.5rem] shrink-0 items-center justify-center overflow-hidden border border-[#cdb98c]/60 bg-[#eee9dd] sm:h-40 sm:w-32"><ContentImage src={person.image} alt={person.name} className="h-full w-full object-contain" /></div><div className="min-w-0"><h3 className="display-type text-xl leading-tight text-[#203b35] sm:text-2xl">{person.name}</h3>{person.role && <p className="mt-2 text-xs font-semibold leading-5 text-[#8c3c2e]">{person.role}</p>}{person.description && <p className="mt-3 text-xs leading-5 text-[#58645c]">{person.description}</p>}</div></article>)}</div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow={copy.home.galleryEyebrow} title={copy.home.galleryTitle} /><Link href="/gallery/photos" className="inline-flex w-fit items-center text-sm font-bold text-[#8c3c2e] hover:text-[#6e2c17]">{copy.home.galleryCta}<ArrowRight className="ml-2 h-4 w-4" /></Link></div><div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">{homeContent.gallery.map((photo, index) => <div key={`${photo.image}-${index}`} className={`flex min-h-28 items-center justify-center overflow-hidden border border-[#e2ddd1] bg-[#f0ece2] p-2 sm:min-h-40 sm:p-3 ${index === 0 ? "col-span-2 row-span-2" : ""}`}><ContentImage src={photo.image} alt={photo.alt} className="h-full max-h-[25rem] w-full object-contain" /></div>)}</div></div>
      </section>

      <section className="bg-[#183a34] px-4 py-12 text-white sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"><div><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfbd7a]"><MapPin className="h-4 w-4" />{copy.home.visitEyebrow}</p><h2 className="display-type mt-3 max-w-xl text-4xl sm:text-5xl">{copy.home.visitTitle}</h2><div className="mt-7 grid gap-5 sm:grid-cols-2">{homeContent.contact.map((location) => <address key={location.name} className="not-italic text-sm leading-6 text-[#e7e3d8]"><h3 className="text-xs font-bold uppercase tracking-[0.1em] text-white">{location.name}</h3>{location.lines.map((line) => <p key={line}>{line}</p>)}</address>)}</div><div className="mt-7"><PrimaryLink href="/contact">{copy.home.visitCta}</PrimaryLink></div></div><div className="border border-white/20 bg-[#f8f6f1] p-6 text-[#203b35] sm:p-8"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#965b35]">{copy.home.newsletterEyebrow}</p><h2 className="display-type mt-3 text-3xl">{copy.home.newsletterTitle}</h2><p className="mt-3 text-sm leading-6 text-[#58645c]">{copy.home.newsletterDescription}</p><form className="mt-5 grid gap-3"><label htmlFor="newsletter-email" className="sr-only">{copy.home.newsletterPlaceholder}</label><input id="newsletter-email" type="email" placeholder={copy.home.newsletterPlaceholder} className="border border-[#d6cec0] bg-white px-4 py-3 text-sm outline-none focus:border-[#965b35]" /><button type="submit" className="bg-[#a44832] px-4 py-3 text-sm font-bold text-white hover:bg-[#873b2b]">{copy.home.newsletterCta}</button></form><p className="mt-3 text-xs text-[#73796f]">{copy.home.newsletterNote}</p></div></div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}

function MessageColumn({ title, paragraphs }: { title: string; paragraphs: readonly string[] }) {
  return <div className="p-6 sm:p-8"><h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8c3c2e]">{title}</h3><div className="mt-4 space-y-4 text-sm leading-7 text-[#4d5b52]">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>;
}
