/* eslint-disable @typescript-eslint/no-explicit-any */

import { homeContent } from "@/content/home";
import { aboutContent } from "@/content/about";
import { contactContent } from "@/content/contact";
import { donationsContent } from "@/content/donations";
import { annadanamContent } from "@/content/donation-annadanam";
import { ehundiContent } from "@/content/donation-ehundi";
import { goshalaContent } from "@/content/donation-goshala";
import { newsContent } from "@/content/news";
import { newsletterContent } from "@/content/newsletter";
import { overviewContent } from "@/content/overview";
import { photosContent } from "@/content/photos";
import { privacyContent } from "@/content/privacy";
import { storyContent } from "@/content/story";
import { trusteesContent } from "@/content/trustees";
import { vasaviDhamContent } from "@/content/vasavi-dham";
import { videosContent } from "@/content/videos";

const payloadUrl = process.env.PAYLOAD_API_URL ?? "http://localhost:3000";

export type SiteContent = {
  home: typeof homeContent;
  about: typeof aboutContent;
  contact: typeof contactContent;
  donations: typeof donationsContent;
  donationPages: {
    annadanam: typeof annadanamContent;
    ehundi: typeof ehundiContent;
    goshala: typeof goshalaContent;
  };
  newsletter: typeof newsletterContent;
  news: { title: string };
  overview: typeof overviewContent & { heroImage: string | null };
  photos: typeof photosContent;
  privacy: typeof privacyContent;
  story: typeof storyContent & { coverImage: string | null };
  trustees: typeof trusteesContent;
  vasaviDham: typeof vasaviDhamContent;
  siteSettings: {
    siteTitle: string;
    logo: string;
    location: string;
    email: string;
    phone: string;
    mapEmbed: string;
  };
};

type PayloadMedia = { url?: string | null };

const mediaKeys = new Set(["image", "thumbnail", "logo", "heroImage", "coverImage"]);

