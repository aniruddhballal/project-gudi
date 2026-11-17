"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { SiteCopy } from "@/lib/site-content-types";
import "./site-header.css";

type NavigationLink = { label: string; href: string };

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeaderClient({ siteTitle, logo, copy }: {
  siteTitle: string;
  logo: string;
  copy: SiteCopy["navigation"];
  appearance?: "home";
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sourceLinks: NavigationLink[] = [
    ...copy.groups.flatMap((group) => group.items),
    { label: copy.story, href: "/story" },
    { label: copy.trustees, href: "/trustees" },
  ];
  const byHref = new Map(sourceLinks.map((link) => [link.href, link]));
  const sections = [
    { label: "Discover Penugonda", paths: ["/overview", "/about", "/vasavi-dham", "/story"] },
    { label: "Seva & donations", paths: ["/donations", "/donations/annadanam", "/donations/goshala", "/donations/e-hundi"] },
    { label: "From the Trust", paths: ["/news", "/newsletter", "/trustees"] },
    { label: "Gallery", paths: ["/gallery/photos", "/gallery/videos"] },
  ];
  const assignedPaths = new Set(sections.flatMap((section) => section.paths));
  const extraLinks = sourceLinks.filter((link) => !assignedPaths.has(link.href));
  const quickLinks = [byHref.get("/vasavi-dham"), byHref.get("/donations")]
    .filter((link): link is NavigationLink => Boolean(link));

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setMenuOpen(false);
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  function directoryLink(link: NavigationLink) {
    return <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
      aria-current={pathname === link.href ? "page" : undefined}
      className={isActive(pathname, link.href) ? "temple-directory-link is-active" : "temple-directory-link"}>
      <span>{link.label}</span><ArrowUpRight size={15} aria-hidden="true" />
    </Link>;
  }

  return (
    <header ref={headerRef} className="site-header temple-header">
      <a href="#page-content" className="temple-skip-link">Skip to content</a>
      <div className="temple-header-bar">
        <Link href="/" className="temple-brand" aria-label={`${siteTitle} home`} onClick={() => setMenuOpen(false)}>
          <Image src={logo} alt="" width={76} height={52} priority />
          <span>{siteTitle}</span>
        </Link>
        <div className="temple-header-actions">
          <div className="temple-quick-links" aria-label="Quick links">
            {quickLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
            <Link href="/contact" className="temple-contact-link" onClick={() => setMenuOpen(false)}>{copy.contact}<ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
          <button ref={toggleRef} type="button" className="temple-explore-button" aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span>{menuOpen ? "Close" : "Explore"}</span>{menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="primary-navigation" className="temple-directory" aria-label="Primary navigation" hidden={!menuOpen}>
        <div className="temple-directory-inner">
          <div className="temple-directory-heading"><Link href="/" onClick={() => setMenuOpen(false)} aria-current={pathname === "/" ? "page" : undefined}>{copy.home}<ArrowUpRight size={15} aria-hidden="true" /></Link><span>Explore Penugonda</span></div>
          <div className="temple-directory-columns">
            {sections.map((section) => <div key={section.label} className="temple-directory-group"><h2>{section.label}</h2>{section.paths.map((href) => byHref.get(href)).filter((link): link is NavigationLink => Boolean(link)).map(directoryLink)}</div>)}
            {extraLinks.length > 0 && <div className="temple-directory-group"><h2>Explore further</h2>{extraLinks.map(directoryLink)}</div>}
          </div>
          <div className="temple-directory-bottom"><p>{siteTitle}</p><Link href="/contact" onClick={() => setMenuOpen(false)}>{copy.contact}<ArrowRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </nav>
    </header>
  );
}
