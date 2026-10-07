"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MenuItem = { label: string; href: string };

const menuGroups: Array<{ label: string; items: MenuItem[] }> = [
  { label: "Overview", items: [{ label: "Overview", href: "/overview" }, { label: "News", href: "/news" }, { label: "Newsletter", href: "/newsletter" }] },
  { label: "Services", items: [{ label: "About the Trust", href: "/about" }, { label: "Vasavi Dham", href: "/vasavi-dham" }] },
  { label: "Donations", items: [{ label: "All donations", href: "/donations" }, { label: "Annadanam", href: "/donations/annadanam" }, { label: "Go Shala", href: "/donations/goshala" }, { label: "E-Hundi", href: "/donations/e-hundi" }] },
  { label: "Gallery", items: [{ label: "Photos", href: "/gallery/photos" }, { label: "Videos", href: "/gallery/videos" }] },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function linkClass(active: boolean) {
  return `rounded-md px-2 py-2 text-sm transition-colors ${active ? "font-semibold text-amber-800" : "text-stone-600 hover:bg-amber-50 hover:text-amber-800"}`;
}

export function SiteHeaderClient({ siteTitle, logo }: { siteTitle: string; logo: string }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpenMenu(null);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image src={logo} alt="Vasavi Penugonda Trust" width={100} height={60} />
          <span className="max-w-56 text-sm font-semibold leading-tight">{siteTitle}</span>
        </Link>

        <nav ref={menuRef} className="order-3 flex w-full min-w-0 flex-wrap items-center gap-1 border-t border-stone-100 pt-3 lg:order-2 lg:w-auto lg:flex-1 lg:border-0 lg:pt-0" aria-label="Primary navigation">
          <Link href="/" className={linkClass(isActive(pathname, "/"))}>Home</Link>
          {menuGroups.map((group) => {
            const active = group.items.some((item) => isActive(pathname, item.href));
            const isOpen = openMenu === group.label;
            return (
              <div key={group.label} className="relative">
                <button type="button" className={`${linkClass(active)} flex items-center gap-1`} aria-expanded={isOpen} aria-haspopup="menu" onClick={() => setOpenMenu(isOpen ? null : group.label)}>
                  {group.label}
                  <ChevronDown aria-hidden="true" size={15} strokeWidth={2.25} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`${isOpen ? "block" : "hidden"} absolute left-0 top-full z-20 mt-2 min-w-52 rounded-xl border border-stone-200 bg-white p-2 shadow-xl`} role="menu">
                  {group.items.map((item) => <Link key={item.href} href={item.href} role="menuitem" onClick={() => setOpenMenu(null)} className={`block ${linkClass(isActive(pathname, item.href))}`}>{item.label}</Link>)}
                </div>
              </div>
            );
          })}
          <Link href="/story" className={linkClass(isActive(pathname, "/story"))}>Story</Link>
          <Link href="/trustees" className={linkClass(isActive(pathname, "/trustees"))}>Trustees</Link>
          <Link href="/contact" className={linkClass(isActive(pathname, "/contact"))}>Contact</Link>
        </nav>

        <Link href="/migration" className="order-2 ml-auto text-xs text-stone-400 hover:text-stone-700 lg:order-3">Migration tracker</Link>
      </div>
    </header>
  );
}
