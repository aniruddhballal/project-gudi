import type { NavigationGroup, NavigationLink, NavigationSettings, SiteCopy } from "./site-content-types";

/** Compatibility for databases that have not yet saved the new Navigation tab. */
export function resolveNavigation(legacy: SiteCopy["navigation"], settings?: NavigationSettings | null): SiteCopy["navigation"] {
  const links = new Map<string, NavigationLink>([
    ...legacy.groups.flatMap((group) => group.items),
    { label: legacy.story, href: "/story" }, { label: legacy.trustees, href: "/trustees" },
  ].map((link) => [link.href, link]));
  const definitions = [
    { label: "Discover Penugonda", paths: ["/overview", "/about", "/vasavi-dham", "/story"] },
    { label: "Seva & donations", paths: ["/donations", "/donations/annadanam", "/donations/goshala", "/donations/e-hundi"] },
    { label: "From the Trust", paths: ["/news", "/newsletter", "/trustees"] },
    { label: "Gallery", paths: ["/gallery/photos", "/gallery/videos"] },
  ];
  const used = new Set<string>();
  const groups: NavigationGroup[] = definitions.map(({ label, paths }) => ({ label, items: paths.flatMap((path) => {
    const link = links.get(path);
    if (!link) return [];
    used.add(path);
    return [link];
  }) })).filter((group) => group.items.length > 0);
  const extras = [...links.values()].filter((link) => !used.has(link.href));
  if (extras.length) groups.push({ label: "Explore further", items: extras });
  const fallback = { ...legacy, groups, directoryTitle: "Explore Penugonda", toggleOpenLabel: "Explore", toggleCloseLabel: "Close",
    quickLinks: [links.get("/vasavi-dham"), links.get("/donations")].filter((link): link is NavigationLink => Boolean(link)) };
  if (!settings?.enabled) return fallback;
  return { ...fallback,
    groups: settings.groups?.map((group) => ({ label: group.label, items: group.items ?? [] })) ?? fallback.groups,
    quickLinks: settings.quickLinks ?? fallback.quickLinks,
    home: settings.home ?? legacy.home,
    contact: settings.contact ?? legacy.contact,
    openMenu: settings.openMenu ?? legacy.openMenu,
    closeMenu: settings.closeMenu ?? legacy.closeMenu,
    directoryTitle: settings.directoryTitle ?? fallback.directoryTitle,
    toggleOpenLabel: settings.toggleOpenLabel ?? fallback.toggleOpenLabel,
    toggleCloseLabel: settings.toggleCloseLabel ?? fallback.toggleCloseLabel,
  };
}
