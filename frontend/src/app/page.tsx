import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/site-content";

export default async function HomePage() {
  const { home: homeContent } = await getSiteContent();
  const [hero, ...featuredSlides] = homeContent.heroSlides;

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#241b18]">
      <SiteHeader />

      <section className="px-4 pb-5 pt-5 sm:px-8 lg:px-12 lg:pb-7 lg:pt-7">
        <div className="relative mx-auto min-h-[34rem] max-w-[1440px] overflow-hidden rounded-[1.75rem] bg-[#2c1916] shadow-[0_24px_70px_rgba(78,42,24,0.18)] sm:min-h-[40rem]">
          <Image src={hero.image} alt={hero.title} fill priority sizes="100vw" className="object-cover opacity-75 transition duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#20100e]/90 via-[#2c1916]/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-12 lg:max-w-3xl lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">Vasavi Penugonda · Sacred beginnings</p>
            <h1 className="display-type mt-4 text-5xl leading-[0.98] sm:text-7xl">{hero.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-200 sm:text-lg">{hero.description}</p>
            <Link href={hero.href} className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5c66b] px-5 py-3 text-sm font-bold text-[#2c1916] hover:bg-white">
              Discover the Trust <span aria-hidden="true" className="text-lg">↗</span>
            </Link>
          </div>
          <div className="absolute right-6 top-6 hidden rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white/80 sm:block">Penugonda, Andhra Pradesh</div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Explore Penugonda" title="A living centre of faith and service" description="Move through the Trust’s story, places, people, and ways to participate." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSlides.map((slide) => (
              <Link key={slide.image} href={slide.href} className="group relative min-h-72 overflow-hidden rounded-2xl bg-[#2c1916] text-white shadow-sm">
                <Image src={slide.image} alt={slide.title} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">Vasavi Penugonda</p>
                  <h2 className="mt-2 text-2xl font-semibold leading-tight">{slide.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-200">{slide.description}</p>
                  <span className="mt-4 inline-flex text-sm font-bold text-amber-200">Explore <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-grid border-y border-[#e8ddd0] bg-[#f3eee6] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.8fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <SectionHeading eyebrow="The Trust" title="A place with a purpose" description={homeContent.description} />
            <Link href="/about" className="mt-7 inline-flex rounded-full border border-[#8f3d1e] px-5 py-3 text-sm font-bold text-[#8f3d1e] hover:bg-[#8f3d1e] hover:text-white">Read about the Trust <span aria-hidden="true" className="ml-2">↗</span></Link>
          </div>
          <div>
            <h2 className="display-type text-3xl text-[#3b241c] sm:text-4xl">Aims &amp; objectives</h2>
            <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {homeContent.aims.map((aim, index) => (
                <li key={aim} className="rounded-2xl bg-white p-5 shadow-[0_5px_18px_rgba(87,50,29,0.05)] ring-1 ring-[#eadfd2]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5c66b] text-sm font-bold text-[#3b241c]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-4 text-sm leading-6 text-stone-600">{aim}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="A message from the Trust" title="For every devotee who visits" />
          <div className="mt-9 grid overflow-hidden rounded-[1.5rem] bg-[#2c1916] text-white lg:grid-cols-[0.8fr_1.1fr_1.1fr]">
            <div className="relative min-h-96">
              <Image src={homeContent.president.image} alt="Dr. P. N. Govindarajulu" fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6"><p className="text-sm font-bold text-amber-300">Dr. P. N. Govindarajulu</p><p className="mt-1 text-xs text-stone-300">President, Akhila Bharata Vasavi Penugonda Trust</p></div>
            </div>
            <MessageColumn title="ಕನ್ನಡ" paragraphs={homeContent.president.kannada} />
            <MessageColumn title="English" paragraphs={homeContent.president.english} />
          </div>
        </div>
      </section>

      <section className="bg-[#ead6b4] px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8f3d1e]">Upcoming event</p><h2 className="display-type mt-2 text-3xl text-[#3b241c] sm:text-4xl">{homeContent.event.name}</h2></div>
          <a href={homeContent.event.bulletinHref} target="_blank" rel="noreferrer" className="inline-flex w-fit shrink-0 rounded-full bg-[#8f3d1e] px-5 py-3 text-sm font-bold text-white hover:bg-[#6e2c17]">Open bulletin <span aria-hidden="true" className="ml-2">↗</span></a>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Explore further" title="Everything you need for your visit" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeContent.majorLinks.map((link, index) => (
              <Link key={link.href} href={link.href} className="group rounded-2xl border border-[#dfd1c2] bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-[#c58a43] hover:shadow-lg">
                <span className="text-xs font-bold text-[#b66b2a]">0{index + 1}</span>
                <h2 className="mt-8 text-xl font-semibold text-[#3b241c]">{link.label}</h2>
                <span className="mt-5 block text-sm font-bold text-[#8f3d1e]">Visit page <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="People behind the project" title="Great souls" description="The people whose service and vision continue to shape Vasavi Penugonda." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeContent.greatSouls.slice(0, 8).map((person) => (
              <article key={person.name} className="overflow-hidden rounded-2xl border border-[#eadfd2] bg-[#f7f3ed]">
                <div className="relative aspect-[4/3] bg-[#e9dfd3]"><Image src={person.image} alt={person.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" /></div>
                <div className="p-5"><h3 className="font-semibold text-[#3b241c]">{person.name}</h3>{person.role && <p className="mt-1 text-sm font-semibold text-[#a45826]">{person.role}</p>}{person.description && <p className="mt-3 line-clamp-4 text-sm leading-6 text-stone-600">{person.description}</p>}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Gallery" title="A glimpse of the kshetram" /><Link href="/gallery/photos" className="text-sm font-bold text-[#8f3d1e] hover:text-[#5d2615]">View full gallery <span aria-hidden="true">→</span></Link></div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {homeContent.gallery.map((photo, index) => <div key={photo.image} className={`relative overflow-hidden rounded-2xl bg-[#e9dfd3] ${index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}><Image src={photo.image} alt={photo.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-500 hover:scale-105" /></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#2c1916] px-4 py-14 text-white sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Visit us</p><h2 className="display-type mt-3 text-4xl sm:text-5xl">Come to Penugonda.<br />Stay connected.</h2><div className="mt-8 grid gap-6 sm:grid-cols-2">{homeContent.contact.map((location) => <address key={location.name} className="not-italic text-sm leading-7 text-stone-300"><h3 className="font-bold text-white">{location.name}</h3>{location.lines.map((line) => <p key={line}>{line}</p>)}</address>)}</div><Link href="/contact" className="mt-8 inline-flex rounded-full bg-[#f5c66b] px-5 py-3 text-sm font-bold text-[#2c1916] hover:bg-white">Get directions and contact details <span aria-hidden="true" className="ml-2">↗</span></Link></div>
          <div className="rounded-[1.5rem] bg-white p-7 text-[#3b241c] sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#a45826]">Stay in the loop</p><h2 className="display-type mt-3 text-3xl">Our Newsletter</h2><p className="mt-3 text-sm leading-6 text-stone-600">Receive updates about events, sevas, and the work of the Trust.</p><form className="mt-6 grid gap-3"><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" className="rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#a45826]" /><button type="submit" className="rounded-xl bg-[#8f3d1e] px-4 py-3 text-sm font-bold text-white hover:bg-[#6e2c17]">Subscribe</button></form><p className="mt-3 text-xs text-stone-400">Subscription will be connected to the backend API in V2.</p></div>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a45826]">{eyebrow}</p><h2 className="display-type mt-3 text-4xl leading-tight text-[#3b241c] sm:text-5xl">{title}</h2>{description && <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">{description}</p>}</div>;
}

function MessageColumn({ title, paragraphs }: { title: string; paragraphs: readonly string[] }) {
  return <div className="p-7 sm:p-9"><h3 className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">{title}</h3><div className="mt-5 space-y-4 text-sm leading-7 text-stone-300">{paragraphs.slice(0, 4).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>;
}
