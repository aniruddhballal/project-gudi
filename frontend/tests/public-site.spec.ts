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

test("theme toggle closes the expanded mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await page.getByRole("button", { name: /open menu/i }).click();
  await expect(navigation).toBeVisible();
  await page.getByRole("button", { name: "Switch to Heritage Maroon & Gold theme" }).click();
  await expect(navigation).toBeHidden();
});

test("theme switch applies the alternate page composition and persists across reloads", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Switch to Heritage Maroon & Gold theme" }).click();
  await expect(page.locator(".site-theme-root")).toHaveAttribute("data-theme", "heritage");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "heritage");
  await expect(page.locator(".site-header-main")).toHaveCSS("display", "grid");
  await expect(page.locator("main")).toHaveCSS("background-color", "rgb(255, 248, 231)");

  await page.goto("/story");
  await expect(page.locator("main[data-page='story'] section h2").first()).toHaveCSS("color", "rgb(255, 248, 231)");
  await page.goto("/donations");
  await expect(page.locator("main h1").first()).toHaveCSS("color", "rgb(255, 248, 231)");
  const footerLink = page.locator("footer a").first();
  await footerLink.focus();
  await expect(footerLink).toHaveCSS("outline-color", "rgb(240, 207, 131)");

  if (process.env.CAPTURE_DESIGN === "1") {
    await page.screenshot({ path: "test-results/heritage-home.png", fullPage: true });
    await page.goto("/donations");
    await page.screenshot({ path: "test-results/heritage-donations.png", fullPage: true });
  }

  await page.reload();
  await expect(page.locator(".site-theme-root")).toHaveAttribute("data-theme", "heritage");
  await page.getByRole("button", { name: "Switch to Editorial Green & Brass theme" }).click();
  await expect(page.locator(".site-theme-root")).toHaveAttribute("data-theme", "editorial");
  await expect(page.locator(".site-header-main")).toHaveCSS("display", "flex");
});

test("heritage theme fits narrow screens across every public route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to Heritage Maroon & Gold theme" }).click();

  for (const width of [360, 320]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of publicRoutes) {
      await page.goto(route);
      await expect(page.locator(".site-theme-root")).toHaveAttribute("data-theme", "heritage");
      const widths = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      expect(widths.document, `${route} should not overflow horizontally at ${width}px in heritage theme`).toBeLessThanOrEqual(widths.viewport);
    }
  }

  if (process.env.CAPTURE_DESIGN === "1") {
    await page.goto("/");
    await page.screenshot({ path: "test-results/heritage-home-mobile.png" });
  }
});

test("skip link moves keyboard users beyond the site navigation", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#page-content$/);
  await expect.poll(() => page.locator("header").evaluate((header) => header.getBoundingClientRect().bottom)).toBeLessThanOrEqual(1);
});

test("donation detail keeps amount selection and the existing handoff message", async ({ page }) => {
  await page.goto("/donations/annadanam");
  await page.getByRole("spinbutton").fill("501");
  await page.getByLabel(/full name/i).fill("Website visitor");
  await page.getByLabel(/phone number/i).fill("9876543210");
  await page.getByRole("button", { name: /continue to payment/i }).click();

  await expect(page.getByRole("status")).toContainText("The payment provider will be connected here in the next backend phase.");
});
