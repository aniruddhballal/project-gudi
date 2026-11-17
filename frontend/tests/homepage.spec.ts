import { expect, test, type APIRequestContext } from "@playwright/test";
import type { HomeContent, SiteCopy } from "../src/lib/site-content-types";

type TextEntry = string | { text: string };
type MediaEntry = string | { url?: string | null } | null;
type HomeSource = Omit<
  HomeContent,
  "heroSlides" | "president" | "greatSouls" | "gallery" | "contact"
> & {
  heroSlides: Array<{
    title: string;
    description: string;
    href: string;
    image: MediaEntry;
  }>;
  president: { image: MediaEntry; kannada: TextEntry[]; english: TextEntry[] };
  greatSouls: Array<{
    name: string;
    role?: string;
    description?: string;
    image: MediaEntry;
  }>;
  gallery: Array<{ image: MediaEntry; alt: string }>;
  contact: Array<{ name: string; lines: TextEntry[] }>;
};

const contentOrigin = process.env.PAYLOAD_API_URL ?? "http://localhost:3000";
const textOf = (entry: TextEntry) =>
  typeof entry === "string" ? entry : entry.text;
const normalizeWhitespace = (text: string) => text.replace(/\s+/g, " ").trim();
const mediaPath = (entry: MediaEntry) => {
  const url = typeof entry === "string" ? entry : entry?.url;
  return url ? new URL(url, contentOrigin).pathname : null;
};

async function getHomepageSource(request: APIRequestContext) {
  const [homeResponse, settingsResponse] = await Promise.all([
    request.get(`${contentOrigin}/api/globals/home-page?depth=1`),
    request.get(`${contentOrigin}/api/globals/site-settings?depth=1`),
  ]);
  expect(homeResponse.ok(), "Homepage source must be available").toBeTruthy();
  expect(
    settingsResponse.ok(),
    "Homepage labels must be available",
  ).toBeTruthy();
  return {
    home: (await homeResponse.json()) as HomeSource,
    copy: ((await settingsResponse.json()) as { copy: SiteCopy }).copy.home,
  };
}

test("homepage preserves its existing content, people, languages, and destinations", async ({
  page,
  request,
}) => {
  const { home, copy } = await getHomepageSource(request);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

  const existingText = [
    home.siteTitle,
    home.description,
    ...home.heroSlides.flatMap((slide) => [slide.title, slide.description]),
    ...home.president.kannada.map(textOf),
    ...home.president.english.map(textOf),
    ...home.greatSouls.flatMap((person) => [
      person.name,
      person.role,
      person.description,
    ]),
    ...home.contact.flatMap((location) => [
      location.name,
      ...location.lines.map(textOf),
    ]),
    ...home.majorLinks.map((link) => link.label),
    home.event.name,
    ...Object.entries(copy)
      .filter(([key]) => key !== "newsletterPlaceholder")
      .map(([, value]) => value),
    "A message in Kannada and English.",
    "Explore the Trust, its history, places, and ways to take part.",
  ].filter((value): value is string => Boolean(value));

  const renderedText = normalizeWhitespace(
    (await page.locator("main").textContent()) ?? "",
  );
  for (const text of existingText) {
    expect(
      renderedText,
      `Preserve source text: ${text.slice(0, 100)}`,
    ).toContain(normalizeWhitespace(text));
  }
  await expect(
    page.getByPlaceholder(copy.newsletterPlaceholder),
  ).toBeAttached();

  const destinations = [
    ...home.heroSlides.map((slide) => slide.href),
    ...home.majorLinks.map((link) => link.href),
    home.event.bulletinHref,
    "/about",
    "/contact",
    "/gallery/photos",
  ].filter((href): href is string => Boolean(href));
  const renderedDestinations = await page
    .locator("main a[href]")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  for (const href of destinations)
    expect(renderedDestinations, `Preserve destination ${href}`).toContain(
      href,
    );
});

test("homepage retains all source images and loads them successfully", async ({
  page,
  request,
}) => {
  const { home } = await getHomepageSource(request);
  await page.goto("/");

  const sourceImages = [
    ...home.heroSlides.map((slide) => slide.image),
    home.president.image,
    ...home.greatSouls.map((person) => person.image),
    ...home.gallery.map((photo) => photo.image),
  ]
    .map(mediaPath)
    .filter((path): path is string => path !== null);
  const renderedImages = await page.locator("main img").evaluateAll((images) =>
    images.map((image) => {
      const url = new URL((image as HTMLImageElement).src);
      return url.pathname === "/_next/image"
        ? new URL(url.searchParams.get("url") ?? "", location.origin).pathname
        : url.pathname;
    }),
  );
  for (const image of sourceImages)
    expect(renderedImages, `Preserve image ${image}`).toContain(image);

  // Bring lazy-loaded media into view before checking network/image failures.
  await page.evaluate(async () => {
    for (
      let y = 0;
      y < document.documentElement.scrollHeight;
      y += innerHeight
    ) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  });
  await expect
    .poll(
      async () =>
        page
          .locator("main img")
          .evaluateAll((images) =>
            images
              .filter(
                (image) =>
                  !(image as HTMLImageElement).complete ||
                  (image as HTMLImageElement).naturalWidth === 0,
              )
              .map((image) => (image as HTMLImageElement).src),
          ),
      { timeout: 15_000 },
    )
    .toEqual([]);
});

test("homepage fits mobile, tablet, and desktop screens without horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(
      dimensions.content,
      `Homepage must fit ${width}px`,
    ).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test("president messages stay readable and newsletter submission keeps its integration notice", async ({
  page,
  request,
}) => {
  const { home, copy } = await getHomepageSource(request);
  await page.goto("/");

  const englishMessage = page
    .locator("details")
    .filter({ has: page.locator("summary", { hasText: "English" }) });
  const greeting = englishMessage.getByText(textOf(home.president.english[0]), {
    exact: true,
  });
  await expect(greeting).toBeVisible();
  await englishMessage.locator("summary").click();
  await expect(greeting).toBeHidden();
  await englishMessage.locator("summary").click();
  await expect(greeting).toBeVisible();

  await page
    .getByPlaceholder(copy.newsletterPlaceholder)
    .fill("devotee@example.com");
  await page.evaluate(() => {
    document.documentElement.dataset.homepageQaDocument = "same-document";
  });
  await page
    .getByRole("button", { name: copy.newsletterCta, exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText(copy.newsletterNote);
  await expect(page.locator("html")).toHaveAttribute(
    "data-homepage-qa-document",
    "same-document",
  );
  await expect(page).toHaveURL("/");
});
