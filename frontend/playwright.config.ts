import { defineConfig, devices } from "@playwright/test";

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3001",
    ...devices["Desktop Chrome"],
    launchOptions: executablePath ? { executablePath } : {},
  },
  webServer: [
    {
      command: "pnpm dev",
      cwd: "../backend",
      url: "http://localhost:3000/api/globals/site-settings",
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
    },
    {
      command: "pnpm exec next dev --port 3001",
      cwd: ".",
      url: "http://localhost:3001",
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
    },
  ],
});
