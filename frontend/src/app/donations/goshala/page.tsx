import { DonationPage } from "@/components/donation-page";
import { getSiteContent } from "@/lib/site-content";

export default async function GoshalaDonationPage() {
  const { donationPages } = await getSiteContent();
  return <DonationPage {...donationPages.goshala} />;
}
