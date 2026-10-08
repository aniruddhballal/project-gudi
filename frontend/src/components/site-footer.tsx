import Link from "next/link";

export function SiteFooter({ siteTitle }: { siteTitle: string }) {
  return (
    <footer className="bg-[#241512] px-5 py-12 text-stone-300 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Vasavi Penugonda</p>
          <p className="display-type mt-3 max-w-md text-2xl leading-tight text-white">A sacred place of history, service, and community.</p>
          <p className="mt-4 max-w-lg text-sm leading-6 text-stone-400">{siteTitle}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Explore</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/overview" className="hover:text-amber-200">Overview</Link>
            <Link href="/story" className="hover:text-amber-200">Story of Vasavi Mata</Link>
            <Link href="/gallery/photos" className="hover:text-amber-200">Photo gallery</Link>
            <Link href="/news" className="hover:text-amber-200">Latest updates</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Connect</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/donations" className="hover:text-amber-200">Support the Trust</Link>
            <Link href="/contact" className="hover:text-amber-200">Plan your visit</Link>
            <Link href="/privacy" className="hover:text-amber-200">Privacy policy</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© Copyright 2010–2020 Akhila Bharat Sri Vasavi Penugonda Temple Trust (R).</p>
        <p>Built for devotees and the Trust community.</p>
      </div>
    </footer>
  );
}
