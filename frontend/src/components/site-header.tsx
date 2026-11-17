import { getSiteContent } from "@/lib/site-content";

import { SiteHeaderClient } from "./site-header-client";

export async function SiteHeader({ appearance }: { appearance?: "home" } = {}) {
  const content = await getSiteContent();
  return <SiteHeaderClient appearance={appearance} siteTitle={content.siteSettings.siteTitle} logo={content.siteSettings.logo} copy={content.siteSettings.copy.navigation} />;
}
