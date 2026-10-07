/* eslint-disable @typescript-eslint/no-explicit-any */

import type { homeContent } from "@/content/home";
import type { aboutContent } from "@/content/about";
import type { contactContent } from "@/content/contact";
import type { donationsContent } from "@/content/donations";
import type { annadanamContent } from "@/content/donation-annadanam";
import type { ehundiContent } from "@/content/donation-ehundi";
import type { goshalaContent } from "@/content/donation-goshala";
import type { newsletterContent } from "@/content/newsletter";
import type { overviewContent } from "@/content/overview";
import type { photosContent } from "@/content/photos";
import type { privacyContent } from "@/content/privacy";
import type { storyContent } from "@/content/story";
import type { trusteesContent } from "@/content/trustees";
import type { vasaviDhamContent } from "@/content/vasavi-dham";

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
  };
};

type PayloadMedia = { url?: string | null };

const mediaKeys = new Set(["image", "thumbnail", "logo", "heroImage", "coverImage"]);
const textListKeys = new Set(["aims", "kannada", "english", "lines", "paragraphs", "introduction", "historicEvents", "headOffice", "vasaviDham"]);

function mediaUrl(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return null;
  const url = (value as PayloadMedia).url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${payloadUrl}${url}`;
}

function normalize(value: unknown, key?: string): unknown {
  if (mediaKeys.has(key ?? "")) return mediaUrl(value);
  if (Array.isArray(value)) {
    const items = value.map((item) => normalize(item));
    if (textListKeys.has(key ?? "")) {
      return items.map((item) => item && typeof item === "object" && "text" in item ? (item as { text?: string }).text ?? "" : item);
    }
    return items;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [childKey, normalize(childValue, childKey)]));
  }
  return value;
}

function contentFromPayload(data: unknown, settings: unknown): SiteContent {
  const normalized = normalize(data) as SiteContent;
  const normalizedSettings = normalize(settings) as SiteContent["siteSettings"];

  return {
    ...normalized,
    siteSettings: normalizedSettings,
  };
}

async function fetchJson(path: string) {
  const response = await fetch(`${payloadUrl}${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Payload returned ${response.status}`);
  return response.json();
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const [home, about, contact, donations, annadanam, ehundi, goshala, newsletter, news, overview, photos, privacy, story, trustees, vasaviDham, settings] = await Promise.all([
      fetchJson("/api/globals/home-page?depth=1"),
      fetchJson("/api/globals/about-page?depth=1"),
      fetchJson("/api/globals/contact-page?depth=1"),
      fetchJson("/api/globals/donations-page?depth=1"),
      fetchJson("/api/globals/donation-annadanam-page?depth=1"),
      fetchJson("/api/globals/donation-ehundi-page?depth=1"),
      fetchJson("/api/globals/donation-goshala-page?depth=1"),
      fetchJson("/api/globals/newsletter-page?depth=1"),
      fetchJson("/api/globals/news-page?depth=1"),
      fetchJson("/api/globals/overview-page?depth=1"),
      fetchJson("/api/globals/photos-page?depth=1"),
      fetchJson("/api/globals/privacy-page?depth=1"),
      fetchJson("/api/globals/story-page?depth=1"),
      fetchJson("/api/globals/trustees-page?depth=1"),
      fetchJson("/api/globals/vasavi-dham-page?depth=1"),
      fetchJson("/api/globals/site-settings?depth=1"),
    ]);

    return contentFromPayload({
      home,
      about,
      contact,
      donations,
      donationPages: { annadanam, ehundi, goshala },
      newsletter,
      news,
      overview,
      photos,
      privacy,
      story,
      trustees,
      vasaviDham,
    }, settings);
  } catch (error) {
    throw new Error(`Payload is unavailable at ${payloadUrl}.`, { cause: error });
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
    if (!Array.isArray(data.docs)) throw new Error("Payload articles response is invalid.");
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
  } catch (error) {
    throw new Error(`Payload articles are unavailable at ${payloadUrl}.`, { cause: error });
  }
}

export async function getGalleryVideos(): Promise<Array<{ id: string; title: string }>> {
  try {
    const data = await fetchJson("/api/videos?limit=100&sort=sortOrder&depth=1");
    if (!Array.isArray(data.docs)) throw new Error("Payload videos response is invalid.");
    return data.docs.map((video: any) => ({
      id: video.videoId,
      title: video.title,
    }));
  } catch (error) {
    throw new Error(`Payload videos are unavailable at ${payloadUrl}.`, { cause: error });
  }
}
