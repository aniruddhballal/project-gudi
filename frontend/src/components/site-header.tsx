import { getSiteContent } from "@/lib/site-content";

import { SiteHeaderClient } from "./site-header-client";

export async function SiteHeader() {
  const content = await getSiteContent();
  return <SiteHeaderClient siteTitle={content.siteSettings.siteTitle} logo={content.siteSettings.logo} copy={content.siteSettings.copy.navigation} />;
}
