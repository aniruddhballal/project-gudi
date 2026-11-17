import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export async function SiteFooter({ siteTitle, appearance }: { siteTitle: string; appearance?: "home" }) {
  const { siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.footer;
  return (
    <footer className={`bg-[#142f2a] px-5 py-10 text-[#e5e2d8] sm:px-8 lg:px-12 lg:py-14 ${appearance === "home" ? "home-site-footer" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <div className="site-footer-grid grid gap-9 border-b border-white/15 pb-9 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-12">
          <div>
            <Link href="/" className="site-footer-brand inline-flex items-center gap-3" aria-label={`${siteTitle} home`}><Image src={siteSettings.logo} alt="" width={64} height={48} className="h-10 w-auto object-contain" /><span className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#dfbd7a]">{copy.eyebrow}</span></Link>
            <p className="site-footer-tagline display-type mt-5 max-w-md text-3xl leading-tight text-white">{copy.tagline}</p>
            <p className="site-footer-title mt-4 max-w-md text-xs leading-6 text-[#bdc4bb]">{siteTitle}</p>
          </div>
          <nav aria-label={copy.exploreLabel}>
            <p className="site-footer-nav-label text-[13px] font-bold uppercase tracking-[0.2em] text-[#dfbd7a]">{copy.exploreLabel}</p>
            <div className="mt-4 grid gap-3 text-sm">{copy.exploreLinks.map((link) => <Link key={link.href} href={link.href} className="w-fit text-[#e5e2d8] hover:text-white">{link.label}</Link>)}</div>
          </nav>
          <nav aria-label={copy.connectLabel}>
            <p className="site-footer-nav-label text-[13px] font-bold uppercase tracking-[0.2em] text-[#dfbd7a]">{copy.connectLabel}</p>
            <div className="mt-4 grid gap-3 text-sm">{copy.connectLinks.map((link) => <Link key={link.href} href={link.href} className="w-fit text-[#e5e2d8] hover:text-white">{link.label}</Link>)}</div>
          </nav>
        </div>
        <div className="site-footer-bottom flex flex-col gap-2 pt-5 text-[13px] leading-5 text-[#aeb8ae] sm:flex-row sm:items-center sm:justify-between"><p>{copy.copyright}</p><p>{copy.note}</p></div>
      </div>
    </footer>
  );
}
