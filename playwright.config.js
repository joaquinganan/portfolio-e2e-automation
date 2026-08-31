import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

/**
 * Load environment-specific config.
 * TEST_ENV=prod  -> .env.production
 * (default)      -> .env.local
 */
const envFile = process.env.TEST_ENV === 'prod' ? '.env.production' : '.env.local';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error(
    `BASE_URL is required. Set it in ${envFile} or provide it as an environment variable.`,
  );
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: 'chromium-desktop',
      testIgnore: /responsive\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox-desktop',
      testIgnore: /responsive\.spec\.js/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit-desktop',
      testIgnore: /responsive\.spec\.js/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      testMatch: /responsive\.spec\.js/,
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      testMatch: /responsive\.spec\.js/,
      use: { ...devices['iPhone 15'] },
    },
  ],
});
