import { test, expect } from "../fixtures/test-fixtures";

test.beforeEach(async ({ portfolioPage }) => portfolioPage.goto());

test("social sharing metadata and favicon are configured @regression", async ({ page }) => {
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Joaquín Gañán/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-portfolio\.png/);
  await expect(page.locator('link[rel="icon"][media="(prefers-color-scheme: light)"]')).toHaveAttribute(
    "href",
    /favicon-light\.svg/,
  );
  await expect(page.locator('link[rel="icon"][media="(prefers-color-scheme: dark)"]')).toHaveAttribute(
    "href",
    /favicon-dark\.svg/,
  );
});

test("résumé link preserves its download contract @regression", async ({ portfolioPage }) => {
  await expect(portfolioPage.englishResumeLink).toHaveAttribute("download", "CV-Joaquin-Ganan-EN.pdf");
  await expect(portfolioPage.englishResumeLink).toHaveAttribute("href", "/joaquin-ganan-resume.pdf");
});

test("skip link targets the main introduction @regression", async ({ page }) => {
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute("href", "#intro");
});
