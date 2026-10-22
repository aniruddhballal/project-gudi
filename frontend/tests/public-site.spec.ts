import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/overview",
  "/about",
  "/vasavi-dham",
  "/story",
  "/donations",
  "/donations/annadanam",
  "/donations/e-hundi",
  "/donations/goshala",
  "/gallery/photos",
  "/gallery/videos",
  "/news",
  "/newsletter",
  "/trustees",
  "/contact",
  "/privacy",
];

test("all public routes render a page heading successfully", async ({ page }) => {
  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response, route).not.toBeNull();
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1").first(), route).toBeVisible();
  }
});

test("key page families fit narrow mobile screens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ["/", "/about", "/story", "/donations/annadanam", "/gallery/videos", "/trustees", "/contact"]) {
    await page.goto(route);
    const widths = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(widths.document, `${route} should not overflow horizontally`).toBeLessThanOrEqual(widths.viewport);
  }
});

test("mobile navigation opens and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: /open menu/i });
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await menuButton.click();
  await expect(navigation).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
});

test("skip link moves keyboard users beyond the site navigation", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#page-content$/);
  const headerBottom = await page.locator("header").evaluate((header) => header.getBoundingClientRect().bottom);
  expect(headerBottom).toBeLessThanOrEqual(1);
});

test("donation detail keeps amount selection and the existing handoff message", async ({ page }) => {
  await page.goto("/donations/annadanam");
  await page.getByRole("spinbutton").fill("501");
  await page.getByLabel(/full name/i).fill("Website visitor");
  await page.getByLabel(/phone number/i).fill("9876543210");
  await page.getByRole("button", { name: /continue to payment/i }).click();

  await expect(page.getByRole("status")).toContainText("The payment provider will be connected here in the next backend phase.");
});
