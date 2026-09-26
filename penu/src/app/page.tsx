import Image from "next/image";
import Link from "next/link";

import { homeContent } from "@/content/home";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Overview", href: "/overview" },
  { label: "News", href: "/news" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Vasavidham", href: "/vasavi-dham" },
  { label: "Story", href: "/story" },
  { label: "Donations", href: "/donations" },
  { label: "Trustees", href: "/trustees" },
  { label: "Photos", href: "/gallery/photos" },
  { label: "Videos", href: "/gallery/videos" },
  { label: "Contact", href: "/contact" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/legacy/home/logo.png" alt="Vasavi Penugonda Trust" width={124} height={75} />
            <span className="max-w-56 text-sm font-semibold leading-tight">
              {homeContent.siteTitle}
            </span>
          </Link>
          <nav className="flex min-w-0 flex-1 flex-wrap gap-x-4 gap-y-2 text-sm text-stone-600" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-amber-800">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/migration" className="text-xs text-stone-400 hover:text-stone-700">
            Migration tracker
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-8 lg:grid-cols-2 lg:px-12">
        {homeContent.heroSlides.map((slide, index) => (
          <article key={slide.image} className={`relative overflow-hidden rounded-2xl bg-stone-900 ${index === 0 ? "lg:col-span-2" : ""}`}>
            <div className={`relative ${index === 0 ? "h-[26rem]" : "h-56"}`}>
              <Image src={slide.image} alt={slide.title} fill priority={index === 0} sizes={index === 0 ? "100vw" : "(max-width: 1024px) 100vw, 50vw"} className="object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Vasavi Penugonda</p>
                <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{slide.title}</h1>
                <p className="mt-2 max-w-xl text-sm text-stone-200">{slide.description}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">About the trust</p>
          <h2 className="mt-3 text-3xl font-semibold">{homeContent.siteTitle}</h2>
          <p className="mt-4 leading-7 text-stone-600">{homeContent.description}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-xl font-semibold">Aims &amp; objectives of the Trust</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
            {homeContent.aims.map((aim) => <li key={aim} className="border-l-2 border-amber-300 pl-3">{aim}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="President’s message" title="Message to Devotees" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr_1fr]">
            <div className="relative min-h-80 overflow-hidden rounded-2xl bg-stone-100">
              <Image src={homeContent.president.image} alt="Dr. P. N. Govindarajulu" fill sizes="(max-width: 1024px) 100vw, 18rem" className="object-cover" />
            </div>
            <MessageColumn title="ಕನ್ನಡ" paragraphs={homeContent.president.kannada} />
            <MessageColumn title="English" paragraphs={homeContent.president.english} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="Major links" title="Explore the Trust" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeContent.majorLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-2xl bg-amber-50 p-6 text-xl font-semibold text-amber-950 ring-1 ring-amber-100 hover:bg-amber-100">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-amber-950 px-4 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">{homeContent.event.title}</p>
            <h2 className="mt-2 text-2xl font-semibold">{homeContent.event.name}</h2>
          </div>
          <a href={homeContent.event.bulletinHref} target="_blank" rel="noreferrer" className="w-fit rounded-lg bg-white px-4 py-2 text-sm font-semibold text-amber-950 hover:bg-amber-100">
            Open bulletin
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="Great souls" title="Behind the Project" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeContent.greatSouls.map((person) => (
            <article key={person.name} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
              <div className="relative aspect-square bg-stone-100">
                <Image src={person.image} alt={person.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{person.name}</h3>
                {person.role && <p className="mt-1 text-sm text-amber-800">{person.role}</p>}
                {person.description && <p className="mt-3 text-sm leading-6 text-stone-600">{person.description}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Gallery" title="Recent Photos" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeContent.gallery.map((photo) => (
              <div key={photo.image} className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
                <Image src={photo.image} alt={photo.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div>
          <SectionHeading eyebrow="Visit us" title="Contact" />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {homeContent.contact.map((location) => (
              <address key={location.name} className="not-italic text-sm leading-7 text-stone-600">
                <h3 className="font-semibold text-stone-900">{location.name}</h3>
                {location.lines.map((line) => <p key={line}>{line}</p>)}
                <p className="mt-2">Email: {homeContent.email}</p>
              </address>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-xl font-semibold">Our Newsletter</h2>
          <p className="mt-2 text-sm text-stone-600">Enter your email id to subscribe for newsletter.</p>
          <form className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input id="newsletter-email" type="email" placeholder="you@example.com" className="min-w-0 flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-700" />
            <button type="submit" className="rounded-lg bg-amber-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">Subscribe</button>
          </form>
          <p className="mt-3 text-xs text-stone-400">Subscription will be connected to the backend API in V2.</p>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© Copyright 2010-2020 Akhila Bharat Sri Vasavi Penugonda Temple Trust (R). All Rights Reserved.</p>
          <Link href="/privacy" className="hover:text-stone-900">Website and Mobile App Privacy Policy</Link>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function MessageColumn({ title, paragraphs }: { title: string; paragraphs: readonly string[] }) {
  return (
    <div className="text-sm leading-7 text-stone-600">
      <h3 className="font-semibold text-stone-900">{title}</h3>
      {paragraphs.map((paragraph) => <p key={paragraph} className="mt-3">{paragraph}</p>)}
    </div>
  );
}
