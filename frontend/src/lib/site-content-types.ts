export type Aim = {
  text: string;
  emphasis?: string | null;
};

export type Person = {
  image: string | null;
  name: string;
  role?: string;
  description?: string;
};

export type HomeContent = {
  siteTitle: string;
  description: string;
  aims: readonly Aim[];
  heroSlides: readonly { image: string; href: string; title: string; description: string }[];
  president: { image: string | null; title?: string; kannada: readonly string[]; english: readonly string[] };
  majorLinks: readonly { label: string; href: string }[];
  event: { title?: string; name?: string; bulletinHref?: string };
  greatSouls: readonly Person[];
  gallery: readonly { image: string | null; alt: string }[];
  contact: readonly { name: string; lines: readonly string[] }[];
  email?: string | null;
};

export type AboutContent = {
  title: string;
  introduction: string;
  underConstruction: readonly { image: string | null; title: string; description: string }[];
  projects: readonly { image: string | null; date: string; title: string; description: string }[];
};

export type ContactContent = {
  title: string;
  location: string;
  email: string;
  phone: string;
  mapEmbed: string;
  headOffice: readonly string[];
  vasaviDham: readonly string[];
};

export type DonationOption = { key?: string; title: string; description: string; image: string | null; href: string };
export type DonationContent = { title: string; intro: string; options: readonly DonationOption[] };
export type DonationPageContent = { title: string; eyebrow: string; image: string | null; formType: string; paragraphs: readonly string[]; highlight?: string; sectionTitle?: string };
export type NewsletterContent = { title: string; documents: readonly { title: string; category: string; description?: string; href: string; local: boolean }[]; announcement: { title: string; date: string } };
export type OverviewContent = {
  title: string;
  heroImage: string | null;
  activity: { title: string; donationHref: string };
  events: readonly { date: string; title: string; location: string; description: string; image: string | null }[];
  story: { eyebrow: string; title: string; paragraphs: readonly string[] };
  donation: { title: string; image: string | null; href: string };
  map: { title: string; embed: string; directions: string };
  videos: readonly { title: string; description: string; youtubeEmbed?: string; videoSrc?: string; thumbnail: string | null }[];
  news: readonly { title: string; description: string; href: string; image: string | null }[];
  about: { title: string; image: string | null; text: string };
};
export type PhotosContent = { title: string; albums: readonly { title: string; photoCount: number }[] };
export type PrivacyContent = { title: string; intro: string; sections: readonly { title: string; paragraphs: readonly string[] }[] };
export type StoryContent = { title: string; coverImage: string | null; publication: { title: string; note: string; href: string }; introduction: readonly string[]; historicEvents: readonly string[]; narrative: readonly { image: string | null; text: string }[]; closing: string };
export type TrusteesContent = { title: string; patrons: readonly Person[]; executive: readonly Person[] };
export type VasaviDhamContent = { title: string; description: string; featured: readonly { title: string; image: string | null; description: string }[]; projects: readonly { title: string; date: string; image: string | null }[] };

export type SiteCopy = {
  home: {
    heroEyebrow: string; heroCta: string; exploreEyebrow: string; exploreTitle: string; exploreDescription: string; trustEyebrow: string; trustTitle: string; trustCta: string; presidentEyebrow: string; presidentTitle: string; presidentName: string; presidentRole: string; eventEyebrow: string; eventCta: string; furtherEyebrow: string; furtherTitle: string; furtherCta: string; soulsEyebrow: string; soulsTitle: string; soulsDescription: string; galleryEyebrow: string; galleryTitle: string; galleryCta: string; visitEyebrow: string; visitTitle: string; visitCta: string; newsletterEyebrow: string; newsletterTitle: string; newsletterDescription: string; newsletterPlaceholder: string; newsletterCta: string; newsletterNote: string;
  };
  navigation: { groups: readonly { label: string; items: readonly { label: string; href: string }[] }[]; home: string; story: string; trustees: string; contact: string; topbarLabel: string; visitCta: string; openMenu: string; closeMenu: string };
  footer: { eyebrow: string; tagline: string; exploreLabel: string; connectLabel: string; exploreLinks: readonly { label: string; href: string }[]; connectLinks: readonly { label: string; href: string }[]; copyright: string; note: string };
  pages: {
    about: { eyebrow: string; aims: SectionCopy; construction: SectionCopy; completed: SectionCopy; progressLabel: string; unavailableImage: string };
    contact: { eyebrow: string; description: string; map: SectionCopy & { iframeTitle: string }; trust: SectionCopy; form: { eyebrow: string; title: string; description: string; name: string; email: string; phone: string; subject: string; message: string; messagePlaceholder: string; submit: string }; labels: { location: string; email: string; phone: string; headOffice: string; dham: string; explore: string } };
    donations: { eyebrow: string; title: string; asideEyebrow: string; asideTitle: string; asideDescription: string; listEyebrow: string; listTitle: string; listDescription: string; sevaLabel: string; explore: string; details: Record<string, { label: string; detail: string }>; howEyebrow: string; howTitle: string; steps: readonly string[]; helpEyebrow: string; helpTitle: string; helpDescription: string; helpCta: string };
    donationDetail: { heroSuffix: string; heroDescription: string; supportLabel: string; offeringLabel: string; imageLabel: string; whyEyebrow: string; whyTitle: string; privacyNote: string; yourOffering: string; giveTitle: string; chooseAmount: string; customAmount: string; fullName: string; phone: string; dedication: string; optional: string; dedicationPlaceholder: string; continue: string; thanks: string; backendNote: string; secureNote: string; amountAriaLabel: string; namePlaceholder: string; phonePlaceholder: string };
    overview: Record<string, string>;
    story: Record<string, string>;
    trustees: Record<string, string>;
    vasaviDham: Record<string, string>;
    news: Record<string, string>;
    newsletter: Record<string, string>;
    privacy: Record<string, string>;
    photos: Record<string, string>;
    videos: Record<string, string>;
  };
};

type SectionCopy = { eyebrow: string; title: string; description?: string; action?: string };

export type SiteContent = {
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  donations: DonationContent;
  donationPages: { annadanam: DonationPageContent; ehundi: DonationPageContent; goshala: DonationPageContent };
  newsletter: NewsletterContent;
  news: { title: string };
  overview: OverviewContent;
  photos: PhotosContent;
  privacy: PrivacyContent;
  story: StoryContent;
  trustees: TrusteesContent;
  vasaviDham: VasaviDhamContent;
  siteSettings: { siteTitle: string; logo: string; copy: SiteCopy };
};
