"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SiteCopy } from "@/lib/site-content-types";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function linkClass(active: boolean) {
  return `rounded-md px-2.5 py-2 text-sm transition-colors ${active ? "font-bold text-[#8c3c2e]" : "text-stone-600 hover:bg-[#f0ece2] hover:text-[#8c3c2e]"}`;
}

export function SiteHeaderClient({ siteTitle, logo, copy }: { siteTitle: string; logo: string; copy: SiteCopy["navigation"] }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpenMenu(null);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className="relative z-30 border-b border-[#e2ddd1] bg-[#fbfaf7]">
      <a href="#main-content" className="sr-only z-50 rounded-sm bg-white px-4 py-2 text-sm font-bold text-[#20332e] focus:not-sr-only focus:absolute focus:left-4 focus:top-4">Skip to content</a>
      <div className="bg-[#183a34] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#eee4d3] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="truncate">{copy.topbarLabel}</p>
          <Link href="/contact" className="shrink-0 text-amber-300 hover:text-white">{copy.visitCta} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-8 lg:px-12">
        <Link href="/" className="flex min-w-0 items-center gap-3.5" aria-label={`${siteTitle} home`}>
          <Image src={logo} alt="" width={76} height={52} className="h-12 w-auto object-contain" priority />
          <span className="max-w-64 text-[11px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#203b35] sm:text-xs">{siteTitle}</span>
        </Link>

        <button type="button" className="rounded-sm border border-[#d6cec0] p-2.5 text-[#203b35] lg:hidden" aria-label={mobileOpen ? copy.closeMenu : copy.openMenu} aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav id="primary-navigation" ref={menuRef} className={`${mobileOpen ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-1 border-t border-[#e2ddd1] bg-[#fbfaf7] p-4 shadow-xl lg:static lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-end lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`} aria-label="Primary navigation">
          <Link href="/" onClick={() => setMobileOpen(false)} className={linkClass(isActive(pathname, "/"))}>{copy.home}</Link>
          {copy.groups.map((group, groupIndex) => {
            const active = group.items.some((item) => isActive(pathname, item.href));
            const isOpen = openMenu === group.label;
            const submenuId = `navigation-group-${groupIndex}`;
            return (
              <div key={group.label} className="relative">
                <button type="button" className={`${linkClass(active)} flex items-center gap-1`} aria-expanded={isOpen} aria-controls={submenuId} onClick={() => setOpenMenu(isOpen ? null : group.label)}>
                  {group.label}
                  <ChevronDown aria-hidden="true" size={15} strokeWidth={2.25} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div id={submenuId} className={`${isOpen ? "block" : "hidden"} left-0 top-full z-20 mt-1 min-w-52 rounded-lg border border-[#e2ddd1] bg-[#fbfaf7] p-2 shadow-xl lg:absolute lg:mt-2`}>
                  {group.items.map((item) => <Link key={item.href} href={item.href} onClick={() => { setOpenMenu(null); setMobileOpen(false); }} className={`block ${linkClass(isActive(pathname, item.href))}`}>{item.label}</Link>)}
                </div>
              </div>
            );
          })}
          <Link href="/story" onClick={() => setMobileOpen(false)} className={linkClass(isActive(pathname, "/story"))}>{copy.story}</Link>
          <Link href="/trustees" onClick={() => setMobileOpen(false)} className={linkClass(isActive(pathname, "/trustees"))}>{copy.trustees}</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 rounded-lg bg-[#a44832] px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-[#7d3218] lg:ml-2 lg:mt-0">{copy.contact}</Link>
        </nav>
      </div>
    </header>
  );
}
