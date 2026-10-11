import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export async function SiteFooter({ siteTitle }: { siteTitle: string }) {
  const { siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.footer;
  return (
    <footer className="bg-[#241512] px-5 py-12 text-stone-300 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">{copy.eyebrow}</p>
          <p className="display-type mt-3 max-w-md text-2xl leading-tight text-white">{copy.tagline}</p>
          <p className="mt-4 max-w-lg text-sm leading-6 text-stone-400">{siteTitle}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">{copy.exploreLabel}</p>
          <div className="mt-4 grid gap-3 text-sm">
            {copy.exploreLinks.map((link) => <Link key={link.href} href={link.href} className="hover:text-amber-200">{link.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">{copy.connectLabel}</p>
          <div className="mt-4 grid gap-3 text-sm">
            {copy.connectLinks.map((link) => <Link key={link.href} href={link.href} className="hover:text-amber-200">{link.label}</Link>)}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.copyright}</p>
        <p>{copy.note}</p>
      </div>
    </footer>
  );
}