function mediaUrl(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return null;
  const url = (value as PayloadMedia).url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${payloadUrl}${url}`;
}

function normalize(value: unknown, key?: string): unknown {
  if (mediaKeys.has(key ?? "")) return mediaUrl(value);
  if (Array.isArray(value)) return value.map((item) => normalize(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [childKey, normalize(childValue, childKey)]));
  }
  return value;
}

function textList(value: unknown, fallback: readonly string[]): string[] {
  if (value === undefined) return [...fallback];
  if (!Array.isArray(value)) return [];
  return value.map((item) => typeof item === "string" ? item : (item as { text?: string })?.text ?? "");
}

function contentFromPayload(data: any, settings: any): SiteContent {
  const normalized = normalize(data) as any;

  return {
    home: {
      ...homeContent,
      ...normalized.home,
      aims: textList(normalized.home?.aims, homeContent.aims),
      president: {
        ...homeContent.president,
        ...normalized.home?.president,
        kannada: textList(normalized.home?.president?.kannada, homeContent.president.kannada),
        english: textList(normalized.home?.president?.english, homeContent.president.english),
      },
      contact: normalized.home?.contact?.map((item: any) => ({ ...item, lines: textList(item.lines, []) })) ?? homeContent.contact,
    },
    about: {
      ...aboutContent,
      ...normalized.about,
    },
    contact: {
      ...contactContent,
      ...normalized.contact,
      headOffice: textList(normalized.contact?.headOffice, contactContent.headOffice),
      vasaviDham: textList(normalized.contact?.vasaviDham, contactContent.vasaviDham),
    },
    donations: {
      ...donationsContent,
      ...normalized.donations,
    },
    donationPages: {
      annadanam: { ...annadanamContent, ...normalized.donationPages?.annadanam, paragraphs: textList(normalized.donationPages?.annadanam?.paragraphs, annadanamContent.paragraphs) },
      ehundi: { ...ehundiContent, ...normalized.donationPages?.ehundi, paragraphs: textList(normalized.donationPages?.ehundi?.paragraphs, ehundiContent.paragraphs) },
      goshala: { ...goshalaContent, ...normalized.donationPages?.goshala, paragraphs: textList(normalized.donationPages?.goshala?.paragraphs, goshalaContent.paragraphs) },
    },
    newsletter: {
      ...newsletterContent,
      ...normalized.newsletter,
      announcement: { ...newsletterContent.announcement, ...normalized.newsletter?.announcement },
    },
    news: {
      title: normalized.news?.title ?? newsContent.title,
    },
    overview: {
      ...overviewContent,
      ...normalized.overview,
      activity: { ...overviewContent.activity, ...normalized.overview?.activity },
      story: { ...overviewContent.story, ...normalized.overview?.story, paragraphs: textList(normalized.overview?.story?.paragraphs, overviewContent.story.paragraphs) },
      donation: { ...overviewContent.donation, ...normalized.overview?.donation },
      map: { ...overviewContent.map, ...normalized.overview?.map },
      about: { ...overviewContent.about, ...normalized.overview?.about },
      heroImage: normalized.overview?.heroImage ?? "/legacy/overview/top.png",
    },
    photos: {
      ...photosContent,
      ...normalized.photos,
    },
    privacy: {
      ...privacyContent,
      ...normalized.privacy,
      sections: normalized.privacy?.sections?.map((section: any) => ({ ...section, paragraphs: textList(section.paragraphs, []) })) ?? privacyContent.sections,
    },
    story: {
      ...storyContent,
      ...normalized.story,
      publication: { ...storyContent.publication, ...normalized.story?.publication },
      introduction: textList(normalized.story?.introduction, storyContent.introduction),
      historicEvents: textList(normalized.story?.historicEvents, storyContent.historicEvents),
      coverImage: normalized.story?.coverImage ?? "/legacy/story/1.png",
    },
    trustees: {
      ...trusteesContent,
      ...normalized.trustees,
    },
    vasaviDham: {
      ...vasaviDhamContent,
      ...normalized.vasaviDham,
    },
    siteSettings: {
      siteTitle: settings?.siteTitle ?? homeContent.siteTitle,
      logo: mediaUrl(settings?.logo) ?? "/legacy/home/logo.png",
      location: settings?.location ?? contactContent.location,
      email: settings?.email ?? contactContent.email,
      phone: settings?.phone ?? contactContent.phone,
      mapEmbed: settings?.mapEmbed ?? contactContent.mapEmbed,
    },
  };
}

async function fetchJson(path: string) {
  const response = await fetch(`${payloadUrl}${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Payload returned ${response.status}`);
  return response.json();
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const [content, settings] = await Promise.all([
      fetchJson("/api/globals/site-content?depth=1"),
      fetchJson("/api/globals/site-settings?depth=1"),
    ]);
    return contentFromPayload(content, settings);
  } catch {
    return contentFromPayload({}, {});
  }
}

export type RuntimeNewsItem = {
  id: number;
  title: string;
  date: string;
  summary: string;
  details: string[];
  image: string | null;
  sourceImage?: string;
  href?: string;
};

export async function getNewsItems(): Promise<RuntimeNewsItem[]> {
  try {
    const data = await fetchJson("/api/articles?limit=100&sort=legacyId&depth=1");
    if (!Array.isArray(data.docs)) return newsContent.items;
    return data.docs.map((article: any) => ({
      id: article.legacyId ?? article.id,
      title: article.title,
      date: article.publishedAt?.slice(0, 10) ?? "",
      summary: article.summary ?? "",
      details: article.details?.map((item: any) => item.text ?? "") ?? [],
      image: mediaUrl(article.image),
      sourceImage: article.sourceImage,
      href: article.externalLink,
    }));
  } catch {
    return newsContent.items;
  }
}

export async function getGalleryVideos(): Promise<Array<{ id: string; title: string }>> {
  try {
    const data = await fetchJson("/api/videos?limit=100&sort=sortOrder&depth=1");
    if (!Array.isArray(data.docs)) return [...videosContent.videos];
    return data.docs.map((video: any) => ({
      id: video.videoId,
      title: video.title,
    }));
  } catch {
    return [...videosContent.videos];
  }
}
