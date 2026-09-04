import { chromium } from "@playwright/test";
import { mkdir, rename, rm } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.BASE_URL || "https://joaquinganan.dev";
const outputDir = path.resolve("replay-output");
const finalVideo = path.join(outputDir, "portfolio-browser-replay.webm");

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: "light",
  recordVideo: {
    dir: outputDir,
    size: { width: 1280, height: 720 },
  },
});
const page = await context.newPage();
const video = page.video();

try {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1600);

  await page.getByRole("link", { name: "Expertise", exact: true }).click();
  await page.waitForTimeout(900);
  await page.getByRole("button", { name: "Quality strategy", exact: true }).click();
  await page.waitForTimeout(1200);

  await page.getByRole("link", { name: "Work", exact: true }).click();
  await page.waitForTimeout(1400);

  await page.getByRole("link", { name: "Go to Lab", exact: true }).click();
  await page.waitForTimeout(1600);

  for (const label of ["Overview", "Browsers", "Test distribution", "Live progress"]) {
    await page.getByRole("tab", { name: new RegExp(`^${label}`) }).click();
    await page.waitForTimeout(1100);
  }
} finally {
  await context.close();
  await browser.close();
}

if (!video) throw new Error("Playwright did not create a replay.");
const recordedPath = await video.path();
await rename(recordedPath, finalVideo);
console.log(`Browser replay saved to ${finalVideo}`);
