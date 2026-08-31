import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html"], ["github"]],

  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  use: {
    baseURL: "https://joaquinganan.dev",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1500, height: 1300 } },
    },

    {
      name: "firefox-desktop",
      use: { ...devices["Desktop Firefox"],viewport: { width: 1500, height: 1440 } },
    },

    {
      name: "webkit-desktop",
      use: { ...devices["Desktop Safari"], viewport: { width: 1500, height: 1440 } },
    },

    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },

    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 13"] },
    },
  ],
});
